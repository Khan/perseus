// An item as learners see it in an exercise: the question, a "Check answer"
// button, and the hints the shell has revealed, rendered with the preview
// options the shell has set.
import {
    ApiOptions,
    HintRenderer,
    LoadingContext,
    ServerItemRenderer,
    usePerseusI18n,
} from "@khanacademy/perseus";
import {mapErrorToString} from "@khanacademy/perseus/strings";
import {splitPerseusItem} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {shownHintPositions} from "@khanacademy/perseus-preview";
import * as React from "react";

import {scoreItem} from "../../../domain/items/score";

import {dependenciesV2} from "./perseus-environment";

import type {ItemScore} from "../../../domain/items/score";
import type {
    PerseusDependenciesV2,
    ServerItemRendererComponent,
} from "@khanacademy/perseus";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {Hint} from "@khanacademy/perseus-core";
import type {
    HintsState,
    PreviewContent,
    PreviewOptions,
    RenderState,
} from "@khanacademy/perseus-preview";

type ExerciseData = Extract<PreviewContent, {type: "exercise"}>["data"];

function describeScore(
    {outcome, score}: ItemScore,
    strings: PerseusStrings,
): string {
    // Perseus's messages are error codes, shown to learners as these strings.
    const text = mapErrorToString(score.message, strings);
    const message = text == null ? "" : ` ${text}`;
    switch (outcome) {
        case "correct":
            return `Correct.${message}`;
        case "incorrect":
            return `Incorrect.${message}`;
        case "invalid":
            return `Not scored: Perseus would ask the learner to finish their answer.${message}`;
    }
}

/**
 * The revealed hints, in their own section below the question, each under
 * its number. ServerItemRenderer would put them straight after the question,
 * with nothing between.
 */
function Hints({
    hints,
    hintsState,
    apiOptions,
    dependencies,
}: {
    hints: ReadonlyArray<Hint>;
    hintsState: HintsState;
    apiOptions: ExerciseData["apiOptions"];
    dependencies: PerseusDependenciesV2;
}) {
    const {strings} = usePerseusI18n();
    const headingId = React.useId();
    const shown = shownHintPositions(hints, hintsState);
    if (shown.length === 0) {
        return null;
    }
    const hintApiOptions = {...ApiOptions.defaults, ...apiOptions};
    return (
        <section
            aria-labelledby={headingId}
            style={{
                marginBlockStart: "3.2rem",
                paddingBlockStart: "1.6rem",
                borderBlockStart:
                    "1px solid var(--wb-semanticColor-core-border-neutral-default)",
            }}
        >
            <h2 id={headingId}>{strings.hints}</h2>
            {/* Perseus styles hints only inside an exercise page's
                container: their border and padding, and the "n / total"
                label that hangs to the left of the last one revealed. */}
            <div className="bibliotron-exercise">
                {shown.map((pos) => (
                    <React.Fragment key={pos}>
                        <h3>{strings.hintPos({pos: pos + 1})}</h3>
                        <HintRenderer
                            hint={hints[pos]}
                            pos={pos}
                            totalHints={hints.length}
                            // Perseus emphasizes the last hint unless the author
                            // already bolded part of it.
                            lastHint={
                                pos === hints.length - 1 &&
                                !/\*\*/.test(hints[pos].content)
                            }
                            lastRendered={pos === hintsState.hintsVisible - 1}
                            apiOptions={hintApiOptions}
                            linterContext={linterContextDefault}
                            dependencies={dependencies}
                        />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}

// A key per item, so each new item (a new revision of the draft) mounts a
// new renderer: Perseus's renderers report that they've rendered only once
// per mount.
const itemKeys = new WeakMap<object, number>();
let nextItemKey = 0;

export function keyOf(item: object): number {
    let key = itemKeys.get(item);
    if (key == null) {
        key = nextItemKey++;
        itemKeys.set(item, key);
    }
    return key;
}

type RenderErrorBoundaryProps = {
    onError: (error: Error) => void;
    children: React.ReactNode;
};

/**
 * Shows why the item couldn't render, in place of the item, and reports it.
 * Perseus already contains the errors of single widgets.
 */
type RenderErrorBoundaryState = {error: Error | null};

class RenderErrorBoundary extends React.Component<
    RenderErrorBoundaryProps,
    RenderErrorBoundaryState
> {
    state: RenderErrorBoundaryState = {error: null};

    static getDerivedStateFromError(error: Error) {
        return {error};
    }

    componentDidCatch(error: Error) {
        this.props.onError(error);
    }

    render() {
        const {error} = this.state;
        return error == null ? (
            this.props.children
        ) : (
            <p role="alert">{`Perseus couldn't render this item: ${error.message}`}</p>
        );
    }
}

/**
 * The item as learners see it. Reports "done" through `onRenderState` once
 * Perseus has rendered it, images and math included, or "error" if it can't
 * render; a new item is "rendering" until then, which the shell's controller
 * assumes for new content without being told.
 */
export function Exercise(props: {
    data: ExerciseData;
    previewOptions: PreviewOptions;
    hintsState: HintsState;
    /** Called with the answer and its result each time one is checked. */
    onCheck?: (userInput: unknown, result: string) => void;
    onRenderState?: (renderState: RenderState) => void;
    /** What Perseus uses from its host; the preview pages' by default. */
    dependencies?: PerseusDependenciesV2;
}) {
    const {onRenderState} = props;
    const loading = React.useMemo(
        () => ({
            onRendered: (isRendered: boolean) => {
                if (isRendered) {
                    onRenderState?.({status: "done"});
                }
            },
        }),
        [onRenderState],
    );
    return (
        <RenderErrorBoundary
            key={keyOf(props.data.item)}
            onError={(error) =>
                onRenderState?.({status: "error", message: error.message})
            }
        >
            <LoadingContext.Provider value={loading}>
                <ExerciseItem {...props} />
            </LoadingContext.Provider>
        </RenderErrorBoundary>
    );
}

function ExerciseItem({
    data,
    previewOptions,
    hintsState,
    onCheck,
    dependencies = dependenciesV2,
}: {
    data: ExerciseData;
    previewOptions: PreviewOptions;
    hintsState: HintsState;
    onCheck?: (userInput: unknown, result: string) => void;
    dependencies?: PerseusDependenciesV2;
}) {
    const {item} = data;
    const {reviewMode, showSolutions, answerless, readOnly} = previewOptions;
    const {strings} = usePerseusI18n();
    const rendererRef = React.useRef<ServerItemRendererComponent>(null);
    const [result, setResult] = React.useState<string | null>(null);

    // Learners get the item without its answers. Showing the answers needs
    // them, so the options that do override answerless.
    const renderedItem = React.useMemo(
        () =>
            answerless && !reviewMode && showSolutions === "none"
                ? splitPerseusItem(item)
                : item,
        [item, answerless, reviewMode, showSolutions],
    );
    const apiOptions = {...data.apiOptions, readOnly};

    function checkAnswer() {
        const renderer = rendererRef.current;
        if (renderer == null) {
            return;
        }
        // Scored against the full item, as the server scores learners'
        // answers.
        const userInput = renderer.getUserInput();
        const scored = scoreItem(item, userInput, "en");
        const described = scored.ok
            ? describeScore(scored.score, strings)
            : scored.issues.map((issue) => issue.message).join(" ");
        setResult(described);
        onCheck?.(userInput, described);
    }

    return (
        <>
            {/* The hints are rendered below, by Hints. */}
            <ServerItemRenderer
                ref={rendererRef}
                item={renderedItem}
                apiOptions={apiOptions}
                reviewMode={reviewMode}
                showSolutions={showSolutions}
                dependencies={dependencies}
                problemNum={0}
                hintsVisible={0}
            />
            <p>
                <button type="button" onClick={checkAnswer}>
                    Check answer
                </button>
            </p>
            {/* An <output> is announced when its text changes, so a
                screen reader hears the result of each check. */}
            <p>
                <output>{result}</output>
            </p>
            <Hints
                hints={item.hints}
                hintsState={hintsState}
                apiOptions={apiOptions}
                dependencies={dependencies}
            />
        </>
    );
}
