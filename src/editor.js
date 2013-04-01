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

var AnswerAreaEditor = Perseus.Widget.extend({
    className: "perseus-answer-editor",

    options: {
        // TODO(alpert): Separate into validatey things
        type: "radio"
    },

    initialize: function() {
        var cls = Perseus.Widgets._widgetTypes[this.options.type + "-editor"];
        // TODO(alpert): Ugh, too many things called editor
        this.editor = new cls();
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $select = $("<select>");
        $select.append(
                "<option value='radio'>Multiple choice</option>",
                // TODO(alpert): Make input-integer better then change this
                "<option value='input-integer'>Exact string equality</option>"
            );
        $select.val(this.options.type);

        $select.on("change", function() {
            editor.setType($select.val());
        });

        // Space for the actual answer-type editor to use
        var $div2 = this.$div2 = $("<div>").append(this.editor.$el);

        this.$el.append("Answer type: ", $select, $div2);

        return this.editor.render();
    },

    toJSON: function() {
        return {
            type: this.options.type,
            options: this.editor.toJSON()
        };
    },

    set: function(options) {
        // TODO(alpert): Move into Perseus.Widget?
        _.extend(this.options, options);
        return this.editor.set(this.options.options);
    },

    setType: function(type, options) {
        // TODO(alpert): How to prefill old vals?
        this.options.type = type;

        var cls = Perseus.Widgets._widgetTypes[type + "-editor"];
        // TODO(alpert): Ugh, too many things called editor
        var ed = this.editor = new cls(options || {});

        this.$div2.empty().append(ed.$el);

        return ed.render();
    }
});

var ItemEditor = Perseus.ItemEditor = Perseus.Widget.extend({
    className: "perseus-item-editor",

    initialize: function() {
        this.questionEditor = new QuestionEditor();
        this.answerEditor = new AnswerAreaEditor();
        this.hintEditors = [];
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $addHint = $("<a href='#' class='simple-button orange'>" +
                "Add a hint</a>");
        $addHint.on("click", function() {
            var hintEditor = new HintEditor();
            editor.hintEditors.push(hintEditor);
            editor.render().then(function() {
                hintEditor.focus();
            });
            return false;
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
            answerArea: this.answerEditor.toJSON(),
            hints: _.invoke(this.hintEditors, "toJSON")
        };
    },

    set: function(options) {
        this.questionEditor.set(options.question || {});
        this.answerEditor.set(options.answerArea || {});
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
