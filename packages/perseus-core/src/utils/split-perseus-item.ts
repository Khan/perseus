import _ from "underscore";

import splitPerseusRenderer from "./split-perseus-renderer";

import type {PerseusItem} from "../data-schema";

/**
 * Return a copy of a PerseusItem with rubric data removed (ie answers)
 *
 * @param original - the original, full PerseusItem (which includes the rubric - aka answer data)
 */
export default function splitPerseusItem(original: PerseusItem): PerseusItem {
    const item = _.clone(original);

    return {
        ...item,
        question: splitPerseusRenderer(item.question),
        // the final hint often exposes the answer
        // so we consider that part of the answer data
        hints: [],
    };
}
