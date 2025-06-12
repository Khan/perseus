import * as React from "react";

import {ServerItemRendererWithDebugUI} from "./server-item-renderer-with-debug-ui";

/**
 * This is for rendering RTL (right-to-left) stories in Storybook.
 * This wraps the ServerItemRendererWithDebugUI inside a div with RTL direction
 * to properly display right-to-left content in Storybook.
 *
 * Usage example:
 * ```
 * export const MyComponentRTL = {
 *     args: {
 *         // your args here
 *     },
 *     parameters: {
 *         direction: "rtl",
 *     },
 *     render: rtlStoryRenderer,
 * };
 * ```
 */
export const rtlStoryRenderer = <
    T extends {
        item: any;
        reviewMode?: boolean;
        showSolutions?: "none" | "all" | "selected";
        startAnswerless?: boolean;
    },
>(
    args: T,
    applyArgsFunc?: (args: T) => any,
    buildApiOptionsFunc?: (args: T) => any,
) => {
    // Default implementation for applyArgs and buildApiOptions if not provided
    const applyArgs = applyArgsFunc || ((args: T) => args.item);
    const buildApiOptions = buildApiOptionsFunc || (() => ({}));

    return (
        <div dir="rtl">
            <ServerItemRendererWithDebugUI
                item={applyArgs(args)}
                apiOptions={buildApiOptions(args)}
                reviewMode={args.reviewMode}
                showSolutions={args.showSolutions}
                startAnswerless={args.startAnswerless}
            />
        </div>
    );
};
