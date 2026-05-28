import * as React from "react";
import {useId} from "react";

import {ServerItemRendererWithDebugUI} from "../server-item-renderer-with-debug-ui";

import type {ItemDisplay, ViewModel} from "./item-flipbook-view-model";

interface ViewProps {
    viewModel: ViewModel;
}

export function ItemFlipbookView({viewModel}: ViewProps) {
    const itemNumberInputId = useId();

    return (
        <>
            <textarea
                value={viewModel.itemJsonInput.value}
                onChange={viewModel.itemJsonInput.onChange}
            />
            <div>
                <label htmlFor={itemNumberInputId}>Item number</label>{" "}
                {/* TODO: make this input editable */}
                <input
                    id={itemNumberInputId}
                    value={viewModel.selectedItemNumber}
                    style={{width: "7ch", textAlign: "right"}}
                />{" "}
                of{" "}
                <span style={{display: "inline-block", width: "7ch"}}>
                    {viewModel.totalItems}
                </span>{" "}
                {/* TODO: give these buttons accessible labels / icons */}
                <button onClick={viewModel.previousItem}>⏴</button>
                <button onClick={viewModel.nextItem}>⏵</button>
            </div>
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
            return (
                <div>
                    <p>No item selected for viewing.</p>
                    <p>
                        Hint: to find items, run this command in a content data
                        dump:
                    </p>
                    <code>
                        <pre style={{fontSize: "1em"}}>
                            ag -l 'input-number \d+\]\]' | xargs jq --indent 0
                            '.[].item_data | .. | objects |
                            select(.question.content | . != null and
                            test("input-number"))' | head -100
                        </pre>
                    </code>
                </div>
            );
        case "parse-error":
            // TODO: use Wonder Blocks
            return <p>{itemDisplay.message}</p>;
        case "item":
            return (
                <ServerItemRendererWithDebugUI
                    title={""}
                    item={itemDisplay.item}
                    key={itemDisplay.key}
                />
            );
    }
}
