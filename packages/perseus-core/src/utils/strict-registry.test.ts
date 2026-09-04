import Registry from "./registry";
import {
    isStrictRegistration,
    setStrictRegistration,
    strictGet,
    withStrictRegistration,
} from "./strict-registry";

describe("strictGet", () => {
    function registryWithRadio(): Registry<string> {
        const registry = new Registry<string>();
        registry.set("radio", "radio widget");
        return registry;
    }

    afterEach(() => {
        setStrictRegistration(false);
    });

    it("returns the registered value", () => {
        // Arrange, Act
        const value = strictGet(
            registryWithRadio(),
            "radio",
            "registerWidgets([radioWidget])",
        );

        expect(value).toBe("radio widget");
    });

    it("throws naming the missing widget and the fix when strict", () => {
        // Arrange
        setStrictRegistration(true);

        // Act, Assert
        expect(() =>
            strictGet(
                registryWithRadio(),
                "plotter",
                "registerWidgets([plotterWidget])",
            ),
        ).toThrow(
            'Widget "plotter" is not registered. ' +
                "Register it first: registerWidgets([plotterWidget]).",
        );
    });

    it("returns undefined for a missing widget when not strict", () => {
        // Arrange
        setStrictRegistration(false);

        // Act
        const value = strictGet(
            registryWithRadio(),
            "plotter",
            "registerWidgets([plotterWidget])",
        );

        expect(value).toBeUndefined();
    });
});

describe("the default setting", () => {
    async function freshIsStrictRegistration(
        nodeEnv: string,
    ): Promise<boolean> {
        jest.replaceProperty(process.env, "NODE_ENV", nodeEnv);
        jest.resetModules();
        const module = await import("./strict-registry");
        return module.isStrictRegistration();
    }

    it("is off in production", async () => {
        // Arrange, Act
        const strict = await freshIsStrictRegistration("production");

        expect(strict).toBe(false);
    });

    it("is on outside production", async () => {
        // Arrange, Act
        const strict = await freshIsStrictRegistration("development");

        expect(strict).toBe(true);
    });
});

describe("withStrictRegistration", () => {
    afterEach(() => {
        setStrictRegistration(false);
    });

    it("restores the previous setting after the call throws", () => {
        // Arrange
        setStrictRegistration(true);

        // Act
        expect(() =>
            withStrictRegistration(false, () => {
                throw new Error("boom");
            }),
        ).toThrow("boom");

        expect(isStrictRegistration()).toBe(true);
    });

    it("restores the outer setting when scopes nest", () => {
        // Arrange
        setStrictRegistration(true);

        // Act
        const inner = withStrictRegistration(false, () =>
            withStrictRegistration(true, () => isStrictRegistration()),
        );

        expect(inner).toBe(true);
        expect(isStrictRegistration()).toBe(true);
    });
});
