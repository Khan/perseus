import {Dependencies} from "@khanacademy/perseus";
import {freeResponseLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
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
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                question="test-question"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Question")).toBeInTheDocument();
        expect(screen.getByDisplayValue("test-question")).toBeInTheDocument();
    });

    it("calls onChange when the allow unlimited characters is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                allowUnlimitedCharacters={false}
                onChange={onChangeMock}
            />,
        );

        await userEvent.click(
            screen.getByRole("checkbox", {name: /Allow unlimited characters/i}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            allowUnlimitedCharacters: true,
        });
    });

    it("calls onChange when the character limit is changed to a number", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                characterLimit={0}
                onChange={onChangeMock}
            />,
        );

        await userEvent.type(screen.getByLabelText(/Character limit/), "1");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({characterLimit: 1});
    });

    it("does not call onChange when the character limit is changed to a non-number", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                characterLimit={5}
                onChange={onChangeMock}
            />,
        );

        await userEvent.type(screen.getByLabelText(/Character limit/), "e");

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("calls onChange when the question is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
            />,
        );
        await userEvent.type(screen.getByLabelText("Question"), "2");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({question: "2"});
    });

    it("calls onChange when the placeholder is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                placeholder="test-placeholder"
                onChange={onChangeMock}
            />,
        );

        await userEvent.type(screen.getByLabelText("Placeholder"), "2");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            placeholder: "test-placeholder2",
        });
    });

    it("calls onChange when a criterion is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                onChange={onChangeMock}
                scoringCriteria={[{text: ""}]}
            />,
        );
        await userEvent.type(screen.getByLabelText("Criterion 1"), "2");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            scoringCriteria: [{text: "2"}],
        });
    });

    it("returns a warning when the question is empty", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                question=""
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.getSaveWarnings()).toEqual([
            "The question is empty",
        ]);
    });

    it("returns a warning when the question contains a widget placeholder", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                question="[[☃ radio 1]]"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.getSaveWarnings()).toEqual([
            "The question contains a widget",
        ]);
    });

    it("does not return a warning when the placeholder is empty", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                placeholder=""
                question="test-question"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.getSaveWarnings()).toEqual([]);
    });

    it("serializes the question value", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                question="test-question"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.serialize()).toMatchObject({
            question: "test-question",
        });
    });

    it("serializes the criteria values", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                question="test-question"
                scoringCriteria={[
                    {text: "test-criterion-1"},
                    {text: "test-criterion-2"},
                ]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.serialize()).toMatchObject({
            scoringCriteria: [
                {text: "test-criterion-1"},
                {text: "test-criterion-2"},
            ],
        });
    });

    it("the question defaults to an empty string", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.serialize()).toMatchObject({
            question: "",
        });
    });

    it("the scoringCriteria defaults to an array with one empty value", async () => {
        // Arrange
        const ref = React.createRef<FreeResponseEditor>();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                ref={ref}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(ref.current?.serialize()).toMatchObject({
            scoringCriteria: [{text: ""}],
        });
    });

    it("adds another criterion when the add button is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                scoringCriteria={[{text: "criterion-1"}]}
                onChange={onChangeMock}
            />,
        );
        await userEvent.click(
            screen.getByRole("button", {name: /Add an item/i}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            scoringCriteria: [{text: "criterion-1"}, {text: ""}],
        });
    });

    it("prevents deleting the only criterion by hiding the delete button", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                {...freeResponseLogic.initializeWidgetOptions()}
                scoringCriteria={[{text: "criterion-1"}]}
                onChange={onChangeMock}
            />,
        );

        expect(
            screen.queryByRole("button", {name: /Delete/i}),
        ).not.toBeInTheDocument();

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("deletes a criterion when the delete button is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(
            <FreeResponseEditor
                scoringCriteria={[{text: "criterion-1"}, {text: "criterion-2"}]}
                onChange={onChangeMock}
            />,
        );
        await userEvent.click(
            screen.getByRole("button", {name: /Delete criterion 1/i}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            scoringCriteria: [{text: "criterion-2"}],
        });
    });
});
