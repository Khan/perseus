import {DeprecatedWidgetTypes} from "../data-schema";

import {createWidgetRegistry} from "./create-widget-registry";

describe("createWidgetRegistry", () => {
    function createRegistry() {
        const registry = createWidgetRegistry<string>("Test", "standin");
        registry.set("radio", "radio-impl");
        return registry;
    }

    it.each(DeprecatedWidgetTypes)(
        "resolves deprecated widget type %s to the standin",
        (type) => {
            // Arrange, Act
            const registry = createRegistry();

            expect(registry.get(type)).toBe("standin");
        },
    );

    it("resolves deprecated-standin to the standin", () => {
        // Arrange, Act
        const registry = createRegistry();

        expect(registry.get("deprecated-standin")).toBe("standin");
    });

    it("resolves registered widget types to their implementation", () => {
        // Arrange, Act
        const registry = createRegistry();

        expect(registry.get("radio")).toBe("radio-impl");
    });

    it.each([...DeprecatedWidgetTypes, "deprecated-standin"])(
        "throws when registering %s",
        (type) => {
            // Arrange
            const registry = createRegistry();

            // Act, Assert
            expect(() => registry.set(type, "nope")).toThrow(
                "cannot be registered",
            );
        },
    );
});
