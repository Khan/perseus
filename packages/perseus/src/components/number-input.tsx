import {number as knumber, KhanMath} from "@khanacademy/kmath";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Util from "../util";
import {isPiMultiple} from "../util/math-utils";

import type {MathFormat} from "@khanacademy/perseus-core";

const {firstNumericalParse, captureScratchpadTouchStart} = Util;
const toNumericString = KhanMath.toNumericString;
const getNumericFormat = KhanMath.getNumericFormat;

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
class NumberInput extends React.Component<any, any> {
    inputRef = React.createRef<HTMLInputElement>();

    static propTypes = {
        value: PropTypes.number,
        format: PropTypes.string,
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func.isRequired,
        onFormatChange: PropTypes.func,
        checkValidity: PropTypes.func,
        size: PropTypes.oneOf(["mini", "small", "normal"]),
        label: PropTypes.oneOf(["put your labels outside your inputs!"]),
        allowPiTruncation: PropTypes.bool,
    };

    static defaultProps: any = {
        value: null,
        placeholder: null,
        format: null,
        onFormatChange: () => null,
        checkValidity: () => true,
        useArrowKeys: false,
    };

    state: any = {
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

    componentDidUpdate(prevProps: any) {
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
    getValue: () => any = () => {
        return this.parseInputValue(this._getInput().value);
    };

    /* Return the current string value of this input */
    getStringValue: () => string = () => {
        return this._getInput().toString();
    };

    parseInputValue: (arg1: any) => any = (value) => {
        if (value === "") {
            const placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? +placeholder : null;
        }
        const result = firstNumericalParse(value);
        return _.isFinite(result) ? result : this.props.value;
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

    _checkValidity: (arg1: any) => boolean = (value) => {
        if (value == null) {
            return true;
        }

        const val = firstNumericalParse(value);
        const checkValidity = this.props.checkValidity;

        return _.isFinite(val) && checkValidity(val);
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
        if (val !== Math.floor(val)) {
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

    _setValue: (arg1: number, arg2: MathFormat) => void = (val, format) => {
        this._getInput().value = toNumericString(val, format);
    };

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
            onFormatChange: _,
            checkValidity: __,
            useArrowKeys: ___,
            allowPiTruncation: ____,
            ...restProps
        } = this.props;

        return (
            <input
                {...restProps}
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
