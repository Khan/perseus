import {getEntryPoints} from "./get-entry-points";

describe("getEntryPoints", () => {
    const sourceOnlyPackage = {exports: {".": "./src/index.ts"}};

    it.each<[string, unknown]>([
        ["package metadata is not an object", null],
        ["source exports map is missing", {}],
        ["source exports map is not an object", {exports: []}],
        ["a source export path is not a string", {exports: {".": 42}}],
        ["publishConfig is missing", sourceOnlyPackage],
        [
            "publishConfig is not an object",
            {...sourceOnlyPackage, publishConfig: []},
        ],
        [
            "published exports map is missing",
            {...sourceOnlyPackage, publishConfig: {}},
        ],
        [
            "published exports map is not an object",
            {...sourceOnlyPackage, publishConfig: {exports: []}},
        ],
        [
            "a published export path is not a string",
            {...sourceOnlyPackage, publishConfig: {exports: {".": false}}},
        ],
    ])("throws when %s", (_description, packageJson) => {
        expect(() => getEntryPoints(packageJson)).toThrow(TypeError);
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

    it("names each entry after its published file", () => {
        // Arrange, Act
        const entryPoints = getEntryPoints({
            exports: {"./widgets": "./src/widgets/index.ts"},
            publishConfig: {
                exports: {"./widgets": "./dist/widgets/index.js"},
            },
        });

        expect(entryPoints).toEqual({
            "widgets/index": "./src/widgets/index.ts",
        });
    });

    it("returns one entry per source file matching a wildcard sub-path", () => {
        // Arrange
        const glob = jest
            .fn()
            .mockReturnValue([
                "src/widgets/radio/index.ts",
                "src/widgets/matcher/index.ts",
            ]);

        // Act
        const entryPoints = getEntryPoints(
            {
                exports: {"./widgets/*": "./src/widgets/*/index.ts"},
                publishConfig: {
                    exports: {"./widgets/*": "./dist/widgets/*/index.js"},
                },
            },
            glob,
        );

        // Assert
        expect(glob).toHaveBeenCalledWith("./src/widgets/*/index.ts");
        expect(entryPoints).toEqual({
            "widgets/radio/index": "./src/widgets/radio/index.ts",
            "widgets/matcher/index": "./src/widgets/matcher/index.ts",
        });
    });
});
