/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

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
    "aria-describedby"?: string;
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
    inputRef = React.createRef<HTMLInputElement>();
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

    _getInput: () => HTMLInputElement = () => {
        if (!this.inputRef.current) {
            throw new PerseusError(
                "Input ref accessed before set",
                Errors.Internal,
            );
        }

        return this.inputRef.current;
    };

    focus: () => void = () => {
        this._getInput().focus();
    };

    blur: () => void = () => {
        this._getInput().blur();
    };

    getValue: () => string | null | undefined = () => {
        return this.inputRef.current?.value;
    };

    getStringValue: () => string | null | undefined = () => {
        return this.inputRef.current?.value.toString();
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
            className,
        } = this.props;

        const formattedValue = value === null ? "" : value.toString();

        // Some of our content was saved with empty strings as the label text,
        // and we don't want to render an empty aria-label attribute.
        const ariaLabel = labelText || undefined;

        return (
            <TextField
                ref={this.inputRef}
                // @ts-expect-error - TS2322 - Property className does not exist on type
                className={className}
                style={style}
                disabled={disabled}
                id={this.id}
                value={formattedValue}
                type="text"
                aria-label={ariaLabel}
                aria-describedby={this.props["aria-describedby"]}
                onChange={(value) => this.props.onChange(value)}
                placeholder={placeholder}
                testId={"input-with-examples"}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
            />
        );
    }
}

export default TextInput;
