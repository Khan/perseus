(function(Perseus) {

var InputInteger = Perseus.Widget.extend({
    render: function() {
        var $input = $("<input>").val("");
        this._input = $input[0];

        this.$el.append($input);

        return $.when(this);
    },

    getState: function() {
        var val = $(this._input).val();
        return $.when(val);
    },

    setState: function(val) {
        $(this._input).val(val);
        return $.when();
    }
});

_.extend(InputInteger, {
    assess: function(state, rubric) {
    }
});

Perseus.Widgets.register("input-integer", InputInteger);

})(Perseus);
