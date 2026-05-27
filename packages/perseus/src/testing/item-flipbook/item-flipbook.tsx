import {isFailure, parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";
import {useReducer, useRef} from "react";

import {ServerItemRenderer} from "../../server-item-renderer";
import {testDependenciesV2} from "../test-dependencies";

import type {
    Result,
    ParseFailureDetail,
    PerseusItem,
} from "@khanacademy/perseus-core";

export function ItemFlipbook() {
    const model = useModel(createItemFlipbookModel);

    return <ItemFlipbookView viewModel={model.present()} />;
}

function createItemFlipbookModel(observer: () => void) {
    return new ItemFlipbookModel(observer);
}

class ItemFlipbookModel {
    private textareaValue = "";

    constructor(private observer: () => void) {}

    present(): ViewModel {
        return {
            textareaValue: this.textareaValue,
            setTextareaValue: this.setTextareaValue,
            itemSelection: this.getSelectedItem(),
        };
    }

    setTextareaValue = (newValue: string) => {
        this.textareaValue = newValue;
        this.observer();
    };

    getSelectedItem(): PerseusItemSelection {
        const [first] = this.textareaValue.split("\n");

        if (!first) {
            return noItem();
        }

        const parseResult = safeParsePerseusItem(first);
        if (isFailure(parseResult)) {
            return parseError(parseResult.detail.message);
        }

        return item(parseResult.value);
    }
}

function safeParsePerseusItem(
    data: unknown,
): Result<PerseusItem, ParseFailureDetail> {
    try {
        return parseAndMigratePerseusItem(data);
    } catch (e) {
        const error = convertCaughtValueToError(e);
        return {
            type: "failure",
            detail: {message: error.message, invalidObject: data},
        };
    }
}

type PerseusItemSelection =
    | {status: "no-item"}
    | {status: "parse-error"; message: string}
    | {status: "item"; item: PerseusItem};

function noItem(): PerseusItemSelection {
    return {status: "no-item"};
}

function parseError(message: string): PerseusItemSelection {
    return {
        status: "parse-error",
        message,
    };
}

function item(item: PerseusItem): PerseusItemSelection {
    return {status: "item", item};
}

interface ViewModel {
    /**
     * The text the user has entered into the textarea.
     * This is supposed to be a sequence of JSON objects separated by newlines.
     */
    textareaValue: string;
    setTextareaValue: (newValue: string) => void;

    /**
     * The data that should be rendered for the currently selected item.
     * Either:
     * - a PerseusItem
     * - a perseus parser error or JSON parse error
     * - a placeholder indicating that no item was selected.
     */
    itemSelection: PerseusItemSelection;
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

function convertCaughtValueToError(e: unknown): Error {
    if (e instanceof Error) {
        return e;
    }
    return new Error(String(e));
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
