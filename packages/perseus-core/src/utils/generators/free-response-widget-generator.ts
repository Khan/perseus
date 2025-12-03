import freeResponseLogic from "../../widgets/free-response";

import type {
    PerseusFreeResponseWidgetOptions,
    FreeResponseWidget,
} from "../../data-schema";

export function generateFreeResponseOptions(
    options?: Partial<PerseusFreeResponseWidgetOptions>,
): PerseusFreeResponseWidgetOptions {
<<<<<<< HEAD
=======
    const defaultFreeResponseOptions: PerseusFreeResponseWidgetOptions = {
        allowUnlimitedCharacters: false,
        characterLimit: 500,
        placeholder: "test-placeholder",
        question: "test-question",
        scoringCriteria: [],
    };

>>>>>>> 9620db9cab ([free-response-generator] update testdata to use generator)
    return {
        ...freeResponseLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateFreeResponseWidget(
    freeResponseWidgetProperties?: Partial<Omit<FreeResponseWidget, "type">>,
): FreeResponseWidget {
    return {
        type: "free-response",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateFreeResponseOptions(), // default options
        ...freeResponseWidgetProperties,
    };
}
