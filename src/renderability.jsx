/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

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

var Traversal = require("./traversal.jsx");
var Widgets = require("./widgets.js");

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
    Traversal.traverseRendererDeep(
        rendererOptions,
        null,
        function(widgetInfo) {
            isRenderable = isRenderable && isRawWidgetInfoRenderableBy(
                widgetInfo,
                rendererContentVersion
            );
        }
    );
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
