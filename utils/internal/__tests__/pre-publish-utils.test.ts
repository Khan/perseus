import fs from "fs";

import {
    checkEntrypoints,
    checkExports,
    checkExportTargets,
} from "../pre-publish-utils";

describe("checkExports", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("returns false when exports is missing", () => {
        const result = checkExports({name: "@khanacademy/kmath"});

        expect(result).toBe(false);
    });

    it("returns false when exports has no '.' entry", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {"./styles.css": "./dist/index.css"},
        });

        expect(result).toBe(false);
    });

    it("returns true for a well-formed map", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./dist/index.js"},
        });

        expect(result).toBe(true);
    });
});

describe("checkExportTargets", () => {
    const pkgJson = {
        name: "@khanacademy/kmath",
        exports: {
            ".": {
                types: "./dist/index.d.ts",
                source: "./src/index.ts",
                default: "./dist/index.js",
            },
            "./styles.css": "./dist/index.css",
        },
    };

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("returns true when every declared target exists", () => {
        // Arrange
        jest.spyOn(fs, "existsSync").mockReturnValue(true);

        // Act
        const result = checkExportTargets(pkgJson, "/packages/kmath");

        expect(result).toBe(true);
    });

    it("returns false when a declared target is missing from dist", () => {
        // Arrange
        jest.spyOn(fs, "existsSync").mockImplementation(
            (file) => file !== "/packages/kmath/dist/index.css",
        );

        // Act
        const result = checkExportTargets(pkgJson, "/packages/kmath");

        expect(result).toBe(false);
    });

    it("ignores the source condition, which points at src", () => {
        // Arrange
        jest.spyOn(fs, "existsSync").mockImplementation(
            (file) => !String(file).includes("/src/"),
        );

        // Act
        const result = checkExportTargets(pkgJson, "/packages/kmath");

        expect(result).toBe(true);
    });
});

describe("checkEntrypoints", () => {
    const esmOnlyPkgJson = {
        name: "@khanacademy/kmath",
        type: "module",
        exports: {
            ".": {
                types: "./dist/index.d.ts",
                source: "./src/index.ts",
                default: "./dist/index.js",
            },
        },
    };

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("returns true for an ESM-only package", () => {
        const result = checkEntrypoints(esmOnlyPkgJson);

        expect(result).toBe(true);
    });

    it("returns false when type is not 'module'", () => {
        const result = checkEntrypoints({...esmOnlyPkgJson, type: "commonjs"});

        expect(result).toBe(false);
    });

    it("returns false when main is present", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            main: "dist/index.js",
        });

        expect(result).toBe(false);
    });

    it("returns false when a sub-path declares a require condition", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            exports: {
                ...esmOnlyPkgJson.exports,
                "./strings": {
                    types: "./dist/strings.d.ts",
                    require: "./dist/strings.cjs",
                },
            },
        });

        expect(result).toBe(false);
    });
});
