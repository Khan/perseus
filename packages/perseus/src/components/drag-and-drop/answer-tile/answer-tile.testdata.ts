import {generateTestBlanks} from "../dnd-action-menu/dnd-action-menu.testdata";

import type {AnswerTileMenuConfig} from "./answer-tile";

/** Generates the menu data that a widget supplies for a tile in the choice bank. */
export function generateAnswerTileMenu(
    overrides: Partial<AnswerTileMenuConfig> = {},
): AnswerTileMenuConfig {
    return {
        moveTargets: generateTestBlanks(),
        onMove: () => {},
        ...overrides,
    };
}
