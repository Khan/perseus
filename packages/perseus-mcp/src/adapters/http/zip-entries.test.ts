/**
 * @jest-environment node
 */
import {jsonFilesInZip, ZipReadError} from "./zip-entries";
import {makeZip} from "./zip-entries.testutils";

const MAX = 1_000_000;

describe("jsonFilesInZip", () => {
    it("returns the .json files, deflated or stored, by file name", () => {
        // Arrange
        const zip = makeZip([
            {name: "exports/one.json", text: '{"a": 1}'},
            {name: "two.json", text: '{"b": 2}', stored: true},
        ]);

        // Act
        const files = jsonFilesInZip(zip, {maxBytes: MAX});

        // Assert
        expect(files).toEqual([
            {fileName: "one.json", text: '{"a": 1}'},
            {fileName: "two.json", text: '{"b": 2}'},
        ]);
    });

    it("leaves out other files, macOS copies and hidden files", () => {
        // Arrange
        const zip = makeZip([
            {name: "notes.txt", text: "hello"},
            {name: "__MACOSX/._one.json", text: "junk"},
            {name: ".hidden.json", text: "{}"},
            {name: "one.json", text: "{}"},
        ]);

        // Act
        const files = jsonFilesInZip(zip, {maxBytes: MAX});

        // Assert
        expect(files.map((file) => file.fileName)).toEqual(["one.json"]);
    });

    it("refuses files larger than the limit unzipped", () => {
        // Arrange
        const zip = makeZip([{name: "big.json", text: "x".repeat(2_000)}]);

        // Act, Assert
        expect(() => jsonFilesInZip(zip, {maxBytes: 1_000})).toThrow(
            ZipReadError,
        );
    });

    it("refuses something that isn't a zip", () => {
        // Arrange, Act, Assert
        expect(() =>
            jsonFilesInZip(Buffer.from("not a zip at all, just text"), {
                maxBytes: MAX,
            }),
        ).toThrow("This isn't a zip file.");
    });
});
