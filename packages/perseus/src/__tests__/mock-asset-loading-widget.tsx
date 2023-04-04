import * as React from "react";

import AssetContext from "../asset-context";

import type {WidgetExports} from "../types";

export const mockedAssetItem = {
    question: {
        content: "[[\u2603 mocked-asset-widget 1]]",
        images: Object.freeze({}),
        widgets: {
            "mocked-asset-widget 1": {
                type: "mocked-asset-widget",
                alignment: "default",
                static: false,
                graded: true,
                options: Object.freeze({}),
                version: {major: 1, minor: 0},
            },
        },
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    itemDataVersion: {major: 0, minor: 1},
    // $FlowIgnore[signature-verification-failure]
    hints: [],
    _multi: null,
    answer: null,
} as const;

export class MockAssetLoadingWidget extends React.Component<Record<any, any>> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property 'setAssetStatus' has no initializer and is not definitely assigned in the constructor.
    setAssetStatus: (assetKey: string, loaded: boolean) => void;

    render(): React.ReactNode {
        return (
            <AssetContext.Consumer>
                {({setAssetStatus}) => {
                    this.setAssetStatus = setAssetStatus;
                    <div />;
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
