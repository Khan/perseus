import {DEFAULT_PREVIEW_OPTIONS} from "@khanacademy/perseus-preview";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import ExercisePreviewPage from "./exercise-preview-page";

import type {PreviewContent} from "@khanacademy/perseus-preview";

const mockReportHeight = jest.fn();
let mockContent: PreviewContent | null = null;
let mockHighlightTargets: Element[] = [];

jest.mock("@khanacademy/perseus-preview", () => ({
    ...jest.requireActual("@khanacademy/perseus-preview"),
    usePreviewPresenter: () => ({
        content: mockContent,
        previewOptions: DEFAULT_PREVIEW_OPTIONS,
        reportHeight: mockReportHeight,
        highlightTargets: mockHighlightTargets,
    }),
}));

jest.mock("./preview-renderer", () => ({
    PreviewRenderer: () => <div>Preview content</div>,
}));

function buildQuestionContent(): PreviewContent {
    return {
        type: "question",
        data: {
            question: {content: "What is 2+2?", widgets: {}, images: {}},
            apiOptions: {},
            linterContext: {contentType: "exercise", highlightLint: false},
        },
    };
}

describe("ExercisePreviewPage", () => {
    beforeEach(() => {
        mockContent = null;
        mockHighlightTargets = [];

        // eslint-disable-next-line no-restricted-syntax
        window.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        })) as unknown as typeof ResizeObserver;
    });

    it("renders one overlay per highlight target", () => {
        // Arrange
        mockContent = buildQuestionContent();
        mockHighlightTargets = [
            document.createElement("button"),
            document.createElement("input"),
        ];

        // Act
        render(<ExercisePreviewPage />);

        // Assert
        expect(screen.getAllByTestId("a11y-overlay")).toHaveLength(2);
    });

    it("renders no overlays when there are no highlight targets", () => {
        // Arrange
        mockContent = buildQuestionContent();
        mockHighlightTargets = [];

        // Act
        render(<ExercisePreviewPage />);

        // Assert
        expect(screen.queryByTestId("a11y-overlay")).not.toBeInTheDocument();
    });
});
