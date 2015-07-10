var _ = require("underscore");

var DEFAULT_ALIGNMENT = "block";
var DEFAULT_SUPPORTED_ALIGNMENTS = ["default"];

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
        var widgetInfo = widgets[name];
        if (widgetInfo) {
            return widgets[name].version || {major: 0, minor: 0};
        } else {
            return null;
        }
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

    isAccessible: function(widgetInfo) {
        var accessible = widgets[widgetInfo.type].accessible;
        if (typeof accessible === "function") {
            return accessible(widgetInfo.options);
        } else {
            return !!accessible;
        }
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
            // TODO(aria): Figure out what the best thing to do here would be
            return oldWidgetInfo;
        }

        // Unversioned widgets (pre-July 2014) are all implicitly 0.0
        var initialVersion = oldWidgetInfo.version || {major: 0, minor: 0};
        var latestVersion = widgetExports.version || {major: 0, minor: 0};
        // Actual version. Only updated if we did an upgrade. If we didn't,
        // it might be because the actual version is already greater than
        // the latest version (we might be looking at the props from
        // a later version of perseus, sent in via isRenderable)
        var actualVersion = initialVersion;

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

                // we are updating this widget to the latest version (after
                // all the iterations of this loop)
                // We do this inside the loop so that if the widget is at a
                // version later than what we understand, this loop will run
                // zero times, and the actualVersion won't be changed from
                // the initialVersion.
                actualVersion = latestVersion;
            }
        }

        var alignment = oldWidgetInfo.alignment;

        // Widgets that support multiple alignments will "lock in" the
        // alignment to the alignment that would be listed first in the
        // select box. If the widget only supports one alignment, the
        // alignment value will likely just end up as "default".
        if (alignment == null || alignment === "default") {
            alignment = Widgets.getSupportedAlignments(type)[0];
        }

        return _.extend({}, oldWidgetInfo, {  // maintain other info, like type
            version: actualVersion,
            // Default graded to true (so null/undefined becomes true):
            graded: (
                (oldWidgetInfo.graded != null) ? oldWidgetInfo.graded : true
            ),
            alignment: alignment,
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
    },

    traverseChildWidgets: function(
            widgetInfo,
            traverseRenderer) {

        if (!traverseRenderer) {
            throw new Error("traverseRenderer must be provided, but was not");
        }

        if (!widgetInfo || !widgetInfo.type || !widgets[widgetInfo.type]) {
            return widgetInfo;
        }

        var widgetExports = widgets[widgetInfo.type];
        var props = widgetInfo.options;

        if (widgetExports.traverseChildWidgets && props) {
            var newProps = widgetExports.traverseChildWidgets(
                props,
                traverseRenderer
            );
            return _.extend({}, widgetInfo, {options: newProps});
        } else {
            return widgetInfo;
        }
    },

    /**
     * Handling for the optional alignments for widgets
     * The following alignments are supported (see widget-container.jsx for 
     * details on how alignments are implemented):
     *
     * * default: If this alignment is selected, the default alignment provided
     *     by the widget's code will be used.
     * * block
     * * inline-block
     * * inline
     * * float-left
     * * float-right
     */

    /**
     * Returns the list of supported alignments for the given (string) widget
     * type. This is used primarily at editing time to display the choices 
     * for the user.
     *
     * Support alignments are given as an array of strings in the exports of
     * a widget's module.
     */
    getSupportedAlignments: function(type) {
        var widgetInfo = widgets[type];
        return (widgetInfo && widgetInfo.supportedAlignments) || DEFAULT_SUPPORTED_ALIGNMENTS;
    },

    /**
     * For the given (string) widget type and enabledFeatures, determine the
     * default alignment for the widget. This is used at rendering time to
     * go from "default" alignment to the actual alignment displayed on the
     * screen.
     *
     * The default alignment is given either as a string (called
     * `defaultAlignment`) or a function (called `getDefaultAlignment`) on
     * the exports of a widget's module.
     */
    getDefaultAlignment: function(type, enabledFeatures) {
        var widgetInfo = widgets[type];
        if (!widgetInfo) {
            return DEFAULT_ALIGNMENT;
        }

        if (widgetInfo.getDefaultAlignment) {
            alignment = widgetInfo.getDefaultAlignment(enabledFeatures);
        } else {
            alignment = widgetInfo.defaultAlignment;
        }
        return alignment || DEFAULT_ALIGNMENT;
    },

    validAlignments: [
        "block",
        "inline-block",
        "inline",
        "float-left",
        "float-right",
        "full-width",
    ],

    /**
     * Used at startup to fail fast if an alignment given by a widget is
     * invalid.
     */
    // TODO(alex): Change this to run as a testcase (vs. being run at runtime)
    validateAlignments: function () {
        _.each(widgets, function (widgetInfo) {
            if (widgetInfo.defaultAlignment && 
                !_.contains(Widgets.validAlignments,
                            widgetInfo.defaultAlignment)) {
                throw new Error("Widget '" + widgetInfo.displayName +
                    "' has an invalid defaultAlignment value: " +
                    widgetInfo.defaultAlignment);
            }

            if (widgetInfo.supportedAlignments) {
                var unknownAlignments = _.difference(
                     widgetInfo.supportedAlignments, 
                     Widgets.validAlignments);

                if (unknownAlignments.length) {
                    throw new Error("Widget '" + widgetInfo.displayName +
                        "' has an invalid value for supportedAlignments: " +
                        unknownAlignments.join(" "));
                }
            }
        });
    }
};

module.exports = Widgets;
