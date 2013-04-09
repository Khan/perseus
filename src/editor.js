(function(Perseus) {

var SingleEditor = Perseus.SingleEditor = Perseus.Widget.extend({
    className: "perseus-single-editor",

    options: {
        content: ""
    },

    render: function() {
        var editor = this;
        var deferred = $.Deferred();

        this.$el.empty();

        var $textarea = this.$textarea = $("<textarea>").val(
                this.options.content);
        $textarea.on("input", function() {
            editor.options.content = $textarea.val();
            editor.trigger("change");
        });

        this.$el.append($textarea);

        editor.trigger("change", function() {
            deferred.resolve();
        });
        return deferred;
    },

    set: function(options) {
        // Extend with default options specified above...
        // TODO(alpert): Should textarea val get set here? Not sure.
        this.options = _.defaults(options, this.constructor.prototype.options);
        this.trigger("change");
        return this;
    },

    focus: function() {
        this.$textarea.focus();
        return this;
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
        this.listenTo(this.editor, "change", this.change);
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

        var $answerTypeLabel = $("<label>");
        $answerTypeLabel.append("Answer type: ", $select);

        this.$el.append($answerTypeLabel, $div2);

        return this.editor.render();
    },

    toJSON: function(skipValidation) {
        return {
            type: this.options.type,
            options: this.editor.toJSON(skipValidation)
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

        this.listenTo(this.editor, "change", this.change);

        this.$div2.empty().append(ed.$el);

        return ed.render();
    },

    change: function(args) {
        this.trigger.apply(this, ["change"].concat(args));
    }
});

var ItemEditorRenderer = Perseus.ItemRenderer.extend({
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

var ItemEditor = Perseus.ItemEditor = Perseus.Widget.extend({
    className: "perseus-item-editor",

    initialize: function() {
        this.questionEditor = new QuestionEditor();
        this.answerEditor = new AnswerAreaEditor();
        this.hintEditors = [];

        this.listenTo(this.questionEditor, "change", this.renderPreview);
        this.listenTo(this.answerEditor, "change", this.renderPreview);
    },

    render: function() {
        var editor = this;
        this.$el.empty();

        var $addHint = $("<a href='#' class='simple-button orange'>" +
                "Add a hint</a>");
        $addHint.on("click", function() {
            var hintEditor = new HintEditor();
            editor.listenTo(hintEditor, "change", editor.renderPreview);
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

    // TODO(cbhl): rendering is really slow -- remove the debounce and fix it
    _renderPreview: _.debounce(function() {
        var editor = this;

        this.previewEl = this.options.previewEl;
        if (this.previewEl) {
            this.$previewEl = $(this.previewEl);

            // TODO(cbhl): The hints repeat a bunch of times... why?
            $("#hintsarea").empty();

            this.itemRenderer = new ItemEditorRenderer({
                el: this.previewEl,
                item: this.toJSON(true)
            });

            return this.itemRenderer.showAllHints();
        }
    }, 1),

    renderPreview: function(callback) {
        var deferred = this._renderPreview();
        if (deferred) {
            deferred.then(function() {
                if (callback) {
                    callback();
                }
            });
        } else {
            if (callback) {
                callback();
            }
        }
    },

    toJSON: function(skipValidation) {
        return {
            question: this.questionEditor.toJSON(skipValidation),
            answerArea: this.answerEditor.toJSON(skipValidation),
            hints: _.invoke(this.hintEditors, "toJSON", skipValidation)
        };
    },

    set: function(options) {
        var editor = this;
        this.questionEditor.set(options.question || {});
        this.answerEditor.set(options.answerArea || {});
        this.hintEditors = _.map(options.hints || [], function(h) {
            var hintEditor = new HintEditor(h);
            editor.listenTo(hintEditor, "change", editor.renderPreview);
            return hintEditor;
        });

        return this.render();
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

})(Perseus);
