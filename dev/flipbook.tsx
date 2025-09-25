/* eslint monorepo/no-internal-import: "off", monorepo/no-relative-import: "off", import/no-relative-packages: "off" */
import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {SchedulePolicy, useTimeout} from "@khanacademy/wonder-blocks-timing";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import cameraSlashIcon from "@phosphor-icons/core/regular/camera-slash.svg";
import graphIcon from "@phosphor-icons/core/regular/graph.svg";
import imageIcon from "@phosphor-icons/core/regular/image.svg";
import * as React from "react";
import {useEffect, useMemo, useReducer, useRef, useState} from "react";

import {Renderer} from "../packages/perseus/src";
import {SvgImage} from "../packages/perseus/src/components";
import {mockStrings} from "../packages/perseus/src/strings";
import {isCorrect} from "../packages/perseus/src/util/scoring";
import {scorePerseusItem} from "../packages/perseus-score/src";

import {EditableControlledInput} from "./editable-controlled-input";
import {
    flipbookModelReducer,
    jumpToQuestion,
    loadQuestionsFromStorage,
    next,
    previous,
    removeCurrentQuestion,
    selectCurrentQuestion,
    selectCurrentQuestionAsJSON,
    selectCurrentQuestionIndex,
    selectNumQuestions,
    setQuestions,
} from "./flipbook-model";
import {Header} from "./header";

import type {APIOptions} from "../packages/perseus/src";
import type {
    InteractiveGraphWidget,
    PerseusRenderer,
    PerseusWidget,
} from "../packages/perseus-core/src/data-schema";
import type {PerseusScore} from "../packages/perseus-core/src/validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

import "../packages/perseus/src/styles/perseus-renderer.css";

const exampleCommands = `
# copy all questions
cat data/questions/*/*/* | pbcopy

# copy all segment questions
grep -rl '"type":"segment"' data/questions/ | xargs cat | pbcopy
`.trim();

const LS_QUESTIONS_KEY = "FLIPBOOK-QUESTIONS-JSON";

function isInteractiveGraph(
    widget: PerseusWidget,
): widget is InteractiveGraphWidget {
    return widget.type === "interactive-graph";
}

function isGraphieUrl(url: string) {
    return url.startsWith("web+graphie://");
}

export function Flipbook() {
    const [state, dispatch] = useReducer(flipbookModelReducer, {
        questions: "",
        requestedIndex: 0,
    });

    const questionJSON = selectCurrentQuestionAsJSON(state);
    const question = selectCurrentQuestion(state);
    const numQuestions = selectNumQuestions(state);
    const index = selectCurrentQuestionIndex(state);

    const questionsState = state.questions.trim();
    const noTextEntered = questionsState === "";

    const imageUrls = useMemo<ReadonlyArray<string>>(
        () =>
            Object.values(question?.widgets ?? {})
                .filter(isInteractiveGraph)
                .map((w) => w.options.backgroundImage?.url ?? "")
                .filter((url) => url.length > 0),
        [question],
    );

    useEffect(() => {
        const localStorageQuestions =
            localStorage.getItem(LS_QUESTIONS_KEY) || "";
        dispatch(loadQuestionsFromStorage(localStorageQuestions));
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_QUESTIONS_KEY, questionsState);
    }, [questionsState]);

    return (
        <>
            <Header>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexBasis: "max-content",
                    }}
                >
                    <nav>
                        <a href="/">Gallery</a>
                    </nav>
                </View>
            </Header>
            <View style={{padding: spacing.medium_16}}>
                <textarea
                    wrap={"off"}
                    rows={10}
                    style={{width: "100%"}}
                    value={state.questions}
                    onChange={(e) => dispatch(setQuestions(e.target.value))}
                />
                <Toolbar
                    leftContent={
                        <>
                            <Button
                                kind="secondary"
                                onClick={() => dispatch(previous)}
                            >
                                Previous
                            </Button>
                            <Strut size={spacing.xxSmall_6} />
                            <Button
                                kind="secondary"
                                onClick={() => dispatch(next)}
                            >
                                Next
                            </Button>
                            <Strut size={spacing.medium_16} />
                            <Progress
                                zeroBasedIndex={index}
                                total={numQuestions}
                                onIndexChanged={(input) =>
                                    dispatch(jumpToQuestion(input))
                                }
                            />
                            <Strut size={spacing.medium_16} />
                            <Button
                                kind="tertiary"
                                onClick={() => dispatch(removeCurrentQuestion)}
                            >
                                Discard question
                            </Button>
                        </>
                    }
                    rightContent={
                        <View>
                            {imageUrls?.map((url) => (
                                <Tooltip
                                    key={url}
                                    placement="right"
                                    content={<GraphiePreview url={url} />}
                                >
                                    <IconButton
                                        kind="tertiary"
                                        icon={
                                            isGraphieUrl(url)
                                                ? graphIcon
                                                : imageIcon
                                        }
                                    />
                                </Tooltip>
                            ))}
                            {(imageUrls?.length ?? 0) === 0 && (
                                <Tooltip
                                    placement="right"
                                    content={
                                        "This graph does not specify a background image"
                                    }
                                >
                                    <IconButton
                                        icon={cameraSlashIcon}
                                        kind="tertiary"
                                    />
                                </Tooltip>
                            )}
                        </View>
                    }
                />

                <Strut size={spacing.small_12} />
                <div style={{display: noTextEntered ? "block" : "none"}}>
                    <h2>Instructions</h2>
                    <ol>
                        <li>
                            <p>
                                Run a command like one of the following to copy
                                question data to your clipboard.
                            </p>
                            <code>
                                <pre>{exampleCommands}</pre>
                            </code>
                        </li>
                        <li>
                            <p>Paste the data in the box above.</p>
                        </li>
                    </ol>
                </div>
                {question != null && (
                    // Passing a key here ensures that the graph state is
                    // cleared out if a new graph is rendered at the same DOM
                    // location as a previous graph.
                    <SideBySideQuestionRenderer
                        key={questionJSON}
                        question={question}
                    />
                )}
            </View>
        </>
    );
}

type QuestionRendererProps = {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
};

function SideBySideQuestionRenderer({
    question,
    apiOptions = {},
}: QuestionRendererProps) {
    return (
        <>
            <View
                className="framework-perseus"
                style={{
                    flexDirection: "row",
                    padding: spacing.medium_16,
                    gap: spacing.medium_16,
                    background: "#f8f8f8",
                }}
            >
                <GradableRenderer
                    question={question}
                    apiOptions={{
                        ...apiOptions,
                    }}
                />
            </View>
            <div>
                <pre style={{whiteSpace: "pre-wrap"}}>
                    <code>{JSON.stringify(question)}</code>
                </pre>
            </div>
        </>
    );
}

function GradableRenderer(props: QuestionRendererProps) {
    const {question, apiOptions} = props;
    const rendererRef = useRef<Renderer>(null);
    const [score, setScore] = useState<PerseusScore>();

    const clearScoreTimeout = useTimeout(() => setScore(undefined), 2500, {
        schedulePolicy: SchedulePolicy.OnDemand,
    });

    function describeScore(score: PerseusScore): string {
        switch (score.type) {
            case "invalid":
                return "You didn't answer the question.";
            case "points":
                return isCorrect(score) ? "Correct!" : "Incorrect.";
        }
    }

    function bannerKindFromScore(
        score: PerseusScore,
    ): PropsFor<typeof Banner>["kind"] {
        switch (score.type) {
            case "invalid":
                return "critical";
            case "points":
                if (score.earned === score.total) {
                    return "success";
                } else {
                    return "warning";
                }
            default:
                throw new UnreachableCaseError(score);
        }
    }

    return (
        <View
            style={{
                alignItems: "flex-start",
                overflow: "hidden",
                background: color.white,
                padding: spacing.medium_16,
            }}
        >
            <Renderer
                ref={rendererRef}
                content={question.content}
                images={question.images}
                widgets={question.widgets}
                problemNum={0}
                apiOptions={{...apiOptions}}
                strings={mockStrings}
            />
            <Toolbar
                leftContent={
                    <Button
                        onClick={() => {
                            if (rendererRef.current) {
                                const score = scorePerseusItem(
                                    question,
                                    rendererRef.current.getUserInputMap(),
                                    "en",
                                );
                                setScore(score);
                            }
                            clearScoreTimeout.set();
                        }}
                    >
                        Check answer
                    </Button>
                }
            />
            {score && (
                <View
                    style={{
                        position: "absolute",
                        alignSelf: "center",
                        width: "60%",
                        top: "150px",
                        zIndex: "1000",
                    }}
                >
                    <Banner
                        text={describeScore(score)}
                        kind={bannerKindFromScore(score)}
                    />
                </View>
            )}
        </View>
    );
}

type ProgressProps = {
    zeroBasedIndex: number;
    total: number;
    onIndexChanged: (rawUserInput: string) => unknown;
};

function Progress(props: ProgressProps) {
    const {zeroBasedIndex, total, onIndexChanged} = props;
    const indexToDisplay = Math.min(total, zeroBasedIndex + 1);
    return (
        <div>
            <EditableControlledInput
                value={String(indexToDisplay)}
                onInput={onIndexChanged}
                style={{width: "4em", textAlign: "right"}}
            />
            &nbsp;of {total}
        </div>
    );
}

type GraphiePreviewProps = {url: string};

function GraphiePreview({url}: GraphiePreviewProps) {
    return (
        <>
            <Toolbar
                leftContent={
                    <View style={{display: "flex", flexDirection: "row"}}>
                        This question uses a
                        {isGraphieUrl(url) ? (
                            <Link
                                href={`http://graphie-to-png.khanacademy.systems?preload=${encodeURIComponent(url)}`}
                                target="_blank"
                                style={{
                                    marginLeft: spacing.xxSmall_6,
                                    marginRight: spacing.xxSmall_6,
                                }}
                            >
                                Graphie
                            </Link>
                        ) : (
                            " regular image "
                        )}
                        background.
                    </View>
                }
                rightContent={<></>}
            />
            <View
                className="framework-perseus"
                style={{margin: spacing.medium_16, border: "solid 1px grey"}}
            >
                <SvgImage
                    alt={"The background image for this graph question"}
                    src={url}
                />
            </View>
        </>
    );
}
