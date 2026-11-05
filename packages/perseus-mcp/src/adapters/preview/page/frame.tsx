// The preview frame: renders whatever the shell page sends it, an exercise
// item or an article section, the way Perseus renders it for learners. It runs in an iframe so the item's styles
// and scripts can't touch the shell.
import {ArticleRenderer, DependenciesContext} from "@khanacademy/perseus";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {usePreviewPresenter} from "@khanacademy/perseus-preview";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {Exercise, keyOf} from "./exercise";
import {dependenciesV2} from "./perseus-environment";

import type {PreviewContent, RenderState} from "@khanacademy/perseus-preview";

type ArticleSectionData = Extract<
    PreviewContent,
    {type: "article-section"}
>["data"];

/**
 * Article content, such as a diagram on its own: rendered as an article,
 * with no answer to check and no hints. Remount it (with a `key`) for new
 * content, since ArticleRenderer reports rendering once per mount.
 */
function ArticleSection({
    data,
    onRenderState,
}: {
    data: ArticleSectionData;
    onRenderState: (renderState: RenderState) => void;
}) {
    return (
        <ArticleRenderer
            json={data.article}
            seed={0}
            apiOptions={data.apiOptions}
            linterContext={linterContextDefault}
            dependencies={dependenciesV2}
            onRendered={(isRendered) => {
                if (isRendered) {
                    onRenderState({status: "done"});
                }
            }}
        />
    );
}

function Frame() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {
        content,
        previewOptions,
        hintsState,
        reportHeight,
        reportRenderState,
    } = usePreviewPresenter({
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
                    onRenderState={reportRenderState}
                />
            ) : content?.type === "article-section" ? (
                <ArticleSection
                    key={keyOf(content.data)}
                    data={content.data}
                    onRenderState={reportRenderState}
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
