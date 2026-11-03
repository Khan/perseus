/**
 * @jest-environment node
 */
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../../adapters/fs/perseus-core-schema-source";
import {createCatalog} from "../../app/catalog";

import type {WidgetCatalog} from "./widgets";

describe("WidgetCatalog", () => {
    let widgets: WidgetCatalog;

    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
        // The real perseus-core schema, so the tests catch changes to it.
        widgets = createCatalog(createPerseusCoreSchemaSource()).widgets();
    });

    describe("types", () => {
        it("lists the widgets Perseus supports", () => {
            // Arrange, Act
            const types = widgets.types();

            // Assert
            expect(types).toEqual(
                expect.arrayContaining([
                    "radio",
                    "numeric-input",
                    "expression",
                    "dropdown",
                    "image",
                    "free-response",
                ]),
            );
        });

        it("leaves out types that only appear in doc comments", () => {
            // Arrange, Act
            const types = widgets.types();

            // Assert
            expect(types).not.toContain("new-awesomeness");
        });
    });

    describe("spec", () => {
        it("includes the documented options type from data-schema.ts", () => {
            // Arrange, Act
            const spec = widgets.spec("radio");

            // Assert
            expect(spec.optionsType).toContain(
                "export type PerseusRadioWidgetOptions",
            );
        });

        it("pulls in the helper types the options refer to", () => {
            // Arrange, Act
            const spec = widgets.spec("radio");

            // Assert
            expect(spec.optionsType).toContain(
                "export type PerseusRadioChoice",
            );
        });

        it("includes the user input type for widgets that take input", () => {
            // Arrange, Act
            const spec = widgets.spec("dropdown");

            // Assert
            expect(spec.userInputType).toContain("PerseusDropdownUserInput");
        });

        it("has no user input type for display-only widgets", () => {
            // Arrange, Act
            const spec = widgets.spec("image");

            // Assert
            expect(spec.userInputType).toBeNull();
        });
    });

    describe("status", () => {
        it("marks free-response as do-not-use", () => {
            // Arrange, Act
            const status = widgets.status("free-response");

            // Assert
            expect(status).toBe("do-not-use");
        });

        it("marks deprecated widgets as avoid", () => {
            // Arrange, Act
            const statuses = ["grapher", "plotter"].map(widgets.status);

            // Assert
            expect(statuses).toEqual(["avoid", "avoid"]);
        });

        it("marks other widgets as supported", () => {
            // Arrange, Act
            const status = widgets.status("radio");

            // Assert
            expect(status).toBe("supported");
        });
    });
});
