/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateDropdownWidget,
    generateFreeResponseWidget,
    generateGroupOptions,
    generateGroupWidget,
    generatePlotterWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../../adapters/fs/perseus-core-schema-source";
import {createCatalog} from "../../app/catalog";
import {checkoutPaths} from "../../runtime-paths";

import {validateItem as validateItemWith} from "./validate";

import type {WidgetCatalog} from "./widgets";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

let widgets: WidgetCatalog;

function validateItem(input: unknown) {
    return validateItemWith(input, widgets);
}

function itemWith(content: string, widgets: PerseusRenderer["widgets"]) {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({content, widgets}),
    });
}

describe("validateItem", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
        widgets = createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ).widgets();
    });

    it("accepts an item whose placeholders and widgets match", () => {
        // Arrange, Act
        const result = validateItem(
            itemWith("Pick one: [[☃ radio 1]]", {
                "radio 1": generateRadioWidget({
                    options: generateRadioOptions({
                        choices: [
                            generateRadioChoice("Yes", {correct: true}),
                            generateRadioChoice("No"),
                        ],
                    }),
                }),
            }),
        );

        // Assert
        expect(result.valid).toBe(true);
    });

    it("returns a parse error naming the bad field", () => {
        // Arrange, Act
        const result = validateItem({question: {content: 5}, hints: []});

        // Assert
        expect(result.issues).toEqual([
            expect.objectContaining({
                severity: "error",
                code: "parse-error",
                message: expect.stringContaining("question.content"),
            }),
        ]);
    });

    it("reports a placeholder with no widget as an error", () => {
        // Arrange, Act
        const result = validateItem(itemWith("[[☃ radio 1]]", {}));

        // Assert
        expect(result).toMatchObject({
            valid: false,
            issues: [
                expect.objectContaining({
                    code: "lint:widget-placeholder-missing-widget",
                }),
            ],
        });
    });

    it("links an issue to the checklist entry that explains it", () => {
        // Arrange, Act
        const result = validateItem(itemWith("[[☃ radio 1]]", {}));

        // Assert
        expect(result.issues).toEqual([
            expect.objectContaining({
                code: "lint:widget-placeholder-missing-widget",
                see: "perseus://guides/review-checklist.md#placeholder-mismatch",
            }),
        ]);
    });

    it("warns about a widget that isn't placed in the content", () => {
        // Arrange, Act
        const result = validateItem(
            itemWith("No placeholder here.", {
                "dropdown 1": generateDropdownWidget(),
            }),
        );

        // Assert
        expect(result.issues).toContainEqual(
            expect.objectContaining({
                severity: "warning",
                code: "orphaned-widget",
                path: 'question.widgets["dropdown 1"]',
            }),
        );
    });

    it("reports a widget id the markdown can't render", () => {
        // Arrange, Act
        const result = validateItem(itemWith("[[☃ Radio 1]]", {}));

        // Assert
        expect(result.issues).toContainEqual(
            expect.objectContaining({
                code: "lint:widget-placeholder-unrenderable",
            }),
        );
    });

    it("warns that free-response shouldn't be used yet", () => {
        // Arrange, Act
        const result = validateItem(
            itemWith("[[☃ free-response 1]]", {
                "free-response 1": generateFreeResponseWidget(),
            }),
        );

        // Assert
        expect(result.issues).toContainEqual(
            expect.objectContaining({code: "unfinished-widget"}),
        );
    });

    it("notes deprecated widgets without failing the item", () => {
        // Arrange, Act
        const result = validateItem(
            itemWith("[[☃ plotter 1]]", {
                "plotter 1": generatePlotterWidget(),
            }),
        );

        // Assert
        expect(result.issues).toContainEqual(
            expect.objectContaining({
                severity: "info",
                code: "deprecated-widget",
            }),
        );
    });

    it("checks hints as well as the question", () => {
        // Arrange
        const item = generateTestPerseusItem({
            hints: [{content: "See [[☃ radio 1]]", widgets: {}, images: {}}],
        });

        // Act
        const result = validateItem(item);

        // Assert
        expect(result.issues).toContainEqual(
            expect.objectContaining({
                code: "lint:widget-placeholder-missing-widget",
                path: "hints[0].content",
            }),
        );
    });

    it("checks placeholders inside a group, which the linter doesn't", () => {
        // Arrange
        const group = generateGroupWidget({
            options: generateGroupOptions({
                content: "[[☃ radio 1]]",
                widgets: {},
            }),
        });

        // Act
        const result = validateItem(
            itemWith("[[☃ group 1]]", {"group 1": group}),
        );

        // Assert
        expect(result.issues).toContainEqual(
            expect.objectContaining({
                code: "missing-widget",
                path: 'question.widgets["group 1"] (nested #1).content',
            }),
        );
    });

    describe("the align-block advice", () => {
        function alignIssue(content: string) {
            return validateItem(itemWith(content, {})).issues.find(
                (issue) => issue.code === "lint:math-align-linebreaks",
            );
        }

        // The advice's two examples: the content, and its JSON string.
        function examples() {
            const message = alignIssue(
                "$\\begin{align}a&=b\\\\c&=d\\end{align}$",
            )!.message;
            const [, content, json] = message.match(
                /as in (.+), so eight in a JSON string: (".+")\.$/,
            )!;
            return {content, json};
        }

        it("gives an example the linter accepts", () => {
            // Arrange
            const {content} = examples();

            // Act
            const issue = alignIssue(`$${content}$`);

            // Assert
            expect(issue).toBeUndefined();
        });

        it("gives the same example as a JSON string", () => {
            // Arrange, Act
            const {content, json} = examples();

            // Assert
            expect(JSON.parse(json)).toBe(content);
        });
    });
});
