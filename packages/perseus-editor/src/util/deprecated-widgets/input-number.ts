// Methods to convert input-number widgets to numeric-input widgets

import type {
    NumericInputWidget,
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus";

type WidgetRenameMap = {
    [oldKey: string]: string;
};

export const inputNumberToNumericInput = (json: PerseusRenderer) => {
    // First we need to create a map of the old input-number keys to the new numeric-input keys
    // so that we can ensure we update the content and widgets accordingly
    const renameMap = getInputNumberRenameMap(json);

    // Then we can use this to update the JSON
    return convertInputNumberJson(json, renameMap);
};

// We need to be able to run this code recursively in order to convert nested input-number widgets
const convertInputNumberJson = (
    json: PerseusRenderer,
    renameMap: WidgetRenameMap,
): PerseusRenderer => {
    const updatedContent = convertDeprecatedWidgetsInContent(json, renameMap);
    const updatedWidgets = convertInputNumberWidgetOptions(json, renameMap);
    const modernizedJson = {
        ...json,
        content: updatedContent,
        widgets: updatedWidgets,
    };

    return modernizedJson;
};

// Convert the input-number json in the widgets of a PerseusRenderer object
export const convertInputNumberWidgetOptions = (
    json: PerseusRenderer,
    renameMap: WidgetRenameMap,
): PerseusWidgetsMap => {
    const widgets: PerseusWidgetsMap = {...json.widgets};
    // The question.widgets is a dictionary map of widgets, so we need to loop through in order to convert input-number to numeric-input
    // which can exist as both the key or as a value on widget.type.
    for (const key of Object.keys(widgets)) {
        // Loop through the keys of the widgets dictionary
        if (widgets[key].options.widgets) {
            widgets[key].options = {
                ...inputNumberToNumericInput(widgets[key].options),
            };
        }
        // Check if the widget is an input-number
        if (widgets[key].type === "input-number") {
            // If the answerType is not number or percent, we need to provide
            // the answer form for the numeric-input widget
            const provideAnswerForm =
                widgets[key].options.answerType !== "number" &&
                widgets[key].options.answerType !== "percent";
            // We need to determine the mathFormat for the numeric-input widget
            const mathFormat =
                widgets[key].options.answerType === "rational"
                    ? "proper" // input-number uses "rational" for proper fractions
                    : widgets[key].options.answerType; // Otherwise, we can use the answerType directly

            // We need to update the answers prop to match the numeric-input widget format
            const answers: any = [
                {
                    value: widgets[key].options.value,
                    simplify: widgets[key].options.simplify,
                    // Input Number doesn't have a strict prop, so we default to false
                    strict: false,
                    // We only want to set maxError if the inexact prop is true
                    maxError: widgets[key].options.inexact
                        ? widgets[key].options.maxError
                        : 0,
                    status: "correct", // Input-number only allows correct answers
                    message: "",
                },
            ];

            // Add the required answerForms if provided/applicable
            if (provideAnswerForm) {
                answers[0].answerForms = [mathFormat];
            }

            // Update the options prop to match the numeric-input widget format
            const upgradedWidgetOptions = {
                answers,
                size: widgets[key].options.size,
                coefficient: false, // input-number doesn't have a coefficient prop
                labelText: "", // input-number doesn't have a labelText prop
                static: false, // static is always false for numeric-input
                rightAlign: widgets[key].options.rightAlign || false,
            };
            const upgradedWidget: NumericInputWidget = {
                options: upgradedWidgetOptions,
                type: "numeric-input",
            };

            const newWidgetName = renameMap[key];
            // Create the new key entry
            widgets[newWidgetName] = upgradedWidget;

            // We need to delete the old widget key
            delete widgets[key];
        }
    }
    return widgets;
};

// Convert the deprecated widget refs in the content string
// of a PerseusRenderer object to their renamed equivalents
const convertDeprecatedWidgetsInContent = (
    json: PerseusRenderer,
    renameMap: WidgetRenameMap,
): string => {
    return Object.keys(renameMap).reduce((newContent, oldKey) => {
        const newKey = renameMap[oldKey];
        return newKey ? newContent.replace(oldKey, newKey) : newContent;
    }, json.content);
};

// Create a map of the old input-number keys to the new numeric-input keys
export const getInputNumberRenameMap = (
    json: PerseusRenderer,
): WidgetRenameMap => {
    const numericRegex = /(?<=\[\[\u2603 )(numeric-input \d+)(?=\]\])/g;
    const inputNumberRegex = /(?<=\[\[\u2603 )(input-number \d+)(?=\]\])/g;

    // Get all the content strings within the json, which might be nested within widgets
    const allContentStrings = json.content;

    // Loop through the content strings to get all the input-number widgets
    const renameMap: WidgetRenameMap = {};
    const inputNumberMatches: string[] = [
        ...(allContentStrings.match(inputNumberRegex) || []),
    ];

    // We want to count any pre-existing numeric-input widgets
    // so that we can start the new ids at the next number
    const numericMatches: string[] = [
        ...(allContentStrings.match(numericRegex) || []),
    ];
    let currentNumericCount = numericMatches.reduce((count, match) => {
        const id = parseInt(match.split(" ")[1], 10);
        return id >= count ? id + 1 : count; // We want to start at the next highest number
    }, 1);

    // Now that we have all the necessary information, we can create the renameMap
    for (const match of inputNumberMatches) {
        const oldKey = match;
        const newKey = `numeric-input ${currentNumericCount}`;
        renameMap[oldKey] = newKey;
        currentNumericCount++;
    }

    return renameMap;
};
