import _ from "underscore";

import {getPublicWidgetOptionsFunction} from "../widgets/core-widget-registry";

import type {PerseusRenderer} from "../data-schema";

export default function splitPerseusItem(
    originalItem: PerseusRenderer,
): PerseusRenderer {
    const item = _.clone(originalItem);

    if (!item.widgets || Object.keys(item.widgets).length === 0) {
        return item;
    }

    const splitWidgets = {};

    for (const [id, widget] of Object.entries(item.widgets)) {
        const publicWidgetOptionsFun = getPublicWidgetOptionsFunction(
            widget.type,
        );

        splitWidgets[id] = {
            ...widget,
            // Not all widgets have a splitting function
            // so just pass options through for those that don't
            options: publicWidgetOptionsFun
                ? publicWidgetOptionsFun(widget.options as any)
                : widget.options,
        };
    }

    item.widgets = splitWidgets;

    return item;
}
