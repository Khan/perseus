import MathQuill from "mathquill";
import * as React from "react";

import Key from "../../data/keys";
import keyTranslator from "../key-translator";

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
    const [mathQuill, setMathQuill] = React.useState<MathQuill>();

    React.useEffect(() => {
        if (!mathQuill && mathquillWrapperRef.current) {
            const MQ = MathQuill.getInterface(2);
            const mathQuillInstance = MQ.MathField(
                mathquillWrapperRef.current,
                mathQuillConfig,
            );
            setMathQuill(mathQuillInstance);
        }
    }, [mathQuill]);

    function handleClickKey(key: Key) {
        if (!mathQuill) {
            return;
        }

        const mathQuillCallback = keyTranslator[key];
        if (mathQuillCallback) {
            mathQuillCallback(mathQuill);
        } else {
            // eslint-disable-next-line no-console
            console.warn(`No translation to Mathquill for: ${key}`);
        }
    }

    return (
        <div style={{maxWidth: "400px", margin: "2em"}}>
            <div
                ref={mathquillWrapperRef}
                style={{width: "100%", marginBottom: "1em"}}
            />
            <div>
                <Keypad
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
        </div>
    );
}
