import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {mockStrings} from "../../strings";
import {CursorContext} from "../input/cursor-contexts";
import {getCursorContext} from "../input/mathquill-helpers";
import {createMathField} from "../input/mathquill-instance";
import {getKeyTranslator} from "../key-handlers/key-translator";

import type {MathFieldInterface} from "../input/mathquill-types";
import type {KeypadKey} from "@khanacademy/perseus-core";

import Keypad from "./index";

export default {
    title: "Math Input/Components/v2 Keypad With Mathquill",
    tags: ["!dev"],
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
                // TODO(LEMS-2656): remove TS suppression
                // @ts-expect-error: Type 'EditableMathQuill' is not assignable to type 'MathFieldInterface'.
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
        sin: "sin",
        cos: "cos",
        tan: "tan",
    });

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
                            padding: 0,
                            paddingBottom: spacing.xxSmall_6,
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
                            onAnalyticsEvent={async () => {}}
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
                        border: `1px solid ${semanticColor.core.border.neutral.subtle}`,
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
