import {describe, it} from "@jest/globals";
import Button from "@khanacademy/wonder-blocks-button";
import {render} from "@testing-library/react";
import * as React from "react";

import Indicator from "../multiple-choice-indicator";

describe("Multiple choice indicator", () => {
    let buttonMock: jest.SpyInstance;
    let mockClickHandler: jest.SpyInstance;

    beforeEach(() => {
        // @ts-expect-error TS2769: No overload matches this call.
        buttonMock = jest.spyOn(Button, "render");
        mockClickHandler = jest.fn();
    });

    describe("generic rendering", () => {
        it(`renders as a neutral secondary button when NOT checked`, async () => {
            render(
                <Indicator
                    checked={false}
                    shape="circle"
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(buttonMock).toHaveBeenCalledTimes(1);
            expect(buttonMock.mock.calls[0][0].actionType).toBe("neutral");
            expect(buttonMock.mock.calls[0][0].kind).toBe("secondary");
        });

        it(`renders as a progressive primary button when checked`, async () => {
            render(
                <Indicator
                    checked={true}
                    shape="circle"
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(buttonMock).toHaveBeenCalledTimes(1);
            expect(buttonMock.mock.calls[0][0].actionType).toBe("progressive");
            expect(buttonMock.mock.calls[0][0].kind).toBe("primary");
        });

        it(`renders WITHOUT any icons when indicator is checked and NOT in review mode`, async () => {
            render(
                <Indicator
                    checked={true}
                    shape="circle"
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(buttonMock).toHaveBeenCalledTimes(1);
            expect(buttonMock.mock.calls[0][0].startIcon).toBe(undefined);
            expect(buttonMock.mock.calls[0][0].endIcon).toBe(undefined);
        });

        it(`renders WITHOUT any icons when indicator is checked and review mode is NOT valid`, async () => {
            render(
                <Indicator
                    checked={true}
                    shape="circle"
                    content="A"
                    showCorrectness="foo"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(buttonMock).toHaveBeenCalledTimes(1);
            expect(buttonMock.mock.calls[0][0].startIcon).toBe(undefined);
            expect(buttonMock.mock.calls[0][0].endIcon).toBe(undefined);
        });

        it.each(["correct", "wrong"])(
            "renders WITHOUT any icons when in review mode (%s) and indicator is NOT checked",
            async (correctness) => {
                render(
                    <Indicator
                        checked={false}
                        shape="circle"
                        content="A"
                        showCorrectness={correctness}
                        updateChecked={mockClickHandler}
                    />,
                );
                expect(buttonMock).toHaveBeenCalledTimes(1);
                expect(buttonMock.mock.calls[0][0].startIcon).toBe(undefined);
                expect(buttonMock.mock.calls[0][0].endIcon).toBe(undefined);
            },
        );

        it(`renders with a CHECKMARK icon when in review mode and is CORRECT (and indicator is checked)`, async () => {
            render(
                <Indicator
                    checked={true}
                    shape="circle"
                    content="A"
                    showCorrectness="correct"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(buttonMock).toHaveBeenCalledTimes(1);
            expect(buttonMock.mock.calls[0][0].startIcon).toBe(
                "check-bold.svg",
            );
            expect(buttonMock.mock.calls[0][0].endIcon).toBe(undefined);
        });

        it(`renders with a MINUS-CIRCLE icon when in review mode and is WRONG (and indicator is checked)`, async () => {
            render(
                <Indicator
                    checked={true}
                    shape="circle"
                    content="A"
                    showCorrectness="wrong"
                    updateChecked={mockClickHandler}
                />,
            );
            expect(buttonMock).toHaveBeenCalledTimes(1);
            expect(buttonMock.mock.calls[0][0].startIcon).toBe(
                "minus-circle-bold.svg",
            );
            expect(buttonMock.mock.calls[0][0].endIcon).toBe(undefined);
        });

        it.each(["circle", "square"])("renders as a %s", (shape) => {
            render(
                <Indicator
                    checked={true}
                    shape={shape}
                    content="A"
                    updateChecked={mockClickHandler}
                />,
            );

            // TODO: Check the className for the shape

        });
    });
});
