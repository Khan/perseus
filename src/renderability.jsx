/**
 * Calculates whether a perseus item is renderable by a specific
 * perseus-item-data version.
 *
 * This is done inside of the perseus repo so that it can traverse
 * widget-specific data that might need to do a sub-traversal.
 * This supports widgets that contain renderers, such as the
 * group or sequence widgets.
 */

var _ = require("underscore");

var Widgets = require("./widgets.js");

var deepCallbackFor = function(callback) {
    var deepCallback = function(widgetInfo, widgetId) {
        callback(widgetInfo, widgetId);

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
                widgetInfo,
                deepCallback, // so that we traverse grandchildren, too!
                traverseRenderer // not deep because we are getting the
                                 // deepness from the deepCallback
            );
        }
    };
    return deepCallback;
};

var traverseRenderer = function(rendererOptions, deepCallback) {
    _.each(rendererOptions.widgets, function(widgetInfo, widgetId) {
        // Widgets without info or a type are empty widgets, and
        // should always be renderable. It's also annoying to write
        // checks for this everywhere, so we just filter them out once and
        // for all!
        if (widgetInfo == null || widgetInfo.type == null) {
            return;
        }
        deepCallback(widgetInfo, widgetId);
    });
};

var traverseRendererDeep = function(rendererOptions, callback) {
    traverseRenderer(rendererOptions, deepCallbackFor(callback));
};

var isUpgradedWidgetInfoRenderableBy =
        function(widgetInfo, widgetRendererVersion) {
    if (widgetRendererVersion == null) {
        // If the widget does not exist in this version, this will
        // be null, and that version of perseus cannot render the
        // widget (it doesn't even know the widget exists!)
        return false;
    }

    var widgetVersion = widgetInfo.version || {major: 0, minor: 0};
    if (widgetRendererVersion.major > widgetVersion.major) {
        return true;
    } else if (widgetRendererVersion.major < widgetVersion.major) {
        return false;
    } else {
        // If the major versions are the same, the minor version acts
        // like a tie-breaker.
        // For example, input-number 3.2 can render an input-number
        // 2.4, 3.0, or 3.2, but not an input number 3.3 or 4.0.
        return widgetRendererVersion.minor >= widgetVersion.minor;
    }
};

var isRawWidgetInfoRenderableBy = function(widgetInfo,
        rendererContentVersion) {
    // Empty/non-existant widgets are always safe to render
    if (widgetInfo == null || widgetInfo.type == null) {
        return true;
    }

    // NOTE: This doesn't modify the widget info if the widget info
    // is at a later version than is supported.
    var upgradedWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
        widgetInfo
    );
    return isUpgradedWidgetInfoRenderableBy(
        upgradedWidgetInfo,
        rendererContentVersion[upgradedWidgetInfo.type]
    );
};

var isRendererContentRenderableBy =
        function(rendererOptions, rendererContentVersion) {
    var isRenderable = true;
    traverseRendererDeep(rendererOptions, function(widgetInfo) {
        isRenderable = isRenderable && isRawWidgetInfoRenderableBy(
            widgetInfo,
            rendererContentVersion
        );
    });
    return isRenderable;
};

var isItemRenderableBy = function(itemData, rendererContentVersion) {
    if (itemData == null || rendererContentVersion == null) {
        throw new Error("missing parameter to Perseus.isRenderable.item");
    }
    return isRendererContentRenderableBy(
        itemData.question,
        rendererContentVersion
    );
};

module.exports = {
    isItemRenderableByVersion: isItemRenderableBy
};
