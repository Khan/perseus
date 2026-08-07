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
        expect(errors.length).toBe(1);
        expect(errors[0].math).toBe("\\invalid{syntax}");
        expect(errors[0].message).toContain("Undefined control sequence");
    });

    it("detects multiple TeX errors", () => {
        // Arrange
        const content = "First error: $\\bad{1}$ and second error: $\\bad{2}$";

        // Act
        const errors = detectTexErrors(content);

        // Assert
        expect(errors.length).toBe(2);
    });

    it("returns no errors for valid math in content with widgets", () => {
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

    it.each([
        "$\\gold{A}$", // \gold
        "$\\inte_0^1 x\\,dx$", // \inte
        "$x \\in \\RR$", // \RR
        "$\\lcm(4, 6)$", // \lcm
        "$\\gcf(4, 6)$", // \gcf
        "$\\AA$", // \AA, which KaTeX allows in text mode only
        "$\\^{\\frac12}$", // \^, a rational exponent
        "$\\arraystretch{1.5}$", // \arraystretch, a no-op MathJax swallows
    ])(
        "returns no errors for %s, which MathJax accepts but KaTeX rejects",
        (content) => {
            // Arrange, Act
            const errors = detectTexErrors(content);

            // Assert
            expect(errors).toEqual([]);
        },
    );

    it.each([
        "$\\orange{7}$", // \orange
        "$\\goldD{7}$", // \goldD
    ])(
        "returns no errors for %s, a color macro KaTeX defines itself",
        (content) => {
            // Arrange, Act
            const errors = detectTexErrors(content);

            // Assert
            expect(errors).toEqual([]);
        },
    );

    // Our overrides shadow macros KaTeX either defines or inspects itself, so
    // they must not break the constructs KaTeX already handled.
    it.each([
        "$\\text{\\^e}$", // \^ as a text-mode circumflex accent
        "$\\text{5\\AA}$", // \AA in the text mode KaTeX intends it for
        // \arraystretch's override has to leave row-based environments parsing.
        "$\\begin{array}{c}a\\\\b\\end{array}$",
        "$\\begin{matrix}a\\\\b\\end{matrix}$",
        "$\\begin{aligned}a&=b\\end{aligned}$",
        "$\\def\\arraystretch{1.5}\\begin{array}{c}a\\end{array}$",
    ])("returns no errors for %s after overriding the macro", (content) => {
        // Arrange, Act
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
