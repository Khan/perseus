import {getEntryPoints} from "./get-entry-points";

describe("getEntryPoints", () => {
    it("returns no entries for a package with no exports map", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({});

        expect(entryPoints).toEqual({});
    });

    it("returns one entry per sub-path that maps a source file to a published JS file", () => {
        // Arrange, Act
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
        // Arrange, Act
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
        // Arrange, Act
        const entryPoints = getEntryPoints({
            exports: {".": "./src/index.ts"},
        });

        expect(entryPoints).toEqual({});
    });
});
