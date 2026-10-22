import {generateBlankWidget} from "@khanacademy/perseus-core";

import type {FillInTheBlankProps} from "./fill-in-the-blank";

/** Generates complete, valid props for a one-blank exercise.
 * This can go away after FITB becomes its own widget with its
 * own set of generator functions.
*/
export function generateFillInTheBlankProps(
    overrides: Partial<FillInTheBlankProps> = {},
): FillInTheBlankProps {
    return {
        content: "The [[☃ blank 1]] is a drum.",
        widgets: {"blank 1": generateBlankWidget()},
        tiles: [{id: "bongo", content: "bongo", label: "bongo"}],
        tileUsage: "single",
        placements: {},
        onPlacementsChange: () => {},
        ...overrides,
    };
}
