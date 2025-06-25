import {
    convertStringToHash,
    normalizeContent,
    generateChoiceId,
} from "./choice-id-utils";

describe("convertStringToHash", () => {
    it("returns 'empty' for empty string", () => {
        expect(convertStringToHash("")).toBe("empty");
    });

    it("returns hash for whitespace-only string", () => {
        const hash = convertStringToHash("   ");
        expect(hash).toMatch(/^[a-z0-9]+$/);
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
        expect(hash).toMatch(/^[a-z0-9]+$/);
        expect(hash.length).toBeLessThanOrEqual(8);
    });

    it("handles special characters", () => {
        const hash = convertStringToHash("test@#$%^&*()");
        expect(hash).toMatch(/^[a-z0-9]+$/);
        expect(hash.length).toBeLessThanOrEqual(8);
    });

    it("handles unicode characters", () => {
        const hash = convertStringToHash("test 🚀 emoji");
        expect(hash).toMatch(/^[a-z0-9]+$/);
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
        const id1 = generateChoiceId("Content 1", 0);
        const id2 = generateChoiceId("Content 1", 0);
        expect(id1).toBe(id2);
    });

    it("generates different IDs for different content", () => {
        const id1 = generateChoiceId("Content 1", 0);
        const id2 = generateChoiceId("Content 2", 0);
        expect(id1).not.toBe(id2);
    });

    it("generates different IDs for different indices", () => {
        const id1 = generateChoiceId("Content 1", 0);
        const id2 = generateChoiceId("Content 1", 1);
        expect(id1).not.toBe(id2);
    });

    it("handles empty content", () => {
        const id = generateChoiceId("", 0);
        expect(id).toBe("empty0");
    });

    it("handles null content", () => {
        const id = generateChoiceId(null as any, 0);
        expect(id).toBe("empty0");
    });

    it("handles undefined content", () => {
        const id = generateChoiceId(undefined as any, 0);
        expect(id).toBe("empty0");
    });

    it("handles whitespace-only content", () => {
        const id = generateChoiceId("   ", 0);
        expect(id).toBe("empty0");
    });

    it("normalizes content before hashing", () => {
        const id1 = generateChoiceId("Content 1", 0);
        const id2 = generateChoiceId("  CONTENT 1  ", 0);
        expect(id1).toBe(id2);
    });

    it("handles special characters in content", () => {
        const id = generateChoiceId("Test@#$%^&*()", 0);
        expect(id).toMatch(/^[a-z0-9]+0$/);
        expect(id.length).toBeLessThanOrEqual(9); // hash + index
    });

    it("handles unicode characters in content", () => {
        const id = generateChoiceId("Test 🚀 Emoji", 0);
        expect(id).toMatch(/^[a-z0-9]+0$/);
        expect(id.length).toBeLessThanOrEqual(9); // hash + index
    });

    it("handles large indices", () => {
        const id = generateChoiceId("Content 1", 999);
        expect(id).toMatch(/^[a-z0-9]+999$/);
    });

    it("handles zero index", () => {
        const id = generateChoiceId("Content 1", 0);
        expect(id).toMatch(/^[a-z0-9]+0$/);
    });

    it("handles negative indices", () => {
        const id = generateChoiceId("Content 1", -1);
        expect(id).toMatch(/^[a-z0-9]+-1$/);
    });

    it("produces expected format", () => {
        const id = generateChoiceId("Content 1", 0);
        // Should be hash + index
        expect(id).toMatch(/^[a-z0-9]+0$/);
    });

    it("generates unique IDs for realistic content", () => {
        const ids = [
            generateChoiceId("Content 1", 0),
            generateChoiceId("Content 2", 1),
            generateChoiceId("Content 3", 2),
            generateChoiceId("Different Content", 3),
        ];

        // All IDs should be unique
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);

        // Each ID should follow the expected format
        ids.forEach((id, index) => {
            expect(id).toMatch(new RegExp(`^[a-z0-9]+${index}$`));
        });
    });
});

describe("integration tests", () => {
    it("full pipeline works correctly", () => {
        const content = "  Test Content  ";
        const normalized = normalizeContent(content);
        const hash = convertStringToHash(normalized);
        const choiceId = generateChoiceId(content, 0);

        expect(normalized).toBe("test content");
        expect(hash).toMatch(/^[a-z0-9]+$/);
        expect(hash.length).toBeLessThanOrEqual(8);
        expect(choiceId).toBe(`${hash}0`);
    });

    it("handles edge cases consistently", () => {
        const edgeCases = [
            {content: "", index: 0, expectedSuffix: "0"},
            {content: "   ", index: 1, expectedSuffix: "1"},
            {content: "A", index: 2, expectedSuffix: "2"},
            {content: "A", index: 3, expectedSuffix: "3"},
        ];

        edgeCases.forEach(({content, index, expectedSuffix}) => {
            const id = generateChoiceId(content, index);
            expect(id).toMatch(new RegExp(`^[a-z0-9]+${expectedSuffix}$`));
        });
    });
});
