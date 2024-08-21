import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {color} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {mockStrings} from "../../strings";
import {CursorContext} from "../input/cursor-contexts";
import {getCursorContext} from "../input/mathquill-helpers";
import {createMathField} from "../input/mathquill-instance";
import {getKeyTranslator} from "../key-handlers/key-translator";

import type Key from "../../data/keys";
import type {MathFieldInterface} from "../input/mathquill-types";

import Keypad from "./index";

export default {
    title: "math-input/components/v2 Keypad With Mathquill",
};

export function V2KeypadWithMathquill() {
    const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathField, setMathField] = React.useState<MathFieldInterface>();
    const [keypadOpen, setKeypadOpen] = React.useState<boolean>(true);
    const [cursorContext, setCursorContext] = React.useState<
        (typeof CursorContext)[keyof typeof CursorContext]
    >(CursorContext.NONE);

    React.useEffect(() => {
        if (!mathField && mathFieldWrapperRef.current) {
            const mathFieldInstance = createMathField(
                mathFieldWrapperRef.current,
                "en",
                mockStrings,
                (baseConfig) => ({
                    ...baseConfig,
                    handlers: {
                        edit: (_mathField: MathFieldInterface) => {
                            setCursorContext(getCursorContext(_mathField));
                        },
                    },
                }),
            );
            setMathField(mathFieldInstance);
        }
    }, [mathField]);

    const keyTranslator = getKeyTranslator("en", {
        sin: "sen",
        cos: "cos",
        tan: "tan",
    });

    function handleClickKey(key: Key) {
        if (!mathField) {
            return;
        }

        if (key === "DISMISS") {
            setKeypadOpen(false);
        }

        const mathFieldCallback = keyTranslator[key];
        console.log("keypad-mathquill.stories");
        console.log({keyTranslator, key, mathFieldCallback});
        if (mathFieldCallback) {
            mathFieldCallback(mathField, key);
            setCursorContext(getCursorContext(mathField));
        } else {
            // eslint-disable-next-line no-console
            console.warn(`No translation to Mathquill for: ${key}`);
        }
    }

    return (
        <div style={{maxWidth: "400px", margin: "2em"}}>
            <Popover
                content={
                    <PopoverContentCore
                        style={{
                            padding: 10,
                            maxWidth: "initial",
                        }}
                    >
                        <Keypad
                            extraKeys={["x", "y", "PI", "THETA"]}
                            onClickKey={handleClickKey}
                            cursorContext={cursorContext}
                            advancedRelations
                            basicRelations
                            divisionKey
                            logarithms
                            convertDotToTimes
                            preAlgebra
                            trigonometry
                            onAnalyticsEvent={async (event) => {
                                // eslint-disable-next-line no-console
                                // console.log("Send Event:", event);
                            }}
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
                        marginBottom: "1em",
                        border: `1px solid ${color.offBlack16}`,
                    }}
                    ref={mathFieldWrapperRef}
                />
            </Popover>
            <button onClick={() => setKeypadOpen(!keypadOpen)}>
                {keypadOpen ? "close keypad" : "open keypad"}
            </button>
        </div>
    );
}
