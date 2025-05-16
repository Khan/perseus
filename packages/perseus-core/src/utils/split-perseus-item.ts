import _ from "underscore";

import deepClone from "./deep-clone";
import splitPerseusRenderer from "./split-perseus-renderer";

import {parsePerseusItem} from "../parse-perseus-json/perseus-parsers/perseus-item"

import type {PerseusItem} from "../data-schema";


/**
 * Return a copy of a PerseusItem with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusItem (which includes the rubric - aka answer data)
 */
export default function splitPerseusItem(original: PerseusItem): PerseusItem {
    const item = deepClone(original);

    return {
        ...item,
        question: splitPerseusRenderer(item.question),
        // the final hint often exposes the answer
        // so we consider that part of the answer data
        hints: [],
    };
}

/**
 * Return a JSON copy of a PerseusItem with rubric data removed (ie answers)
 *
 * This will work on any valid JSON produced from the editors
 *
 * CP calls this on every item of content (in every locale) as part of publish
 * If it throws on an item, Perseus upgrades are blocked
 *
 * It should also have a consistent 1-to-1 mapping from input to output
 * as CP uses that consistency to validate publish
 *
 * @param originalJSON - the original, full PerseusItem as JSON (which includes the rubric - aka answer data)
 */
export function splitPerseusItemExternal(originalJSON: string): string {
    return JSON.stringify(splitPerseusItem(parsePerseusItem(originalJSON)));
}
