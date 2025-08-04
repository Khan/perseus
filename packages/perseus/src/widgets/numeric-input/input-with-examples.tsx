import * as PerseusLinter from "@khanacademy/perseus-linter";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import * as React from "react";
import {forwardRef, useId, useImperativeHandle} from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import TextInput from "../../components/text-input";
import {ClassNames as ApiClassNames} from "../../perseus-api";
import Renderer from "../../renderer";
import Util from "../../util";

import type {Focusable} from "../../types";
import type {LinterContextProps} from "@khanacademy/perseus-linter";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {captureScratchpadTouchStart} = Util;

type Props = {
    value: string;
    onChange: any;
    className?: string;
    examples: ReadonlyArray<string>;
    shouldShowExamples: boolean;
    convertDotToTimes?: boolean;
    buttonSet?: string;
    buttonsVisible?: "always" | "never" | "focused";
    labelText?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    style?: StyleType;
    id: string;
    linterContext?: LinterContextProps;
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
const InputWithExamples = forwardRef<Focusable, Props>(
    function InputWithExamples(
        {
            shouldShowExamples = true,
            onFocus = () => {},
            onBlur = () => {},
            disabled = false,
            linterContext = PerseusLinter.linterContextDefault,
            className = "",
            ...props
        },
        ref,
    ) {
        const context = React.useContext(PerseusI18nContext);
        const inputRef = React.useRef<TextInput>(null);
        const [inputFocused, setInputFocused] = React.useState<boolean>(false);
        const id = useId();
        const ariaId = `aria-for-${id}`;

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

        const getInputClassName = () => {
            let inputClassName = ApiClassNames.INPUT;
            if (inputFocused) {
                inputClassName += " " + ApiClassNames.FOCUSED;
            }
            if (className) {
                inputClassName += " " + className;
            }
            return inputClassName;
        };

        const handleFocus = () => {
            onFocus();
            setInputFocused(true);
        };

        const handleBlur = () => {
            onBlur();
            setInputFocused(false);
        };

        const renderInput = () => {
            // Generate the provided examples in simple language for screen readers.
            const examplesAria = shouldShowExamples
                ? `${props.examples[0]}
                   ${props.examples.slice(1).join(", or\n")}`
                      .replaceAll("*", "")
                      .replaceAll("$", "")
                      .replaceAll("\\ \\text{pi}", " pi")
                      .replaceAll("\\ ", " and ")
                : "";

            const inputProps = {
                id: id,
                // If we have examples, we want to provide the aria-describedby attribute
                "aria-describedby": shouldShowExamples ? ariaId : undefined,
                ref: inputRef,
                className: getInputClassName(),
                labelText: props.labelText,
                value: props.value,
                onFocus: handleFocus,
                onBlur: handleBlur,
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

        const renderTooltipContent = () => {
            return (
                <TooltipContent>
                    <div id={id} className="input-with-examples-tooltip">
                        <Renderer
                            content={examplesContent}
                            linterContext={PerseusLinter.pushContextStack(
                                linterContext,
                                "input-with-examples",
                            )}
                            strings={context.strings}
                        />
                    </div>
                </TooltipContent>
            );
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

        // Display the examples when they are enabled (shouldShowExamples) and the input is focused.
        const showExamplesTooltip = shouldShowExamples && inputFocused;

        return (
            <Tooltip
                content={renderTooltipContent()}
                opened={showExamplesTooltip}
                placement="bottom"
            >
                {renderInput()}
            </Tooltip>
        );
    },
);

export default InputWithExamples;
