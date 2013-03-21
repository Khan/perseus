(function(Perseus) {

var AnswerAreaRenderer = Perseus.Widget.extend({
    // TODO(alpert): Move the form higher up in the DOM
    tagName: "form",

    events: {
        "submit": "submit"
    },

    initialize: function() {
        var InputInteger = Perseus.Widgets._widgetTypes["input-integer"];
        this.box = new InputInteger();
    },

    render: function() {
        var renderer = this;
        this.$el.empty();

        this.$el.append(this.box.$el);
        this.$el.append("<input type='submit'>");

        return this.box.render().then(function() {
            return renderer;
        });
    },

    focus: function() {
        // TODO(alpert): Later, we'll need to store which text box was focused
        // or something like that
        this.box.focus();
    },

    submit: function(e) {
        var guess = this.box.toJSON();
        var score = this.box.simpleValidate(this.options.rubric);

        this.options.itemRenderer.trigger("attempt", {
            score: score,
            guess: guess
        });

        // TODO(alpert): A little weird to dig into this.box like this?
        this.box.$input.select();

        e.preventDefault();
    }
});

var ItemRenderer = Perseus.ItemRenderer = Perseus.Widget.extend({
    initialize: function(options) {
        var item = options.item;

        this.questionRenderer = new Perseus.Renderer(item.question);
        this.answerAreaRenderer = new AnswerAreaRenderer({
            itemRenderer: this,
            rubric: item.answerRubric
        });

        // Renderer for each presented hint
        this.hintRenderers = [];

        // Options for each hidden hint
        this.remainingHints = item.hints;
    },

    render: function() {
        var renderer = this;
        this.$el.empty();

        var $showHint = $("<input type='button' " +
                "value='I&#39;d like a hint'>");
        $showHint.on("click", function() {
            renderer.showHint();
            $showHint.toggleClass("disabled", !renderer.hasMoreHints());
        });
        $showHint.prop("disabled", !renderer.hasMoreHints());

        this.$el.append($showHint);

        var renderers = [this.questionRenderer, this.answerAreaRenderer]
                .concat(this.hintRenderers);
        _.each(renderers, function(r) {
            renderer.$el.append(r.$el);
        });

        return $.when.apply($, _.invoke(renderers, "render")).then(function() {
            return renderer;
        });
    },

    focus: function() {
        return this.answerAreaRenderer.focus();
    },

    hasMoreHints: function() {
        return !!this.remainingHints.length;
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
    }
});

})(Perseus);
