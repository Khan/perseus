import {getEntryPoints} from "./get-entry-points";

describe("getEntryPoints", () => {
    const sourceOnlyPackage = {exports: {".": "./src/index.ts"}};

    it("throws when package metadata is not an object", () => {
        expect(() => getEntryPoints(null)).toThrow(TypeError);
    });

    it("throws when source exports map is missing", () => {
        expect(() => getEntryPoints({})).toThrow(TypeError);
    });

    it("throws when source exports map is not an object", () => {
        expect(() => getEntryPoints({exports: []})).toThrow(TypeError);
    });

    it("throws when a source export path is not a string", () => {
        expect(() => getEntryPoints({exports: {".": 42}})).toThrow(TypeError);
    });

    it("throws when publishConfig is missing", () => {
        expect(() => getEntryPoints(sourceOnlyPackage)).toThrow(TypeError);
    });

    it("throws when publishConfig is not an object", () => {
        expect(() =>
            getEntryPoints({...sourceOnlyPackage, publishConfig: []}),
        ).toThrow(TypeError);
    });

    it("throws when published exports map is missing", () => {
        expect(() =>
            getEntryPoints({...sourceOnlyPackage, publishConfig: {}}),
        ).toThrow(TypeError);
    });

    it("throws when published exports map is not an object", () => {
        expect(() =>
            getEntryPoints({
                ...sourceOnlyPackage,
                publishConfig: {exports: []},
            }),
        ).toThrow(TypeError);
    });

    it("throws when a published export path is not a string", () => {
        expect(() =>
            getEntryPoints({
                ...sourceOnlyPackage,
                publishConfig: {exports: {".": false}},
            }),
        ).toThrow(TypeError);
    });

    it("returns one entry per sub-path that maps a source file to a published JS file", () => {
        const entryPoints = getEntryPoints({
            exports: {
                ".": "./src/index.ts",
                "./strings": "./src/strings.ts",
            },
            publishConfig: {
                exports: {
                    ".": "./dist/index.js",
                    "./strings": "./dist/strings.js",
                },
            },
        });

        expect(entryPoints).toEqual({
            index: "./src/index.ts",
            strings: "./src/strings.ts",
        });
    });

    it("skips sub-paths that export a built asset", () => {
        const entryPoints = getEntryPoints({
            exports: {".": "./src/index.ts"},
            publishConfig: {
                exports: {
                    ".": "./dist/index.js",
                    "./styles.css": "./dist/index.css",
                },
            },
        });

        expect(entryPoints).toEqual({index: "./src/index.ts"});
    });

    it("skips sub-paths with no published export", () => {
        const entryPoints = getEntryPoints({
            exports: {".": "./src/index.ts"},
            publishConfig: {exports: {"./other": "./dist/other.js"}},
        });

        expect(entryPoints).toEqual({});
    });
});
