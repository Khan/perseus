import fillInTheBlankWidgetLogic from "../../widgets/fill-in-the-blank";

import type {
    FillInTheBlankWidget,
    PerseusAnswerTile,
    PerseusFillInTheBlankWidgetOptions,
} from "../../data-schema";

export function generateAnswerTile(
    tile?: Partial<PerseusAnswerTile>,
): PerseusAnswerTile {
    const defaultAnswerTile: PerseusAnswerTile = {
        id: "answer-tile-1",
        content: "answer",
        label: "answer",
    };

    return {
        ...defaultAnswerTile,
        ...tile,
    };
}

export function generateFillInTheBlankOptions(
    options?: Partial<PerseusFillInTheBlankWidgetOptions>,
): PerseusFillInTheBlankWidgetOptions {
    return {
        ...fillInTheBlankWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateFillInTheBlankWidget(
    fillInTheBlankWidgetProperties?: Partial<
        Omit<FillInTheBlankWidget, "type">
    >,
): FillInTheBlankWidget {
    return {
        type: "fill-in-the-blank",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        ...fillInTheBlankWidgetProperties,
        options: generateFillInTheBlankOptions(
            fillInTheBlankWidgetProperties?.options,
        ),
    };
}
