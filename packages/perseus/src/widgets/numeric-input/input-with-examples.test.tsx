import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";

import InputWithExamples from "./input-with-examples";

import type {UserEvent} from "@testing-library/user-event";

describe("InputWithExamples", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    const defaultProps = {
        value: "",
        onChange: jest.fn(),
        examples: ["example 1", "example 2"],
        shouldShowExamples: true,
        id: "test-input",
    };

    it("renders without crashing", () => {
        render(<InputWithExamples {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("displays examples tooltip when focused and shouldShowExamples is true", async () => {
        render(<InputWithExamples {...defaultProps} />);

        const input = screen.getByRole("textbox");
        await userEvent.click(input);

        // The tooltip content is rendered in the tooltip, not the aria text
        expect(
            screen.getByText("example 1 example 2", {selector: ".paragraph"}),
        ).toBeInTheDocument();
    });

    it("does not display examples tooltip when shouldShowExamples is false", async () => {
        render(
            <InputWithExamples {...defaultProps} shouldShowExamples={false} />,
        );

        const input = screen.getByRole("textbox");
        await userEvent.click(input);

        expect(
            screen.queryByText("example 1 example 2"),
        ).not.toBeInTheDocument();
    });

    describe("aria text processing", () => {
        it("removes asterisks from examples for screen readers", () => {
            const examplesWithAsterisks = ["*example*", "test*"];
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={examplesWithAsterisks}
                />,
            );

            // The aria text should be in a hidden span and formatted with first example, newline, then "or" and rest
            const ariaElement = screen.getByText((content, element) => {
                return (
                    element?.tagName === "SPAN" &&
                    content.includes("example") &&
                    content.includes("test") &&
                    !content.includes("*")
                );
            });
            expect(ariaElement).toHaveStyle({display: "none"});
        });

        it("removes dollar signs from examples for screen readers", () => {
            const examplesWithDollars = ["$example$", "test$"];
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={examplesWithDollars}
                />,
            );

            const ariaElement = screen.getByText((content, element) => {
                return (
                    element?.tagName === "SPAN" &&
                    content.includes("example") &&
                    content.includes("test") &&
                    !content.includes("$")
                );
            });
            expect(ariaElement).toHaveStyle({display: "none"});
        });

        it("replaces TeX pi notation with readable text for screen readers", () => {
            const examplesWithPi = ["\\ \\text{pi}", "2\\ \\text{pi}"];
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={examplesWithPi}
                />,
            );

            const ariaElement = screen.getByText((content, element) => {
                return (
                    element?.tagName === "SPAN" &&
                    content.includes("pi") &&
                    content.includes("2") &&
                    !content.includes("\\text{pi}")
                );
            });
            expect(ariaElement).toHaveStyle({display: "none"});
        });

        it("replaces backslash-space notation with 'and' for screen readers", () => {
            const examplesWithBackslash = ["example\\ test", "another"];
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={examplesWithBackslash}
                />,
            );

            const ariaElement = screen.getByText((content, element) => {
                return (
                    element?.tagName === "SPAN" &&
                    content.includes("example") &&
                    content.includes("and") &&
                    content.includes("test") &&
                    content.includes("another")
                );
            });
            expect(ariaElement).toHaveStyle({display: "none"});
        });

        it("processes multiple text replacements correctly", () => {
            const complexExamples = ["*$\\ \\text{pi}*$", "\\ test"];
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={complexExamples}
                />,
            );

            // Should remove *, $, replace \text{pi} with pi, and \ with "and"
            const ariaElement = screen.getByText((content, element) => {
                return (
                    element?.tagName === "SPAN" &&
                    content.includes("pi") &&
                    content.includes("and") &&
                    content.includes("test") &&
                    !content.includes("*") &&
                    !content.includes("$")
                );
            });
            expect(ariaElement).toHaveStyle({display: "none"});
        });

        it("handles empty examples array", () => {
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={[]}
                    shouldShowExamples={false}
                />,
            );

            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("processes examples with multiple occurrences of the same character", () => {
            const examplesWithMultiple = ["***test***", "$$$money$$$"];
            render(
                <InputWithExamples
                    {...defaultProps}
                    examples={examplesWithMultiple}
                />,
            );

            const ariaElement = screen.getByText((content, element) => {
                return (
                    element?.tagName === "SPAN" &&
                    content.includes("test") &&
                    content.includes("money") &&
                    !content.includes("*") &&
                    !content.includes("$")
                );
            });
            expect(ariaElement).toHaveStyle({display: "none"});
        });
    });

    it("calls onChange when input value changes", async () => {
        const mockOnChange = jest.fn();
        render(<InputWithExamples {...defaultProps} onChange={mockOnChange} />);

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "123");

        expect(mockOnChange).toHaveBeenCalled();
    });
});
