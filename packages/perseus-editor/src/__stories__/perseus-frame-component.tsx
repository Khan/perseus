import {
    Renderer,
    HintRenderer,
    PerseusI18nContextProvider,
} from "@khanacademy/perseus";
import * as React from "react";

// eslint-disable-next-line import/no-relative-packages
import {mockStrings} from "../../../perseus/src/strings";

import type {PerseusItem, Hint} from "@khanacademy/perseus-core";

// EditorPage data structure (from editor-page.tsx updateRenderer)
type EditorPageFrameData = {
    type: "question" | "hint";
    data: {
        item?: PerseusItem;
        hint?: Hint;
        pos?: number;
        apiOptions: {
            customKeypad: boolean;
            isMobile: boolean;
            [key: string]: any;
        };
        initialHintsVisible?: number;
        device?: string;
        linterContext?: {
            contentType: "exercise" | "hint";
            highlightLint?: boolean;
            paths?: any;
        };
        reviewMode?: boolean;
        legacyPerseusLint?: any;
        bold?: boolean; // For hints
    };
};

declare global {
    interface Window {
        KhanUtil: {
            localeToFixed: (num: number, precision: number) => string;
        };
        Exercises: {
            localMode: boolean;
            khanExercisesUrlBase: string;
            getCurrentFramework: () => string;
            PerseusBridge: {
                cleanupProblem: () => boolean;
            };
        };
        iframeDataStore: Record<string, any>;
    }
}

const PerseusFrameComponent = React.memo(() => {
    const [frameData, setFrameData] =
        React.useState<EditorPageFrameData | null>(null);
    const [frameError, setFrameError] = React.useState<string | null>(null);

    // Handle messages from EditorPage (current EditorPage pattern)
    const handleMessage = React.useCallback((event: MessageEvent) => {
        try {
            if (window.parent?.iframeDataStore?.[event.data]) {
                const editorData: EditorPageFrameData =
                    window.parent.iframeDataStore[event.data];

                // Validate data structure and set directly (no conversion needed)
                if (
                    editorData.type === "question" &&
                    editorData.data?.item?.question
                ) {
                    setFrameData(editorData);
                    setFrameError(null);
                } else if (
                    editorData.type === "hint" &&
                    editorData.data?.hint
                ) {
                    setFrameData(editorData);
                    setFrameError(null);
                }
            }
        } catch (error) {
            setFrameError(
                error instanceof Error ? error.message : String(error),
            );
        }
    }, []);

    React.useEffect(() => {
        // Setup iframe styles to prevent double scrollbars
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        // Setup Perseus globals (matches webapp exactly)
        window.KhanUtil = {
            localeToFixed: function (num: number, precision: number) {
                return num.toFixed(precision);
            },
        };

        window.Exercises = {
            localMode: true,
            khanExercisesUrlBase: "../",
            getCurrentFramework: function () {
                return "khan-exercises";
            },
            PerseusBridge: {
                cleanupProblem: function () {
                    return false;
                },
            },
        };

        window.addEventListener("message", handleMessage);

        // Tell parent we're ready (webapp pattern)
        const frameId = window.frameElement?.getAttribute("data-id");
        if (frameId) {
            window.parent.postMessage(frameId, "*");
        }

        // Height reporting with proper cleanup (webapp pattern)
        let observer: MutationObserver | null = null;
        let interval: ReturnType<typeof setInterval> | null = null;

        const updateParentHeight = () => {
            const measured = document.getElementById("measured");
            const frameId = window.frameElement?.getAttribute("data-id");
            if (measured && frameId) {
                window.parent.postMessage(
                    {
                        id: frameId,
                        height: measured.scrollHeight, // Remove extra padding per guide
                    },
                    "*",
                );
            }
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

        // Periodic height updates for animations (webapp uses 500ms - "twice a second")
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

    // Show communication errors
    if (frameError) {
        return (
            <div
                style={{
                    padding: "20px",
                    border: "1px solid orange",
                    borderRadius: "4px",
                    fontFamily: "sans-serif",
                }}
            >
                <h3>Frame Communication Error</h3>
                <p>{frameError}</p>
                <button onClick={() => setFrameError(null)}>Retry</button>
            </div>
        );
    }

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
                {type === "question" && data.item && (
                    <div id="exercise-content">
                        <Renderer
                            {...data.item.question}
                            strings={mockStrings}
                            apiOptions={apiOptions}
                        />
                    </div>
                )}

                {/* Render hint content */}
                {type === "hint" && data.hint && (
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
});

export default PerseusFrameComponent;
