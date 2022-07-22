/* eslint-disable react/sort-comp */
// @flow
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import {TextField} from "@khanacademy/wonder-blocks-form";

type Props = {|
    value: string,
    onChange: ($FlowFixMe) => {},
    className: string,
    labelText: string,
    onFocus: () => {},
    onBlur: () => {},
    disabled: boolean,
    id: string,
|};
class TextInput extends React.Component<Props> {
    static defaultProps: $FlowFixMe = {
        value: "",
        disabled: false,
    };

    render(): React.Node {
        const {labelText, value, onFocus, onBlur, disabled} = this.props;

        return (
            <TextField
                disabled={disabled}
                id={"abc"}
                value={value}
                type="text"
                aria-label={labelText}
                onChange={(value) => this.props.onChange(value)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    }

    focus: () => void = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        ReactDOM.findDOMNode(this).focus();
    };

    blur: () => void = () => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        ReactDOM.findDOMNode(this).blur();
    };

    getValue: () => ?string = () => {
        // $FlowFixMe[prop-missing]
        return ReactDOM.findDOMNode(this)?.value;
    };

    getStringValue: () => ?string = () => {
        // $FlowFixMe[prop-missing]
        return ReactDOM.findDOMNode(this)?.value.toString();
    };

    setSelectionRange: (number, number) => void = (
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
}

export default TextInput;
