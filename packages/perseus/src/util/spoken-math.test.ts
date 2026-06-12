import {generateSpokenMathDetails} from "./spoken-math";

describe("generateSpokenMathDetails", () => {
    it("converts TeX to spoken language (root, fraction)", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails(
            "$\\sqrt{\\frac{1}{2}}$",
        );

        // Assert
        expect(convertedString).toBe("StartRoot one half EndRoot");
    });

    it("converts TeX to spoken language (exponent)", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("$x^{2}$");

        // Assert
        expect(convertedString).toBe("x Superscript 2");
    });

    it("converts TeX to spoken language (negative)", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("$-2$");

        // Assert
        expect(convertedString).toBe("negative 2");
    });

    it("converts TeX to spoken language (subtraction)", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("$2-1$");

        // Assert
        expect(convertedString).toBe("2 minus 1");
    });

    it("converts TeX to spoken language (normal words)", async () => {
        // Arrange, Act
        const convertedString =
            await generateSpokenMathDetails("$\\text{square b}$");

        // Assert
        expect(convertedString).toBe("square b");
    });

    it("converts TeX to spoken language (random letters)", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("$cat$");

        // Assert
        expect(convertedString).toBe("c a t");
    });

    it("keeps non-math text as is", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails(
            "Circle with radius $\\frac{1}{2}$ units",
        );

        // Assert
        expect(convertedString).toBe("Circle with radius one half units");
    });

    it("reads dollar signs as dollars inside tex", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails(
            "This sandwich costs ${$}12.34$",
        );

        // Assert
        expect(convertedString).toBe("This sandwich costs dollar sign 12.34");
    });

    it("reads dollar signs as dollars outside tex", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails(
            "This sandwich costs \\$12.34",
        );

        // Assert
        expect(convertedString).toBe("This sandwich costs $12.34");
    });

    it("reads curly braces", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("Hello}{");

        // Assert
        expect(convertedString).toBe("Hello}{");
    });

    it("reads backslashes", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("\\");

        // Assert
        expect(convertedString).toBe("\\");
    });

    it("reads lone dollar signs as regular dollar signs", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("$50");

        // Assert
        expect(convertedString).toBe("$50");
    });

    it("reads lone escaped dollar signs in text as regular dollar signs", async () => {
        // Arrange, Act
        const convertedString = await generateSpokenMathDetails("\\$50");

        // Assert
        expect(convertedString).toBe("$50");
    });
});
