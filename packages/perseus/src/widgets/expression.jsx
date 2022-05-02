/* eslint-disable react/prop-types */
// @flow
import * as KAS from "@khanacademy/kas";
import {components, consts} from "@khanacademy/math-input";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import InlineIcon from "../components/inline-icon.jsx";
import InputWithExamples from "../components/input-with-examples.jsx";
import MathInput from "../components/math-input.jsx";
import Tooltip from "../components/tooltip.jsx";
import {linterContextDefault} from "../gorgon/proptypes.js";
import {iconExclamationSign} from "../icon-paths.js";
import {Errors as PerseusErrors, Log} from "../logging/log.js";
import * as Changeable from "../mixins/changeable.jsx";
import {ApiOptions, ClassNames as ApiClassNames} from "../perseus-api.jsx";
import KhanAnswerTypes from "../util/answer-types.js";

import type {PerseusExpressionWidgetOptions} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

const {KeypadInput} = components;
const {KeypadTypes} = consts;

type InputPath = $ReadOnlyArray<string>;

const ERROR_MESSAGE = i18n._("Sorry, I don't understand that!");

const insertBraces = (value) => {
    // HACK(alex): Make sure that all LaTeX super/subscripts are wrapped
    // in curly braces to avoid the mismatch between KAS and LaTeX sup/sub
    // parsing.
    //
    // What exactly is this mismatch? Due to its heritage of parsing plain
    // text math from <OldExpression />, KAS parses "x^12" as x^(12).
    // This is both generally what the user expects to happen, and is
    // consistent with other computer algebra systems. It is NOT
    // consistent with LaTeX however, where x^12 is equivalent to x^{1}2.
    //
    // Since the only LaTeX we parse comes from MathQuill, this wouldn't
    // be a problem if MathQuill just always gave us the latter version
    // (with explicit braces). However, instead it always gives the former.
    // This behavior is baked in pretty deep; my naive attempts at changing
    // it triggered all sorts of confusing errors. So instead we just make
    // sure to add in any missing braces before grading MathQuill input.
    //
    // TODO(alex): Properly hack MathQuill to always use explicit braces.
    return value.replace(/([_^])([^{])/g, "$1{$2}");
};

type Rubric = PerseusExpressionWidgetOptions;

type ExternalProps = WidgetProps<RenderProps, Rubric>;

export type Props = {|
    ...ExternalProps,
    apiOptions: $NonMaybeType<ExternalProps["apiOptions"]>,
    buttonSets: $NonMaybeType<ExternalProps["buttonSets"]>,
    functions: $NonMaybeType<ExternalProps["functions"]>,
    linterContext: $NonMaybeType<ExternalProps["linterContext"]>,
    onBlur: $NonMaybeType<ExternalProps["onBlur"]>,
    onFocus: $NonMaybeType<ExternalProps["onFocus"]>,
    times: $NonMaybeType<ExternalProps["times"]>,
    value: string,
|};

export type ExpressionState = {|
    showErrorTooltip: boolean,
    showErrorText: boolean,
|};

type DefaultProps = {|
    apiOptions: Props["apiOptions"],
    buttonSets: Props["buttonSets"],
    functions: Props["functions"],
    linterContext: Props["linterContext"],
    onBlur: Props["onBlur"],
    onFocus: Props["onFocus"],
    times: Props["times"],
    value: Props["value"],
|};

type OnInputErrorFunctionType = (any, any, any) => ?boolean;

// The new, MathQuill input expression widget
export class Expression extends React.Component<Props, ExpressionState> {
    //#region Previously a class extension
    /* Content creators input a list of answers which are matched from top to
     * bottom. The intent is that they can include spcific solutions which should
     * be graded as correct or incorrect (or ungraded!) first, then get more
     * general.
     *
     * We iterate through each answer, trying to match it with the user's input
     * using the following angorithm:
     * - Try to parse the user's input. If it doesn't parse then return "not
     *   graded".
     * - For each answer:
     *   ~ Try to validate the user's input against the answer. The answer is
     *     expected to parse.
     *   ~ If the user's input validates (the validator judges it "correct"), we've
     *     matched and can stop considering answers.
     * - If there were no matches or the matching answer is considered "ungraded",
     *   show the user an error. TODO(joel) - what error?
     * - Otherwise, pass through the resulting points and message.
     */
    static validate(
        userInput: string,
        rubric: Rubric,
        onInputError: OnInputErrorFunctionType = function () {},
    ): PerseusScore {
        const options = _.clone(rubric);
        _.extend(options, {
            decimal_separator: i18n.getDecimalSeparator(),
        });

        const createValidator = (answer) => {
            // We give options to KAS.parse here because it is parsing the
            // solution answer, not the student answer, and we don't want a
            // solution to work if the student is using a different language
            // (different from the content creation language, ie. English).
            const expression = KAS.parse(answer.value, rubric);
            // An answer may not be parsed if the expression was defined
            // incorrectly. For example if the answer is using a symbol defined
            // in the function variables list for the expression.
            if (!expression.parsed) {
                /* istanbul ignore next */
                Log.error(
                    "Unable to parse solution answer for expression",
                    PerseusErrors.InvalidInput,
                    {loggedMetadata: {rubric: JSON.stringify(rubric)}},
                );
                return null;
            }
            return KhanAnswerTypes.expression.createValidatorFunctional(
                expression.expr,
                _({}).extend(options, {
                    simplify: answer.simplify,
                    form: answer.form,
                }),
            );
        };

        // Find the first answer form that matches the user's input and that
        // is considered correct. Also, track whether the input is
        // considered "empty" for all answer forms, and keep the validation
        // result for the first answer form for which the user's input was
        // considered "ungraded".
        // (Terminology reminder: the answer forms are provided by the
        // assessment items; they are not the user's input. Each one might
        // represent a correct answer, an incorrect one (if the exercise
        // creator has predicted certain common wrong answers and wants to
        // provide guidance via a message), or an ungraded one (same idea,
        // but without giving the user an incorrect mark for the question).
        let matchingAnswerForm;
        let matchMessage;
        let allEmpty = true;
        let firstUngradedResult;
        for (const answerForm of rubric.answerForms || []) {
            const validate = createValidator(answerForm);
            if (!validate) {
                continue;
            }

            const result = validate(userInput);

            // Short-circuit as soon as the user's input matches some answer
            // (independently of whether the answer is correct)
            if (result.correct) {
                matchingAnswerForm = answerForm;
                matchMessage = result.message || "";
                break;
            }

            allEmpty = allEmpty && result.empty;
            // If this answer form is correct and the user's input is considered
            // "ungraded" for it, we'll want to keep the evaluation result for
            // later. If the user's input doesn't match any answer forms, we'll
            // show the message from this validation.
            if (
                answerForm.considered === "correct" &&
                result.ungraded &&
                !firstUngradedResult
            ) {
                firstUngradedResult = result;
            }
        }

        // Now check to see if we matched any answer form at all, and if
        // we did, whether it's considered correct, incorrect, or ungraded
        if (!matchingAnswerForm) {
            if (firstUngradedResult) {
                // While we didn't directly match with any answer form, we
                // did at some point get an "ungraded" validation result,
                // which might indicate e.g. a mismatch in variable casing.
                // We'll return "invalid", which will let the user try again
                // with no penalty, and the hopefully helpful validation
                // message.
                return {
                    type: "invalid",
                    message: firstUngradedResult.message,
                    suppressAlmostThere:
                        firstUngradedResult.suppressAlmostThere,
                };
            }
            if (allEmpty) {
                // If everything graded as empty, it's invalid.
                return {
                    type: "invalid",
                    message: null,
                };
            }
            // We fell through all the possibilities and we're not empty,
            // so the answer is considered incorrect.
            return {
                type: "points",
                earned: 0,
                total: 1,
            };
        }
        if (matchingAnswerForm.considered === "ungraded") {
            // We matched an ungraded answer form - return "invalid", which
            // will let the user try again with no penalty
            const apiResult = onInputError(
                null, // Reserved for some widget identifier
                userInput,
                matchMessage,
            );
            return {
                type: "invalid",
                message: apiResult === false ? null : matchMessage,
            };
        }
        // We matched a graded answer form, so we can now tell the user
        // whether their input was correct or incorrect, and hand out
        // points accordingly
        // TODO(eater): Seems silly to translate result to this
        // invalid/points thing and immediately translate it back in
        // ItemRenderer.scoreInput()
        return {
            type: "points",
            earned: matchingAnswerForm.considered === "correct" ? 1 : 0,
            total: 1,
            message: matchMessage,
        };
    }

    static getUserInputFromProps(props: Props): string {
        return insertBraces(props.value);
    }

    static getOneCorrectAnswerFromRubric(rubric: Rubric): ?string {
        const correctAnswers = (rubric.answerForms || []).filter(
            (answerForm) => answerForm.considered === "correct",
        );
        if (correctAnswers.length === 0) {
            return;
        }
        return correctAnswers[0].value;
    }
    //#endregion

    static defaultProps: DefaultProps = {
        value: "",
        times: false,
        functions: [],
        buttonSets: ["basic", "trig", "prealgebra", "logarithms"],
        onFocus: () => {},
        onBlur: () => {},
        apiOptions: ApiOptions.defaults,
        linterContext: linterContextDefault,
    };

    displayName: string = "Expression";

    state: ExpressionState = {
        showErrorTooltip: false,
        showErrorText: false,
    };

    componentDidMount: () => void = () => {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;
    };

    // Whenever the input value changes, attempt to parse it.
    //
    // Clear any errors if this parse succeeds, show an error within a second
    // if it fails.
    componentDidUpdate: (prevProps: Props) => void = (prevProps) => {
        if (
            !_.isEqual(this.props.value, prevProps.value) ||
            !_.isEqual(this.props.functions, prevProps.functions)
        ) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            clearTimeout(this.errorTimeout);

            if (this.parse(this.props.value, this.props).parsed) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({showErrorTooltip: false});
            } else {
                // Store timeout ID so that we can clear it above
                // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                // eslint-disable-next-line no-restricted-syntax
                this.errorTimeout = setTimeout(() => {
                    const apiResult = this.props.apiOptions.onInputError(
                        null, // reserved for some widget identifier
                        this.props.value,
                        ERROR_MESSAGE,
                    );
                    if (apiResult !== false) {
                        this.setState({showErrorTooltip: true});
                    }
                }, 2000);
            }
        }
    };

    componentWillUnmount: () => void = () => {
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // eslint-disable-next-line no-restricted-syntax
        clearTimeout(this.errorTimeout);

        this._isMounted = false;
    };

    _isMounted: boolean = false;
    errorTimeout: null | TimeoutID = null;

    simpleValidate: (
        rubric: Rubric,
        onInputError: OnInputErrorFunctionType,
    ) => PerseusScore = (rubric, onInputError) => {
        onInputError = onInputError || function () {};
        return Expression.validate(this.getUserInput(), rubric, onInputError);
    };

    getUserInput: () => string = () => {
        return Expression.getUserInputFromProps(this.props);
    };

    change: (...args: any) => any | void = (...args: any) => {
        return Changeable.change.apply(this, args);
    };

    parse: (value: string, props: Props) => any = (
        value: string,
        props: Props,
    ) => {
        // TODO(jack): Disable icu for content creators here, or
        // make it so that solution answers with ','s or '.'s work
        const options = _.pick(props || this.props, "functions");
        _.extend(options, {
            decimal_separator: i18n.getDecimalSeparator(),
        });
        return KAS.parse(insertBraces(value), options);
    };

    changeAndTrack: (e: any, cb: () => void) => void = (
        e: any,
        cb: () => void,
    ) => {
        this.change("value", e, cb);
        this.props.trackInteraction();
    };

    _handleFocus: () => void = () => {
        /* istanbul ignore next */
        this.props.onFocus([]);
    };

    _handleBlur: () => void = () => {
        /* istanbul ignore next */
        this.props.onBlur([]);
    };

    focus: () => boolean = () => {
        if (this.props.apiOptions.customKeypad) {
            // eslint-disable-next-line react/no-string-refs
            this.refs.input.focus();
        } else {
            // The buttons are often on top of text you're trying to read, so
            // don't focus the editor automatically.
        }

        return true;
    };

    focusInputPath: (inputPath: InputPath) => void = (inputPath: InputPath) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
    };

    blurInputPath: (inputPath: InputPath) => void = (inputPath: InputPath) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.blur();
    };

    // HACK(joel)
    insert: (text: string) => void = (text: string) => {
        if (!this.props.apiOptions.staticRender) {
            // eslint-disable-next-line react/no-string-refs
            this.refs.input.insert(text);
        }
    };

    getInputPaths: () => $ReadOnlyArray<$ReadOnlyArray<any>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* istanbul ignore next */
        return [[]];
    };

    // TODO(Nicole): I believe this is going away and won't be needed anymore
    getGrammarTypeForPath: (inputPath: string) => string = (
        inputPath: string,
    ) => {
        /* istanbul ignore next */
        return "expression";
    };

    setInputValue: (path: string, newValue: string, cb: () => void) => void = (
        path: string,
        newValue: string,
        cb: () => void,
    ) => {
        this.props.onChange(
            {
                value: newValue,
            },
            cb,
        );
    };

    render(): React.Node | React.Element<"div"> {
        if (this.props.apiOptions.customKeypad) {
            return (
                <KeypadInput
                    // eslint-disable-next-line react/no-string-refs
                    ref="input"
                    value={this.props.value}
                    keypadElement={this.props.keypadElement}
                    onChange={this.changeAndTrack}
                    onFocus={() => {
                        // this.props.keypadElement should always be set
                        // when apiOptions.customKeypad is set, but how
                        // to convince Flow of this?
                        this.props.keypadElement?.configure(
                            this.props.keypadConfiguration,
                            () => {
                                if (this._isMounted) {
                                    this._handleFocus();
                                }
                            },
                        );
                    }}
                    onBlur={this._handleBlur}
                />
            );
        }
        if (this.props.apiOptions.staticRender) {
            // To make things slightly easier, we just use an InputWithExamples
            // component to handle the static rendering, which is the same
            // component used by InputNumber and NumericInput
            return (
                <InputWithExamples
                    // eslint-disable-next-line react/no-string-refs
                    ref="input"
                    value={this.props.value}
                    type="tex"
                    examples={[]}
                    shouldShowExamples={false}
                    onChange={this.changeAndTrack}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    id={this.props.widgetId}
                    linterContext={this.props.linterContext}
                />
            );
        }
        // TODO(alex): Style this tooltip to be more consistent with other
        // tooltips on the site; align to left middle (once possible)
        const errorTooltip = (
            <span className="error-tooltip" role="tooltip">
                <Tooltip
                    className="error-text-container"
                    horizontalPosition="right"
                    horizontalAlign="left"
                    verticalPosition="top"
                    arrowSize={10}
                    borderColor="#fcc335"
                    show={this.state.showErrorText}
                >
                    <span
                        className="error-icon"
                        data-test-id="test-error-icon"
                        onMouseEnter={() => {
                            this.setState({showErrorText: true});
                        }}
                        onMouseLeave={() => {
                            this.setState({showErrorText: false});
                        }}
                        onClick={() => {
                            // TODO(alex): Better error feedback for mobile
                            this.setState({
                                showErrorText: !this.state.showErrorText,
                            });
                        }}
                    >
                        <InlineIcon {...iconExclamationSign} />
                    </span>
                    <div className="error-text">{ERROR_MESSAGE}</div>
                </Tooltip>
            </span>
        );

        const className = classNames({
            "perseus-widget-expression": true,
            "show-error-tooltip": this.state.showErrorTooltip,
        });

        return (
            <div className={className}>
                <MathInput
                    // eslint-disable-next-line react/no-string-refs
                    ref="input"
                    className={ApiClassNames.INTERACTIVE}
                    value={this.props.value}
                    onChange={this.changeAndTrack}
                    convertDotToTimes={this.props.times}
                    buttonsVisible={this.props.buttonsVisible || "focused"}
                    buttonSets={this.props.buttonSets}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                />
                {this.state.showErrorTooltip && errorTooltip}
            </div>
        );
    }
}

/**
 * Determine the keypad configuration parameters for the input, based on the
 * provided properties.
 *
 * There are two configuration parameters to be passed to the keypad:
 *   (1) The keypad type. For the Expression widget, we always use the
 *       Expression keypad.
 *   (2) The extra keys; namely, any variables or constants (like Pi) that need
 *       to be included as keys on the keypad. These are scraped from the answer
 *       forms.
 */
const keypadConfigurationForProps = (
    widgetOptions: PerseusExpressionWidgetOptions,
) => {
    // Always use the Expression keypad, regardless of the button sets that have
    // been enabled.
    const keypadType = KeypadTypes.EXPRESSION;

    // Extract any and all variables and constants from the answer forms.
    const uniqueExtraVariables = {};
    const uniqueExtraConstants = {};
    for (const answerForm of widgetOptions.answerForms) {
        const maybeExpr = KAS.parse(answerForm.value, widgetOptions);
        if (maybeExpr.parsed) {
            const expr = maybeExpr.expr;

            // The keypad expects Greek letters to be capitalized (e.g., it
            // requires `PI` instead of `pi`). Right now, it only supports Pi
            // and Theta, so we special-case.
            const isGreek = (symbol) => symbol === "pi" || symbol === "theta";
            const toKey = (symbol) =>
                isGreek(symbol) ? symbol.toUpperCase() : symbol;

            for (const variable of expr.getVars()) {
                uniqueExtraVariables[toKey(variable)] = true;
            }
            for (const constant of expr.getConsts()) {
                uniqueExtraConstants[toKey(constant)] = true;
            }
        }
    }

    // TODO(charlie): Alert the keypad as to which of these symbols should be
    // treated as functions.
    const extraVariables = Object.keys(uniqueExtraVariables);
    extraVariables.sort();

    const extraConstants = Object.keys(uniqueExtraConstants);
    extraConstants.sort();

    const extraKeys = [...extraVariables, ...extraConstants];
    if (!extraKeys.length) {
        // If there are no extra symbols available, we include Pi anyway, so
        // that the "extra symbols" button doesn't appear empty.
        extraKeys.push("PI");
    }

    return {keypadType, extraKeys};
};

const propUpgrades = {
    /* istanbul ignore next */
    "1": (v0props: $FlowFixMe): PerseusExpressionWidgetOptions => ({
        times: v0props.times,
        buttonSets: v0props.buttonSets,
        functions: v0props.functions,
        buttonsVisible: v0props.buttonsVisible,

        answerForms: [
            {
                considered: "correct",
                form: v0props.form,
                simplify: v0props.simplify,
                value: v0props.value,
            },
        ],
    }),
};

type RenderProps = {|
    buttonSets: $FlowFixMe,
    buttonsVisible?: "always" | "focused" | "never",
    functions: $ReadOnlyArray<string>,
    keypadConfiguration: {|
        extraKeys: $ReadOnlyArray<any | string>,
        keypadType: $FlowFixMe,
    |},
    times: boolean,
|};

export default ({
    name: "expression",
    displayName: "Expression / Equation",
    defaultAlignment: "inline-block",
    widget: Expression,
    transform: (widgetOptions: PerseusExpressionWidgetOptions): RenderProps => {
        const {times, functions, buttonSets, buttonsVisible} = widgetOptions;
        return {
            keypadConfiguration: keypadConfigurationForProps(widgetOptions),
            times,
            functions,
            buttonSets,
            buttonsVisible,
        };
    },
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,

    // For use by the editor
    isLintable: true,
}: WidgetExports<typeof Expression>);
