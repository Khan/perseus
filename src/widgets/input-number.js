(function(Perseus) {

// TODO(alpert): Extract answer-types from khan-exercises maybe?

/**
 * Return the first valid interpretation of 'text' as a number, in the form
 * {value: 2.3, exact: true}.
 */
function parseOne(text) {
    // TODO(alpert): This is sort of hacky...
    var first;
    var val = Khan.answerTypes.predicate.createValidatorFunctional(
        function(ans) {
            first = ans;
            return true;  /* break */
        }, {
            simplify: "optional",
            inexact: true
        });

    val(text);
    return first;
}

var InputNumber = Perseus.Widget.extend({
    initialize: function() {
        if (window.Modernizr && Modernizr.touch) {
            this.$input = $("<input type='number'>");
        } else {
            this.$input = $("<input type='text'>");
        }
    },

    render: function() {
        this.$el.empty();
        this.$el.append(this.$input);
        return $.when(this);
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
        return InputNumber.validate(this.toJSON(), rubric);
    }
});

_.extend(InputNumber, {
    validate: function(state, rubric) {
        var val = Khan.answerTypes.number.createValidatorFunctional(
            rubric.value, {
                simplify: rubric.simplify
            });
        var result = val(state.value);

        if (result === "") {
            return {
                type: "invalid",
                message: null
            };
        } else if (result === true) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (typeof result === "string") {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: result
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});

var InputNumberEditor = Perseus.Widget.extend({
    options: {
        value: "",
        simplify: "required"
    },

    initialize: function() {
    },

    render: function() {
        var editor = this;
        var $input = this.$input = $("<input type='text'>")
            .val(this.options.value)
            .on("input", function() {
                // TODO(alpert): Parse the number here
                editor.options.value = $(this).val();
            })
            .on("blur", function() {
                var ans = parseOne($(this).val());
                $(this).val(ans || 0).trigger("input");
            });
        var $simple = this.$simple = $("<input type='checkbox'>")
            .prop("checked", this.options.simplify == "required")
            .on("change", function() {
                // TODO(alpert): A little bit of code duplication here
                editor.options.simplify = $(this).prop("checked") ?
                        "required" : "optional";
            });

        this.$el.empty();
        this.$el.append(
            "Correct answer: ", $input, "<br>",
            $("<label> Require simplification</label>").prepend($simple));

        return $.when(this);
    },

    focus: function() {
        this.$input.focus();
    },

    toJSON: function() {
        return {
            value: +this.$input.val(),
            simplify: this.$simple.prop("checked") ? "required" : "optional"
        };
    },

    set: function(options) {
        _.extend(this.options, options);
        return this.render();
    }
});

Perseus.Widgets.register("input-number", InputNumber);
Perseus.Widgets.register("input-number-editor", InputNumberEditor);

})(Perseus);
