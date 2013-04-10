(function(Perseus) {

var AnswerAreaRenderer = Perseus.Widget.extend({
    // TODO(alpert): Move the form higher up in the DOM
    tagName: "form",

    initialize: function() {
        var type = Perseus.Widgets._widgetTypes[this.options.type];

        // TODO(alpert): box is a stupid name
        // TODO(alpert): this.options.options is stupid too
        this.box = new type(this.options.options);
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

    scoreInput: function() {
        var guess = this.box.toJSON();

        // TODO(alpert): Use separate rubric
        var score = this.box.simpleValidate(this.options.options);

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

var ItemRenderer = Perseus.ItemRenderer = Perseus.Widget.extend({
    initialize: function(options) {
        var item = options.item;

        this.questionRenderer = new Perseus.Renderer(item.question);
        this.answerAreaRenderer = new AnswerAreaRenderer({
            el: this.$("#answerform"),
            itemRenderer: this,
            type: item.answerArea.type,
            options: item.answerArea.options
        });

        // Renderer for each presented hint
        this.hintRenderers = [];

        // Options for each hidden hint
        this.remainingHints = item.hints.slice();
    },

    render: function() {
        var renderer = this;

        this.$("#workarea")
            .empty()
            .append(this.questionRenderer.$el);

        _.each(this.hintRenderers, function(r) {
            renderer.$("#hintsarea").append(r.$el);
        });

        var renderers = [this.questionRenderer, this.answerAreaRenderer]
                .concat(this.hintRenderers);
        return $.when.apply($, _.invoke(renderers, "render")).then(function() {
            return renderer;
        });
    },

    focus: function() {
        return this.answerAreaRenderer.focus();
    },

    showHint: function() {
        if (!this.remainingHints.length) {
            // Where'd the hint go? :\
            return;
        }

        var hintOptions = this.remainingHints.shift();  // TODO(alpert): speed?
        var renderer = new Perseus.Renderer(hintOptions);
        renderer.$el.addClass("perseus-hint");
        this.hintRenderers.push(renderer);
        return this.render();
    },

    getNumHints: function() {
        return this.options.item.hints.length;
    },

    scoreInput: function() {
        return this.answerAreaRenderer.scoreInput();
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
        return this.render();
    },
});

})(Perseus);
