require("./core.js");

var widgetTypes = {};

var Widgets = Perseus.Widgets = {
    get: function(type) {
        return widgetTypes[type];
    },

    register: function(type, widgetClass) {
        widgetTypes[type] = widgetClass;
    }
};

module.exports = Widgets;

