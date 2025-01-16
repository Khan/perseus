import * as PerseusLinter from "@khanacademy/perseus-linter";
import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import TextInput from "../../components/text-input";
import Tooltip, {
    HorizontalDirection,
    VerticalDirection,
} from "../../components/tooltip";
import {ClassNames as ApiClassNames} from "../../perseus-api";
import Renderer from "../../renderer";
import Util from "../../util";

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

type State = {
    focused: boolean;
    showExamples: boolean;
};
// [LEMS-2411](Jan 2025) Third: This component has been moved to the NumericInput
// folder as we are actively working towards removing the InputNumber widget.
// This comment can be removed as part of LEMS-2411.

/**
 * The InputWithExamples component is a child component of the NumericInput
 * and InputNumber components. It is responsible for rendering the UI elements
 * for the desktop versions of these widgets, and displays a tooltip with
 * examples of how to input the selected answer forms.
 */
const InputWithExamples = forwardRef<
    React.RefObject<typeof InputWithExamples>,
    Props
>((props, ref) => {
    // Desctructure the props to set default values
    const {
        shouldShowExamples = true,
        onFocus = () => {},
        onBlur = () => {},
        disabled = false,
        linterContext = PerseusLinter.linterContextDefault,
        className = "",
    } = props;

    const context = React.useContext(PerseusI18nContext);
    const inputRef = React.useRef<TextInput>(null);
    const [state, setState] = React.useState<State>({
        focused: false,
        showExamples: false,
    });

    useImperativeHandle(ref, () => ({
        current: inputRef.current,
        focus: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        blur: () => {
            if (inputRef.current) {
                inputRef.current.blur();
            }
        },
    }));

    const _getUniqueId = () => {
        return `input-with-examples-${btoa(props.id).replace(/=/g, "")}`;
    };

    const _getInputClassName = () => {
        let inputClassName =
            ApiClassNames.INPUT + " " + ApiClassNames.INTERACTIVE;
        if (state.focused) {
            inputClassName += " " + ApiClassNames.FOCUSED;
        }
        if (className) {
            inputClassName += " " + className;
        }
        return inputClassName;
    };

    const _renderInput = () => {
        const id = _getUniqueId();
        const ariaId = `aria-for-${id}`;

        // Generate the provided examples in simple language for screen readers.
        // If all examples are provided, do not provide them to the screen reader.
        const examplesAria =
            props.examples.length === 0
                ? ""
                : `${props.examples[0]}
                   ${props.examples.slice(1).join(", or\n")}`
                      // @ts-expect-error TS2550: Property replaceAll does not exist on type string.
                      .replaceAll("*", "")
                      .replaceAll("$", "")
                      .replaceAll("\\ \\text{pi}", " pi")
                      .replaceAll("\\ ", " and ");

        const inputProps = {
            id: id,
            "aria-describedby": ariaId,
            ref: inputRef,
            className: _getInputClassName(),
            labelText: props.labelText,
            value: props.value,
            onFocus: _handleFocus,
            onBlur: _handleBlur,
            disabled: disabled,
            style: props.style,
            onChange: props.onChange,
            onTouchStart: captureScratchpadTouchStart,
            autoCapitalize: "off",
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
        };
        return (
            <>
                <TextInput {...inputProps} />
                <span id={ariaId} style={{display: "none"}}>
                    {examplesAria}
                </span>
            </>
        );
    };

    const _handleFocus = () => {
        onFocus();
        setState({
            focused: true,
            showExamples: true,
        });
    };

    const _handleBlur = () => {
        onBlur();
        setState({
            focused: false,
            showExamples: false,
        });
    };

    // Display the examples as a string when there are less than or equal to 2 examples.
    // Otherwise, display the examples as a list.
    const examplesContent =
        props.examples.length <= 2
            ? props.examples.join(" ")
            : props.examples
                  .map((example, index) => {
                      return index === 0 && example.startsWith("**")
                          ? `${example}\n`
                          : `- ${example}`;
                  })
                  .join("\n");

    // Display the examples when they are enabled (shouldShowExamples) and the input is focused (showExamples).
    const showExamplesTooltip = shouldShowExamples && state.showExamples;

    return (
        <Tooltip
            className="perseus-formats-tooltip preview-measure"
            horizontalPosition={HorizontalDirection.Left}
            horizontalAlign={HorizontalDirection.Left}
            verticalPosition={VerticalDirection.Bottom}
            arrowSize={10}
            borderColor="#ccc"
            show={showExamplesTooltip}
        >
            {_renderInput()}
            <div id={_getUniqueId()}>
                <Renderer
                    content={examplesContent}
                    linterContext={PerseusLinter.pushContextStack(
                        linterContext,
                        "input-with-examples",
                    )}
                    strings={context.strings}
                />
            </div>
        </Tooltip>
    );
});

export default InputWithExamples;
