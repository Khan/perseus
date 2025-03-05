import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import FreeResponseEditor from "../free-response-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("free-response editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders the question", async () => {
        // Act
        render(
            <FreeResponseEditor question="test-question" onChange={() => {}} />,
        );

        // Assert
        expect(screen.getByText("Question")).toBeInTheDocument();
        expect(screen.getByDisplayValue("test-question")).toBeInTheDocument();
    });

    it("calls onChange when the question is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(<FreeResponseEditor onChange={onChangeMock} />);
        await userEvent.type(screen.getByLabelText("Question"), "2");

        // Assert
        expect(onChangeMock).toBeCalledWith({question: "2"});
    });

    it("returns a warning when the question is empty", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor ref={ref} question="" onChange={() => {}} />,
        );

        // Assert
        expect(ref.current?.getSaveWarnings()).toEqual([
            "The question is empty",
        ]);
    });

    it("serializes the question value", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                ref={ref}
                question="test-question"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.serialize()).toEqual({
            question: "test-question",
        });
    });

    it("the question defaults to an empty string", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(<FreeResponseEditor ref={ref} onChange={() => {}} />);

        // Assert
        expect(ref.current?.serialize()).toEqual({
            question: "",
        });
    });
});
