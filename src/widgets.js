var _ = require("underscore");

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

    getVersion: function(name) {
        return widgets[name].version || {major: 0, minor: 0};
    },

    getVersionVector: function() {
        var version = {};
        _.each(_.keys(widgets), function(name) {
            version[name] = Widgets.getVersion(name);
        });
        return version;
    },

    getPublicWidgets: function() {
        // TODO(alex): Update underscore.js so that _.pick can take a function.
        return _.pick(widgets, _.reject(_.keys(widgets), function(name) {
            return widgets[name].hidden;
        }));
    },

    getAllWidgetTypes: function() {
        return _.keys(widgets);
    },

    upgradeWidgetInfoToLatestVersion: function(oldWidgetInfo) {
        var type = oldWidgetInfo.type;
        if (!_.isString(type)) {
            throw new Error("widget type must be a string, but was: " + type);
        }
        var widgetExports = widgets[type];

        if (widgetExports == null) {
            // If we have a widget that isn't registered, we can't upgrade it
            // TODO(jack): Figure out what the best thing to do here would be
            return oldWidgetInfo;
        }

        // Unversioned widgets (pre-July 2014) are all implicitly 0.0
        var initialVersion = oldWidgetInfo.version || {major: 0, minor: 0};
        var latestVersion = widgetExports.version || {major: 0, minor: 0};

        // We do a clone here so that it's safe to mutate the input parameter
        // in propUpgrades functions (which I will probably accidentally do at
        // some point, and we would like to not break when that happens).
        var newEditorProps = _.clone(oldWidgetInfo.options) || {};

        var upgradePropsMap = widgetExports.propUpgrades || {};

        // Empty props usually mean a newly created widget by the editor,
        // and are always considerered up-to-date.
        // Mostly, we'd rather not run upgrade functions on props that are
        // not complete.
        if (_.keys(newEditorProps).length !== 0) {

            // We loop through all the versions after the current version of
            // the loaded widget, up to and including the latest version of the
            // loaded widget, and run the upgrade function to bring our loaded
            // widget's props up to that version.
            // There is a little subtlety here in that we call
            // upgradePropsMap[1] to upgrade *to* version 1,
            // (not from version 1).
            for (var nextVersion = initialVersion.major + 1;
                    nextVersion <= latestVersion.major;
                    nextVersion++) {

                if (upgradePropsMap[nextVersion]) {
                    newEditorProps = upgradePropsMap[nextVersion](
                        newEditorProps
                    );

                } else if ((typeof console !== 'undefined') && console.warn) {
                    // This is a warning because it is unlikely to be hit in
                    // local testing, and a warning is slightly less scary in
                    // prod than a `throw new Error`
                    console.warn(
                        "No upgrade found for widget `" + type + "` from " +
                        "major version `" + (nextVersion - 1) + "` to " +
                        "major version `" + nextVersion + "` found. This " +
                        "is necessary to render this `" + type + "` correctly."
                    );
                    // But try to keep going anyways (yolo!)
                    // (Throwing an error here would just break the page
                    // silently anyways, so that doesn't seem much better
                    // than a halfhearted attempt to continue, however
                    // shallow...)
                }
            }
        }

        return _.extend({}, oldWidgetInfo, {  // maintain other info, like type
            version: latestVersion,
            // Default graded to true (so null/undefined becomes true):
            graded: (
                (oldWidgetInfo.graded != null) ? oldWidgetInfo.graded : true
            ),
            options: newEditorProps
        });
    },

    getRendererPropsForWidgetInfo: function(widgetInfo, problemNum) {
        var type = widgetInfo.type;
        var widgetExports = widgets[type];
        if (widgetExports == null) {
            // The widget is not a registered widget
            // It shouldn't matter what we return here, but for consistency
            // we return the untransformed options, as if the widget did
            // not have a transform defined.
            return widgetInfo.options;
        }
        var transform = widgetExports.transform || _.identity;
        // widgetInfo.options are the widgetEditor's props:
        return transform(widgetInfo.options, problemNum);
    }
};

module.exports = Widgets;
