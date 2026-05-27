import type {PerseusItem} from "@khanacademy/perseus-core";

export type NoItem = {status: "no-item"};
export type ParseError = {status: "parse-error"; message: string};
export type Item = {status: "item"; item: PerseusItem};

export type PerseusItemSelection = NoItem | ParseError | Item;

export function noItem(): NoItem {
    return {status: "no-item"};
}

export function parseError(message: string): ParseError {
    return {status: "parse-error", message};
}

export function item(item: PerseusItem): Item {
    return {status: "item", item};
}

export interface ViewModel {
    /**
     * The text the user has entered into the textarea.
     * This is supposed to be a sequence of JSON objects separated by newlines.
     */
    textareaValue: string;
    setTextareaValue: (newValue: string) => void;

    /**
     * The 1-indexed number of the selected item, formatted for display in an
     * input box.
     */
    selectedItemNumber: string;
    nextItem: () => void;

    /**
     * The data that should be rendered for the currently selected item.
     * Either:
     * - a PerseusItem
     * - a perseus parser error or JSON parse error
     * - a placeholder indicating that no item was selected.
     */
    itemSelection: PerseusItemSelection;
}
