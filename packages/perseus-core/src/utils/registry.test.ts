import Registry from "./registry";

describe("Registry", () => {
    const defaultMessage = "Registry accessed before initialization!";

    it("throws when calling get before setting anything", () => {
        const registry: any = new Registry();
        expect(() => registry.get("radio")).toThrow(defaultMessage);
    });

    it("does not throw when calling get after setting", () => {
        const registry: any = new Registry();
        registry.set("radio", "hello");
        expect(() => registry.get("radio")).not.toThrow(defaultMessage);
        expect(registry.get("radio")).toBe("hello");
    });

    it("throws when calling has before setting anything", () => {
        const registry: any = new Registry();
        expect(() => registry.has("radio")).toThrow(defaultMessage);
    });

    it("does not throw when calling has after setting", () => {
        const registry: any = new Registry();
        registry.set("radio", "hello");
        expect(() => registry.has("radio")).not.toThrow(defaultMessage);
        expect(registry.has("radio")).toBe(true);
    });

    it("throws when calling entries before setting anything", () => {
        const registry: any = new Registry();
        expect(() => registry.entries()).toThrow(defaultMessage);
    });

    it("does not throw when calling entries after setting", () => {
        const registry: any = new Registry();
        registry.set("radio", "hello");
        expect(() => registry.entries()).not.toThrow(defaultMessage);
        expect(registry.entries("radio")).toEqual([["radio", "hello"]]);
    });

    it("throws when calling keys before setting anything", () => {
        const registry: any = new Registry();
        expect(() => registry.keys()).toThrow(defaultMessage);
    });

    it("does not throw when calling keys after setting", () => {
        const registry: any = new Registry();
        registry.set("radio", "hello");
        expect(() => registry.keys()).not.toThrow(defaultMessage);
        expect(registry.keys("radio")).toEqual(["radio"]);
    });

    it("accepts an optional name", () => {
        const registry: any = new Registry("TestName");
        expect(() => registry.get("radio")).toThrow(
            "TestName accessed before initialization!",
        );
    });

    describe("aliases", () => {
        function createAliasedRegistry() {
            const registry = new Registry<string>("Aliased", {
                aliases: {keys: ["old-a", "old-b"], value: "standin"},
            });
            registry.set("radio", "hello");
            return registry;
        }

        it("returns the alias value for every aliased key", () => {
            const registry = createAliasedRegistry();

            expect(registry.get("old-a")).toBe("standin");
            expect(registry.get("old-b")).toBe("standin");
        });

        it("reports aliased keys as present", () => {
            const registry = createAliasedRegistry();

            expect(registry.has("old-a")).toBe(true);
        });

        it("includes aliased keys in keys()", () => {
            const registry = createAliasedRegistry();

            expect(registry.keys()).toEqual(["old-a", "old-b", "radio"]);
        });

        it("excludes aliased keys from entries()", () => {
            const registry = createAliasedRegistry();

            expect(registry.entries()).toEqual([["radio", "hello"]]);
        });

        it("throws when registering an aliased key", () => {
            const registry = createAliasedRegistry();

            expect(() => registry.set("old-a", "nope")).toThrow(
                'Aliased: "old-a" is an alias and cannot be registered.',
            );
        });

        it("still throws on access before anything is registered", () => {
            const registry = new Registry<string>("Aliased", {
                aliases: {keys: ["old-a"], value: "standin"},
            });

            expect(() => registry.get("old-a")).toThrow(
                "Aliased accessed before initialization!",
            );
        });
    });
});
