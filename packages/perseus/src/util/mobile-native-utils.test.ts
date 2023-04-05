import {isFileProtocol} from "./mobile-native-utils";

describe("isFileProtocol", () => {
    it("If protocol is falsy, returns false", () => {
        expect(isFileProtocol(undefined)).toEqual(false);
        expect(isFileProtocol(null)).toEqual(false);
        expect(isFileProtocol("")).toEqual(false);
    });

    it("If protocol is file, returns true", () => {
        expect(isFileProtocol("file:")).toEqual(true);
        expect(isFileProtocol("File:")).toEqual(true);
        expect(isFileProtocol("FILE:")).toEqual(true);
    });

    it("If protocol is not file, returns false", () => {
        expect(isFileProtocol("ftp:")).toEqual(false);
        expect(isFileProtocol("http:")).toEqual(false);
        expect(isFileProtocol("https:")).toEqual(false);
        expect(isFileProtocol("mailto:")).toEqual(false);
    });
});
