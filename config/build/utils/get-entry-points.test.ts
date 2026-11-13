import {getEntryPoints} from "./get-entry-points";

describe("getEntryPoints", () => {
    it("returns one entry per sub-path that maps a source file to a published JS file", () => {
        const entryPoints = getEntryPoints({
            exports: {
                ".": "./src/index.ts",
                "./strings": "./src/strings.ts",
            },
            publishedExports: {
                ".": "./dist/index.js",
                "./strings": "./dist/strings.js",
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
            publishedExports: {
                ".": "./dist/index.js",
                "./styles.css": "./dist/index.css",
            },
        });

        expect(entryPoints).toEqual({index: "./src/index.ts"});
    });

    it("skips sub-paths with no published export", () => {
        const entryPoints = getEntryPoints({
            exports: {".": "./src/index.ts"},
            publishedExports: {"./other": "./dist/other.js"},
        });

        expect(entryPoints).toEqual({});
    });

    it("skips sub-paths whose source file is outside src/", () => {
        const entryPoints = getEntryPoints({
            exports: {"./package.json": "./package.json"},
            publishedExports: {"./package.json": "./package.json"},
        });

        expect(entryPoints).toEqual({});
    });
});
