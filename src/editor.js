(function(Perseus) {

// like [[snowman input-number 1]]
var rWidget = /\[\[\u2603 ([a-z-]+) ([0-9]+)\]\]/g;

var SingleEditor = Perseus.SingleEditor = Perseus.Widget.extend({
    className: "perseus-single-editor",

    options: {
        content: "",
        widgetEnabled: true
    },

    render: function() {
        var editor = this;

        this.$el.empty();

        var $underlay = this.$underlay = $("<div>")
                .addClass("perseus-textarea-underlay");
        var $textarea = this.$textarea = $("<textarea>")
                .val(this.options.content);
        $textarea.on("input", function() {
            editor.options.content = $textarea.val();
            editor.trigger("change");

            editor.updateWidgets();
        }).on("keyup click focus", function() {
            // There's no useful cursor-move event that works cross-browser
            editor.updateWidgets();
        });

        this.$el.append($underlay, $textarea);
        this.updateWidgets();

        return $.when(this);
    },

    updateWidgets: function() {
        // Called a lot! Make it fast.
        // TODO(alpert): Cache HTML and only change 'selected' class?
        var $textarea = this.$textarea;

        var text = $textarea.val();
        var focused = $textarea[0] === document.activeElement;
        var selStart = $textarea[0].selectionStart;
        var selEnd = $textarea[0].selectionEnd;

        var widgetTypes = Perseus.Widgets._widgetTypes;
        var html = $("<div>").text(text).html();

        if (this.options.widgetEnabled) {
            // Highlight widgets!
            html = html.replace(rWidget, function(text, type, id, offset) {
                var selected = focused && selStart === selEnd &&
                        offset <= selStart &&
                        selStart < offset + text.length;

                // TODO(alpert): I so hate making HTML like this.
                return "<b class='" +
                    (selected ? "selected " : "") +
                    (type in widgetTypes ? "" : "error ") +
                    "' data-widget-type='" + type +
                    "' data-widget-id='" + id + "'>" +
                    text + "</b>";
            });
        }

        // Without this $, the underlay isn't the proper size when the
        // text ends with a newline.
        html = html.replace(/\n|$/g, "<br>");

        this.$underlay.html(html);
    },

    set: function(options) {
        // Extend with default options specified above...
        // TODO(alpert): Should textarea val get set here? Not sure.
        this.options = _.defaults(options, this.constructor.prototype.options);
        if (!options.silent) {
            this.trigger("change");
        }
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

// TODO(alpert): HintEditor and QuestionEditor are inconsistent
var HintEditor = Perseus.Widget.extend({
    className: "perseus-hint-editor",

    initialize: function(options) {
        var $singleEditor = this.$singleEditor = new SingleEditor({
            content: options.content,
            widgetEnabled: false
        });
        $singleEditor.on("change", function() {
            // TODO(alpert): :\
            this.options.content = $singleEditor.options.content;
            this.trigger("change");
        }, this);
    },

    render: function() {
        var hintEditor = this;

        this.$el.empty();

        var $removeHintDiv = this.$removeHintDiv = $("<div " +
            "class='remove-hint-container'>");
        var $removeHintButton = this.$removeHintButton = $("<a href='#' " +
            "class='simple-button orange remove-hint-button'" +
            "alt='Remove this Hint'>");
        $removeHintButton.append("<span class='icon-trash'>");
        $removeHintButton.append("<span> Remove this hint</span>");
        $removeHintButton.on("click", function() {
            hintEditor.trigger("remove");
            return false;
        });
        $removeHintDiv.append($removeHintButton);

        this.$el.append(this.$singleEditor.el, $removeHintDiv);

        return this.$singleEditor.render().then(function() {
            return hintEditor;
        });
    }
});

var AnswerAreaEditor = Perseus.Widget.extend({
    className: "perseus-answer-editor",

    options: {
        // TODO(alpert): Separate into validatey things
        type: "input-number"
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
                "<option value='input-number'>Text input (number)</option>"
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
        this.setType(this.options.type);
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
        this.trigger("change");
    }
});

var ItemEditor = Perseus.ItemEditor = Perseus.Widget.extend({
    className: "perseus-item-editor",

    _changedSinceLastRender: {
        question: false,
        answer: false,
        hints: false
    },

    initialize: function() {
        this.questionEditor = new QuestionEditor();
        this.answerEditor = new AnswerAreaEditor();
        this.hintEditors = [];

        this.listenTo(this.questionEditor, "change", this.updateQuestion);
        this.listenTo(this.answerEditor, "change", this.updateAnswer);

        setInterval(_.bind(this.renderPreview, this), 10);
    },

    render: function() {
        // editor
        var editor = this;
        this.$el.empty();

        var $addHintDiv = $("<div class='add-hint-container'>");
        var $addHint = $("<a href='#' class='simple-button orange " +
                "add-hint-button'>");
        $addHint.append("<span class='icon-plus'>");
        $addHint.append("<span> Add a hint</span>");
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

        // preview
        this.previewEl = this.options.previewEl;
        this.$previewEl = $(this.previewEl);

        var editors = [this.questionEditor, this.answerEditor].concat(
            this.hintEditors);
        var deferreds = _.invoke(editors, "render");
        return $.when.apply($, deferreds).then(function() {
            if (!editor.itemRenderer) {
                editor.itemRenderer = new Perseus.ItemEditorRenderer({
                    el: editor.previewEl,
                    item: editor.toJSON(true)
                });
            }

            return editor;
        });
    },

    renderPreview: function() {
        var deferreds = [];
        if (this._changedSinceLastRender.question) {
            this._changedSinceLastRender.question = false;
            deferreds.push(this._renderQuestion());
        }
        if (this._changedSinceLastRender.answer) {
            this._changedSinceLastRender.answer = false;
            deferreds.push(this._renderAnswer());
        }
        if (this._changedSinceLastRender.hints) {
            this._changedSinceLastRender.hints = false;
            deferreds.push(this._renderHints());
        }

        return $.when.apply($, deferreds);
    },

    updateQuestion: function() {
        this._changedSinceLastRender.question = true;
    },

    updateAnswer: function() {
        this._changedSinceLastRender.answer = true;
    },

    updateHints: function() {
        this._changedSinceLastRender.hints = true;
    },

    _renderQuestion: function() {
        // TODO(cbhl): Law of Demeter
        this.itemRenderer.questionRenderer.options.content =
            this.questionEditor.options.content;

        return this.itemRenderer.renderQuestion();
    },

    _renderAnswer: function() {
        this.itemRenderer.resetAnswerArea(this.answerEditor.toJSON(true));

        return this.itemRenderer.renderAnswer().then(function() {
            $("#answerform input").prop("disabled", true);
        });
    },

    _renderHints: function() {
        // TODO(cbhl): Law of Demeter
        if (this.itemRenderer.hintRenderers.length !==
                this.hintEditors.length) {
            // Re-create all of them, just in case.
            $("#hintsarea").empty();
            this.itemRenderer.hintRenderers = []
            this.itemRenderer.remainingHints =
                _.pluck(this.hintEditors, "options");
            this.itemRenderer.showAllHints();
        } else {
            // Just update the hint text.
            for (var i = 0; i < this.hintEditors.length; i += 1) {
                var renderer = this.itemRenderer.hintRenderers[i];
                var editor = this.hintEditors[i];
                    renderer.options.content =
                        editor.options.content;
            }
        }

        return this.itemRenderer.renderHints();
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
        window.itemEditor = this;

        this.questionEditor.set(options.question || {});
        this.answerEditor.set(options.answerArea || {});
        this.hintEditors = _.map(options.hints || [],
            _.bind(this._createHint, this));

        this._changedSinceLastRender.question = true;
        this._changedSinceLastRender.answer = true;
        this._changedSinceLastRender.hints = true;

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
        this.listenTo(hintEditor, "change", this.updateHints);
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
