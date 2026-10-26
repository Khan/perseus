import {generateBlankWidget} from "@khanacademy/perseus-core";

import type {FillInTheBlankProps} from "./fill-in-the-blank";

/** Generates complete, valid props for a two-blank sentence exercise. */
export function generateFillInTheBlankProps(
    overrides: Partial<FillInTheBlankProps> = {},
): FillInTheBlankProps {
    return {
        content:
            "The [[☃ blank 1]] drum is a tall drum. " +
            "You play it with your [[☃ blank 2]].",
        widgets: {
            "blank 1": generateBlankWidget(),
            "blank 2": generateBlankWidget(),
        },
        tiles: [
            {id: "djembe", content: "djembe", label: "djembe"},
            {id: "bongo", content: "bongo", label: "bongo"},
            {id: "hands", content: "hands", label: "hands"},
            {id: "sticks", content: "sticks", label: "sticks"},
        ],
        tileUsage: "single",
        placements: {},
        onPlacementsChange: () => {},
        ...overrides,
    };
}
