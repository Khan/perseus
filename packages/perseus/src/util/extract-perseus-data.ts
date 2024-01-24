import {keys} from "@khanacademy/wonder-stuff-core";

import type {PerseusRenderer} from "../perseus-types";

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

        if (!widget.options) {
            return;
        }

        switch (widget.type) {
            case "radio":
                const radio = widget;
                const options = radio.options;
                // Answer is the content of the correct choice
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
                    categorizer.options?.categories &&
                    categorizer.options?.items &&
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
                if (inputNumber.options?.value) {
                    answers.push(inputNumber.options.value.toString());
                }
                break;
            case "expression":
                // Answer is a list of potential correct expressions,
                // since there can be multiple correct forms of the expression
                const expression = widget;
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
                    plotter.options?.categories &&
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
                if (orderer.options?.correctOptions) {
                    answers.push(
                        orderer.options.correctOptions
                            .map((option) => option.content)
                            .join("\n"),
                    );
                }
                break;
            case "sorter":
                // Answer is the content of each option in the correct order
                // separated by commas
                // E.g. 'item 1, item 2, item 3'
                const sorter = widget;
                if (sorter.options?.correct) {
                    answers.push(sorter.options.correct.join(", "));
                }
                break;
            case "label-image":
                // Answer is a list of labels, their positions, and their answer
                // E.g. '{label: "label 1", position: {x: 0.5, y: 0.5}, answer: "answer 1"}'
                const labelImage = widget;
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
                if (matrix.options?.answers) {
                    answers.push(`[${matrix.options.answers.join("], [")}]`);
                }
                break;
            case "matcher":
                // Answer is a table of the left and right items
                // E.g. '| Left | Right |\n| --- | --- |\n| left item 1 | right item 1 |\n| left item 2 | right item 2 |'
                const matcher = widget;
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
): string {
    // The types for taskProgress.itemData are not well defined,
    // so there is a chance that widgets or content could be undefined.
    // In that scenario, simply exit early and return the content as is.
    if (!content) {
        return "";
    }
    if (!widgets) {
        return content;
    }

    let context = content;

    keys(widgets).forEach((widgetID) => {
        const widget = widgets[widgetID];

        if (!widget.options) {
            return;
        }

        switch (widget.type) {
            case "radio":
                // Replace radio with the radio options
                // '[[☃ Radio 1]]' -> 'option 1\noption 2\noption 3'
                const radio = widget;
                if (radio.options?.choices?.length) {
                    let radioContext = radio.options.choices
                        .map((choice) => choice.content)
                        .join("\n");

                    if (radio.options?.randomize) {
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
                if (gradedGroup.options?.gradedGroups) {
                    const gradedGroups = gradedGroup.options.gradedGroups;

                    const gradedGroupsContent = gradedGroups.reduce(
                        (acc, group) => {
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
                    categorizer.options?.categories &&
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
                if (orderer.options?.options) {
                    context = context.replace(
                        `[[☃ ${widgetID}]]`,
                        orderer.options.options
                            .map((option) => option.content)
                            .join("\n"),
                    );
                }
                break;
            case "sorter":
                // Replace sorter with the options
                // NOTE(chase): These are already in the correct order
                // '[[☃ Sorter 1]]' -> '[option 1 | option 2 | option 3]'
                const sorter = widget;
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

export {getAnswersFromWidgets, injectWidgets};
