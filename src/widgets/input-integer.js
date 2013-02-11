(function(Perseus) {

var InputInteger = Perseus.Widget.extend({
    render: function() {
        this.$el.html("<input>");
        return $.when(this);
    }
});

Perseus.Widgets.register("input-integer", InputInteger);

})(Perseus);
