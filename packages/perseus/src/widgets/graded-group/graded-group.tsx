/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    getWidgetIdsFromContent,
    type PerseusGradedGroupWidgetOptions,
    type PerseusRenderer,
    type PerseusScore,
    type UserInputMap,
} from "@khanacademy/perseus-core";
import {emptyWidgetsFunctional} from "@khanacademy/perseus-score";
import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import Banner from "@khanacademy/wonder-blocks-banner";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {border, font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import {
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import _ from "underscore";

import {usePerseusI18n} from "../../components/i18n-context";
import {useDependencies} from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mapErrorToString} from "../../strings";
import {phoneMargin, negativePhoneMargin} from "../../styles/constants";
import UserInputManager, {
    sharedInitializeUserInput,
} from "../../user-input-manager";
import {getPromptJSON} from "../../widget-ai-utils/graded-group/graded-group-ai-utils";

import GradedGroupAnswerBar from "./graded-group-answer-bar";

import type {ANSWER_BAR_STATES} from "./graded-group-answer-bar";
import type {
    FocusPath,
    TrackingGradedGroupExtraArguments,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {GradedGroupPromptJSON} from "../../widget-ai-utils/graded-group/graded-group-ai-utils";

const GRADING_STATUSES = {
    ungraded: "ungraded" as const,
    correct: "correct" as const,
    incorrect: "incorrect" as const,
    invalid: "invalid" as const,
} as const;

// Update answer bar state based on current state and whether the question is
// answerable (all parts have been filled out) or not.
const getNextState = (
    currentState: ANSWER_BAR_STATES,
    answerable,
): ANSWER_BAR_STATES => {
    switch (currentState) {
        case "ACTIVE":
            return !answerable ? "INACTIVE" : currentState;
        case "INACTIVE":
            return answerable ? "ACTIVE" : currentState;
        case "INCORRECT":
            return answerable ? "ACTIVE" : "INACTIVE";
        default:
            return currentState;
    }
};

type Props = WidgetProps<
    PerseusGradedGroupWidgetOptions,
    Empty,
    TrackingGradedGroupExtraArguments
> & {
    inGradedGroupSet?: boolean; // Set by graded-group-set.jsx,
    onNextQuestion?: () => unknown; // Set by graded-group-set.jsx
};

/**
 * Provides a more specific interface than Widget for GradedGroupSet to use.
 */
export interface GradedGroupHandle {
    getInputPaths(): ReadonlyArray<FocusPath>;
    getPromptJSON(): GradedGroupPromptJSON;
    focus(): boolean;
    focusInputPath(path: FocusPath): void;
    blurInputPath(path: FocusPath): void;
}

// A Graded Group is more or less a Group widget that displays a check
// answer button below the rendered content. When clicked, the widget grades
// the stuff inside and displays feedback about whether the inputted answer was
// correct or not.
export const GradedGroup = forwardRef<GradedGroupHandle, Props>(
    function GradedGroup(props, ref) {
        const {strings, locale} = usePerseusI18n();
        const dependencies = useDependencies();

        const [showHint, setShowHint] = useState(false);
        const [message, setMessage] = useState("");
        const [messageIsForInvalidState, setMessageIsForInvalidState] =
            useState(false);

        // Allow moving on when the Graded Group doesn't have any
        // answerable widgets in it.
        const [answerBarState, setAnswerBarState] = useState<ANSWER_BAR_STATES>(
            () => {
                const {widgets} = props.options;
                const emptyWidgetIds = emptyWidgetsFunctional(
                    widgets,
                    getWidgetIdsFromContent(props.options.content),
                    sharedInitializeUserInput(widgets, props.problemNum ?? 0),
                    locale,
                );
                return emptyWidgetIds.length > 0 ? "INACTIVE" : "ACTIVE";
            },
        );

        const rendererRef = useRef<Renderer | null>(null);
        const hintRendererRef = useRef<Renderer | null>(null);
        const resultRef = useRef<HTMLOutputElement>(null);

        // Don't let focus fall back to the body after answer is checked and
        // the "Check/Try again" button is unmounted.
        useEffect(() => {
            if (answerBarState === "CORRECT") {
                resultRef.current?.focus();
            }
        }, [answerBarState]);

        useOnMountEffect(() => {
            dependencies.analytics.onAnalyticsEvent({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetType: "graded-group",
                    widgetSubType: "null",
                    widgetId: props.widgetId,
                },
            });
        });

        useImperativeHandle(ref, () => ({
            // Mobile API
            getInputPaths(): ReadonlyArray<FocusPath> {
                return rendererRef.current?.getInputPaths() || [];
            },

            getPromptJSON(): GradedGroupPromptJSON {
                // If the hint isn't expanded, we can't get the prompt JSON from the rendered widgets.
                // We'll just pass in the hint content as a string instead.
                const hint = hintRendererRef.current?.getPromptJSON() || {
                    content: props.options.hint?.content || "",
                    widgets: {},
                };

                return getPromptJSON(
                    props.options.title,
                    rendererRef.current?.getPromptJSON(),
                    hint,
                );
            },

            focus(): boolean {
                return !!rendererRef.current?.focus();
            },

            focusInputPath(path: FocusPath): void {
                rendererRef.current?.focusPath(path);
            },

            blurInputPath(path: FocusPath): void {
                rendererRef.current?.blurPath(path);
            },
        }));

        function handleUserInput(
            _userInput: UserInputMap,
            widgetsEmpty: boolean,
        ): void {
            // Reset grading display when user changes answer
            setMessage("");
            setMessageIsForInvalidState(false);

            const answerable = !widgetsEmpty;
            const nextState = getNextState(answerBarState, answerable);
            setAnswerBarState(nextState);
        }

        function checkAnswer() {
            const score: PerseusScore = rendererRef.current?.score() || {
                type: "invalid",
            };
            const {
                INVALID_MESSAGE_PREFIX,
                DEFAULT_INVALID_MESSAGE_1,
                DEFAULT_INVALID_MESSAGE_2,
            } = strings;

            const status =
                score.type === "points"
                    ? score.total === score.earned
                        ? GRADING_STATUSES.correct
                        : GRADING_STATUSES.incorrect
                    : GRADING_STATUSES.invalid;
            const message =
                score.type === "points"
                    ? score.message || ""
                    : score.message
                      ? `${INVALID_MESSAGE_PREFIX} ${mapErrorToString(score.message, strings)}`
                      : `${INVALID_MESSAGE_PREFIX} ${DEFAULT_INVALID_MESSAGE_1}${DEFAULT_INVALID_MESSAGE_2}`;

            setMessage(message);
            setMessageIsForInvalidState(status === GRADING_STATUSES.invalid);
            setAnswerBarState(status === "correct" ? "CORRECT" : "INCORRECT");

            // Only an "Incorrect" answer needs explicit announcing here.
            // ("Correct" state reads out when we move focus to it.
            // "Invalid" state is in a WB Banner, which handles its own announcement.)
            if (status === GRADING_STATUSES.incorrect) {
                announceMessage({message: strings.keepTrying});
            }

            props.trackInteraction({
                status: status,
            });
        }

        const apiOptions = _.extend({}, ApiOptions.defaults, props.apiOptions, {
            // Api Rewriting to support correct onFocus/onBlur
            // events for the mobile API
            onFocusChange: (newFocus, oldFocus) => {
                if (oldFocus) {
                    props.onBlur(oldFocus);
                }
                if (newFocus) {
                    props.onFocus(newFocus);
                }
            },
        });

        const classes = classNames(
            "perseus-graded-group",
            props.inGradedGroupSet
                ? css(styles.gradedGroupInSet)
                : css(styles.gradedGroup),
        );

        // Disabled widgets after the answer has been answered correctly to
        // prevent a situation where the answer has been marked correct but
        // looks incorrect because a user has modified it afterwards.
        const isCorrect = answerBarState === "CORRECT";
        const readOnly = apiOptions.readOnly || isCorrect;

        // We only want to show the solutions and rationale if the answer is correct
        const showSolutions = isCorrect ? "all" : "none";

        return (
            <div className={classes}>
                {!!props.options.title && (
                    <div className={css(styles.title)}>
                        {props.options.title}
                    </div>
                )}
                <UserInputManager
                    widgets={props.options.widgets}
                    handleUserInput={(
                        userInput: UserInputMap,
                        widgetsEmpty: boolean,
                    ) => handleUserInput(userInput, widgetsEmpty)}
                    problemNum={props.problemNum ?? 0}
                >
                    {({userInput, handleUserInput}) => (
                        <Renderer
                            content={props.options.content}
                            widgets={props.options.widgets}
                            images={props.options.images}
                            userInput={userInput}
                            handleUserInput={handleUserInput}
                            problemNum={props.problemNum ?? 0}
                            ref={rendererRef}
                            keypadElement={props.keypadElement}
                            apiOptions={{...apiOptions, readOnly}}
                            showSolutions={showSolutions}
                            linterContext={props.linterContext}
                            strings={strings}
                        />
                    )}
                </UserInputManager>

                {messageIsForInvalidState ? (
                    <Banner
                        kind="warning"
                        text={
                            <div className="perseus-graded-group-banner-message">
                                <Renderer content={message} strings={strings} />
                            </div>
                        }
                    />
                ) : (
                    <div role="status" aria-live="polite">
                        <Renderer content={message} strings={strings} />
                    </div>
                )}

                {props.options.answerArea &&
                    apiOptions.renderExtras?.(
                        props.options.answerArea,
                        props.widgetId,
                    )}

                {props.options.hint?.content &&
                    (showHint ? (
                        <div>
                            {/* Not using Button here bc the styles won't work. */}
                            <button
                                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
                                tabIndex="0"
                                className={css(styles.explanationTitle)}
                                onClick={() => setShowHint(false)}
                                onKeyPress={(e) => {
                                    // preventDefault stops the screen from scrolling down on keypress
                                    e.preventDefault();
                                    setShowHint(false);
                                }}
                            >
                                {strings.hideExplanation}
                            </button>

                            <UserInputManager
                                widgets={props.options.hint.widgets}
                                problemNum={props.problemNum ?? 0}
                            >
                                {({
                                    userInput,
                                    handleUserInput,
                                    initializeUserInput,
                                }) => {
                                    // we did a check above to make sure hints exists
                                    // TODO(benchristel): extract a renderHint
                                    //  function; then we can remove this cast.
                                    // eslint-disable-next-line no-restricted-syntax
                                    const {content, widgets, images} = props
                                        .options.hint as PerseusRenderer;
                                    return (
                                        <Renderer
                                            content={content}
                                            widgets={widgets}
                                            images={images}
                                            userInput={userInput}
                                            handleUserInput={handleUserInput}
                                            initializeUserInput={
                                                initializeUserInput
                                            }
                                            ref={hintRendererRef}
                                            apiOptions={apiOptions}
                                            linterContext={props.linterContext}
                                            strings={strings}
                                            showSolutions={showSolutions}
                                        />
                                    );
                                }}
                            </UserInputManager>
                        </div>
                    ) : (
                        // Not using Button here bc the styles won't work.
                        <button
                            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
                            tabIndex="0"
                            onClick={() => setShowHint(true)}
                            onKeyPress={(e) => {
                                // preventDefault stops the screen from scrolling down on keypress
                                e.preventDefault();
                                setShowHint(true);
                            }}
                            className={css(styles.showHintLink)}
                        >
                            {strings.explain}
                        </button>
                    ))}
                <GradedGroupAnswerBar
                    apiOptions={apiOptions}
                    answerBarState={answerBarState}
                    onCheckAnswer={checkAnswer}
                    onNextQuestion={props.onNextQuestion}
                    resultRef={resultRef}
                />
            </div>
        );
    },
);

const styles = StyleSheet.create({
    gradedGroupInSet: {
        // Reset a few desktop-only styles that come from graded-group.css
        marginInlineStart: 0,
        paddingInlineStart: 0,
    },

    gradedGroup: {
        borderBlockStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderBlockEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.subtle,
        marginInlineStart: negativePhoneMargin,
        marginInlineEnd: negativePhoneMargin,
        paddingBlockEnd: phoneMargin,
        paddingInlineStart: phoneMargin,
        paddingInlineEnd: phoneMargin,
        paddingBlockStart: 10,
        width: "auto",
    },

    showHintLink: {
        backgroundColor: "unset",
        fontSize: font.body.size.small,
        padding: 0,
        border: "none",
        marginBlockStart: 20,
        color: semanticColor.core.foreground.instructive.default,
        cursor: "pointer",
        display: "block",
        clear: "both",
    },

    explanationTitle: {
        backgroundColor: "unset",
        marginBlockStart: 20,
        color: semanticColor.core.foreground.instructive.default,
        marginBlockEnd: 10,
        cursor: "pointer",
        fontSize: font.body.size.small,
        padding: 0,
        border: "none",
        display: "block",
        clear: "both",
    },

    title: {
        fontSize: font.heading.size.small,
        color: semanticColor.core.foreground.neutral.default,
        textTransform: "uppercase",
        marginBlockEnd: 11,
        letterSpacing: 0.8,
    },
});

export default {
    name: "graded-group",
    displayName: "Graded group (articles only)",
    widget: GradedGroup,
    hidden: false,
    tracking: "all",
    isLintable: true,
} satisfies WidgetExports<typeof GradedGroup>;
