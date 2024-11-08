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
import {iconOk, iconRemove} from "../../icon-paths";
import * as Changeable from "../../mixins/changeable";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {
    gray68,
    gray76,
    phoneMargin,
    negativePhoneMargin,
    tableBackgroundAccent,
} from "../../styles/constants";
import a11y from "../../util/a11y";

import GradedGroupAnswerBar from "./graded-group-answer-bar";

import type {ANSWER_BAR_STATES} from "./graded-group-answer-bar";
import type {PerseusGradedGroupWidgetOptions} from "../../perseus-types";
import type {
    PerseusScore,
    TrackingGradedGroupExtraArguments,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {PerseusGradedGroupRubric} from "../../validation.types";

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
        case "HIDDEN":
            return answerable ? "ACTIVE" : currentState;
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

type RenderProps = PerseusGradedGroupWidgetOptions; // exports has no 'transform'

type Props = WidgetProps<
    RenderProps,
    PerseusGradedGroupRubric,
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
        answerBarState: "HIDDEN",
    };

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps !== this.props || nextState !== this.state;
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    // This is a little strange because the id of the widget that actually
    // changed is going to be lost in favor of the group widget's id. The
    // widgets prop also wasn't actually changed, and this only serves to
    // alert our renderer (our parent) of the fact that some interaction
    // has occurred.
    _onInteractWithWidget: (arg1: string) => void = (id) => {
        // Reset grading display when user changes answer
        this.setState({
            status: GRADING_STATUSES.ungraded,
            message: "",
        });

        // eslint-disable-next-line react/no-string-refs
        if (this.refs.renderer) {
            this.change("widgets", this.props.widgets);
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'emptyWidgets' does not exist on type 'ReactInstance'.
            const emptyWidgets = this.refs.renderer.emptyWidgets();
            const answerable = emptyWidgets.length === 0;
            const answerBarState = this.state.answerBarState;
            this.setState({
                answerBarState: getNextState(answerBarState, answerable),
            });
        }
    };

    _checkAnswer: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'showRationalesForCurrentlySelectedChoices' does not exist on type 'ReactInstance'.
        this.refs.renderer.showRationalesForCurrentlySelectedChoices();
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'score' does not exist on type 'ReactInstance'.
        const score: PerseusScore = this.refs.renderer.score();
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
                  ? `${INVALID_MESSAGE_PREFIX} ${score.message}`
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
    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'getInputPaths' does not exist on type 'ReactInstance'.
        return this.refs.renderer.getInputPaths();
    };

    setInputValue: (arg1: any, arg2: any, arg3: any) => any = (
        path,
        newValue,
        cb,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'setInputValue' does not exist on type 'ReactInstance'.
        return this.refs.renderer.setInputValue(path, newValue, cb);
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        return this.refs.renderer.focus();
    };

    focusInputPath: (arg1: any) => void = (path) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focusPath' does not exist on type 'ReactInstance'.
        this.refs.renderer.focusPath(path);
    };

    blurInputPath: (arg1: any) => void = (path) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blurPath' does not exist on type 'ReactInstance'.
        this.refs.renderer.blurPath(path);
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
        let icon = null;
        // Colors are 10% darker than the colors in graded-group.less
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

        return (
            <div className={classes}>
                {!!this.props.title && (
                    <div className={css(styles.title)}>{this.props.title}</div>
                )}
                {/**
                 * We're passing a bunch of extra props to Renderer here that it
                 * doesn't need.  We should replace {...this.props} with the individual
                 * props that are needed.
                 * TODO(FEI-4034): Only pass what the Renderer expects.
                 */}
                {/* @ts-expect-error - TS2322 - Type '{ ref: string; apiOptions: any; onInteractWithWidget: (arg1: string) => void; linterContext: LinterContextProps; title: string; hasHint?: boolean | null | undefined; ... 22 more ...; children?: ReactNode; }' is not assignable to type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "keypadElement" | "problemNum" | "apiOptions" | "legacyPerseusLint">'. */}
                <Renderer
                    {...this.props}
                    // eslint-disable-next-line react/no-string-refs
                    ref="renderer"
                    apiOptions={{...apiOptions, readOnly}}
                    onInteractWithWidget={this._onInteractWithWidget}
                    linterContext={this.props.linterContext}
                    strings={this.context.strings}
                />
                {!apiOptions.isMobile && icon && (
                    <div className="group-icon">{icon}</div>
                )}
                {!apiOptions.isMobile && gradeStatus && (
                    <div
                        className={css(a11y.srOnly)}
                        role="alert"
                        aria-label={gradeStatus}
                    >
                        {gradeStatus}
                    </div>
                )}
                {!apiOptions.isMobile && (
                    <p role="status" aria-live="polite">
                        {this.state.message}
                    </p>
                )}
                {!apiOptions.isMobile && (
                    <Button
                        kind="secondary"
                        disabled={this.props.apiOptions.readOnly}
                        onClick={this._checkAnswer}
                    >
                        {this.context.strings.check}
                    </Button>
                )}
                {!apiOptions.isMobile &&
                    isCorrect &&
                    this.props.onNextQuestion && (
                        <Button
                            kind="secondary"
                            disabled={this.props.apiOptions.readOnly}
                            onClick={this.props.onNextQuestion}
                            style={{marginLeft: 5}}
                        >
                            {this.context.strings.nextQuestion}
                        </Button>
                    )}

                {this.props.hint &&
                    this.props.hint.content &&
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
                            {/**
                             * We're passing a couple of props to Renderer that it doesn't
                             * require as part of {...this.props.hint}.
                             */}
                            <Renderer
                                {...this.props.hint}
                                // eslint-disable-next-line react/no-string-refs
                                ref="hints-renderer"
                                apiOptions={apiOptions}
                                linterContext={this.props.linterContext}
                                strings={this.context.strings}
                            />
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
                {apiOptions.isMobile && answerBarState !== "HIDDEN" && (
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

const traverseChildWidgets: (arg1: any, arg2: any) => any = function (
    props,
    traverseRenderer,
) {
    return _.extend({}, props, traverseRenderer(props));
};

const styles = StyleSheet.create({
    gradedGroupInSet: {
        // Reset a few desktop-only styles that come from graded-group.less
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

export default {
    name: "graded-group",
    displayName: "Graded group (articles only)",
    widget: GradedGroup,
    traverseChildWidgets: traverseChildWidgets,
    // TODO(aasmund): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
} satisfies WidgetExports<typeof GradedGroup>;
