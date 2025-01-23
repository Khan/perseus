import {StyleSheet} from "aphrodite";
import * as React from "react";
import {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import InputWithExamples from "../../components/input-with-examples";
import SimpleKeypadInput from "../../components/simple-keypad-input";

import {type NumericInputProps} from "./numeric-input.class";
import {generateExamples, shouldShowExamples} from "./utils";

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

        // If the labelText is not provided by the Content Creators, use the default label text
        let labelText = props.labelText;
        if (labelText == null || labelText === "") {
            labelText = context.strings.yourAnswerLabel;
        }

        // Styles for the InputWithExamples
        const styles = StyleSheet.create({
            inputWithExamples: {
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

        // (mobile-only) If the custom keypad is enabled, use the SimpleKeypadInput component
        if (props.apiOptions.customKeypad) {
            const alignmentClass = props.rightAlign
                ? "perseus-input-right-align"
                : undefined;
            return (
                <div className={alignmentClass}>
                    <SimpleKeypadInput
                        ref={inputRef as React.RefObject<SimpleKeypadInput>}
                        value={props.currentValue}
                        keypadElement={props.keypadElement}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
            );
        }
        // (desktop-only) Otherwise, use the InputWithExamples component
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
                style={styles.inputWithExamples}
            />
        );
    },
);
