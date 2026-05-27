import * as React from "react";
import {ItemDisplay, type ViewModel} from "./item-flipbook-view-model";

import {ServerItemRenderer} from "../../server-item-renderer";
import {testDependenciesV2} from "../test-dependencies";


interface ViewProps {
    viewModel: ViewModel;
}

export function ItemFlipbookView({viewModel}: ViewProps) {
    return (
        <>
            <textarea
                value={viewModel.itemJsonInput.value}
                onChange={viewModel.itemJsonInput.onChange}
            />
            <ItemDisplayView itemDisplay={viewModel.itemDisplay} />
        </>
    );
}

interface ItemDisplayViewProps {
    itemDisplay: ItemDisplay;
}

function ItemDisplayView({itemDisplay}: ItemDisplayViewProps) {
    switch (itemDisplay.status) {
        case "no-item":
            return <p>No item selected for viewing.</p>;
        case "parse-error":
            // TODO: use Wonder Blocks
            return <p>{itemDisplay.message}</p>;
        case "item":
            return (
                <ServerItemRenderer
                    item={itemDisplay.item}
                    dependencies={testDependenciesV2}
                />
            );
    }
}
