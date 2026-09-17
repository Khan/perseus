import {
    generateTestPerseusItem,
    generateInteractiveGraphQuestion,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
import type {
    PerseusInteractiveGraphWidgetOptions,
    PerseusRenderer,
    UserInputMap,
} from "@khanacademy/perseus-core";

export const interactiveGraphRendererDecorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Partial<PerseusInteractiveGraphWidgetOptions>;
        parameters?: {
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
            content?: string;
            isStatic?: boolean;
            graded?: boolean;
            // Escape hatch for stories that need a fully pre-built question
            // (e.g. answerless data created via splitPerseusItem).
            question?: PerseusRenderer;
        };
    },
) => {
    const item = generateTestPerseusItem({
        question:
            parameters?.question ??
            generateInteractiveGraphQuestion({
                ...args,
                content: parameters?.content,
                isStatic: parameters?.isStatic,
                graded: parameters?.graded,
            }),
    });

    return (
        <ServerItemRendererWithDebugUI
            item={item}
            apiOptions={parameters?.apiOptions}
            initialUserInput={parameters?.initialUserInput}
        />
    );
};
