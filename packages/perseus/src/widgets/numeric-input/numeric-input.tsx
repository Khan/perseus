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
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";

import InputWithExamples from "./input-with-examples";
import styles from "./numeric-input.module.css";
import stylesLegacy from "./numeric-input_legacy-styles";
import {
    generateExamples,
    getCorrectUserInput,
    getOneCorrectAnswerFromRubric,
    getStartUserInput,
    getUserInputFromSerializedState,
    normalizeCorrectAnswerForms,
    shouldShowExamples,
} from "./utils";

import type {Focusable, Widget, WidgetExports, WidgetProps} from "../../types";
import type {NumericInputPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";
import type {
    PerseusNumericInputUserInput,
    PerseusNumericInputWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type Props = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
>;

// Assert that the PerseusNumericInputWidgetOptions parsed from JSON can be passed
// as props to this component. This ensures that the PerseusNumericInputWidgetOptions
// stays in sync with the prop types. The PropsFor<Component> type takes
// defaultProps into account.
// TODO(LEMS-4354): Remove these type assertions from all widgets.
// eslint-disable-next-line no-restricted-syntax
0 as any as WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
> satisfies PropsFor<typeof NumericInput>;

/**
 * The NumericInput widget is a numeric input field that supports a variety of
 * answer forms, including integers, decimals, fractions, and mixed numbers.
 */
export const NumericInput = forwardRef<Widget, Props>(
    function NumericInput(props, ref) {
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

        useImperativeHandle(ref, () => ({
            focus() {
                if (inputRef.current) {
                    inputRef.current.focus();
                    setIsFocused(true);
                }
                return true;
            },

            focusInputPath() {
                if (inputRef.current) {
                    inputRef.current.focus();
                    setIsFocused(true);
                }
            },

            blurInputPath() {
                if (inputRef.current) {
                    inputRef.current.blur();
                    setIsFocused(false);
                }
            },

            // The widget itself is an input, so we return a single empty list to
            // indicate this.
            getInputPaths: () => [[]],

            getPromptJSON: (): NumericInputPromptJSON => _getPromptJSON(props),

            /**
             * @deprecated and likely very broken API
             * [LEMS-3185] do not trust serializedState
             */
            getSerializedState() {
                const {userInput, labelText, answers, ...rest} = props;
                return {
                    ...rest,
                    answerForms: [],
                    labelText: labelText ?? "",
                    currentValue: userInput.currentValue,
                };
            },
        }));

        const answerForms = normalizeCorrectAnswerForms(props.answers);

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

        const alignmentStyles =
            props.textAlign === "center"
                ? stylesLegacy.centerAlign
                : props.textAlign === "right"
                  ? stylesLegacy.rightAlign
                  : {};

        // TODO (LEMS-3815): Remove legacy styles
        const legacyStylesToUse = {
            ...stylesLegacy.inputWithExamples,
            ...(isFocused ? stylesLegacy.isFocused : {}),
            ...alignmentStyles,
            ...(props.size === "small" ? stylesLegacy.sizeSmall : {}),
        };

        const classesToUse = [styles.inputWithExamples];
        if (isFocused) {
            classesToUse.push(styles.isFocused);
        }
        if (props.textAlign !== "left") {
            const alignmentClass =
                props.textAlign === "center"
                    ? styles.centerAlign
                    : styles.rightAlign;
            classesToUse.push(alignmentClass);
        }
        if (props.size === "small") {
            classesToUse.push(styles.sizeSmall);
        }
        // (mobile-only) If the custom keypad is enabled, use the SimpleKeypadInput component
        if (props.apiOptions.customKeypad) {
            const alignmentClass =
                props.textAlign === "center"
                    ? "perseus-input-center-align"
                    : props.textAlign === "right"
                      ? "perseus-input-right-align"
                      : undefined;
            return (
                <div className={alignmentClass}>
                    <SimpleKeypadInput
                        // eslint-disable-next-line no-restricted-syntax
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
                labelText={props.labelText || context.strings.yourAnswerLabel}
                examples={generateExamples(answerForms, context.strings)}
                shouldShowExamples={shouldShowExamples(answerForms)}
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

export default {
    name: "numeric-input",
    displayName: "Numeric input",
    widget: NumericInput,
    isLintable: true,
    getCorrectUserInput,
    getOneCorrectAnswerFromRubric,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof NumericInput>;
