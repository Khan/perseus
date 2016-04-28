/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const classNames = require("classnames");
const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const Renderer = require("../renderer.jsx");

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

// Prepended to all invalid messages to make the widget messages a bit clearer
const INVALID_MESSAGE_PREFIX = "We couldn't grade your answer.";
const DEFAULT_INVALID_MESSAGE = "It looks like you left something blank or " +
    "entered in an invalid answer.";

const GradedGroup = React.createClass({
    mixins: [Changeable],

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        content: React.PropTypes.string,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        images: React.PropTypes.any,
        onBlur: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        trackInteraction: React.PropTypes.func.isRequired,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        widgets: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            content: "",
            images: {},
            widgets: {},
        };
    },

    getInitialState: function() {
        return {
            status: GRADING_STATUSES.ungraded,
            message: "",
        };
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
            icon = <div className="icon-ok" style={{color: "#526f03"}} />;
        } else if (this.state.status === GRADING_STATUSES.incorrect) {
            icon = <div className="icon-remove" style={{color: "#ff5454"}} />;
        }

        const classes = classNames({
            "perseus-graded-group": true,
            "answer-correct": this.state.status === GRADING_STATUSES.correct,
            "answer-incorrect":
                this.state.status === GRADING_STATUSES.incorrect,
        });

        return <div className={classes}>
            <Renderer
                {...this.props}
                ref="renderer"
                apiOptions={apiOptions}
                onInteractWithWidget={this._onInteractWithWidget} />
            {icon && <div className="group-icon">
                {icon}
            </div>}
            <p>{this.state.message}</p>
            <input
                type="button"
                value="Check Answer"
                className="simple-button"
                disabled={this.props.apiOptions.readOnly}
                onClick={this._checkAnswer} />
        </div>;
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
        });

        this.props.trackInteraction({
            status: status,
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
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

