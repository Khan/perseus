import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import SorterEditor from "../sorter-editor";

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
});
