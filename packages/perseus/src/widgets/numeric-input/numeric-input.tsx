import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import {useDependencies} from "../../dependencies";

import InputWithExamples from "./input-with-examples";
import {type NumericInputProps} from "./numeric-input.class";
import styles from "./numeric-input.module.css";
import stylesLegacy from "./numeric-input_legacy-styles";
import {generateExamples, shouldShowExamples} from "./utils";

import type {Focusable} from "../../types";

/**
 * The NumericInputComponent is a child component of the NumericInput class
 * component. It is responsible for rendering the UI elements of the Numeric
 * Input widget.
 */
export const NumericInputComponent = forwardRef<Focusable, NumericInputProps>(
    function NumericInputComponent(props, ref) {
        const {analytics} = useDependencies();
        const context = useContext(PerseusI18nContext);
        const inputRef = useRef<Focusable>(null);
        const [isFocused, setIsFocused] = useState<boolean>(false);

        useOnMountEffect(() => {
            analytics.onAnalyticsEvent({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: "null",
                    widgetType: "numeric-input",
                    widgetId: props.widgetId,
                },
            });
        });

        // Pass the focus and blur methods to the Numeric Input Class component
        useImperativeHandle(ref, () => ({
            current: inputRef.current,
            focus: () => {
                if (inputRef.current) {
                    inputRef.current?.focus();
                    setIsFocused(true);
                }
            },
            blur: () => {
                if (inputRef.current) {
                    inputRef.current?.blur();
                    setIsFocused(false);
                }
            },
        }));

        const handleChange = (newValue: string): void => {
            props.handleUserInput({currentValue: newValue});
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

        // TODO (LEMS-3815): Remove legacy styles
        const legacyStylesToUse = {
            ...stylesLegacy.inputWithExamples,
            ...(isFocused ? stylesLegacy.isFocused : {}),
            ...(props.rightAlign ? stylesLegacy.rightAlign : {}),
            ...(props.size === "small" ? stylesLegacy.sizeSmall : {}),
        };

        const classesToUse = [styles.inputWithExamples];
        if (isFocused) {
            classesToUse.push(styles.isFocused);
        }
        if (props.rightAlign) {
            classesToUse.push(styles.rightAlign);
        }
        if (props.size === "small") {
            classesToUse.push(styles.sizeSmall);
        }
        // (mobile-only) If the custom keypad is enabled, use the SimpleKeypadInput component
        if (props.apiOptions.customKeypad) {
            const alignmentClass = props.rightAlign
                ? "perseus-input-right-align"
                : undefined;
            return (
                <div className={alignmentClass}>
                    <SimpleKeypadInput
                        ref={inputRef as React.RefObject<SimpleKeypadInput>}
                        value={props.userInput.currentValue}
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
                ref={inputRef}
                value={props.userInput.currentValue}
                onChange={handleChange}
                labelText={props.labelText}
                examples={generateExamples(props.answerForms, context.strings)}
                shouldShowExamples={shouldShowExamples(props.answerForms)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                id={props.widgetId}
                disabled={props.apiOptions.readOnly}
                style={legacyStylesToUse}
                className={classesToUse.join(" ")}
            />
        );
    },
);
