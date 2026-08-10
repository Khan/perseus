import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {A11yContext, createA11yContextValue} from "./a11y-context";
import IssuesPanel, {getIssueKey} from "./issues-panel";

import type {A11yIssue, Issue, IssueImpact} from "./issues-panel";

const makeIssue = (id: string, impact: IssueImpact = "medium") => ({
    id,
    description: "Example description",
    helpUrl: "http://example.com",
    help: "Example help",
    impact,
    message: "Example message",
});

const makeA11yIssue = (
    instanceId: string,
    impact: IssueImpact = "medium",
): A11yIssue => ({
    ...makeIssue(`axe-${instanceId}`, impact),
    source: "a11y",
    instanceId,
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

    it("includes A11yContext's axeCoreIssues in the count when scanning is enabled", () => {
        // Arrange, Act
        render(
            <A11yContext.Provider
                value={createA11yContextValue({
                    a11yScanningEnabled: true,
                    axeCoreIssues: [makeA11yIssue("violation-color-contrast")],
                })}
            >
                <IssuesPanel issues={[makeIssue("warn1")]} />
            </A11yContext.Provider>,
        );

        // Assert
        expect(screen.getByText("2 issues")).toBeInTheDocument();
    });

    it("excludes A11yContext's axeCoreIssues from the count when a11y is disabled", () => {
        // Arrange, Act
        render(
            <A11yContext.Provider
                value={createA11yContextValue({
                    a11yScanningEnabled: false,
                    axeCoreIssues: [makeA11yIssue("violation-color-contrast")],
                })}
            >
                <IssuesPanel issues={[makeIssue("warn1")]} />
            </A11yContext.Provider>,
        );

        // Assert
        expect(screen.getByText("1 issue")).toBeInTheDocument();
    });

    it("reflects A11yContext's a11yScanningEnabled in the scan toggle", async () => {
        // Arrange
        render(
            <A11yContext.Provider
                value={createA11yContextValue({a11yScanningEnabled: true})}
            >
                <IssuesPanel issues={[]} />
            </A11yContext.Provider>,
        );
        await userEvent.click(screen.getByText("Issues"));

        // Act, Assert
        expect(
            screen.getByRole("switch", {name: "Include axe-core scan"}),
        ).toBeChecked();
    });

    it("offers a Show Me toggle for scanner issues", async () => {
        // Arrange
        render(
            <A11yContext.Provider
                value={createA11yContextValue({
                    a11yScanningEnabled: true,
                    axeCoreIssues: [makeA11yIssue("violation-color-contrast")],
                })}
            >
                <IssuesPanel issues={[]} />
            </A11yContext.Provider>,
        );

        // Act
        await userEvent.click(screen.getByText("Issues"));

        // Assert
        expect(
            screen.getByRole("switch", {name: "Show Me"}),
        ).toBeInTheDocument();
    });

    it("has nothing to show for a linter issue, even one with an instanceId", async () => {
        // Arrange
        const linterIssue = {
            ...makeIssue("categorizer 1 inaccessible"),
            instanceId: "inaccessible-widget-categorizer 1",
        };
        render(
            <A11yContext.Provider
                value={createA11yContextValue({a11yScanningEnabled: true})}
            >
                <IssuesPanel issues={[linterIssue]} />
            </A11yContext.Provider>,
        );

        // Act
        await userEvent.click(screen.getByText("Issues"));

        // Assert
        expect(
            screen.queryByRole("switch", {name: "Show Me"}),
        ).not.toBeInTheDocument();
        expect(
            screen.getByText(/Unable to find the offending element/),
        ).toBeInTheDocument();
    });

    it("calls A11yContext's setA11yScanningEnabled when the scan toggle is clicked", async () => {
        // Arrange
        const setA11yScanningEnabled = jest.fn();
        render(
            <A11yContext.Provider
                value={createA11yContextValue({
                    a11yScanningEnabled: false,
                    setA11yScanningEnabled,
                })}
            >
                <IssuesPanel issues={[]} />
            </A11yContext.Provider>,
        );
        await userEvent.click(screen.getByText("Issues"));

        // Act
        await userEvent.click(
            screen.getByRole("switch", {name: "Include axe-core scan"}),
        );

        // Assert
        expect(setA11yScanningEnabled).toHaveBeenCalledWith(true);
    });
});

describe("getIssueKey", () => {
    const a11yIssue: A11yIssue = {
        source: "a11y",
        id: "color-contrast",
        description: "description",
        helpUrl: "https://help",
        help: "help",
        impact: "high",
        message: "message",
        instanceId: "violation-color-contrast",
    };

    const linterIssue: Issue = {
        id: "categorizer 1 inaccessible",
        description: "description",
        helpUrl: "https://help",
        help: "help",
        impact: "medium",
        message: "message",
    };

    it("returns the instanceId when the issue has one", () => {
        expect(getIssueKey(a11yIssue)).toBe("violation-color-contrast");
    });

    it("falls back to the id when the issue has no instanceId", () => {
        expect(getIssueKey(linterIssue)).toBe("categorizer 1 inaccessible");
    });
});
