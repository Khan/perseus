/* eslint-disable react/sort-comp */
// @flow
import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import ReactDOM from "react-dom";

type Props = {|
    value: string | number | null,
    onChange: (any) => void,
    className?: string,
    labelText?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    disabled?: boolean,
    id?: string,
    placeholder?: string,
    onKeyDown?: () => void,

    // TODO: Remove this
    style?: $FlowFixMe,
|};

type DefaultProps = {|
    value: Props["value"],
    disabled: Props["disabled"],
|};

let lastId = 0;
function uniqueIdForInput(prefix: string = "input-") {
    lastId++;
    return `${prefix}${lastId}`;
}

class TextInput extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        value: "",
        disabled: false,
    };

    id: string;

    constructor(props: Props) {
        super(props);
        if (props.id) {
            this.id = props.id;
        } else {
            this.id = uniqueIdForInput();
        }
    }

    render(): React.Node {
        const {
            labelText,
            value,
            onFocus,
            onBlur,
            disabled,
            placeholder,
            onKeyDown,
        } = this.props;

        const formattedValue = value === null ? "" : value.toString();

        return (
            // $FlowIgnore
            <TextField
                disabled={disabled}
                id={this.id}
                value={formattedValue}
                type="text"
                aria-label={labelText}
                onChange={(value) => this.props.onChange(value)}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
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
