/* eslint-disable react/sort-comp */
import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import ReactDOM from "react-dom";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    value: string | number | null,
    onChange: (arg1?: any) => void,
    className?: string,
    labelText?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    disabled?: boolean,
    id?: string,
    placeholder?: string,
    onKeyDown?: () => void,
    style?: StyleType
};

type DefaultProps = {
    value: Props['value'],
    disabled: Props['disabled']
};

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

    render(): React.ReactElement {
        const {
            labelText,
            value,
            onFocus,
            onBlur,
            disabled,
            placeholder,
            onKeyDown,
            style,
        } = this.props;

        const formattedValue = value === null ? "" : value.toString();

        return (
            // $FlowIgnore
            <TextField
                style={style}
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
        ReactDOM.findDOMNode(this).focus();
    };

    blur: () => void = () => {
        ReactDOM.findDOMNode(this).blur();
    };

    getValue: () => string | null | undefined = () => {
        return ReactDOM.findDOMNode(this)?.value;
    };

    getStringValue: () => string | null | undefined = () => {
        return ReactDOM.findDOMNode(this)?.value.toString();
    };

    setSelectionRange: (arg1: number, arg2: number) => void = (
        selectionStart,
        selectionEnd,
    ) => {
        ReactDOM.findDOMNode(this).setSelectionRange(
            selectionStart,
            selectionEnd,
        );
    };

    getSelectionStart: () => number = () => {
        return ReactDOM.findDOMNode(this).selectionStart;
    };

    getSelectionEnd: () => number = () => {
        return ReactDOM.findDOMNode(this).selectionEnd;
    };
}

export default TextInput;
