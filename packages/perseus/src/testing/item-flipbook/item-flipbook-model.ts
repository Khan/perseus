import {isFailure} from "@khanacademy/perseus-core";

import {clamp} from "../../widgets/interactive-graphs/math";

import {item, noItem, parseError} from "./item-flipbook-view-model";
import {safeParsePerseusItem} from "./safe-parse-perseus-item";

import type {PerseusItemSelection, ViewModel} from "./item-flipbook-view-model";

export function createItemFlipbookModel(observer: () => void) {
    return new ItemFlipbookModel(observer);
}

export class ItemFlipbookModel {
    private textareaValue = "";
    private targetItemIndex = 0;

    constructor(private observer: () => void) {}

    present(): ViewModel {
        return {
            textareaValue: this.textareaValue,
            setTextareaValue: this.setTextareaValue,
            selectedItemNumber: this.getSelectedItemNumber(),
            itemSelection: this.getSelectedItem(),
            nextItem: this.nextItem,
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

    private clampItemIndex(newIndex: number): number {
        return clamp(newIndex, 0, this.getMaxItemIndex());
    }

    private getMaxItemIndex() {
        return this.getNumberOfItems() - 1;
    }

    private getNumberOfItems(): number {
        return this.getItemJsonDocuments().length;
    }

    private getItemJsonDocuments(): string[] {
        return this.textareaValue.split("\n").filter(nonblank);
    }

    private getSelectedItem(): PerseusItemSelection {
        const selectedJson = this.getItemJsonDocuments()[this.targetItemIndex];

        if (!selectedJson) {
            return noItem();
        }

        const parseResult = safeParsePerseusItem(selectedJson);
        if (isFailure(parseResult)) {
            return parseError(parseResult.detail.message);
        }

        return item(parseResult.value);
    }

    private getSelectedItemNumber(): string {
        return String(this.targetItemIndex + 1);
    }
}

function nonblank(s: string): boolean {
    return s.trim() !== "";
}
