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

type Props = {
    value: number | null;
    format: MathFormat | null;
    placeholder: number | string | null;
    onChange: (value: number | null) => void;
    onFormatChange: (value: number | null, format: MathFormat) => void;
    checkValidity: (value: number) => boolean;
    size?: "mini" | "small" | "normal";
    allowPiTruncation?: boolean;
    useArrowKeys: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    className?: string;
    disabled?: boolean;
};

type State = {
    format: MathFormat | null | undefined;
};

/**
 * An input box that accepts only numeric strings
 *
 * Calls `onChange(value, format)` for valid numbers.
 *
 * Reverts to the current value `onBlur` or on [ENTER],
 *   but maintains the format (i.e. 3/2, 1 1/2, 150%)
 *
 * Accepts empty input and sends it to `onChange` as `null` if no numeric
 * placeholder is set.
 *
 * If given a `checkValidity` function, will turn the background/outline red
 * when invalid.
 *
 * If `useArrowKeys` is set to `true`, up/down arrows will increment/decrement
 * integers.
 *
 * Optionally takes a `size` (`"mini"`, `"small"`,` `"normal"`)
 */
class NumberInput extends React.Component<Props, State> {
    inputRef = React.createRef<HTMLInputElement>();

    static defaultProps = {
        value: null,
        placeholder: null,
        format: null,
        onFormatChange: () => null,
        checkValidity: () => true,
        useArrowKeys: false,
    };

    state: State = {
        format: this.props.format,
    };

    componentDidMount() {
        // If the value is a multiple of pi, but it is not in the pi format,
        // then convert it to the pi format and show it as a multiple of pi.
        const value = this.getValue();
        if (this.props.allowPiTruncation && value !== null && value !== 0) {
            if (this.state.format !== "pi" && isPiMultiple(value)) {
                this._setValue(value / Math.PI, "pi");
                this.setState({format: "pi"});
            }
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!knumber.equal(this.getValue() ?? 0, this.props.value ?? 0)) {
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
    getValue: () => number | null = () => {
        return this.parseInputValue(this._getInput().value);
    };

    /* Return the current string value of this input */
    getStringValue: () => string = () => {
        return this._getInput().toString();
    };

    parseInputValue: (value: string) => number | null = (value) => {
        if (value === "") {
            const placeholder = this.props.placeholder;
            return typeof placeholder === "number" && _.isFinite(placeholder)
                ? placeholder
                : null;
        }
        // firstNumericalParse returns a ParsedValue object, but at runtime
        // _.isFinite coerces it; treat as number for downstream usage.
        // eslint-disable-next-line no-restricted-syntax
        const result = firstNumericalParse(value) as unknown as number | null;
        return _.isFinite(result) ? result : this.props.value ?? null;
    };

    /* Set text input focus to this input */
    focus: () => void = () => {
        this._getInput().focus();
        this._handleFocus();
    };

    blur: () => void = () => {
        this._getInput().blur();
        this._handleBlur();
    };

    setSelectionRange: (arg1: number, arg2: number) => void = (
        selectionStart,
        selectionEnd,
    ) => {
        this._getInput().setSelectionRange(selectionStart, selectionEnd);
    };

    getSelectionStart: () => number | null = () => {
        return this._getInput().selectionStart;
    };

    getSelectionEnd: () => number | null = () => {
        return this._getInput().selectionEnd;
    };

    _checkValidity: (value: number | null) => boolean = (value) => {
        if (value == null) {
            return true;
        }

        return _.isFinite(value) && this.props.checkValidity(value);
    };

    _handleChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        const text = e.target.value;
        const value = this.parseInputValue(text);
        const format = getNumericFormat(text);

        this.props.onChange(value);
        if (format) {
            this.props.onFormatChange(value, format);
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
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }

        if (
            !this.props.useArrowKeys ||
            !_.contains(["ArrowUp", "ArrowDown"], e.key)
        ) {
            return;
        }

        let val = this.getValue();
        if (val == null || val !== Math.floor(val)) {
            return; // bail if null or not an integer
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

    _setValue: (
        val: number | null | undefined,
        format: MathFormat | null | undefined,
    ) => void = (val, format) => {
        this._getInput().value = toNumericString(val ?? 0, format ?? undefined);
    };

    render(): React.ReactNode {
        let classes = classNames({
            "number-input": true,
            "invalid-input": !this._checkValidity(this.props.value ?? null),
            mini: this.props.size === "mini",
            small: this.props.size === "small",
            normal: this.props.size === "normal",
        });
        if (this.props.className != null) {
            classes = classes + " " + this.props.className;
        }

        return (
            <input
                placeholder={
                    this.props.placeholder != null
                        ? String(this.props.placeholder)
                        : undefined
                }
                disabled={this.props.disabled}
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
                    this.props.value ?? 0,
                    this.state.format ?? undefined,
                )}
                value={undefined}
            />
        );
    }
}

export default NumberInput;
