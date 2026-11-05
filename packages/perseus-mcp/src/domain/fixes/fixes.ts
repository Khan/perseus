import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * Content changes code can make on its own, so an agent applying a
 * guideline across many items needn't read each one. Each fix reads an item
 * and says what it would change, as replacements of whole content strings;
 * applying them is the caller's (as a JSON Patch, so the result is
 * validated like any edit).
 */

/** One content string a fix changes, by its JSON Pointer in the item. */
export type ContentChange = {path: string; before: string; after: string};

/** What a fix makes of an item: its changes, or why it left it alone. */
export type FixResult =
    | {changes: ContentChange[]}
    | {changes: []; skipped: string};

/** Which content a fix looks at. */
export type FixScope = "question" | "hints" | "all";

/** The fixes there are, with what each does, for the tools to describe. */
export const FIXES = {
    "bold-first-line":
        "Make the question's first line bold (wrap it in **), as the " +
        "guidelines ask. Skips an item whose first line is already bold, " +
        "or isn't text (a widget, an image, a heading, a list, a table).",
    "replace-text":
        "Replace text in content: `find` with `replace`, every match, as " +
        "plain text or (with `regex`) a JavaScript regular expression whose " +
        "`replace` may use $1 and the like. Looks at the question, the " +
        "hints, or both (`scope`). Content only, not widget options.",
} as const;

export type FixName = keyof typeof FIXES;

/** The fixes' names, for a schema to list. */
export const FIX_NAMES = [
    "bold-first-line",
    "replace-text",
] as const satisfies ReadonlyArray<FixName>;

/** The content strings in scope, with their paths. */
function contents(
    item: PerseusItem,
    scope: FixScope,
): Array<{path: string; content: string}> {
    const found: Array<{path: string; content: string}> = [];
    if (scope !== "hints") {
        found.push({path: "/question/content", content: item.question.content});
    }
    if (scope !== "question") {
        item.hints.forEach((hint, index) => {
            found.push({
                path: `/hints/${index}/content`,
                content: hint.content,
            });
        });
    }
    return found;
}

// A first line that isn't prose: a widget or image alone, a heading, a list
// item, a table row, a block quote or a code fence.
const NOT_TEXT = /^(\[\[☃ [a-z0-9-]+ \d+\]\]|!\[|#|[-*+] |\d+[.)] |\||>|```)/;

function isBold(line: string): boolean {
    return /^(\*\*|__)[\s\S]*(\*\*|__)$/.test(line);
}

/** Wraps the question's first non-blank line in `**`. */
export function boldFirstLine(item: PerseusItem): FixResult {
    const content = item.question.content;
    const lines = content.split("\n");
    const index = lines.findIndex((line) => line.trim() !== "");
    if (index === -1) {
        return {changes: [], skipped: "the question has no text"};
    }
    const line = lines[index];
    const text = line.trim();
    if (isBold(text)) {
        return {changes: [], skipped: "its first line is already bold"};
    }
    if (NOT_TEXT.test(text)) {
        return {
            changes: [],
            skipped: `its first line isn't text: ${text.slice(0, 40)}`,
        };
    }
    const indent = line.slice(0, line.length - line.trimStart().length);
    // Bold inside the line would close the outer bold early.
    const inner = text.replace(/\*\*/g, "");
    lines[index] = `${indent}**${inner}**`;
    return {
        changes: [
            {
                path: "/question/content",
                before: content,
                after: lines.join("\n"),
            },
        ],
    };
}

/** Replaces `find` with `replace` in the content in scope. */
export function replaceText(
    item: PerseusItem,
    options: {find: string; replace: string; regex: boolean; scope: FixScope},
): FixResult {
    const pattern = options.regex
        ? new RegExp(options.find, "g")
        : new RegExp(options.find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    // A plain replacement is literal: `$` in it means a dollar sign.
    const replacement = options.regex
        ? options.replace
        : options.replace.replace(/\$/g, "$$$$");
    const changes = contents(item, options.scope).flatMap(({path, content}) => {
        const after = content.replace(pattern, replacement);
        return after === content ? [] : [{path, before: content, after}];
    });
    return changes.length > 0 ? {changes} : {changes: [], skipped: "no match"};
}

/** A short view of a change: the lines that differ, cut to `width`. */
export function describeChange(
    change: ContentChange,
    width = 160,
): {path: string; before: string[]; after: string[]} {
    const before = change.before.split("\n");
    const after = change.after.split("\n");
    const cut = (line: string) =>
        line.length > width ? `${line.slice(0, width)}…` : line;
    const changed = (a: string[], b: string[]) =>
        a.filter((line, i) => line !== b[i]).map(cut);
    return {
        path: change.path,
        before: changed(before, after),
        after: changed(after, before),
    };
}
