// @flow
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import InlineIcon from "../components/inline-icon.jsx";
import {iconOk, iconRemove} from "../icon-paths.js";
import * as Changeable from "../mixins/changeable.jsx";
import {ApiOptions} from "../perseus-api.jsx";
import Renderer from "../renderer.jsx";
import {
    gray68,
    gray76,
    phoneMargin,
    negativePhoneMargin,
    tableBackgroundAccent,
    kaGreen,
} from "../styles/constants.js";
import a11y from "../util/a11y.js";

import GradedGroupAnswerBar, {
    type ANSWER_BAR_STATES,
} from "./graded-group-answer-bar.jsx";

import type {PerseusGradedGroupWidgetOptions} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

const GRADING_STATUSES = {
    ungraded: ("ungraded": "ungraded"),
    correct: ("correct": "correct"),
    incorrect: ("incorrect": "incorrect"),
    invalid: ("invalid": "invalid"),
};

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

// Prepended to all invalid messages to make the widget messages a bit clearer
const INVALID_MESSAGE_PREFIX = i18n._("We couldn't grade your answer.");
const DEFAULT_INVALID_MESSAGE =
    i18n._("It looks like you left something blank or ") +
    i18n._("entered in an invalid answer.");

type Rubric = PerseusGradedGroupWidgetOptions;
type RenderProps = PerseusGradedGroupWidgetOptions; // exports has no 'transform'

type Props = {|
    ...WidgetProps<RenderProps, Rubric>,
    inGradedGroupSet?: boolean, // Set by graded-group-set.jsx
    onNextQuestion?: () => mixed, // Set by graded-group-set.jsx
|};

type DefaultProps = {|
    title: Props["title"],
    content: Props["content"],
    widgets: Props["widgets"],
    images: Props["images"],
    hint: Props["hint"],
    hasHint: Props["hasHint"],
    linterContext: Props["linterContext"],
|};

type State = {|
    status: $Values<typeof GRADING_STATUSES>,
    showHint: boolean,
    message: string,
    answerBarState: ANSWER_BAR_STATES,
|};

// A Graded Group is more or less a Group widget that displays a check
// answer button below the rendered content. When clicked, the widget grades
// the stuff inside and displays feedback about whether the inputted answer was
// correct or not.
class GradedGroup extends React.Component<Props, State> {
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

    change: (...args: $ReadOnlyArray<mixed>) => $FlowFixMe = (...args) => {
        // $FlowFixMe[incompatible-call]
        return Changeable.change.apply(this, args);
    };

    // This is a little strange because the id of the widget that actually
    // changed is going to be lost in favor of the group widget's id. The
    // widgets prop also wasn't actually changed, and this only serves to
    // alert our renderer (our parent) of the fact that some interaction
    // has occurred.
    _onInteractWithWidget: (string) => void = (id) => {
        // Reset grading display when user changes answer
        this.setState({
            status: GRADING_STATUSES.ungraded,
            message: "",
        });

        // eslint-disable-next-line react/no-string-refs
        if (this.refs.renderer) {
            this.change("widgets", this.props.widgets);
            // eslint-disable-next-line react/no-string-refs
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
        this.refs.renderer.showRationalesForCurrentlySelectedChoices();
        // eslint-disable-next-line react/no-string-refs
        const score: PerseusScore = this.refs.renderer.score();

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
                : `${INVALID_MESSAGE_PREFIX} ${DEFAULT_INVALID_MESSAGE}`;

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
    getInputPaths: () => $ReadOnlyArray<$ReadOnlyArray<string>> = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.getInputPaths();
    };

    setInputValue: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (
        path,
        newValue,
        cb,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.setInputValue(path, newValue, cb);
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.renderer.focus();
    };

    focusInputPath: ($FlowFixMe) => void = (path) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.focusPath(path);
    };

    blurInputPath: ($FlowFixMe) => void = (path) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.renderer.blurPath(path);
    };

    render(): React.Node {
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

        let gradeStatus = null;
        let icon = null;
        // Colors are 10% darker than the colors in graded-group.less
        if (this.state.status === GRADING_STATUSES.correct) {
            // TODO(jeremy): update to a WB colour
            icon = <InlineIcon {...iconOk} style={{color: "#526f03"}} />;
            gradeStatus = i18n._("Correct");
        } else if (this.state.status === GRADING_STATUSES.incorrect) {
            // TODO(jeremy): update to a WB colour
            icon = <InlineIcon {...iconRemove} style={{color: "#ff5454"}} />;
            gradeStatus = i18n._("Incorrect");
        }

        const mobileClass = this.props.inGradedGroupSet
            ? css(styles.gradedGroupInSet)
            : css(styles.gradedGroup);

        const classes = classNames({
            // $FlowFixMe[invalid-computed-prop]
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
                {/* $FlowFixMe[prop-missing] */}
                {/* $FlowFixMe[incompatible-type] */}
                <Renderer
                    {...this.props}
                    // eslint-disable-next-line react/no-string-refs
                    ref="renderer"
                    apiOptions={{...apiOptions, readOnly}}
                    onInteractWithWidget={this._onInteractWithWidget}
                    linterContext={this.props.linterContext}
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
                        {i18n._("Check")}
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
                            {i18n._("Next question")}
                        </Button>
                    )}

                {this.props.hint &&
                    this.props.hint.content &&
                    (this.state.showHint ? (
                        <div>
                            {/* Not using Button here bc the styles won't work. */}
                            <button
                                tabIndex="0"
                                className={css(styles.explanationTitle)}
                                onClick={() => this.setState({showHint: false})}
                                onKeyPress={(e) => {
                                    // preventDefault stops the screen from scrolling down on keypress
                                    e.preventDefault();
                                    this.setState({showHint: false});
                                }}
                            >
                                {i18n._("Hide explanation")}
                            </button>
                            {/**
                             * We're passing a couple of props to Renderer that it doesn't
                             * require as part of {...this.props.hint}.
                             */}
                            {/* $FlowFixMe[prop-missing] */}
                            <Renderer
                                {...this.props.hint}
                                // eslint-disable-next-line react/no-string-refs
                                ref="hints-renderer"
                                apiOptions={apiOptions}
                                linterContext={this.props.linterContext}
                            />
                        </div>
                    ) : (
                        // Not using Button here bc the styles won't work.
                        <button
                            tabIndex="0"
                            onClick={() => this.setState({showHint: true})}
                            onKeyPress={(e) => {
                                // preventDefault stops the screen from scrolling down on keypress
                                e.preventDefault();
                                this.setState({showHint: true});
                            }}
                            className={css(styles.showHintLink)}
                        >
                            {i18n._("Explain")}
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

const traverseChildWidgets: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = function (
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
        color: kaGreen,
        cursor: "pointer",
        display: "block",
        clear: "both",
    },

    explanationTitle: {
        backgroundColor: "unset",
        marginTop: 20,
        color: kaGreen,
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

export default ({
    name: "graded-group",
    displayName: "Graded group (articles only)",
    widget: GradedGroup,
    traverseChildWidgets: traverseChildWidgets,
    // TODO(aasmund): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
}: WidgetExports<typeof GradedGroup>);
