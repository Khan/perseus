import {
    ServerItemRenderer,
    HintRenderer,
    PerseusI18nContextProvider,
    type SharedRendererProps,
} from "@khanacademy/perseus";
import * as React from "react";

import {testDependenciesV2} from "../../../../testing/test-dependencies";
import {mockStrings} from "../../../perseus/src/strings";

import type {PerseusItem, Hint} from "@khanacademy/perseus-core";

type PerseusFrameData =
    | {
          type: "question";
          data: SharedRendererProps & {
              item: PerseusItem;
              initialHintsVisible?: number;
              device?: string;
              reviewMode?: boolean;
              legacyPerseusLint?: any;
          };
      }
    | {
          type: "hint";
          data: SharedRendererProps & {
              hint: Hint;
              pos?: number;
              bold?: boolean;
          };
      };

/**
 * PerseusFrameComponent is a component that renders Perseus content in an iframe.
 * It is used to render the content of the EditorPage in order to provide previews
 * of the questions and hints.
 *
 * @returns A PerseusFrameComponent that renders the content of the EditorPage.
 */
const PerseusFrameComponent = () => {
    const [frameData, setFrameData] = React.useState<PerseusFrameData | null>(
        null,
    );

    // Handle messages from EditorPage
    const handleMessage = React.useCallback((event: MessageEvent) => {
        // Validate message origin for security
        if (event.origin !== window.location.origin) {
            return;
        }
        if (window.parent?.iframeDataStore?.[event.data]) {
            const editorData: PerseusFrameData =
                window.parent.iframeDataStore[event.data];

            setFrameData(editorData);
        }
    }, []);

    React.useEffect(() => {
        // Setup basic iframe styles to prevent double scrollbars
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        window.addEventListener("message", handleMessage);

        // Tell the EditorPage that we're ready
        const frameId = window.frameElement?.getAttribute("data-id");
        if (frameId) {
            window.parent.postMessage(frameId, "*");
        }

        // Height reporting to match upstream implementations
        let observer: MutationObserver | null = null;
        let interval: ReturnType<typeof setInterval> | null = null;

        const updateParentHeight = () => {
            if (!frameId) {
                return;
            }

            // Calculate the height of the content
            let lowest = 0;
            ["#content-container", ".preview-measure", "#measured"].forEach(
                (selector) => {
                    Array.from(document.querySelectorAll(selector)).forEach(
                        (element) => {
                            lowest = Math.max(
                                lowest,
                                element.getBoundingClientRect().bottom,
                            );
                        },
                    );
                },
            );

            const bottomMargin = 30;

            window.parent.postMessage(
                {
                    id: frameId,
                    height: lowest + bottomMargin,
                },
                "*",
            );
        };

        // Setup MutationObserver for content changes
        const measured = document.getElementById("measured");
        if (measured) {
            observer = new MutationObserver(updateParentHeight);
            observer.observe(measured, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true,
            });
        }

        // Periodic height updates for animations that matches upstream implementations
        interval = setInterval(updateParentHeight, 500);

        return () => {
            window.removeEventListener("message", handleMessage);
            if (observer !== null) {
                observer.disconnect();
            }
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, [handleMessage]);

    // Return null if no content to render
    if (!frameData) {
        return null;
    }

    const {type, data} = frameData;
    const {apiOptions} = data;

    return (
        <PerseusI18nContextProvider strings={mockStrings} locale="en">
            <div
                id="measured"
                role="document"
                aria-label="Perseus content preview"
                className={`framework-perseus ${apiOptions.isMobile ? "perseus-mobile" : ""}`}
                style={{
                    padding: "16px",
                    borderRadius: "4px",
                    maxWidth: "100%",
                }}
            >
                {/* Render question content */}
                {type === "question" && (
                    <div id="exercise-content">
                        <ServerItemRenderer
                            item={data.item}
                            apiOptions={apiOptions}
                            hintsVisible={0}
                            dependencies={testDependenciesV2}
                        />
                    </div>
                )}

                {/* Render hint content */}
                {type === "hint" && (
                    <div id="hint-content">
                        <HintRenderer
                            hint={data.hint}
                            pos={data.pos || 0}
                            apiOptions={apiOptions}
                        />
                    </div>
                )}
            </div>
        </PerseusI18nContextProvider>
    );
};

export default PerseusFrameComponent;
