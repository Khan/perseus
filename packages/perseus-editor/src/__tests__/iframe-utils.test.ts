import {getIframeParameter, setIframeParameter} from "../iframe-utils";

describe("iframe-utils", () => {
    it("should set parameter on URL", () => {
        // Arrange
        const url = new URL("https://www.example.com/path/to/preview");

        // Act
        setIframeParameter(url, "emulate-mobile", "true");

        // Assert
        expect(url.toString()).toBe(
            "https://www.example.com/path/to/preview?emulate-mobile=true",
        );
    });

    it("should not duplicate parameter if set multiple times", () => {
        // Arrange
        const url = new URL("https://www.example.com/path/to/preview");

        // Act
        setIframeParameter(url, "emulate-mobile", "true");
        setIframeParameter(url, "emulate-mobile", "false");

        // Assert
        expect(url.toString()).toBe(
            "https://www.example.com/path/to/preview?emulate-mobile=false",
        );
    });

    it("should set all eligible parameters", () => {
        // Arrange
        const url = new URL("https://www.example.com/path/to/preview");

        // Act
        setIframeParameter(url, "frame-id", "100");
        setIframeParameter(url, "emulate-mobile", "true");
        setIframeParameter(url, "lint-gutter", "true");

        // Assert
        expect(url.toString()).toBe(
            "https://www.example.com/path/to/preview?frame-id=100&emulate-mobile=true&lint-gutter=true",
        );
    });
});

describe("getIframeParameter", () => {
    it("should get parameter from url string", () => {
        // Arrange
        const url = "https://www.example.com/path/to/preview?frame-id=100";

        // Act
        const value = getIframeParameter(url, "frame-id");

        // Assert
        expect(value).toBe("100");
    });

    it("should get parameter from url string", () => {
        // Arrange
        const url = new URL(
            "https://www.example.com/path/to/preview?frame-id=100",
        );

        // Act
        const value = getIframeParameter(url, "frame-id");

        // Assert
        expect(value).toBe("100");
    });

    it("should return null if parameter not set", () => {
        // Arrange
        const url = new URL("https://www.example.com/path/to/preview");

        // Act
        const value = getIframeParameter(url, "frame-id");

        // Assert
        expect(value).toBeNull();
    });
});
