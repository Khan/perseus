import {logBridgeMessage} from "./bridge-debug-log";
import {
    createPreviewA11yReportMessage,
    createPreviewClearHighlightsMessage,
    createPreviewHighlightIssuesMessage,
    createPreviewIframeInitMessage,
    PREVIEW_MESSAGE_SOURCE,
} from "./message-types";

import type {ParentToIframeMessage, PreviewContent} from "./message-types";
import type {A11yIssue} from "../components/issues-panel";

function makeA11yIssue(id: string): A11yIssue {
    return {
        source: "a11y",
        id,
        instanceId: `violation-${id}`,
        description: "description",
        helpUrl: "https://help",
        help: "help",
        impact: "high",
        message: "message",
    };
}

function makeContent(): PreviewContent {
    return {
        type: "question",
        data: {
            question: {content: "Q", widgets: {}, images: {}},
            apiOptions: {},
            linterContext: {contentType: "exercise", highlightLint: false},
        },
    };
}

function makeContentDataMessage(contentVersion: number): ParentToIframeMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "content-data",
        content: makeContent(),
        contentVersion,
    };
}

/** The one logged line, or null when nothing was logged. */
function loggedLine(spy: jest.SpyInstance): string | null {
    return spy.mock.calls.length === 0 ? null : String(spy.mock.calls[0][0]);
}

describe("logBridgeMessage", () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        delete window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__;
    });

    it("logs nothing when the debug flag is unset", () => {
        // Arrange, Act
        logBridgeMessage("→iframe", makeContentDataMessage(1));

        // Assert
        expect(logSpy).not.toHaveBeenCalled();
    });

    it("logs the direction and type when the flag is set in this frame", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage("→iframe", makeContentDataMessage(1));

        // Assert
        expect(loggedLine(logSpy)).toContain("→iframe content-data");
    });

    it("logs when the flag is set only in the parent frame", () => {
        // Arrange: the presenter runs in the iframe, so a flag set in the top
        // frame's console has to reach it. A stub stands in for the parent
        // window because jsdom makes `window.parent` the window itself, which
        // the local-flag check would satisfy first.
        const fakeParent = {__PERSEUS_PREVIEW_BRIDGE_DEBUG__: true};
        // A full Window stub is unnecessary; only the flag is read.
        // eslint-disable-next-line no-restricted-syntax
        const parentWindow = fakeParent as unknown as Window;
        jest.spyOn(window, "parent", "get").mockReturnValue(parentWindow);

        // Act
        logBridgeMessage("→parent", createPreviewClearHighlightsMessage());

        // Assert
        expect(loggedLine(logSpy)).toContain("→parent clear-highlights");
    });

    it("does not log when a cross-origin parent blocks the flag read", () => {
        // Arrange
        jest.spyOn(window, "parent", "get").mockImplementation(() => {
            throw new Error("cross-origin");
        });

        // Act
        logBridgeMessage("→parent", createPreviewClearHighlightsMessage());

        // Assert
        expect(logSpy).not.toHaveBeenCalled();
    });

    it("includes the content version and content type for content-data", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage("→iframe", makeContentDataMessage(517));

        // Assert
        expect(loggedLine(logSpy)).toContain("v=517 content=question");
    });

    it("includes the scanning flag for iframe-init", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage(
            "→iframe",
            createPreviewIframeInitMessage(null, true, 3),
        );

        // Assert
        expect(loggedLine(logSpy)).toContain("v=3 content=null scanning=true");
    });

    it("includes the instanceIds for highlight-issues", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage(
            "→iframe",
            createPreviewHighlightIssuesMessage(["violation-image-alt"], 4),
        );

        // Assert
        expect(loggedLine(logSpy)).toContain("v=4 ids=[violation-image-alt]");
    });

    it("includes issue counts, not payloads, for a11y-report", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage(
            "←iframe",
            createPreviewA11yReportMessage(
                [makeA11yIssue("image-alt"), makeA11yIssue("button-name")],
                [makeA11yIssue("color-contrast")],
                9,
            ),
        );

        // Assert
        const line = loggedLine(logSpy);
        expect(line).toContain("v=9 violations=2 needsReview=1");
        expect(line).not.toContain("https://help");
    });

    it("omits trailing whitespace for messages with no details", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage("→parent", createPreviewClearHighlightsMessage());

        // Assert
        expect(loggedLine(logSpy)).toMatch(/clear-highlights$/);
    });

    it("increments the sequence number on each logged message", () => {
        // Arrange
        window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__ = true;

        // Act
        logBridgeMessage("→iframe", makeContentDataMessage(1));
        logBridgeMessage("→iframe", makeContentDataMessage(2));

        // Assert
        const sequenceOf = (call: number): number =>
            Number(
                String(logSpy.mock.calls[call][0]).match(/#(\d+)/)?.[1] ?? NaN,
            );
        expect(sequenceOf(1)).toBe(sequenceOf(0) + 1);
    });
});
