import {
    CoreWidgetRegistry,
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateIGCircleGraph,
    generateInteractiveGraphOptions,
    generateInteractiveGraphWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {
    articleContentFields,
    itemContentFields,
    splitMath,
} from "./content-fields";

describe("splitMath", () => {
    it("separates TeX from text", () => {
        // Arrange, Act
        const result = splitMath("Solve $x^2 = 4$ for $x$.");

        // Assert
        expect(result).toEqual({
            text: "Solve   for  .",
            math: ["x^2 = 4", "x"],
        });
    });

    it("keeps an escaped dollar sign in the text", () => {
        // Arrange, Act
        const result = splitMath("It costs \\$5.");

        // Assert
        expect(result).toEqual({text: "It costs $5.", math: []});
    });

    it("keeps an unclosed dollar sign as text", () => {
        // Arrange, Act
        const result = splitMath("Pay $5 now");

        // Assert
        expect(result).toEqual({text: "Pay $5 now", math: []});
    });
});

describe("itemContentFields", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("splits question text, hint text and TeX, without placeholders", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "**What is $2+2$?**\n\n[[☃ radio 1]]",
                widgets: {"radio 1": generateRadioWidget()},
            }),
            hints: [
                generateTestPerseusRenderer({content: "Count up from $2$."}),
                generateTestPerseusRenderer({content: "It's four."}),
            ],
        });

        // Act
        const fields = itemContentFields(item);

        // Assert
        expect(fields).toMatchObject({
            text: "**What is ?**",
            hintText: "Count up from .\nIt's four.",
            math: ["2+2", "2"],
            hintCount: 2,
        });
    });

    it("collects choice text as widget text and short values as props", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: generateRadioOptions({
                            choices: [
                                generateRadioChoice("A red apple", {
                                    correct: true,
                                }),
                                generateRadioChoice("$\\frac{1}{2}$ a pear"),
                            ],
                        }),
                    }),
                },
            }),
        });

        // Act
        const fields = itemContentFields(item);

        // Assert
        expect(fields.widgetText).toEqual(["A red apple", "a pear"]);
        expect(fields.math).toEqual(["\\frac{1}{2}"]);
        expect(fields.widgetProps).toEqual(
            expect.arrayContaining([
                "radio.choices.correct=true",
                "radio.choices.correct=false",
            ]),
        );
    });

    it("leaves ids and numbers in arrays out of the props", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ interactive-graph 1]]",
                widgets: {
                    "interactive-graph 1": generateInteractiveGraphWidget({
                        options: generateInteractiveGraphOptions({
                            range: [
                                [-10, 10],
                                [-10, 10],
                            ],
                            correct: generateIGCircleGraph(),
                        }),
                    }),
                },
            }),
        });

        // Act
        const fields = itemContentFields(item);

        // Assert
        expect(fields.widgetProps).toContain(
            "interactive-graph.correct.type=circle",
        );
        expect(fields.widgetProps.some((p) => p.includes(".range="))).toBe(
            false,
        );
        expect(fields.widgetProps.some((p) => p.includes(".id="))).toBe(false);
    });

    it("counts nested widgets and takes their renderer's text as text", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "Intro [[☃ graded-group 1]]",
                widgets: {
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            title: "Part A",
                            content: "Pick one. [[☃ radio 1]]",
                            widgets: {"radio 1": generateRadioWidget()},
                        }),
                    }),
                },
            }),
        });

        // Act
        const fields = itemContentFields(item);

        // Assert
        expect(fields).toMatchObject({
            text: "Intro\nPick one.",
            widgetTypes: ["graded-group", "radio"],
            widgetCount: 2,
            widgetText: ["Part A"],
        });
    });

    it("keeps image alt text and notes Graphie images", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content:
                    "See ![A right triangle](web+graphie://cdn.example/abc).",
            }),
        });

        // Act
        const fields = itemContentFields(item);

        // Assert
        expect(fields).toMatchObject({
            text: "See A right triangle .",
            imageCount: 1,
            hasGraphie: true,
        });
    });
});

describe("articleContentFields", () => {
    it("joins every section's text, with no hints", () => {
        // Arrange
        const sections = [
            generateTestPerseusRenderer({content: "## Intro"}),
            generateTestPerseusRenderer({content: "More text"}),
        ];

        // Act
        const fields = articleContentFields(sections);

        // Assert
        expect(fields).toMatchObject({
            text: "## Intro\nMore text",
            hintText: "",
            hintCount: 0,
        });
    });
});
