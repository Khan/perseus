/* eslint-disable static-service/require-fixture */
// @flow
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

import _ from "underscore";

// TODO(aria): Pull this out of interactive2 / replace with new _.mapObject
import objective_ from "./interactive2/objective_.js";
import * as Widgets from "./widgets.js";

const noop = function () {};

const deepCallbackFor = function (
    contentCallback: ($FlowFixMe) => void,
    widgetCallback: (widgetInfo: $FlowFixMe, widgetId: string) => $FlowFixMe,
    optionsCallback: ($FlowFixMe) => void,
) {
    const deepCallback = function (widgetInfo, widgetId) {
        // This doesn't modify the widget info if the widget info
        // is at a later version than is supported, which is important
        // for our latestVersion test below.
        const upgradedWidgetInfo =
            Widgets.upgradeWidgetInfoToLatestVersion(widgetInfo);
        const latestVersion = Widgets.getVersion(upgradedWidgetInfo.type);

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
        let newWidgetInfo;
        if (
            latestVersion &&
            upgradedWidgetInfo.version?.major === latestVersion.major
        ) {
            newWidgetInfo = Widgets.traverseChildWidgets(
                upgradedWidgetInfo,
                (rendererOptions) => {
                    return traverseRenderer(
                        rendererOptions,
                        contentCallback,
                        // so that we traverse grandchildren, too:
                        deepCallback,
                        optionsCallback,
                    );
                },
            );
        } else {
            newWidgetInfo = upgradedWidgetInfo;
        }

        const userWidgetInfo = widgetCallback(newWidgetInfo, widgetId);
        if (userWidgetInfo !== undefined) {
            return userWidgetInfo;
        }
        return newWidgetInfo;
    };
    return deepCallback;
};

const traverseRenderer = function (
    rendererOptions,
    contentCallback: ($FlowFixMe) => void,
    deepWidgetCallback: (
        widgetInfo: $FlowFixMe,
        widgetId: string,
    ) => $FlowFixMe,
    optionsCallback: ($FlowFixMe) => void,
) {
    let newContent = rendererOptions.content;
    if (rendererOptions.content != null) {
        const modifiedContent = contentCallback(rendererOptions.content);
        if (modifiedContent !== undefined) {
            newContent = modifiedContent;
        }
    }

    const newWidgets = objective_.mapObject(
        rendererOptions.widgets || {},
        function (widgetInfo, widgetId) {
            // Widgets without info or a type are empty widgets, and
            // should always be renderable. It's also annoying to write
            // checks for this everywhere, so we just filter them out once and
            // for all!
            if (widgetInfo == null || widgetInfo.type == null) {
                return widgetInfo;
            }
            return deepWidgetCallback(widgetInfo, widgetId);
        },
    );

    const newOptions = _.extend({}, rendererOptions, {
        content: newContent,
        widgets: newWidgets,
    });
    const userOptions = optionsCallback(newOptions);
    if (userOptions !== undefined) {
        return userOptions;
    }
    return newOptions;
};

export const traverse = function (
    rendererOptions: $FlowFixMe,
    contentCallback?: ?($FlowFixMe) => $FlowFixMe,
    widgetCallback?: ?(widgetInfo: $FlowFixMe, widgetId: string) => $FlowFixMe,
    optionsCallback?: ($FlowFixMe) => void,
): $FlowFixMe {
    contentCallback = contentCallback || noop;
    widgetCallback = widgetCallback || noop;
    optionsCallback = optionsCallback || noop;

    return traverseRenderer(
        rendererOptions,
        contentCallback,
        deepCallbackFor(contentCallback, widgetCallback, optionsCallback),
        optionsCallback,
    );
};
