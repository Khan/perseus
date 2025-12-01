import React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";

import {ApiOptions} from "../../../perseus-api";
import ServerItemRenderer from "../../../server-item-renderer";

import type {
    PerseusItem,
    PerseusNumberLineWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

// Helper function to create number-line question data
export function createNumberLineQuestion(config: {
    content: string;
    correctX: number;
    range: [number, number];
    initialX?: number;
    isInequality?: boolean;
    correctRel?: PerseusNumberLineWidgetOptions["correctRel"];
    static?: boolean;
}): PerseusRenderer {
    return {
        content: config.content,
        images: {},
        widgets: {
            "number-line 1": {
                type: "number-line",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    labelRange: [null, null],
                    initialX: config.initialX ?? null,
                    tickStep: 1,
                    labelStyle: "decimal",
                    labelTicks: true,
                    isInequality: config.isInequality ?? false,
                    snapDivisions: 2,
                    range: config.range,
                    correctRel: "ge",
                    numDivisions: null,
                    divisionRange: [1, 10],
                    correctX: config.correctX,
                    isTickCtrl: false,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };
}

export function NumberLineQuestionRenderer(props: {
    item: PerseusItem;
    rtl?: boolean;
    isMobile?: boolean;
}) {
    const {item, rtl, isMobile} = props;

    const apiOptions = {
        ...ApiOptions.defaults,
        isMobile: isMobile ?? false,
    };

    return (
        <div dir={rtl ? "rtl" : "ltr"}>
            <ServerItemRenderer
                item={item}
                apiOptions={apiOptions}
                dependencies={testDependenciesV2}
            />
        </div>
    );
}
