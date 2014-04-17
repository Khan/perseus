var widgets = {};

var Widgets = {
    // Widgets must be registered to avoid circular dependencies with the
    // core Editor and Renderer components.
    register: function(name, data) {
        widgets[name] = data;
    },

    getWidget: function(name) {
        // TODO(alex): Consider referring to these as renderers to avoid
        // overloading "widget"/
        return _.has(widgets, name) ? widgets[name].widget : null;
    },

    getEditor: function(name) {
        return _.has(widgets, name) ? widgets[name].editor : null;
    },

    getPublicWidgets: function() {
        // TODO(alex): Update underscore.js so that _.pick can take a function.
        return _.pick(widgets, _.reject(_.keys(widgets), function(name) {
            return widgets[name].hidden;
        }));
    }
};

module.exports = Widgets;
