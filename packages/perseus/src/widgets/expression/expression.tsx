import * as KAS from "@khanacademy/kas";
import {KeypadInput} from "@khanacademy/math-input";
import {getDecimalSeparator, expressionLogic} from "@khanacademy/perseus-core";
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
import {ApiOptions} from "../../perseus-api";
import a11y from "../../util/a11y";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/expression/expression-ai-utils";

import type {DependenciesContext} from "../../dependencies";
import type {WidgetProps, Widget, FocusPath, WidgetExports} from "../../types";
import type {ExpressionPromptJSON} from "../../widget-ai-utils/expression/expression-ai-utils";
import type {
    PerseusExpressionWidgetOptions,
    ExpressionPublicWidgetOptions,
    KeypadConfiguration,
    KeypadKey,
    PerseusExpressionRubric,
    PerseusExpressionUserInput,
} from "@khanacademy/perseus-core";
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
    keypadConfiguration: KeypadConfiguration;
};

type ExternalProps = WidgetProps<RenderProps>;

type Props = ExternalProps &
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

type ExpressionState = {
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

    getPromptJSON(): ExpressionPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'FocusPath' is not assignable to type 'InputPath'.
    focusInputPath(inputPath: InputPath) {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
    }

    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'FocusPath' is not assignable to type 'InputPath'.
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
    insert(keyPressed: KeypadKey) {
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

    setInputValue(path: FocusPath, newValue: string, cb?: () => void) {
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
            <View className={css(styles.desktopLabelInputWrapper)}>
                {!!this.props.visibleLabel && (
                    <LabelSmall htmlFor={this._textareaId} tag="label">
                        {this.props.visibleLabel}
                    </LabelSmall>
                )}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error */}
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
                            onAnalyticsEvent={
                                this.props.analytics?.onAnalyticsEvent ??
                                (async () => {})
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
    widget: ExpressionWithDependencies,
    transform: (
        widgetOptions:
            | PerseusExpressionWidgetOptions
            | ExpressionPublicWidgetOptions,
    ): RenderProps => {
        const {
            times,
            functions,
            buttonSets,
            buttonsVisible,
            visibleLabel,
            ariaLabel,
            extraKeys,
        } = widgetOptions;
        return {
            keypadConfiguration: {
                keypadType: "EXPRESSION",
                extraKeys,
                times,
            },
            times,
            functions,
            buttonSets,
            buttonsVisible,
            visibleLabel,
            ariaLabel,
        };
    },
    version: expressionLogic.version,

    // For use by the editor
    isLintable: true,

    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'Rubric' is not assignable to type 'PerseusExpressionRubric'.
    getOneCorrectAnswerFromRubric(
        rubric: PerseusExpressionRubric,
    ): string | null | undefined {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const correctAnswers = (rubric.answerForms || []).filter(
            (answerForm) => answerForm.considered === "correct",
        );
        if (correctAnswers.length === 0) {
            return;
        }
        return correctAnswers[0].value;
    },
} satisfies WidgetExports<typeof ExpressionWithDependencies>;
