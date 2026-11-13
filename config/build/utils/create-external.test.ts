import {createExternal} from "./create-external";

describe("createExternal", () => {
    it.each(["abc", "abc/subpath-export"])(
        "returns true for dependency import %s",
        (id) => {
            const isExternal = createExternal({
                dependencies: {abc: "^1.0.0"},
                peerDependencies: {},
            });

            expect(isExternal(id)).toBe(true);
        },
    );

    it.each([
        "@some-scope/some-package",
        "@some-scope/some-package/subpath-export",
    ])("returns true for peer dependency import %s", (id) => {
        const isExternal = createExternal({
            dependencies: {},
            peerDependencies: {"@some-scope/some-package": "^1.0.0"},
        });

        expect(isExternal(id)).toBe(true);
    });

    it("returns false for a package whose name only starts with a dependency's name", () => {
        const isExternal = createExternal({
            dependencies: {abc: "^1.0.0"},
            peerDependencies: {},
        });

        expect(isExternal("abc-server")).toBe(false);
    });

    it.each(["./local", "/abs/path/file.ts", "lodash"])(
        "returns false for non-dependency import %s",
        (id) => {
            const isExternal = createExternal({
                dependencies: {abc: "^1.0.0"},
                peerDependencies: {},
            });

            expect(isExternal(id)).toBe(false);
        },
    );

    it("returns false for a dependency's stylesheet", () => {
        const isExternal = createExternal({
            dependencies: {abc: "^1.0.0"},
            peerDependencies: {},
        });

        expect(isExternal("abc/styles.css")).toBe(false);
    });
});
