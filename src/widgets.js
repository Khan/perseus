/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-console, no-var, space-before-function-paren */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = require("underscore");

var DEFAULT_ALIGNMENT = "block";
var DEFAULT_SUPPORTED_ALIGNMENTS = ["default"];
var DEFAULT_STATIC = false;
var DEFAULT_TRACKING = "";

var widgets = {};
var editors = {};

var Widgets = {
    // Widgets must be registered to avoid circular dependencies with the
    // core Editor and Renderer components.
    register: function(name, widget, editor) {
        widgets[name] = widget;
        editors[name] = editor;
    },

    registerMany: function(widgets) {
        widgets.forEach(([widget, editor]) => {
            widget && this.register(widget.name, widget, editor);
        });

        this.validateAlignments();
    },

    getWidget: function(name) {
        // TODO(alex): Consider referring to these as renderers to avoid
        // overloading "widget"
        if (!_.has(widgets, name)) {
            return null;
        }

        // Allow widgets to specify a widget directly or via a function
        if (widgets[name].getWidget) {
            return widgets[name].getWidget();
        } else {
            return widgets[name].widget;
        }
    },

    getEditor: function(name) {
        return _.has(editors, name) ? editors[name] : null;
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

        // If the widget version is later than what we understand (major
        // version is higher than latest, or major versions are equal and minor
        // version is higher than latest), don't perform any upgrades.
        if (initialVersion.major > latestVersion.major ||
                (initialVersion.major === latestVersion.major &&
                 initialVersion.minor > latestVersion.minor)) {
            return oldWidgetInfo;
        }

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

        // Minor version upgrades (eg. new optional props) don't have
        // transform functions. Instead, we fill in the new props with their
        // defaults.
        var defaultProps = editors[type].defaultProps;
        newEditorProps = _.extend({}, defaultProps, newEditorProps);

        var alignment = oldWidgetInfo.alignment;

        // Widgets that support multiple alignments will "lock in" the
        // alignment to the alignment that would be listed first in the
        // select box. If the widget only supports one alignment, the
        // alignment value will likely just end up as "default".
        if (alignment == null || alignment === "default") {
            alignment = Widgets.getSupportedAlignments(type)[0];
        }

        var widgetStatic = oldWidgetInfo.static;

        if (widgetStatic == null) {
            widgetStatic = DEFAULT_STATIC;
        }

        return _.extend({}, oldWidgetInfo, {  // maintain other info, like type
            // After upgrading we guarantee that the version is up-to-date
            version: latestVersion,
            // Default graded to true (so null/undefined becomes true):
            graded: (
                (oldWidgetInfo.graded != null) ? oldWidgetInfo.graded : true
            ),
            alignment: alignment,
            static: widgetStatic,
            options: newEditorProps,
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
        var transform;
        if (widgetInfo.static) {
            // There aren't a lot of real places where we'll have to default to
            // _.identity, but it's theoretically possile if someone changes
            // the JSON manually / we have to back out static support for a
            // widget.
            transform = this.getStaticTransform(type) || _.identity;
        } else {
            transform = widgetExports.transform || _.identity;
        }
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
     * See widget-container.jsx for details on how alignments are implemented.
     */

    /**
     * Returns the list of supported alignments for the given (string) widget
     * type. This is used primarily at editing time to display the choices
     * for the user.
     *
     * Supported alignments are given as an array of strings in the exports of
     * a widget's module.
     */
    getSupportedAlignments: function(type) {
        var widgetInfo = widgets[type];
        return (widgetInfo && widgetInfo.supportedAlignments) ||
            DEFAULT_SUPPORTED_ALIGNMENTS;
    },

    /**
     * For the given (string) widget type, determine the default alignment for
     * the widget. This is used at rendering time to go from "default" alignment
     * to the actual alignment displayed on the screen.
     *
     * The default alignment is given either as a string (called
     * `defaultAlignment`) or a function (called `getDefaultAlignment`) on
     * the exports of a widget's module.
     */
    getDefaultAlignment: function(type) {
        var widgetInfo = widgets[type];
        var alignment;
        if (!widgetInfo) {
            return DEFAULT_ALIGNMENT;
        }

        if (widgetInfo.getDefaultAlignment) {
            alignment = widgetInfo.getDefaultAlignment();
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
    },

    /**
     * Handling for static mode for widgets that support it.
     */

    /**
     * Returns true iff the widget supports static mode.
     * A widget implicitly supports static mode if it exports a
     * staticTransform function.
     */
    supportsStaticMode: function(type) {
        var widgetInfo = widgets[type];
        return widgetInfo && widgetInfo.staticTransform != null;
    },

    /**
     * Return the staticTransform function used to convert the editorProps to
     * the rendered widget state.
     */
    getStaticTransform: function(type) {
        var widgetInfo = widgets[type];
        return widgetInfo && widgetInfo.staticTransform;
    },

    /**
     * Returns the tracking option for the widget. The default is "",
     * which means simply to track interactions once. The other available
     * option is "all" which means to track all interactions.
     */
    getTracking: function(type) {
        var widgetInfo = widgets[type];
        return (widgetInfo && widgetInfo.tracking) || DEFAULT_TRACKING;
    },
};

module.exports = Widgets;
