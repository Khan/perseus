import React, {forwardRef, useContext, useImperativeHandle} from "react";

import AssetContext from "../../asset-context";

import type {Widget, WidgetExports} from "../../types";

export type MockAssetLoadingWidgetHandle = Widget & {
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
};

/**
 * This is a Mock Asset Loading Perseus widget, which is used specifically for
 * our server-item-renderer tests to test the asset loading callbacks.
 */
const MockAssetLoadingWidget = forwardRef<
    MockAssetLoadingWidgetHandle,
    Record<any, any>
>(function MockAssetLoadingWidget(props, ref) {
    const {setAssetStatus} = useContext(AssetContext);

    useImperativeHandle(ref, () => ({setAssetStatus}));

    return <div />;
});

export default {
    name: "mocked-asset-widget",
    displayName: "Mocked Asset Widget",
    widget: MockAssetLoadingWidget,
} satisfies WidgetExports<typeof MockAssetLoadingWidget>;
