/* eslint-disable react/sort-comp */
import * as PerseusLinter from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {ClassNames as ApiClassNames} from "../perseus-api";
import Renderer from "../renderer";
import Util from "../util";

import MathInput from "./math-input";
import MathOutput from "./math-output";
import TextInput from "./text-input";
import Tooltip, {HorizontalDirection, VerticalDirection} from "./tooltip";

import type {LinterContextProps} from "@khanacademy/perseus-linter";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {captureScratchpadTouchStart} = Util;

type Props = {
    type: "math" | "text" | "tex";
    value: string;
    onChange: any;
    className: string;
    examples: ReadonlyArray<string>;
    shouldShowExamples: boolean;
    convertDotToTimes?: boolean;
    buttonSet?: string;
    buttonsVisible?: "always" | "never" | "focused";
    labelText?: string;
    onFocus: () => void;
    onBlur: () => void;
    disabled: boolean;
    style?: StyleType;
    id: string;
    linterContext: LinterContextProps;
};

type DefaultProps = {
    type: Props["type"];
    shouldShowExamples: Props["shouldShowExamples"];
    onFocus: Props["onFocus"];
    onBlur: Props["onBlur"];
    disabled: Props["disabled"];
    linterContext: Props["linterContext"];
    className: Props["className"];
};

type State = {
    focused: boolean;
    showExamples: boolean;
};

class InputWithExamples extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        type: "text",
        shouldShowExamples: true,
        onFocus: function () {},
        onBlur: function () {},
        disabled: false,
        linterContext: PerseusLinter.linterContextDefault,
        className: "",
    };

    state: State = {
        focused: false,
        showExamples: false,
    };

    _getUniqueId: () => string = () => {
        return `input-with-examples-${btoa(this.props.id).replace(/=/g, "")}`;
    };

    _getInputClassName: () => string = () => {
        // <MathOutput> is a special component that manages its own class and
        // state, as it's a <span> that wants to act like an <input>.
        if (this.props.type === "tex") {
            return this.props.className;
        }

        // Otherwise, we need to add these INPUT and FOCUSED tags here.
        let className = ApiClassNames.INPUT + " " + ApiClassNames.INTERACTIVE;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    };

    _getPropsForInputType: () => any = () => {
        // Minimal set of props, used by each input type
        const id = this._getUniqueId();
        const inputProps = {
            id: id,
            "aria-describedby": id,
            ref: "input",
            className: this._getInputClassName(),
            labelText: this.props.labelText,
            value: this.props.value,
            onFocus: this._handleFocus,
            onBlur: this._handleBlur,
            disabled: this.props.disabled,
            style: this.props.style,
        } as const;

        if (this.props.type === "tex") {
            return inputProps;
        }

        // Add useful props required for MATH and TEXT modes
        _.extend(inputProps, {
            onChange: this.props.onChange,
            onTouchStart: captureScratchpadTouchStart,
        });

        // And add final props that are MATH- and TEXT-specific
        if (this.props.type === "math") {
            return _.extend(
                {
                    buttonSet: this.props.buttonSet,
                    buttonsVisible: this.props.buttonsVisible,
                    convertDotToTimes: this.props.convertDotToTimes,
                },
                inputProps,
            );
        }
        if (this.props.type === "text") {
            return _.extend(
                {
                    autoCapitalize: "off",
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                },
                inputProps,
            );
        }
    };

    _getComponentForInputType: () => any = () => {
        switch (this.props.type) {
            case "tex":
                return MathOutput;

            case "math":
                return MathInput;

            case "text":
                return TextInput;

            default:
                this.props.type as never;
                return null;
        }
    };

    _renderInput: () => any = () => {
        const inputProps = this._getPropsForInputType();
        const InputComponent = this._getComponentForInputType();
        return <InputComponent {...inputProps} />;
    };

    render(): React.ReactNode {
        const input = this._renderInput();

        // Static rendering, which doesn't include the 'tooltip' logic that the
        // other types require, and is hence handled separately.
        if (this.props.type === "tex") {
            return input;
        }

        // Else, we need to be able to show examples
        const examplesContent = _.map(this.props.examples, (example) => {
            return "- " + example;
        }).join("\n");

        const showExamples =
            this.props.shouldShowExamples && this.state.showExamples;

        return (
            <Tooltip
                // eslint-disable-next-line react/no-string-refs
                ref="tooltip"
                className="perseus-formats-tooltip preview-measure"
                horizontalPosition={HorizontalDirection.Left}
                horizontalAlign={HorizontalDirection.Left}
                verticalPosition={VerticalDirection.Bottom}
                arrowSize={10}
                borderColor="#ccc"
                show={showExamples}
            >
                {input}
                <div id={this._getUniqueId()}>
                    <Renderer
                        content={examplesContent}
                        linterContext={PerseusLinter.pushContextStack(
                            this.props.linterContext,
                            "input-with-examples",
                        )}
                    />
                </div>
            </Tooltip>
        );
    }

    _handleFocus: () => void = () => {
        this.props.onFocus();
        this.setState({
            focused: true,
            showExamples: true,
        });
    };

    show: () => void = () => {
        this.setState({showExamples: true});
    };

    hide: () => void = () => {
        this.setState({showExamples: false});
    };

    _handleBlur: () => void = () => {
        this.props.onBlur();
        this.setState({
            focused: false,
            showExamples: false,
        });
    };

    focus: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
    };

    blur: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        this.refs.input.blur();
    };

    handleChange: (arg1: any) => void = (e) => {
        this.props.onChange(e.target.value);
    };
}

export default InputWithExamples;
