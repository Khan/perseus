/* eslint-disable react/prop-types */
// @flow

import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import InputWithExamples from "../components/input-with-examples.jsx";
import PossibleAnswers from "../components/possible-answers.jsx";
import SimpleKeypadInput from "../components/simple-keypad-input.jsx";
import {ApiOptions} from "../perseus-api.jsx";
import TexWrangler from "../tex-wrangler.js";
import KhanAnswerTypes from "../util/answer-types.js";
import KhanMath from "../util/math.js";

import type {
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputAnswer,
} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

const ParseTex = TexWrangler.parseTex;

const answerFormButtons = [
    {title: "Integers", value: "integer", content: "6"},
    {title: "Decimals", value: "decimal", content: "0.75"},
    {title: "Proper fractions", value: "proper", content: "\u2157"},
    {
        title: "Improper fractions",
        value: "improper",
        content: "\u2077\u2044\u2084",
    },
    {title: "Mixed numbers", value: "mixed", content: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", content: "\u03C0"},
];

const formExamples = {
    integer: () => i18n._("an integer, like $6$"),
    proper: (form) =>
        form.simplify === "optional"
            ? i18n._("a *proper* fraction, like $1/2$ or $6/10$")
            : i18n._("a *simplified proper* fraction, like $3/5$"),
    improper: (form) =>
        form.simplify === "optional"
            ? i18n._("an *improper* fraction, like $10/7$ or $14/8$")
            : i18n._("a *simplified improper* fraction, like $7/4$"),
    mixed: () => i18n._("a mixed number, like $1\\ 3/4$"),
    decimal: () => i18n._("an *exact* decimal, like $0.75$"),
    pi: () =>
        i18n._(
            "a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$",
        ),
};

type UserInput = {|
    currentValue: string,
|};

export type Rubric = PerseusNumericInputWidgetOptions;

type ExternalProps = WidgetProps<PerseusNumericInputWidgetOptions, Rubric>;

type Props = {|
    ...ExternalProps,
    size: $NonMaybeType<ExternalProps["size"]>,
    rightAlign: $NonMaybeType<ExternalProps["rightAlign"]>,
    apiOptions: $NonMaybeType<ExternalProps["apiOptions"]>,
    coefficient: $NonMaybeType<ExternalProps["coefficient"]>,
    answerForms: $NonMaybeType<ExternalProps["answerForms"]>,
    labelText: $NonMaybeType<ExternalProps["labelText"]>,
    linterContext: $NonMaybeType<ExternalProps["linterContext"]>,
    multipleNumberInput: $NonMaybeType<ExternalProps["multipleNumberInput"]>,
    currentValue: string,
|};

type DefaultProps = {|
    currentValue: Props["currentValue"],
    size: Props["size"],
    rightAlign: Props["rightAlign"],
    apiOptions: Props["apiOptions"],
    coefficient: Props["coefficient"],
    answerForms: Props["answerForms"],
    labelText: Props["labelText"],
    linterContext: Props["linterContext"],
    multipleNumberInput: Props["multipleNumberInput"],
|};

type State = {|
    // keeps track of the other set of values when switching
    // between 0 and finite solutions
    previousValues: $ReadOnlyArray<string>,
|};

export class NumericInput extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        currentValue: "",
        size: "normal",
        rightAlign: false,
        apiOptions: ApiOptions.defaults,
        coefficient: false,
        answerForms: [],
        labelText: "",
        linterContext: linterContextDefault,
        multipleNumberInput: false,
    };

    static getUserInputFromProps(props: Props): UserInput {
        return {
            currentValue: props.currentValue,
        };
    }

    static getOneCorrectAnswerFromRubric(
        rubric: Rubric,
    ): ?PerseusNumericInputAnswer {
        const correctAnswers = _.filter(
            rubric.answers,
            (answer) => answer.status === "correct",
        );
        const answerStrings = _.map(correctAnswers, (answer) => {
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

            let answerString = KhanMath.toNumericString(answer.value, format);
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
    }

    static validate(useInput: UserInput, rubric: Rubric): PerseusScore {
        const allAnswerForms = _.pluck(answerFormButtons, "value");

        const createValidator = (answer) =>
            KhanAnswerTypes.number.createValidatorFunctional(answer.value, {
                message: answer.message,
                simplify:
                    answer.status === "correct" ? answer.simplify : "optional",
                inexact: true, // TODO(merlob) backfill / delete
                maxError: answer.maxError,
                forms:
                    answer.strict &&
                    answer.answerForms &&
                    answer.answerForms.length !== 0
                        ? answer.answerForms
                        : allAnswerForms,
            });

        // We may have received TeX; try to parse it before grading.
        // If `currentValue` is not TeX, this should be a no-op.
        const currentValue = ParseTex(useInput.currentValue);
        const correctAnswers = _.where(rubric.answers, {status: "correct"});

        const normalizedAnswerExpected = correctAnswers.every(
            (answer) => Math.abs(answer.value) <= 1,
        );

        // Look through all correct answers for one that matches either
        // precisely or approximately and return the appropriate message:
        // - if precise, return the message that the answer came with
        // - if it needs to be simplified, etc., show that message
        let result = _.find(
            _.map(correctAnswers, (answer) => {
                // The coefficient is an attribute of the widget
                let localValue = currentValue;
                if (rubric.coefficient) {
                    if (!localValue) {
                        localValue = 1;
                    } else if (localValue === "-") {
                        localValue = -1;
                    }
                }
                const validate = createValidator(answer);
                return validate(
                    maybeParsePercentInput(
                        localValue,
                        normalizedAnswerExpected,
                    ),
                );
            }),
            (match) => match.correct || match.empty,
        );

        if (!result) {
            // Otherwise, if the guess is not correct
            const otherAnswers = [].concat(
                _.where(rubric.answers, {status: "ungraded"}),
                _.where(rubric.answers, {status: "wrong"}),
            );

            // Look through all other answers and if one matches either
            // precisely or approximately return the answer's message
            const match = _.find(otherAnswers, (answer) => {
                const validate = createValidator(answer);
                return validate(
                    maybeParsePercentInput(
                        currentValue,
                        normalizedAnswerExpected,
                    ),
                ).correct;
            });
            result = {
                empty: match ? match.status === "ungraded" : false,
                correct: match ? match.status === "correct" : false,
                message: match ? match.message : null,
                guess: currentValue,
            };
        }

        // TODO(eater): Seems silly to translate result to this
        // invalid/points thing and immediately translate it
        // back in ItemRenderer.scoreInput()
        if (result.empty) {
            return {
                type: "invalid",
                message: result.message,
            };
        }
        return {
            type: "points",
            earned: result.correct ? 1 : 0,
            total: 1,
            message: result.message,
        };
    }

    state: State = {
        // keeps track of the other set of values when switching
        // between 0 and finite solutions
        previousValues: [""],
    };

    getAnswerBlurb: (Rubric) => [?React.Node, boolean] = (rubric) => {
        let correct;
        let answerBlurb;

        /* Ignore this block because SAT is deprecated */
        /* istanbul ignore next */
        if (this.props.apiOptions.satStyling && rubric) {
            const score = this.simpleValidate(rubric);
            correct = score.type === "points" && score.earned === score.total;

            if (!correct) {
                const correctAnswers = _.filter(
                    rubric.answers,
                    (answer) => answer.status === "correct",
                );
                const answerStrings = _.map(correctAnswers, (answer) => {
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

                    let answerString = KhanMath.toNumericString(
                        answer.value,
                        format,
                    );
                    if (answer.maxError) {
                        answerString +=
                            " \u00B1 " +
                            KhanMath.toNumericString(answer.maxError, format);
                    }
                    return answerString;
                });
                answerBlurb = <PossibleAnswers answers={answerStrings} />;
            }
        }
        return [answerBlurb, !!correct];
    };

    // TODO(Nicole, Jeremy): This is maybe never used and should be removed
    examples: () => $ReadOnlyArray<string> = () => {
        // if the set of specified forms are empty, allow all forms
        const forms =
            this.props.answerForms?.length !== 0
                ? this.props.answerForms
                : _.map(_.keys(formExamples), (name) => {
                      return {
                          name: name,
                          simplify: "required",
                      };
                  });

        let examples = _.map(forms, (form) => {
            return formExamples[form.name](form);
        });
        // Ensure no duplicate tooltip text from simplified and unsimplified
        // versions of the same format
        examples = _.uniq(examples);

        return [i18n._("**Your answer should be** ")].concat(examples);
    };

    shouldShowExamples: () => boolean = () => {
        const noFormsAccepted = this.props.answerForms?.length === 0;
        // To check if all answer forms are accepted, we must first
        // find the *names* of all accepted forms, and see if they are
        // all present, ignoring duplicates
        const answerFormNames = _.uniq(
            this.props.answerForms?.map((form) => form.name),
        );
        const allFormsAccepted = answerFormNames.length >= _.size(formExamples);
        return !noFormsAccepted && !allFormsAccepted;
    };

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return NumericInput.validate(this.getUserInput(), rubric);
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
        return true;
    };

    focusInputPath: ($FlowFixMe) => void = (inputPath) => {
        /* istanbul ignore next */
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
    };

    blurInputPath: ($FlowFixMe) => void = (inputPath) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.blur();
    };

    getInputPaths: () => $ReadOnlyArray<$ReadOnlyArray<string>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* istanbul ignore next */
        return [[]];
    };

    getGrammarTypeForPath: ($FlowFixMe) => string = (inputPath) => {
        /* istanbul ignore next */
        return "number";
    };

    setInputValue: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => void = (
        path,
        newValue,
        cb,
    ) => {
        /* istanbul ignore next */
        this.props.onChange(
            {
                currentValue: newValue,
            },
            cb,
        );
    };

    getUserInput: () => UserInput = () => {
        return NumericInput.getUserInputFromProps(this.props);
    };

    handleChange: (string, $FlowFixMe) => void = (newValue, cb) => {
        this.props.onChange({currentValue: newValue}, cb);
        this.props.trackInteraction();
    };

    _getInputType: () => "tex" | "text" = () => {
        if (this.props.apiOptions.staticRender) {
            return "tex";
        }
        return "text";
    };

    _handleFocus: () => void = () => {
        this.props.onFocus([]);
        // HACK(kevinb): We want to dismiss the feedback popover that webapp
        // displays as soon as a user clicks in in the input field so we call
        // interactionCallback directly.
        const {interactionCallback} = this.props.apiOptions;
        if (interactionCallback) {
            interactionCallback();
        }
    };

    _handleBlur: () => void = () => {
        this.props.onBlur([]);
    };

    render(): React.Node {
        const rubric = this.props.reviewModeRubric;
        const answers = this.getAnswerBlurb(rubric);
        const answerBlurb = answers[0];
        const classes = [];

        let labelText = this.props.labelText;
        if (labelText == null || labelText === "") {
            labelText = i18n._("Your answer:");
        }

        // To right align a custom keypad we need to wrap it.
        const maybeRightAlignKeypadInput = (keypadInput) => {
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
                    // eslint-disable-next-line react/no-string-refs
                    ref="input"
                    value={this.props.currentValue}
                    keypadElement={this.props.keypadElement}
                    onChange={this.handleChange}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                />,
            );
        }

        const input = (
            <InputWithExamples
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                className={classNames(classes)}
                labelText={labelText}
                type={this._getInputType()}
                examples={this.examples()}
                shouldShowExamples={this.shouldShowExamples()}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                id={this.props.widgetId}
                disabled={this.props.apiOptions.readOnly}
                // $FlowFixMe[prop-missing]
                highlightLint={this.props.highlightLint}
            />
        );

        /* This only gets used with SAT Content */
        /* istanbul ignore next if */
        if (answerBlurb) {
            return (
                <span className="perseus-input-with-answer-blurb">
                    {input}
                    {answerBlurb}
                </span>
            );
        }
        if (this.props.apiOptions.satStyling) {
            // NOTE(amy): the input widgets themselves already have
            // a default aria label of "Your Answer", so we hide this
            // redundant label from screen-readers.
            return (
                <label className="perseus-input-with-label">
                    <span className="perseus-input-label" aria-hidden="true">
                        {i18n.doNotTranslate("Answer:")}
                    </span>
                    {input}
                </label>
            );
        }
        return <div>{input}</div>;
    }
}

// TODO(thomas): Currently we receive a list of lists of acceptable answer types
// and union them down into a single set. It's worth considering whether it
// wouldn't make more sense to have a single set of acceptable answer types for
// a given *problem* rather than for each possible [correct/wrong] *answer*.
// When should two answers to a problem take different answer types?
// See D27790 for more discussion.
export const unionAnswerForms: ($FlowFixMe) => $FlowFixMe = function (
    answerFormsList,
) {
    // Takes a list of lists of answer forms, and returns a list of the forms
    // in each of these lists in the same order that they're listed in the
    // `formExamples` forms from above.

    // uniqueBy takes a list of elements and a function which compares whether
    // two elements are equal, and returns a list of unique elements. This is
    // just a helper function here, but works generally.
    const uniqueBy = function (list, iteratee) {
        return _.reduce(
            list,
            (uniqueList, element) => {
                // For each element, decide whether it's already in the list of
                // unique items.
                const inList = _.find(uniqueList, iteratee.bind(null, element));
                if (inList) {
                    return uniqueList;
                }
                return uniqueList.concat([element]);
            },
            [],
        );
    };

    // Pull out all of the forms from the different lists.
    const allForms = _.flatten(answerFormsList);
    // Pull out the unique forms using uniqueBy.
    const uniqueForms = uniqueBy(allForms, _.isEqual);
    // Sort them by the order they appear in the `formExamples` list.
    return _.sortBy(uniqueForms, (form) => {
        return _.keys(formExamples).indexOf(form.name);
    });
};

type RenderProps = {|
    answerForms: $ReadOnlyArray<{|
        simplify: ?("required" | "correct" | "enforced"),
        name: "integer" | "decimal" | "proper" | "improper" | "mixed" | "pi",
    |}>,
    labelText: string,
    size: string,
    coefficient: boolean,
    rightAlign?: boolean,
    static: boolean,
|};

// This function checks if the user inputted a percent value, parsing
// it as a number (and maybe scaling) so that it can be graded.
// NOTE(michaelpolyak): Unlike `KhanAnswerTypes.number.percent()` which
// can accept several input forms with or without "%", the decision
// to parse based on the presence of "%" in the input, is so that we
// don't accidently scale the user typed value before grading, CP-930.
export const maybeParsePercentInput: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = (
    inputValue,
    normalizedAnswerExpected,
) => {
    // If the input value is not a string ending with "%", then there's
    // nothing more to do. The value will be graded as inputted by user.
    if (!(typeof inputValue === "string" && inputValue.endsWith("%"))) {
        return inputValue;
    }

    const value = parseFloat(inputValue.slice(0, -1));
    // If the input value stripped of the "%" cannot be parsed as a
    // number (the slice is not really necessary for parseFloat to work
    // if the string starts with a number) then return the original
    // input for grading.
    if (isNaN(value)) {
        return inputValue;
    }

    // Next, if all correct answers are in the range of |0,1| then we
    // scale the user typed value. We assume this is the correct thing
    // to do since the input value ends with "%".
    if (normalizedAnswerExpected) {
        return value / 100;
    }

    // Otherwise, we return input valuåe (number) stripped of the "%".
    return value;
};

const propsTransform = function (
    widgetOptions: PerseusNumericInputWidgetOptions,
): RenderProps {
    const rendererProps = _.extend(_.omit(widgetOptions, "answers"), {
        answerForms: unionAnswerForms(
            // Pull out the name of each form and whether that form has
            // required simplification.
            _.map(widgetOptions.answers, (answer) => {
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

export default ({
    name: "numeric-input",
    displayName: "Number text box",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: NumericInput,
    transform: propsTransform,
    isLintable: true,
}: WidgetExports<typeof NumericInput>);
