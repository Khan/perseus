// The preview frame: renders whatever the shell page sends it, the way
// Perseus renders it for learners. It runs in an iframe so the item's styles
// and scripts can't touch the shell.
import {DependenciesContext} from "@khanacademy/perseus";
import {usePreviewPresenter} from "@khanacademy/perseus-editor";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {Exercise} from "./exercise";
import {dependenciesV2} from "./perseus-environment";

function Frame() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {content, previewOptions, hintsState, reportHeight} =
        usePreviewPresenter({
            contentContainerRef: containerRef,
        });

    // The shell sizes the iframe to fit, so it never scrolls on its own.
    React.useEffect(() => {
        const container = containerRef.current;
        if (container == null) {
            return;
        }
        // #root holds the page's padding; the container doesn't.
        const root = document.getElementById("root")!;
        const observer = new ResizeObserver(() =>
            reportHeight(root.offsetHeight),
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, [reportHeight]);

    return (
        <div
            ref={containerRef}
            className="framework-perseus box-sizing-border-box-reset"
        >
            {content?.type === "exercise" ? (
                <Exercise
                    data={content.data}
                    previewOptions={previewOptions}
                    hintsState={hintsState}
                />
            ) : (
                <p>Waiting for the item…</p>
            )}
        </div>
    );
}

createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <DependenciesContext.Provider value={dependenciesV2}>
            <Frame />
        </DependenciesContext.Provider>
    </RenderStateRoot>,
);
