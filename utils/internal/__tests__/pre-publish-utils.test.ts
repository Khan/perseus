import {checkExports} from "../pre-publish-utils";

describe("checkExports", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("returns false when exports is missing", () => {
        // Arrange, Act
        const result = checkExports({name: "@khanacademy/kmath"});

        expect(result).toBe(false);
    });

    it("returns false when exports has no '.' entry", () => {
        // Arrange, Act
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {"./styles.css": "./dist/index.css"},
        });

        expect(result).toBe(false);
    });

    it("returns true for a well-formed map", () => {
        // Arrange, Act
        const result = checkExports({
            name: "@khanacademy/kmath",
            exports: {".": "./dist/index.js"},
        });

        expect(result).toBe(true);
    });
});
