import {KhanMath} from "@khanacademy/kmath";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";

import {NumericInputComponent} from "./numeric-input";
import {normalizeCorrectAnswerForms} from "./utils";

import type {Focusable, Widget, WidgetExports, WidgetProps} from "../../types";
import type {NumericInputPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";
import type {
    MathFormat,
    PerseusNumericInputAnswerForm,
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
    PerseusNumericInputWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type ExternalProps = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
>;

export type NumericInputProps = ExternalProps & {
    // TODO(benchristel): answerForms is not actually passed to NumericInput.
    //  It seems to be here because this props type is reused by
    //  NumericInputComponent, which does take answerForms.
    //  Use separate prop types that reflect the actual props of each component.
    answerForms: ReadonlyArray<PerseusNumericInputAnswerForm>;
};

// Assert that the PerseusNumericInputWidgetOptions parsed from JSON can be passed
// as props to this component. This ensures that the PerseusNumericInputWidgetOptions
// stays in sync with the prop types. The PropsFor<Component> type takes
// defaultProps into account.
// eslint-disable-next-line no-restricted-syntax
0 as any as WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
> satisfies Omit<PropsFor<typeof NumericInput>, "answerForms">;

/**
 * The NumericInput widget is a numeric input field that supports a variety of
 * answer forms, including integers, decimals, fractions, and mixed numbers.
 *
 * [Jan 2025] We're currently migrating from class-based components to
 * functional components. This class is a leftover of a partial migration: the
 * UI already lives in the functional NumericInputComponent, while the Widget
 * interface methods are still implemented here. Collapsing the two into a
 * single functional component is planned; see .fixie/goal.md.
 */
export class NumericInput
    extends React.Component<NumericInputProps>
    implements Widget
{
    inputRef = React.createRef<Focusable>();

    focus: () => boolean = () => {
        this.inputRef.current?.focus();
        return true;
    };

    blur: () => void = () => {
        this.inputRef.current?.blur();
    };

    focusInputPath: () => void = () => {
        this.inputRef.current?.focus();
    };

    blurInputPath: () => void = () => {
        this.inputRef.current?.blur();
    };

    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* c8 ignore next */
        return [[]];
    };

    /**
     * Returns the JSON representation of the prompt for this widget.
     * This is used by the AI to determine the prompt for the widget.
     */
    getPromptJSON(): NumericInputPromptJSON {
        return _getPromptJSON(this.props);
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState() {
        const {userInput, labelText, answers: _, ...rest} = this.props;
        return {
            ...rest,
            answerForms: [],
            labelText: labelText ?? "",
            currentValue: userInput.currentValue,
        };
    }

    render(): React.ReactNode {
        return (
            <NumericInputComponent
                {...this.props}
                answerForms={normalizeCorrectAnswerForms(this.props.answers)}
                ref={this.inputRef}
            />
        );
    }
}

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
                    " \u00B1 " +
                    KhanMath.toNumericString(answer.maxError, format);
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
