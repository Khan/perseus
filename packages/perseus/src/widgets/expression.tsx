import * as KAS from "@khanacademy/kas";
import {KeyArray, KeypadInput, KeypadType} from "@khanacademy/math-input";
import {Errors} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {View} from "@khanacademy/wonder-blocks-core";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {css, StyleSheet} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import MathInput from "../components/math-input";
import {useDependencies} from "../dependencies";
import {Log} from "../logging/log";
import * as Changeable from "../mixins/changeable";
import {ApiOptions, ClassNames as ApiClassNames} from "../perseus-api";
import a11y from "../util/a11y";
import KhanAnswerTypes from "../util/answer-types";

import type {DependenciesContext} from "../dependencies";
import type {
    PerseusExpressionWidgetOptions,
    PerseusExpressionAnswerForm,
} from "../perseus-types";
import type {PerseusStrings} from "../strings";
import type {
    APIOptions,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types";
import type {Keys as Key, KeypadConfiguration} from "@khanacademy/math-input";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type InputPath = ReadonlyArray<string>;

// Map of international operator names to their English equivalents
const englishOperators = {
    arctg: "arctan",
    cosec: "csc",
    cossec: "csc",
    cotg: "cot",
    ctg: "cot",
    sen: "sin",
    tg: "tan",
};

const anglicizeOperators = (tex: string): string => {
    // sen is used instead of sin in some languages, e.g. Portuguese.
    // To ensure that answers in various languages are graded correctly, we
    // convert operators to their Englishy forms.
    return tex.replace(
        /\\operatorname{([a-z]+)}/g,
        (_, op) => `\\${englishOperators[op] ?? op} `,
    );
};

const normalizeTex = (tex: string): string => {
    return anglicizeOperators(tex);
};

const deriveKeypadVersion = (apiOptions: APIOptions) => {
    // We can derive which version of the keypad is in use. This is
    // a bit tricky, but this code will be relatively short-lived
    // as we coalesce onto the new, v2 Keypad, at which point we
    // can remove this `virtualKeypadVersion` field entirely.
    return apiOptions.nativeKeypadProxy != null
        ? "REACT_NATIVE_KEYPAD"
        : "MATH_INPUT_KEYPAD_V2";
};

type Rubric = PerseusExpressionWidgetOptions;

type RenderProps = {
    buttonSets: PerseusExpressionWidgetOptions["buttonSets"];
    buttonsVisible?: PerseusExpressionWidgetOptions["buttonsVisible"];
    functions: PerseusExpressionWidgetOptions["functions"];
    times: PerseusExpressionWidgetOptions["times"];
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    keypadConfiguration: ReturnType<typeof keypadConfigurationForProps>;
};

type ExternalProps = WidgetProps<RenderProps, Rubric>;

export type Props = ExternalProps &
    Partial<React.ContextType<typeof DependenciesContext>> & {
        apiOptions: NonNullable<ExternalProps["apiOptions"]>;
        buttonSets: NonNullable<ExternalProps["buttonSets"]>;
        functions: NonNullable<ExternalProps["functions"]>;
        linterContext: NonNullable<ExternalProps["linterContext"]>;
        onBlur: NonNullable<ExternalProps["onBlur"]>;
        onFocus: NonNullable<ExternalProps["onFocus"]>;
        times: NonNullable<ExternalProps["times"]>;
        visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
        ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
        value: string;
    };

export type ExpressionState = {
    invalid: boolean;
    showErrorTooltip: boolean;
    showErrorStyle: boolean;
};

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    buttonSets: Props["buttonSets"];
    functions: Props["functions"];
    linterContext: Props["linterContext"];
    onBlur: Props["onBlur"];
    onFocus: Props["onFocus"];
    times: Props["times"];
    value: Props["value"];
};

type OnInputErrorFunctionType = (
    arg1?: any,
    arg2?: any,
    arg3?: any,
) => boolean | null | undefined;

/**
 *  Get the character used for separating decimals.
 */
export const getDecimalSeparator = (locale: string): string => {
    switch (locale) {
        // TODO(somewhatabstract): Remove this when Chrome supports the `ka`
        // locale properly.
        // https://github.com/formatjs/formatjs/issues/1526#issuecomment-559891201
        //
        // Supported locales in Chrome:
        // https://source.chromium.org/chromium/chromium/src/+/master:third_party/icu/scripts/chrome_ui_languages.list
        case "ka":
            return ",";

        default:
            const numberWithDecimalSeparator = 1.1;
            // TODO(FEI-3647): Update to use .formatToParts() once we no longer have to
            // support Safari 12.
            const match = new Intl.NumberFormat(locale)
                .format(numberWithDecimalSeparator)
                // 0x661 is ARABIC-INDIC DIGIT ONE
                // 0x6F1 is EXTENDED ARABIC-INDIC DIGIT ONE
                .match(/[^\d\u0661\u06F1]/);
            return match?.[0] ?? ".";
    }
};

// The new, MathQuill input expression widget
export class Expression extends React.Component<Props, ExpressionState> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    _textareaId = `expression_textarea_${Date.now()}`;
    _isMounted = false;

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
        // @ts-expect-error - TS2322 - Type '() => void' is not assignable to type 'OnInputErrorFunctionType'.
        onInputError: OnInputErrorFunctionType = function () {},
        strings: PerseusStrings,
        locale: string,
    ): PerseusScore {
        const options = _.clone(rubric);
        _.extend(options, {
            decimal_separator: getDecimalSeparator(locale),
        });

        const createValidator = (answer: PerseusExpressionAnswerForm) => {
            // We give options to KAS.parse here because it is parsing the
            // solution answer, not the student answer, and we don't want a
            // solution to work if the student is using a different language
            // (different from the content creation language, ie. English).
            const expression = KAS.parse(answer.value, rubric);
            // An answer may not be parsed if the expression was defined
            // incorrectly. For example if the answer is using a symbol defined
            // in the function variables list for the expression.
            if (!expression.parsed) {
                /* c8 ignore next */
                Log.error(
                    "Unable to parse solution answer for expression",
                    Errors.InvalidInput,
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
                strings,
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
        return normalizeTex(props.value);
    }

    static getOneCorrectAnswerFromRubric(
        rubric: Rubric,
    ): string | null | undefined {
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

    displayName = "Expression";

    state: ExpressionState = {
        invalid: false,
        showErrorTooltip: false,
        showErrorStyle: false,
    };

    componentDidMount: () => void = () => {
        document.addEventListener("mousedown", this._handleMouseDown);

        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        // HACK: imperatively add an ID onto the Mathquill input
        // (which in mobile is a span; desktop a textarea)
        // in order to associate a visual label with it
        if (this.refs.input) {
            const isMobile = this.props.apiOptions.customKeypad;
            const container = ReactDOM.findDOMNode(this.refs.input);
            const selector = isMobile ? ".mq-textarea > span" : "textarea";
            const inputElement = (container as Element).querySelector(selector);
            inputElement?.setAttribute("id", this._textareaId);
        }
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
            this.setState({
                invalid: false,
                showErrorTooltip: false,
                showErrorStyle: false,
            });
            if (!this.parse(this.props.value, this.props).parsed) {
                const apiResult = this.props.apiOptions.onInputError(
                    null, // reserved for some widget identifier
                    this.props.value,
                    this.context.strings.ERROR_TITLE,
                );
                if (apiResult !== false) {
                    this.setState({
                        invalid: true,
                    });
                }
            }
        }
    };

    componentWillUnmount: () => void = () => {
        this._isMounted = false;
    };

    _handleMouseDown = () => {
        if (this._isMounted && this.state.showErrorTooltip) {
            this.setState({
                showErrorTooltip: false,
            });
        }
    };

    simpleValidate: (
        rubric: Rubric & {scoring?: boolean},
        onInputError: OnInputErrorFunctionType,
    ) => PerseusScore = ({scoring, ...rubric}, onInputError) => {
        const score = Expression.validate(
            this.getUserInput(),
            rubric,
            onInputError || function () {},
            this.context.strings,
            this.context.locale,
        );

        // "scoring" is a flag that indicates when we are checking answers.
        // otherwise, we may just be checking validity after changes.
        if (scoring && score.type !== "invalid") {
            this.props.analytics?.onAnalyticsEvent({
                type: "perseus:expression-evaluated",
                payload: {
                    result:
                        score.earned === score.total ? "correct" : "incorrect",
                    virtualKeypadVersion: deriveKeypadVersion(
                        this.props.apiOptions,
                    ),
                },
            });
        }

        return score;
    };

    getUserInput: () => string = () => {
        return Expression.getUserInputFromProps(this.props);
    };

    change: (...args: any) => any | undefined = (...args: any) => {
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
            decimal_separator: getDecimalSeparator(this.context.locale),
        });
        return KAS.parse(normalizeTex(value), options);
    };

    changeAndTrack: (e: any, cb: () => void) => void = (
        e: any,
        cb: () => void,
    ) => {
        this.change("value", e, cb);
        this.props.trackInteraction();
    };

    _handleFocus: () => void = () => {
        this.props.analytics?.onAnalyticsEvent({
            type: "perseus:expression-focused",
            payload: null,
        });

        /* c8 ignore next */
        this.props.onFocus([]);
    };

    _handleBlur: () => void = () => {
        /* c8 ignore next */
        this.props.onBlur([]);
    };

    focus: () => boolean = () => {
        if (this.props.apiOptions.customKeypad) {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
            this.refs.input.focus();
        } else {
            // The buttons are often on top of text you're trying to read, so
            // don't focus the editor automatically.
        }

        return true;
    };

    focusInputPath: (inputPath: InputPath) => void = (inputPath: InputPath) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
    };

    blurInputPath: (inputPath: InputPath) => void = (inputPath: InputPath) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        if (typeof this.refs.input?.blur === "function") {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
            this.refs.input?.blur();
        }
    };

    // HACK(joel)
    insert(keyPressed: Key) {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'insert' does not exist on type 'ReactInstance'.
        this.refs.input.insert(keyPressed);
    }

    getInputPaths: () => ReadonlyArray<ReadonlyArray<any>> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* c8 ignore next */
        return [[]];
    };

    // TODO(Nicole): I believe this is going away and won't be needed anymore
    getGrammarTypeForPath: (inputPath: string) => string = (
        inputPath: string,
    ) => {
        /* c8 ignore next */
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

    render() {
        if (this.props.apiOptions.customKeypad) {
            return (
                <View className={css(styles.mobileLabelInputWrapper)}>
                    {!!this.props.visibleLabel && (
                        <LabelSmall htmlFor={this._textareaId} tag="label">
                            {this.props.visibleLabel}
                        </LabelSmall>
                    )}
                    <KeypadInput
                        // eslint-disable-next-line react/no-string-refs
                        ref="input"
                        ariaLabel={
                            this.props.ariaLabel ||
                            this.context.strings.mathInputBox
                        }
                        value={this.props.value}
                        keypadElement={this.props.keypadElement}
                        onChange={this.changeAndTrack}
                        onFocus={() => {
                            // this.props.keypadElement should always be set
                            // when apiOptions.customKeypad is set, but how
                            // to convince TypeScript of this?
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
                </View>
            );
        }

        const className = classNames({
            "perseus-widget-expression": true,
            "show-error-tooltip": this.state.showErrorTooltip,
        });

        const {ERROR_MESSAGE, ERROR_TITLE} = this.context.strings;

        return (
            <View className={css(styles.desktopLabelInputWrapper)}>
                {!!this.props.visibleLabel && (
                    <LabelSmall htmlFor={this._textareaId} tag="label">
                        {this.props.visibleLabel}
                    </LabelSmall>
                )}
                <div
                    className={className}
                    onBlur={() =>
                        this.state.invalid &&
                        this.setState({
                            showErrorTooltip: true,
                            showErrorStyle: true,
                        })
                    }
                    onFocus={() =>
                        this.setState({
                            showErrorTooltip: false,
                        })
                    }
                >
                    {/**
                * This is a visually hidden container for the error tooltip.
                https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role#example_3_visually_hidden_alert_container_for_screen_reader_notifications
            */}
                    <View style={a11y.srOnly} role="alert">
                        {this.state.showErrorTooltip &&
                            ERROR_TITLE + " " + ERROR_MESSAGE}
                    </View>
                    <Tooltip
                        forceAnchorFocusivity={false}
                        opened={this.state.showErrorTooltip}
                        title={ERROR_TITLE}
                        content={ERROR_MESSAGE}
                    >
                        <MathInput
                            // eslint-disable-next-line react/no-string-refs
                            ref="input"
                            className={ApiClassNames.INTERACTIVE}
                            value={this.props.value}
                            onChange={this.changeAndTrack}
                            convertDotToTimes={this.props.times}
                            buttonSets={this.props.buttonSets}
                            onFocus={this._handleFocus}
                            onBlur={this._handleBlur}
                            hasError={this.state.showErrorStyle}
                            ariaLabel={
                                this.props.ariaLabel ||
                                this.context.strings.mathInputBox
                            }
                            extraKeys={
                                this.props.keypadConfiguration?.extraKeys
                            }
                            analytics={
                                this.props.analytics ?? {
                                    onAnalyticsEvent: async () => {},
                                }
                            }
                        />
                    </Tooltip>
                </div>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mobileLabelInputWrapper: {
        padding: "15px 4px 0",
    },
    desktopLabelInputWrapper: {
        margin: "5px 5px 0",
    },
});

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
): KeypadConfiguration => {
    // Always use the Expression keypad, regardless of the button sets that have
    // been enabled.
    const keypadType = KeypadType.EXPRESSION;

    // Extract any and all variables and constants from the answer forms.
    const uniqueExtraVariables: Partial<Record<Key, boolean>> = {};
    const uniqueExtraConstants: Partial<Record<Key, boolean>> = {};
    for (const answerForm of widgetOptions.answerForms) {
        const maybeExpr = KAS.parse(answerForm.value, widgetOptions);
        if (maybeExpr.parsed) {
            const expr = maybeExpr.expr;

            // The keypad expects Greek letters to be capitalized (e.g., it
            // requires `PI` instead of `pi`). Right now, it only supports Pi
            // and Theta, so we special-case.
            const isGreek = (symbol: any) =>
                symbol === "pi" || symbol === "theta";
            const toKey = (symbol: any) =>
                isGreek(symbol) ? symbol.toUpperCase() : symbol;
            const isKey = (key: string): key is Key =>
                KeyArray.includes(key as Key);

            for (const variable of expr.getVars()) {
                const maybeKey = toKey(variable);
                if (isKey(maybeKey)) {
                    uniqueExtraVariables[maybeKey] = true;
                }
            }
            for (const constant of expr.getConsts()) {
                const maybeKey = toKey(constant);
                if (isKey(maybeKey)) {
                    uniqueExtraConstants[maybeKey] = true;
                }
            }
        }
    }

    // TODO(charlie): Alert the keypad as to which of these symbols should be
    // treated as functions.
    const extraVariables = Object.keys(
        uniqueExtraVariables,
    ).sort() as ReadonlyArray<Key>;

    const extraConstants = Object.keys(
        uniqueExtraConstants,
    ).sort() as ReadonlyArray<Key>;

    let extraKeys = [...extraVariables, ...extraConstants];
    if (!extraKeys.length) {
        // If there are no extra symbols available, we include Pi anyway, so
        // that the "extra symbols" button doesn't appear empty.
        extraKeys = ["PI"];
    }

    return {keypadType, extraKeys, times: widgetOptions.times};
};

const propUpgrades = {
    /* c8 ignore next */
    "1": (v0props: any): PerseusExpressionWidgetOptions => ({
        times: v0props.times,
        buttonSets: v0props.buttonSets,
        functions: v0props.functions,
        buttonsVisible: v0props.buttonsVisible,
        visibleLabel: v0props.visibleLabel,
        ariaLabel: v0props.ariaLabel,

        answerForms: [
            {
                considered: "correct",
                form: v0props.form,
                simplify: v0props.simplify,
                value: v0props.value,
            },
        ],
    }),
} as const;

const ExpressionWithDependencies = React.forwardRef<
    Expression,
    Omit<PropsFor<typeof Expression>, keyof ReturnType<typeof useDependencies>>
>((props, ref) => {
    const deps = useDependencies();
    return <Expression ref={ref} analytics={deps.analytics} {...props} />;
});

// HACK: Propogate "static" methods onto our wrapper component.
// In the future we should adjust client apps to not depend on these static
// methods and instead adjust Peresus to provide these facilities through
// instance methods on our Renderers.
// @ts-expect-error - TS2339 - Property 'validate' does not exist on type
ExpressionWithDependencies.validate = Expression.validate;
// @ts-expect-error - TS2339 - Property 'validate' does not exist on type
ExpressionWithDependencies.getUserInputFromProps =
    Expression.getUserInputFromProps;
// @ts-expect-error - TS2339 - Property 'validate' does not exist on type
ExpressionWithDependencies.getOneCorrectAnswerFromRubric =
    Expression.getOneCorrectAnswerFromRubric;

export default {
    name: "expression",
    displayName: "Expression / Equation",
    accessible: true,
    defaultAlignment: "inline-block",
    widget: ExpressionWithDependencies,
    transform: (widgetOptions: PerseusExpressionWidgetOptions): RenderProps => {
        const {
            times,
            functions,
            buttonSets,
            buttonsVisible,
            visibleLabel,
            ariaLabel,
        } = widgetOptions;
        return {
            keypadConfiguration: keypadConfigurationForProps(widgetOptions),
            times,
            functions,
            buttonSets,
            buttonsVisible,
            visibleLabel,
            ariaLabel,
        };
    },
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,

    // For use by the editor
    isLintable: true,
} as WidgetExports<typeof ExpressionWithDependencies>;
