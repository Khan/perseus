import type {PerseusItem} from "@khanacademy/perseus-core";

export type NoItem = {status: "no-item"};
export type ParseError = {status: "parse-error"; message: string};
export type Item = {status: "item"; item: PerseusItem; key: string};

/**
 * The information displayed in the item display section of the UI. One of:
 * - no item (if no data has been entered)
 * - a parse error from the currently selected item
 * - a valid item
 */
export type ItemDisplay = NoItem | ParseError | Item;

export function noItem(): NoItem {
    return {status: "no-item"};
}

export function parseError(message: string): ParseError {
    return {status: "parse-error", message};
}

export function item(item: PerseusItem, key: string): Item {
    return {status: "item", item, key};
}

export function isItem(itemDisplay: ItemDisplay): itemDisplay is Item {
    return itemDisplay.status === "item";
}

export interface InputFieldChangeEvent {
    target: {
        value: string;
    };
}

export interface InputField {
    value: string;
    onChange: (event: InputFieldChangeEvent) => void;
}

/**
 * An abstract representation of the view. The ViewModel contains exactly the
 * values that will be rendered in React components, but it has no dependency
 * on React. This makes it easy to write tests that assert on exactly what the
 * user will see, yet don't need to render components.
 */
export interface ViewModel {
    /**
     * Input where the user can type in newline-separated Perseus item JSON
     * objects to render.
     */
    itemJsonInput: InputField;

    /**
     * Displays and controls which Perseus item from the `itemJsonInput` is
     * currently selected for display.
     */
    selectedItemNumber: InputField;

    /** The number of items, formatted for display. */
    totalItems: string;
    nextItem: () => void;
    previousItem: () => void;

    /** The data that should be rendered for the currently selected item. */
    itemDisplay: ItemDisplay;
}
