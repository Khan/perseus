// The preview frame: renders whatever the shell page sends it, the way
// Perseus renders it for learners. It runs in an iframe so the item's styles
// and scripts can't touch the shell.
import {
    DependenciesContext,
    Renderer,
    UserInputManager,
    usePerseusI18n,
} from "@khanacademy/perseus";
import {usePreviewPresenter} from "@khanacademy/perseus-editor";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {dependenciesV2} from "./perseus-environment";

import type {PreviewContent} from "@khanacademy/perseus-editor";

type QuestionData = Extract<PreviewContent, {type: "question"}>["data"];

function Question({data}: {data: QuestionData}) {
    const {strings} = usePerseusI18n();
    const {question, apiOptions} = data;
    return (
        <UserInputManager widgets={question.widgets} problemNum={0}>
            {({userInput, handleUserInput, initializeUserInput}) => (
                <Renderer
                    strings={strings}
                    content={question.content}
                    widgets={question.widgets}
                    images={question.images}
                    apiOptions={apiOptions}
                    userInput={userInput}
                    handleUserInput={handleUserInput}
                    initializeUserInput={initializeUserInput}
                />
            )}
        </UserInputManager>
    );
}

function Frame() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const {content, reportHeight} = usePreviewPresenter({
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
            {content?.type === "question" ? (
                <Question data={content.data} />
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
