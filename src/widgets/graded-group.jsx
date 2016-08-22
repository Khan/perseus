/* eslint-disable react/forbid-prop-types */

/* globals i18n */
const classNames = require("classnames");
const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const {iconOk, iconRemove, icon} = require("../icon-paths.js");
const InlineIcon = require("../components/inline-icon.jsx");
const Renderer = require("../renderer.jsx");
const GradedGroupAnswerBar = require("./graded-group-answer-bar.jsx");
const {gray76, phoneMargin, negativePhoneMargin, tableBackgroundAccent, kaGreen} = require("../styles/constants.js");
const {StyleSheet, css} = require("aphrodite");

// A Graded Group is more or less a Group widget that displays a check
// answer button below the rendered content. When clicked, the widget grades
// the stuff inside and displays feedback about whether the inputted answer was
// correct or not.

const GRADING_STATUSES = {
    ungraded: 'ungraded',
    correct: 'correct',
    incorrect: 'incorrect',
    invalid: 'invalid',
};

const ANSWER_BAR_STATES = GradedGroupAnswerBar.ANSWER_BAR_STATES;

// Update answer bar state based on current state and whether the question is
// answerable (all parts have been filled out) or not.
const getNextState = (currentState, answerable) => {
    switch (currentState) {
        case ANSWER_BAR_STATES.HIDDEN:
            return answerable ? ANSWER_BAR_STATES.ACTIVE : currentState;
        case ANSWER_BAR_STATES.ACTIVE:
            return !answerable ? ANSWER_BAR_STATES.INACTIVE : currentState;
        case ANSWER_BAR_STATES.INACTIVE:
            return answerable ? ANSWER_BAR_STATES.ACTIVE : currentState;
        case ANSWER_BAR_STATES.INCORRECT:
            return answerable
                ? ANSWER_BAR_STATES.ACTIVE
                : ANSWER_BAR_STATES.INACTIVE;
        default:
            return currentState;
    }
};

// Prepended to all invalid messages to make the widget messages a bit clearer
const INVALID_MESSAGE_PREFIX = "We couldn't grade your answer.";
const DEFAULT_INVALID_MESSAGE = "It looks like you left something blank or " +
    "entered in an invalid answer.";

const GradedGroup = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        content: React.PropTypes.string,
        hasHint: React.PropTypes.bool,
        hint: React.PropTypes.object,
        images: React.PropTypes.object,
        onBlur: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        title: React.PropTypes.string,
        trackInteraction: React.PropTypes.func.isRequired,
        transparentBackground: React.PropTypes.bool,
        widgets: React.PropTypes.object,
    },

    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            title: "",
            content: "",
            widgets: {},
            images: {},
            hint: null,
            hasHint: false,
        };
    },

    getInitialState: function() {
        return {
            status: GRADING_STATUSES.ungraded,
            showHint: false,
            message: "",
            answerBarState: ANSWER_BAR_STATES.HIDDEN,
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    // This is a little strange because the id of the widget that actually
    // changed is going to be lost in favor of the group widget's id. The
    // widgets prop also wasn't actually changed, and this only serves to
    // alert our renderer (our parent) of the fact that some interaction
    // has occurred.
    _onInteractWithWidget: function(id) {
        // Reset grading display when user changes answer
        this.setState({
            status: GRADING_STATUSES.ungraded,
            message: "",
        });

        if (this.refs.renderer) {
            this.change("widgets", this.props.widgets);
            const emptyWidgets = this.refs.renderer.emptyWidgets();
            const answerable = emptyWidgets.length === 0;
            const answerBarState = this.state.answerBarState;
            this.setState({
                answerBarState: getNextState(answerBarState, answerable),
            });
        }
    },

    _checkAnswer: function() {
        const score = this.refs.renderer.score();

        let status;
        let message;
        if (score.type === "points") {
            status = score.total === score.earned ?
                GRADING_STATUSES.correct : GRADING_STATUSES.incorrect;
            message = score.message || "";
        } else { // score.type is "invalid"
            status = GRADING_STATUSES.invalid;
            message = score.message ?
                `${INVALID_MESSAGE_PREFIX} ${score.message}` :
                `${INVALID_MESSAGE_PREFIX} ${DEFAULT_INVALID_MESSAGE}`;
        }

        this.setState({
            status: status,
            message: message,
            // TODO(kevinb) handle 'invalid' status
            answerBarState: status === 'correct'
                ? ANSWER_BAR_STATES.CORRECT
                : ANSWER_BAR_STATES.INCORRECT,
        });

        this.props.trackInteraction({
            status: status,
        });
    },

    // Mobile API
    getInputPaths: function() {
        return this.refs.renderer.getInputPaths();
    },

    setInputValue: function(path, newValue, cb) {
        return this.refs.renderer.setInputValue(path, newValue, cb);
    },

    getAcceptableFormatsForInputPath: function(path) {
        return this.refs.renderer.getAcceptableFormatsForInputPath(path);
    },

    focus: function() {
        return this.refs.renderer.focus();
    },

    focusInputPath: function(path) {
        this.refs.renderer.focusPath(path);
    },

    blurInputPath: function(path) {
        this.refs.renderer.blurPath(path);
    },

    render: function() {
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
            }
        );

        let icon = null;
        // Colors are 10% darker than the colors in graded-group.less
        if (this.state.status === GRADING_STATUSES.correct) {
            icon = <InlineIcon {...iconOk} style={{color: "#526f03"}} />;
        } else if (this.state.status === GRADING_STATUSES.incorrect) {
            icon = <InlineIcon {...iconRemove} style={{color: "#ff5454"}} />;
        }

        const classes = classNames({
            [css(styles.gradedGroup)]: apiOptions.isMobile &&
                !this.props.transparentBackground,
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
        const isCorrect = answerBarState === ANSWER_BAR_STATES.CORRECT;
        const readOnly = apiOptions.readOnly ||
            (apiOptions.isMobile && isCorrect);

        return <div className={classes}>
            {!!this.props.title &&
                <div className={css(styles.title)}>
                    {this.props.title}
                </div>}
            <Renderer
                {...this.props}
                ref="renderer"
                apiOptions={{...apiOptions, readOnly}}
                onInteractWithWidget={this._onInteractWithWidget}
            />
            {!apiOptions.isMobile && icon && <div className="group-icon">
                {icon}
            </div>}
            {!apiOptions.isMobile && <p>{this.state.message}</p>}
            {!apiOptions.isMobile && <input
                type="button"
                value={i18n._("Check")}
                className="simple-button"
                disabled={this.props.apiOptions.readOnly}
                onClick={this._checkAnswer}
            />}

            {this.props.hint && this.props.hint.content &&
             (this.state.showHint ?
                <div>
                    <div
                        className={css(styles.explanationTitle)}
                        onClick={() => this.setState({showHint: false})}
                    >
                        {i18n._("Hide explanation")}
                    </div>
                    <Renderer
                        {...this.props.hint}
                        ref="hints-renderer"
                        apiOptions={apiOptions}
                    />
                </div> :
                <div
                    onClick={() => this.setState({showHint: true})}
                    className={css(styles.showHintLink)}
                >
                    {i18n._("Explain")}
                </div>
            )}
            {apiOptions.isMobile &&
                answerBarState !== ANSWER_BAR_STATES.HIDDEN &&
                <GradedGroupAnswerBar
                    apiOptions={apiOptions}
                    answerBarState={answerBarState}
                    onCheckAnswer={this._checkAnswer}
                />}
        </div>;
    },
});

const traverseChildWidgets = function(props, traverseRenderer) {
    return _.extend({}, props, traverseRenderer(props));
};

module.exports = {
    name: "graded-group",
    displayName: "Graded Group",
    widget: GradedGroup,
    traverseChildWidgets: traverseChildWidgets,
    hidden: false,
    tracking: "all",
};

const styles = StyleSheet.create({
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
        width: 'auto',
    },

    showHintLink: {
        marginTop: 20,
        color: kaGreen,
        cursor: 'pointer',
    },

    explanationTitle: {
        marginTop: 20,
        color: kaGreen,
        marginBottom: 10,
        cursor: 'pointer',
    },

    title: {
        fontSize: 12,
        color: gray76,
        textTransform: 'uppercase',
        marginBottom: 11,
        letterSpacing: .8,
    },
});
