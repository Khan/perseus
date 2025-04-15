import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import IssuesPanel from "../issues-panel";

const makeIssue = (id: string, impact: string = "moderate") => ({
    id,
    help: "Example help",
    helpUrl: "http://example.com",
    impact,
    message: "Example message",
});

// Normally, we avoid direct node access per Testing Library best practices.
// But <PhosphorIcon> renders as a <span> with no test-friendly props (e.g., no data-testid or role),
// and attempts like getByTestId, getByText().nextSibling, or adding a test ID weren’t reliable.
// So to verify the icon (e.g., data-icon-type="check-circle-fill.svg"), direct access was the most
// consistent option.

describe("IssuesPanel", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("shows passing icon and '0 issues' when no data is passed", () => {
        // Arrange
        render(<IssuesPanel warnings={[]} />);

        // Assert
        expect(screen.getByText("0 issues")).toBeInTheDocument();

        // Assert that the icon is a passing icon
        const icon = screen
            .getByText("0 issues")
            // eslint-disable-next-line testing-library/no-node-access
            .parentElement?.querySelector(
                '[data-icon-type="check-circle-fill.svg"]',
            );
        expect(icon).toBeInTheDocument();
    });

    it("shows caution icon for warnings", () => {
        // Arrange
        render(<IssuesPanel warnings={[makeIssue("warn1")]} />);

        // Assert
        expect(screen.getByText("1 issue")).toBeInTheDocument();

        // Assert that the icon is caution icon
        const icon = screen
            .getByText("1 issue")
            // eslint-disable-next-line testing-library/no-node-access
            .parentElement?.querySelector(
                '[data-icon-type="warning-fill.svg"]',
            );
        expect(icon).toBeInTheDocument();
    });

    it("shows caution icon for warnings and correct issue count when multiple warnings are passed", async () => {
        // Arrange
        render(
            <IssuesPanel warnings={[makeIssue("warn1"), makeIssue("warn2")]} />,
        );

        // Assert
        expect(screen.getByText("2 issues")).toBeInTheDocument();

        // Assert that the icon is caution icon
        const icon = screen
            .getByText("2 issues")
            // eslint-disable-next-line testing-library/no-node-access
            .parentElement?.querySelector(
                '[data-icon-type="warning-fill.svg"]',
            );
        expect(icon).toBeInTheDocument();
    });

    it("opens the panel when the heading is clicked", async () => {
        // Arrange
        render(<IssuesPanel warnings={[makeIssue("warn1")]} />);
        const headingButton = screen.getByRole("button"); // The button in the heading

        //Act
        await userEvent.click(headingButton); // Simulate click to open panel

        //Assert
        expect(screen.getByText("Warning: warn1")).toBeInTheDocument();
    });

    it("closes the panel when the heading icon is clicked again", async () => {
        //Arrange
        render(<IssuesPanel warnings={[makeIssue("warn1")]} />);
        const headingButton = screen.getByRole("button");
        await userEvent.click(headingButton);
        expect(screen.getByText("Warning: warn1")).toBeInTheDocument();

        //Act
        await userEvent.click(headingButton);

        //Assert
        expect(screen.queryByText("Warning: warn1")).not.toBeInTheDocument();
    });
});
