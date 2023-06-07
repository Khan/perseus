import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom/extend-expect";
import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import MathInput from "../math-input";

describe("Perseus' MathInput", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                buttonSets={["basic"]}
                labelText="test"
            />,
        );

        // Assert
        expect(screen.getByLabelText("test")).toBeInTheDocument();
    });

    it("is possible to type in the input", () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(<MathInput onChange={mockOnChange} buttonSets={["basic"]} />);

        // Act
        userEvent.type(screen.getByRole("textbox"), "12345");

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("12345");
    });

    it("is possible to use buttons", () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(<MathInput onChange={mockOnChange} buttonSets={["basic"]} />);

        // Act
        userEvent.type(screen.getByRole("textbox"), "1");
        userEvent.click(screen.getByRole("button", {name: "Plus"}));
        userEvent.type(screen.getByRole("textbox"), "2");
        userEvent.click(screen.getByRole("button", {name: "Minus"}));
        userEvent.type(screen.getByRole("textbox"), "3");

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2-3");
    });
});
