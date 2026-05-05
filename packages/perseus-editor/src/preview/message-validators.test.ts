import {PREVIEW_MESSAGE_SOURCE} from "./message-types";
import {
    isIframeToParentMessage,
    isParentToIframeMessage,
} from "./message-validators";

describe("message-validators", () => {
    describe("isIframeToParentMessage", () => {
        it("returns true for valid request-data message", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "request-data" as const,
            };

            expect(isIframeToParentMessage(message)).toBe(true);
        });

        it("returns true for valid height-update message", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "height-update" as const,
                height: 500,
            };

            expect(isIframeToParentMessage(message)).toBe(true);
        });

        it("returns true for valid lint-report message", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "lint-report" as const,
                lintWarnings: [],
            };

            expect(isIframeToParentMessage(message)).toBe(true);
        });

        it("returns false for null", () => {
            expect(isIframeToParentMessage(null)).toBe(false);
        });

        it("returns false for undefined", () => {
            expect(isIframeToParentMessage(undefined)).toBe(false);
        });

        it("returns false for non-object primitives", () => {
            expect(isIframeToParentMessage("string")).toBe(false);
            expect(isIframeToParentMessage(123)).toBe(false);
            expect(isIframeToParentMessage(true)).toBe(false);
        });

        it("returns false for object without source property", () => {
            const message = {
                type: "request-data",
            };

            expect(isIframeToParentMessage(message)).toBe(false);
        });

        it("returns false for object with non-string source", () => {
            const message = {
                source: 123,
                type: "request-data",
            };

            expect(isIframeToParentMessage(message)).toBe(false);
        });

        it("returns false for object with wrong source value", () => {
            const message = {
                source: "wrong-source",
                type: "request-data",
            };

            expect(isIframeToParentMessage(message)).toBe(false);
        });

        it("returns false for empty object", () => {
            expect(isIframeToParentMessage({})).toBe(false);
        });

        it("returns false for array", () => {
            expect(isIframeToParentMessage([])).toBe(false);
        });

        it("returns true for message with correct source but missing required fields", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
            };

            // Type guard only checks source, not message-specific fields
            // This should still return true because the type guard is minimal
            expect(isIframeToParentMessage(message)).toBe(true);
        });
    });

    describe("isParentToIframeMessage", () => {
        it("returns true for valid content-data message", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data" as const,
                content: {
                    type: "question" as const,
                    data: {
                        item: {question: {content: "test"}},
                        apiOptions: {},
                        initialHintsVisible: 0,
                        device: {type: "phone" as const},
                        linterContext: {contentType: "exercise" as const},
                    },
                },
            };

            expect(isParentToIframeMessage(message)).toBe(true);
        });

        it("returns false for null", () => {
            expect(isParentToIframeMessage(null)).toBe(false);
        });

        it("returns false for undefined", () => {
            expect(isParentToIframeMessage(undefined)).toBe(false);
        });

        it("returns false for non-object primitives", () => {
            expect(isParentToIframeMessage("string")).toBe(false);
            expect(isParentToIframeMessage(456)).toBe(false);
            expect(isParentToIframeMessage(false)).toBe(false);
        });

        it("returns false for object without source property", () => {
            const message = {
                type: "content-data",
                content: {},
            };

            expect(isParentToIframeMessage(message)).toBe(false);
        });

        it("returns false for object with non-string source", () => {
            const message = {
                source: {nested: "object"},
                type: "content-data",
            };

            expect(isParentToIframeMessage(message)).toBe(false);
        });

        it("returns false for object with wrong source value", () => {
            const message = {
                source: "different-source",
                type: "content-data",
            };

            expect(isParentToIframeMessage(message)).toBe(false);
        });

        it("returns false for empty object", () => {
            expect(isParentToIframeMessage({})).toBe(false);
        });

        it("returns false for array", () => {
            expect(isParentToIframeMessage([1, 2, 3])).toBe(false);
        });

        it("returns true for message with correct source (minimal validation)", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
            };

            // Type guard only checks source, not message-specific fields
            expect(isParentToIframeMessage(message)).toBe(true);
        });

        it("handles message with additional unexpected properties", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "content-data",
                unexpectedProperty: "should-not-break",
            };

            expect(isParentToIframeMessage(message)).toBe(true);
        });
    });

    describe("cross-validation", () => {
        it("type guards are independent (same structure accepted by both)", () => {
            const message = {
                source: PREVIEW_MESSAGE_SOURCE,
                type: "some-type",
            };

            // Both type guards only check source, so this passes both
            expect(isIframeToParentMessage(message)).toBe(true);
            expect(isParentToIframeMessage(message)).toBe(true);
        });
    });
});
