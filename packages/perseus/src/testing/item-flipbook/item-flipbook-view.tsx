import * as React from "react";
import {useId, useState} from "react";

import {ServerItemRendererWithDebugUI} from "../server-item-renderer-with-debug-ui";

import type {ItemDisplay, ViewModel} from "./item-flipbook-view-model";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

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
                <EditableControlledInput
                    id={itemNumberInputId}
                    value={viewModel.selectedItemNumber.value}
                    onChange={viewModel.selectedItemNumber.onChange}
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

interface EditableControlledInputProps {
    id: string;
    onChange: PropsFor<"input">["onChange"];
    value: string;
    style: PropsFor<"input">["style"];
}

type EditableControlledInputState =
    | {state: "editing"; value: string}
    | {state: "controlled"};

function EditableControlledInput(props: EditableControlledInputProps) {
    const [state, setState] = useState<EditableControlledInputState>({
        state: "controlled",
    });

    return (
        <input
            id={props.id}
            value={state.state === "editing" ? state.value : props.value}
            onChange={(e) => {
                setState({state: "editing", value: e.target.value});
                props.onChange?.(e);
            }}
            onFocus={() => {
                setState({state: "editing", value: props.value});
            }}
            onBlur={() => {
                setState({state: "controlled"});
            }}
            style={props.style}
        />
    );
}
