import {
    PREVIEW_MESSAGE_SOURCE,
    createPreviewA11yReportMessage,
    createPreviewClearHighlightsMessage,
    createPreviewHighlightIssuesMessage,
    createPreviewSetA11yEnabledMessage,
} from "./message-types";

import type {Issue} from "../components/issues-panel";

const issue = (id: string): Issue => ({
    id,
    description: `description ${id}`,
    helpUrl: "https://example.com/help",
    help: "Learn more",
    impact: "medium",
    message: `message ${id}`,
});

describe("message constructors", () => {
    describe("createPreviewSetA11yEnabledMessage", () => {
        it("builds a set-a11y-enabled command carrying the enabled flag", () => {
            // Arrange, Act
            const message = createPreviewSetA11yEnabledMessage(true);

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "set-a11y-enabled",
                enabled: true,
            });
        });

        it("carries enabled: false when disabling", () => {
            // Arrange, Act
            const message = createPreviewSetA11yEnabledMessage(false);

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "set-a11y-enabled",
                enabled: false,
            });
        });
    });

    describe("createPreviewHighlightIssuesMessage", () => {
        it("builds a highlight-issues command carrying the previewIds", () => {
            // Arrange, Act
            const message = createPreviewHighlightIssuesMessage([
                "violation-1",
                "incomplete-2",
            ]);

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "highlight-issues",
                previewIds: ["violation-1", "incomplete-2"],
            });
        });
    });

    describe("createPreviewClearHighlightsMessage", () => {
        it("builds a clear-highlights command", () => {
            // Arrange, Act
            const message = createPreviewClearHighlightsMessage();

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "clear-highlights",
            });
        });
    });

    describe("createPreviewA11yReportMessage", () => {
        it("builds an a11y-report carrying violations and incompletes", () => {
            // Arrange
            const violations = [issue("v1")];
            const incompletes = [issue("i1")];

            // Act
            const message = createPreviewA11yReportMessage(
                violations,
                incompletes,
            );

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "a11y-report",
                violations,
                incompletes,
            });
        });
    });
});
