/** @jsx React.DOM */
(function(Perseus) {

require("./core.js");
require("./answer-area-editor.jsx");
require("./hint-editor.jsx");
require("./renderer.jsx");
require("./all-widgets.js");
var Util = require("./util.js");

var AnswerAreaRenderer = Perseus.AnswerAreaRenderer;

var HintRenderer = Perseus.HintRenderer;

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

var ItemRenderer = Perseus.ItemRenderer = React.createClass({
    getDefaultProps: function() {
        return {
            initialHintsVisible: 0,

            // TODO(joel) - handle this differently. Pass around nodes or
            // something half reasonable.
            workAreaSelector: "#workarea",
            solutionAreaSelector: "#solutionarea",
            hintsAreaSelector: "#hintsarea",
            shouldIndicate: false
        };
    },

    getInitialState: function() {
        return {
            hintsVisible: this.props.initialHintsVisible,
            questionAreaUsedWidgets: [],
            answerAreaUsedWidgets: []
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            questionAreaUsedWidgets: [],
            answerAreaUsedWidgets: []
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

    numWidgetsRemaining: function() {
        return this.numWidgets() -
            (this.state.questionAreaUsedWidgets.length +
             this.state.answerAreaUsedWidgets.length);
    },

    numWidgets: function() {
        var amountInAnswerArea = this.numAnswerAreaWidgets();
        var widgets = this.props.item.question.widgets;
        return _.size(highlightedWidgets(widgets)) + amountInAnswerArea;
    },

    numAnswerAreaWidgets: function() {
        if (this.props.item.answerArea.type === "multiple") {
            var widgets = this.props.item.answerArea.options.widgets;
            return _.size(highlightedWidgets(widgets));
        } else {
            return 1;
        }
    },

    update: function() {
        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow
        this.questionRenderer = React.renderComponent(
                Perseus.Renderer(_.extend({
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithWidget,
                    usedWidgets: this.state.questionAreaUsedWidgets,
                    shouldIndicate: this.props.shouldIndicate
                }, this.props.item.question)),
                document.querySelector(this.props.workAreaSelector));

        this.answerAreaRenderer = React.renderComponent(
                AnswerAreaRenderer({
                    type: this.props.item.answerArea.type,
                    options: this.props.item.answerArea.options,
                    calculator: this.props.item.answerArea.calculator || false,
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithAnswerWidget,
                    usedWidgets: this.state.answerAreaUsedWidgets,
                    shouldIndicate: this.props.shouldIndicate,
                    numWidgetsRemaining: this.numWidgetsRemaining(),
                    numWidgets: this.numWidgets()
                }),
                document.querySelector(this.props.solutionAreaSelector));

        this.hintsRenderer = React.renderComponent(
                HintsRenderer({
                    hints: this.props.item.hints,
                    hintsVisible: this.state.hintsVisible
                }),
                document.querySelector(this.props.hintsAreaSelector));
    },

    addWidgetIdTo: function(set, widgetId) {
        this.setState(_.object([[set, _.union(this.state[set], [widgetId])]]));
    },

    handleInteractWithWidget: function(widgetId) {
        this.addWidgetIdTo("questionAreaUsedWidgets", widgetId);
    },

    handleInteractWithAnswerWidget: function(widgetId) {
        this.addWidgetIdTo("answerAreaUsedWidgets", widgetId);
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

})(Perseus);
