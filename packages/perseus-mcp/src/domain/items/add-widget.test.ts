/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateDropdownWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../../adapters/fs/perseus-core-schema-source";
import {createCatalog} from "../../app/catalog";
import {checkoutPaths} from "../../runtime-paths";

import {addWidget as addWidgetWith, nextWidgetId} from "./add-widget";

import type {AddWidgetInput} from "./add-widget";
import type {WidgetCatalog} from "./widgets";
import type {PerseusItem} from "@khanacademy/perseus-core";

let widgets: WidgetCatalog;

function addWidget(item: PerseusItem, input: AddWidgetInput) {
    return addWidgetWith(item, input, widgets);
}

function itemWithContent(content: string): PerseusItem {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({content}),
        hints: [{content: "A hint.", widgets: {}, images: {}}],
    });
}

describe("nextWidgetId", () => {
    it("returns the first unused number for the type", () => {
        // Arrange, Act
        const id = nextWidgetId("radio", ["radio 1", "radio 2", "dropdown 3"]);

        // Assert
        expect(id).toBe("radio 3");
    });
});

describe("addWidget", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
        widgets = createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ).widgets();
    });

    it("appends the placeholder as a new paragraph by default", () => {
        // Arrange, Act
        const result = addWidget(itemWithContent("Pick one."), {
            type: "dropdown",
        });

        // Assert
        expect(result).toMatchObject({
            ok: true,
            widgetId: "dropdown 1",
            item: {
                question: {
                    content: "Pick one.\n\n[[☃ dropdown 1]]",
                    widgets: {"dropdown 1": {type: "dropdown"}},
                },
            },
        });
    });

    it("places the placeholder right after the `after` text", () => {
        // Arrange, Act
        const result = addWidget(itemWithContent("x = and more"), {
            type: "dropdown",
            after: "x = ",
        });

        // Assert
        expect(result).toMatchObject({
            ok: true,
            item: {question: {content: "x = [[☃ dropdown 1]]and more"}},
        });
    });

    it("picks the next free id for the type", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ dropdown 1]]",
                widgets: {"dropdown 1": generateDropdownWidget()},
            }),
        });

        // Act
        const result = addWidget(item, {type: "dropdown"});

        // Assert
        expect(result).toMatchObject({ok: true, widgetId: "dropdown 2"});
    });

    it("adds the widget to a hint", () => {
        // Arrange, Act
        const result = addWidget(itemWithContent("Question."), {
            type: "dropdown",
            hint: 0,
        });

        // Assert
        expect(result).toMatchObject({
            ok: true,
            item: {
                question: {content: "Question."},
                hints: [{content: "A hint.\n\n[[☃ dropdown 1]]"}],
            },
        });
    });

    it("rejects `after` text the content doesn't contain", () => {
        // Arrange, Act
        const result = addWidget(itemWithContent("Pick one."), {
            type: "dropdown",
            after: "missing",
        });

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [expect.objectContaining({code: "after-text-not-found"})],
        });
    });

    it("rejects a hint the item doesn't have", () => {
        // Arrange, Act
        const result = addWidget(itemWithContent("Pick one."), {
            type: "dropdown",
            hint: 3,
        });

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [expect.objectContaining({code: "no-such-hint"})],
        });
    });

    it("rejects an id that's already taken", () => {
        // Arrange
        const item = generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content: "[[☃ dropdown 1]]",
                widgets: {"dropdown 1": generateDropdownWidget()},
            }),
        });

        // Act
        const result = addWidget(item, {type: "dropdown", id: "dropdown 1"});

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [expect.objectContaining({code: "duplicate-widget-id"})],
        });
    });

    it("returns the parser's error for options that don't parse", () => {
        // Arrange, Act
        const result = addWidget(itemWithContent("Pick one."), {
            type: "dropdown",
            options: {choices: "not a list"},
        });

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [
                expect.objectContaining({
                    code: "invalid-widget",
                    message: expect.stringContaining("choices"),
                }),
            ],
        });
    });

    it("leaves the original item unchanged", () => {
        // Arrange
        const item = itemWithContent("Pick one.");
        const before = structuredClone(item);

        // Act
        addWidget(item, {type: "dropdown"});

        // Assert
        expect(item).toEqual(before);
    });
});
