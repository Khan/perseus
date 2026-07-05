import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import {A11yContext, createA11yContextValue} from "./a11y-context";
import ShowMe from "./show-me-issue";

import type {A11yContextValue} from "./a11y-context";

function renderShowMe(
    props: {issueId: string; previewId?: string},
    contextValue: A11yContextValue | null,
) {
    return render(
        <A11yContext.Provider value={contextValue}>
            <ShowMe {...props} />
        </A11yContext.Provider>,
    );
}

describe("ShowMe", () => {
    it("renders the unavailable message when previewId is not provided", () => {
        // Arrange, Act
        renderShowMe(
            {issueId: "issue-1"},
            createA11yContextValue({setIssueHighlight: jest.fn()}),
        );

        // Assert
        expect(
            screen.getByText(/Unable to find the offending element/),
        ).toBeInTheDocument();
    });

    it("renders the unavailable message when no A11yContext is provided", () => {
        // Arrange, Act
        renderShowMe({issueId: "issue-1", previewId: "violation-1"}, null);

        // Assert
        expect(
            screen.getByText(/Unable to find the offending element/),
        ).toBeInTheDocument();
    });

    it("renders a Show Me toggle when previewId and context are available", () => {
        // Arrange, Act
        renderShowMe(
            {issueId: "issue-1", previewId: "violation-1"},
            createA11yContextValue({setIssueHighlight: jest.fn()}),
        );

        // Assert
        expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("calls setIssueHighlight with the previewId when toggled on", async () => {
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const setIssueHighlight = jest.fn();
        renderShowMe(
            {issueId: "issue-1", previewId: "violation-1"},
            createA11yContextValue({setIssueHighlight}),
        );

        // Act
        await user.click(screen.getByRole("switch"));

        // Assert
        expect(setIssueHighlight).toHaveBeenCalledWith(
            "issue-1",
            "violation-1",
        );
    });

    it("calls setIssueHighlight with null when toggled off", async () => {
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const setIssueHighlight = jest.fn();
        renderShowMe(
            {issueId: "issue-1", previewId: "violation-1"},
            createA11yContextValue({setIssueHighlight}),
        );

        // Act
        await user.click(screen.getByRole("switch"));
        await user.click(screen.getByRole("switch"));

        // Assert
        expect(setIssueHighlight).toHaveBeenLastCalledWith("issue-1", null);
    });

    it("calls setIssueHighlight with null on unmount", () => {
        const setIssueHighlight = jest.fn();
        const {unmount} = renderShowMe(
            {issueId: "issue-1", previewId: "violation-1"},
            createA11yContextValue({setIssueHighlight}),
        );

        // Act
        unmount();

        // Assert
        expect(setIssueHighlight).toHaveBeenCalledWith("issue-1", null);
    });
});
