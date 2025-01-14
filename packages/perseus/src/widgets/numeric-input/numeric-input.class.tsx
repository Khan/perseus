import {KhanMath} from "@khanacademy/kmath";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";

import {NumericInputComponent} from "./numeric-input";
import scoreNumericInput from "./score-numeric-input";
import {NumericExampleStrings} from "./utils";

import type InputWithExamples from "../../components/input-with-examples";
import type SimpleKeypadInput from "../../components/simple-keypad-input";
import type {FocusPath, Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
} from "../../validation.types";
import type {NumericInputPromptJSON} from "../../widget-ai-utils/numeric-input/prompt-utils";
import type {
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputAnswerForm,
    MathFormat,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {RefObject} from "react";

type ExternalProps = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputRubric
>;

export type NumericInputProps = ExternalProps & {
    size: NonNullable<ExternalProps["size"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    coefficient: NonNullable<ExternalProps["coefficient"]>;
    answerForms: NonNullable<ExternalProps["answerForms"]>;
    labelText: string;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    currentValue: string;
};

type DefaultProps = {
    currentValue: NumericInputProps["currentValue"];
    size: NumericInputProps["size"];
    rightAlign: NumericInputProps["rightAlign"];
    apiOptions: NumericInputProps["apiOptions"];
    coefficient: NumericInputProps["coefficient"];
    answerForms: NumericInputProps["answerForms"];
    labelText: NumericInputProps["labelText"];
    linterContext: NumericInputProps["linterContext"];
};

// Assert that the PerseusNumericInputWidgetOptions parsed from JSON can be passed
// as props to this component. This ensures that the PerseusMatrixWidgetOptions
// stays in sync with the prop types. The PropsFor<Component> type takes
// defaultProps into account, which is important because
// PerseusNumericInputWidgetOptions has optional fields which receive defaults
// via defaultProps.
0 as any as WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputRubric
> satisfies PropsFor<typeof NumericInput>;

export class NumericInput
    extends React.Component<NumericInputProps>
    implements Widget
{
    inputRef: RefObject<SimpleKeypadInput | InputWithExamples>;

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

    constructor(props: NumericInputProps) {
        super(props);
        this.inputRef = React.createRef<
            SimpleKeypadInput | InputWithExamples
        >();
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
        arg1: FocusPath,
        arg2: string,
        arg3?: () => unknown | null | undefined,
    ) => void = (path, newValue, cb) => {
        /* c8 ignore next */
        this.props.onChange(
            {
                currentValue: newValue,
            },
            cb,
        );
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

// TODO(thomas): Currently we receive a list of lists of acceptable answer types
// and union them down into a single set. It's worth considering whether it
// wouldn't make more sense to have a single set of acceptable answer types for
// a given *problem* rather than for each possible [correct/wrong] *answer*.
// When should two answers to a problem take different answer types?
// See D27790 for more discussion.
export const unionAnswerForms: (
    arg1: ReadonlyArray<ReadonlyArray<PerseusNumericInputAnswerForm>>,
) => ReadonlyArray<PerseusNumericInputAnswerForm> = function (answerFormsList) {
    // Takes a list of lists of answer forms, and returns a list of the forms
    // in each of these lists in the same order that they're listed in the
    // `formExamples` forms from above.

    // uniqueBy takes a list of elements and a function which compares whether
    // two elements are equal, and returns a list of unique elements. This is
    // just a helper function here, but works generally.
    const uniqueBy = function (list, iteratee: any) {
        // @ts-expect-error - TS2347 - Untyped function calls may not accept type arguments.
        return list.reduce<Array<any>>((uniqueList, element) => {
            // For each element, decide whether it's already in the list of
            // unique items.
            const inList = _.find(uniqueList, iteratee.bind(null, element));
            if (inList) {
                return uniqueList;
            }
            return uniqueList.concat([element]);
        }, []);
    };

    // Pull out all of the forms from the different lists.
    const allForms = answerFormsList.flat();
    // Pull out the unique forms using uniqueBy.
    const uniqueForms = uniqueBy(allForms, _.isEqual);
    // Sort them by the order they appear in the `formExamples` list.
    const formExampleKeys = Object.keys(NumericExampleStrings);
    return _.sortBy(uniqueForms, (form) => {
        return formExampleKeys.indexOf(form.name);
    });
};

type RenderProps = {
    answerForms: ReadonlyArray<{
        simplify: "required" | "correct" | "enforced" | null | undefined;
        name: "integer" | "decimal" | "proper" | "improper" | "mixed" | "pi";
    }>;
    labelText: string;
    size: "normal" | "small";
    coefficient: boolean;
    rightAlign?: boolean;
    static: boolean;
};

const propsTransform = function (
    widgetOptions: PerseusNumericInputWidgetOptions,
): RenderProps {
    const rendererProps = _.extend(_.omit(widgetOptions, "answers"), {
        answerForms: unionAnswerForms(
            // Pull out the name of each form and whether that form has
            // required simplification.
            widgetOptions.answers.map((answer) => {
                // @ts-expect-error - TS2345 - Argument of type 'readonly MathFormat[] | undefined' is not assignable to parameter of type 'Collection<any>'.
                return _.map(answer.answerForms, (form) => {
                    return {
                        simplify: answer.simplify,
                        name: form,
                    };
                });
            }),
        ),
    });

    return rendererProps;
};

export default {
    name: "numeric-input",
    displayName: "Numeric input",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: NumericInput,
    transform: propsTransform,
    isLintable: true,
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'UserInput' is not assignable to type 'PerseusNumericInputUserInput'.
    scorer: scoreNumericInput,

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
