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
    onChangeMathInput: (mathInputTex: string) => void;
};

function V2KeypadWithMathquill(props: Props) {
    const mathquillWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathField, setMathField] = React.useState();

    React.useEffect(() => {
        if (!mathField && mathquillWrapperRef.current) {
            const MQ = MathQuill.getInterface(2);
            const mathFieldInstance = MQ.MathField(
                mathquillWrapperRef.current,
                {
                    charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",
                    handlers: {
                        edit: () =>
                            props.onChangeMathInput(mathFieldInstance.latex()),
                    },
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
                    ref={mathquillWrapperRef}
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
});
