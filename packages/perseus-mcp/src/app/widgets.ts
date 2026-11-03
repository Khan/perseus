import {validateItem} from "../domain/items/validate";

import {DraftNotFoundError, UnknownWidgetTypeError} from "./errors";

import type {Catalog} from "./catalog";
import type {Issue} from "../domain/items/validate";
import type {WidgetSpec, WidgetSummary} from "../domain/items/widgets";
import type {DraftRepository} from "../ports/draft-repository";

export type WidgetDependencies = {
    catalog: Catalog;
    drafts: DraftRepository;
};

/** A draft, by `itemId`, or a PerseusItem (an object or JSON string). */
export type ItemToValidate = {itemId: string} | {item: unknown};

/**
 * The use cases for learning about widgets and checking items against what
 * Perseus accepts.
 */
export function createWidgetUseCases(deps: WidgetDependencies) {
    const {catalog} = deps;

    return {
        listWidgets(): WidgetSummary[] {
            const widgets = catalog.widgets();
            return widgets.types().map(widgets.summary);
        },

        /** @throws UnknownWidgetTypeError */
        getWidgetSpec(type: string): WidgetSpec {
            const widgets = catalog.widgets();
            if (!widgets.isKnownType(type)) {
                throw new UnknownWidgetTypeError(type, widgets.types());
            }
            return widgets.spec(type);
        },

        /** @throws DraftNotFoundError */
        validateItem(target: ItemToValidate): {
            valid: boolean;
            issues: Issue[];
        } {
            let input: unknown;
            if ("itemId" in target) {
                const draft = deps.drafts.get(target.itemId);
                if (draft == null) {
                    throw new DraftNotFoundError(target.itemId);
                }
                input = draft.item;
            } else {
                input = target.item;
            }
            const {valid, issues} = validateItem(input, catalog.widgets());
            return {valid, issues};
        },

        /** The full text of perseus-core's `data-schema.ts`. */
        dataSchema(): string {
            return catalog.schema().dataSchemaText;
        },
    };
}

export type WidgetUseCases = ReturnType<typeof createWidgetUseCases>;
