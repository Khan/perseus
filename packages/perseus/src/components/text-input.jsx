/* eslint-disable react/sort-comp */
// @flow
import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import ReactDOM from "react-dom";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {BareKeypad} from "@khanacademy/math-input";
import {facebookColor} from "../../../perseus-editor/node_modules/@khanacademy/perseus/src/styles/global-constants";

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
    style?: StyleType,
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

type State = {
    showKeypad: boolean,
};

class TextInput extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        value: "",
        disabled: false,
    };

    id: string;

    constructor(props: Props) {
        super(props);
        this.state = {
            showKeypad: false,
        };
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
            style,
        } = this.props;

        const formattedValue = value === null ? "" : value.toString();

        return (
            <div>
                <TextField
                    style={style}
                    disabled={disabled}
                    id={this.id}
                    value={formattedValue}
                    type="text"
                    aria-label={labelText}
                    onChange={(value) => {
                        console.log("NEW", "onChange", value);
                        this.props.onChange(value);
                    }}
                    placeholder={placeholder}
                    onFocus={() => {
                        onFocus && onFocus();
                        this.setState({showKeypad: true});
                        console.warn("NEW", "Show Keypad");
                    }}
                    onBlur={(event) => {
                        onBlur && onBlur();
                        // this.setState({showKeypad: false});
                        console.warn("NEW", "Hide Keypad");

                        event.preventDefault();
                    }}
                    onKeyDown={(key) => {
                        console.log("NEW", "Key down", key);
                        onKeyDown && onKeyDown(key);
                    }}
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="off"
                />
                {this.state.showKeypad && (
                    <BareKeypad
                        onClickKey={(key) => {
                            if (key.startsWith("NUM")) {
                                const value = key.replace(/^NUM_/, "");
                                const nextValue = formattedValue + "" + value;
                                this.props.onChange(nextValue);
                            } else if (key == "FRAC_INCLUSIVE") {
                                const nextValue = formattedValue + "/";
                                this.props.onChange(nextValue);
                            } else if (key == "DECIMAL") {
                                const nextValue = formattedValue + ".";
                                this.props.onChange(nextValue);
                            } else if (key == "NEGATIVE") {
                                const nextValue = formattedValue + "-";
                                this.props.onChange(nextValue);
                            } else if (key == "TIMES") {
                                const nextValue = formattedValue + "*";
                                this.props.onChange(nextValue);
                            } else if (key == "MINUS") {
                                const nextValue = formattedValue + "-";
                                this.props.onChange(nextValue);
                            } else if (key == "PLUS") {
                                const nextValue = formattedValue + "+";
                                this.props.onChange(nextValue);
                            } else if (key == "LEFT_PAREN") {
                                const nextValue = formattedValue + "(";
                                this.props.onChange(nextValue);
                            } else if (key == "RIGHT_PAREN") {
                                const nextValue = formattedValue + ")";
                                this.props.onChange(nextValue);
                            } else if (key == "BACKSPACE") {
                                const nextValue = formattedValue.slice(0, -1);
                                this.props.onChange(nextValue);
                            } else if (key === "DISMISS") {
                                this.setState({showKeypad: false});
                            }
                            console.warn("NEW", "Key pressed", key);
                        }}
                        preAlgebra={true}
                        trigonometry={true}
                    />
                )}
            </div>
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
