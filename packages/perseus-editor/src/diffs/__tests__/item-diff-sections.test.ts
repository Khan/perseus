import {
    generateImageOptions,
    generateImageWidget,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    getDefaultAnswerArea,
} from "@khanacademy/perseus-core";

import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import {getChangedItemSections} from "../item-diff-sections";

import type {
    ImageWidget,
    PerseusItem,
    PerseusRenderer,
    RadioWidget,
} from "@khanacademy/perseus-core";

// Choice ids are fixed so two calls build equal widgets.
const radioWidget = (
    firstChoice: string,
    widgetFields?: Partial<Omit<RadioWidget, "type" | "options">>,
): RadioWidget =>
    generateRadioWidget({
        ...widgetFields,
        options: generateRadioOptions({
            choices: [
                {content: firstChoice, id: "choice-1", correct: true},
                {content: "Green", id: "choice-2", correct: false},
            ],
        }),
    });

const imageWidget = (
    alt: string,
    widgetFields?: Partial<Omit<ImageWidget, "type" | "options">>,
): ImageWidget =>
    generateImageWidget({
        ...widgetFields,
        options: generateImageOptions({alt}),
    });

const hint = (content: string): PerseusRenderer =>
    generateTestPerseusRenderer({content, widgets: {}});

// Two-widget question, two hints (the second with a widget), default
// answer area. Each call builds an independent copy.
const buildItem = (): PerseusItem =>
    generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "What color is the sky? [[☃ radio 1]] [[☃ image 1]]",
            widgets: {
                "radio 1": radioWidget("Blue"),
                "image 1": imageWidget("The sky"),
            },
        }),
        answerArea: getDefaultAnswerArea(),
        hints: [
            hint("Look up."),
            generateTestPerseusRenderer({
                content: "It rhymes with glue. [[☃ radio 1]]",
                widgets: {"radio 1": radioWidget("Glue")},
            }),
        ],
    });

describe("getChangedItemSections", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    it("returns no sections for identical items", () => {
        // Arrange, Act
        const sections = getChangedItemSections(buildItem(), buildItem());

        // Assert
        expect(sections).toEqual([]);
    });

    it("returns the question when its content changes", () => {
        // Arrange
        const after = buildItem();
        after.question.content =
            "What color is the sea? [[☃ radio 1]] [[☃ image 1]]";

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([{section: "question"}]);
    });

    it("returns only the widget whose options changed", () => {
        // Arrange
        const after = buildItem();
        after.question.widgets["radio 1"] = radioWidget("Purple");

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([
            {section: "question-widget", widgetId: "radio 1"},
        ]);
    });

    it("ignores a widget that the content does not reference", () => {
        // Arrange
        const before = buildItem();
        before.question.widgets["radio 2"] = radioWidget("Yes");
        const after = buildItem();
        after.question.widgets["radio 2"] = radioWidget("No");

        // Act
        const sections = getChangedItemSections(before, after);

        // Assert
        expect(sections).toEqual([]);
    });

    it("ignores a change to a widget field outside options", () => {
        // Arrange
        const after = buildItem();
        after.question.widgets["radio 1"] = radioWidget("Blue", {
            graded: false,
            version: {major: 1, minor: 0},
        });

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([]);
    });

    // ItemDiff hides alignment for questions and hints, whatever the type.
    it("ignores an alignment change on a widget type with several alignments", () => {
        // Arrange
        const after = buildItem();
        after.question.widgets["image 1"] = imageWidget("The sky", {
            alignment: "full-width",
        });

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([]);
    });

    it("ignores an alignment change on a widget type with one alignment", () => {
        // Arrange
        const after = buildItem();
        after.question.widgets["radio 1"] = radioWidget("Blue", {
            alignment: "block",
        });

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([]);
    });

    it("returns a hint whose content changed", () => {
        // Arrange
        const after = buildItem();
        after.hints[0] = hint("Look way up.");

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([{section: "hint", hintIndex: 0}]);
    });

    it("returns an added hint without its widgets", () => {
        // Arrange
        const after = buildItem();
        after.hints.push(
            generateTestPerseusRenderer({
                content: "The answer is blue. [[☃ radio 1]]",
                widgets: {"radio 1": radioWidget("Blue")},
            }),
        );

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([{section: "hint", hintIndex: 2}]);
    });

    it("returns a removed hint", () => {
        // Arrange
        const after = buildItem();
        after.hints = [after.hints[0]];

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([{section: "hint", hintIndex: 1}]);
    });

    it("returns changed, added and removed hints in hint order", () => {
        // Arrange
        const before = buildItem();
        before.hints.push(hint("Third hint."));
        const after = buildItem();
        after.hints[0] = hint("Look way up.");

        // Act
        const sections = getChangedItemSections(before, after);

        // Assert
        expect(sections).toEqual([
            {section: "hint", hintIndex: 0},
            {section: "hint", hintIndex: 2},
        ]);
    });

    it("returns a hint widget with the index of its hint", () => {
        // Arrange
        const after = buildItem();
        after.hints[1].widgets["radio 1"] = radioWidget("Due");

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([
            {section: "hint-widget", hintIndex: 1, widgetId: "radio 1"},
        ]);
    });

    it("returns the answer area when it changes", () => {
        // Arrange
        const after = buildItem();
        after.answerArea = {...getDefaultAnswerArea(), calculator: true};

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([{section: "answer-area"}]);
    });

    it("returns the question before hints before the answer area", () => {
        // Arrange
        const after = buildItem();
        after.answerArea = {...getDefaultAnswerArea(), calculator: true};
        after.hints[1] = generateTestPerseusRenderer({
            content: "It rhymes with due. [[☃ radio 1]]",
            widgets: {"radio 1": radioWidget("Due")},
        });
        after.question.widgets["radio 1"] = radioWidget("Purple");
        after.question.content =
            "What color is the sea? [[☃ radio 1]] [[☃ image 1]]";

        // Act
        const sections = getChangedItemSections(buildItem(), after);

        // Assert
        expect(sections).toEqual([
            {section: "question"},
            {section: "question-widget", widgetId: "radio 1"},
            {section: "hint", hintIndex: 1},
            {section: "hint-widget", hintIndex: 1, widgetId: "radio 1"},
            {section: "answer-area"},
        ]);
    });
});
