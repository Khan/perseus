import {getEntryPoints} from "./get-entry-points";

describe("getEntryPoints", () => {
    it("returns a single index entry for a package with no exports map", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({source: "src/index.ts"});

        expect(entryPoints).toEqual({index: "src/index.ts"});
    });

    it("returns one entry per exports sub-path with a source condition", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({
            source: "src/index.ts",
            exports: {
                ".": {source: "./src/index.ts"},
                "./strings": {source: "./src/strings.ts"},
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
            source: "src/index.ts",
            exports: {
                ".": {source: "./src/index.ts"},
                "./styles.css": "./dist/index.css",
            },
        });

        expect(entryPoints).toEqual({index: "./src/index.ts"});
    });

    it("ignores the top-level source field when an exports map is present", () => {
        // Sources that no sub-path declares must not be built:
        // index.item-splitting.ts is an unpublished entry point that CI builds
        // from source itself.
        const entryPoints = getEntryPoints({
            source: "src/index.item-splitting.ts",
            exports: {".": {source: "./src/index.ts"}},
        });

        expect(entryPoints).toEqual({index: "./src/index.ts"});
    });
});
