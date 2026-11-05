import {createReadStream} from "node:fs";

/** A value read from a top-level JSON object by `readTopLevel`. */
export type TopLevelValue = {key: string; value: unknown};

type Recording = {
    parts: string[];
    start: number;
    kind: "key" | "container" | "string" | "scalar";
    /** For a container: the depth it closes back to. */
    depth: number;
};

const WHITESPACE = /\s/;

/**
 * Reads the values of chosen keys of a top-level JSON object from text in
 * chunks, without holding the whole text: each element of an array, one at
 * a time, and any other value whole. For files too large to parse at once
 * (V8's longest string is about 512 MB), whose arrays hold small elements.
 *
 * Only the elements of a top-level array that are objects or arrays are
 * read; the input must be valid JSON.
 */
export async function* readTopLevel(
    chunks: AsyncIterable<string>,
    keys: ReadonlySet<string>,
): AsyncGenerator<TopLevelValue> {
    let depth = 0;
    let inString = false;
    let escaped = false;
    // At depth 1: what comes next.
    let expect: "key" | "colon" | "value" | "comma" = "key";
    let key = "";
    // The key of the top-level array being read, if it's one of `keys`.
    let arrayKey: string | null = null;
    let rec: Recording | null = null;

    for await (const chunk of chunks) {
        const results: TopLevelValue[] = [];
        const finish = (end: number): string => {
            if (rec == null) {
                throw new Error("Not recording");
            }
            rec.parts.push(chunk.slice(rec.start, end));
            const text = rec.parts.join("");
            rec = null;
            return text;
        };
        for (let i = 0; i < chunk.length; i++) {
            const ch = chunk[i];
            if (inString) {
                if (escaped) {
                    escaped = false;
                } else if (ch === "\\") {
                    escaped = true;
                } else if (ch === '"') {
                    inString = false;
                    if (rec?.kind === "key") {
                        key = JSON.parse(finish(i + 1));
                    } else if (rec?.kind === "string") {
                        results.push({key, value: JSON.parse(finish(i + 1))});
                    }
                }
                continue;
            }
            if (
                rec?.kind === "scalar" &&
                (ch === "," || ch === "}" || WHITESPACE.test(ch))
            ) {
                results.push({key, value: JSON.parse(finish(i))});
            }
            if (WHITESPACE.test(ch)) {
                continue;
            }

            if (depth === 1 && expect !== "comma") {
                if (expect === "key" && ch === '"') {
                    rec = {parts: [], start: i, kind: "key", depth};
                    inString = true;
                    expect = "colon";
                    continue;
                }
                if (expect === "colon" && ch === ":") {
                    expect = "value";
                    continue;
                }
                if (expect === "value") {
                    expect = "comma";
                    if (ch === "[") {
                        arrayKey = keys.has(key) ? key : null;
                        depth++;
                        continue;
                    }
                    if (keys.has(key)) {
                        const kind =
                            ch === "{"
                                ? "container"
                                : ch === '"'
                                  ? "string"
                                  : "scalar";
                        rec = {parts: [], start: i, kind, depth: 1};
                    }
                    // Fall through, so a container or string opens.
                }
            }

            if (ch === '"') {
                inString = true;
            } else if (ch === "{" || ch === "[") {
                if (depth === 2 && arrayKey != null) {
                    rec = {parts: [], start: i, kind: "container", depth: 2};
                }
                depth++;
            } else if (ch === "}" || ch === "]") {
                depth--;
                if (rec?.kind === "container" && depth === rec.depth) {
                    const recordedKey = depth === 2 ? arrayKey : key;
                    results.push({
                        key: recordedKey ?? key,
                        value: JSON.parse(finish(i + 1)),
                    });
                }
                if (depth === 1) {
                    arrayKey = null;
                }
            } else if (ch === "," && depth === 1) {
                expect = "key";
            }
        }
        if (rec != null) {
            rec.parts.push(chunk.slice(rec.start));
            rec.start = 0;
        }
        yield* results;
    }
}

/** `readTopLevel` over a file, read as UTF-8 in 1 MB chunks. */
export function readTopLevelFromFile(
    path: string,
    keys: ReadonlySet<string>,
): AsyncGenerator<TopLevelValue> {
    return readTopLevel(
        createReadStream(path, {encoding: "utf8", highWaterMark: 1 << 20}),
        keys,
    );
}
