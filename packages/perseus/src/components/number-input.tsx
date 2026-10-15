import {number as knumber, KhanMath} from "@khanacademy/kmath";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import Util from "../util";
import {isPiMultiple} from "../util/math-utils";

import type {MathFormat} from "@khanacademy/perseus-core";

const {firstNumericalParse, captureScratchpadTouchStart} = Util;
const toNumericString = KhanMath.toNumericString;
const getNumericFormat = KhanMath.getNumericFormat;

interface Props {
    value: number | null;
    /**
     * The number format to use for display before the user edits the value.
     * After the first edit, the format is detected from the input.
     */
    format?: MathFormat | null;
    /**
     * A value to display when the input is empty. If the placeholder is
     * numeric and finite, it is also emitted via `onChange` when the input is
     * cleared.
     */
    placeholder?: string | number | null;
    /**
     * Called when the user changes the value of the input to a valid number.
     */
    onChange: (value: number) => void;
    /**
     * Called when the detected format of the user input changes.
     */
    onFormatChange?: (value: number, format: MathFormat) => void;
    /**
     * Validates input. If `checkValidity` returns false, the new value will
     * not be emitted via `onChange`, and the input will display an error state.
     */
    checkValidity: (value: number) => boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    /** Determines the width of the input */
    size?: "mini" | "small" | "normal";
    /**
     * When true, values that approximate an integer or fraction multiple of
     * pi will be displayed in a format like "3π", "1/2π", etc.
     */
    allowPiTruncation?: boolean;
    /**
     * Whether the up and down arrow keys should increment/decrement the value
     */
    useArrowKeys: boolean;
    className?: string;
}

interface State {
    format: MathFormat | undefined;
}

/**
 * An input box that accepts only numeric strings. While the input is focused,
 * it acts as an uncontrolled component: you can type anything, but only valid
 * numbers are emitted from `onChange`. While not focused, the input acts as
 * controlled, simply displaying its `value` prop.
 *
 * Accepts numbers in a variety of formats, including fractions, mixed numbers,
 * percents, and multiples of pi. The format is auto-detected on user input.
 * The input value is displayed in the most recently detected format.
 */
class NumberInput extends React.Component<Props, State> {
    inputRef = React.createRef<HTMLInputElement>();

    static defaultProps = {
        value: null,
        placeholder: null,
        format: null,
        checkValidity: () => true,
        useArrowKeys: false,
    };

    state: State = {
        format: this.props.format ?? undefined,
    };

    componentDidMount() {
        // If the value is a multiple of pi, but it is not in the pi format,
        // then convert it to the pi format and show it as a multiple of pi.
        const value = this.getValue();
        if (this.props.allowPiTruncation && value != null && value !== 0) {
            if (this.state.format !== "pi" && isPiMultiple(value)) {
                this._setValue(value / Math.PI, "pi");
                this.setState({format: "pi"});
            }
        }
    }

    componentDidUpdate() {
        if (!knumber.equal(this.getValue(), this.props.value)) {
            this._setValue(this.props.value, this.state.format);
        }
    }

    _getInput: () => HTMLInputElement = () => {
        if (!this.inputRef.current) {
            throw new PerseusError(
                "Input ref accessed before set",
                Errors.Internal,
            );
        }

        return this.inputRef.current;
    };

    /* Return the current "value" of this input
     * If empty, it returns the placeholder (if it is a number) or null
     */
    getValue(): number | null | undefined {
        return this.parseInputValue(this._getInput().value);
    }

    parseInputValue(value: string): number | null | undefined {
        if (value === "") {
            const placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? Number(placeholder) : null;
        }
        const result = firstNumericalParse(value);
        return _.isFinite(result) ? result : this.props.value;
    }

    /* Set text input focus to this input */
    focus: () => void = () => {
        this._getInput().focus();
        this._handleFocus();
    };

    blur: () => void = () => {
        this._getInput().blur();
        this._handleBlur();
    };

    _checkValidity: (arg1: any) => boolean = (value) => {
        if (value == null) {
            return true;
        }

        const val = firstNumericalParse(value);
        const checkValidity = this.props.checkValidity;

        return val != null && _.isFinite(val) && checkValidity(val);
    };

    _handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const text = e.target.value;
        const value = this.parseInputValue(text);
        if (value == null) {
            return;
        }

        const format = getNumericFormat(text);

        this.props.onChange(value);
        if (format) {
            this.props.onFormatChange?.(value, format);
            this.setState({format: format});
        }
    };

    _handleFocus: () => void = () => {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    };

    _handleBlur: (e?: React.FocusEvent | React.KeyboardEvent) => void = (e) => {
        // Only continue on blur or "enter"
        // @ts-expect-error - TS2339 - Property 'keyCode' does not exist on type 'KeyboardEvent<Element> | FocusEvent<Element, Element>'.
        if (e && e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this._setValue(this.props.value, this.state.format);
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    _onKeyDown: (arg1: React.KeyboardEvent) => void = (e) => {
        if (
            !this.props.useArrowKeys ||
            !["ArrowUp", "ArrowDown"].includes(e.key)
        ) {
            return;
        }

        let val = this.getValue();
        if (val == null || val !== Math.floor(val)) {
            return; // bail if not an integer
        }

        if (e.key === "ArrowUp") {
            val = val + 1;
        } else if (e.key === "ArrowDown") {
            val = val - 1;
        }

        if (this._checkValidity(val)) {
            this.props.onChange(val);
        }
    };

    _setValue(val: number | null, format: MathFormat | undefined) {
        this._getInput().value = toNumericString(val, format);
    }

    render(): React.ReactNode {
        let classes = classNames({
            "number-input": true,
            "invalid-input": !this._checkValidity(this.props.value),
            mini: this.props.size === "mini",
            small: this.props.size === "small",
            normal: this.props.size === "normal",
        });
        if (this.props.className != null) {
            classes = classes + " " + this.props.className;
        }

        const {
            onFormatChange,
            checkValidity,
            useArrowKeys,
            allowPiTruncation,
            placeholder,
            size,
            ...restProps
        } = this.props;

        return (
            <input
                {...restProps}
                placeholder={
                    placeholder != null ? String(placeholder) : undefined
                }
                className={classes}
                type="text"
                ref={this.inputRef}
                onChange={this._handleChange}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                onKeyPress={this._handleBlur}
                onKeyDown={this._onKeyDown}
                onTouchStart={captureScratchpadTouchStart}
                defaultValue={toNumericString(
                    this.props.value,
                    this.state.format,
                )}
                value={undefined}
            />
        );
    }
}

export default NumberInput;
