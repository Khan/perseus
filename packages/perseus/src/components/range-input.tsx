import * as React from "react";

import NumberInput from "./number-input";

import type {MathFormat} from "@khanacademy/perseus-core";

type Pair<T> = [T, T];

interface Props {
    value: Pair<number>;
    /**
     * The number format to use for display before the user edits the value.
     * After the first edit, the format is detected from the input.
     */
    format?: MathFormat | null;
    /**
     * Values to display when the input is empty. If a placeholder value is
     * numeric and finite, it is also emitted via `onChange` when the
     * corresponding input is cleared.
     */
    placeholder?: Pair<number | string | null>;
    /**
     * Called when the user changes the value of the input to a valid number.
     */
    onChange: (value: Pair<number>) => void;
    /**
     * Validates input. If `checkValidity` returns false, the new value will
     * not be emitted via `onChange`, and the input will display an error state.
     */
    checkValidity?: (value: Pair<number>) => boolean;
    /**
     * When true, values that approximate an integer or fraction multiple of
     * pi will be displayed in a format like "3π", "1/2π", etc.
     */
    allowPiTruncation?: boolean;
    /**
     * Whether the up and down arrow keys should increment/decrement the value.
     */
    useArrowKeys?: boolean;
    /**
     * HTML `id` to apply to the underlying inputs.
     */
    // TODO(benchristel): This `id` prop is a bad way of associating labels
    //  with the input. It results in non-unique IDs, and therefore duplicated
    //  labels. Each input should have its own accessible label.
    id?: string;
}

/**
 * A minor abstraction on top of `NumberInput` for ranges
 */
function RangeInput(props: Props) {
    const {
        value,
        placeholder = [null, null],
        checkValidity = () => true,
        allowPiTruncation,
        ...restOfProps
    } = props;

    const onChange = (i: number) => (newVal: number) => {
        const value = props.value;
        if (i === 0) {
            props.onChange([newVal, value[1]]);
        } else {
            props.onChange([value[0], newVal]);
        }
    };

    return (
        <div className="range-input">
            <NumberInput
                {...restOfProps}
                value={value[0]}
                checkValidity={(val) => checkValidity([val, value[1]])}
                onChange={onChange(0)}
                placeholder={placeholder[0]}
                allowPiTruncation={allowPiTruncation}
            />
            <NumberInput
                {...restOfProps}
                value={value[1]}
                checkValidity={(val) => checkValidity([value[0], val])}
                onChange={onChange(1)}
                placeholder={placeholder[1]}
                allowPiTruncation={allowPiTruncation}
            />
        </div>
    );
}

export default RangeInput;
