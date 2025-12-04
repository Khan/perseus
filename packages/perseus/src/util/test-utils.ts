import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import type {
    CategorizerWidget,
    ExpressionWidget,
    InteractiveGraphWidget,
    NumericInputWidget,
    PerseusRenderer,
    PerseusWidgetTypes,
    RadioWidget,
    PerseusScore,
    UserInputMap,
    PerseusItem,
} from "@khanacademy/perseus-core";

/**
 * Thin wrapper around scorePerseusItem for internal testing
 */
export function scorePerseusItemTesting(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
): PerseusScore {
    return scorePerseusItem(perseusRenderData, userInputMap, "en");
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed RadioWidget
 *
 * @returns {RadioWidget} skeleton RadioWidget for testing
 */
export function generateTestRadioWidget(): RadioWidget {
    return {
        type: "radio",
        options: {
            choices: [],
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed InteractiveGraphWidget
 *
 * @returns {InteractiveGraphWidget} skeleton InteractiveGraphWidget for testing
 */
export function generateTestInteractiveGraphWidget(): InteractiveGraphWidget {
    return {
        type: "interactive-graph",
        options: {
            step: [1, 1],
            gridStep: [1, 1],
            snapStep: [1, 1],
            markings: "graph",
            labels: ["x", "y"],
            lockedFigures: [],
            showProtractor: false,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            graph: {
                type: "angle",
            },
            correct: {
                type: "angle",
            },
            showAxisArrows: {
                xMin: true,
                xMax: true,
                yMin: true,
                yMax: true,
            },
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed InteractiveGraphWidget
 *
 * @returns {InteractiveGraphWidget} skeleton InteractiveGraphWidget for testing
 */
export function generateTestCategorizerWidget(): CategorizerWidget {
    return {
        type: "categorizer",
        options: {
            items: [],
            categories: [],
            randomizeItems: false,
            static: false,
            values: [],
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed NumericInputWidget
 *
 * @returns {NumericInputWidget} skeleton NumericInputWidget for testing
 */
export function generateTestNumericInputWidget(): NumericInputWidget {
    return {
        type: "numeric-input",
        options: {
            answers: [],
            labelText: "",
            size: "normal",
            coefficient: false,
            static: false,
        },
    };
}

/**
 * Creates an object with the minimum amount
 * of data to be a properly typed PerseusItem
 * containing answerful information
 *
 * @template T - The widget type extending keyof PerseusWidgetTypes
 * @param {T} widgetType - The type of widget to create, as a string, ex. "radio"
 * @param {PerseusWidgetTypes[T]["options"]} options - The options for the widget
 * @returns {PerseusItem} skeleton PerseusItem for testing
 */
export function getAnswerfulItem<T extends keyof PerseusWidgetTypes>(
    widgetType: T,
    options: PerseusWidgetTypes[T]["options"],
): PerseusItem {
    const widgetName = `${widgetType} 1`;
    const widget = {
        type: widgetType,
        options,
    };
    const widgets = {};
    widgets[widgetName] = widget;
    const question: PerseusRenderer = {
        content: `[[☃ ${widgetName}]]`,
        images: {},
        widgets,
    };
    return generateTestPerseusItem({question});
}

/**
 * Creates an object with the minimum amount
 * of data to be a properly typed PerseusItem
 * containing answerless information
 *
 * @template T - The widget type extending keyof PerseusWidgetTypes
 * @param {T} widgetType - The type of widget to create, as a string, ex. "radio"
 * @param {PerseusWidgetTypes[T]["options"]} options - The options for the widget
 * @returns {PerseusItem} skeleton PerseusItem for testing
 */
export function getAnswerlessItem<T extends keyof PerseusWidgetTypes>(
    widgetType: T,
    options: PerseusWidgetTypes[T]["options"],
): PerseusItem {
    return splitPerseusItem(getAnswerfulItem(widgetType, options));
}
