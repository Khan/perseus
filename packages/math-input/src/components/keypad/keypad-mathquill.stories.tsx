import Color from "@khanacademy/wonder-blocks-color";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import * as React from "react";

import Key from "../../data/keys";
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

    React.useEffect(() => {
        if (!mathField && mathFieldWrapperRef.current) {
            const mathFieldInstance = createMathField(
                mathFieldWrapperRef.current,
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
                            extraKeys={[
                                "a",
                                "b",
                                "c",
                                "d",
                                "e",
                                "f",
                                "g",
                                "h",
                                "i",
                                "j",
                                "k",
                                "l",
                            ]}
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
