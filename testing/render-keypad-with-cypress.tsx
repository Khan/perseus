import {mount} from "@cypress/react";
import Color from "@khanacademy/wonder-blocks-color";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import MathQuill from "mathquill";
import * as React from "react";

import keyTranslator from "../packages/math-input/src/components/key-translator";
import Keypad from "../packages/math-input/src/components/keypad/index";
import Key from "../packages/math-input/src/data/keys";

const mathQuillConfig = {
    autoCommands: "pi theta phi sqrt nthroot",
    charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",
    supSubsRequireOperand: true,
    spaceBehavesLikeTab: true,
};

export function CypressV2KeypadWithMathquill() {
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
            mathQuillCallback(mathQuill, key);
        } else {
            // eslint-disable-next-line no-console
            console.warn(`No translation to Mathquill for: ${key}`);
        }
    }

    return (
        <div
            style={{maxWidth: "400px", margin: "2em"}}
            data-cy="mathquill-input"
        >
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
const renderKeypad = () => mount(<CypressV2KeypadWithMathquill />);
export default renderKeypad;
