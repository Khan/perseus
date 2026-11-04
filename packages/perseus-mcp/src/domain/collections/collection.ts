/**
 * A set of drafts grouped by problem type, as an exercise groups its items:
 * what import_items makes from a file and export_collection writes back.
 * It holds the drafts' ids, not their items, so editing a draft changes what
 * the collection exports.
 */
export type Collection = {
    collectionId: string;
    name: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    problemTypes: CollectionProblemType[];
};

export type CollectionProblemType = {
    /** Null for items no problem type was given for. */
    name: string | null;
    /** The problem type's id where it came from, for writing it back. */
    contentId?: string;
    items: CollectionItem[];
};

export type CollectionItem = {
    itemId: string;
    /** The item's id where it came from, for writing it back. */
    contentId?: string;
};

/** Every draft in the collection, in order. */
export function itemIdsOf(collection: Collection): string[] {
    return collection.problemTypes.flatMap((problemType) =>
        problemType.items.map((item) => item.itemId),
    );
}

/**
 * The collection with `itemIds` moved to the end of the problem type named
 * `problemType` (null for no problem type), which is added if it's new.
 * Items not in the collection are added. A problem type left empty is
 * removed.
 */
export function placeItems(
    collection: Collection,
    itemIds: ReadonlyArray<string>,
    problemType: string | null,
    now: Date,
): Collection {
    const moving = new Set(itemIds);
    const existing = new Map(
        collection.problemTypes.flatMap((type) =>
            type.items.map((item) => [item.itemId, item] as const),
        ),
    );
    const placed = itemIds.map((itemId) => existing.get(itemId) ?? {itemId});
    let problemTypes = collection.problemTypes.map((type) => ({
        ...type,
        items: type.items.filter((item) => !moving.has(item.itemId)),
    }));
    const target = problemTypes.findIndex((type) => type.name === problemType);
    if (target === -1) {
        problemTypes.push({name: problemType, items: placed});
    } else {
        problemTypes[target] = {
            ...problemTypes[target],
            items: [...problemTypes[target].items, ...placed],
        };
    }
    problemTypes = problemTypes.filter((type) => type.items.length > 0);
    return {...collection, problemTypes, updatedAt: now.toISOString()};
}
