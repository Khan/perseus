import {
    generateTestPerseusItem,
    generateMeasurerOptions,
    generateMeasurerWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {PerseusMeasurerWidgetOptions} from "@khanacademy/perseus-core";

export const measurerRendererDecorator = (
    _: unknown,
    {args}: {args: Partial<PerseusMeasurerWidgetOptions>},
) => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: "[[☃ measurer 1]]",
                    widgets: {
                        "measurer 1": generateMeasurerWidget({
                            options: generateMeasurerOptions(args),
                        }),
                    },
                }),
            })}
        />
    );
};
