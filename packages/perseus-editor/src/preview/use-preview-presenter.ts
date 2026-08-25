import {useActionScheduler} from "@khanacademy/wonder-blocks-timing";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import {mapAxeResults} from "./a11y/map-axe-results";
import {
    createPreviewA11yReportMessage,
    createPreviewIframeReadyMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";
import {isParentToIframeMessage} from "./message-validators";

import type {
    IframeToParentMessage,
    ParentToIframeMessage,
    PreviewContent,
} from "./message-types";

/**
 * Sends a message up to the parent editor. The "/" target origin keeps preview
 * messages same-origin.
 */
function postToParent(message: IframeToParentMessage): void {
    window.parent.postMessage(message, "/");
}

interface UsePreviewPresenterOptions {
    /**
     * Ref to the element containing the rendered preview content. Used as
     * the root for axe-core accessibility scans.
     */
    contentContainerRef?: React.RefObject<HTMLElement | null>;
}

interface UsePreviewPresenterResult {
    /**
     * The preview content received from the parent, or null if not yet loaded
     */
    content: PreviewContent | null;
    /**
     * Whether the preview should render in mobile mode (from data-mobile attribute)
     */
    isMobile: boolean;
    /**
     * Whether to show the lint gutter (from data-lint-gutter attribute)
     */
    hasLintGutter: boolean;
    /**
     * Function to report the current height of the iframe content to the parent
     */
    reportHeight: (height: number) => void;
    /**
     * Whether axe-core accessibility scanning is enabled
     */
    a11yScanningEnabled: boolean;
    /**
     * Elements to draw "Show Me" highlight overlays over, resolved from the
     * latest scan's element map via the instanceIds in a highlight-issues
     * message.
     */
    highlightTargets: Element[];
}

/**
 * Hook for preview iframe to receive data from parent and send updates back.
 *
 * This hook:
 * - Reads iframe configuration from dataset attributes (id, mobile, lintGutter)
 * - Listens for content data from the parent window via postMessage
 * - Requests initial data on mount
 * - Provides functions to report height and lint warnings back to parent
 *
 * @example
 * ```tsx
 * function PreviewPage() {
 *   const { content, isMobile, reportHeight } = usePreviewPresenter();
 *
 *   React.useEffect(() => {
 *     if (containerRef.current) {
 *       reportHeight(containerRef.current.scrollHeight);
 *     }
 *   }, [content, reportHeight]);
 *
 *   if (!content) return <div>Loading...</div>;
 *   return <PreviewRenderer
 *       ref={containerRef}
 *       content={content}
 *       isMobile={isMobile}
 *   />;
 * }
 * ```
 */
export function usePreviewPresenter(
    options: UsePreviewPresenterOptions = {},
): UsePreviewPresenterResult {
    const {contentContainerRef} = options;
    const [content, setContent] = React.useState<PreviewContent | null>(null);
    const [contentVersion, setContentVersion] = React.useState(0);
    const [a11yScanningEnabled, setA11yScanningEnabled] = React.useState(false);
    const [highlightTargets, setHighlightTargets] = React.useState<Element[]>(
        [],
    );
    const schedule = useActionScheduler();

    // eslint-disable-next-line no-restricted-syntax
    const iframe = window.frameElement as HTMLIFrameElement | null;
    if (iframe == null) {
        throw new Error("usePreviewPresenter must be used within an iframe");
    }

    // Listen for data from parent
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent<ParentToIframeMessage>) => {
            // Filter by source window - only messages from parent
            if (event.source !== window.parent) {
                return;
            }

            const message = event.data;

            // Ignore messages that aren't from Perseus preview system
            if (!isParentToIframeMessage(message)) {
                return;
            }

            switch (message.type) {
                case "content-data":
                    setContent(message.content);
                    setContentVersion(message.contentVersion);
                    break;

                case "iframe-init":
                    setContent(message.content);
                    setA11yScanningEnabled(message.a11yScanningEnabled);
                    setContentVersion(message.contentVersion);
                    break;

                case "set-a11y-scanning-enabled":
                    setA11yScanningEnabled(message.enabled);
                    break;

                case "highlight-issues":
                    // Drop this command if it was computed against stale
                    // content (its instanceIds belong to a scan whose element
                    // map is no longer current).
                    if (message.contentVersion !== contentVersionRef.current) {
                        break;
                    }
                    setHighlightTargets(
                        message.instanceIds.flatMap(
                            (instanceId) =>
                                elementMapRef.current.get(instanceId) ?? [],
                        ),
                    );
                    break;

                case "clear-highlights":
                    setHighlightTargets([]);
                    break;

                default:
                    throw new UnreachableCaseError(message);
            }
        };

        window.addEventListener("message", handleMessage);

        // Tell parent we're ready for data.
        postToParent(createPreviewIframeReadyMessage());

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Tracks the latest a11yScanningEnabled value for the async scan below,
    // which needs to check it after awaiting rather than the value it closed
    // over.
    const a11yScanningEnabledRef = React.useRef(a11yScanningEnabled);
    React.useEffect(() => {
        a11yScanningEnabledRef.current = a11yScanningEnabled;
    }, [a11yScanningEnabled]);

    // Latest contentVersion, mirrored into a ref so readers holding an older
    // closure don't act on a stale value.
    const contentVersionRef = React.useRef(contentVersion);
    React.useEffect(() => {
        contentVersionRef.current = contentVersion;
    }, [contentVersion]);

    // A new content version means any highlight overlays drawn against the
    // previous version's scan are stale — drop them until a fresh highlight
    // command arrives.
    React.useEffect(() => {
        setHighlightTargets([]);
    }, [contentVersion]);

    // In-flight scan promise. Non-null means a scan is already running.
    const scanPromiseRef = React.useRef<Promise<void> | null>(null);

    // Set when a scan is asked for while one is already running. axe-core has
    // no way to cancel a run, so the newer request waits for the current run
    // to settle instead of being dropped — otherwise an author who stops
    // editing right then would be left looking at the previous content's
    // issues forever.
    const rescanRequestedRef = React.useRef(false);

    // The latest scan's instanceId -> elements map, used to resolve
    // highlight-issues messages to the elements they refer to.
    const elementMapRef = React.useRef<Map<string, Element[]>>(new Map());

    // Scans the container's current DOM, so a rescan picks up whatever
    // content has rendered by the time it runs.
    const startScan = React.useCallback(() => {
        const container = contentContainerRef?.current;
        if (!a11yScanningEnabledRef.current || container == null) {
            return;
        }

        if (scanPromiseRef.current != null) {
            rescanRequestedRef.current = true;
            return;
        }

        // Read before awaiting: the report has to name the version this scan
        // actually looked at. If the content changes mid-scan, these results
        // describe the older DOM, so they must be tagged with the older
        // version for the parent to discard — the rescan below then reports
        // the new one.
        const scannedVersion = contentVersionRef.current;

        scanPromiseRef.current = (async () => {
            // Delay-loading axe-core so that we can easily bundle-split it
            // out and avoid loading it if we aren't using it.
            const axe = (await import("axe-core")).default;
            axe.configure({reporter: "v2"});
            const results = await axe.run(
                {
                    include: container,
                    exclude: [['[target="lint-help-window"]']],
                },
                // elementRef populates node.element on each result, which
                // mapAxeResults needs to resolve "Show Me" highlighting.
                {elementRef: true},
            );

            // Don't send results if scanning was turned off mid-scan.
            if (!a11yScanningEnabledRef.current) {
                return;
            }

            const {issues: violations, elementMap: violationMap} =
                mapAxeResults(results.violations, "Alert");
            const {issues: incompletes, elementMap: incompleteMap} =
                mapAxeResults(results.incomplete, "Warning");

            elementMapRef.current = new Map([
                ...violationMap,
                ...incompleteMap,
            ]);

            postToParent(
                createPreviewA11yReportMessage(
                    violations,
                    incompletes,
                    scannedVersion,
                ),
            );
        })().finally(() => {
            scanPromiseRef.current = null;

            if (rescanRequestedRef.current) {
                rescanRequestedRef.current = false;
                startScan();
            }
        });
    }, [contentContainerRef]);

    // Run an axe-core scan (debounced) whenever content changes and
    // scanning is enabled.
    React.useEffect(() => {
        const container = contentContainerRef?.current;
        if (!a11yScanningEnabled || content == null || container == null) {
            return;
        }

        const scheduledScan = schedule.timeout(startScan, 1500);

        return () => scheduledScan.clear();
    }, [
        content,
        contentVersion,
        a11yScanningEnabled,
        contentContainerRef,
        schedule,
        startScan,
    ]);

    // Memoized callback to report height
    const reportHeight = React.useCallback((height: number) => {
        if (window.parent == null) {
            return;
        }

        postToParent({
            source: PREVIEW_MESSAGE_SOURCE,
            type: "height-update",
            height,
        });
    }, []);

    return {
        content,
        isMobile: iframe.dataset.mobile === "true",
        hasLintGutter: iframe.dataset.lintGutter === "true",
        reportHeight,
        a11yScanningEnabled,
        highlightTargets,
    };
}
