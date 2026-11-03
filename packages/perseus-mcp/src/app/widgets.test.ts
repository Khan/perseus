/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../adapters/fs/perseus-core-schema-source";
import {newDraft} from "../domain/draft";
import {checkoutPaths} from "../runtime-paths";

import {createCatalog} from "./catalog";
import {DraftNotFoundError, UnknownWidgetTypeError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createWidgetUseCases} from "./widgets";

function setUp() {
    const drafts = inMemoryRepository();
    const useCases = createWidgetUseCases({
        catalog: createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ),
        drafts,
    });
    return {drafts, useCases};
}

describe("widget use cases", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    describe("getWidgetSpec", () => {
        it("throws UnknownWidgetTypeError for a type Perseus doesn't have", () => {
            // Arrange
            const {useCases} = setUp();

            // Act, Assert
            expect(() => useCases.getWidgetSpec("slider")).toThrow(
                UnknownWidgetTypeError,
            );
        });
    });

    describe("validateItem", () => {
        it("validates a saved draft by itemId", () => {
            // Arrange
            const {drafts, useCases} = setUp();
            drafts.save(
                newDraft({
                    itemId: "abc",
                    item: generateTestPerseusItem({
                        question: generateTestPerseusRenderer({
                            content: "[[☃ radio 1]]",
                        }),
                    }),
                    now: new Date(),
                }),
            );

            // Act
            const result = useCases.validateItem({itemId: "abc"});

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

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const {useCases} = setUp();

            // Act, Assert
            expect(() => useCases.validateItem({itemId: "nope"})).toThrow(
                DraftNotFoundError,
            );
        });
    });

    describe("dataSchema", () => {
        it("returns the text of perseus-core's data-schema.ts", () => {
            // Arrange
            const {useCases} = setUp();

            // Act
            const text = useCases.dataSchema();

            // Assert
            expect(text).toContain("export type PerseusItem =");
        });
    });
});
