import {checkEntrypoints, checkExports} from "../pre-publish-utils";

describe("checkExports", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("returns false when exports is missing", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("returns false when publishConfig.exports is missing", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./src/index.ts"},
        });

        expect(result).toBe(false);
    });

    it("returns false when exports has no '.' entry", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {"./styles.css": "./dist/index.css"},
            publishConfig: {exports: {"./styles.css": "./dist/index.css"}},
        });

        expect(result).toBe(false);
    });

    it("returns true for well-formed code and asset exports", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": "./src/index.ts",
                "./styles.css": "./dist/index.css",
            },
            publishConfig: {
                exports: {
                    ".": "./dist/index.js",
                    "./styles.css": "./dist/index.css",
                },
            },
        });

        expect(result).toBe(true);
    });

    it("returns false when a sub-path is missing from the published exports", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": "./src/index.ts",
                "./strings": "./src/strings.ts",
            },
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("returns false when a code export does not point at a source file", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./dist/index.js"},
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("returns false when an export uses conditions", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": {source: "./src/index.ts", default: "./dist/index.js"},
            },
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("returns false when output paths do not match the sub-path", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./src/index.ts"},
            publishConfig: {exports: {".": "./dist/other.js"}},
        });

        expect(result).toBe(false);
    });
});

describe("checkEntrypoints", () => {
    const esmOnlyPkgJson = {
        name: "@khanacademy/kmath",
        type: "module",
        exports: {".": "./src/index.ts"},
        publishConfig: {exports: {".": "./dist/index.js"}},
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

    it("returns false when a published sub-path declares a require condition", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            publishConfig: {
                exports: {
                    ...esmOnlyPkgJson.publishConfig.exports,
                    "./strings": {
                        require: "./dist/strings.cjs",
                    },
                },
            },
        });

        expect(result).toBe(false);
    });
});
