import * as React from "react";
import {useReducer, useRef} from "react";

import {ServerItemRenderer} from "../../server-item-renderer";
import {testDependenciesV2} from "../test-dependencies";

import {createItemFlipbookModel} from "./item-flipbook-model";

import type {PerseusItemSelection, ViewModel} from "./item-flipbook-view-model";

export function ItemFlipbook() {
    const model = useModel(createItemFlipbookModel);

    return <ItemFlipbookView viewModel={model.present()} />;
}

interface ViewProps {
    viewModel: ViewModel;
}

function ItemFlipbookView({viewModel}: ViewProps) {
    return (
        <>
            <textarea
                value={viewModel.textareaValue}
                onChange={(e) => viewModel.setTextareaValue(e.target.value)}
            />
            <ItemSelectionView itemSelection={viewModel.itemSelection} />
        </>
    );
}

interface ItemSelectionViewProps {
    itemSelection: PerseusItemSelection;
}

function ItemSelectionView({itemSelection}: ItemSelectionViewProps) {
    switch (itemSelection.status) {
        case "no-item":
            return <p>No item selected for viewing.</p>;
        case "parse-error":
            // TODO: use Wonder Blocks
            return <p>{itemSelection.message}</p>;
        case "item":
            return (
                <ServerItemRenderer
                    item={itemSelection.item}
                    dependencies={testDependenciesV2}
                />
            );
    }
}

function useModel<T>(constructor: (observer: () => void) => T): T {
    const rerender = useRerender();
    const modelRef = useRef<T | null>(null);
    modelRef.current ??= constructor(rerender);
    return modelRef.current;
}

function useRerender(): () => void {
    const [_, dispatch] = useReducer((n) => n + 1, 0);
    return dispatch;
}
