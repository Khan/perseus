/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Traverses a {content, widgets, images} renderer props object,
 * such as `itemData.question`
 *
 * This traversal is deep and handles some widget prop upgrades
 * (TODO(aria): Handle minor prop upgrades :) )
 *
 * This is the right way to traverse itemData.
 *
 * NOTE: We should not expose this on the perseus API yet. Instead,
 * build the traversal method you want inside perseus, and use this
 * from that. We might eventually expose this, but I'd like to be
 * more confident in the interface provided first.
 */

var _ = require("underscore");
// TODO(aria): Pull this out of interactive2 / replace with new _.mapObject
var objective_ = require("./interactive2/objective_.js");

var Widgets = require("./widgets.js");

var noop = function() { };

var deepCallbackFor = function(
        contentCallback,
        widgetCallback,
        optionsCallback) {
    var deepCallback = function(widgetInfo, widgetId) {
        // This doesn't modify the widget info if the widget info
        // is at a later version than is supported, which is important
        // for our latestVersion test below.
        var upgradedWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
            widgetInfo
        );
        var latestVersion = Widgets.getVersion(upgradedWidgetInfo.type);

        // Only traverse our children if we can understand this version
        // of the widget props.
        // TODO(aria): This will break if the traversal code assumes that
        // any props that usually get defaulted in are present. That is,
        // it can fail on minor version upgrades.
        // For this reason, and because the upgrade code doesn't handle
        // minor versions correctly (it doesn't report anything useful
        // about what minor version a widget is actually at, since it
        // doesn't have meaning in the context of upgrades), we
        // just check the major version here.
        // TODO(aria): This is seriously quirky and would be unpleasant
        // to think about while writing traverseChildWidgets code. Please
        // make all of this a little tighter.
        // I think once we use react class defaultProps instead of relying
        // on getDefaultProps, this will become easier.
        var newWidgetInfo;
        if (latestVersion && (
                upgradedWidgetInfo.version.major === latestVersion.major)) {
            newWidgetInfo = Widgets.traverseChildWidgets(
                upgradedWidgetInfo,
                (rendererOptions) => {
                    return traverseRenderer(
                        rendererOptions,
                        contentCallback,
                        // so that we traverse grandchildren, too:
                        deepCallback,
                        optionsCallback
                    );
                }
            );
        } else {
            newWidgetInfo = upgradedWidgetInfo;
        }

        var userWidgetInfo = widgetCallback(newWidgetInfo, widgetId);
        if (userWidgetInfo !== undefined) {
            return userWidgetInfo;
        } else {
            return newWidgetInfo;
        }
    };
    return deepCallback;
};

var traverseRenderer = function(
        rendererOptions,
        contentCallback,
        deepWidgetCallback,
        optionsCallback) {

    var newContent = rendererOptions.content;
    if (rendererOptions.content != null) {
        var modifiedContent = contentCallback(rendererOptions.content);
        if (modifiedContent !== undefined) {
            newContent = modifiedContent;
        }
    }

    var newWidgets = objective_.mapObject(rendererOptions.widgets || {},
        function(widgetInfo, widgetId) {
            // Widgets without info or a type are empty widgets, and
            // should always be renderable. It's also annoying to write
            // checks for this everywhere, so we just filter them out once and
            // for all!
            if (widgetInfo == null || widgetInfo.type == null) {
                return widgetInfo;
            }
            return deepWidgetCallback(widgetInfo, widgetId);
        }
    );

    var newOptions = _.extend({}, rendererOptions, {
        content: newContent,
        widgets: newWidgets,
    });
    var userOptions = optionsCallback(newOptions);
    if (userOptions !== undefined) {
        return userOptions;
    } else {
        return newOptions;
    }
};

var traverseRendererDeep = function(
        rendererOptions,
        contentCallback,
        widgetCallback,
        optionsCallback) {

    contentCallback = contentCallback || noop;
    widgetCallback = widgetCallback || noop;
    optionsCallback = optionsCallback || noop;

    return traverseRenderer(
        rendererOptions,
        contentCallback,
        deepCallbackFor(contentCallback, widgetCallback, optionsCallback),
        optionsCallback
    );
};

module.exports = {
    traverseRendererDeep: traverseRendererDeep,
};

