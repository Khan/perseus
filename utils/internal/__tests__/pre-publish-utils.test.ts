import {checkEntrypoints, checkExports} from "../pre-publish-utils";

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

    it("returns true for well-formed code and asset exports", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": {
                    source: "./src/index.ts",
                    default: "./dist/index.js",
                },
                "./styles.css": "./dist/index.css",
            },
        });

        expect(result).toBe(true);
    });

    it("returns true for a source-only sub-path", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": {
                    source: "./src/index.ts",
                    default: "./dist/index.js",
                },
                "./internal": {source: "./src/internal.ts"},
            },
        });

        expect(result).toBe(true);
    });

    it("returns false when a code export omits its source condition", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": {
                    default: "./dist/index.js",
                },
            },
        });

        expect(result).toBe(false);
    });

    it("returns false when output paths do not match the sub-path", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": {
                    source: "./src/index.ts",
                    default: "./dist/other.js",
                },
            },
        });

        expect(result).toBe(false);
    });
});

describe("checkEntrypoints", () => {
    const esmOnlyPkgJson = {
        name: "@khanacademy/kmath",
        type: "module",
        exports: {
            ".": {
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

    it("returns false when a top-level source field is present", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            source: "src/index.ts",
        });

        expect(result).toBe(false);
    });

    it("returns false when a sub-path declares a require condition", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            exports: {
                ...esmOnlyPkgJson.exports,
                "./strings": {
                    require: "./dist/strings.cjs",
                },
            },
        });

        expect(result).toBe(false);
    });
});
