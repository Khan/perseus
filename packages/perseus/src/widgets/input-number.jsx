/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
// @flow
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import InputWithExamples from "../components/input-with-examples.jsx";
import PossibleAnswers from "../components/possible-answers.jsx";
import SimpleKeypadInput from "../components/simple-keypad-input.jsx";
import {ClassNames as ApiClassNames, ApiOptions} from "../perseus-api.jsx";
import TexWrangler from "../tex-wrangler.js";
import KhanAnswerTypes from "../util/answer-types.js";

import type {PerseusInputNumberWidgetOptions} from "../perseus-types.js";
import type {
    APIOptions,
    Path,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types.js";

const ParseTex = TexWrangler.parseTex;

const answerTypes = {
    number: {
        name: "Numbers",
        forms: "integer, decimal, proper, improper, mixed",
    },
    decimal: {
        name: "Decimals",
        forms: "decimal",
    },
    integer: {
        name: "Integers",
        forms: "integer",
    },
    rational: {
        name: "Fractions and mixed numbers",
        forms: "integer, proper, improper, mixed",
    },
    improper: {
        name: "Improper numbers (no mixed)",
        forms: "integer, proper, improper",
    },
    mixed: {
        name: "Mixed numbers (no improper)",
        forms: "integer, proper, mixed",
    },
    percent: {
        name: "Numbers or percents",
        forms: "integer, decimal, proper, improper, mixed, percent",
    },
    pi: {
        name: "Numbers with pi",
        forms: "pi",
    },
};

const formExamples = {
    integer: function (options) {
        return i18n._("an integer, like $6$");
    },
    proper: function (options) {
        if (options.simplify === "optional") {
            return i18n._("a *proper* fraction, like $1/2$ or $6/10$");
        }
        return i18n._("a *simplified proper* fraction, like $3/5$");
    },
    improper: function (options) {
        if (options.simplify === "optional") {
            return i18n._("an *improper* fraction, like $10/7$ or $14/8$");
        }
        return i18n._("a *simplified improper* fraction, like $7/4$");
    },
    mixed: function (options) {
        return i18n._("a mixed number, like $1\\ 3/4$");
    },
    decimal: function (options) {
        return i18n._("an *exact* decimal, like $0.75$");
    },
    percent: function (options) {
        return i18n._("a percent, like $12.34\\%$");
    },
    pi: function (options) {
        return i18n._(
            "a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$",
        );
    },
};

type UserInput = {|currentValue: string|};
type RenderProps = {|
    simplify: PerseusInputNumberWidgetOptions["simplify"],
    size: PerseusInputNumberWidgetOptions["size"],
    answerType: PerseusInputNumberWidgetOptions["answerType"],
    rightAlign: PerseusInputNumberWidgetOptions["rightAlign"],
|};
type Rubric = PerseusInputNumberWidgetOptions;
type ExternalProps = WidgetProps<RenderProps, Rubric>;
type Props = {|
    ...ExternalProps,
    apiOptions: $NonMaybeType<ExternalProps["apiOptions"]>,
    linterContext: $NonMaybeType<ExternalProps["linterContext"]>,
    rightAlign: $NonMaybeType<ExternalProps["rightAlign"]>,
    size: $NonMaybeType<ExternalProps["size"]>,
    currentValue: string,
    // NOTE(kevinb): This was the only default prop that is listed as
    // not-required in PerseusInputNumberWidgetOptions.
    answerType: $NonMaybeType<Rubric["answerType"]>,
|};

type DefaultProps = {|
    answerType: Props["answerType"],
    apiOptions: Props["apiOptions"],
    currentValue: Props["currentValue"],
    linterContext: Props["linterContext"],
    rightAlign: Props["rightAlign"],
    size: Props["size"],
|};

class InputNumber extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        currentValue: "",
        size: "normal",
        answerType: "number",
        rightAlign: false,
        // NOTE(kevinb): renderer.jsx should be provide this so we probably don't
        // need to include it in defaultProps.
        apiOptions: ApiOptions.defaults,
        linterContext: linterContextDefault,
    };

    shouldShowExamples: () => boolean = () => {
        return (
            this.props.answerType !== "number" &&
            !this.props.apiOptions.staticRender
        );
    };

    render(): React.Node {
        if (this.props.apiOptions.customKeypad) {
            // TODO(charlie): Support "Review Mode".
            const input = (
                <SimpleKeypadInput
                    // eslint-disable-next-line react/no-string-refs
                    ref="input"
                    value={this.props.currentValue}
                    keypadElement={this.props.keypadElement}
                    onChange={this.handleChange}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                />
            );

            if (this.props.rightAlign) {
                return <div className="perseus-input-right-align">{input}</div>;
            }

            return input;
        }
        // HACK(johnsullivan): Create a function with shared logic between
        // this and NumericInput.
        const rubric = this.props.reviewModeRubric;
        let correct = null;
        let answerBlurb = null;

        // SAT is deprecated and not testable
        /* istanbul ignore if */
        if (this.props.apiOptions.satStyling && rubric) {
            const score = this.simpleValidate(rubric);
            correct = score.type === "points" && score.earned === score.total;

            if (!correct) {
                // TODO(johnsullivan): Make this a little more
                // human-friendly.
                let answerString = String(rubric.value);
                if (rubric.inexact && rubric.maxError) {
                    answerString += " \u00B1 " + rubric.maxError;
                }
                const answerStrings = [answerString];
                answerBlurb = <PossibleAnswers answers={answerStrings} />;
            }
        }

        const classes = {};
        classes["perseus-input-size-" + this.props.size] = true;
        classes["perseus-input-right-align"] = this.props.rightAlign;
        classes[ApiClassNames.CORRECT] =
            rubric && correct && this.props.currentValue;
        classes[ApiClassNames.INCORRECT] =
            rubric && !correct && this.props.currentValue;
        classes[ApiClassNames.UNANSWERED] = rubric && !this.props.currentValue;

        const input = (
            <InputWithExamples
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                className={classNames(classes)}
                type={this._getInputType()}
                examples={this.examples()}
                shouldShowExamples={this.shouldShowExamples()}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                id={this.props.widgetId}
                disabled={this.props.apiOptions.readOnly}
                linterContext={this.props.linterContext}
            />
        );

        // SAT is deprecated, answer blurb is an SAT feature
        /* istanbul ignore if */
        if (answerBlurb) {
            return (
                <span className="perseus-input-with-answer-blurb">
                    {input}
                    {answerBlurb}
                </span>
            );
        }
        return input;
    }

    handleChange: (string, () => void) => void = (newValue, cb) => {
        this.props.onChange({currentValue: newValue}, cb);
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

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
        return true;
    };

    focusInputPath: (Path) => void = (inputPath) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
    };

    blurInputPath: (Path) => void = (inputPath) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.blur();
    };

    getInputPaths: () => $ReadOnlyArray<Path> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* istanbul ignore next */
        return [[]];
    };

    // Note: We believe that this isn't used anywhere but are leaving it during
    // the initial refactor
    getGrammarTypeForPath: (Path) => string = (path) => {
        /* istanbul ignore next */
        return "number";
    };

    setInputValue: (Path, string, () => void) => void = (
        path,
        newValue,
        cb,
    ) => {
        this.props.onChange(
            {
                currentValue: newValue,
            },
            cb,
        );
    };

    getUserInput: () => UserInput = () => {
        return InputNumber.getUserInputFromProps(this.props);
    };

    simpleValidate: (
        rubric: Rubric,
        onInputError?: APIOptions["onInputError"],
    ) => PerseusScore = (rubric, onInputError) => {
        onInputError = onInputError || function () {};
        return InputNumber.validate(this.getUserInput(), rubric, onInputError);
    };

    examples: () => $ReadOnlyArray<string> = () => {
        const type = this.props.answerType;
        const forms = answerTypes[type].forms.split(/\s*,\s*/);

        const examples = _.map(
            forms,
            function (form) {
                // eslint-disable-next-line @babel/no-invalid-this
                return formExamples[form](this.props);
            },
            this,
        );

        return [i18n._("**Your answer should be** ")].concat(examples);
    };

    static validate(
        state: {|currentValue: string|},
        rubric: Rubric,
        onInputError: APIOptions["onInputError"] = () => {},
    ): PerseusScore {
        if (rubric.answerType == null) {
            rubric.answerType = "number";
        }
        const val = KhanAnswerTypes.number.createValidatorFunctional(
            rubric.value,
            {
                simplify: rubric.simplify,
                inexact: rubric.inexact || undefined,
                maxError: rubric.maxError,
                forms: answerTypes[rubric.answerType].forms,
            },
        );

        // We may have received TeX; try to parse it before grading.
        // If `currentValue` is not TeX, this should be a no-op.
        const currentValue = ParseTex(state.currentValue);

        const result = val(currentValue);

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            // TODO(FEI-3867): remove null-check once we have APIOptionsInternal
            const apiResult = onInputError?.(
                null, // reserved for some widget identifier
                state.currentValue,
                result.message,
            );
            return {
                type: "invalid",
                message: apiResult === false ? null : result.message,
            };
        }
        return {
            type: "points",
            earned: result.correct ? 1 : 0,
            total: 1,
            message: result.message,
        };
    }

    static getUserInputFromProps(props: Props): {|currentValue: string|} {
        return {
            currentValue: props.currentValue,
        };
    }

    static getOneCorrectAnswerFromRubric(rubric: $FlowFixMe): ?string {
        if (rubric.value == null) {
            return;
        }
        let answerString = String(rubric.value);
        if (rubric.inexact && rubric.maxError) {
            answerString += " \u00B1 " + rubric.maxError;
        }
        return answerString;
    }
}

const propTransform = (
    widgetOptions: PerseusInputNumberWidgetOptions,
): RenderProps => {
    const {simplify, size, answerType, rightAlign} = widgetOptions;
    return {
        simplify,
        size,
        answerType,
        rightAlign,
    };
};

export default ({
    name: "input-number",
    displayName: "Number text box (old)",
    defaultAlignment: "inline-block",
    hidden: true,
    widget: InputNumber,
    transform: propTransform,
    isLintable: true,
}: WidgetExports<typeof InputNumber>);
