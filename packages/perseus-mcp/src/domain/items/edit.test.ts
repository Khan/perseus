/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateDropdownWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../../adapters/fs/perseus-core-schema-source";
import {createCatalog} from "../../app/catalog";

import {editItem as editItemWith} from "./edit";

import type {PatchOperation} from "./edit";
import type {WidgetCatalog} from "./widgets";
import type {PerseusItem} from "@khanacademy/perseus-core";

let widgets: WidgetCatalog;

function editItem(item: PerseusItem, patch: PatchOperation[]) {
    return editItemWith(item, patch, widgets);
}

function radioItem(): PerseusItem {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "Pick one: [[☃ radio 1]]",
            widgets: {
                "radio 1": generateRadioWidget({
                    options: generateRadioOptions({
                        choices: [
                            generateRadioChoice("Yes", {correct: true}),
                            generateRadioChoice("No", {correct: false}),
                        ],
                    }),
                }),
            },
        }),
    });
}

describe("editItem", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
        widgets = createCatalog(createPerseusCoreSchemaSource()).widgets();
    });

    it("returns the patched item", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {
                op: "replace",
                path: "/question/content",
                value: "Choose: [[☃ radio 1]]",
            },
        ]);

        // Assert
        expect(result).toMatchObject({
            ok: true,
            item: {question: {content: "Choose: [[☃ radio 1]]"}},
        });
    });

    it("applies operations in order", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {
                op: "replace",
                path: "/question/widgets/radio 1/options/choices/0/correct",
                value: false,
            },
            {
                op: "replace",
                path: "/question/widgets/radio 1/options/choices/1/correct",
                value: true,
            },
        ]);

        // Assert
        expect(result).toMatchObject({
            ok: true,
            item: {
                question: {
                    widgets: {
                        "radio 1": {
                            options: {
                                choices: [{correct: false}, {correct: true}],
                            },
                        },
                    },
                },
            },
        });
    });

    it("leaves the original item unchanged", () => {
        // Arrange
        const item = radioItem();
        const before = structuredClone(item);

        // Act
        editItem(item, [
            {op: "replace", path: "/question/content", value: "Changed"},
        ]);

        // Assert
        expect(item).toEqual(before);
    });

    it("rejects a patch that leaves the item with errors", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {op: "remove", path: "/question/widgets/radio 1"},
        ]);

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [
                expect.objectContaining({
                    code: "lint:widget-placeholder-missing-widget",
                }),
            ],
        });
    });

    it("rejects a patch that makes the item unparseable", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {op: "replace", path: "/question/content", value: 5},
        ]);

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [expect.objectContaining({code: "parse-error"})],
        });
    });

    it("returns warnings without rejecting the patch", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {
                op: "add",
                path: "/question/widgets/dropdown 1",
                value: generateDropdownWidget(),
            },
        ]);

        // Assert
        expect(result).toMatchObject({
            ok: true,
            issues: [expect.objectContaining({code: "orphaned-widget"})],
        });
    });

    it("rejects a patch whose test operation fails, naming its path", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {op: "test", path: "/question/content", value: "Something else"},
            {op: "replace", path: "/question/content", value: "Changed"},
        ]);

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [
                expect.objectContaining({
                    code: "patch:TEST_OPERATION_FAILED",
                    path: "/question/content",
                }),
            ],
        });
    });

    it("rejects an operation on a path that doesn't exist", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {op: "remove", path: "/question/widgets/radio 2"},
        ]);

        // Assert
        expect(result).toEqual({
            ok: false,
            issues: [
                expect.objectContaining({
                    code: "patch:OPERATION_PATH_UNRESOLVABLE",
                }),
            ],
        });
    });

    it("keeps the patch error message short", () => {
        // Arrange, Act
        const result = editItem(radioItem(), [
            {op: "remove", path: "/question/widgets/radio 2"},
        ]);

        // Assert
        expect(result.issues[0].message).not.toContain("\n");
    });
});
