import {itemIdsOf, placeItems} from "../domain/collections/collection";
import {readImport} from "../domain/collections/import-shapes";
import {newDraft} from "../domain/draft";
import {parseItem} from "../domain/items/parse";
import {validateItem} from "../domain/items/validate";

import {
    CollectionNotFoundError,
    DraftNotFoundError,
    ExportExistsError,
    InvalidImportError,
} from "./errors";

import type {Catalog} from "./catalog";
import type {Collection} from "../domain/collections/collection";
import type {ImportShape} from "../domain/collections/import-shapes";
import type {Draft} from "../domain/draft";
import type {Issue} from "../domain/items/validate";
import type {CollectionRepository} from "../ports/collection-repository";
import type {DraftRepository} from "../ports/draft-repository";
import type {ExportFileWriter} from "../ports/export-file-writer";
import type {ItemFileReader} from "../ports/item-file-reader";

export type CollectionDependencies = {
    collections: CollectionRepository;
    drafts: DraftRepository;
    files: ItemFileReader;
    exports: ExportFileWriter;
    catalog: Catalog;
    /** Where export_collection writes when it isn't given a path. */
    defaultExportPath: (collection: Collection) => string;
    now: () => Date;
    newId: () => string;
};

/** An item the file held that couldn't be imported, and why. */
export type SkippedItem = {
    problemType: string | null;
    /** Its position in its problem type, from 1. */
    position: number;
    reason: string;
};

/** One problem type of a collection, with each draft's state. */
export type CollectionTree = {
    collectionId: string;
    name: string;
    notes?: string;
    problemTypes: Array<{
        name: string | null;
        contentId?: string;
        items: Array<{
            itemId: string;
            contentId?: string;
            revision?: number;
            /** The start of the question, to tell items apart. */
            summary?: string;
            /** Set when the draft is gone. */
            missing?: true;
        }>;
    }>;
};

/** The format the exercise editor's bulk JSON import reads. */
type BulkProblemType = {
    problemType: string;
    contentId?: string;
    assessmentItems: Array<{contentId?: string; itemData: string}>;
};

/**
 * The use cases for groups of drafts: importing a file of items as a
 * collection, organizing it, checking it, and exporting it in the exercise
 * editor's bulk JSON format.
 */
export function createCollectionUseCases(deps: CollectionDependencies) {
    const {collections, drafts} = deps;

    function getCollection(collectionId: string): Collection {
        const collection = collections.get(collectionId);
        if (collection == null) {
            throw new CollectionNotFoundError(collectionId);
        }
        return collection;
    }

    function getDraft(itemId: string): Draft {
        const draft = drafts.get(itemId);
        if (draft == null) {
            throw new DraftNotFoundError(itemId);
        }
        return draft;
    }

    return {
        /**
         * Reads a file of items into a new collection: a draft per item
         * that parses (migrated to the latest schema), grouped as the file
         * groups them. Items that don't parse are skipped and reported.
         *
         * @throws InvalidImportError if the file isn't JSON or isn't in a
         * shape import reads.
         */
        async importItems(input: {
            path: string;
            name?: string;
            notes?: string;
        }): Promise<{
            collection: Collection;
            shape: ImportShape;
            imported: number;
            skipped: SkippedItem[];
        }> {
            let data: unknown;
            try {
                data = JSON.parse(await deps.files.read(input.path));
            } catch (e) {
                throw new InvalidImportError(
                    `Couldn't read ${input.path} as JSON: ${String(e)}`,
                );
            }
            const read = readImport(data);
            if (!read.ok) {
                throw new InvalidImportError(read.error);
            }

            const now = deps.now();
            const skipped: SkippedItem[] = [];
            const problemTypes = read.problemTypes.map((problemType) => ({
                name: problemType.name,
                contentId: problemType.contentId,
                items: problemType.items.flatMap((item, index) => {
                    // The bulk format may hold itemData as a JSON string;
                    // parseItem reads both.
                    const parsed = parseItem(item.itemData);
                    if (!parsed.ok) {
                        skipped.push({
                            problemType: problemType.name,
                            position: index + 1,
                            reason: parsed.error,
                        });
                        return [];
                    }
                    const draft = newDraft({
                        itemId: deps.newId(),
                        item: parsed.item,
                        notes: item.label,
                        change: `Imported from ${input.path}`,
                        now,
                    });
                    drafts.save(draft);
                    return [{itemId: draft.itemId, contentId: item.contentId}];
                }),
            }));

            const collection: Collection = {
                collectionId: deps.newId(),
                name: input.name ?? input.path,
                notes: input.notes,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
                problemTypes: problemTypes.filter(
                    (problemType) => problemType.items.length > 0,
                ),
            };
            collections.save(collection);
            return {
                collection,
                shape: read.shape,
                imported: itemIdsOf(collection).length,
                skipped,
            };
        },

        /** @throws CollectionNotFoundError */
        getCollection(collectionId: string): CollectionTree {
            const collection = getCollection(collectionId);
            return {
                collectionId,
                name: collection.name,
                notes: collection.notes,
                problemTypes: collection.problemTypes.map((problemType) => ({
                    name: problemType.name,
                    contentId: problemType.contentId,
                    items: problemType.items.map((item) => {
                        const draft = drafts.get(item.itemId);
                        return draft == null
                            ? {...item, missing: true as const}
                            : {
                                  ...item,
                                  revision: draft.revision,
                                  summary: draft.item.question.content.slice(
                                      0,
                                      80,
                                  ),
                              };
                    }),
                })),
            };
        },

        listCollections(): Array<{
            collectionId: string;
            name: string;
            notes?: string;
            updatedAt: string;
            items: number;
        }> {
            return collections.list().map((collection) => ({
                collectionId: collection.collectionId,
                name: collection.name,
                notes: collection.notes,
                updatedAt: collection.updatedAt,
                items: itemIdsOf(collection).length,
            }));
        },

        /**
         * Puts drafts at the end of a problem type (null for none), adding
         * the problem type if it's new; drafts not yet in the collection are
         * added. A problem type left empty is removed.
         *
         * @throws CollectionNotFoundError
         * @throws DraftNotFoundError
         */
        placeItems(
            collectionId: string,
            itemIds: ReadonlyArray<string>,
            problemType: string | null,
        ): Collection {
            const collection = getCollection(collectionId);
            itemIds.forEach(getDraft);
            const placed = placeItems(
                collection,
                itemIds,
                problemType,
                deps.now(),
            );
            collections.save(placed);
            return placed;
        },

        /**
         * Validates every draft in the collection, as validate_item does.
         *
         * @throws CollectionNotFoundError
         */
        validateCollection(collectionId: string): Array<{
            itemId: string;
            valid: boolean;
            issues: Issue[];
        }> {
            return itemIdsOf(getCollection(collectionId)).map((itemId) => {
                const draft = drafts.get(itemId);
                if (draft == null) {
                    return {
                        itemId,
                        valid: false,
                        issues: [
                            {
                                severity: "error",
                                code: "missing-draft",
                                path: "(root)",
                                message: `The draft "${itemId}" is gone.`,
                            },
                        ],
                    };
                }
                const {valid, issues} = validateItem(
                    draft.item,
                    deps.catalog.widgets(),
                );
                return {itemId, valid, issues};
            });
        },

        /**
         * Writes the collection in the exercise editor's bulk JSON format:
         * its problem types and their items, each item's data as a JSON
         * string of its latest revision, with the contentIds it was
         * imported with. Drafts that are gone are left out and reported.
         *
         * @throws CollectionNotFoundError
         * @throws ExportExistsError if the file exists and `overwrite` isn't
         * set.
         */
        exportCollection(input: {
            collectionId: string;
            path?: string;
            overwrite?: boolean;
        }): {
            path: string;
            problemTypes: number;
            items: number;
            missing: string[];
        } {
            const collection = getCollection(input.collectionId);
            const target = input.path ?? deps.defaultExportPath(collection);
            if (input.overwrite !== true && deps.exports.exists(target)) {
                throw new ExportExistsError(target);
            }
            const missing: string[] = [];
            const payload: BulkProblemType[] = collection.problemTypes.map(
                (problemType) => ({
                    // The bulk format needs a name; items with no problem
                    // type go under an empty one, which its import routes
                    // to Unassigned.
                    problemType: problemType.name ?? "",
                    ...(problemType.contentId != null
                        ? {contentId: problemType.contentId}
                        : {}),
                    assessmentItems: problemType.items.flatMap((item) => {
                        const draft = drafts.get(item.itemId);
                        if (draft == null) {
                            missing.push(item.itemId);
                            return [];
                        }
                        return [
                            {
                                ...(item.contentId != null
                                    ? {contentId: item.contentId}
                                    : {}),
                                itemData: JSON.stringify(draft.item),
                            },
                        ];
                    }),
                }),
            );
            const written = deps.exports.write(
                target,
                JSON.stringify(payload, null, 2),
            );
            return {
                path: written,
                problemTypes: payload.length,
                items: payload.reduce(
                    (count, problemType) =>
                        count + problemType.assessmentItems.length,
                    0,
                ),
                missing,
            };
        },
    };
}

export type CollectionUseCases = ReturnType<typeof createCollectionUseCases>;
