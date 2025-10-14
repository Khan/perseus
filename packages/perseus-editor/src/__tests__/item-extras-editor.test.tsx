import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import React, {useState} from "react";

import ItemExtrasEditor from "../item-extras-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("ItemExtrasEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should render correctly with default props", async () => {
        // Act
        render(
            <ItemExtrasEditor editingDisabled={false} onChange={() => {}} />,
        );

        // Assert
        expect(
            screen.getByRole("checkbox", {name: "Show calculator"}),
        ).not.toBeChecked();
        expect(
            screen.getByRole("checkbox", {name: "Show periodic table"}),
        ).not.toBeChecked();
        expect(
            screen.queryByText("Include key/legend with periodic table"),
        ).not.toBeInTheDocument();
    });

    it("should call onChange with updated calculator value", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ItemExtrasEditor
                editingDisabled={false}
                calculator={false}
                onChange={onChangeMock}
            />,
        );
        const checkbox = screen.getByRole("checkbox", {
            name: "Show calculator",
        });

        // Act
        await userEvent.click(checkbox);

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({calculator: true});
    });

    it("should call onChange with updated periodicTableWithKey value when periodicTable is unchecked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <ItemExtrasEditor
                editingDisabled={false}
                periodicTable={true}
                periodicTableWithKey={true}
                onChange={onChangeMock}
            />,
        );
        const checkbox = screen.getByRole("checkbox", {
            name: "Show periodic table",
        });

        // Act
        await userEvent.click(checkbox);

        // Assert
        // visible when periodicTable is checked
        expect(
            screen.getByText("Include key/legend with periodic table"),
        ).toBeInTheDocument();
        expect(onChangeMock).toHaveBeenCalledWith({
            periodicTable: false,
            periodicTableWithKey: false,
        });
    });

    describe("financial calculator", () => {
        function TestComponent(props: {
            monthlyPayment?: boolean;
            totalAmount?: boolean;
            timeToPayOff?: boolean;
        }) {
            const [monthlyPayment, setMonthlyPayment] = useState(
                props.monthlyPayment || false,
            );
            const [totalAmount, setTotalAmount] = useState(
                props.totalAmount || false,
            );
            const [timeToPayOff, setTimeToPayOff] = useState(
                props.timeToPayOff || false,
            );

            function handleChange(newProps: any) {
                if ("financialCalculatorMonthlyPayment" in newProps) {
                    setMonthlyPayment(
                        newProps.financialCalculatorMonthlyPayment,
                    );
                }
                if ("financialCalculatorTotalAmount" in newProps) {
                    setTotalAmount(newProps.financialCalculatorTotalAmount);
                }
                if ("financialCalculatorTimeToPayOff" in newProps) {
                    setTimeToPayOff(newProps.financialCalculatorTimeToPayOff);
                }
            }

            return (
                <ItemExtrasEditor
                    editingDisabled={false}
                    onChange={handleChange}
                    financialCalculatorMonthlyPayment={monthlyPayment}
                    financialCalculatorTotalAmount={totalAmount}
                    financialCalculatorTimeToPayOff={timeToPayOff}
                />
            );
        }

        it("when parent checkbox is clicked, children also become checked", async () => {
            // Arrange
            render(<TestComponent />);

            // Act
            const checkbox = screen.getByRole("checkbox", {
                name: "Show financial calculator",
            });
            await userEvent.click(checkbox);

            // Assert
            expect(checkbox).toBeChecked();
            expect(
                screen.getByRole("checkbox", {name: "Include monthly payment"}),
            ).toBeChecked();
            expect(
                screen.getByRole("checkbox", {name: "Include total amount"}),
            ).toBeChecked();
            expect(
                screen.getByRole("checkbox", {name: "Include time-to-pay-off"}),
            ).toBeChecked();
        });

        it("when child starts off checked, parent is also checked", async () => {
            // Arrange
            render(<TestComponent monthlyPayment={true} />);

            // Assert
            expect(
                screen.getByRole("checkbox", {
                    name: "Show financial calculator",
                }),
            ).toBeChecked();
            expect(
                screen.getByRole("checkbox", {name: "Include monthly payment"}),
            ).toBeChecked();
            expect(
                screen.getByRole("checkbox", {name: "Include total amount"}),
            ).not.toBeChecked();
            expect(
                screen.getByRole("checkbox", {name: "Include time-to-pay-off"}),
            ).not.toBeChecked();
        });

        it("when child starts off checked and is unchecked, parent is unchecked", async () => {
            // Arrange
            render(<TestComponent monthlyPayment={true} />);

            // Act
            await userEvent.click(
                screen.getByRole("checkbox", {name: "Include monthly payment"}),
            );

            // Assert
            expect(
                screen.getByRole("checkbox", {
                    name: "Show financial calculator",
                }),
            ).not.toBeChecked();
            expect(
                screen.queryByLabelText("Include monthly payment"),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByLabelText("Include total amount"),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByLabelText("Include time-to-pay-off"),
            ).not.toBeInTheDocument();
        });

        it("when parent is checked, callback should check children", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ItemExtrasEditor
                    editingDisabled={false}
                    onChange={onChangeMock}
                />,
            );
            const checkbox = screen.getByRole("checkbox", {
                name: "Show financial calculator",
            });

            // Act
            await userEvent.click(checkbox);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                financialCalculatorMonthlyPayment: true,
                financialCalculatorTotalAmount: true,
                financialCalculatorTimeToPayOff: true,
            });
        });

        it("when parent is unchecked, callback should uncheck children", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <ItemExtrasEditor
                    editingDisabled={false}
                    onChange={onChangeMock}
                    financialCalculatorMonthlyPayment={true}
                    financialCalculatorTotalAmount={true}
                    financialCalculatorTimeToPayOff={true}
                />,
            );
            const checkbox = screen.getByRole("checkbox", {
                name: "Show financial calculator",
            });

            // Act
            await userEvent.click(checkbox);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
            });
        });
    });
});
