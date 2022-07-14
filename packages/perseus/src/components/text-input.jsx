/* eslint-disable react/sort-comp */
// @flow
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import {TextField} from "@khanacademy/wonder-blocks-form";

class TextInput extends React.Component<$FlowFixMe> {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        labelText: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps: $FlowFixMe = {
        value: "",
        disabled: false,
    };

    // render(): React.Node {
    //     const {labelText, ...props} = this.props;
    //     return (
    //         <input
    //             {...props}
    //             type="text"
    //             aria-label={labelText}
    //             onChange={(e) => this.props.onChange(e.target.value)}
    //         />
    //     );
    // }

    render(): React.Node {
        const {labelText, ...props} = this.props;
        return (
            <TextField
                {...props}
                type="text"
                aria-label={labelText}
                onChange={(value) => this.props.onChange(value)}
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
