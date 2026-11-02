import {newDraft} from "../domain/draft";
import {parseItem} from "../domain/items/parse";

import {DraftNotFoundError, InvalidItemError} from "./errors";

import type {Draft} from "../domain/draft";
import type {DraftRepository, SkippedDraft} from "../ports/draft-repository";
import type {ItemFileReader} from "../ports/item-file-reader";

export type DraftDependencies = {
    drafts: DraftRepository;
    files: ItemFileReader;
    now: () => Date;
    newId: () => string;
};

/** A PerseusItem (an object or JSON string), or the path of a JSON file. */
export type ItemSource = {item: unknown} | {path: string};

/**
 * The use cases for starting, reading and listing drafts, written against the
 * ports only.
 */
export function createDraftUseCases(deps: DraftDependencies) {
    const {drafts} = deps;

    function getDraft(itemId: string): Draft {
        const draft = drafts.get(itemId);
        if (draft == null) {
            throw new DraftNotFoundError(itemId);
        }
        return draft;
    }

    return {
        /**
         * Starts a draft from an existing item, migrated to the latest
         * schema.
         *
         * @throws InvalidItemError if the item doesn't parse.
         */
        async openItem(source: ItemSource, notes?: string): Promise<Draft> {
            const input =
                "path" in source
                    ? await deps.files.read(source.path)
                    : source.item;
            const parsed = parseItem(input);
            if (!parsed.ok) {
                throw new InvalidItemError(parsed.error);
            }
            const draft = newDraft({
                itemId: deps.newId(),
                item: parsed.item,
                notes,
                now: deps.now(),
            });
            drafts.save(draft);
            return draft;
        },

        /** @throws DraftNotFoundError */
        exportItem(itemId: string): {draft: Draft; location: string} {
            return {
                draft: getDraft(itemId),
                location: drafts.locationOf(itemId),
            };
        },

        listItems(): {drafts: Draft[]; skipped: SkippedDraft[]} {
            return {drafts: drafts.list(), skipped: drafts.skipped()};
        },
    };
}

export type DraftUseCases = ReturnType<typeof createDraftUseCases>;
