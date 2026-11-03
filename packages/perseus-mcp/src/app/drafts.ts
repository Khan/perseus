import {newDraft, reviseDraft} from "../domain/draft";
import {buildItem} from "../domain/items/build";
import {editItem as applyItemPatch} from "../domain/items/edit";
import {parseItem} from "../domain/items/parse";

import {DraftNotFoundError, InvalidItemError} from "./errors";

import type {Catalog} from "./catalog";
import type {Draft} from "../domain/draft";
import type {ItemInput} from "../domain/items/build";
import type {PatchOperation} from "../domain/items/edit";
import type {Issue} from "../domain/items/validate";
import type {DraftRepository, SkippedDraft} from "../ports/draft-repository";
import type {ItemFileReader} from "../ports/item-file-reader";

export type DraftDependencies = {
    drafts: DraftRepository;
    files: ItemFileReader;
    catalog: Catalog;
    now: () => Date;
    newId: () => string;
};

/** A PerseusItem (an object or JSON string), or the path of a JSON file. */
export type ItemSource = {item: unknown} | {path: string};

/** A change to a draft: a JSON Patch to its item, new notes, or both. */
export type DraftEdit = {patch?: ReadonlyArray<PatchOperation>; notes?: string};

/** A new or changed draft and its warnings, or why nothing was saved. */
export type DraftChangeResult =
    | {ok: true; draft: Draft; issues: Issue[]}
    | {ok: false; issues: Issue[]};

/**
 * The use cases for starting, changing, reading and listing drafts, written
 * against the ports only.
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

        /**
         * Starts a draft from new content and widgets. Nothing is saved if a
         * widget doesn't build or the item has errors.
         */
        createItem(input: ItemInput, notes?: string): DraftChangeResult {
            const result = buildItem(input, deps.catalog.widgets());
            if (!result.ok) {
                return result;
            }
            const draft = newDraft({
                itemId: deps.newId(),
                item: result.item,
                notes,
                now: deps.now(),
            });
            drafts.save(draft);
            return {ok: true, draft, issues: result.issues};
        },

        /**
         * Changes a draft. A patch is applied to the item and the result
         * validated; if an operation fails or the item has errors, nothing
         * is saved (not even new notes), so a stored draft always parses.
         *
         * @throws DraftNotFoundError
         */
        editItem(itemId: string, edit: DraftEdit): DraftChangeResult {
            const draft = getDraft(itemId);
            let item = draft.item;
            let issues: Issue[] = [];
            if (edit.patch != null && edit.patch.length > 0) {
                const result = applyItemPatch(
                    draft.item,
                    edit.patch,
                    deps.catalog.widgets(),
                );
                if (!result.ok) {
                    return result;
                }
                ({item, issues} = result);
            }
            const revised = reviseDraft(draft, {
                item,
                notes: edit.notes,
                now: deps.now(),
            });
            drafts.save(revised);
            return {ok: true, draft: revised, issues};
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
