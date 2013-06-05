/** @jsx React.DOM */
(function(Perseus) {

// TODO(alpert): Thread problemNum to question-area widgets too

var AnswerAreaRenderer = React.createClass({
    render: function(rootNode) {
        var type = this.props.type;
        var cls;
        if (type === "multiple") {
            cls = Perseus.Renderer;
        } else {
            cls = Perseus.Widgets._widgetTypes[type];
        }

        return cls(_.extend({
            ref: "widget",
            problemNum: this.props.problemNum
        }, this.props.options));
    },

    focus: function() {
        this.refs.widget.focus();
    },

    guessAndScore: function() {
        // TODO(alpert): These should probably have the same signature...
        if (this.props.type === "multiple") {
            return this.refs.widget.guessAndScore();
        } else {
            // TODO(alpert): Separate out the rubric
            var guess = this.refs.widget.toJSON();
            var score = this.refs.widget.simpleValidate(this.props.options);

            return [guess, score];
        }
    }
});

var HintsRenderer = React.createClass({
    render: function() {
        var hintsVisible = this.props.hintsVisible;
        var hints = this.props.hints
            .slice(0, hintsVisible === -1 ? undefined : hintsVisible)
            .map(function(hint, i) {
                return Perseus.Renderer(hint);
            });

        return <div>{hints}</div>;
    }
});

var ItemRenderer = Perseus.ItemRenderer = React.createClass({
    defaultState: {
        hintsVisible: 0
    },

    mixins: [Perseus.Util.PropsToState],

    componentDidMount: function() {
        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow

        this.questionRenderer = React.renderComponent(
                Perseus.Renderer(this.props.item.question),
                document.getElementById("workarea"));

        this.answerAreaRenderer = React.renderComponent(
                AnswerAreaRenderer({
                    type: this.props.item.answerArea.type,
                    options: this.props.item.answerArea.options,
                    problemNum: this.props.problemNum
                }),
                document.getElementById("solutionarea"));

        this.hintsRenderer = React.renderComponent(
                HintsRenderer({
                    hints: this.props.item.hints,
                    hintsVisible: this.state.hintsVisible
                }),
                document.getElementById("hintsarea"));
    },

    render: function() {
        return <div />;
    },

    focus: function() {
        return this.answerAreaRenderer.focus();
    },

    componentWillUnmount: function() {
        React.unmountAndReleaseReactRootNode(
                document.getElementById("workarea"));
        React.unmountAndReleaseReactRootNode(
                document.getElementById("solutionarea"));
        React.unmountAndReleaseReactRootNode(
                document.getElementById("hintsarea"));
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
            score = Perseus.Util.combineScores(qScore, aScore);
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
