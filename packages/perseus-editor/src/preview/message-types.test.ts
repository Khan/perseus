import {
    PREVIEW_MESSAGE_SOURCE,
    createPreviewA11yReportMessage,
    createPreviewClearHighlightsMessage,
    createPreviewHighlightIssuesMessage,
    createPreviewIframeInitMessage,
    createPreviewSetA11yEnabledMessage,
} from "./message-types";

import type {PreviewContent} from "./message-types";
import type {A11yIssue} from "../components/issues-panel";

const issue = (id: string): A11yIssue => ({
    id,
    description: `description ${id}`,
    helpUrl: "https://example.com/help",
    help: "Learn more",
    impact: "medium",
    message: `message ${id}`,
    previewId: id,
});

const questionContent: PreviewContent = {
    type: "question",
    data: {
        question: {content: "What is 2+2?", widgets: {}, images: {}},
        apiOptions: {readOnly: true},
        linterContext: {contentType: "exercise", highlightLint: false},
    },
};

describe("message constructors", () => {
    describe("createPreviewIframeInitMessage", () => {
        it("builds an iframe-init message carrying content and a11yEnabled", () => {
            // Arrange, Act
            const message = createPreviewIframeInitMessage(
                questionContent,
                true,
            );

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "iframe-init",
                content: questionContent,
                a11yEnabled: true,
            });
        });

        it("carries null content when nothing has been sent yet", () => {
            // Arrange, Act
            const message = createPreviewIframeInitMessage(null, false);

            // Assert
            expect(message).toEqual({
                source: PREVIEW_MESSAGE_SOURCE,
                type: "iframe-init",
                content: null,
                a11yEnabled: false,
            });
        });
    });

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
