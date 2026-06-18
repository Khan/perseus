import {makeSafeUrl} from "./make-safe-url";

const phetOriginForTests = "https://phet.colorado.edu";
const enLocaleForTests = "en";

describe("makeSafeUrl", () => {
    it("returns null if the URL is not valid", () => {
        // Arrange
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
