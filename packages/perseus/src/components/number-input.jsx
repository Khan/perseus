/* eslint-disable react/sort-comp */
// @flow
import {number as knumber} from "@khanacademy/kmath";
import classNames from "classnames";
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Util from "../util.js";
import KhanMath from "../util/math.js";

import type {Format} from "../util/math.js";

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
class NumberInput extends React.Component<$FlowFixMe, $FlowFixMe> {
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

    static defaultProps: $FlowFixMe = {
        value: null,
        placeholder: null,
        format: null,
        onFormatChange: () => null,
        checkValidity: () => true,
        useArrowKeys: false,
    };

    state: $FlowFixMe = {
        format: this.props.format,
    };

    render(): React.Node {
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
            // eslint-disable-next-line no-unused-vars
            onFormatChange,
            // eslint-disable-next-line no-unused-vars
            checkValidity,
            // eslint-disable-next-line no-unused-vars
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

    componentDidUpdate(prevProps: $FlowFixMe) {
        if (!knumber.equal(this.getValue(), this.props.value)) {
            this._setValue(this.props.value, this.state.format);
        }
    }

    /* Return the current "value" of this input
     * If empty, it returns the placeholder (if it is a number) or null
     */
    getValue: () => $FlowFixMe = () => {
        return this.parseInputValue(
            // $FlowFixMe[incompatible-use]
            // $FlowFixMe[prop-missing]
            ReactDOM.findDOMNode(this.refs.input).value, // eslint-disable-line react/no-string-refs
        );
    };

    /* Return the current string value of this input */
    getStringValue: () => string = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        return ReactDOM.findDOMNode(this.refs.input).value.toString(); // eslint-disable-line react/no-string-refs
    };

    parseInputValue: ($FlowFixMe) => $FlowFixMe = (value) => {
        if (value === "") {
            const placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? +placeholder : null;
        }
        const result = firstNumericalParse(value);
        return _.isFinite(result) ? result : this.props.value;
    };

    /* Set text input focus to this input */
    focus: () => void = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        ReactDOM.findDOMNode(this.refs.input).focus(); // eslint-disable-line react/no-string-refs
        this._handleFocus();
    };

    blur: () => void = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        ReactDOM.findDOMNode(this.refs.input).blur(); // eslint-disable-line react/no-string-refs
        this._handleBlur();
    };

    setSelectionRange: (number, number) => $FlowFixMe = (
        selectionStart,
        selectionEnd,
    ) => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        ReactDOM.findDOMNode(this).setSelectionRange(
            selectionStart,
            selectionEnd,
        );
    };

    getSelectionStart: () => number = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        return ReactDOM.findDOMNode(this).selectionStart;
    };

    getSelectionEnd: () => number = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        return ReactDOM.findDOMNode(this).selectionEnd;
    };

    _checkValidity: ($FlowFixMe) => boolean = (value) => {
        if (value == null) {
            return true;
        }

        const val = firstNumericalParse(value);
        const checkValidity = this.props.checkValidity;

        return _.isFinite(val) && checkValidity(val);
    };

    _handleChange: (SyntheticInputEvent<>) => void = (e) => {
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

    _handleBlur: (
        e?: SyntheticFocusEvent<> | SyntheticKeyboardEvent<>,
    ) => void = (e) => {
        // Only continue on blur or "enter"
        if (e && e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this._setValue(this.props.value, this.state.format);
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    _onKeyDown: (SyntheticKeyboardEvent<>) => void = (e) => {
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

    _setValue: (number, Format) => void = (val, format) => {
        // eslint-disable-next-line react/no-string-refs
        $(ReactDOM.findDOMNode(this.refs.input)).val(
            toNumericString(val, format),
        );
    };
}

export default NumberInput;
