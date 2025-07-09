import {convertStringToHash, generateChoiceId} from "./choice-id-utils";

const hashRegex = /^\d+$/;

describe("convertStringToHash", () => {
    it("returns 5381 for empty string", () => {
        expect(convertStringToHash("")).toBe(5381);
    });

    it("returns hash for whitespace-only string", () => {
        const hash = convertStringToHash("   ");
        expect(hash).toBe(193341061);
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

    it("handles special characters", () => {
        const hash = convertStringToHash("test@#$%^&*()");
        expect(hash).toBe(2369536034);
    });

    it("handles unicode characters", () => {
        const hash = convertStringToHash("test 🚀 emoji");
        expect(hash).toBe(2126717450);
    });

    it("is case sensitive", () => {
        const hash1 = convertStringToHash("Test");
        const hash2 = convertStringToHash("test");
        expect(hash1).not.toBe(hash2);
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
        expect(choiceId).toBe("177557");
    });

    it("handles null content", () => {
        // Arrange
        const content = null as any;
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("181142958");
    });

    it("handles undefined content", () => {
        // Arrange
        const content = undefined as any;
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("578935535");
    });

    it("handles whitespace-only content", () => {
        // Arrange
        const content = "   ";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toBe("2085287701");
    });

    it("handles special characters in content", () => {
        // Arrange
        const content = "Test@#$%^&*()";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
    });

    it("handles unicode characters in content", () => {
        // Arrange
        const content = "Test 🚀 Emoji";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
    });

    it("handles large indices", () => {
        // Arrange
        const content = "Content 1";
        const index = 999;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
    });

    it("handles zero index", () => {
        // Arrange
        const content = "Content 1";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
    });

    it("handles negative indices", () => {
        // Arrange
        const content = "Content 1";
        const index = -1;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
    });

    it("produces expected format", () => {
        // Arrange
        const content = "Content 1";
        const index = 0;

        // Act
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(choiceId).toMatch(hashRegex);
    });

    it("generates unique IDs for varying content", () => {
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
        const hash = convertStringToHash(concatContent).toString();
        const choiceId = generateChoiceId(content, index);

        // Assert
        expect(hash).toMatch(hashRegex);
        expect(choiceId).toBe(hash);
    });

    it("handles edge cases consistently", () => {
        // Arrange
        const edgeCases = [
            {content: "", index: 0},
            {content: "   ", index: 1},
            {content: "A", index: 2},
            {content: "A", index: 3},
        ];

        // Act & Assert
        edgeCases.forEach(({content, index}) => {
            // Act
            const choiceId = generateChoiceId(content, index);
            const concatContent = `${content}${index}`;
            const expectedHash = convertStringToHash(concatContent).toString();

            // Assert
            expect(choiceId).toBe(expectedHash);
            expect(choiceId).toMatch(hashRegex);
        });
    });
});
