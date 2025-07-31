import {describe, it} from "@jest/globals";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import Indicator from "../choice-indicator.new";

describe("Multiple choice indicator", () => {
    let iconMock: jest.SpyInstance;
    let mockClickHandler: jest.Mock;
    let buttonRef: React.Ref<HTMLButtonElement>;

    beforeEach(() => {
        // @ts-expect-error TS2769: No overload matches this call.
        iconMock = jest.spyOn(PhosphorIcon, "render");
        mockClickHandler = jest.fn();
        buttonRef = React.createRef<HTMLButtonElement>();
    });

    describe("with/without icons", () => {
        it(`renders WITHOUT any icons when indicator is checked and NOT in review mode`, async () => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={true}
                    shape="circle"
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(iconMock).toHaveBeenCalledTimes(0);
            expect(screen.getByRole("button").innerHTML).toBe("A");
        });

        it(`renders WITHOUT any icons when indicator is checked and review mode is NOT valid`, async () => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={true}
                    shape="circle"
                    content="A"
                    showCorrectness={undefined}
                    updateChecked={mockClickHandler}
                />,
            );
            expect(iconMock).toHaveBeenCalledTimes(0);
            expect(screen.getByRole("button").innerHTML).toBe("A");
        });

        it.each(["correct", "wrong"] as const)(
            "renders WITHOUT any icons when in review mode (%s) and indicator is NOT checked",
            async (correctness) => {
                render(
                    <Indicator
                        buttonRef={buttonRef}
                        checked={false}
                        shape="circle"
                        content="A"
                        showCorrectness={correctness}
                        updateChecked={mockClickHandler}
                    />,
                );
                expect(iconMock).toHaveBeenCalledTimes(0);
                expect(screen.getByRole("button").innerHTML).toBe("A");
            },
        );

        it(`renders with a CHECKMARK icon when in review mode and is CORRECT (and indicator is checked)`, async () => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={true}
                    shape="circle"
                    content="A"
                    showCorrectness="correct"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(iconMock).toHaveBeenCalledTimes(1);
            expect(iconMock.mock.calls[0][0].icon).toBe("check-bold.svg");
            const buttonIcon = screen
                .getByRole("button")
                // eslint-disable-next-line testing-library/no-node-access
                .querySelector("[role='img']");
            expect(buttonIcon).toBeInTheDocument();
        });

        it(`renders with a MINUS-CIRCLE icon when in review mode and is WRONG (and indicator is checked)`, async () => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={true}
                    shape="circle"
                    content="A"
                    showCorrectness="wrong"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(iconMock).toHaveBeenCalledTimes(1);
            expect(iconMock.mock.calls[0][0].icon).toBe(
                "minus-circle-bold.svg",
            );
            const buttonIcon = screen
                .getByRole("button")
                // eslint-disable-next-line testing-library/no-node-access
                .querySelector("[role='img']");
            expect(buttonIcon).toBeInTheDocument();
        });
    });

    describe("styling options", () => {
        it.each(["circle", "square"] as const)("renders as a %s", (shape) => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={false}
                    shape={shape}
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );
            const classes = Array.from(screen.getByRole("button").classList);
            expect(classes).toContain(`${shape}-shape`);
        });
    });

    describe("click handling", () => {
        it("executes the supplied click handler when NOT in review mode", () => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={false}
                    shape="circle"
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );
            act(() => {
                screen.getByRole("button").click();
            });
            expect(mockClickHandler).toHaveBeenCalledTimes(1);
        });

        it("does NOT execute the supplied click handler when in review mode", () => {
            render(
                <Indicator
                    buttonRef={buttonRef}
                    checked={false}
                    shape="circle"
                    content="A"
                    showCorrectness="correct"
                    updateChecked={mockClickHandler}
                />,
            );
            act(() => {
                screen.getByRole("button").click();
            });
            expect(mockClickHandler).toHaveBeenCalledTimes(0);
        });

        it.each`
            checked  | expected
            ${true}  | ${false}
            ${false} | ${true}
        `(
            "passes '$expected' to the click handler when 'checked' attribute is '$checked'",
            (args) => {
                const {checked, expected} = args as {
                    checked: boolean;
                    expected: boolean;
                };
                render(
                    <Indicator
                        buttonRef={buttonRef}
                        checked={checked}
                        shape="circle"
                        content="A"
                        updateChecked={mockClickHandler}
                    />,
                );
                act(() => {
                    screen.getByRole("button").click();
                });
                expect(mockClickHandler).toHaveBeenCalledWith(expected);
            },
        );
    });
});
