import Color from "@khanacademy/wonder-blocks-color";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom";

import Key from "../../../data/keys";
import {createMathField} from "../../input/mathquill-instance";
import {MathFieldInterface} from "../../input/mathquill-types";
import keyTranslator from "../../key-handlers/key-translator";
import Keypad from "../index";

type Props = {
    onChangeMathInput: (mathInputTex: string) => void;
};

function V2KeypadWithMathquill(props: Props) {
    const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathField, setMathField] = React.useState<MathFieldInterface>();

    React.useEffect(() => {
        if (!mathField && mathFieldWrapperRef.current) {
            const mathFieldInstance = createMathField(
                mathFieldWrapperRef.current,
                (baseConfig) => {
                    return {
                        ...baseConfig,
                        handlers: {
                            edit: (mathField) => {
                                props.onChangeMathInput(mathField.latex());
                            },
                        },
                    };
                },
            );
            setMathField(mathFieldInstance);
        }
    }, [mathField, props]);

    function handleClickKey(key: Key) {
        if (!mathField) {
            return;
        }

        const mathFieldCallback = keyTranslator[key];
        if (mathFieldCallback) {
            mathFieldCallback(mathField, key);
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
                opened
            >
                <div
                    style={{
                        width: "100%",
                        marginBottom: "1em",
                        border: `1px solid ${Color.offBlack16}`,
                    }}
                    ref={mathFieldWrapperRef}
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

        // a^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // +
        userEvent.click(screen.getByRole("button", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));

        // b^2 =
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));
        userEvent.click(screen.getByRole("button", {name: "Equals sign"}));

        // c^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "c"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2=c^2");
    });

    it("can write the Pythagorean theorem (complex)", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // c = /Square root
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "c"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Equals sign"}));
        userEvent.click(screen.getByRole("button", {name: "Square root"}));

        // a^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "a"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // +
        userEvent.click(screen.getByRole("button", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));

        // b^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith(
            "c=\\sqrt{a^2+b^2}",
        );
    });

    it("writes the Pythagorean theorem using typing/clicking together", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // Argument is empty because mathquill generates textarea w/o label
        userEvent.type(screen.getByRole("textbox"), "a");
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));

        userEvent.type(screen.getByRole("textbox"), "+");

        // b^2
        userEvent.click(screen.getByRole("button", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "b"}));
        userEvent.click(screen.getByRole("button", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Square"}));
        userEvent.type(screen.getByRole("textbox"), "=c^2");

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2=c^2");
    });

    it("deletes from the input using the backspace button", () => {
        // Arrange
        const mockMathInputCallback = jest.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act
        // Write `a^2+b^2=c^2` using the keypad
        const buttonPressesForFormula = [
            "Extras",
            "a",
            "Operators",
            "Square",
            "Numbers",
            "Plus",
            "Extras",
            "b",
            "Operators",
            "Square",
            "Equals sign",
            "Extras",
            "c",
            "Operators",
            "Square",
        ];
        buttonPressesForFormula.forEach((button) => {
            userEvent.click(screen.getByRole("button", {name: button}));
        });

        // Assert
        // make sure the formula was typed correctly
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^2+b^2=c^2");

        userEvent.click(screen.getByRole("button", {name: "Numbers"}));
        // delete: need 14 backspaces in MathQuill to delete `a^2+b^2=c^2`
        for (let i = 0; i < 14; i++) {
            userEvent.click(screen.getByRole("button", {name: "Delete"}));
        }

        expect(mockMathInputCallback).toHaveBeenLastCalledWith("");
    });
});
