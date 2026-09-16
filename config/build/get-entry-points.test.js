import {getEntryPoints} from "./get-entry-points";

describe("getEntryPoints", () => {
    it("returns no entries for a package with no exports map", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({});

        expect(entryPoints).toEqual({});
    });

    it("returns one entry per exports sub-path with source and default conditions", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({
            exports: {
                ".": {
                    source: "./src/index.ts",
                    default: "./dist/index.js",
                },
                "./strings": {
                    source: "./src/strings.ts",
                    default: "./dist/strings.js",
                },
            },
        });

        expect(entryPoints).toEqual({
            index: "./src/index.ts",
            strings: "./src/strings.ts",
        });
    });

    it("skips exports sub-paths with no source condition", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({
            exports: {
                ".": {
                    source: "./src/index.ts",
                    default: "./dist/index.js",
                },
                "./styles.css": "./dist/index.css",
            },
        });

        expect(entryPoints).toEqual({index: "./src/index.ts"});
    });

    it("skips exports sub-paths with no default condition", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({
            exports: {
                ".": {source: "./src/index.ts"},
            },
        });

        expect(entryPoints).toEqual({});
    });
});
