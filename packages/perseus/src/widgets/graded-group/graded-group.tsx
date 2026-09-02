/* eslint-disable @khanacademy/ts-no-error-suppressions */
import Button from "@khanacademy/wonder-blocks-button";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {border, font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import {useState, useRef, useImperativeHandle, forwardRef} from "react";
import _ from "underscore";

import {
    PerseusI18nContext,
    usePerseusI18n,
} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import {useDependencies} from "../../dependencies";
import {iconOk, iconRemove} from "../../icon-paths";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mapErrorToString} from "../../strings";
import {phoneMargin, negativePhoneMargin} from "../../styles/constants";
import UserInputManager from "../../user-input-manager";
import a11y from "../../util/a11y";
import {getPromptJSON} from "../../widget-ai-utils/graded-group/graded-group-ai-utils";

import GradedGroupAnswerBar from "./graded-group-answer-bar";

import type {ANSWER_BAR_STATES} from "./graded-group-answer-bar";
import type {
    FocusPath,
    PerseusDependenciesV2,
    TrackingGradedGroupExtraArguments,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {GradedGroupPromptJSON} from "../../widget-ai-utils/graded-group/graded-group-ai-utils";
import type {
    PerseusGradedGroupWidgetOptions,
    PerseusRenderer,
    PerseusScore,
    UserInputMap,
} from "@khanacademy/perseus-core";

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
    dependencies: PerseusDependenciesV2;
};

type State = {
    status: (typeof GRADING_STATUSES)[keyof typeof GRADING_STATUSES];
    showHint: boolean;
    message: string;
    answerBarState: ANSWER_BAR_STATES;
};

export const GradedGroup2 = forwardRef<Widget, Props>(
    function GradedGroup(props, ref) {
        const {strings} = usePerseusI18n();
        const dependencies = useDependencies();

        const [status, setStatus] = useState<keyof typeof GRADING_STATUSES>(
            GRADING_STATUSES.ungraded,
        );
        const [showHint, setShowHint] = useState(false);
        const [message, setMessage] = useState("");
        const [answerBarState, setAnswerBarState] =
            useState<ANSWER_BAR_STATES>("INACTIVE");

        const rendererRef = useRef<Renderer | null>();
        const hintRendererRef = useRef<Renderer | null>();

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

            focusInputPath(path: any): void {
                rendererRef.current?.focusPath(path);
            },

            blurInputPath(path: any): void {
                rendererRef.current?.blurPath(path);
            },
        }));

        function handleUserInput(
            _userInput: UserInputMap,
            widgetsEmpty: boolean,
        ): void {
            // Reset grading display when user changes answer
            setStatus(GRADING_STATUSES.ungraded);
            setMessage("");

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

            setStatus(status);
            setMessage(message);
            // TODO(kevinb) handle 'invalid' status
            setAnswerBarState(status === "correct" ? "CORRECT" : "INCORRECT");

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

        let gradeStatus: string | null = null;
        let icon: React.ReactElement | null = null;
        if (status === GRADING_STATUSES.correct) {
            icon = (
                <InlineIcon
                    {...iconOk}
                    style={{
                        color: semanticColor.core.foreground.success.default,
                    }}
                />
            );
            gradeStatus = strings.correct;
        } else if (status === GRADING_STATUSES.incorrect) {
            icon = (
                <InlineIcon
                    {...iconRemove}
                    style={{
                        color: semanticColor.core.foreground.critical.default,
                    }}
                />
            );
            gradeStatus = strings.incorrect;
        }

        const mobileClass = props.inGradedGroupSet
            ? css(styles.gradedGroupInSet)
            : css(styles.gradedGroup);

        const classes = classNames({
            [mobileClass]: apiOptions.isMobile,
            "perseus-graded-group": true,
            "answer-correct": apiOptions.isMobile
                ? false
                : status === GRADING_STATUSES.correct,
            "answer-incorrect": apiOptions.isMobile
                ? false
                : status === GRADING_STATUSES.incorrect,
        });

        // Disabled widgets after the answer has been answered correctly to
        // prevent a situation where the answer has been marked correct but
        // looks incorrect because a user has modified it afterwards.
        const isCorrect = answerBarState === "CORRECT";
        const readOnly =
            apiOptions.readOnly || (apiOptions.isMobile && isCorrect);

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

                {!apiOptions.isMobile && (
                    <>
                        {icon != null && (
                            <div className="group-icon">{icon}</div>
                        )}

                        {gradeStatus && (
                            <div
                                className={css(a11y.srOnly)}
                                role="alert"
                                aria-label={gradeStatus}
                            >
                                {gradeStatus}
                            </div>
                        )}

                        {/* Using Renderer so TeX expressions in
                           answer messages are displayed as formatted math */}
                        <div role="status" aria-live="polite">
                            <Renderer content={message} strings={strings} />
                        </div>

                        {props.options.answerArea &&
                            apiOptions.renderExtras?.(
                                props.options.answerArea,
                                props.widgetId,
                            )}

                        <Button
                            kind="secondary"
                            disabled={props.apiOptions.readOnly}
                            onClick={checkAnswer}
                        >
                            {strings.check}
                        </Button>

                        {isCorrect && props.onNextQuestion && (
                            <Button
                                kind="secondary"
                                disabled={props.apiOptions.readOnly}
                                onClick={props.onNextQuestion}
                                style={{marginInlineStart: 5}}
                            >
                                {strings.nextQuestion}
                            </Button>
                        )}
                    </>
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
                {apiOptions.isMobile && (
                    <GradedGroupAnswerBar
                        apiOptions={apiOptions}
                        answerBarState={answerBarState}
                        onCheckAnswer={checkAnswer}
                        onNextQuestion={props.onNextQuestion}
                    />
                )}
            </div>
        );
    },
);

// A Graded Group is more or less a Group widget that displays a check
// answer button below the rendered content. When clicked, the widget grades
// the stuff inside and displays feedback about whether the inputted answer was
// correct or not.
export class GradedGroup
    extends React.Component<Props, State>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    state: State = {
        status: GRADING_STATUSES.ungraded,
        showHint: false,
        message: "",
        answerBarState: "INACTIVE",
    };

    rendererRef = React.createRef<Renderer>();
    hintRendererRef = React.createRef<Renderer>();

    componentDidMount(): void {
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetType: "graded-group",
                widgetSubType: "null",
                widgetId: this.props.widgetId,
            },
        });
    }

    _handleUserInput(_userInput: UserInputMap, widgetsEmpty: boolean): void {
        // Reset grading display when user changes answer
        this.setState({
            status: GRADING_STATUSES.ungraded,
            message: "",
        });
        const answerable = !widgetsEmpty;
        const answerBarState = this.state.answerBarState;
        const nextState = getNextState(answerBarState, answerable);
        this.setState({
            answerBarState: nextState,
        });
    }

    _checkAnswer: () => void = () => {
        const score: PerseusScore = this.rendererRef.current?.score() || {
            type: "invalid",
        };
        const {
            INVALID_MESSAGE_PREFIX,
            DEFAULT_INVALID_MESSAGE_1,
            DEFAULT_INVALID_MESSAGE_2,
        } = this.context.strings;

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
                  ? `${INVALID_MESSAGE_PREFIX} ${mapErrorToString(score.message, this.context.strings)}`
                  : `${INVALID_MESSAGE_PREFIX} ${DEFAULT_INVALID_MESSAGE_1}${DEFAULT_INVALID_MESSAGE_2}`;

        this.setState({
            status: status,
            message: message,
            // TODO(kevinb) handle 'invalid' status
            answerBarState: status === "correct" ? "CORRECT" : "INCORRECT",
        });

        this.props.trackInteraction({
            status: status,
        });
    };

    // Mobile API
    getInputPaths: () => ReadonlyArray<FocusPath> = () => {
        return this.rendererRef.current?.getInputPaths() || [];
    };

    getPromptJSON(): GradedGroupPromptJSON {
        // If the hint isn't expanded, we can't get the prompt JSON from the rendered widgets.
        // We'll just pass in the hint content as a string instead.
        const hint = this.hintRendererRef.current?.getPromptJSON() || {
            content: this.props.options.hint?.content || "",
            widgets: {},
        };

        return getPromptJSON(
            this.props.options.title,
            this.rendererRef.current?.getPromptJSON(),
            hint,
        );
    }

    focus: () => boolean = () => {
        return !!this.rendererRef.current?.focus();
    };

    focusInputPath: (arg1: any) => void = (path) => {
        this.rendererRef.current?.focusPath(path);
    };

    blurInputPath: (arg1: any) => void = (path) => {
        this.rendererRef.current?.blurPath(path);
    };

    render(): React.ReactNode {
        const apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                // Api Rewriting to support correct onFocus/onBlur
                // events for the mobile API
                onFocusChange: (newFocus, oldFocus) => {
                    if (oldFocus) {
                        this.props.onBlur(oldFocus);
                    }
                    if (newFocus) {
                        this.props.onFocus(newFocus);
                    }
                },
            },
        );

        let gradeStatus: string | null = null;
        let icon: React.ReactElement | null = null;
        if (this.state.status === GRADING_STATUSES.correct) {
            icon = (
                <InlineIcon
                    {...iconOk}
                    style={{
                        color: semanticColor.core.foreground.success.default,
                    }}
                />
            );
            gradeStatus = this.context.strings.correct;
        } else if (this.state.status === GRADING_STATUSES.incorrect) {
            icon = (
                <InlineIcon
                    {...iconRemove}
                    style={{
                        color: semanticColor.core.foreground.critical.default,
                    }}
                />
            );
            gradeStatus = this.context.strings.incorrect;
        }

        const mobileClass = this.props.inGradedGroupSet
            ? css(styles.gradedGroupInSet)
            : css(styles.gradedGroup);

        const classes = classNames({
            [mobileClass]: apiOptions.isMobile,
            "perseus-graded-group": true,
            "answer-correct": apiOptions.isMobile
                ? false
                : this.state.status === GRADING_STATUSES.correct,
            "answer-incorrect": apiOptions.isMobile
                ? false
                : this.state.status === GRADING_STATUSES.incorrect,
        });

        const {answerBarState} = this.state;

        // Disabled widgets after the answer has been answered correctly to
        // prevent a situation where the answer has been marked correct but
        // looks incorrect because a user has modified it afterwards.
        const isCorrect = answerBarState === "CORRECT";
        const readOnly =
            apiOptions.readOnly || (apiOptions.isMobile && isCorrect);

        // We only want to show the solutions and rationale if the answer is correct
        const showSolutions = isCorrect ? "all" : "none";

        return (
            <div className={classes}>
                {!!this.props.options.title && (
                    <div className={css(styles.title)}>
                        {this.props.options.title}
                    </div>
                )}
                <UserInputManager
                    widgets={this.props.options.widgets}
                    handleUserInput={(
                        userInput: UserInputMap,
                        widgetsEmpty: boolean,
                    ) => this._handleUserInput(userInput, widgetsEmpty)}
                    problemNum={this.props.problemNum ?? 0}
                >
                    {({userInput, handleUserInput}) => (
                        <Renderer
                            content={this.props.options.content}
                            widgets={this.props.options.widgets}
                            images={this.props.options.images}
                            userInput={userInput}
                            handleUserInput={handleUserInput}
                            problemNum={this.props.problemNum ?? 0}
                            ref={this.rendererRef}
                            keypadElement={this.props.keypadElement}
                            apiOptions={{...apiOptions, readOnly}}
                            showSolutions={showSolutions}
                            linterContext={this.props.linterContext}
                            strings={this.context.strings}
                        />
                    )}
                </UserInputManager>

                {!apiOptions.isMobile && (
                    <>
                        {icon != null && (
                            <div className="group-icon">{icon}</div>
                        )}

                        {gradeStatus && (
                            <div
                                className={css(a11y.srOnly)}
                                role="alert"
                                aria-label={gradeStatus}
                            >
                                {gradeStatus}
                            </div>
                        )}

                        {/* Using Renderer so TeX expressions in
                           answer messages are displayed as formatted math */}
                        <div role="status" aria-live="polite">
                            <Renderer
                                content={this.state.message}
                                strings={this.context.strings}
                            />
                        </div>

                        {this.props.options.answerArea &&
                            apiOptions.renderExtras?.(
                                this.props.options.answerArea,
                                this.props.widgetId,
                            )}

                        <Button
                            kind="secondary"
                            disabled={this.props.apiOptions.readOnly}
                            onClick={this._checkAnswer}
                        >
                            {this.context.strings.check}
                        </Button>

                        {isCorrect && this.props.onNextQuestion && (
                            <Button
                                kind="secondary"
                                disabled={this.props.apiOptions.readOnly}
                                onClick={this.props.onNextQuestion}
                                style={{marginInlineStart: 5}}
                            >
                                {this.context.strings.nextQuestion}
                            </Button>
                        )}
                    </>
                )}

                {this.props.options.hint?.content &&
                    (this.state.showHint ? (
                        <div>
                            {/* Not using Button here bc the styles won't work. */}
                            <button
                                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
                                tabIndex="0"
                                className={css(styles.explanationTitle)}
                                onClick={() => this.setState({showHint: false})}
                                onKeyPress={(e) => {
                                    // preventDefault stops the screen from scrolling down on keypress
                                    e.preventDefault();
                                    this.setState({showHint: false});
                                }}
                            >
                                {this.context.strings.hideExplanation}
                            </button>

                            <UserInputManager
                                widgets={this.props.options.hint.widgets}
                                problemNum={this.props.problemNum ?? 0}
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
                                    const {content, widgets, images} = this
                                        .props.options.hint as PerseusRenderer;
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
                                            ref={this.hintRendererRef}
                                            apiOptions={apiOptions}
                                            linterContext={
                                                this.props.linterContext
                                            }
                                            strings={this.context.strings}
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
                            onClick={() => this.setState({showHint: true})}
                            onKeyPress={(e) => {
                                // preventDefault stops the screen from scrolling down on keypress
                                e.preventDefault();
                                this.setState({showHint: true});
                            }}
                            className={css(styles.showHintLink)}
                        >
                            {this.context.strings.explain}
                        </button>
                    ))}
                {apiOptions.isMobile && (
                    <GradedGroupAnswerBar
                        apiOptions={apiOptions}
                        answerBarState={answerBarState}
                        onCheckAnswer={this._checkAnswer}
                        onNextQuestion={this.props.onNextQuestion}
                    />
                )}
            </div>
        );
    }
}

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

// const WrappedGradedGroup = withDependencies(GradedGroup);

export default {
    name: "graded-group",
    displayName: "Graded group (articles only)",
    widget: GradedGroup2,
    hidden: false,
    tracking: "all",
    isLintable: true,
} satisfies WidgetExports<typeof GradedGroup2>;
