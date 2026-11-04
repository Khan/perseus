import {newDraft, reviseDraft} from "../domain/draft";
import {addWidget} from "../domain/items/add-widget";
import {buildItem} from "../domain/items/build";
import {editItem as applyItemPatch} from "../domain/items/edit";
import {parseItem} from "../domain/items/parse";

import {
    DraftNotFoundError,
    InvalidItemError,
    RevisionNotFoundError,
} from "./errors";

import type {Catalog} from "./catalog";
import type {Draft} from "../domain/draft";
import type {AddWidgetInput} from "../domain/items/add-widget";
import type {ItemInput} from "../domain/items/build";
import type {PatchOperation} from "../domain/items/edit";
import type {Issue} from "../domain/items/validate";
import type {DraftFeed, DraftListener} from "../ports/draft-feed";
import type {
    DraftRepository,
    RevisionSummary,
    SkippedDraft,
} from "../ports/draft-repository";
import type {ItemFileReader} from "../ports/item-file-reader";

export type DraftDependencies = {
    drafts: DraftRepository;
    feed: DraftFeed;
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

    function getRevision(itemId: string, revision: number): Draft {
        getDraft(itemId);
        const draft = drafts.getRevision(itemId, revision);
        if (draft == null) {
            throw new RevisionNotFoundError(
                itemId,
                revision,
                drafts.revisions(itemId).map((kept) => kept.revision),
            );
        }
        return draft;
    }

    /** Describes an edit, for the revision it makes. */
    function describeEdit(edit: DraftEdit): string {
        const operations = edit.patch?.length ?? 0;
        const parts = [
            operations > 0 &&
                `${operations} operation${operations === 1 ? "" : "s"}`,
            edit.notes != null && "new notes",
        ].filter((part): part is string => typeof part === "string");
        return `edit_item: ${parts.join(", ")}`;
    }

    const useCases = {
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
                change:
                    "path" in source
                        ? `Opened from ${source.path}`
                        : "Opened from an item",
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
                change: "Created",
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
                change: describeEdit(edit),
                now: deps.now(),
            });
            drafts.save(revised);
            return {ok: true, draft: revised, issues};
        },

        /**
         * Changes several drafts in one call, each as editItem does: each
         * edit is validated and saved, or not, on its own, so one bad patch
         * doesn't stop the others.
         */
        editItems(
            edits: ReadonlyArray<DraftEdit & {itemId: string}>,
        ): Array<{itemId: string} & DraftChangeResult> {
            return edits.map(({itemId, ...edit}) => {
                if (drafts.get(itemId) == null) {
                    return {
                        itemId,
                        ok: false,
                        issues: [
                            {
                                severity: "error",
                                code: "missing-draft",
                                path: "(root)",
                                message: new DraftNotFoundError(itemId).message,
                            },
                        ],
                    };
                }
                return {itemId, ...useCases.editItem(itemId, edit)};
            });
        },

        /**
         * Adds a widget to a draft's question or one of its hints. Nothing is
         * saved if the widget doesn't build or the item has errors.
         *
         * @throws DraftNotFoundError
         */
        addWidget(
            itemId: string,
            input: AddWidgetInput,
        ):
            | {ok: true; draft: Draft; widgetId: string; issues: Issue[]}
            | {ok: false; issues: Issue[]} {
            const draft = getDraft(itemId);
            const result = addWidget(draft.item, input, deps.catalog.widgets());
            if (!result.ok) {
                return result;
            }
            const revised = reviseDraft(draft, {
                item: result.item,
                change: `add_widget: ${result.widgetId}`,
                now: deps.now(),
            });
            drafts.save(revised);
            return {
                ok: true,
                draft: revised,
                widgetId: result.widgetId,
                issues: result.issues,
            };
        },

        /**
         * The draft, or the draft as it was at `revision`.
         *
         * @throws DraftNotFoundError
         * @throws RevisionNotFoundError
         */
        exportItem(
            itemId: string,
            revision?: number,
        ): {draft: Draft; location: string} {
            return {
                draft:
                    revision == null
                        ? getDraft(itemId)
                        : getRevision(itemId, revision),
                location: drafts.locationOf(itemId),
            };
        },

        /**
         * The draft's kept revisions, oldest first.
         *
         * @throws DraftNotFoundError
         */
        listRevisions(itemId: string): RevisionSummary[] {
            getDraft(itemId);
            return drafts.revisions(itemId);
        },

        /**
         * Saves the item of an earlier revision as a new revision, so the
         * revisions in between stay kept. The draft keeps its current notes.
         *
         * @throws DraftNotFoundError
         * @throws RevisionNotFoundError
         */
        revertItem(itemId: string, revision: number): Draft {
            const current = getDraft(itemId);
            const earlier = getRevision(itemId, revision);
            const reverted = reviseDraft(current, {
                item: earlier.item,
                change: `Reverted to revision ${revision}`,
                now: deps.now(),
            });
            drafts.save(reverted);
            return reverted;
        },

        listItems(): {drafts: Draft[]; skipped: SkippedDraft[]} {
            return {drafts: drafts.list(), skipped: drafts.skipped()};
        },

        /**
         * Calls `listener` with the draft now, then again after every change,
         * until the returned function is called.
         *
         * @throws DraftNotFoundError
         */
        watchItem(itemId: string, listener: DraftListener): () => void {
            const draft = getDraft(itemId);
            const unsubscribe = deps.feed.subscribe(itemId, listener);
            listener(draft);
            return unsubscribe;
        },
    };
    return useCases;
}

export type DraftUseCases = ReturnType<typeof createDraftUseCases>;
