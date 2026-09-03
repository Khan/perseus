import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core/dist/util/types";

interface Props {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    style?: StyleType;
}

/**
 * This is a custom text field of type="number" for use in Perseus Editors.
 *
 * This component makes it so that
 * 1. the text field's input number updates on scroll without
 *    scrolling the page.
 * 2. the input is controlled as long as it does not have focus.
 *    While it is focused, it becomes editable and emits onChange
 *    events. This is useful to make sure that input behavior
 *    remains predictable, rather than possibly having the cursor
 *    jump around uenxpectedly.
 * 3. only valid, finite numbers are passed to `onChange`. NaN and +/-Infinity
 *    are never emitted.
 *
 * NOTE 1: Native HTML number inputs do not update the number value on scroll,
 * they only scroll the page. Inputs in React do NOT work this way (explanation
 * here: https://stackoverflow.com/a/68266494). By default, scrolling on a
 * focused number input in React causes BOTH the input value to change AND
 * the page to scroll. The behavior in this component is an improvement on
 * the React behavior, but it's the opposite of the native HTML behavior.
 *
 * NOTE 2: Firefox seems to have a custom override for input scroll. Even
 * with this stopPropogation, Firefox matches the native HTML behavior.
 */
const ScrolllessNumberTextField = (props: Props) => {
    const {value, onChange, ...restOfProps} = props;
    const [focused, setFocused] = React.useState(false);
    const [wipValue, setWipValue] = React.useState("");

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const ref = inputRef.current;

        // stopPropogation makes it so that the page scroll event is not
        // triggered when the input is focused and the user scrolls.
        // The input value will still change on scroll.
        const ignoreScroll = (e) => {
            e.stopPropagation();
        };

        ref?.addEventListener("wheel", ignoreScroll);

        return () => {
            ref?.removeEventListener("wheel", ignoreScroll);
        };
    }, [inputRef]);

    return (
        <TextField
            {...restOfProps}
            type="number"
            value={focused ? wipValue : String(value)}
            onChange={(newValue) => {
                setWipValue(newValue);
                if (isFiniteNumeric(newValue)) {
                    onChange(+newValue);
                }
            }}
            onFocus={(e) => {
                setWipValue(String(value));
                setFocused(true);

                props.onFocus?.(e);
            }}
            onBlur={(e) => {
                setFocused(false);

                props.onBlur?.(e);
            }}
            ref={inputRef}
        />
    );
};

function isFiniteNumeric(value: string): boolean {
    return value.trim() !== "" && Number.isFinite(+value);
}

export default ScrolllessNumberTextField;
