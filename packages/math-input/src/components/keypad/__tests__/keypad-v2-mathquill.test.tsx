import Color from "@khanacademy/wonder-blocks-color";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MathQuill from "mathquill";
import * as React from "react";

import "@testing-library/jest-dom";

import Key from "../../../data/keys";
import keyTranslator from "../../key-translator";
import Keypad from "../index";

type Props = {
    onChangeMathInput: (mathInputTex) => void;
};

function V2KeypadWithMathquill(props: Props) {
    const mathquillWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathQuill, setMathQuill] = React.useState<MathQuill>();

    React.useEffect(() => {
        if (!mathQuill && mathquillWrapperRef.current) {
            const MQ = MathQuill.getInterface(2);
            const mathQuillInstance = MQ.MathField(
                mathquillWrapperRef.current,
                {
                    autoCommands: "pi theta phi sqrt nthroot",
                    charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",
                    supSubsRequireOperand: true,
                    spaceBehavesLikeTab: true,
                    handlers: {
                        edit: () =>
                            props.onChangeMathInput(mathQuillInstance.latex()),
                    },
                },
            );
            setMathQuill(mathQuillInstance);
        }
    }, [mathQuill, props]);

    function handleClickKey(key: Key) {
        if (!mathQuill) {
            return;
        }

        const mathQuillCallback = keyTranslator[key];
        if (mathQuillCallback) {
            mathQuillCallback(mathQuill, key);
        } else {
            // eslint-disable-next-line no-console
            console.warn(`No translation to Mathquill for: ${key}`);
        }
    }

    return (
        <div style={{maxWidth: "400px", margin: "2em"}}>
            <Popover
                content={
                    <div>
                        <Keypad
                            extraKeys={["a", "b", "c"]}
                            onClickKey={handleClickKey}
                            advancedRelations
                            basicRelations
                            divisionKey
                            logarithms
                            multiplicationDot
                            preAlgebra
                            trigonometry
                        />
                    </div>
                }
                dismissEnabled
            >
                <div
                    style={{
                        width: "100%",
                        marginBottom: "1em",
                        border: `1px solid ${Color.offBlack16}`,
                    }}
                    ref={mathquillWrapperRef}
                    data-test-id="mathquill-input"
                />
            </Popover>
        </div>
    );
}

describe("Keypad v2 with MathQuill", () => {
    it("can write the Pythagorean theorem (simple)", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act
        userEvent.click(screen.getByTestId("mathquill-input"));

        // a^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "EXP_2"}));

        // +
        userEvent.click(screen.getByRole("button", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "PLUS"}));

        // b^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "EXP_2"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2");
    });

    it("can write the Pythagorean theorem (complex)", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act
        userEvent.click(screen.getByTestId("mathquill-input"));

        // c = /sqrt
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "c"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "EQUAL"}));
        userEvent.click(screen.getByRole("button", {name: "SQRT"}));

        // a^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "EXP_2"}));

        // +
        userEvent.click(screen.getByRole("button", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "PLUS"}));

        // b^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "EXP_2"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith(
            "c=\\sqrt{a^2+b^2}",
        );
    });

    it("can write the Pythagorean theorem (simple) with typing", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act
        userEvent.type(screen.getByRole("textbox", {}), "a^2+");
        userEvent.dblClick(screen.getByTestId("mathquill-input"));

        // b^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "EXP_2"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2");
    });
});
