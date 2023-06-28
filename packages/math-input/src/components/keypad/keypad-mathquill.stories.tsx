import Color from "@khanacademy/wonder-blocks-color";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import * as React from "react";

import Key from "../../data/keys";
import {CursorContext} from "../input/cursor-contexts";
import {getCursorContext} from "../input/mathquill-helpers";
import {createMathField} from "../input/mathquill-instance";
import {MathFieldInterface} from "../input/mathquill-types";
import keyTranslator from "../key-handlers/key-translator";

import Keypad from "./index";

export default {
    title: "v2 Keypad With Mathquill",
};

export function V2KeypadWithMathquill() {
    const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathField, setMathField] = React.useState<MathFieldInterface>();
    const [cursorContext, setCursorContext] = React.useState<
        typeof CursorContext[keyof typeof CursorContext]
    >(CursorContext.NONE);

    React.useEffect(() => {
        if (!mathField && mathFieldWrapperRef.current) {
            const mathFieldInstance = createMathField(
                mathFieldWrapperRef.current,
                (baseConfig) => ({
                    ...baseConfig,
                    handlers: {
                        edit: (_mathField) => {
                            setCursorContext(getCursorContext(_mathField));
                        },
                    },
                }),
            );
            setMathField(mathFieldInstance);
        }
    }, [mathField]);

    function handleClickKey(key: Key) {
        if (!mathField) {
            return;
        }

        const mathFieldCallback = keyTranslator[key];
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
                            multiplicationDot
                            preAlgebra
                            trigonometry
                            sendEvent={async (event) => {
                                // eslint-disable-next-line no-console
                                console.log("Send Event:", event);
                            }}
                        />
                    </PopoverContentCore>
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
