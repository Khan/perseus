import {generateTestBlanks} from "../dnd-action-menu/dnd-action-menu.testdata";

import type {AnswerTileProps} from "./answer-tile";

/** Generates a complete, valid set of props for a tile in the choice bank. */
export function generateAnswerTileProps(
    overrides: Partial<AnswerTileProps> = {},
): AnswerTileProps {
    return {
        tileId: "tile-1",
        content: "Bongo",
        label: "Bongo",
        moveTargets: generateTestBlanks(),
        onMove: () => {},
        ...overrides,
    };
}
