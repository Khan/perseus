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

var Widgets = require("./widgets.js");

var noop = function() { };

var deepCallbackFor = function(contentCallback, widgetCallback) {
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
        if (latestVersion && (
                upgradedWidgetInfo.version.major === latestVersion.major)) {
            Widgets.traverseChildWidgets(
                upgradedWidgetInfo,
                (rendererOptions) => {
                    traverseRenderer(
                        rendererOptions,
                        contentCallback,
                        deepCallback // so that we traverse grandchildren, too!
                    );
                }
            );
        }

        widgetCallback(upgradedWidgetInfo, widgetId);
    };
    return deepCallback;
};

var traverseRenderer = function(
        rendererOptions,
        contentCallback,
        deepWidgetCallback) {

    if (rendererOptions.content != null) {
        contentCallback(rendererOptions.content);
    }

    _.each(rendererOptions.widgets, function(widgetInfo, widgetId) {
        // Widgets without info or a type are empty widgets, and
        // should always be renderable. It's also annoying to write
        // checks for this everywhere, so we just filter them out once and
        // for all!
        if (widgetInfo == null || widgetInfo.type == null) {
            return;
        }
        deepWidgetCallback(widgetInfo, widgetId);
    });
};

var traverseRendererDeep = function(
        rendererOptions,
        contentCallback,
        widgetCallback) {

    contentCallback = contentCallback || noop;
    widgetCallback = widgetCallback || noop;

    traverseRenderer(
        rendererOptions,
        contentCallback,
        deepCallbackFor(contentCallback, widgetCallback)
    );
};

module.exports = {
    traverseRendererDeep: traverseRendererDeep,
};

