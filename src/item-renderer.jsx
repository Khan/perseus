/** @jsx React.DOM */

var React = require('react');
var AnswerAreaRenderer = require("./answer-area-renderer.jsx");
var HintRenderer = require("./hint-renderer.jsx");
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");
var ApiOptions = require("./perseus-api.jsx").Options;
var EnabledFeatures = require("./enabled-features.jsx");

var HintsRenderer = React.createClass({
    render: function() {
        var hintsVisible = this.props.hintsVisible;
        var hints = this.props.hints
            .slice(0, hintsVisible === -1 ? undefined : hintsVisible)
            .map(function(hint, i) {
                var shouldBold = i === this.props.hints.length - 1 &&
                                 !(/\*\*/).test(hint.content);
                return <HintRenderer
                            bold={shouldBold}
                            hint={hint}
                            key={"hintRenderer" + i}
                            enabledFeatures={this.props.enabledFeatures}
                            apiOptions={this.props.apiOptions} />;
            }, this);

        return <div>{hints}</div>;
    }
});

var highlightedWidgets = (widgetList) =>
    _.filter(widgetList, Util.widgetShouldHighlight);

var ItemRenderer = React.createClass({
    getDefaultProps: function() {
        return {
            initialHintsVisible: 0,

            // TODO(joel) - handle this differently. Pass around nodes or
            // something half reasonable.
            workAreaSelector: "#workarea",
            solutionAreaSelector: "#solutionarea",
            hintsAreaSelector: "#hintsarea",

            enabledFeatures: {},  // a deep default is done in `this.update()`
            apiOptions: {}  // likewise ^
        };
    },

    getInitialState: function() {
        return {
            hintsVisible: this.props.initialHintsVisible,
            questionCompleted: false,
            questionHighlightedWidgets: [],
            answerHighlightedWidgets: []
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            questionHighlightedWidgets: [],
            answerHighlightedWidgets: []
        });
    },

    componentDidMount: function() {
        if (Khan.scratchpad) {
            Khan.scratchpad.enable();
        }
        this._currentFocus = {
            path: null,
            element: null
        };
        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        var enabledFeatures = _.extend({}, EnabledFeatures.defaults, {
            // for temporary backcompat:
            // TODO(jack): Remove once enabledFeatures is specified from webapp
            highlight: this.props.enableHighlight || false,
        }, this.props.enabledFeatures);

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                onFocusChange: this._handleFocusChange
            }
        );

        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow
        this.questionRenderer = React.renderComponent(
                Renderer(_.extend({
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithWidget,
                    highlightedWidgets: this.state.questionHighlightedWidgets,
                    enabledFeatures: enabledFeatures,
                    apiOptions: apiOptions,
                    questionCompleted: this.state.questionCompleted
                }, this.props.item.question)),
                document.querySelector(this.props.workAreaSelector));

        this.answerAreaRenderer = React.renderComponent(
                AnswerAreaRenderer({
                    type: this.props.item.answerArea.type,
                    options: this.props.item.answerArea.options,
                    calculator: this.props.item.answerArea.calculator || false,
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithAnswerWidget,
                    highlightedWidgets: this.state.answerHighlightedWidgets,
                    enabledFeatures: enabledFeatures,
                    apiOptions: apiOptions
                }),
                document.querySelector(this.props.solutionAreaSelector));

        this.hintsRenderer = React.renderComponent(
                HintsRenderer({
                    hints: this.props.item.hints,
                    hintsVisible: this.state.hintsVisible,
                    enabledFeatures: enabledFeatures,
                    apiOptions: apiOptions
                }),
                document.querySelector(this.props.hintsAreaSelector));
    },

    _handleFocusChange: function(newFocus, oldFocus) {
        if (newFocus.path != null) {
            this._setCurrentFocus(newFocus);
        } else {
            this._onRendererBlur(oldFocus);
        }
    },

    // Sets the current focus path and element and
    // send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(newFocus) {
        // By the time this happens, newFocus.path cannot be a prefix of
        // prevFocused.path, since we must have either been called from
        // an onFocusChange within a renderer, which is only called when
        // this is not a prefix, or between the question and answer areas,
        // which can never prefix each other.
        var prevFocus = this._currentFocus;
        this._currentFocus = newFocus;
        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(this._currentFocus, prevFocus);
        }
    },

    _onRendererBlur: function(oldFocus) {
        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(() => {
            if (_.isEqual(this._currentFocus.path, oldFocus.path)) {
                this._setCurrentFocus({path: null, element: null});
            }
        });
    },

    /**
     * Accepts a question area widgetId, or an answer area widgetId of
     * the form "answer-input-number 1", or the string "answer-area"
     * for the whole answer area (if the answer area is a single widget).
     */
    _setWidgetProps: function(widgetId, newProps, callback) {
        var maybeAnswerAreaWidget = widgetId.match(/^answer-(.*)$/);

        if (maybeAnswerAreaWidget) {
            var answerAreaWidgetId = maybeAnswerAreaWidget[1];
            this.answerAreaRenderer._setWidgetProps(
                answerAreaWidgetId,
                newProps,
                callback
            );
        } else {
            this.questionRenderer._setWidgetProps(
                widgetId,
                newProps,
                callback
            );
        }
    },

    setInputValue: function(inputWidgetId, newValue, focus) {
        // TODO(jack): This is a hack to allow for a consistent format
        // between this and onFocusChange. Remove when we're no longer
        // using widget ids in our api
        if (_.isArray(inputWidgetId)) {
            inputWidgetId = inputWidgetId[0];
        }
        // TODO(jack): change this to value: when we change input-number/
        // expression's prop to be value
        // TODO(jack): As the code below demonstrates, this whole
        // implementation is a horrible, horrible hack, and should be
        // changed so that the widget can handle setting this "value"
        // itself
        var newProps;
        if (/expression /.test(inputWidgetId)) {
            newProps = {value: newValue};
        } else if (inputWidgetId === "answer-area") {
            // If it's the answer area, do both! #yolo
            // (maybe it's an input-number, maybe it's an expression)
            // TODO(jack): Fix this.
            newProps = {
                currentValue: newValue,
                value: newValue
            };
        } else {
            newProps = {currentValue: newValue};
        }
        this._setWidgetProps(inputWidgetId, newProps, () => focus);
    },

    handleInteractWithWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.questionHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            questionCompleted: false,
            questionHighlightedWidgets: withRemoved
        });
    },

    handleInteractWithAnswerWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.answerHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            answerHighlightedWidgets: withRemoved
        });
    },

    render: function() {
        return <div />;
    },

    focus: function() {
        return this.questionRenderer.focus() ||
                this.answerAreaRenderer.focus();
    },

    componentWillUnmount: function() {
        React.unmountComponentAtNode(
                document.querySelector(this.props.workAreaSelector));
        React.unmountComponentAtNode(
                document.querySelector(this.props.solutionAreaSelector));
        React.unmountComponentAtNode(
                document.querySelector(this.props.hintsAreaSelector));
    },

    showHint: function() {
        if (this.state.hintsVisible < this.getNumHints()) {
            this.setState({
                hintsVisible: this.state.hintsVisible + 1
            });
        }
    },

    getNumHints: function() {
        return this.props.item.hints.length;
    },

    scoreInput: function() {
        var qGuessAndScore = this.questionRenderer.guessAndScore();
        var aGuessAndScore = this.answerAreaRenderer.guessAndScore();

        var qGuess = qGuessAndScore[0], qScore = qGuessAndScore[1];
        var aGuess = aGuessAndScore[0], aScore = aGuessAndScore[1];

        var emptyQuestionAreaWidgets = this.questionRenderer.emptyWidgets();
        var emptyAnswerAreaWidgets = this.answerAreaRenderer.emptyWidgets();
        this.setState({
            questionHighlightedWidgets: emptyQuestionAreaWidgets,
            answerHighlightedWidgets: emptyAnswerAreaWidgets
        });

        var guess, score;
        if (qGuess.length === 0) {
            // No widgets in question. For compatability with old guess format,
            // leave it out here completely.
            guess = aGuess;
            score = aScore;
        } else {
            guess = [qGuess, aGuess];
            score = Util.combineScores(qScore, aScore);
        }

        if (score.type === "points") {
            var correct = score.earned >= score.total;
            this.setState({ questionCompleted: correct });
            return {
                empty: false,
                correct: correct,
                message: score.message,
                guess: guess
            };
        } else if (score.type === "invalid") {
            this.setState({ questionCompleted: false });
            return {
                empty: true,
                correct: false,
                message: score.message,
                guess: guess
            };
        }
    }
});

module.exports = ItemRenderer;
