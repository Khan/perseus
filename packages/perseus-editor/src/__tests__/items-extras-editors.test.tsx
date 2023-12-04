import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import ItemExtrasEditor from "../item-extras-editor";

describe("ItemExtrasEditor", () => {
    it("should render correctly with default props", () => {
        // Arrange
        const onChangeMock = jest.fn();

        // Act
        render(<ItemExtrasEditor onChange={onChangeMock} />);

        // Assert
        expect(
            screen.getByLabelText("Show periodic table:"),
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Show periodic table:")).not.toBeChecked();
    });

    it("should call onChange with updated calculator value", () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<ItemExtrasEditor calculator={false} onChange={onChangeMock} />);
        const checkbox = screen.getByLabelText("Show calculator:");

        // Act
        userEvent.click(checkbox);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({calculator: true});
    });

    it("should call onChange with updated periodicTableWithKey value when periodicTable is unchecked", () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ItemExtrasEditor
                periodicTable={true}
                periodicTableWithKey={true}
                onChange={onChangeMock}
            />,
        );
        const checkbox = screen.getByLabelText("Show periodic table:");

        // Act
        userEvent.click(checkbox);

        // Assert
        expect(onChangeMock).toHaveBeenNthCalledWith(1, {
            periodicTable: false,
        });
        expect(onChangeMock).toHaveBeenNthCalledWith(2, {
            periodicTableWithKey: false,
        });
    });
});
