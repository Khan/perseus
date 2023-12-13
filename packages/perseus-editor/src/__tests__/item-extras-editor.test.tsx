import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import ItemExtrasEditor from "../item-extras-editor";

describe("ItemExtrasEditor", () => {
    it("should render correctly with default props", () => {
        // Act
        render(<ItemExtrasEditor onChange={() => {}} />);

        // Assert
        expect(screen.getByLabelText("Show calculator:")).not.toBeChecked();
        expect(screen.getByLabelText("Show periodic table:")).not.toBeChecked();
        expect(
            screen.queryByText("Include key/legend with periodic table:"),
        ).not.toBeInTheDocument();
        expect(
            screen.getByLabelText("Show z table (statistics):"),
        ).not.toBeChecked();
        expect(
            screen.getByLabelText("Show t table (statistics):"),
        ).not.toBeChecked();
        expect(
            screen.getByLabelText("Show chi-squared table (statistics):"),
        ).not.toBeChecked();
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
        // visible when periodicTable is checked
        expect(
            screen.getByText("Include key/legend with periodic table:"),
        ).toBeInTheDocument();
        expect(onChangeMock).toHaveBeenCalledWith({
            periodicTable: false,
            periodicTableWithKey: false,
        });
    });

    it("should call onChange on dependent values when financialCalculator is checked", () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(<ItemExtrasEditor onChange={onChangeMock} />);
        const checkbox = screen.getByLabelText("Show financial calculator:");

        // Act
        userEvent.click(checkbox);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            financialCalculatorMonthlyPayment: true,
            financialCalculatorTotalAmount: true,
            financialCalculatorTimeToPayOff: true,
        });
    });
});
