import * as PerseusLinter from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {ClassNames as ApiClassNames} from "../perseus-api";
import Renderer from "../renderer";
import Util from "../util";

import {PerseusI18nContext} from "./i18n-context";
import TextInput from "./text-input";
import Tooltip, {HorizontalDirection, VerticalDirection} from "./tooltip";

import type {LinterContextProps} from "@khanacademy/perseus-linter";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {captureScratchpadTouchStart} = Util;

type Props = {
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
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
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

    _renderInput: () => any = () => {
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
            onChange: this.props.onChange,
            onTouchStart: captureScratchpadTouchStart,
            autoCapitalize: "off",
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
        };
        return <TextInput {...inputProps} />;
    };

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
    render(): React.ReactNode {
        const input = this._renderInput();

        const examplesContent = this.props.examples
            .map((example, index) => {
                // If the first example is bold, then it is most likely a heading/leading text.
                // So, it shouldn't be part of the list.
                return index === 0 && example.startsWith("**")
                    ? `${example}\n`
                    : `- ${example}`;
            })
            .join("\n");

        const showExamples =
            this.props.shouldShowExamples && this.state.showExamples;

        return (
            <Tooltip
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
                        strings={this.context.strings}
                    />
                </div>
            </Tooltip>
        );
    }
}

export default InputWithExamples;
