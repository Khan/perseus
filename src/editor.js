(function(Perseus) {

var SingleEditor = Perseus.SingleEditor = Perseus.Widget.extend({
    render: function() {
        var editor = this;
        this.$el.empty().addClass("perseus-single-editor");

        var $textarea = this.$textarea = $("<textarea>").appendTo(this.$el);
        $textarea.on("input", function() {
            editor.change();
        });

        this.$output = $("<div>").appendTo(this.$el);

        var renderer = this.renderer = new Perseus.Renderer({
            el: this.$output
        });

        return this.change();
    },

    getState: function() {
        return $.when({
            content: this.$textarea.val()
        });
    },

    setState: function(options) {
        this.$textarea.val(options.content);
        return this.change();
    },

    change: function() {
        var renderer = this.renderer;
        renderer.options.content = this.$textarea.val();

        var editor = this;
        return renderer.render().then(function() {
            return editor;
        });
    }
});

var ItemEditor = Perseus.ItemEditor = Perseus.Widget.extend({
    render: function() {
        var editor = this;
        this.$el.empty().addClass("perseus-item-editor");

        this.questionEditor = new Perseus.SingleEditor();
        this.questionEditor.$el.addClass("perseus-question-editor").appendTo(
                this.$el);

        this.hintEditors = [];
        $("<a href='#'>Add a hint</a>").appendTo(this.$el).on("click",
                function() {
            var hintEditor = new Perseus.SingleEditor();
            $(this).before(hintEditor.$el.addClass("perseus-hint-editor"));
            editor.hintEditors.push(hintEditor);
            hintEditor.render();
        });

        return this.questionEditor.render();
    },

    setState: function(options) {
        var editor = this;
        return this.questionEditor.setState(options.question).then(function() {
            return editor;
        });
    }
});

})(Perseus);
