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
            const registry = createRegistry();

            expect(registry.get(type)).toBe("standin");
        },
    );

    it("resolves deprecated-standin to the standin", () => {
        const registry = createRegistry();

        expect(registry.get("deprecated-standin")).toBe("standin");
    });

    it("resolves registered widget types to their implementation", () => {
        const registry = createRegistry();

        expect(registry.get("radio")).toBe("radio-impl");
    });

    it.each([...DeprecatedWidgetTypes, "deprecated-standin"])(
        "throws when registering deprecated widget: %s",
        (type) => {
            const registry = createRegistry();

            expect(() => registry.set(type, "nope")).toThrow(
                "cannot be registered",
            );
        },
    );
});
