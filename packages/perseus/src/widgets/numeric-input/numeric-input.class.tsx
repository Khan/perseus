import {KhanMath} from "@khanacademy/kmath";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";

import {NumericInputComponent} from "./numeric-input";
import {unionAnswerForms} from "./utils";

import type {
    FocusPath,
    Focusable,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {NumericInputPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";
import type {
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputAnswerForm,
    MathFormat,
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type ExternalProps = WidgetProps<PerseusNumericInputWidgetOptions>;

export type NumericInputProps = ExternalProps & {
    size: NonNullable<ExternalProps["size"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    coefficient: NonNullable<ExternalProps["coefficient"]>;
    answerForms: ReadonlyArray<PerseusNumericInputAnswerForm>;
    labelText: string;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    currentValue: string;
};

type DefaultProps = Pick<
    NumericInputProps,
    | "currentValue"
    | "size"
    | "rightAlign"
    | "apiOptions"
    | "coefficient"
    | "answerForms"
    | "labelText"
    | "linterContext"
>;

type RenderProps = {
    answerForms: ReadonlyArray<PerseusNumericInputAnswerForm>;
    labelText?: string;
    size: string;
    coefficient: boolean;
    rightAlign?: boolean;
    static: boolean;
};

// Assert that the PerseusNumericInputWidgetOptions parsed from JSON can be passed
// as props to this component. This ensures that the PerseusMatrixWidgetOptions
// stays in sync with the prop types. The PropsFor<Component> type takes
// defaultProps into account, which is important because
// PerseusNumericInputWidgetOptions has optional fields which receive defaults
// via defaultProps.
0 as any as WidgetProps<PerseusNumericInputWidgetOptions> satisfies PropsFor<
    typeof NumericInput
>;

/**
 * The NumericInput widget is a numeric input field that supports a variety of
 * answer forms, including integers, decimals, fractions, and mixed numbers.
 *
 * [Jan 2025] We're currenly migrating from class-based components to functional
 * components. While we cannot fully migrate this component yet, we can start
 * by using the functional component for the rendering the UI of the widget.
 */
export class NumericInput
    extends React.Component<NumericInputProps>
    implements Widget
{
    inputRef = React.createRef<Focusable>();

    static defaultProps: DefaultProps = {
        currentValue: "",
        size: "normal",
        rightAlign: false,
        apiOptions: ApiOptions.defaults,
        coefficient: false,
        answerForms: [],
        labelText: "",
        linterContext: linterContextDefault,
    };

    static getUserInputFromProps(
        props: NumericInputProps,
    ): PerseusNumericInputUserInput {
        return {
            currentValue: props.currentValue,
        };
    }

    focus: () => boolean = () => {
        this.inputRef.current?.focus();
        return true;
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
     * Sets the value of the input at the given path.
     */
    setInputValue: (
        path: FocusPath,
        newValue: string,
        cb?: () => unknown | null | undefined,
    ) => void = (path, newValue, cb) => {
        this.props.onChange({currentValue: newValue}, cb);
    };

    /**
     * Returns the value the user has currently input for this widget.
     */
    getUserInput(): PerseusNumericInputUserInput {
        return NumericInput.getUserInputFromProps(this.props);
    }

    /**
     * Returns the JSON representation of the prompt for this widget.
     * This is used by the AI to determine the prompt for the widget.
     */
    getPromptJSON(): NumericInputPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    render(): React.ReactNode {
        return <NumericInputComponent {...this.props} ref={this.inputRef} />;
    }
}
// Transforms the widget options to the props used to render the widget.
const propsTransform = function (
    widgetOptions: PerseusNumericInputWidgetOptions,
): RenderProps {
    // Omit the answers from the widget options since they are
    // not needed for rendering the widget.
    const {answers: _, ...rendererProps} = {
        ...widgetOptions,
        answerForms: unionAnswerForms(
            // Filter out the correct answers and map them to the answer forms
            // so that we can generate the examples for the widget.
            widgetOptions.answers
                .filter((answer) => answer.status === "correct")
                .map((answer) => {
                    return (answer.answerForms || []).map((form) => {
                        return {
                            simplify: answer.simplify,
                            name: form,
                        };
                    });
                }),
        ),
    };

    return rendererProps;
};

export default {
    name: "numeric-input",
    displayName: "Numeric input",
    widget: NumericInput,
    transform: propsTransform,
    isLintable: true,
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'Rubric' is not assignable to type 'PerseusNumericInputRubric'
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
} satisfies WidgetExports<typeof NumericInput>;
