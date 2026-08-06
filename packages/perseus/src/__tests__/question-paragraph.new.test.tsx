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
});
