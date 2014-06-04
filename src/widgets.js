var widgets = {};

var Widgets = {
    // Widgets must be registered to avoid circular dependencies with the
    // core Editor and Renderer components.
    register: function(name, data) {
        widgets[name] = data;
    },

    getWidget: function(name, enabledFeatures) {
        // TODO(alex): Consider referring to these as renderers to avoid
        // overloading "widget"
        if (!_.has(widgets, name)) {
            return null;
        }

        // Allow widgets to specify a widget directly or via a function
        if (widgets[name].getWidget) {
            return widgets[name].getWidget(enabledFeatures);
        } else {
            return widgets[name].widget;
        }
    },

    getEditor: function(name) {
        return _.has(widgets, name) ? widgets[name].editor : null;
    },

    getTransform: function(name) {
        return _.has(widgets, name) ?
            widgets[name].transform || _.identity :
            null;
    },

    getPublicWidgets: function() {
        // TODO(alex): Update underscore.js so that _.pick can take a function.
        return _.pick(widgets, _.reject(_.keys(widgets), function(name) {
            return widgets[name].hidden;
        }));
    }
};

module.exports = Widgets;
