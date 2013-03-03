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

var QuestionEditor = Perseus.SingleEditor.extend({
    className: "perseus-question-editor"
});

var HintEditor = Perseus.SingleEditor.extend({
    className: "perseus-hint-editor"
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
            editor.hintEditors.push(new HintEditor());
            editor.render();
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

    getState: function() {
        var editor = this;

        // Grab the question state...
        return $.when(editor.questionEditor.getState()).then(
                function(questionState) {
            // ...then the state for each hint...
            return $.when.apply($, _.map(editor.hintEditors, function(e) {
                    return e.getState(); })).then(function(/* hint states */) {
                // ...then return all of it.
                var hintStates = _.toArray(arguments);
                return {
                    question: questionState,
                    hints: hintStates
                };
            });
        });
    },

    setState: function(options) {
        var editor = this;
        this.hintEditors = [];
        this.$el.children(".perseus-hint-editor").remove();

        _.each(options.hints, function(h) {
            var hintEditor = new HintEditor();
            editor.hintEditors.push(hintEditor);
        });

        // TODO(alpert): Ugh, render clears all state so we need to set the
        // state after rendering after initializing the editors -- fix me plz.
        return this.render().then(function() {
            return editor.questionEditor.setState(options.question);
        }).then(function() {
            return $.when.apply($, _.map(options.hints, function(h, i) {
                var hintEditor = editor.hintEditors[i];
                return hintEditor.render().then(function() {
                    return hintEditor.setState(h);
                });
            }));
        });
    }
});

})(Perseus);
