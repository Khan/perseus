import {linterContextDefault} from "@khanacademy/perseus-linter";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import InputWithExamples from "../../components/input-with-examples";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import {ApiOptions} from "../../perseus-api";
import KhanMath from "../../util/math";

import numericInputValidator from "./numeric-input-validator";

import type {
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputAnswerForm,
} from "../../perseus-types";
import type {PerseusStrings} from "../../strings";
import type {
    FocusPath,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {
    PerseusNumericInputRubric,
    PerseusNumericInputUserInput,
} from "../../validation.types";

const formExamples: {
    [key: string]: (
        arg1: PerseusNumericInputAnswerForm,
        strings: PerseusStrings,
    ) => string;
} = {
    integer: (form, strings: PerseusStrings) => strings.integerExample,
    proper: (form, strings: PerseusStrings) =>
        form.simplify === "optional"
            ? strings.properExample
            : strings.simplifiedProperExample,
    improper: (form, strings: PerseusStrings) =>
        form.simplify === "optional"
            ? strings.improperExample
            : strings.simplifiedImproperExample,
    mixed: (form, strings: PerseusStrings) => strings.mixedExample,
    decimal: (form, strings: PerseusStrings) => strings.decimalExample,
    pi: (form, strings: PerseusStrings) => strings.piExample,
};

type ExternalProps = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputRubric
>;

type Props = ExternalProps & {
    size: NonNullable<ExternalProps["size"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    coefficient: NonNullable<ExternalProps["coefficient"]>;
    answerForms: NonNullable<ExternalProps["answerForms"]>;
    labelText: NonNullable<ExternalProps["labelText"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    currentValue: string;
};

type DefaultProps = {
    currentValue: Props["currentValue"];
    size: Props["size"];
    rightAlign: Props["rightAlign"];
    apiOptions: Props["apiOptions"];
    coefficient: Props["coefficient"];
    answerForms: Props["answerForms"];
    labelText: Props["labelText"];
    linterContext: Props["linterContext"];
};

type State = {
    // keeps track of the other set of values when switching
    // between 0 and finite solutions
    previousValues: ReadonlyArray<string>;
};

export class NumericInput extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    inputRef: SimpleKeypadInput | InputWithExamples | null | undefined;

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

    static getUserInputFromProps(props: Props): PerseusNumericInputUserInput {
        return {
            currentValue: props.currentValue,
        };
    }

    static getOneCorrectAnswerFromRubric(
        rubric: PerseusNumericInputRubric,
    ): string | null | undefined {
        const correctAnswers = rubric.answers.filter(
            (answer) => answer.status === "correct",
        );
        const answerStrings = correctAnswers.map((answer) => {
            // Figure out how this answer is supposed to be
            // displayed
            let format = "decimal";
            if (answer.answerForms && answer.answerForms[0]) {
                // NOTE(johnsullivan): This isn't exactly ideal, but
                // it does behave well for all the currently known
                // problems. See D14742 for some discussion on
                // alternate strategies.
                format = answer.answerForms[0];
            }

            // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'MathFormat | undefined'.
            let answerString = KhanMath.toNumericString(answer.value, format);
            if (answer.maxError) {
                answerString +=
                    " \u00B1 " +
                    // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'MathFormat | undefined'.
                    KhanMath.toNumericString(answer.maxError, format);
            }
            return answerString;
        });
        if (answerStrings.length === 0) {
            return;
        }
        return answerStrings[0];
    }

    static validate(
        userInput: PerseusNumericInputUserInput,
        rubric: PerseusNumericInputRubric,
        strings: PerseusStrings,
    ): PerseusScore {
        return numericInputValidator(userInput, rubric, strings);
    }

    state: State = {
        // keeps track of the other set of values when switching
        // between 0 and finite solutions
        previousValues: [""],
    };

    // TODO(Nicole, Jeremy): This is maybe never used and should be removed
    examples: () => ReadonlyArray<string> = () => {
        // if the set of specified forms are empty, allow all forms
        const forms =
            this.props.answerForms?.length !== 0
                ? this.props.answerForms
                : Object.keys(formExamples).map((name) => {
                      return {
                          name: name,
                          simplify: "required",
                      } as PerseusNumericInputAnswerForm;
                  });

        let examples = _.map(forms, (form) => {
            return formExamples[form.name](form, this.context.strings);
        });
        // Ensure no duplicate tooltip text from simplified and unsimplified
        // versions of the same format
        examples = _.uniq(examples);

        return [this.context.strings.yourAnswer].concat(examples);
    };

    shouldShowExamples: () => boolean = () => {
        const noFormsAccepted = this.props.answerForms?.length === 0;
        // To check if all answer forms are accepted, we must first
        // find the *names* of all accepted forms, and see if they are
        // all present, ignoring duplicates
        const answerFormNames: ReadonlyArray<string> = _.uniq(
            this.props.answerForms?.map((form) => form.name),
        );
        const allFormsAccepted =
            answerFormNames.length >= Object.keys(formExamples).length;
        return !noFormsAccepted && !allFormsAccepted;
    };

    simpleValidate(rubric: PerseusNumericInputRubric): PerseusScore {
        return numericInputValidator(
            this.getUserInput(),
            rubric,
            this.context.strings,
        );
    }

    focus: () => boolean = () => {
        this.inputRef?.focus();
        return true;
    };

    focusInputPath: () => void = () => {
        this.inputRef?.focus();
    };

    blurInputPath: () => void = () => {
        this.inputRef?.blur();
    };

    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* c8 ignore next */
        return [[]];
    };

    getGrammarTypeForPath: (arg1: FocusPath) => string = (inputPath) => {
        /* c8 ignore next */
        return "number";
    };

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

    getUserInput(): PerseusNumericInputUserInput {
        return NumericInput.getUserInputFromProps(this.props);
    }

    handleChange: (
        arg1: string,
        arg2?: () => unknown | null | undefined,
    ) => void = (newValue, cb) => {
        this.props.onChange({currentValue: newValue}, cb);
        this.props.trackInteraction();
    };

    _handleFocus: () => void = () => {
        this.props.onFocus([]);
    };

    _handleBlur: () => void = () => {
        this.props.onBlur([]);
    };

    render(): React.ReactNode {
        let labelText = this.props.labelText;
        if (labelText == null || labelText === "") {
            labelText = this.context.strings.yourAnswerLabel;
        }

        // To right align a custom keypad we need to wrap it.
        const maybeRightAlignKeypadInput = (
            keypadInput: React.ReactElement<
                React.ComponentProps<typeof SimpleKeypadInput>
            >,
        ) => {
            return this.props.rightAlign ? (
                <div className="perseus-input-right-align">{keypadInput}</div>
            ) : (
                keypadInput
            );
        };

        if (this.props.apiOptions.customKeypad) {
            // TODO(charlie): Support "Review Mode".
            return maybeRightAlignKeypadInput(
                <SimpleKeypadInput
                    ref={(ref) => (this.inputRef = ref)}
                    value={this.props.currentValue}
                    keypadElement={this.props.keypadElement}
                    onChange={this.handleChange}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                />,
            );
        }

        // Note: This is _very_ similar to what `input-number.jsx` does. If
        // you modify this, double-check if you also need to modify that
        // component.
        const styles = StyleSheet.create({
            input: {
                textAlign: this.props.rightAlign ? "right" : "left",
                width: this.props.size === "small" ? 40 : 80,
                padding: 0,
                height: "auto",
            },
        });

        return (
            <div>
                <InputWithExamples
                    ref={(ref) => (this.inputRef = ref)}
                    value={this.props.currentValue}
                    onChange={this.handleChange}
                    labelText={labelText}
                    examples={this.examples()}
                    shouldShowExamples={this.shouldShowExamples()}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    id={this.props.widgetId}
                    disabled={this.props.apiOptions.readOnly}
                    style={styles.input}
                />
            </div>
        );
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
    const formExampleKeys = Object.keys(formExamples);
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
} as WidgetExports<typeof NumericInput>;
