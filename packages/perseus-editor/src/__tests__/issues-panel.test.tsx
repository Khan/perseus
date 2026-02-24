import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import IssuesPanel from "../components/issues-panel";

import type {IssueImpact} from "../components/issues-panel";

const makeIssue = (id: string, impact: IssueImpact = "medium") => ({
    id,
    description: "Example description",
    helpUrl: "http://example.com",
    help: "Example help",
    impact,
    message: "Example message",
});

describe("IssuesPanel", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("shows passing icon and '0 issues' when no data is passed", () => {
        // Arrange
        render(<IssuesPanel issues={[]} />);

        // Assert
        expect(screen.getByText("0 issues")).toBeInTheDocument();

        // Assert that the icon is passing icon
        const icon = screen.getByTestId("issues-icon-check-circle-fill.svg");
        expect(icon).toBeVisible();

        // Assert that no warning icon is shown when there are 0 issues
        const warningIcon = screen.queryByTestId(
            "issues-icon-warning-fill.svg",
        );
        expect(warningIcon).not.toBeInTheDocument();
    });

    it("shows warning icon for warnings", () => {
        // Arrange
        render(<IssuesPanel issues={[makeIssue("warn1")]} />);

        // Assert
        expect(screen.getByText("1 issue")).toBeInTheDocument();

        // Assert that the icon is warning icon
        const icon = screen.getByTestId("issues-icon-warning-fill.svg");
        expect(icon).toBeVisible();

        // Assert that the passing icon is not in the document
        const passingIcon = screen.queryByTestId(
            "issues-icon-check-circle-fill.svg",
        );
        expect(passingIcon).not.toBeInTheDocument();
    });

    it("shows warning icon for warnings and correct issue count when multiple warnings are passed", async () => {
        // Arrange
        render(
            <IssuesPanel issues={[makeIssue("warn1"), makeIssue("warn2")]} />,
        );

        // Assert
        expect(screen.getByText("2 issues")).toBeInTheDocument();

        // Assert that the icon is warning icon
        const icon = screen.getByTestId("issues-icon-warning-fill.svg");
        expect(icon).toBeVisible();

        // Assert that the passing icon is not in the document
        const passingIcon = screen.queryByTestId(
            "issues-icon-check-circle-fill.svg",
        );
        expect(passingIcon).not.toBeInTheDocument();
    });

    it("opens the panel when the heading is clicked", async () => {
        // Arrange
        render(<IssuesPanel issues={[makeIssue("warn1")]} />);
        const toggleHeader = screen.getByText("Issues");

        //Act
        await userEvent.click(toggleHeader); // Simulate click to open panel

        //Assert
        expect(screen.getByText("Warning: warn1")).toBeInTheDocument();
    });

    it("closes the panel when the heading is clicked again", async () => {
        //Arrange
        render(<IssuesPanel issues={[makeIssue("warn1")]} />);
        const toggleHeader = screen.getByText("Issues");
        await userEvent.click(toggleHeader);
        expect(screen.getByText("Warning: warn1")).toBeInTheDocument();

        //Act
        await userEvent.click(toggleHeader);

        //Assert
        expect(screen.queryByText("Warning: warn1")).not.toBeInTheDocument();
    });

    it("shows the CTA button when the issue has one", async () => {
        // Arrange
        render(
            <IssuesPanel
                // "image-markdown" issue ID has a CTA associated with it
                issues={[makeIssue("image-markdown")]}
            />,
        );

        // Act
        const toggleHeader = screen.getByText("Issues");
        await userEvent.click(toggleHeader);

        const cta = screen.getByRole("button", {
            name: "Convert all image markdown to widget",
        });

        // Assert
        expect(cta).toBeInTheDocument();
    });
});
