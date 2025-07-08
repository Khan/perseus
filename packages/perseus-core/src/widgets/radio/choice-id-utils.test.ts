import {
    convertStringToHash,
    normalizeContent,
    generateChoiceId,
} from "./choice-id-utils";

const hashRegex = /^[a-z0-9]+$/;

describe("convertStringToHash", () => {
    it("returns 'empty' for empty string", () => {
        expect(convertStringToHash("")).toBe("empty");
    });

    it("returns hash for whitespace-only string", () => {
        const hash = convertStringToHash("   ");
        expect(hash).toMatch(hashRegex);
        expect(hash).not.toBe("empty");
    });

    it("generates consistent hash for same input", () => {
        const input = "test content";
        const hash1 = convertStringToHash(input);
        const hash2 = convertStringToHash(input);
        expect(hash1).toBe(hash2);
    });

    it("generates different hashes for different inputs", () => {
        const hash1 = convertStringToHash("content 1");
        const hash2 = convertStringToHash("content 2");
        expect(hash1).not.toBe(hash2);
    });

    it("generates base36 hash up to 8 characters", () => {
        const hash = convertStringToHash("test content");
        expect(hash).toMatch(hashRegex);
        expect(hash.length).toBeLessThanOrEqual(8);
    });

    it("handles special characters", () => {
        const hash = convertStringToHash("test@#$%^&*()");
        expect(hash).toMatch(hashRegex);
        expect(hash.length).toBeLessThanOrEqual(8);
    });

    it("handles unicode characters", () => {
        const hash = convertStringToHash("test 🚀 emoji");
        expect(hash).toMatch(hashRegex);
        expect(hash.length).toBeLessThanOrEqual(8);
    });

    it("is case sensitive", () => {
        const hash1 = convertStringToHash("Test");
        const hash2 = convertStringToHash("test");
        expect(hash1).not.toBe(hash2);
    });
});

describe("normalizeContent", () => {
    it("returns empty string for null", () => {
        expect(normalizeContent(null as any)).toBe("");
    });

    it("returns empty string for undefined", () => {
        expect(normalizeContent(undefined as any)).toBe("");
    });

    it("returns empty string for empty string", () => {
        expect(normalizeContent("")).toBe("");
    });

    it("returns empty string for whitespace-only string", () => {
        expect(normalizeContent("   \n\t  ")).toBe("");
    });

    it("trims whitespace from beginning and end", () => {
        expect(normalizeContent("  test content  ")).toBe("test content");
    });

    it("replaces multiple whitespace with single space", () => {
        expect(normalizeContent("test    content")).toBe("test content");
    });

    it("handles mixed whitespace characters", () => {
        expect(normalizeContent("test\n\t\r content")).toBe("test content");
    });

    it("converts to lowercase", () => {
        expect(normalizeContent("Test Content")).toBe("test content");
    });

    it("handles special characters", () => {
        expect(normalizeContent("Test@#$%^&*()")).toBe("test@#$%^&*()");
    });

    it("handles unicode characters", () => {
        expect(normalizeContent("Test 🚀 Emoji")).toBe("test 🚀 emoji");
    });

    it("preserves content when no normalization needed", () => {
        expect(normalizeContent("test content")).toBe("test content");
    });
});

describe("generateChoiceId", () => {
    it("generates consistent ID for same content and index", () => {
        // Arrange
        const content = "Content 1";
        const index = 0;

        // Act
        const choiceId1 = generateChoiceId(content, index);
        const choiceId2 = generateChoiceId(content, index);

        // Assert
        expect(choiceId1).toBe(choiceId2);
    });

    it("generates different IDs for different content", () => {
        // Arrange
        const content1 = "Content 1";
        const content2 = "Content 2";
        const index = 0;

        // Act
        const choiceId1 = generateChoiceId(content1, index);
        const choiceId2 = generateChoiceId(content2, index);

        // Assert
        expect(choiceId1).not.toBe(choiceId2);
    });

    it("generates different IDs for different indices", () => {
        // Arrange
        const content = "Content 1";
        const index1 = 0;
        const index2 = 1;

        // Act
        const choiceId1 = generateChoiceId(content, index1);
        const choiceId2 = generateChoiceId(content, index2);

        // Assert
        expect(choiceId1).not.toBe(choiceId2);
    });

    it("handles empty content", () => {
        // Arrange
        const content = "";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("3t05");
    });

    it("handles null content", () => {
        // Arrange
        const content = null as any;
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("2zuisu");
    });

    it("handles undefined content", () => {
        // Arrange
        const content = undefined as any;
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("9kolin");
    });

    it("handles whitespace-only content", () => {
        // Arrange
        const content = "   ";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("3t05");
    });

    it("handles special characters in content", () => {
        // Arrange
        const content = "Test@#$%^&*()";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
        expect(choiceId.length).toBeLessThanOrEqual(8);
    });

    it("handles unicode characters in content", () => {
        // Arrange
        const content = "Test 🚀 Emoji";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
        expect(choiceId.length).toBeLessThanOrEqual(8);
    });

    it("handles large indices", () => {
        // Arrange
        const content = "Content 1";
        const index = 999;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
        expect(choiceId.length).toBeLessThanOrEqual(8);
    });

    it("handles zero index", () => {
        // Arrange
        const content = "Content 1";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
        expect(choiceId.length).toBeLessThanOrEqual(8);
    });

    it("handles negative indices", () => {
        // Arrange
        const content = "Content 1";
        const index = -1;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
        expect(choiceId.length).toBeLessThanOrEqual(8);
    });

    it("produces expected format", () => {
        // Arrange
        const content = "Content 1";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
        expect(choiceId.length).toBeLessThanOrEqual(8);
    });

    it("generates unique IDs for realistic content", () => {
        // Arrange
        const testCases = [
            {content: "Content 1", index: 0},
            {content: "Content 2", index: 1},
            {content: "Content 3", index: 2},
            {content: "Different Content", index: 3},
        ];

        // Act
        const choiceIds = testCases.map(({content, index}) =>
            generateChoiceId(content, index),
        );

        // Assert
        // All IDs should be unique
        const uniqueChoiceIds = new Set(choiceIds);
        expect(uniqueChoiceIds.size).toBe(choiceIds.length);

        // Each ID should follow the expected format (just hash)
        choiceIds.forEach((choiceId) => {
            expect(choiceId).toMatch(hashRegex);
            expect(choiceId.length).toBeLessThanOrEqual(8);
        });
    });
});

describe("integration tests", () => {
    it("full pipeline works correctly", () => {
        // Arrange
        const content = "  Test Content  ";
        const index = 0;
        const concatContent = `${content}${index}`;

        // Act
        const normalized = normalizeContent(concatContent);
        const hash = convertStringToHash(normalized);
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(normalized).toBe("test content 0");
        expect(hash).toMatch(hashRegex);
        expect(hash.length).toBeLessThanOrEqual(8);
        expect(choiceId).toBe(hash);
    });

    it("handles edge cases consistently", () => {
        // Arrange
        const edgeCases = [
            {content: "", index: 0, expectedNormalized: "0"},
            {content: "   ", index: 1, expectedNormalized: "1"},
            {content: "A", index: 2, expectedNormalized: "a2"},
            {content: "A", index: 3, expectedNormalized: "a3"},
        ];

        // Act & Assert
        edgeCases.forEach(({content, index, expectedNormalized}) => {
            // Act
            const choiceId = generateChoiceId(content, index);
            const concatContent = `${content}${index}`;
            const expectedNormalizedContent = normalizeContent(concatContent);
            const expectedHash = convertStringToHash(expectedNormalizedContent);

            // Assert
            expect(expectedNormalizedContent).toBe(expectedNormalized);
            expect(choiceId).toBe(expectedHash);
            expect(choiceId).toMatch(hashRegex);
            expect(choiceId.length).toBeLessThanOrEqual(8);
        });
    });
});
