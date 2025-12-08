import {detectTexErrors} from "./tex-error-detector";

describe("detectTexErrors", () => {
    it("returns empty array for content without math", () => {
        // Arrange
        const content = "Just some plain text without any math.";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });

    it("returns empty array for valid inline math", () => {
        // Arrange
        const content = "This is valid math: $x + y = z$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });

    it("returns empty array for valid block math", () => {
        // Arrange
        const content = "This is valid block math:\n\n$$\\frac{1}{2}$$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });

    it("detects invalid TeX syntax", () => {
        // Arrange
        const content = "This has invalid math: $\\invalid{syntax}$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].math).toContain("invalid");
        expect(errors[0].message).toBeTruthy();
    });

    it("detects multiple TeX errors", () => {
        // Arrange
        const content = "First error: $\\bad{1}$ and second error: $\\bad{2}$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors.length).toBe(2);
    });

    it("handles content with widgets correctly", () => {
        // Arrange
        const content =
            "Some text $x + y = z$ [[☃ numeric-input 1]] more math $a = b$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });

    it("detects errors in content with widgets", () => {
        // Arrange
        const content =
            "Bad math: $\\invalid{x}$ [[☃ numeric-input 1]] Good math: $y = 2$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors.length).toBe(1);
        expect(errors[0].math).toContain("invalid");
    });

    it("handles chemistry expressions with mhchem", () => {
        // Arrange
        const content = "Chemistry: $\\ce{H2O}$ and $\\ce{CO2}$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });

    it("preprocesses TeX by converting align to aligned", () => {
        // Arrange - align should be converted to aligned
        const content = "$$\\begin{align}x = 1\\end{align}$$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        // Should not error because preprocessTex converts align to aligned
        expect(errors).toEqual([]);
    });

    it("returns error details with math and message", () => {
        // Arrange
        const content = "Invalid: $#$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0]).toHaveProperty("math");
        expect(errors[0]).toHaveProperty("message");
        expect(typeof errors[0].math).toBe("string");
        expect(typeof errors[0].message).toBe("string");
    });

    it("handles mixed valid and invalid math", () => {
        // Arrange
        const content =
            "Valid: $x + y$ Invalid: $\\notacommand{x}$ Valid: $a = b$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors.length).toBe(1);
    });

    it("handles empty content", () => {
        // Arrange
        const content = "";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });

    it("handles content with only widgets", () => {
        // Arrange
        const content = "[[☃ numeric-input 1]] [[☃ radio 2]]";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors).toEqual([]);
    });
});
