import * as React from "react";

import AssetContext from "../asset-context";
import {ItemExtras} from "../perseus-types";

import type {PerseusAnswerArea, StandardItem} from "../perseus-types";
import type {WidgetExports} from "../types";

export const mockedAssetItem: StandardItem = {
    question: {
        content: "[[\u2603 example-widget 1]]",
        images: Object.freeze({}),
        widgets: {
            "example-widget 1": {
                type: "example-widget",
                alignment: "default",
                static: false,
                graded: true,
                options: Object.freeze({value: ""}),
                version: {major: 1, minor: 0},
            },
        },
    },
    answerArea: Object.fromEntries(
        ItemExtras.map((extra) => [extra, false]),
    ) as PerseusAnswerArea,
    itemDataVersion: {major: 0, minor: 1},
    hints: [],
    answer: null,
} as const;

export class MockAssetLoadingWidget extends React.Component<Record<any, any>> {
    // @ts-expect-error - TS2564 - Property 'setAssetStatus' has no initializer and is not definitely assigned in the constructor.
    setAssetStatus: (assetKey: string, loaded: boolean) => void;

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
} as WidgetExports<typeof MockAssetLoadingWidget>;
