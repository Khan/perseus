import * as KAS from "@khanacademy/kas";
import {KeyArray, KeypadInput, KeypadType} from "@khanacademy/math-input";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {View} from "@khanacademy/wonder-blocks-core";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {css, StyleSheet} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import MathInput from "../../components/math-input";
import {useDependencies} from "../../dependencies";
import * as Changeable from "../../mixins/changeable";
import {ApiOptions, ClassNames as ApiClassNames} from "../../perseus-api";
import a11y from "../../util/a11y";

import expressionValidator from "./expression-validator";
import getDecimalSeparator from "./get-decimal-separator";

import type {DependenciesContext} from "../../dependencies";
import type {PerseusExpressionWidgetOptions} from "../../perseus-types";
import type {FocusPath, Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusExpressionRubric,
    PerseusExpressionUserInput,
} from "../../validation.types";
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

type RenderProps = {
    buttonSets: PerseusExpressionWidgetOptions["buttonSets"];
    buttonsVisible?: PerseusExpressionWidgetOptions["buttonsVisible"];
    functions: PerseusExpressionWidgetOptions["functions"];
    times: PerseusExpressionWidgetOptions["times"];
    visibleLabel: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel: PerseusExpressionWidgetOptions["ariaLabel"];
    keypadConfiguration: ReturnType<typeof keypadConfigurationForProps>;
};

type ExternalProps = WidgetProps<RenderProps, PerseusExpressionRubric>;

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
        disabled?: boolean;
        noBackground?: boolean;
        noWrapper?: boolean;
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

// The new, MathQuill input expression widget
export class Expression
    extends React.Component<Props, ExpressionState>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    _textareaId = `expression_textarea_${Date.now()}`;
    _isMounted = false;
    _mathInput: React.MutableRefObject<null | MathInput> = React.createRef();

    static getUserInputFromProps(props: Props): PerseusExpressionUserInput {
        return normalizeTex(props.value);
    }

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
                this.setState({
                    invalid: true,
                });
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

    getUserInput(): PerseusExpressionUserInput {
        return Expression.getUserInputFromProps(this.props);
    }

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
        if (this.props.disabled) {
            return;
        }

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
        if (this.props.disabled) {
            return false;
        }

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

    focusInputPath(inputPath: InputPath) {
        if (this.props.disabled) {
            return;
        }

        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
    }

    blurInputPath(inputPath: InputPath) {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        if (typeof this.refs.input?.blur === "function") {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
            this.refs.input?.blur();
        }
    }

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

    setInputValue(path: FocusPath, newValue: string, cb: () => void) {
        if (this._mathInput.current) {
            const inputRef = this._mathInput.current.inputRef;
            if (inputRef.current) {
                inputRef.current.setValue(newValue);
            }
        }
        this.props.onChange(
            {
                value: newValue,
            },
            cb,
        );
    }

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
            <View
                className={
                    this.props.noWrapper
                        ? undefined
                        : css(styles.desktopLabelInputWrapper)
                }
            >
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
                            ref={this._mathInput}
                            className={ApiClassNames.INTERACTIVE}
                            value={this.props.value}
                            onChange={this.changeAndTrack}
                            convertDotToTimes={this.props.times}
                            buttonSets={this.props.buttonSets}
                            disabled={this.props.disabled}
                            noBackground={this.props.noBackground}
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

    return {
        keypadType,
        extraKeys,
        times: widgetOptions.times,
    };
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
// methods and instead adjust Perseus to provide these facilities through
// instance methods on our Renderers.
// @ts-expect-error - TS2339 - Property 'validate' does not exist on type
ExpressionWithDependencies.getUserInputFromProps =
    Expression.getUserInputFromProps;

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
    validator: expressionValidator,

    getOneCorrectAnswerFromRubric(
        rubric: PerseusExpressionRubric,
    ): string | null | undefined {
        const correctAnswers = (rubric.answerForms || []).filter(
            (answerForm) => answerForm.considered === "correct",
        );
        if (correctAnswers.length === 0) {
            return;
        }
        return correctAnswers[0].value;
    },
} as WidgetExports<typeof ExpressionWithDependencies>;
