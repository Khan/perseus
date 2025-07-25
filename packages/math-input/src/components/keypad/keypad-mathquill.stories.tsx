import Color from "@khanacademy/wonder-blocks-color";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import * as React from "react";

import {CursorContext} from "../input/cursor-contexts";
import {getCursorContext} from "../input/mathquill-helpers";
import keyTranslator from "../key-handlers/key-translator";

import type Key from "../../data/keys";

import Keypad from "./index";

export default {
    title: "math-input/components/v2 Keypad With Mathquill",
};

export function V2KeypadWithMathquill() {
    const mathFieldWrapperRef = React.useRef<HTMLDivElement>(null);
    const mathField = undefined;
    const [keypadOpen, setKeypadOpen] = React.useState<boolean>(true);
    const [cursorContext, setCursorContext] = React.useState<
        typeof CursorContext[keyof typeof CursorContext]
    >(CursorContext.NONE);

    function handleClickKey(key: Key) {
        if (!mathField) {
            return;
        }

        if (key === "DISMISS") {
            setKeypadOpen(false);
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
                            convertDotToTimes
                            preAlgebra
                            trigonometry
                            onAnalyticsEvent={async (event) => {
                                // eslint-disable-next-line no-console
                                console.log("Send Event:", event);
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
                        border: `1px solid ${Color.offBlack16}`,
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
