(function(Perseus) {

var InputInteger = Perseus.Widget.extend({
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
        return InputInteger.validate(this.toJSON(), rubric);
    }
});

_.extend(InputInteger, {
    validate: function(state, rubric) {
        // For now, rubric is just like {value: "17"}
        // TODO(alpert): Smarter checking

        if (state.value === "") {
            return {
                type: "invalid",
                message: null
            };
        } else if (state.value === rubric.value) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: "Consider writing in the right answer, silly."
            };
        }
    }
});

// TODO(alpert): Editor

Perseus.Widgets.register("input-integer", InputInteger);

})(Perseus);
