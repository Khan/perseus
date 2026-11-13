import {parsePackageJson} from "./parse-package-json";

describe("parsePackageJson", () => {
    const validPackageJson = {
        name: "@khanacademy/example",
        version: "1.2.3",
        dependencies: {react: "^18.0.0"},
        peerDependencies: {"react-dom": "^18.0.0"},
        exports: {".": "./src/index.ts"},
        publishConfig: {exports: {".": "./dist/index.js"}},
    };

    it("returns the fields the build reads", () => {
        const metadata = parsePackageJson(validPackageJson);

        expect(metadata).toEqual({
            dependencies: {react: "^18.0.0"},
            peerDependencies: {"react-dom": "^18.0.0"},
            version: "1.2.3",
            exports: {".": "./src/index.ts"},
            publishedExports: {".": "./dist/index.js"},
        });
    });

    it("returns empty dependency maps when they are missing", () => {
        const metadata = parsePackageJson({
            ...validPackageJson,
            dependencies: undefined,
            peerDependencies: undefined,
        });

        expect(metadata).toMatchObject({
            dependencies: {},
            peerDependencies: {},
        });
    });

    it("throws when package metadata is not an object", () => {
        expect(() => parsePackageJson(null)).toThrow(
            new TypeError("Expected package.json to be an object."),
        );
    });

    it("throws when package metadata is an array", () => {
        expect(() => parsePackageJson([])).toThrow(
            new TypeError("Expected package.json to be an object."),
        );
    });

    it("throws when version is missing", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                version: undefined,
            }),
        ).toThrow(
            new TypeError("Expected package.json.version to be a string."),
        );
    });

    it("throws when dependencies is not an object", () => {
        expect(() =>
            parsePackageJson({...validPackageJson, dependencies: []}),
        ).toThrow(
            new TypeError(
                "Expected package.json.dependencies to be an object.",
            ),
        );
    });

    it("throws when a peer dependency range is not a string", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                peerDependencies: {react: 18},
            }),
        ).toThrow(
            new TypeError(
                'Expected package.json.peerDependencies["react"] to be a string.',
            ),
        );
    });

    it("throws when the source exports map is missing", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                exports: undefined,
            }),
        ).toThrow(
            new TypeError("Expected package.json.exports to be an object."),
        );
    });

    it("throws when a source export path is not a string", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                exports: {".": 42},
            }),
        ).toThrow(
            new TypeError('Expected package.json.exports["."] to be a string.'),
        );
    });

    it("throws when publishConfig is missing", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                publishConfig: undefined,
            }),
        ).toThrow(
            new TypeError(
                "Expected package.json.publishConfig to be an object.",
            ),
        );
    });

    it("throws when the published exports map is missing", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                publishConfig: {},
            }),
        ).toThrow(
            new TypeError(
                "Expected package.json.publishConfig.exports to be an object.",
            ),
        );
    });

    it("throws when a published export path is not a string", () => {
        expect(() =>
            parsePackageJson({
                ...validPackageJson,
                publishConfig: {exports: {".": false}},
            }),
        ).toThrow(
            new TypeError(
                'Expected package.json.publishConfig.exports["."] to be a string.',
            ),
        );
    });
});
