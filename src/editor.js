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
        // Extend with default options specified above...
        // TODO(alpert): Should textarea val get set here? Not sure.
        this.options = _.defaults(options, this.constructor.prototype.options);
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

    // TODO(alpert): Remove a hint
});

var AnswerEditor = Perseus.Widget.extend({
    className: "perseus-answer-editor",

    options: {
        // TODO(alpert): Separate into validatey things
        value: ""
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $input = $("<input>").val(this.options.value);
        $input.on("input", function() {
            editor.options.value = $input.val();
            editor.change();
        });

        this.$el.append("Rational answer: ");
        this.$el.append($input);
    },

    set: function(options) {
        // TODO(alpert): Move into Perseus.Widget?
        this.options = options;
        return this.change();
    },

    change: function() {
        // ...
    }
});

var ItemEditor = Perseus.ItemEditor = Perseus.Widget.extend({
    className: "perseus-item-editor",

    initialize: function() {
        this.questionEditor = new QuestionEditor();
        this.answerEditor = new AnswerEditor();
        this.hintEditors = [];
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $addHint = $("<a href='#' class='simple-button orange'>" +
                "I'd like a hint</a>");
        $addHint.on("click", function() {
            var hintEditor = new HintEditor();
            editor.hintEditors.push(hintEditor);
            editor.render().then(function() {
                hintEditor.focus();
            });
        });

        this.$el.append(this.questionEditor.$el);
        this.$el.append(this.answerEditor.$el);
        _.each(this.hintEditors, function(e) {
            editor.$el.append(e.$el);
        });
        this.$el.append($addHint);

        return this.questionEditor.render().then(function() {
            return editor.answerEditor.render();
        }).then(function() {
            return $.when.apply($, _.invoke(editor.hintEditors, "render"))
                    .then(function() {
                return editor;
            });
        });
    },

    toJSON: function() {
        return {
            question: this.questionEditor.toJSON(),
            answer: this.answerEditor.toJSON(),
            hints: _.invoke(this.hintEditors, "toJSON")
        };
    },

    set: function(options) {
        this.questionEditor.set(options.question || {});
        this.answerEditor.set(options.answer || {});
        this.hintEditors = _.map(options.hints || [], function(h) {
            return new HintEditor(h);
        });

        return this.render();
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

})(Perseus);
