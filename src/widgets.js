(function(Perseus) {

require("./core.js");

var widgetTypes = {};

var Widgets = Perseus.Widgets = {
    // TODO(alpert): Stop cheating and really hide this
    _widgetTypes: widgetTypes,

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
