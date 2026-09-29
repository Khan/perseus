import {checkEntrypoints, checkExports} from "./pre-publish-utils";

describe("checkExports", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("rejects when exports is missing", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("rejects when publishConfig.exports is missing", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./src/index.ts"},
        });

        expect(result).toBe(false);
    });

    it("rejects when exports has no '.' entry", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {"./strings": "./src/strings.ts"},
            publishConfig: {exports: {"./strings": "./dist/strings.js"}},
        });

        expect(result).toBe(false);
    });

    it("accepts code exports in both maps and asset exports only in publishConfig.exports", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./src/index.ts"},
            publishConfig: {
                exports: {
                    ".": "./dist/index.js",
                    "./styles.css": "./dist/index.css",
                },
            },
        });

        expect(result).toBe(true);
    });

    it("rejects when an asset export appears in exports", () => {
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

        expect(result).toBe(false);
    });

    it("rejects when a published JS export has no source file in exports", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./src/index.ts"},
            publishConfig: {
                exports: {
                    ".": "./dist/index.js",
                    "./strings": "./dist/strings.js",
                },
            },
        });

        expect(result).toBe(false);
    });

    it("rejects when a sub-path is missing from the published exports", () => {
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

    it("rejects when a code export does not point at a source file", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./dist/index.js"},
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("rejects when an export uses conditions", () => {
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {
                ".": {source: "./src/index.ts", default: "./dist/index.js"},
            },
            publishConfig: {exports: {".": "./dist/index.js"}},
        });

        expect(result).toBe(false);
    });

    it("rejects when publishConfig's output paths do not match the sub-path", () => {
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

    it("accepts an ESM-only package", () => {
        const result = checkEntrypoints(esmOnlyPkgJson);

        expect(result).toBe(true);
    });

    it("rejects when type is not 'module'", () => {
        const result = checkEntrypoints({...esmOnlyPkgJson, type: "commonjs"});

        expect(result).toBe(false);
    });

    it("rejects when main is present", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            main: "dist/index.js",
        });

        expect(result).toBe(false);
    });

    it("rejects when a top-level source field is present", () => {
        const result = checkEntrypoints({
            ...esmOnlyPkgJson,
            source: "src/index.ts",
        });

        expect(result).toBe(false);
    });

    it("rejects when a published sub-path declares a require (CJS) condition", () => {
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
