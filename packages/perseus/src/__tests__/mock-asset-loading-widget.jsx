// @flow

import * as React from "react";

import AssetContext from "../asset-context.js";

import type {WidgetExports} from "../types.js";

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
};

export class MockAssetLoadingWidget extends React.Component<{||}> {
    setAssetStatus: (assetKey: string, loaded: boolean) => void;

    render(): React.Node {
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

export default ({
    name: "mocked-asset-widget",
    displayName: "Mocked Asset Widget",
    widget: MockAssetLoadingWidget,
}: WidgetExports<typeof MockAssetLoadingWidget>);
