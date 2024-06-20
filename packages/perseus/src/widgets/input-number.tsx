/* eslint-disable react/sort-comp */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import InputWithExamples from "../components/input-with-examples";
import SimpleKeypadInput from "../components/simple-keypad-input";
import {ApiOptions} from "../perseus-api";
import TexWrangler from "../tex-wrangler";
import KhanAnswerTypes from "../util/answer-types";

import type {PerseusInputNumberWidgetOptions} from "../perseus-types";
import type {PerseusStrings} from "../strings";
import type {
    APIOptions,
    Path,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types";

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
} as const;

const formExamples = {
    integer: function (options, strings: PerseusStrings) {
        return strings.integerExample;
    },
    proper: function (options, strings: PerseusStrings) {
        if (options.simplify === "optional") {
            return strings.properExample;
        }
        return strings.simplifiedProperExample;
    },
    improper: function (options, strings: PerseusStrings) {
        if (options.simplify === "optional") {
            return strings.improperExample;
        }
        return strings.simplifiedImproperExample;
    },
    mixed: function (options, strings: PerseusStrings) {
        return strings.mixedExample;
    },
    decimal: function (options, strings: PerseusStrings) {
        return strings.decimalExample;
    },
    percent: function (options, strings: PerseusStrings) {
        return strings.percentExample;
    },
    pi: function (options, strings: PerseusStrings) {
        return strings.piExample;
    },
} as const;

type UserInput = {
    currentValue: string;
};
type RenderProps = {
    simplify: PerseusInputNumberWidgetOptions["simplify"];
    size: PerseusInputNumberWidgetOptions["size"];
    answerType: PerseusInputNumberWidgetOptions["answerType"];
    rightAlign: PerseusInputNumberWidgetOptions["rightAlign"];
};
type Rubric = PerseusInputNumberWidgetOptions;
type ExternalProps = WidgetProps<RenderProps, Rubric>;
type Props = ExternalProps & {
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    size: NonNullable<ExternalProps["size"]>;
    currentValue: string;
    // NOTE(kevinb): This was the only default prop that is listed as
    // not-required in PerseusInputNumberWidgetOptions.
    answerType: NonNullable<Rubric["answerType"]>;
};

type DefaultProps = {
    answerType: Props["answerType"];
    apiOptions: Props["apiOptions"];
    currentValue: Props["currentValue"];
    linterContext: Props["linterContext"];
    rightAlign: Props["rightAlign"];
    size: Props["size"];
};

class InputNumber extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

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
        return this.props.answerType !== "number";
    };

    render(): React.ReactNode {
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
        // TODO(jeremy): Deprecate this widget and prefer numeric-input.
        const rubric = this.props.reviewModeRubric;

        // Note: This is _very_ similar to what `numeric-input.jsx` does. If
        // you modify this, double-check if you also need to modify that
        // component.
        const inputStyles = [
            styles.default,
            this.props.size === "small" ? styles.small : null,
            this.props.rightAlign ? styles.rightAlign : styles.leftAlign,
        ];
        // Unanswered
        if (rubric && !this.props.currentValue) {
            inputStyles.push(styles.answerStateUnanswered);
        }

        return (
            <InputWithExamples
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                value={this.props.currentValue}
                onChange={this.handleChange}
                style={inputStyles}
                examples={this.examples()}
                shouldShowExamples={this.shouldShowExamples()}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                id={this.props.widgetId}
                disabled={this.props.apiOptions.readOnly}
                linterContext={this.props.linterContext}
            />
        );
    }

    handleChange: (arg1: string, arg2: () => void) => void = (newValue, cb) => {
        this.props.onChange({currentValue: newValue}, cb);
    };

    _handleFocus: () => void = () => {
        this.props.onFocus([]);
    };

    _handleBlur: () => void = () => {
        this.props.onBlur([]);
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
        return true;
    };

    focusInputPath: (arg1: Path) => void = (inputPath) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
    };

    blurInputPath: (arg1: Path) => void = (inputPath) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        if (typeof this.refs.input?.blur === "function") {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
            this.refs.input?.blur();
        }
    };

    getInputPaths: () => ReadonlyArray<Path> = () => {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        /* c8 ignore next */
        return [[]];
    };

    // Note: We believe that this isn't used anywhere but are leaving it during
    // the initial refactor
    getGrammarTypeForPath: (arg1: Path) => string = (path) => {
        /* c8 ignore next */
        return "number";
    };

    setInputValue: (arg1: Path, arg2: string, arg3: () => void) => void = (
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
        return InputNumber.validate(
            this.getUserInput(),
            rubric,
            this.context.strings,
            onInputError,
        );
    };

    examples: () => ReadonlyArray<string> = () => {
        const {strings} = this.context;
        const type = this.props.answerType;
        const forms = answerTypes[type].forms.split(/\s*,\s*/);

        const examples = _.map(forms, (form) =>
            formExamples[form](this.props, strings),
        );

        return [strings.yourAnswer].concat(examples);
    };

    static validate(
        state: {
            currentValue: string;
        },
        rubric: Rubric,
        strings: PerseusStrings,
        onInputError: APIOptions["onInputError"] = () => {},
    ): PerseusScore {
        if (rubric.answerType == null) {
            rubric.answerType = "number";
        }

        // note(matthewc): this will get immediately parsed again by
        // `KhanAnswerTypes.number.convertToPredicate`, but a string is
        // expected here
        const stringValue = `${rubric.value}`;
        const val = KhanAnswerTypes.number.createValidatorFunctional(
            stringValue,
            {
                simplify: rubric.simplify,
                inexact: rubric.inexact || undefined,
                maxError: rubric.maxError,
                forms: answerTypes[rubric.answerType].forms,
            },
            strings,
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

    static getUserInputFromProps(props: Props): {
        currentValue: string;
    } {
        return {
            currentValue: props.currentValue,
        };
    }

    static getOneCorrectAnswerFromRubric(
        rubric: any,
    ): string | null | undefined {
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

const styles = StyleSheet.create({
    default: {
        width: 80,
        height: "auto",
    },
    small: {
        width: 40,
    },
    leftAlign: {
        paddingLeft: spacing.xxxSmall_4,
        paddingRight: 0,
    },
    rightAlign: {
        textAlign: "right",
        paddingLeft: 0,
        paddingRight: spacing.xxxSmall_4,
    },
    answerStateUnanswered: {
        backgroundColor: "#eee",
        border: "solid 1px #999",
    },
});

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

export default {
    name: "input-number",
    displayName: "Input number (deprecated - use numeric input instead)",
    defaultAlignment: "inline-block",
    hidden: true,
    widget: InputNumber,
    transform: propTransform,
    isLintable: true,
} as WidgetExports<typeof InputNumber>;
