import type {
    NumericInputWidget,
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus";

type WidgetRenameMap = {
    [oldKey: string]: string;
};

// This utils in this file are used to modernize our Perseus JSON structure,
// so that we can convert deprecated widgets to their modern equivalents when
// content creators use the Editor Page to update content containing these widgets.
// Currently, we're only converting input-number to numeric-input,
// but we can add more conversions here in the future.

const inputNumberToNumericInput = (json: PerseusRenderer) => {
    // First we need to create a map of the old input-number keys to the new numeric-input keys
    // so that we can ensure we update the content and widgets accordingly
    const renameMap = getInputNumberRenameMap(json);

    // If there aren't any input-number widgets in the content, we can return the json as is
    if (!renameMap) {
        return json;
    }

    // Then we can use this to update the JSON
    const modernizedJson = convertInputNumberJson(json, renameMap);
    return modernizedJson;
};

// We need to be able to run this code recursively in order to convert nested input-number widgets
const convertInputNumberJson = (
    json: PerseusRenderer,
    renameMap: WidgetRenameMap,
): PerseusRenderer => {
    const updatedContent = convertInputNumberContent(json, renameMap);
    const updatedWidgets = convertInputNumberWidgetOptions(json, renameMap);
    const modernizedJson = {
        ...json,
        content: updatedContent,
        widgets: updatedWidgets,
    };

    return modernizedJson;
};

// Convert the input-number refs in the content string of a PerseusRenderer object
const convertInputNumberContent = (
    json: PerseusRenderer,
    renameMap: WidgetRenameMap,
): string => {
    let newContent = json.content;
    // Loop through the renameMap and replace all the old keys with the new keys
    for (const oldKey of Object.keys(renameMap)) {
        const newKey = renameMap[oldKey];
        if (newKey) {
            newContent = newContent.replace(oldKey, newKey);
        }
    }

    return newContent;
};

// Convert the input-number json in the widgets of a PerseusRenderer object
const convertInputNumberWidgetOptions = (
    json: PerseusRenderer,
    renameMap: WidgetRenameMap,
): PerseusWidgetsMap => {
    const widgets: PerseusWidgetsMap = {...json.widgets};
    // The question.widgets is a dictionary map of widgets, so we need to loop through in order to convert input-number to numeric-input
    // which can exist as both the key or as a value on widget.type.
    for (const key of Object.keys(widgets)) {
        // (First) Loop through the keys of the widgets dictionary
        if (widgets[key].options.widgets) {
            widgets[key].options = {
                ...convertInputNumberJson(widgets[key].options, renameMap),
            };
        }
        // (Second) Check if the widget is an input-number
        if (widgets[key].type === "input-number") {
            let provideAnswerForm = true;
            if (
                widgets[key].options.value !== "number" &&
                widgets[key].options.value !== "rational"
            ) {
                provideAnswerForm = false;
            }

            // We need to update the answers prop to match the numeric-input widget format
            const answers: any = [
                {
                    value: widgets[key].options.value,
                    simplify: widgets[key].options.simplify,
                    strict: widgets[key].options.inexact || true,
                    maxError: widgets[key].options.maxError || 0,
                    status: "correct", // Input-number only allows correct answers
                    message: "",
                },
            ];

            // Add the required answerForms if provided/applicable
            if (provideAnswerForm) {
                answers[0].answerForms = [...widgets[key].options.answerType];
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

// Extract all of the content strings existing within a PerseusRenderer object
const getAllContentStrings = (json: any): string[] => {
    const contentStrings: string[] = [];

    const extractContent = (obj: any) => {
        for (const key in obj) {
            if (key === "content" && typeof obj[key] === "string") {
                contentStrings.push(obj[key]);
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                extractContent(obj[key]);
            }
        }
    };

    extractContent(json);
    return contentStrings;
};

// Create a map of the old input-number keys to the new numeric-input keys
const getInputNumberRenameMap = (
    json: PerseusRenderer,
): WidgetRenameMap | null => {
    const numericRegex = /\[\[\u2603 (numeric-input ([0-9]+))\]\]/g;
    const inputNumberRegex = /\[\[\u2603 (input-number ([0-9]+))\]\]/g;

    // Get all the content strings within the json, which might be nested within widgets
    const allContentStrings = getAllContentStrings(json);

    // Loop through the content strings to get all the input-number widgets
    const renameMap: WidgetRenameMap = {};
    let inputNumberMatches: RegExpMatchArray[] = [];

    for (const contentString of allContentStrings) {
        inputNumberMatches = [
            ...inputNumberMatches,
            ...[...contentString.matchAll(inputNumberRegex)],
        ];
    }

    // If none are found, return
    if (!inputNumberMatches) {
        return null;
    }

    // We want to count any pre-existing numeric-input widgets
    // so that we can start the new ids at the next number
    let numericMatches: RegExpMatchArray[] = [];
    let currentNumericCount = 1;
    for (const contentString of allContentStrings) {
        numericMatches = [
            ...numericMatches,
            ...[...contentString.matchAll(numericRegex)],
        ];
    }
    if (numericMatches.length > 0) {
        for (const match of numericMatches) {
            const id = parseInt(match[2], 10);
            if (id > currentNumericCount) {
                currentNumericCount = id + 1; // We want to start at the next highest number
            }
        }
    }

    // Now that we have all the necessary information, we can create the renameMap
    for (const match of inputNumberMatches) {
        const oldKey = match[1];
        const newKey = `numeric-input ${currentNumericCount}`;
        renameMap[oldKey] = newKey;
        currentNumericCount++;
    }

    return renameMap;
};

// Modernize the json content of a PerseusRenderer object
// by converting deprecated widgets to their modern equivalents
export const convertDeprecatedWidgets = (
    json: PerseusRenderer,
): PerseusRenderer => {
    // If there's no json, we can return the json as is
    if (!json) {
        return json;
    }

    // Currently we're only converting input-number to numeric-input,
    // But we can add more conversions here in the future
    const modernJson = inputNumberToNumericInput(json);

    return modernJson;
};
