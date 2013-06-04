(function(Perseus) {

var InputNumber = Perseus.Widget.extend({
    options: {
        size: "normal"
    },

    initialize: function(options) {
        if (window.Modernizr && Modernizr.touch) {
            this.$input = $("<input type='number'>");
        } else {
            this.$input = $("<input type='text'>");
        }

        this.$input.addClass("perseus-input-size-" + options.size);
    },

    setState: function() {},

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

        if (state.value === "" || result === "") {
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
        simplify: "required",
        size: "normal"
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
                var ans = Perseus.Util.firstNumericalParse($(this).val());
                $(this).val(ans || 0).trigger("input");
                editor.trigger("change");
            });

        var $simple = this.$simple = $("<input type='checkbox'>")
            .prop("checked", this.options.simplify === "required")
            .on("change", function() {
                editor.options.simplify = $(this).prop("checked") ?
                        "required" : "optional";
                editor.trigger("change");
            });

        var $sizer = this.$sizer = $("<select>")
            .append(
                "<option value='normal'>Normal (80px)</option>",
                "<option value='small'>Small (40px)</option>"
                )
            .val(this.options.size)
            .on("change", function() {
                editor.options.size = $(this).val();
                editor.trigger("change");
            });

        this.$el.empty();
        this.$el.append(
            $("<div>").append("Correct answer: ", $input),
            $("<div>").append(
                $("<label> Require simplification</label>").prepend($simple)),
            $("<div>").append(
                $("<label>Width </label>").append($sizer)));

        return $.when(this);
    },

    focus: function() {
        this.$input.focus();
    },

    toJSON: function() {
        return this.options;
    },

    set: function(options) {
        _.extend(this.options, options);
        return this.render();
    }
});

Perseus.Widgets.register("input-number", InputNumber);
Perseus.Widgets.register("input-number-editor", InputNumberEditor);

})(Perseus);
