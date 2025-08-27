import {keys} from "@khanacademy/wonder-stuff-core";

import {
    getWidgetTypeByWidgetId,
    getWidgetsMapFromItemData,
} from "../widget-type-utils";
import * as Widgets from "../widgets";

import type {
    PerseusItem,
    PerseusRadioWidgetOptions,
    PerseusWidgetsMap,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

/**
 * This function extracts the answers from the widgets.
 *
 * For each widget type, we first check to make sure the path to the answer exists,
 * then we extract the answer and add it to the list of answers.
 *
 * A list is returned because some widgets, like multi-select radio widgets and groups
 * can have multiple answers.
 *
 * @param {PerseusRenderer["widgets"]} widgets
 * @returns a list of strings that are the answers to the widgets
 */
function getAnswersFromWidgets(
    widgets: PerseusRenderer["widgets"],
): ReadonlyArray<string> {
    const answers: Array<string> = [];

    keys(widgets).forEach((widgetID) => {
        const widget = widgets[widgetID];

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!widget.options) {
            return;
        }

        switch (widget.type) {
            case "radio":
                const radio = widget;
                const options = radio.options;
                // Answer is the content of the correct choice
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (options?.choices?.length) {
                    for (const choice of options.choices) {
                        if (choice?.correct) {
                            answers.push(choice.content);
                        }
                    }
                }
                break;
            case "categorizer":
                // Answer is a list of items mapped to their category
                // e.g. ['item 1: category 1', 'item 2: category 2']
                const categorizer = widget;
                if (
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    categorizer.options?.categories &&
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    categorizer.options?.items &&
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    categorizer.options?.values
                ) {
                    const categories = categorizer.options?.categories;
                    const items = categorizer.options?.items;
                    const values = categorizer.options?.values;
                    answers.push(
                        ...values.map(
                            (value, index) =>
                                `${items[index]}: ${categories[value]}`,
                        ),
                    );
                }
                break;
            case "dropdown":
                // Answer is the content of correct dropdown option
                const dropdown = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (dropdown.options?.choices) {
                    for (const choice of dropdown.options.choices) {
                        if (choice.correct) {
                            answers.push(choice.content);
                        }
                    }
                }
                break;
            case "numeric-input":
                // Answer is the numeric value cast to a string
                const numericInput = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (numericInput.options?.answers) {
                    for (const ans of numericInput.options.answers) {
                        if (ans.status === "correct" && ans.value != null) {
                            answers.push(ans.value.toString());
                        }
                    }
                }
                break;
            case "input-number":
                // Answer is the correct value
                const inputNumber = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (inputNumber.options?.value) {
                    answers.push(inputNumber.options.value.toString());
                }
                break;
            case "expression":
                // Answer is a list of potential correct expressions,
                // since there can be multiple correct forms of the expression
                const expression = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (expression.options?.answerForms) {
                    answers.push(
                        ...expression.options.answerForms.map(
                            (answer) => answer.value,
                        ),
                    );
                }
                break;
            case "group":
            case "graded-group":
                // Groups can contain multiple widgets, so we recursively
                // call this function to get the nested answers from the
                // group's widgets
                const gradedGroup = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (gradedGroup.options?.widgets) {
                    answers.push(
                        ...getAnswersFromWidgets(gradedGroup.options.widgets),
                    );
                }
                break;
            case "plotter":
                // Answer is a map of the correct value for each category
                // e.g. '{Soccer: 35, Basketball: 20, Golf: 45, Volleyball: 15,
                // Tennis: 30}'
                const plotter = widget;
                if (
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    plotter.options?.categories &&
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    plotter.options?.correct &&
                    plotter.options.categories.length ===
                        plotter.options.correct.length
                ) {
                    const {categories, correct} = plotter.options;
                    answers.push(
                        `{${categories
                            .map(
                                (category, index) =>
                                    `${category}: ${correct[index]}`,
                            )
                            .join(", ")}}`,
                    );
                }
                break;
            case "interactive-graph":
            case "grapher":
                // Answer is a list of points that should be on the graph
                // E.g. 'There should be point(s) on [(-1, 1), (1, 1)]'
                const grapher = widget;
                // @ts-expect-error - TS2339 - Property 'coords' does not exist on type '{ type: "absolute_value"; coords: [Coord, Coord]; } | { type: "exponential"; asymptote: [Coord, Coord]; coords: [Coord, Coord]; } | { type: "linear"; coords: [...]; } | ... 4 more ... | PerseusGraphType'.
                if (grapher.options?.correct?.coords) {
                    answers.push(
                        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type '{ type: "absolute_value"; coords: [Coord, Coord]; } | { type: "exponential"; asymptote: [Coord, Coord]; coords: [Coord, Coord]; } | { type: "linear"; coords: [...]; } | ... 4 more ... | PerseusGraphType'.
                        `There should be point(s) on [${grapher.options.correct?.coords.join(
                            "], [",
                        )}]`,
                    );
                }
                break;
            case "orderer":
                // Answer is the content of the each option
                // in the correct order on newlines
                // E.g. 'item 1\nitem 2\nitem 3'
                const orderer = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (orderer.options?.correctOptions) {
                    answers.push(
                        joinOptionContents(orderer.options.correctOptions),
                    );
                }
                break;
            case "sorter":
                // Answer is the content of each option in the correct order
                // separated by commas
                // E.g. 'item 1, item 2, item 3'
                const sorter = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (sorter.options?.correct) {
                    answers.push(sorter.options.correct.join(", "));
                }
                break;
            case "label-image":
                // Answer is a list of labels, their positions, and their answer
                // E.g. '{label: "label 1", position: {x: 0.5, y: 0.5}, answer: "answer 1"}'
                const labelImage = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (labelImage.options?.markers) {
                    answers.push(
                        ...labelImage.options.markers.map(
                            (m) =>
                                `{label: "${m.label}", position: {${m.x},${
                                    m.y
                                }}, answer: "${m.answers.join(", ")}"}`,
                        ),
                    );
                }
                break;
            case "number-line":
                // Answer is the correct x position on the number line
                // E.g. '0.5'
                const numberLine = widget;
                if (numberLine.options?.correctX != null) {
                    answers.push(numberLine.options.correctX.toString());
                }
                break;
            case "matrix":
                // Answer is a list of rows representing the matrix
                // E.g. '[[1, 2], [3, 4]]'
                const matrix = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (matrix.options?.answers) {
                    answers.push(`[${matrix.options.answers.join("], [")}]`);
                }
                break;
            case "matcher":
                // Answer is a table of the left and right items
                // E.g. '| Left | Right |\n| --- | --- |\n| left item 1 | right item 1 |\n| left item 2 | right item 2 |'
                const matcher = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (matcher.options?.left && matcher.options?.right) {
                    const {left, right} = matcher.options;
                    const [leftHeader, rightHeader] = matcher.options.labels;
                    const tableHeader = `| ${leftHeader} | ${rightHeader} |\n| --- | --- |`;
                    const tableRows = left.map((leftItem, index) => {
                        return `| ${leftItem} | ${right[index]} |`;
                    });
                    const table = [tableHeader, ...tableRows].join("\n");
                    answers.push(table);
                }
                break;
        }
    });

    return answers;
}

/**
 * Join the content of the options together.
 * @param {Array<{content: string}>} options
 * @returns {string}
 */
const joinOptionContents = (options: readonly {content: string}[]): string =>
    options.map(({content}) => content).join("\n");

/**
 * Convert an index to an option letter.
 * @param {number} index
 * @returns {string}
 * @example
 * toOptionLetter(0) // 'A'
 * toOptionLetter(1) // 'B'
 * toOptionLetter(25) // 'Z'
 * // Once the index goes past 25, it will start returning special characters
 * toOptionLetter(26) // '['
 */
const toOptionLetter = (index: number): string =>
    String.fromCharCode("A".charCodeAt(0) + index);

/**
 * Inject a string equivalent of the widgets into the content.
 *
 * Content may contain Perseus widgets, that looks like this: '[[☃ Radio 1]]'.
 * This function replaces those widgets with its equivalent string.
 *
 * @param {string} content
 * @param {PerseusRenderer["widgets"]} widgets
 * @returns
 */
function injectWidgets(
    content: string,
    widgets: PerseusRenderer["widgets"],
    widgetProps?: PerseusWidgetsMap,
): string {
    // The types for taskProgress.itemData are not well defined,
    // so there is a chance that widgets or content could be undefined.
    // In that scenario, simply exit early and return the content as is.
    if (!content) {
        return "";
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!widgets) {
        return content;
    }

    let context = content;

    keys(widgets).forEach((widgetID) => {
        const widget = widgets[widgetID];

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!widget.options) {
            return;
        }

        switch (widget.type) {
            case "radio":
                // Replace radio with the radio options
                // '[[☃ Radio 1]]' -> 'choice 1\nchoice 2\nchoice 3'
                // or if the current widget state is available with proper order,
                // '[[☃ Radio 1]]' ->
                //   'Option A: choice 1\nOption B: choice 2\nOption C: choice 3'
                const radio = widget;
                const radioProps = widgetProps?.[widgetID] as
                    | PerseusRadioWidgetOptions
                    | null
                    | undefined;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (radio.options?.choices?.length) {
                    let radioContext = joinOptionContents(
                        radioProps
                            ? radioProps.choices.map(({content}, i) => ({
                                  content: `Option ${toOptionLetter(i)}: ${content}`,
                              }))
                            : radio.options.choices,
                    );

                    if (!radioProps && radio.options?.randomize) {
                        radioContext +=
                            "\nThose options are displayed in a different order to the user. If the user says the letter, number, or ordinal number, always ask them clarify which option they are referring to.\n";
                    }

                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        radioContext,
                    );
                }
                break;
            case "image":
                // Replace image with the image's alt text
                // '[[☃ Image 1]]' -> '<img id="Image 1" alt="The text for this image">'
                const image = widget;
                if (image.options?.alt) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `<img id="${widgetID}" alt="${image.options.alt}">`,
                    );
                }
                break;
            case "label-image":
                // Replace label-image with the label-image's alt text
                // '[[☃ Label Image 1]]' -> '[An image with dots that user needs to label. Label choices: [choice 1, choice 2]. Image alt text: The text for this image]'
                const labelImage = widget;
                if (labelImage.options?.imageAlt) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `[An image with dots that user needs to label. Label choices: [${labelImage.options.choices.join(
                            ", ",
                        )}]. Image alt text: ${
                            labelImage.options?.imageAlt ?? ""
                        }]`,
                    );
                }
                break;
            case "explanation":
                // Replace explaintion with the explaination text
                // Note: explainations can have widgets inside of them too
                // '[[☃ Explanation 1]]' -> 'This is the hidden explanation text'
                const explanation = widget;
                if (explanation.options?.explanation) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        injectWidgets(
                            explanation.options.explanation,
                            explanation.options.widgets,
                        ),
                    );
                }
                break;
            case "passage":
                // Replace passage with the passage text
                // '[[☃ Passage 1]]' -> '# Passage Title\n\nPassage text'
                const passage = widget;
                if (
                    passage.options?.passageTitle ||
                    passage.options?.passageText
                ) {
                    const {passageTitle, passageText} = passage.options;
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `# ${passageTitle}\n\n${passageText}`,
                    );
                }
                break;
            case "group":
            case "graded-group":
                // Replace group with the group's nested content
                // '[[☃ Group 1]]' -> 'Nested question\n[[☃ Radio 1]]'
                //      -> 'Nested question\noption 1\noption 2\noption 3'
                const group = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (group.options?.widgets && group.options.content) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        injectWidgets(
                            group.options.content,
                            group.options.widgets,
                        ),
                    );
                }
                break;
            case "graded-group-set":
                // Replace graded-group-set with the the nested groups
                // '[[☃ Graded Group Set 1]]'
                //      -> 'Nested question 1\noption 1\noption 2\noption 3\nNested question 2\noption 1\noption 2\noption 3'
                const gradedGroup = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (gradedGroup.options?.gradedGroups) {
                    const gradedGroups = gradedGroup.options.gradedGroups;

                    const gradedGroupsContent = gradedGroups.reduce(
                        (acc, group) => {
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                            if (group.widgets && group.content) {
                                acc +=
                                    injectWidgets(
                                        group.content,
                                        group.widgets,
                                    ) + "\n";
                            }
                            return acc;
                        },
                        "",
                    );

                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        gradedGroupsContent,
                    );
                }
                break;
            case "categorizer":
                // Replace categorizer with the options and categories
                // '[[☃ Categorizer 1]]' -> '''
                //    For each item, select the correct category. Categories: category 1, category 2, category 3.
                //    Items:
                //    item 1
                //    item 2
                // '''
                const categorizer = widget;
                if (
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    categorizer.options?.categories &&
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    categorizer.options.items
                ) {
                    const categories = categorizer.options.categories;
                    const items = categorizer.options.items;
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `For each item, select the correct category. Categories: ${categories.join(
                            ", ",
                        )}.\nItems:\n${items.join("\n")}\n`,
                    );
                }
                break;
            case "dropdown":
                // Replace dropdown with the dropdown options
                // '[[☃ Dropdown 1]]' -> '[option 1 | option 2 | option 3]'
                const dropdown = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (dropdown.options?.choices) {
                    const choices = dropdown.options.choices.map(
                        (choice) => choice.content,
                    );
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `[${choices.join(" | ")}]`,
                    );
                }
                break;
            case "definition":
                // Replace definition with the word that is being defined
                // NOTE(chase): this does not include the definition itself,
                // because I believe the AI can infer that without wasting extra tokens
                // '[[☃ Definition 1]]' -> 'word'
                const definition = widget;
                if (definition.options?.togglePrompt) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        definition.options.togglePrompt,
                    );
                }
                break;
            case "orderer":
                // Replace orderer with the orderer options
                // '[[☃ Orderer 1]]' -> 'option 1\noption 2\noption 3'
                const orderer = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (orderer.options?.options) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        joinOptionContents(orderer.options.options),
                    );
                }
                break;
            case "sorter":
                // Replace sorter with the options
                // NOTE(chase): These are already in the correct order
                // '[[☃ Sorter 1]]' -> '[option 1 | option 2 | option 3]'
                const sorter = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (sorter.options?.correct) {
                    const choices = sorter.options.correct;
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `[${choices.join(" | ")}]`,
                    );
                }
                break;
            case "interactive-graph":
                // Replace interactive-graph with the graph's range
                // '[[☃ Interactive Graph 1]]' -> '[Graph with an x range of -10 to 10 and y range of -10 to 10]'
                const interactiveGraph = widget;
                if (interactiveGraph.options?.range.length === 2) {
                    const [x, y] = interactiveGraph.options.range;
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `[Graph with an x range of ${x[0]} to ${x[1]} and y range of ${y[0]} to ${y[1]}]`,
                    );
                }
                break;
            case "number-line":
                // Replace number-line with the number line's range, step, and initial position
                // '[[☃ Number Line 1]]' -> '[Number line with a range of -10 to 10, a step of 1, and an initial position of 0]'
                const numberLine = widget;
                if (
                    numberLine.options?.range.length === 2 &&
                    numberLine.options?.tickStep &&
                    numberLine.options?.initialX
                ) {
                    const [min, max] = numberLine.options.range;
                    const step = numberLine.options.tickStep;
                    const initialPosition = numberLine.options.initialX;
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `[Number line with a range of ${min} to ${max}, a step of ${step}, and an initial position of ${initialPosition}]`,
                    );
                }
                break;
            case "matrix":
                // Replace matrix with the matrix's dimensions
                // '[[☃ Matrix 1]]' -> '[Matrix with 2 rows and 3 columns. The user can click on each cell to enter a value]'
                const matrix = widget;
                if (matrix.options?.matrixBoardSize.length === 2) {
                    const [rows, columns] = matrix.options.matrixBoardSize;
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `[Matrix with ${rows} rows and ${columns} columns. The user can click on each cell to enter a value]`,
                    );
                }
                break;
            case "matcher":
                // Replace matcher with a table representing the left and right columns
                // '[[☃ Matcher 1]]' -> '| Left Column | Right Column |\n| --- | --- |\n| option 1 | option 2 |\n| option 3 | option 4 |'
                const matcher = widget;
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (matcher.options?.left && matcher.options?.right) {
                    const {left, right} = matcher.options;
                    const [leftHeader, rightHeader] = matcher.options.labels;
                    const tableHeader = `| ${leftHeader} | ${rightHeader} |\n| --- | --- |`;
                    const tableRows = left.map((leftItem, index) => {
                        return `| ${leftItem} | ${right[index]} |`;
                    });
                    const table = [tableHeader, ...tableRows].join("\n");
                    const matcherWidgetExplanation =
                        "The user needs to move items in the right column to match the correct option on the left. The order of items on the right side will be different from what the user sees.";
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        `${matcherWidgetExplanation}\n${table}`,
                    );
                }
                break;
            case "numeric-input":
            case "input-number":
            case "expression":
                // These widgets are just input fields, so we replace them with a ?
                // 'Solve 2+2 [[☃ Numeric Input 1]]' -> 'Solve 2+2 ?'
                // (we've found that using "?" gives the best results on fill-
                // in-the-blank questions).
                context = context.replace(`[[☃ ${widgetID}]]`, "?");
                break;
            default:
                // Tell the bot that it doesn't understand this widget
                context = context.replace(
                    `[[☃ ${widgetID}]]`,
                    `[[Unsupported ${widget.type} widget: Explain to the user that you are unable to understand the content in this widget and ask them to describe it.]]`,
                );
        }
    });

    return context;
}

/**
 * Looks through widgets to identify images that do not have alt text.
 *
 * We pass in the fuller perseusRenderer object to allow for the possibility
 * of expanding to include other img data from content & images in the future.
 *
 * @param {PerseusRenderer} perseusRenderer
 * @returns a stringified list of {widgetId, imageUrl} for imgs that don't have alt text
 */
function getImagesWithoutAltData(perseusRenderer: PerseusRenderer): string {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!perseusRenderer.widgets) {
        return "";
    }

    const imgsWithoutAltData: {imgUrl: string; widgetId: string}[] = [];

    Object.entries(perseusRenderer.widgets).forEach(([widgetId, widget]) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!widget.options) {
            return;
        }

        // Add to imagesWithoutAltData if img alt is missing and
        // image has valid img url data.
        if (
            widget.type === "image" &&
            !widget.options.alt &&
            widget.options.backgroundImage?.url
        ) {
            imgsWithoutAltData.push({
                widgetId,
                imgUrl: widget.options.backgroundImage.url,
            });
        }
    });

    return JSON.stringify(imgsWithoutAltData);
}

/* Widgets that have individual answers */
const INDIVIDUAL_ANSWER_WIDGETS = [
    "interactive-graph",
    "categorizer",
    "grapher",
];

/* Widgets that are supported for automatic scoring */
const SUPPORTED_WIDGETS = [
    "radio",
    "numeric-input",
    "input-number",
    "expression",
    ...INDIVIDUAL_ANSWER_WIDGETS,
];

/* Verify if the perseus item has supported widgets for automatic scoring */
export const isWrongAnswerSupported = (
    widgetIds: Array<string>,
    widgetMap: PerseusWidgetsMap,
): boolean => {
    return (
        widgetIds.length !== 0 &&
        widgetIds.every((widgetId) =>
            SUPPORTED_WIDGETS.includes(
                getWidgetTypeByWidgetId(widgetId, widgetMap) as string,
            ),
        )
    );
};

/* Verify if the widget ID has an individual answer for the coach report view  */
export const shouldHaveIndividualAnswer = (
    widgetId: string,
    widgetMap: PerseusWidgetsMap,
): boolean => {
    return INDIVIDUAL_ANSWER_WIDGETS.includes(
        getWidgetTypeByWidgetId(widgetId, widgetMap) as string,
    );
};

/* Returns the answer userInput submission for currently supported widgets */
// TODO (LEMS-1834): Fix userInput any types to be specific
export const getAnswerFromUserInput = (widgetType: string, userInput: any) => {
    switch (widgetType) {
        case "categorizer":
            return userInput.values;
        case "input-number":
            return userInput.currentValue;
        case "numeric-input":
            return userInput.currentValue;
        case "radio":
            return userInput.selectedChoiceIds;
    }
    return userInput;
};

/* Returns the correct answer for a given widget ID and Perseus Item */
// TODO (LEMS-1835): We should fix the resonse type from getWidget to be specific.
// TODO (LEMS-1836): We should also consider adding the getOneCorrectAnswerFromRubric method to all widgets.
export const getCorrectAnswerForWidgetId = (
    widgetId: string,
    itemData: PerseusItem,
): string | null | undefined => {
    const rubric = itemData.question.widgets[widgetId].options;
    const widgetMap = getWidgetsMapFromItemData(itemData);
    const widgetType = getWidgetTypeByWidgetId(widgetId, widgetMap) as string;

    const widget = Widgets.getWidgetExport(widgetType);

    return widget?.getOneCorrectAnswerFromRubric?.(rubric);
};

/* Verify if the widget ID exists in the content string of the Perseus Item */
export const isWidgetIdInContent = (
    perseusItem: PerseusItem,
    widgetId: string,
): boolean => {
    return perseusItem.question.content.indexOf(widgetId as string) !== -1;
};

/* Return an array of all the widget IDs that exist in the content string of a Perseus Item */
export const getValidWidgetIds = (perseusItem: PerseusItem): Array<string> => {
    const {widgets} = perseusItem.question;
    return keys(widgets).filter((id) => isWidgetIdInContent(perseusItem, id));
};

export {getAnswersFromWidgets, getImagesWithoutAltData, injectWidgets};
