import {getDefaultAnswerArea} from "@khanacademy/perseus-core";
import * as React from "react";

import AssetContext from "../../asset-context";
import {defineWidgetRegistration} from "../../widget-registration";

import type {WidgetExports} from "../../types";
import type {PerseusItem, WidgetLogic} from "@khanacademy/perseus-core";

export const mockedAssetItem: PerseusItem = {
    question: {
        content: "[[\u2603 mock-asset-loading-widget 1]]",
        images: Object.freeze({}),
        widgets: {
            // @ts-expect-error - TS2353 - Object literal may only specify known properties, and '"mock-asset-loading-widget 1"' does not exist in type 'PerseusWidgetsMap'.
            "mock-asset-loading-widget 1": {
                type: "mock-asset-loading-widget",
                alignment: "default",
                static: false,
                graded: true,
                options: Object.freeze({value: ""}),
            },
        },
    },
    answerArea: getDefaultAnswerArea(),
    hints: [],
} as const;

/**
 * This is a Mock Asset Loading Perseus widget, which is used specifically for
 * our server-item-renderer tests to test the asset loading callbacks.
 */
export class MockAssetLoadingWidget extends React.Component<Record<any, any>> {
    setAssetStatus: ((assetKey: string, loaded: boolean) => void) | null = null;

    render(): React.ReactNode {
        return (
            <AssetContext.Consumer>
                {({setAssetStatus}) => {
                    this.setAssetStatus = setAssetStatus;
                    return <div />;
                }}
            </AssetContext.Consumer>
        );
    }
}

const mockAssetLoadingWidget = {
    name: "mock-asset-loading-widget",
    displayName: "Mocked Asset Widget",
    widget: MockAssetLoadingWidget,
} satisfies WidgetExports<
    "mock-asset-loading-widget",
    typeof MockAssetLoadingWidget
>;

/**
 * The mock has no behavior of its own to describe in core, but rendering it
 * still asks core for its version and alignment, so it needs an entry there.
 */
const mockAssetLoadingWidgetLogic = {
    name: "mock-asset-loading-widget",
} satisfies WidgetLogic<"mock-asset-loading-widget">;

export const mockAssetLoadingWidgetRegistration = defineWidgetRegistration({
    widget: mockAssetLoadingWidget,
    logic: mockAssetLoadingWidgetLogic,
});

export default mockAssetLoadingWidget;
