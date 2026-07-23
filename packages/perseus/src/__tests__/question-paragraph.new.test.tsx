import {render, screen} from "@testing-library/react";
import * as React from "react";

import QuestionParagraph from "../question-paragraph.new";

describe("QuestionParagraph", () => {
    it("renders children without a wrapper when JIPT information and className are absent", () => {
        // Arrange, Act
        const {container} = render(
            <QuestionParagraph>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        const child = screen.getByTestId("child");
        expect(child).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access
        expect(child.parentElement).toBe(container);
    });

    it("renders children without a wrapper when className is empty and JIPT information is absent", () => {
        // Arrange, Act
        const {container} = render(
            <QuestionParagraph className="   ">
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        const child = screen.getByTestId("child");
        // eslint-disable-next-line testing-library/no-node-access
        expect(child.parentElement).toBe(container);
    });

    it("wraps children in a <div> when a className is provided", () => {
        // Arrange, Act
        render(
            <QuestionParagraph className="my-class">
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper?.tagName).toBe("DIV");
        expect(wrapper).toHaveClass("my-class");
    });

    it("wraps children in a <div> when JIPT information is provided", () => {
        // Arrange, Act
        render(
            <QuestionParagraph translationIndex={2}>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper?.tagName).toBe("DIV");
    });

    it("appends the 'paragraph' class when JIPT information is provided", () => {
        // Arrange, Act
        render(
            <QuestionParagraph className="my-class" translationIndex={2}>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper).toHaveClass("my-class");
        expect(wrapper).toHaveClass("paragraph");
    });

    it("appends the 'paragraph' class when translationIndex is 0", () => {
        // A translationIndex of 0 is still a valid index, so it counts as
        // JIPT information being present. This test verifies that checking for
        // null values doesn't get coerced into a zero value in the check.

        // Arrange, Act
        render(
            <QuestionParagraph className="my-class" translationIndex={0}>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper).toHaveClass("my-class");
        expect(wrapper).toHaveClass("paragraph");
    });

    it("sets translation metadata attributes on the wrapper", () => {
        // Arrange, Act
        render(
            <QuestionParagraph translationIndex={3} paragraphIndex={5}>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper).toHaveAttribute("data-perseus-component-index", "3");
        expect(wrapper).toHaveAttribute("data-perseus-paragraph-index", "5");
    });

    it("does not set paragraphIndex metadata when JIPT information is absent", () => {
        // Arrange, Act
        render(
            <QuestionParagraph className="my-class" paragraphIndex={5}>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper).not.toHaveAttribute("data-perseus-paragraph-index");
    });

    it("uses only the className (without 'paragraph') when inline is true", () => {
        // Arrange, Act
        render(
            <QuestionParagraph
                className="my-class"
                translationIndex={2}
                inline={true}
            >
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper).toHaveClass("my-class");
        expect(wrapper).not.toHaveClass("paragraph");
    });

    it("omits the class attribute when the computed className is empty", () => {
        // Arrange, Act
        // JIPT information forces a wrapper, but with no className and inline
        // suppressing the "paragraph" class, the computed className is empty.
        render(
            <QuestionParagraph translationIndex={2} inline={true}>
                <span data-testid="child">Hello</span>
            </QuestionParagraph>,
        );

        // Assert
        const wrapper = screen.getByTestId("child").parentElement;
        expect(wrapper).not.toHaveAttribute("class");
    });
});
