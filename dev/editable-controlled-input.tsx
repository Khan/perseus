import * as React from "react";
import {useState} from "react";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type Props = Omit<PropsFor<"input">, "value" | "onInput"> & {
    value: string;
    onInput: (newValue: string) => unknown;
};

// The term "controlled input", in React, refers to an input element or
// component whose displayed value is determined by its props, rather than by
// the input's internal state. An EditableControlledInput is controlled as long
// as it does not have focus. While it is focused, it becomes editable and emits
// onInput events.
export function EditableControlledInput(props: Props): React.ReactElement {
    const {value, onInput, ...restOfProps} = props;
    const [focused, setFocused] = useState(false);
    const [wipValue, setWipValue] = useState("");
    return (
        <input
            {...restOfProps}
            value={focused ? wipValue : value}
            onChange={(e) => {
                setWipValue(e.target.value);
                onInput(e.target.value);
            }}
            onFocus={() => {
                setWipValue(value);
                setFocused(true);
            }}
            onBlur={() => {
                setFocused(false);
            }}
        />
    );
}
