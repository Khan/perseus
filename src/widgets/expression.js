(function(Perseus) {

var parse = Perseus.ExpressionTools.parse;
var compare = Perseus.ExpressionTools.compare;

var Expression = Perseus.Widget.extend({
    className: "perseus-widget-expression",
    labelTagName: "label",

    initialize: function() {
        this.$input = $("<input type='text'>");
        var output = $("<div class='output'>");
        this.$mathjax = $("<div class='mathjax'>");
        var placeholder = $("<div class='placeholder'>");
        this.$error = $("<div class='error'>").hide();

        this.$error.append(
            $("<div class='speech-arrow'>"),
            $("<div class='buddy'>"),
            $("<div class='message'>").append(
                "<span>Sorry, I don't understand that!</span>"
        ));

        this.$el.append(
            this.$input,
            output.append(
                this.$mathjax,
                placeholder.append(
                    this.$error
        )));

        this.debouncedRender = _.debounce(this.render, 100);
    },

    setState: $.noop,

    errorTimeout: null,

    showError: function() {
        if (!this.$error.is(":visible")) {
            this.$error.css({ top: 50, opacity: 0.1 }).show().animate({ top: 0, opacity: 1 }, 300);
        }
    },

    hideError: function() {
        if (this.$error.is(":visible")) {
            this.$error.animate({ top: 50, opacity: 0.1 }, 300, function() {
                $(this).hide();
            });
        }
    },

    handleInput: function(event) {
        var text = this.$input.val();
        var input = this.$input.get(0);

        var start = input.selectionStart;
        var end = input.selectionEnd;

        var supported = start !== undefined;

        if (supported && event.which === 57 && event.shiftKey) {
            event.preventDefault();

            // left paren
            if (start === end) {
                var insertMatched = _.any([" ", ")", undefined], function(val) {
                    return text[start] === val;
                });

                this.$input.val(text.substring(0, start) +
                                (insertMatched ? "()" : "(") +
                                text.substring(end));
            } else {
                this.$input.val(text.substring(0, start) +
                                "(" + text.substring(start, end) + ")" +
                                text.substring(end));
            }
            input.selectionStart = start + 1;
            input.selectionEnd = end + 1;

        } else if (supported && event.which === 48 && event.shiftKey) {

            // right paren
            if (start === end &&
                text[start] === ")") {

                event.preventDefault();
                input.selectionStart = start + 1;
                input.selectionEnd = end + 1;
            }

        } else if (supported && event.which === 8) {

            // backspace
            if (start === end &&
                text[start - 1] === "(" &&
                text[start] === ")") {

                event.preventDefault();
                this.$input.val(text.substring(0, start - 1) +
                                text.substring(start + 1));
                input.selectionStart = start - 1;
                input.selectionEnd = end - 1;
            }
        }

        this.debouncedRender();
    },

    render: function() {
        var widget = this;

        this.$input.off("keydown").on("keydown", _.bind(this.handleInput, this));

        var result = parse(this.$input.val());

        if (!result.parsed) {
            this.$mathjax.css({opacity: 0.5});
            clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(_.bind(this.showError, this), 2000);

            return widget;
        } else {
            this.$mathjax.css({opacity: 1});
            clearTimeout(this.errorTimeout);
            this.hideError();

            var parsed = "$" + result.expr.tex() + "$";
            var mathjaxRenderer = new Perseus.Renderer({ content: parsed });
            this.$mathjax.empty().append(mathjaxRenderer.$el);

            return $.when(mathjaxRenderer.render()).then(function() {
                return widget;
            });
        }
    },

    focus: function() {
        this.$input.focus();
    },

    toJSON: function(skipValidation) {
        return {
            value: this.$input.val()
        };
    },

    set: function(options) {
        this.$input.val(options.value);
    },

    simpleValidate: function(rubric) {
        return Expression.validate(this.toJSON(), rubric);
    }
});

_.extend(Expression, {
    validate: function(state, rubric) {
        var answer = parse(state.value);
        var expected = parse(rubric.value);

        if (!answer.parsed) {
            return {
                type: "invalid",
                message: null
            };
        }

        var result = compare(answer.expr, expected.expr, rubric);

        return {
            type: "points",
            earned: result.equal ? 1 : 0,
            total: 1,
            message: result.message
        };
    }
});

var ExpressionEditor = Perseus.Widget.extend({
    options: {
        value: "",
        eval: true,
        form: false,
        simplify: false
    },

    optionLabels: {
        eval: "Answer expression must evaluate the same.",
        form: "Answer expression must have the same form.",
        simplify: "Answer expression must be fully expanded and simplified."
    },

    labelTagName: "div",

    initialize: function() {
        var editor = this;

        this.expression = new Expression();

        this.$el.empty();
        this.$el.append($("<label>Correct answer: </label>").append(this.expression.$el));

        this.checkboxes = {};
        _.each(this.optionLabels, function(optionLabel, option) {
            var $option = $("<input type='checkbox'>");
            editor.checkboxes[option] = $option;
            var $label = $("<label> " + optionLabel + "</label>");
            editor.$el.append($label.prepend($option));
        });
    },

    render: function() {
        var editor = this;

        this.expression.$input.off("keyup").on("keyup", function() {
            editor.options.value = $(this).val();
        });

        _.each(this.checkboxes, function($option, option) {
            $option.off("change").on("change", function() {
                editor.options[option] = $(this).prop("checked");
            });
        });

        this.expression.set(this.options);
        _.each(this.checkboxes, function($option, option) {
            $option.prop("checked", editor.options[option]);
        });

        return $.when(this.expression.render()).then(function() {
            return editor;
        });
    },

    focus: function() {
        this.expression.$input.focus();
    },

    toJSON: function(skipValidation) {
        if (!skipValidation) {
            if (this.options.value === "") {
                alert("Warning: No expression has been entered.");
            } else if (parse(this.options.value) === null) {
                alert("Warning: Entered expression didn't parse.");
            }

            if (!this.options.eval && !this.options.form) {
                alert("Warning: Neither semantic nor syntactic checking " +
                        "is enabled.");
            }
        }

        return _.pick(this.options, [
            "value", "eval", "form", "simplify"
        ]);
    },

    set: function(options) {
        _.extend(this.options, options);
        return this.render();
    },

    simpleValidate: function(rubric) {
        return true;
    }
});

Perseus.Widgets.register("expression", Expression);
Perseus.Widgets.register("expression-editor", ExpressionEditor);

})(Perseus);
