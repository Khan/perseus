import Registry, {resetRegistry} from "./registry";

describe("Registry", () => {
    const defaultMessage = "Registry accessed before initialization!";

    it("reports whether any value has been registered", () => {
        const registry = new Registry<string>();

        expect(registry.isInitialized()).toBe(false);

        registry.set("radio", "hello");

        expect(registry.isInitialized()).toBe(true);

        resetRegistry(registry);

        expect(registry.isInitialized()).toBe(false);
    });

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
        expect([...registry.entries()]).toEqual([["radio", "hello"]]);
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

    it("keeps the first value when a key is registered twice", () => {
        const registry = new Registry<string>();
        registry.set("radio", "first");

        registry.set("radio", "second");

        expect(registry.get("radio")).toBe("first");
    });

    it("overwrites an existing value when replaced", () => {
        const registry = new Registry<string>();
        registry.set("radio", "first");

        registry.replace("radio", "second");

        expect(registry.get("radio")).toBe("second");
    });

    it("throws the initialization error again after a reset", () => {
        const registry = new Registry<string>();
        registry.set("radio", "hello");

        resetRegistry(registry);

        expect(() => registry.get("radio")).toThrow(defaultMessage);
    });

    it("discards previously registered entries when reset", () => {
        const registry = new Registry<string>();
        registry.set("radio", "hello");

        resetRegistry(registry);
        registry.set("radio", "goodbye");

        expect(registry.keys()).toEqual(["radio"]);
        expect(registry.get("radio")).toBe("goodbye");
    });

    it("accepts an optional name", () => {
        const registry: any = new Registry("TestName");
        expect(() => registry.get("radio")).toThrow(
            "TestName accessed before initialization!",
        );
    });
});
