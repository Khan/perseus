/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import withAPIOptions from "../../components/with-api-options";
import {iconOk, iconRemove} from "../../icon-paths";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mapErrorToString} from "../../strings";
import {
    gray68,
    gray76,
    phoneMargin,
    negativePhoneMargin,
    tableBackgroundAccent,
} from "../../styles/constants";
import UserInputManager from "../../user-input-manager";
import a11y from "../../util/a11y";
import {getPromptJSON} from "../../widget-ai-utils/graded-group/graded-group-ai-utils";

import GradedGroupAnswerBar from "./graded-group-answer-bar";

import type {ANSWER_BAR_STATES} from "./graded-group-answer-bar";
import type {
    APIOptions,
    FocusPath,
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
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

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

type PropsWithAPIOptions = {
    apiOptions: APIOptions;
};

type Props = PropsWithAPIOptions &
    WidgetProps<
        PerseusGradedGroupWidgetOptions,
        Empty,
        TrackingGradedGroupExtraArguments
    > & {
        inGradedGroupSet?: boolean; // Set by graded-group-set.jsx,
        onNextQuestion?: () => unknown; // Set by graded-group-set.jsx
    };

type DefaultProps = {
    title: Props["title"];
    content: Props["content"];
    widgets: Props["widgets"];
    images: Props["images"];
    hint: Props["hint"];
    hasHint: Props["hasHint"];
    linterContext: Props["linterContext"];
};

type State = {
    status: (typeof GRADING_STATUSES)[keyof typeof GRADING_STATUSES];
    showHint: boolean;
    message: string;
    answerBarState: ANSWER_BAR_STATES;
};

// Assert that the PerseusGradedGroupWidgetOptions parsed from JSON can be
// passed as props to this component. This ensures that the
// PerseusGradedGroupWidgetOptions stays in sync with the prop types. The
// PropsFor<Component> type takes defaultProps into account, which is important
// because PerseusGradedGroupWidgetOptions has optional fields which receive defaults
// via defaultProps.
0 as any as WidgetProps<
    PerseusGradedGroupWidgetOptions,
    Empty
> satisfies PropsFor<typeof GradedGroup>;

// A Graded Group is more or less a Group widget that displays a check
// answer button below the rendered content. When clicked, the widget grades
// the stuff inside and displays feedback about whether the inputted answer was
// correct or not.
class GradedGroupClass extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        title: "",
        content: "",
        widgets: {},
        images: {},
        hint: null,
        hasHint: false,
        linterContext: linterContextDefault,
    };

    state: State = {
        status: GRADING_STATUSES.ungraded,
        showHint: false,
        message: "",
        answerBarState: "INACTIVE",
    };

    rendererRef = React.createRef<Renderer>();
    hintRendererRef = React.createRef<Renderer>();

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps !== this.props || nextState !== this.state;
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
            content: this.props.hint?.content || "",
            widgets: {},
        };

        return getPromptJSON(
            this.props.title,
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
        const gradedGroupAPIOptions = _.extend(
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
        let icon = null;
        // Colors are 10% darker than the colors in graded-group.css
        if (this.state.status === GRADING_STATUSES.correct) {
            // TODO(jeremy): update to a WB colour
            // @ts-expect-error - TS2322 - Type 'Element' is not assignable to type 'null'.
            icon = <InlineIcon {...iconOk} style={{color: "#526f03"}} />;
            gradeStatus = this.context.strings.correct;
        } else if (this.state.status === GRADING_STATUSES.incorrect) {
            // TODO(jeremy): update to a WB colour
            // @ts-expect-error - TS2322 - Type 'Element' is not assignable to type 'null'.
            icon = <InlineIcon {...iconRemove} style={{color: "#ff5454"}} />;
            gradeStatus = this.context.strings.incorrect;
        }

        const mobileClass = this.props.inGradedGroupSet
            ? css(styles.gradedGroupInSet)
            : css(styles.gradedGroup);

        const classes = classNames({
            [mobileClass]: gradedGroupAPIOptions.isMobile,
            "perseus-graded-group": true,
            "answer-correct": gradedGroupAPIOptions.isMobile
                ? false
                : this.state.status === GRADING_STATUSES.correct,
            "answer-incorrect": gradedGroupAPIOptions.isMobile
                ? false
                : this.state.status === GRADING_STATUSES.incorrect,
        });

        const {answerBarState} = this.state;

        // Disabled widgets after the answer has been answered correctly to
        // prevent a situation where the answer has been marked correct but
        // looks incorrect because a user has modified it afterwards.
        const isCorrect = answerBarState === "CORRECT";
        const readOnly =
            gradedGroupAPIOptions.readOnly ||
            (gradedGroupAPIOptions.isMobile && isCorrect);

        // We only want to show the solutions and rationale if the answer is correct
        const showSolutions = isCorrect ? "all" : "none";

        return (
            <div className={classes}>
                {!!this.props.title && (
                    <div className={css(styles.title)}>{this.props.title}</div>
                )}
                <UserInputManager
                    widgets={this.props.widgets}
                    handleUserInput={(
                        userInput: UserInputMap,
                        widgetsEmpty: boolean,
                    ) => this._handleUserInput(userInput, widgetsEmpty)}
                    problemNum={0}
                >
                    {({userInput, handleUserInput}) => (
                        <Renderer
                            content={this.props.content}
                            widgets={this.props.widgets}
                            images={this.props.images}
                            userInput={userInput}
                            handleUserInput={handleUserInput}
                            problemNum={0}
                            // userInput={this.props.userInput}
                            // handleUserInput={(widgetId, userInput) => {
                            //     this.props.handleUserInput({
                            //         ...this.props.userInput,
                            //         [widgetId]: userInput,
                            //     });
                            // }}
                            ref={this.rendererRef}
                            keypadElement={this.props.keypadElement}
                            apiOptions={{...gradedGroupAPIOptions, readOnly}}
                            showSolutions={showSolutions}
                            linterContext={this.props.linterContext}
                            strings={this.context.strings}
                        />
                    )}
                </UserInputManager>

                {!gradedGroupAPIOptions.isMobile && (
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

                        <p role="status" aria-live="polite">
                            {this.state.message}
                        </p>

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
                                style={{marginLeft: 5}}
                            >
                                {this.context.strings.nextQuestion}
                            </Button>
                        )}
                    </>
                )}

                {this.props.hint?.content &&
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
                                widgets={this.props.hint.widgets}
                                problemNum={0}
                            >
                                {({
                                    userInput,
                                    handleUserInput,
                                    initializeUserInput,
                                }) => {
                                    // we did a check above to make sure hints exists
                                    const {content, widgets, images} = this
                                        .props.hint as PerseusRenderer;
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
                                            apiOptions={gradedGroupAPIOptions}
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
                {gradedGroupAPIOptions.isMobile && (
                    <GradedGroupAnswerBar
                        apiOptions={gradedGroupAPIOptions}
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
        marginLeft: 0,
        paddingLeft: 0,
    },

    gradedGroup: {
        borderTop: `1px solid ${gray76}`,
        borderBottom: `1px solid ${gray76}`,
        backgroundColor: tableBackgroundAccent,
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        paddingBottom: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: phoneMargin,
        paddingTop: 10,
        width: "auto",
    },

    showHintLink: {
        backgroundColor: "unset",
        fontSize: 14,
        padding: 0,
        border: "none",
        marginTop: 20,
        color: color.blue,
        cursor: "pointer",
        display: "block",
        clear: "both",
    },

    explanationTitle: {
        backgroundColor: "unset",
        marginTop: 20,
        color: color.blue,
        marginBottom: 10,
        cursor: "pointer",
        fontSize: 14,
        padding: 0,
        border: "none",
        display: "block",
        clear: "both",
    },

    title: {
        fontSize: 12,
        color: gray68,
        textTransform: "uppercase",
        marginBottom: 11,
        letterSpacing: 0.8,
    },
});

export const GradedGroup = withAPIOptions(GradedGroupClass);

export default {
    name: "graded-group",
    displayName: "Graded group (articles only)",
    widget: GradedGroup,
    // TODO(aasmund): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
} satisfies WidgetExports<typeof GradedGroup>;
