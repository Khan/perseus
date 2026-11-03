/**
 * @jest-environment node
 */
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../../adapters/fs/perseus-core-schema-source";
import {createCatalog} from "../../app/catalog";

import {buildItem as buildItemWith, buildWidget} from "./build";

import type {ItemInput} from "./build";
import type {WidgetCatalog} from "./widgets";

let widgets: WidgetCatalog;

function buildItem(input: ItemInput) {
    return buildItemWith(input, widgets);
}

describe("build", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
        widgets = createCatalog(createPerseusCoreSchemaSource()).widgets();
    });

    describe("buildWidget", () => {
        it.each(["radio", "numeric-input", "expression", "dropdown", "image"])(
            "builds a %s widget from its default options",
            (type) => {
                // Arrange, Act
                const result = buildWidget({id: `${type} 1`, type});

                // Assert
                expect(result).toMatchObject({ok: true, widget: {type}});
            },
        );

        it("merges the given options over the defaults", () => {
            // Arrange, Act
            const result = buildWidget({
                id: "dropdown 1",
                type: "dropdown",
                options: {placeholder: "Pick one"},
            });

            // Assert
            expect(result).toMatchObject({
                ok: true,
                widget: {
                    options: {
                        placeholder: "Pick one",
                        choices: expect.any(Array),
                    },
                },
            });
        });

        it("returns an error for options that don't parse", () => {
            // Arrange, Act
            const result = buildWidget({
                id: "dropdown 1",
                type: "dropdown",
                options: {choices: "not a list"},
            });

            // Assert
            expect(result).toEqual({
                ok: false,
                error: expect.stringContaining("choices"),
            });
        });
    });

    describe("buildItem", () => {
        it("builds an item with the widgets map keyed by id", () => {
            // Arrange, Act
            const result = buildItem({
                question: {
                    content: "Pick one: [[☃ dropdown 1]]",
                    widgets: [{id: "dropdown 1", type: "dropdown"}],
                },
            });

            // Assert
            expect(result).toMatchObject({
                ok: true,
                item: {
                    question: {
                        content: "Pick one: [[☃ dropdown 1]]",
                        widgets: {"dropdown 1": {type: "dropdown"}},
                    },
                    hints: [],
                },
            });
        });

        it("builds hints, keeping replace", () => {
            // Arrange, Act
            const result = buildItem({
                question: {content: "What is 1 + 1?"},
                hints: [
                    {content: "Count up from 1."},
                    {content: "2", replace: true},
                ],
            });

            // Assert
            expect(result).toMatchObject({
                ok: true,
                item: {
                    hints: [
                        {content: "Count up from 1."},
                        {content: "2", replace: true},
                    ],
                },
            });
        });

        it("rejects a widget type Perseus doesn't have", () => {
            // Arrange, Act
            const result = buildItem({
                question: {
                    content: "[[☃ slider 1]]",
                    widgets: [{id: "slider 1", type: "slider"}],
                },
            });

            // Assert
            expect(result).toEqual({
                ok: false,
                issues: [
                    expect.objectContaining({
                        code: "unknown-widget-type",
                        path: 'question.widgets["slider 1"]',
                    }),
                ],
            });
        });

        it("rejects two widgets with the same id", () => {
            // Arrange, Act
            const result = buildItem({
                question: {
                    content: "[[☃ dropdown 1]]",
                    widgets: [
                        {id: "dropdown 1", type: "dropdown"},
                        {id: "dropdown 1", type: "dropdown"},
                    ],
                },
            });

            // Assert
            expect(result).toEqual({
                ok: false,
                issues: [
                    expect.objectContaining({code: "duplicate-widget-id"}),
                ],
            });
        });

        it("rejects a widget whose options don't parse, naming it", () => {
            // Arrange, Act
            const result = buildItem({
                question: {
                    content: "[[☃ dropdown 1]]",
                    widgets: [
                        {
                            id: "dropdown 1",
                            type: "dropdown",
                            options: {choices: "not a list"},
                        },
                    ],
                },
            });

            // Assert
            expect(result).toEqual({
                ok: false,
                issues: [
                    expect.objectContaining({
                        code: "invalid-widget",
                        path: 'question.widgets["dropdown 1"]',
                    }),
                ],
            });
        });

        it("rejects content whose placeholder has no widget", () => {
            // Arrange, Act
            const result = buildItem({question: {content: "[[☃ radio 1]]"}});

            // Assert
            expect(result).toEqual({
                ok: false,
                issues: [expect.objectContaining({code: "missing-widget"})],
            });
        });

        it("returns warnings without rejecting the item", () => {
            // Arrange, Act
            const result = buildItem({
                question: {
                    content: "No placeholder.",
                    widgets: [{id: "dropdown 1", type: "dropdown"}],
                },
            });

            // Assert
            expect(result).toMatchObject({
                ok: true,
                issues: [expect.objectContaining({code: "orphaned-widget"})],
            });
        });
    });
});
