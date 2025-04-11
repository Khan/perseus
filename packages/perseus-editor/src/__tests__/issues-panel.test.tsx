import {render, screen, fireEvent} from "@testing-library/react";
import * as React from "react";

import IssuesPanel from "../issues-panel";

const makeIssue = (id: string, impact: string = "moderate") => ({
    id,
    help: "Example help",
    helpUrl: "http://example.com",
    impact,
    message: "Example message",
});

describe("IssuesPanel", () => {
    it("shows green icon and 0 issues when no data is passed", () => {
        render(<IssuesPanel violations={[]} incompletes={[]} />);
        expect(screen.getByText("0 issues")).toBeInTheDocument();

        const icon = screen
            .getByText("0 issues")
            .parentElement?.querySelector(
                '[data-icon-type="check-circle-fill.svg"]',
            );

        expect(icon).toBeInTheDocument();
    });

    it("shows yellow icon for incompletes", () => {
        render(
            <IssuesPanel violations={[]} incompletes={[makeIssue("inc1")]} />,
        );
        expect(screen.getByText("1 issue")).toBeInTheDocument();

        const icon = screen
            .getByText("1 issue")
            .parentElement?.querySelector(
                '[data-icon-type="warning-fill.svg"]',
            );

        expect(icon).toBeInTheDocument();
    });

    it("shows red icon for violations", () => {
        render(<IssuesPanel violations={[makeIssue("v1")]} incompletes={[]} />);
        expect(screen.getByText("1 issue")).toBeInTheDocument();

        const icon = screen
            .getByText("1 issue")
            .parentElement?.querySelector(
                '[data-icon-type="warning-octagon-fill.svg"]',
            );

        expect(icon).toBeInTheDocument();
    });

    it("renders multiple issues correctly", async () => {
        render(
            <IssuesPanel
                violations={[makeIssue("v1"), makeIssue("v2")]}
                incompletes={[makeIssue("inc1")]}
            />,
        );
        expect(screen.getByText("3 issues")).toBeInTheDocument();
    });

    it("opens the panel when the heading is clicked", () => {
        render(<IssuesPanel violations={[makeIssue("v1")]} incompletes={[]} />);
        const headingButton = screen.getByRole("button"); // The button in the heading
        fireEvent.click(headingButton); // Simulate click to open panel

        expect(screen.getByText("Violation: v1")).toBeInTheDocument();
    });

    it("closes the panel when the heading icon is clicked again", () => {
        render(<IssuesPanel violations={[makeIssue("v1")]} incompletes={[]} />);
        const headingIconButton = screen.getByRole("button");

        fireEvent.click(headingIconButton);
        expect(screen.getByText("Violation: v1")).toBeInTheDocument();

        fireEvent.click(headingIconButton);
        expect(screen.queryByText("Violation: v1")).not.toBeInTheDocument();
    });
});
