import Color from "@khanacademy/wonder-blocks-color";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import MathQuill from "mathquill";
import * as React from "react";

import Key from "../../data/keys";
import keyTranslator from "../key-handlers/key-translator";

import Keypad from "./index";

export default {
    title: "v2 Keypad With Mathquill",
};

const mathQuillConfig = {
    autoCommands: "pi theta phi sqrt nthroot",
    charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",
    supSubsRequireOperand: true,
    spaceBehavesLikeTab: true,
};

export function V2KeypadWithMathquill() {
    const mathquillWrapperRef = React.useRef<HTMLDivElement>(null);
    const [mathField, setMathField] = React.useState<MathQuill>();

    React.useEffect(() => {
        if (!mathField && mathquillWrapperRef.current) {
            const MQ = MathQuill.getInterface(2);
            const mathFieldInstance = MQ.MathField(
                mathquillWrapperRef.current,
                mathQuillConfig,
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
                />
            </Popover>
        </div>
    );
}
