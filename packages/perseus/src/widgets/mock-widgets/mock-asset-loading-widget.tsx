import {getDefaultAnswerArea} from "@khanacademy/perseus-core";
import * as React from "react";

import AssetContext from "../../asset-context";

import type {WidgetExports} from "../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";

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

export default {
    name: "mocked-asset-widget",
    displayName: "Mocked Asset Widget",
    widget: MockAssetLoadingWidget,
} satisfies WidgetExports<typeof MockAssetLoadingWidget>;
