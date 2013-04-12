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
            " perseus-hint-editor",

    render: function() {
        var editor = this;
        var deferred = $.Deferred();

        this.$el.empty();

        var $removeHintDiv = this.$removeHintDiv = $("<div " +
            "class='remove-hint-container'>");
        var $removeHintButton = this.$removeHintButton = $("<a href='#' " +
            "class='simple-button orange icon-trash remove-hint-button'" +
            "alt='Remove this Hint'>");
        // Leading space because of FontAwesome icon.
        $removeHintButton.text(" Remove this hint");
        $removeHintButton.on("click", function() {
            editor.trigger("remove");
            return false;
        });
        $removeHintDiv.append($removeHintButton);

        var $textarea = this.$textarea = $("<textarea>").val(
                this.options.content);
        $textarea.on("input", function() {
            editor.options.content = $textarea.val();
            editor.trigger("change");
        });

        this.$el.append($textarea);
        this.$el.append($removeHintDiv);

        editor.trigger("change", deferred.resolve);
        return deferred;
    }

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
                "<option value='radio'>Multiple choice</option>"
                // TODO(alpert): Make input-integer better then change this
                // <option value='input-integer'>Exact string equality</option>
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

        var $addHintDiv = $("<div class='add-hint-container'>");
        var $addHint = $("<a href='#' class='simple-button orange " +
                "icon-plus add-hint-button'>");
        // Leading space because of FontAwesome icon.
        $addHint.text(" Add a hint");
        $addHint.on("click", function() {
            var hintEditor = editor._addHint();
            editor.render().then(function() {
                hintEditor.focus();
            });
            return false;
        });
        $addHintDiv.append($addHint);

        this.$el.append(this.questionEditor.$el);
        this.$el.append(this.answerEditor.$el);
        _.each(this.hintEditors, function(e) {
            editor.$el.append(e.$el);
        });
        this.$el.append($addHintDiv);

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

            this.itemRenderer = new Perseus.ItemEditorRenderer({
                el: this.previewEl,
                item: this.toJSON(true)
            });

            return this.itemRenderer.showAllHints().then(function() {
                $("#answerform input").prop("disabled", true);
            });
        }
    }, 1),

    renderPreview: function(callback) {
        var deferred = this._renderPreview();
        if (deferred) {
            deferred.then(callback || $.noop);
        } else if (callback) {
            callback();
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
        this.hintEditors = _.map(options.hints || [],
            _.bind(this._createHint, this));

        return this.render();
    },

    _addHint: function(h) {
        var hintEditor = this._createHint(h);
        this.hintEditors.push(hintEditor);
        return hintEditor;
    },

    _createHint: function(h) {
        var editor = this;
        var hintEditor = new HintEditor(h);
        this.listenTo(hintEditor, "change", this.renderPreview);
        hintEditor.on("remove", function() {
            editor.hintEditors = _.without(editor.hintEditors, hintEditor);
            editor.render();
        });
        return hintEditor;
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

})(Perseus);
