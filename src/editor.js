(function(Perseus) {

var SingleEditor = Perseus.SingleEditor = Perseus.Widget.extend({
    className: "perseus-single-editor",

    options: {
        content: ""
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $textarea = this.$textarea = $("<textarea>").val(
                this.options.content);
        $textarea.on("input", function() {
            editor.options.content = $textarea.val();
            editor.change();
        });

        var $output = $("<div>");

        this.$el.append($textarea);
        this.$el.append($output);

        var renderer = this.renderer = new Perseus.Renderer({
            el: $output
        });

        return this.change();
    },

    set: function(options) {
        this.options = options;
        return this.change();
    },

    focus: function() {
        this.$textarea.focus();
    },

    change: function() {
        var renderer = this.renderer;
        // TODO(alpert): Use 'set' here when that does the right thing
        renderer.options.content = this.options.content;

        var editor = this;
        return renderer.render().then(function() {
            return editor;
        });
    }
});

var QuestionEditor = Perseus.SingleEditor.extend({
    className: Perseus.SingleEditor.prototype.className +
            " perseus-question-editor"
});

var HintEditor = Perseus.SingleEditor.extend({
    className: Perseus.SingleEditor.prototype.className +
            " perseus-hint-editor"
});

var ItemEditor = Perseus.ItemEditor = Perseus.Widget.extend({
    className: "perseus-item-editor",

    initialize: function() {
        this.questionEditor = new QuestionEditor();
        this.hintEditors = [];
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $addHint = $("<a href='#'>Add a hint</a>");
        $addHint.on("click", function() {
            var hintEditor = new HintEditor();
            editor.hintEditors.push(hintEditor);
            editor.render().then(function() {
                hintEditor.focus();
            });
        });

        this.$el.append(this.questionEditor.$el);
        _.each(this.hintEditors, function(e) {
            editor.$el.append(e.$el);
        });
        this.$el.append($addHint);

        return this.questionEditor.render().then(function() {
            return $.when.apply($, _.map(editor.hintEditors, function(e) {
                    return e.render(); })).then(function() {
                return editor;
            });
        });
    },

    toJSON: function() {
        return {
            question: this.questionEditor.toJSON(),
            hints: _.map(this.hintEditors, function(e) { return e.toJSON(); })
        };
    },

    set: function(options) {
        this.questionEditor.set(options.question);
        this.hintEditors = _.map(options.hints, function(h) {
            return new HintEditor(h);
        });

        return this.render();
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

})(Perseus);
