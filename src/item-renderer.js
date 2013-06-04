(function(Perseus) {

var AnswerAreaRenderer = Perseus.Widget.extend({
    // TODO(alpert): Move the form higher up in the DOM
    tagName: "form",

    initialize: function() {
        var type = this.options.type;
        var cls;
        if (type === "multiple") {
            cls = Perseus.Renderer;
        } else {
            cls = Perseus.Widgets._widgetTypes[this.options.type];
        }

        // TODO(alpert): box is a stupid name
        // TODO(alpert): this.options.options is stupid too
        this.box = new cls(this.options.options);
        this.box.setState({problemNum: this.options.problemNum});
    },

    render: function() {
        var renderer = this;

        this.$("#solutionarea")
            .empty()
            .append(this.box.$el);

        return this.box.render().then(function() {
            return renderer;
        });
    },

    focus: function() {
        // TODO(alpert): Later, we'll need to store which text box was focused
        // or something like that
        this.box.focus();
    },

    guessAndScore: function() {
        if (this.options.type === "multiple") {
            // TODO(alpert): These should probably have the same signature...
            return this.box.guessAndScore();
        } else {
            var guess = this.box.toJSON();
            // TODO(alpert): Use separate rubric
            var score = this.box.simpleValidate(this.options.options);

            return [guess, score];
        }
    }
});

var ItemRenderer = Perseus.ItemRenderer = Perseus.Widget.extend({
    initialize: function(options) {
        var item = options.item;

        this.questionRenderer = new Perseus.Renderer(item.question);
        this.answerAreaRenderer = new AnswerAreaRenderer({
            el: this.$("#answerform"),
            itemRenderer: this,
            type: item.answerArea.type,
            options: item.answerArea.options,
            problemNum: options.problemNum
        });

        // Renderer for each presented hint
        this.hintRenderers = [];

        // Options for each hidden hint
        this.remainingHints = item.hints.slice();
    },

    render: function(options) {
        return $.when(
            this.renderQuestion(),
            this.renderAnswer(),
            this.renderHints()
            );
    },

    renderQuestion: function() {
        this.$("#workarea")
            .empty()
            .append(this.questionRenderer.$el);
        return this.questionRenderer.render();
    },

    renderAnswer: function() {
        return this.answerAreaRenderer.render();
    },

    renderHints: function() {
        var renderer = this;
        _.each(this.hintRenderers, function(r) {
            renderer.$("#hintsarea").append(r.$el);
        });
        return $.when.apply($, _.invoke(this.hintRenderers, "render"));
    },

    focus: function() {
        return this.questionRenderer.focus() ||
                this.answerAreaRenderer.focus();
    },

    showHint: function() {
        if (!this.remainingHints.length) {
            // Where'd the hint go? :\
            return;
        }

        var hintOptions = this.remainingHints.shift();
        var renderer = new Perseus.Renderer(hintOptions);
        renderer.$el.addClass("perseus-hint");
        this.hintRenderers.push(renderer);

        // TODO(alpert): DRY. Doing it this way is way faster than just calling
        // render() though.
        this.$("#hintsarea").append(renderer.$el);
        var itemRenderer = this;
        renderer.render().then(function() {
            return itemRenderer;
        });
    },

    getNumHints: function() {
        return this.options.item.hints.length;
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

var ItemEditorRenderer = Perseus.ItemEditorRenderer = Perseus.ItemRenderer.extend({
    showAllHints: function() {
        while (this.remainingHints.length) {
            var hintOptions = this.remainingHints.shift();  // TODO(alpert): speed?
            var renderer = new Perseus.Renderer(hintOptions);
            renderer.$el.addClass("perseus-hint");
            this.hintRenderers.push(renderer);
        }
        return;
    },

    resetAnswerArea: function(answerArea) {
        this.answerAreaRenderer = new AnswerAreaRenderer({
            el: this.$("#answerform"),
            itemRenderer: this,
            type: answerArea.type,
            options: answerArea.options
        });
    }
});

})(Perseus);
