(function(Perseus) {

var ItemRenderer = Perseus.ItemRenderer = Perseus.Widget.extend({
    initialize: function(options) {
        var item = options.item;

        this.questionRenderer = new Perseus.Renderer(item.question);

        // Renderer for each presented hint
        this.hintRenderers = [];

        // Options for each hidden hint
        this.remainingHints = item.hints;
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $showHint = $("<input type='button' " +
                "value='I&#39;d like a hint'>");
        $showHint.on("click", function() {
            editor.showHint();
            $showHint.toggleClass("disabled", !editor.hasMoreHints());
        });
        $showHint.prop("disabled", !editor.hasMoreHints());

        this.$el.append($showHint);

        var renderers = [this.questionRenderer].concat(this.hintRenderers);
        _.each(renderers, function(r) {
            console.log("appending", r);
            editor.$el.append(r.$el);
        });

        return $.when.apply($, _.invoke(renderers, "render")).then(function() {
            return editor;
        });
    },

    hasMoreHints: function() {
        return !!this.remainingHints.length;
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
        return this.render();
    }
});

})(Perseus);
