(function(Perseus) {

var Renderer = Perseus.Renderer = Backbone.View.extend({
    render: function() {
        var deferred = $.Deferred();

        this.$el.text(this.options.content);

        // TODO(alpert): Parse dollar-sign math out before passing to MathJax
        // and then disable tex2jax
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el]);
        MathJax.Hub.Queue(deferred.resolve);

        return deferred;
    }
});

})(Perseus);
