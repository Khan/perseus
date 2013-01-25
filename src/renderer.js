(function(Perseus) {

var Renderer = Perseus.Renderer = Backbone.View.extend({
    initialize: function(options) {
        this.content = options.content;
    },

    render: function() {
        this.$el.text(this.content);
    }
});

})(Perseus);
