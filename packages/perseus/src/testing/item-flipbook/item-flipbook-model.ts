import {isFailure} from "@khanacademy/perseus-core";

import {clamp} from "../../widgets/interactive-graphs/math";

import {item, noItem, parseError} from "./item-flipbook-view-model";
import {safeParsePerseusItem} from "./safe-parse-perseus-item";

import type {
    ItemDisplay,
    ViewModel,
    InputField,
} from "./item-flipbook-view-model";

export function createItemFlipbookModel(observer: () => void) {
    return new ItemFlipbookModel(observer);
}

export class ItemFlipbookModel {
    private textareaValue = "";
    private targetItemIndex = 0;

    constructor(private observer: () => void) {}

    present(): ViewModel {
        return {
            itemJsonInput: this.presentItemJsonInput(),
            selectedItemNumber: this.presentSelectedItemNumber(),
            totalItems: this.presentTotalItems(),
            itemDisplay: this.presentItemDisplay(),
            nextItem: this.nextItem,
            previousItem: this.previousItem,
        };
    }

    setTextareaValue = (newValue: string) => {
        this.textareaValue = newValue;
        this.targetItemIndex = this.clampItemIndex(this.targetItemIndex);
        this.observer();
    };

    nextItem = () => {
        this.targetItemIndex = this.clampItemIndex(this.targetItemIndex + 1);
        this.observer();
    };

    previousItem = () => {
        this.targetItemIndex = this.clampItemIndex(this.targetItemIndex - 1);
        this.observer();
    };

    private presentItemJsonInput(): InputField {
        return {
            value: this.textareaValue,
            onChange: (e) => this.setTextareaValue(e.target.value),
        };
    }

    private clampItemIndex(newIndex: number): number {
        if (this.getNumberOfItems() === 0) {
            return 0;
        }
        return clamp(newIndex, 0, this.getNumberOfItems() - 1);
    }

    private getNumberOfItems(): number {
        return this.getItemJsonDocuments().length;
    }

    private getItemJsonDocuments(): string[] {
        return this.textareaValue.split("\n").filter(nonblank);
    }

    private presentItemDisplay(): ItemDisplay {
        const selectedJson = this.getItemJsonDocuments()[this.targetItemIndex];

        if (!selectedJson) {
            return noItem();
        }

        const parseResult = safeParsePerseusItem(selectedJson);
        if (isFailure(parseResult)) {
            return parseError(parseResult.detail.message);
        }

        // The key determines when we remount the view.
        // Remount if the JSON or item number changes.
        const key = selectedJson + this.targetItemIndex;
        return item(parseResult.value, key);
    }

    private presentSelectedItemNumber(): string {
        if (this.getNumberOfItems() === 0) {
            return "0";
        }
        return String(this.targetItemIndex + 1);
    }

    private presentTotalItems(): string {
        return String(this.getNumberOfItems());
    }
}

function nonblank(s: string): boolean {
    return s.trim() !== "";
}
