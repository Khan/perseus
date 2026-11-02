import {isFailure, parseAndMigratePerseusItem} from "@khanacademy/perseus-core";

import type {PerseusItem} from "@khanacademy/perseus-core";

export type ParseItemResult =
    | {ok: true; item: PerseusItem}
    | {ok: false; error: string};

/**
 * Parses a PerseusItem (an object or a JSON string) from any Perseus version
 * and migrates it to the latest schema. Every item this server stores or
 * returns has been through here.
 *
 * Migrations look widgets up in perseus-core's widget registry, so it must be
 * filled first (`CoreWidgetRegistry.registerCoreWidgets()`).
 */
export function parseItem(input: unknown): ParseItemResult {
    let result: ReturnType<typeof parseAndMigratePerseusItem>;
    try {
        result = parseAndMigratePerseusItem(input);
    } catch (e) {
        // parseAndMigratePerseusItem throws on malformed JSON strings.
        return {ok: false, error: `Not valid JSON: ${String(e)}`};
    }
    if (isFailure(result)) {
        return {ok: false, error: result.detail.message};
    }
    return {ok: true, item: result.value};
}
