import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import SorterEditor from "../sorter-editor";

describe("sorter-editor", () => {
    beforeEach(() => {
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
        userEvent.selectOptions(select, "vertical");

        expect(onChangeMock).toBeCalledWith({layout: "vertical"});
    });

    it("should be possible to change layout to horizontal", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        const select = screen.getByRole("combobox", {name: "Layout:"});
        userEvent.selectOptions(select, "horizontal");

        expect(onChangeMock).toBeCalledWith({layout: "horizontal"});
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        userEvent.click(screen.getByRole("checkbox", {name: "Padding:"}));

        expect(onChangeMock).toBeCalledWith({padding: false});
    });
});
