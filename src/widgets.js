(function(Perseus) {

var Marks = Perseus.Marks;

var Widget = Perseus.Widget = Backbone.View.extend({
    // Abstract class, please subclass me!

    render: function() {
        return $.when(this);
    },

    reprocess: function() {
        return $.when(this);
    },

    // TODO(alpert): Add a cleanup method

    toJSON: function() {
        // TODO(alpert): Separate out options like 'el' from actual state
        return this.options;
    },

    set: function(attrs) {
    }
});


// Static methods
_.extend(Widget, {
    validate: function(state, rubric) {
        return {type: "invalid"};
    }
});


var widgetTypes = {};

var Widgets = Perseus.Widgets = {
    get: function(type) {
        var deferred = $.Deferred();

        if (_.has(widgetTypes, type)) {
            deferred.resolve(widgetTypes[type]);
        } else {
            deferred.reject("Widget '" + type + "' not found");
        }

        return deferred.promise();
    },

    register: function(type, widgetClass) {
        widgetTypes[type] = widgetClass;
    }
};

})(Perseus);
