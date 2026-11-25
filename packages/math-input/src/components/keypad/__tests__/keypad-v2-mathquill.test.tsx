import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {useMathInputI18n} from "../../i18n-context";
import {createMathField} from "../../input/mathquill-instance";
import {getKeyTranslator} from "../../key-handlers/key-translator";
import Keypad from "../index";

import type {MathFieldInterface} from "../../input/mathquill-types";
import type {
    AnalyticsEventHandlerFn,
    KeypadKey,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

type Props = {
    onChangeMathInput: (mathInputTex: string) => void;
    keypadClosed?: boolean;
    onAnalyticsEvent?: AnalyticsEventHandlerFn;
    portuguese?: boolean;
};

function V2KeypadWithMathquill(props: Props) {
    const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathField, setMathField] = React.useState<MathFieldInterface>();
    const {onChangeMathInput, keypadClosed, onAnalyticsEvent} = props;
    const [keypadOpen, setKeypadOpen] = React.useState<boolean>(!keypadClosed);
    const {strings} = useMathInputI18n();

    if (props.portuguese) {
        strings.sin = "sen";
    } else {
        strings.sin = "sin";
    }

    React.useEffect(() => {
        if (!mathField && mathFieldWrapperRef.current) {
            const mathFieldInstance = createMathField(
                mathFieldWrapperRef.current,
                "en",
                strings,
                (baseConfig) => {
                    return {
                        ...baseConfig,
                        handlers: {
                            edit: (mathField) => {
                                onChangeMathInput(mathField.latex());
                            },
                        },
                    };
                },
            );
            setMathField(mathFieldInstance);
        }
    }, [mathField, strings, onChangeMathInput]);

    const keyTranslator = getKeyTranslator("en", strings);

    function handleClickKey(key: KeypadKey) {
        if (!mathField) {
            return;
        }

        if (key === "DISMISS") {
            setKeypadOpen(false);
        }

        const mathFieldCallback = keyTranslator[key];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (mathFieldCallback) {
            mathFieldCallback(mathField, key);
        }
    }

    return (
        <div style={{maxInlineSize: "400px", margin: "2em"}}>
            <Popover
                content={
                    <PopoverContentCore>
                        <Keypad
                            extraKeys={["a", "b", "c"]}
                            onClickKey={handleClickKey}
                            advancedRelations
                            basicRelations
                            divisionKey
                            logarithms
                            convertDotToTimes
                            preAlgebra
                            trigonometry
                            onAnalyticsEvent={
                                onAnalyticsEvent
                                    ? onAnalyticsEvent
                                    : async () => {}
                            }
                            showDismiss
                        />
                    </PopoverContentCore>
                }
                dismissEnabled
                opened={keypadOpen}
            >
                <div
                    style={{
                        width: "100%",
                        marginBlockEnd: "1em",
                        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
                    }}
                    ref={mathFieldWrapperRef}
                />
            </Popover>
            <button
                aria-label="Keypad toggle"
                onClick={() => setKeypadOpen(!keypadOpen)}
            >
                {keypadOpen ? "close keypad" : "open keypad"}
            </button>
        </div>
    );
}

describe("Keypad v2 with MathQuill", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: rs.advanceTimersByTime,
        });
    });

    it("can write an indexed variable using the subscript button", async () => {
        // Arrange
        const mockMathInputCallback = rs.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act

        // use the keypad for `a_{1}`
        await userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        await userEvent.click(screen.getByRole("button", {name: "a"}));
        await userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        await userEvent.click(screen.getByRole("button", {name: "Subscript"}));
        await userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        await userEvent.click(screen.getByRole("button", {name: "1"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a_{1}");
    });

    it("allows text entry via typing", async () => {
        // Arrange
        const mockMathInputCallback = rs.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act
        await userEvent.type(screen.getByRole("textbox"), "a^2");

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("a^{2}");
    });

    it("deletes from the input using the backspace button", async () => {
        // Arrange
        const mockMathInputCallback = rs.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        await userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(screen.getByRole("button", {name: "2"}));

        // Pre-assert: make sure text entry worked
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("12");

        // Act:
        await userEvent.click(screen.getByRole("button", {name: "Delete"}));

        // Assert:
        expect(mockMathInputCallback).toHaveBeenLastCalledWith("1");
    });

    // Keypad event tests
    it("fires the keypad open event on open", async () => {
        // Arrange
        const mockAnalyticsEventHandler = rs.fn();
        render(
            <V2KeypadWithMathquill
                onChangeMathInput={() => {}}
                keypadClosed={true}
                onAnalyticsEvent={mockAnalyticsEventHandler}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Keypad toggle"}),
        );

        // Assert
        expect(mockAnalyticsEventHandler).toHaveBeenLastCalledWith({
            type: "math-input:keypad-opened",
            payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
        });
    });

    // Keypad event tests
    it("fires the keypad open event on close", async () => {
        // Arrange
        const mockAnalyticsEventHandler = rs.fn();
        render(
            <V2KeypadWithMathquill
                onChangeMathInput={() => {}}
                onAnalyticsEvent={mockAnalyticsEventHandler}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Keypad toggle"}),
        );

        // Assert
        expect(mockAnalyticsEventHandler).toHaveBeenLastCalledWith({
            type: "math-input:keypad-closed",
            payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
        });
    });

    it("handles english sin trig function", async () => {
        // Arrange
        const mockMathInputCallback = rs.fn();
        render(
            <V2KeypadWithMathquill onChangeMathInput={mockMathInputCallback} />,
        );

        // Act
        await userEvent.click(screen.getByRole("tab", {name: "Geometry"}));
        await userEvent.click(screen.getByRole("button", {name: "Sine"}));

        // Assert
        expect(mockMathInputCallback).toHaveBeenLastCalledWith(
            "\\sin\\left(\\right)",
        );
    });

    it("handles portuguese sen trig function", async () => {
        // Arrange
        const mockMathInputCallback = rs.fn();
        render(
            <V2KeypadWithMathquill
                onChangeMathInput={mockMathInputCallback}
                portuguese
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("tab", {name: "Geometry"}));
        // This needs to stay as "getByText" because we're validating translations
        // and aria-labels are in English
        await userEvent.click(screen.getByText("sen"));

        // Assert. Note the need to use \operatorname here, because `sen` is
        // not a registered operator name in MathJax.
        expect(mockMathInputCallback).toHaveBeenLastCalledWith(
            "\\operatorname{sen}\\left(\\right)",
        );
    });
});
