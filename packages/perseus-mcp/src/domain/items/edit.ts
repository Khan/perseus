// fast-json-patch is CommonJS and adds its exports with Object.assign, so
// Node can't see most of them (applyPatch included) as named ESM exports.
// The default export is the whole module.
import jsonpatch from "fast-json-patch";

import {validateItem} from "./validate";

import type {Issue} from "./validate";
import type {WidgetCatalog} from "./widgets";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Operation} from "fast-json-patch";

/** One RFC 6902 JSON Patch operation. */
export type PatchOperation = {
    op: "add" | "remove" | "replace" | "move" | "copy" | "test";
    path: string;
    value?: unknown;
    from?: string;
};

export type EditResult =
    | {ok: true; item: PerseusItem; issues: Issue[]}
    | {ok: false; issues: Issue[]};

/**
 * Applies a JSON Patch to an item, then validates the result. The edit
 * succeeds only if every operation applies and the patched item has no
 * errors, so a draft saved from it always parses. Warnings don't block it.
 * `item` itself is never changed.
 */
export function editItem(
    item: PerseusItem,
    patch: ReadonlyArray<PatchOperation>,
    widgets: WidgetCatalog,
): EditResult {
    let patched: unknown;
    try {
        // `true` validates each operation's shape before applying it, which
        // covers what the type above can't (e.g. `move` without `from`).
        patched = jsonpatch.applyPatch(
            item,
            // The cast is safe: applyPatch checks each operation at runtime.
            // eslint-disable-next-line no-restricted-syntax
            patch as Operation[],
            true,
            false,
        ).newDocument;
    } catch (e) {
        if (!(e instanceof jsonpatch.JsonPatchError)) {
            throw e;
        }
        const op = patch[e.index ?? 0];
        // The library's message goes on to print the whole document; its
        // first line is the actual explanation.
        const reason = e.message.split("\n")[0];
        return {
            ok: false,
            issues: [
                {
                    severity: "error",
                    code: `patch:${e.name}`,
                    path: op?.path ?? "(patch)",
                    message:
                        `Operation ${e.index ?? 0} (${op?.op} ${op?.path}) ` +
                        `failed: ${reason}.`,
                },
            ],
        };
    }

    const {valid, issues, item: migrated} = validateItem(patched, widgets);
    if (!valid || migrated == null) {
        return {ok: false, issues};
    }
    return {ok: true, item: migrated, issues};
}
