import {
    parseBuildPackageMetadata,
    parseRecord,
    parseStringRecord,
} from "./package-json-parser";

describe("parseRecord", () => {
    it.each<[string, unknown]>([
        ["null", null],
        ["an array", []],
        ["a string", "{}"],
        ["undefined", undefined],
    ])("throws when the value is %s", (_description, value) => {
        expect(() => parseRecord(value, "field")).toThrow(
            new TypeError("Expected field to be an object."),
        );
    });

    it("returns the value when it is an object", () => {
        const value = {a: 1};

        expect(parseRecord(value, "field")).toBe(value);
    });
});

describe("parseStringRecord", () => {
    it("throws when the value is not an object", () => {
        expect(() => parseStringRecord([], "field")).toThrow(
            new TypeError("Expected field to be an object."),
        );
    });

    it("throws naming the key whose value is not a string", () => {
        expect(() => parseStringRecord({a: "x", b: 1}, "field")).toThrow(
            new TypeError("Expected field.b to be a string."),
        );
    });

    it("returns the entries when every value is a string", () => {
        const record = parseStringRecord({a: "x", b: "y"}, "field");

        expect(record).toEqual({a: "x", b: "y"});
    });
});

describe("parseBuildPackageMetadata", () => {
    it("returns dependencies, peerDependencies, and version", () => {
        const metadata = parseBuildPackageMetadata({
            name: "@khanacademy/example",
            version: "1.2.3",
            dependencies: {react: "^18.0.0"},
            peerDependencies: {"react-dom": "^18.0.0"},
        });

        expect(metadata).toEqual({
            dependencies: {react: "^18.0.0"},
            peerDependencies: {"react-dom": "^18.0.0"},
            version: "1.2.3",
        });
    });

    it("returns empty dependency maps when they are missing", () => {
        const metadata = parseBuildPackageMetadata({version: "1.2.3"});

        expect(metadata).toEqual({
            dependencies: {},
            peerDependencies: {},
            version: "1.2.3",
        });
    });

    it("throws when package metadata is not an object", () => {
        expect(() => parseBuildPackageMetadata(null)).toThrow(
            new TypeError("Expected package.json to be an object."),
        );
    });

    it("throws when version is missing", () => {
        expect(() => parseBuildPackageMetadata({})).toThrow(
            new TypeError("Expected package.json.version to be a string."),
        );
    });

    it("throws when dependencies is not an object", () => {
        expect(() =>
            parseBuildPackageMetadata({version: "1.2.3", dependencies: []}),
        ).toThrow(
            new TypeError(
                "Expected package.json.dependencies to be an object.",
            ),
        );
    });

    it("throws when a peer dependency range is not a string", () => {
        expect(() =>
            parseBuildPackageMetadata({
                version: "1.2.3",
                peerDependencies: {react: 18},
            }),
        ).toThrow(
            new TypeError(
                "Expected package.json.peerDependencies.react to be a string.",
            ),
        );
    });
});
