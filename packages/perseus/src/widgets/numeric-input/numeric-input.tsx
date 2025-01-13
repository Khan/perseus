import {StyleSheet} from "aphrodite";
import * as React from "react";
import {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import InputWithExamples from "../../components/input-with-examples";
import SimpleKeypadInput from "../../components/simple-keypad-input";

import {
    NumericExampleStrings,
    type NumericInputProps,
} from "./numeric-input.class";

import type {PerseusStrings} from "../../strings";
import type {PerseusNumericInputAnswerForm} from "@khanacademy/perseus-core";

type InputRefType = SimpleKeypadInput | InputWithExamples | null;

/**
 * The NumericInputComponent is a child component of the NumericInput class
 * component. It is responsible for rendering the UI elements of the Numeric
 * Input widget.
 */
export const NumericInputComponent = forwardRef(
    (props: NumericInputProps, ref) => {
        const context = useContext(PerseusI18nContext);
        const inputRef = useRef<InputRefType>(null);
        const [isFocused, setIsFocused] = useState<boolean>(false);

        // Pass the focus and blur methods to the Numeric Input Class component
        useImperativeHandle(ref, () => ({
            focus: () => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    setIsFocused(true);
                }
            },
            blur: () => {
                if (inputRef.current) {
                    inputRef.current.blur();
                    setIsFocused(false);
                }
            },
        }));

        const handleChange = (
            newValue: string,
            cb?: () => unknown | null | undefined,
        ): void => {
            props.onChange({currentValue: newValue}, cb);
            props.trackInteraction();
        };

        const handleFocus = (): void => {
            props.onFocus([]);
            setIsFocused(true);
        };

        const handleBlur = (): void => {
            props.onBlur([]);
            setIsFocused(false);
        };

        /**
         * Add right alignment to the keypad input if necessary.
         */
        const maybeRightAlignKeypadInput = (
            keypadInput: React.ReactElement<
                React.ComponentProps<typeof SimpleKeypadInput>
            >,
        ) => {
            return props.rightAlign ? (
                <div className="perseus-input-right-align">{keypadInput}</div>
            ) : (
                keypadInput
            );
        };

        // If the labelText is not provided by the Content Creators, use the default label text
        let labelText = props.labelText;
        if (labelText == null || labelText === "") {
            labelText = context.strings.yourAnswerLabel;
        }

        // Styles for the InputWithExamples
        const styles = StyleSheet.create({
            input: {
                borderRadius: "3px",
                borderWidth: isFocused ? "2px" : "1px",
                display: "inline-block",
                fontFamily: `Symbola, "Times New Roman", serif`,
                fontSize: "18px",
                height: "32px",
                lineHeight: "18px",
                padding: isFocused ? "4px" : "4px 5px",
                textAlign: props.rightAlign ? "right" : "left",
                width: props.size === "small" ? 40 : 80,
            },
        });

        // (mobile) If the custom keypad is enabled, use the SimpleKeypadInput component
        if (props.apiOptions.customKeypad) {
            return maybeRightAlignKeypadInput(
                <SimpleKeypadInput
                    ref={inputRef as React.RefObject<SimpleKeypadInput>}
                    value={props.currentValue}
                    keypadElement={props.keypadElement}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />,
            );
        }
        // (desktop) Otherwise, use the InputWithExamples component
        return (
            <InputWithExamples
                ref={inputRef as React.RefObject<InputWithExamples>}
                value={props.currentValue}
                onChange={handleChange}
                labelText={labelText}
                examples={generateExamples(props.answerForms, context.strings)}
                shouldShowExamples={shouldShowExamples(props.answerForms)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id={props.widgetId}
                disabled={props.apiOptions.readOnly}
                style={styles.input}
            />
        );
    },
);

/**
 * Generates a string that demonstrates how to input the various supported
 * answer forms. These strings are shown as examples to the user in a tooltip.
 */
const generateExamples = (
    answerForms: readonly PerseusNumericInputAnswerForm[],
    strings: PerseusStrings,
): ReadonlyArray<string> => {
    const forms =
        answerForms?.length !== 0
            ? answerForms
            : Object.keys(NumericExampleStrings).map((name) => {
                  return {
                      name: name,
                      simplify: "required",
                  } as PerseusNumericInputAnswerForm;
              });

    let examples = _.map(forms, (form) => {
        return NumericExampleStrings[form.name](form, strings);
    });
    examples = _.uniq(examples);

    return [strings.yourAnswer].concat(examples);
};

/**
 * Determines whether to show examples of how to input
 * the various supported answer forms.
 */
const shouldShowExamples = (
    answerForms: readonly PerseusNumericInputAnswerForm[],
): boolean => {
    const noFormsAccepted = answerForms?.length === 0;
    const answerFormNames: ReadonlyArray<string> = _.uniq(
        answerForms?.map((form) => form.name),
    );
    const allFormsAccepted =
        answerFormNames.length >= Object.keys(NumericExampleStrings).length;
    return !noFormsAccepted && !allFormsAccepted;
};
