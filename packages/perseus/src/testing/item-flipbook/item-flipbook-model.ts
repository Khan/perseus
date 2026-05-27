import {isFailure} from "@khanacademy/perseus-core";

import {item, noItem, parseError} from "./item-flipbook-view-model";
import {safeParsePerseusItem} from "./safe-parse-perseus-item";

import type {PerseusItemSelection, ViewModel} from "./item-flipbook-view-model";

export function createItemFlipbookModel(observer: () => void) {
    return new ItemFlipbookModel(observer);
}

export class ItemFlipbookModel {
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
        const [first] = this.textareaValue.split("\n").filter(nonblank);

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

function nonblank(s: string): boolean {
    return s.trim() !== "";
}
