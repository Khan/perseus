import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import {A11yContext, createA11yContextValue} from "./a11y-context";
import ShowMe from "./show-me-issue";

import type {A11yContextValue} from "./a11y-context";

function renderShowMe(
    props: {instanceId?: string},
    contextValue: A11yContextValue | null,
) {
    return render(
        <A11yContext.Provider value={contextValue}>
            <ShowMe {...props} />
        </A11yContext.Provider>,
    );
}

describe("ShowMe", () => {
    it("renders the unavailable message when there is no instanceId", () => {
        // Arrange, Act
        renderShowMe(
            {},
            createA11yContextValue({setIssueHighlight: jest.fn()}),
        );

        // Assert
        expect(
            screen.getByText(/Unable to find the offending element/),
        ).toBeInTheDocument();
    });

    it("renders the unavailable message when no A11yContext is provided", () => {
        // Arrange, Act
        renderShowMe({instanceId: "violation-color-contrast"}, null);

        // Assert
        expect(
            screen.getByText(/Unable to find the offending element/),
        ).toBeInTheDocument();
    });

    it("renders a Show Me toggle when an instanceId and context are available", () => {
        // Arrange, Act
        renderShowMe(
            {instanceId: "violation-color-contrast"},
            createA11yContextValue({setIssueHighlight: jest.fn()}),
        );

        // Assert
        expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("turns the highlight on when toggled on", async () => {
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const setIssueHighlight = jest.fn();
        renderShowMe(
            {instanceId: "violation-color-contrast"},
            createA11yContextValue({setIssueHighlight}),
        );

        // Act
        await user.click(screen.getByRole("switch"));

        // Assert
        expect(setIssueHighlight).toHaveBeenCalledWith(
            "violation-color-contrast",
            true,
        );
    });

    it("turns the highlight off when toggled off", async () => {
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        const setIssueHighlight = jest.fn();
        renderShowMe(
            {instanceId: "violation-color-contrast"},
            createA11yContextValue({setIssueHighlight}),
        );

        // Act
        await user.click(screen.getByRole("switch"));
        await user.click(screen.getByRole("switch"));

        // Assert
        expect(setIssueHighlight).toHaveBeenLastCalledWith(
            "violation-color-contrast",
            false,
        );
    });

    it("turns the highlight off on unmount", () => {
        const setIssueHighlight = jest.fn();
        const {unmount} = renderShowMe(
            {instanceId: "violation-color-contrast"},
            createA11yContextValue({setIssueHighlight}),
        );

        // Act
        unmount();

        // Assert
        expect(setIssueHighlight).toHaveBeenCalledWith(
            "violation-color-contrast",
            false,
        );
    });
});
