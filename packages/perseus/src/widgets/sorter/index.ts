import {shuffleSorter} from "@khanacademy/perseus-core";

import Sorter from "./sorter";

import type {WidgetExports} from "../../types";
import type {
    SorterPublicWidgetOptions,
    PerseusSorterUserInput,
} from "@khanacademy/perseus-core";

function getStartUserInput(
    options: SorterPublicWidgetOptions,
    problemNum: number,
): PerseusSorterUserInput {
    const shuffled = shuffleSorter(options, problemNum);

    return {
        options: shuffled,
        changed: false,
    };
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusSorterUserInput {
    return {
        changed: serializedState.changed,
        options: serializedState.options,
    };
}

export default {
    name: "sorter",
    displayName: "Sorter",
    widget: Sorter,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Sorter>;
