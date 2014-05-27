/** @jsx React.DOM */

var React = require('react');
var AnswerAreaRenderer = require("./answer-area-renderer.jsx");
var HintRenderer = require("./hint-renderer.jsx");
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");

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
                            key={"hintRenderer" + i} />;
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

            enabledFeatures: {}  // a deep default is done in `this.update()`
        };
    },

    getInitialState: function() {
        return {
            hintsVisible: this.props.initialHintsVisible,
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
        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        var enabledFeatures = _.extend({
            // for temporary backcompat:
            // TODO(jack): Remove once enabledFeatures is specified from webapp
            highlight: this.props.enableHighlight || false,
            toolTipFormats: false
        }, this.props.enabledFeatures);

        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow
        this.questionRenderer = React.renderComponent(
                Renderer(_.extend({
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithWidget,
                    highlightedWidgets: this.state.questionHighlightedWidgets,
                    enabledFeatures: enabledFeatures
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
                    enabledFeatures: enabledFeatures
                }),
                document.querySelector(this.props.solutionAreaSelector));

        this.hintsRenderer = React.renderComponent(
                HintsRenderer({
                    hints: this.props.item.hints,
                    hintsVisible: this.state.hintsVisible
                }),
                document.querySelector(this.props.hintsAreaSelector));
    },

    handleInteractWithWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.questionHighlightedWidgets,
                                       [widgetId]);
        this.setState({
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
            return {
                empty: false,
                correct: score.earned >= score.total,
                message: score.message,
                guess: guess
            };
        } else if (score.type === "invalid") {
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
