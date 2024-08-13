/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import ReactDOM from "react-dom";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    value: string | number | null;
    onChange: (arg1?: any) => void;
    className?: string;
    labelText?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    id?: string;
    placeholder?: string;
    onKeyDown?: () => void;
    style?: StyleType;
};

type DefaultProps = {
    value: Props["value"];
    disabled: Props["disabled"];
};

let lastId = 0;
function uniqueIdForInput(prefix = "input-") {
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

    render(): React.ReactNode {
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
                // @ts-expect-error - TS2322 - Type '{ style: StyleType; disabled: boolean | undefined; id: string; value: string; type: "text"; "aria-label": string | undefined; onChange: (value: string) => void; placeholder: string | undefined; ... 5 more ...; autoComplete: string; }' is not assignable to type 'IntrinsicAttributes & ExportProps & RefAttributes<HTMLInputElement>'.
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
            />
        );
    }

    focus: () => void = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this).focus();
    };

    blur: () => void = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'blur' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this).blur();
    };

    getValue: () => string | null | undefined = () => {
        // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element | Text'.
        return ReactDOM.findDOMNode(this)?.value;
    };

    getStringValue: () => string | null | undefined = () => {
        // @ts-expect-error - TS2339 - Property 'value' does not exist on type 'Element | Text'.
        return ReactDOM.findDOMNode(this)?.value.toString();
    };

    setSelectionRange: (arg1: number, arg2: number) => void = (
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
}

export default TextInput;
