// Parts of an item (or any JSON value) by JSON Pointer, as tools return
// them: shortened, so a tool returning many stays small.
// fast-json-patch is CommonJS, so its default export is the module.
import jsonpatch from "fast-json-patch";

/** Longest a part's JSON is before it's cut. */
const MAX_JSON = 3000;

/**
 * A part as a tool returns it: as it is when its JSON is short, else that
 * JSON cut, marked so.
 */
export function shortenPart(value: unknown): unknown {
    const json = JSON.stringify(value);
    if (json == null || json.length <= MAX_JSON) {
        return value;
    }
    return {cut: true, json: `${json.slice(0, MAX_JSON)}…`};
}

/**
 * The parts of a value at JSON Pointers ("/question/widgets", "/hints/0"),
 * each shortened; null where there's nothing.
 */
export function partsAt(
    value: unknown,
    pointers: ReadonlyArray<string>,
): Record<string, unknown> {
    const parts: Record<string, unknown> = {};
    for (const pointer of pointers) {
        let part: unknown;
        try {
            part = jsonpatch.getValueByPointer(value, pointer);
        } catch {
            // A pointer that doesn't resolve reads as nothing.
        }
        parts[pointer] = part === undefined ? null : shortenPart(part);
    }
    return parts;
}
