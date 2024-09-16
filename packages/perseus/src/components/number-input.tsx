/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {number as knumber} from "@khanacademy/kmath";
import classNames from "classnames";
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Util from "../util";
import KhanMath from "../util/math";

import {PerseusI18nContext} from "./i18n-context";

import type {MathFormat} from "../perseus-types";

const {firstNumericalParse, captureScratchpadTouchStart} = Util;
const toNumericString = KhanMath.toNumericString;
const getNumericFormat = KhanMath.getNumericFormat;

/* An input box that accepts only numeric strings
 *
 * Calls onChange(value, format) for valid numbers.
 * Reverts to the current value onBlur or on [ENTER],
 *   but maintains the format (i.e. 3/2, 1 1/2, 150%)
 * Accepts empty input and sends it to onChange as null
 *   if no numeric placeholder is set.
 * If given a checkValidity function, will turn
 *   the background/outline red when invalid
 * If useArrowKeys is set to true, up/down arrows will
 *   increment/decrement integers
 * Optionally takes a size ("mini", "small", "normal")
 */
class NumberInput extends React.Component<any, any> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static propTypes = {
        value: PropTypes.number,
        format: PropTypes.string,
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func.isRequired,
        onFormatChange: PropTypes.func,
        checkValidity: PropTypes.func,
        size: PropTypes.string,
        label: PropTypes.oneOf(["put your labels outside your inputs!"]),
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

    componentDidUpdate(prevProps: any) {
        if (!knumber.equal(this.getValue(), this.props.value)) {
            this._setValue(this.props.value, this.state.format);
        }
    }

    /* Return the current "value" of this input
     * If empty, it returns the placeholder (if it is a number) or null
     */
    getValue: () => any = () => {
        return this.parseInputValue(
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'value' does not exist on type 'Element | Text'.
            ReactDOM.findDOMNode(this.refs.input).value, // eslint-disable-line react/no-string-refs
        );
    };

    /* Return the current string value of this input */
    getStringValue: () => string = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'value' does not exist on type 'Element | Text'.
        return ReactDOM.findDOMNode(this.refs.input).value.toString(); // eslint-disable-line react/no-string-refs
    };

    parseInputValue: (arg1: any) => any = (value) => {
        if (value === "") {
            const placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? +placeholder : null;
        }
        const result = firstNumericalParse(value, this.context.strings);
        return _.isFinite(result) ? result : this.props.value;
    };

    /* Set text input focus to this input */
    focus: () => void = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this.refs.input).focus(); // eslint-disable-line react/no-string-refs
        this._handleFocus();
    };

    blur: () => void = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'blur' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this.refs.input).blur(); // eslint-disable-line react/no-string-refs
        this._handleBlur();
    };

    setSelectionRange: (arg1: number, arg2: number) => any = (
        selectionStart,
        selectionEnd,
    ) => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'setSelectionRange' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this).setSelectionRange(
            selectionStart,
            selectionEnd,
        );
    };

    getSelectionStart: () => number = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'selectionStart' does not exist on type 'Element | Text'.
        return ReactDOM.findDOMNode(this).selectionStart;
    };

    getSelectionEnd: () => number = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'selectionEnd' does not exist on type 'Element | Text'.
        return ReactDOM.findDOMNode(this).selectionEnd;
    };

    _checkValidity: (arg1: any) => boolean = (value) => {
        if (value == null) {
            return true;
        }

        const val = firstNumericalParse(value, this.context.strings);
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
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2769 - No overload matches this call. | TS2339 - Property 'val' does not exist on type 'JQueryStatic'.
        $(ReactDOM.findDOMNode(this.refs.input)).val(
            toNumericString(val, format),
        );
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onFormatChange,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            checkValidity,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            useArrowKeys,
            ...restProps
        } = this.props;

        return (
            <input
                {...restProps}
                className={classes}
                type="text"
                // eslint-disable-next-line react/no-string-refs
                ref="input"
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
