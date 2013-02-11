(function(Perseus) {

var Widget = Perseus.Widget = Backbone.View.extend({
    // Abstract class, please subclass me!

    render: function() {
        return $.when(this);
    },

    present: function() {
        return $.when(this);
    },

    // TODO(alpert): Add a cleanup method

    getState: function() {
        return $.when();
    },

    setState: function() {
        return $.when();
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
