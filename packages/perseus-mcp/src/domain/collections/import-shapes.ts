/**
 * The shapes a file of items can come in, read into problem types. Nothing
 * here parses the items themselves: each `itemData` is still untrusted.
 *
 * - A problem-type export, the exercise editor's bulk JSON format: an array
 *   of `{problemType, contentId?, assessmentItems: [{contentId?, itemData}]}`,
 *   `itemData` a JSON string or an object.
 * - An exercise export: `{items: [{name?, item_data}]}`.
 * - A single item, or an array of them.
 * - A bare renderer (just the question: `{content, widgets, images}`).
 */

/** An item read from a file, with what the file said about it. */
export type ImportedItem = {
    itemData: unknown;
    /** The item's id where the file came from, for writing it back. */
    contentId?: string;
    /** A name the file gave the item. */
    label?: string;
};

/** A problem type read from a file. */
export type ImportedProblemType = {
    /** Null for items the file didn't group. */
    name: string | null;
    contentId?: string;
    items: ImportedItem[];
};

export type ImportShape =
    | "problem-type export"
    | "exercise export"
    | "items"
    | "bare renderer";

export type ReadImport =
    | {ok: true; shape: ImportShape; problemTypes: ImportedProblemType[]}
    | {ok: false; error: string};

function isObject(value: unknown): value is Record<string, unknown> {
    return value != null && typeof value === "object" && !Array.isArray(value);
}

function stringField(value: unknown): string | undefined {
    return typeof value === "string" && value.trim() !== ""
        ? value.trim()
        : undefined;
}

function isProblemType(
    value: unknown,
): value is Record<string, unknown> & {assessmentItems: unknown[]} {
    return isObject(value) && Array.isArray(value.assessmentItems);
}

function isExerciseExport(value: unknown): value is {items: unknown[]} {
    return (
        isObject(value) &&
        Array.isArray(value.items) &&
        value.items.some((item) => isObject(item) && "item_data" in item)
    );
}

/** Reads the parsed contents of an import file into problem types. */
export function readImport(data: unknown): ReadImport {
    if (Array.isArray(data) && data.length > 0 && data.every(isProblemType)) {
        return {
            ok: true,
            shape: "problem-type export",
            problemTypes: data.map((problemType) => ({
                name: stringField(problemType.problemType) ?? null,
                contentId: stringField(problemType.contentId),
                items: problemType.assessmentItems.map((item) => ({
                    itemData: isObject(item) ? item.itemData : undefined,
                    contentId: isObject(item)
                        ? stringField(item.contentId)
                        : undefined,
                })),
            })),
        };
    }
    if (isExerciseExport(data)) {
        return {
            ok: true,
            shape: "exercise export",
            problemTypes: [
                {
                    name: null,
                    items: data.items.map((item) => ({
                        itemData: isObject(item) ? item.item_data : undefined,
                        label: isObject(item)
                            ? stringField(item.name)
                            : undefined,
                    })),
                },
            ],
        };
    }
    if (Array.isArray(data) && data.length > 0) {
        return {
            ok: true,
            shape: "items",
            problemTypes: [
                {name: null, items: data.map((itemData) => ({itemData}))},
            ],
        };
    }
    if (isObject(data) && "question" in data) {
        return {
            ok: true,
            shape: "items",
            problemTypes: [{name: null, items: [{itemData: data}]}],
        };
    }
    if (isObject(data) && typeof data.content === "string") {
        return {
            ok: true,
            shape: "bare renderer",
            problemTypes: [
                {
                    name: null,
                    items: [
                        {
                            itemData: {
                                question: data,
                                answerArea: null,
                                hints: [],
                            },
                        },
                    ],
                },
            ],
        };
    }
    return {
        ok: false,
        error:
            "The file isn't in a shape import_items reads: a problem-type " +
            "export (an array of {problemType, assessmentItems}), an " +
            "exercise export ({items: [{item_data}]}), an item or array of " +
            "items, or a bare renderer ({content, widgets, images}).",
    };
}
