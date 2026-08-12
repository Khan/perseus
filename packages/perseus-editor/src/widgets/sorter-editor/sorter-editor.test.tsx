import {Dependencies} from "@khanacademy/perseus";
import {generateSorterOptions} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import SorterEditor from "./sorter-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("sorter-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", async () => {
        render(<SorterEditor onChange={() => {}} />);

        expect(screen.getByText("Correct answer:")).toBeInTheDocument();
    });

    it("should be possible to change layout to vertical", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        const select = screen.getByRole("combobox", {name: "Layout:"});
        await userEvent.selectOptions(select, "vertical");

        expect(onChangeMock).toHaveBeenCalledWith({layout: "vertical"});
    });

    it("should be possible to change layout to horizontal", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        const select = screen.getByRole("combobox", {name: "Layout:"});
        await userEvent.selectOptions(select, "horizontal");

        expect(onChangeMock).toHaveBeenCalledWith({layout: "horizontal"});
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        await userEvent.click(screen.getByRole("checkbox", {name: "Padding:"}));

        expect(onChangeMock).toHaveBeenCalledWith({padding: false});
    });

    it("renders an input for each card in the correct answer", () => {
        // Arrange, Act
        render(
            <SorterEditor
                onChange={() => {}}
                {...generateSorterOptions({correct: ["Cat", "Dog", "Emu"]})}
            />,
        );

        // Assert
        expect(screen.getByDisplayValue("Cat")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Dog")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Emu")).toBeInTheDocument();
    });

    it("serializes the correct answer, layout, and padding", () => {
        // Arrange
        const editorRef = React.createRef<SorterEditor>();
        render(
            <SorterEditor
                ref={editorRef}
                onChange={() => {}}
                {...generateSorterOptions({
                    correct: ["Cat", "Dog"],
                    layout: "vertical",
                    padding: false,
                })}
            />,
        );

        // Act
        const serialized = editorRef.current?.serialize();

        // Assert
        expect(serialized).toEqual({
            correct: ["Cat", "Dog"],
            layout: "vertical",
            padding: false,
        });
    });
});
