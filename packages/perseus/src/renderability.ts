/**
 * Calculates whether a perseus item is renderable by a specific
 * perseus-item-data version.
 *
 * This is done inside of the perseus repo so that it can traverse
 * widget-specific data that might need to do a sub-traversal.
 * This supports widgets that contain renderers, such as the
 * group or sequence widgets.
 */

import {Errors, PerseusError} from "@khanacademy/perseus-core";
import _ from "underscore";

import MultiItems from "./multi-items";
import {traverse} from "./traversal";
import * as Widgets from "./widgets";

import type {PerseusWidget} from "./perseus-types";

const {findContentNodesInItem, inferItemShape} = MultiItems;

const isUpgradedWidgetInfoRenderableBy = function (
    widgetInfo: PerseusWidget,
    widgetRendererVersion: any,
) {
    if (widgetRendererVersion == null) {
        // If the widget does not exist in this version, this will
        // be null, and that version of perseus cannot render the
        // widget (it doesn't even know the widget exists!)
        return false;
    }

    const widgetVersion = widgetInfo.version || {major: 0, minor: 0};
    if (widgetRendererVersion.major > widgetVersion.major) {
        return true;
    }
    if (widgetRendererVersion.major < widgetVersion.major) {
        return false;
    }
    // If the major versions are the same, the minor version acts
    // like a tie-breaker.
    // For example, input-number 3.2 can render an input-number
    // 2.4, 3.0, or 3.2, but not an input number 3.3 or 4.0.
    return widgetRendererVersion.minor >= widgetVersion.minor;
};

const isRawWidgetInfoRenderableBy = function (
    widgetInfo: any,
    rendererContentVersion: any,
) {
    // Empty/non-existant widgets are always safe to render
    if (widgetInfo == null || widgetInfo.type == null) {
        return true;
    }

    // NOTE: This doesn't modify the widget info if the widget info
    // is at a later version than is supported.
    const upgradedWidgetInfo =
        Widgets.upgradeWidgetInfoToLatestVersion(widgetInfo);
    return isUpgradedWidgetInfoRenderableBy(
        upgradedWidgetInfo,
        rendererContentVersion[upgradedWidgetInfo.type],
    );
};

const isRendererContentRenderableBy = function (
    rendererOptions,
    rendererContentVersion: any,
) {
    let isRenderable = true;
    traverse(rendererOptions, null, function (widgetInfo) {
        isRenderable =
            isRenderable &&
            isRawWidgetInfoRenderableBy(widgetInfo, rendererContentVersion);
    });
    return isRenderable;
};

export const isItemRenderableByVersion = function (
    itemData: any,
    rendererContentVersion: any,
): boolean {
    if (itemData == null || rendererContentVersion == null) {
        throw new PerseusError(
            "missing parameter to Perseus.isRenderable.item",
            Errors.InvalidInput,
        );
    }
    if (itemData._multi) {
        const shape = inferItemShape(itemData);

        let isRenderable = true;
        findContentNodesInItem(itemData, shape, (node) => {
            const nodeIsRenderable = isRendererContentRenderableBy(
                node,
                rendererContentVersion,
            );
            if (!nodeIsRenderable) {
                isRenderable = false;
            }
        });
        return isRenderable;
    }
    return isRendererContentRenderableBy(
        itemData.question,
        rendererContentVersion,
    );
};
