import {makeSafeUrl} from "./make-safe-url";

const phetOriginForTests = "https://phet.colorado.edu";
const enLocaleForTests = "en";

describe("makeSafeUrl", () => {
    beforeEach(() => {
        // We need to mock URL.canParse() because it is not available
        // in our testing environment.
        global.URL.canParse = jest.fn(() => true) as jest.Mock;
    });

    it("should return null if the URL is not valid", () => {
        // Arrange
        // Update the mock to return false for canParse, since we're testing
        // an invalid URL that should not be parseable.
        global.URL.canParse = jest.fn(() => false) as jest.Mock;
        const invalidUrl = "some-invalid-url";

        // Act
        const result = makeSafeUrl(
            invalidUrl,
            enLocaleForTests,
            phetOriginForTests,
        );

        // Assert
        expect(result).toBe(null);
    });

    it("should return null if the URL is not from the expected origin", () => {
        // Arrange
        const nonPhetUrl = "https://khanacademy.org";

        // Act
        const result = makeSafeUrl(
            nonPhetUrl,
            enLocaleForTests,
            phetOriginForTests,
        );

        // Assert
        expect(result).toBe(null);
    });

    it("should return the URL with the specified locale", () => {
        // Arrange
        const fullPhetUrl =
            "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html";

        // Act
        const result = makeSafeUrl(
            fullPhetUrl,
            enLocaleForTests,
            phetOriginForTests,
        );

        // Assert
        expect(result?.toString()).toBe(
            `${fullPhetUrl}?locale=${enLocaleForTests}`,
        );
    });
});
