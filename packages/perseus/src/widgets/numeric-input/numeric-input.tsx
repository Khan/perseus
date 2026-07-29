import {KhanMath} from "@khanacademy/kmath";
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
    normalizeCorrectAnswerForms,
    shouldShowExamples,
} from "./utils";

import type {Focusable, Widget, WidgetExports, WidgetProps} from "../../types";
import type {NumericInputPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";
import type {
    MathFormat,
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
    PerseusNumericInputWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type Props = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
>;

// The Widget-interface methods this component exposes via its ref. Every
// member of Widget is optional, so this is `Required` to make the compiler
// insist that each one listed here actually gets implemented.
type WidgetHandle = Required<
    Pick<
        Widget,
        | "focus"
        | "focusInputPath"
        | "blurInputPath"
        | "getInputPaths"
        | "getPromptJSON"
        | "getSerializedState"
    >
>;

// Assert that the PerseusNumericInputWidgetOptions parsed from JSON can be passed
// as props to this component. This ensures that the PerseusNumericInputWidgetOptions
// stays in sync with the prop types. The PropsFor<Component> type takes
// defaultProps into account.
// eslint-disable-next-line no-restricted-syntax
0 as any as WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
> satisfies PropsFor<typeof NumericInput>;

/**
 * The NumericInput widget is a numeric input field that supports a variety of
 * answer forms, including integers, decimals, fractions, and mixed numbers.
 */
export const NumericInput = forwardRef<WidgetHandle, Props>(
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
            focus: () => {
                inputRef.current?.focus();
                setIsFocused(true);
                return true;
            },

            focusInputPath: () => {
                inputRef.current?.focus();
                setIsFocused(true);
            },

            blurInputPath: () => {
                inputRef.current?.blur();
                setIsFocused(false);
            },

            // The widget itself is an input, so we return a single empty list to
            // indicate this.
            getInputPaths: () => [[]],

            getPromptJSON: (): NumericInputPromptJSON => _getPromptJSON(props),

            /**
             * @deprecated and likely very broken API
             * [LEMS-3185] do not trust serializedState
             */
            getSerializedState: () => {
                const {userInput, labelText, answers: _, ...rest} = props;
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

function getStartUserInput(): PerseusNumericInputUserInput {
    return {currentValue: ""};
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusNumericInputUserInput {
    return {
        currentValue: serializedState.currentValue,
    };
}

export function findPrecision(value: number) {
    for (let i = 0; i < 10; i++) {
        // `toFixed` handily rounds a number to a given precision...
        // ...but also turns it into a string. so `+` turns it back
        // into a number.
        if (value === +value.toFixed(i)) {
            return i;
        }
    }
    return 10; // don't assume there's more precision than that
}

export function findCommonFractions(value: number) {
    const whole = Math.floor(value);
    if (value === whole) {
        return;
    }
    const decimal = value - whole;
    const precision = findPrecision(decimal);
    // it's brute force, but it's honest work
    for (let num = 1; num < 100; num++) {
        for (let denom = 2; denom < 100; denom++) {
            if (+(num / denom).toFixed(precision) === decimal) {
                return {num: num + whole * denom, denom};
            }
        }
    }
}

function getCorrectUserInput(
    options: PerseusNumericInputWidgetOptions,
): PerseusNumericInputUserInput {
    for (const answer of options.answers) {
        if (answer.status === "correct" && answer.value != null) {
            if (answer.answerForms?.includes("decimal")) {
                return {currentValue: answer.value.toString()};
            }
            if (answer.answerForms?.includes("improper")) {
                const frac = findCommonFractions(answer.value);
                if (frac) {
                    return {currentValue: `${frac.num}/${frac.denom}`};
                }
            }
            if (answer.answerForms?.includes("proper")) {
                const frac = findCommonFractions(answer.value);
                if (frac) {
                    const {num, denom} = frac;
                    if (num > denom) {
                        const whole = Math.floor(num / denom);
                        const remainder = num - whole * denom;
                        return {currentValue: `${whole} ${remainder}/${denom}`};
                    } else {
                        return {currentValue: `${num}/${denom}`};
                    }
                }
            }
            // 🤷
            return {currentValue: answer.value.toString()};
        }
    }
    return {currentValue: ""};
}

export default {
    name: "numeric-input",
    displayName: "Numeric input",
    widget: NumericInput,
    isLintable: true,
    getCorrectUserInput,
    getOneCorrectAnswerFromRubric(
        rubric: PerseusNumericInputRubric,
    ): string | null | undefined {
        const correctAnswers = rubric.answers.filter(
            (answer) => answer.status === "correct",
        );
        const answerStrings = correctAnswers.map((answer) => {
            // Either get the first answer form or default to decimal
            const format: MathFormat =
                answer.answerForms && answer.answerForms[0]
                    ? answer.answerForms[0]
                    : "decimal";

            let answerString = KhanMath.toNumericString(answer.value!, format);
            if (answer.maxError) {
                answerString +=
                    " ± " + KhanMath.toNumericString(answer.maxError, format);
            }
            return answerString;
        });
        if (answerStrings.length === 0) {
            return;
        }
        return answerStrings[0];
    },
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof NumericInput>;
