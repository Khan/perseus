import {createMathField} from "@khanacademy/math-input";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useRef, useEffect} from "react";

import type {MathFieldInterface} from "@khanacademy/math-input";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

/**
 * A simple Mathquill MathField input for the InteractionEditor.
 * Unlike our other uses of Mathquill, we're not using a keypad here;
 * it's just the input itself for use writing TeX.
 */
export default function MathquillInput(props: Props) {
    const mathFieldWrapperRef = useRef<HTMLSpanElement>(null);
    const mathFieldInstance = useRef<MathFieldInterface>();

    useEffect(() => {
        // If we have the mount for the input, but not the input
        // make a new Mathquill input
        if (mathFieldWrapperRef.current && !mathFieldInstance.current) {
            // Initialize MathQuill.MathField instance
            mathFieldInstance.current = createMathField(
                mathFieldWrapperRef.current,
                (baseConfig) => ({
                    ...baseConfig,
                    handlers: {
                        edit: (mathField) => {
                            // This handler is guaranteed to be called on change, but
                            // unlike React it sometimes generates false positives.
                            // One of these is on initialization (with an empty string
                            // value), so we have to guard against that below.
                            let value = mathField.latex();

                            // Provide a MathQuill-compatible way to generate the
                            // not-equals sign without pasting unicode or typing TeX
                            value = value.replace(/<>/g, "\\ne");

                            if (props.value !== value) {
                                props.onChange(value);
                            }
                        },
                        upOutOf: (mathField) => {
                            // This handler is called when the user presses the up
                            // arrow key, but there is nowhere in the expression to go
                            // up to (no numerator or exponent). For ease of use,
                            // interpret this as an attempt to create an exponent.
                            mathField.typedText("^");
                        },
                    },
                }),
            );
        }
    });

    return (
        <View style={styles.outerWrapper}>
            <span
                ref={mathFieldWrapperRef}
                className="perseus-math-input mq-editable-field mq-math-mode"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    outerWrapper: {
        display: "inline-block",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Color.offBlack50,
        borderRadius: 3,
        background: Color.white,
    },
});
