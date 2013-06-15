/** @jsx React.DOM */
(function(Perseus) {

// TODO(alpert): Thread problemNum to question-area widgets too

var AnswerAreaRenderer = React.createClass({
    getInitialState: function() {
        // TODO(alpert): Move up to parent props?
        return {
            widget: {},
            cls: this.getClass(this.props.type)
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({cls: this.getClass(nextProps.type)});
    },

    getClass: function(type) {
        if (type === "multiple") {
            return Perseus.Renderer;
        } else {
            return Perseus.Widgets._widgetTypes[type];
        }
    },

    render: function(rootNode) {
        return this.state.cls(_.extend({
            ref: "widget",
            problemNum: this.props.problemNum,
            onChange: function(newProps) {
                var widget = _.extend({}, this.state.widget, newProps);
                this.setState({widget: widget});
            }.bind(this)
        }, this.props.options, this.state.widget));
    },

    componentDidMount: function() {
        if (this.props.calculator) {
            $("#calculator").show();
        }
        if (this.state.cls.examples && $("#examples-show").length) {
            $("#examples-show").append("<div id='examples'></div>");

            var examples = this.state.cls.examples(this.props.options);
            var content = _.map(examples, function(example) {
                return "- " + example;
            }).join("\n");

            React.renderComponent(
                Perseus.Renderer({content: content}), 
                document.getElementById("examples"));

            $("#examples-show").qtip({
                content: {
                    text: $("#examples").remove(),
                    prerender: true
                },
                style: {classes: "qtip-light leaf-tooltip"},
                position: {
                    my: "bottom center",
                    at: "top center"
                },
                show: {
                    delay: 200,
                    effect: {
                        length: 0
                    }
                },
                hide: {delay: 0}
            });

            $("#examples-show").show();
        }
    },

    componentWillUnmount: function() {
        if (this.props.calculator) {
            $("#calculator").hide();
        }
        if (this.state.cls.examples && $("#examples-show").length) {
            $("#examples-show").hide();
            React.unmountAndReleaseReactRootNode(
                    document.getElementById("examples"));
        }
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
    getDefaultProps: function() {
        return {
            initialHintsVisible: 0
        };
    },

    getInitialState: function() {
        return {
            hintsVisible: this.props.initialHintsVisible
        };
    },

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
                    calculator: this.props.item.answerArea.calculator,
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
