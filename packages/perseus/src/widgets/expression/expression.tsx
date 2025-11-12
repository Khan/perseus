import {KeypadInput} from "@khanacademy/math-input";
import {expressionLogic} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import {PerseusI18nContext} from "../../components/i18n-context";
import MathInput from "../../components/math-input/math-input";
import {useDependencies} from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/expression/expression-ai-utils";

import type {DependenciesContext} from "../../dependencies";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {ExpressionPromptJSON} from "../../widget-ai-utils/expression/expression-ai-utils";
import type {
    KeypadConfiguration,
    KeypadKey,
    PerseusExpressionRubric,
    PerseusExpressionUserInput,
    PerseusExpressionWidgetOptions,
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

type ExternalProps = WidgetProps<
    PerseusExpressionWidgetOptions,
    PerseusExpressionUserInput
>;

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
    };

type DefaultProps = {
    apiOptions: Props["apiOptions"];
    buttonSets: Props["buttonSets"];
    functions: Props["functions"];
    linterContext: Props["linterContext"];
    onBlur: Props["onBlur"];
    onFocus: Props["onFocus"];
    times: Props["times"];
    userInput: Props["userInput"];
};

// The new, MathQuill input expression widget
export class Expression extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    _textareaId = `expression_textarea_${Date.now()}`;
    _isMounted = false;

    static defaultProps: DefaultProps = {
        times: false,
        functions: [],
        buttonSets: ["basic", "trig", "prealgebra", "logarithms"],
        onFocus: () => {},
        onBlur: () => {},
        apiOptions: ApiOptions.defaults,
        linterContext: linterContextDefault,
        userInput: "",
    };

    displayName = "Expression";

    componentDidMount: () => void = () => {
        this.props.analytics?.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "expression",
                widgetId: "expression",
            },
        });

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

    componentWillUnmount: () => void = () => {
        this._isMounted = false;
    };

    getUserInput(): PerseusExpressionUserInput {
        return normalizeTex(this.props.userInput);
    }

    getPromptJSON(): ExpressionPromptJSON {
        return _getPromptJSON(this.props, normalizeTex(this.props.userInput));
    }

    changeAndTrack: (userInput: string, cb: () => void) => void = (
        userInput: string,
        cb: () => void,
    ) => {
        this.props.handleUserInput(normalizeTex(userInput), cb);
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

    getKeypadConfiguration(): KeypadConfiguration {
        return {
            keypadType: "EXPRESSION",
            extraKeys: this.props.extraKeys,
            times: this.props.times,
        };
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState() {
        const {userInput: _, answerForms: __, ...rest} = this.props;
        return {
            ...rest,
            value: this.props.userInput,
            keypadConfiguration: this.getKeypadConfiguration(),
        };
    }

    render() {
        const keypadConfiguration = this.getKeypadConfiguration();

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
                        value={this.props.userInput}
                        keypadElement={this.props.keypadElement}
                        onChange={this.changeAndTrack}
                        onFocus={() => {
                            // this.props.keypadElement should always be set
                            // when apiOptions.customKeypad is set, but how
                            // to convince TypeScript of this?
                            this.props.keypadElement?.configure(
                                keypadConfiguration,
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

        return (
            <View className={css(styles.desktopLabelInputWrapper)}>
                {!!this.props.visibleLabel && (
                    <LabelSmall htmlFor={this._textareaId} tag="label">
                        {this.props.visibleLabel}
                    </LabelSmall>
                )}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error */}
                <div className="perseus-widget-expression">
                    <MathInput
                        // eslint-disable-next-line react/no-string-refs
                        ref="input"
                        value={this.props.userInput}
                        onChange={this.changeAndTrack}
                        convertDotToTimes={this.props.times}
                        buttonSets={this.props.buttonSets}
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                        ariaLabel={
                            this.props.ariaLabel ||
                            this.context.strings.mathInputBox
                        }
                        extraKeys={keypadConfiguration.extraKeys}
                        onAnalyticsEvent={
                            this.props.analytics?.onAnalyticsEvent ??
                            (async () => {})
                        }
                    />
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

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusExpressionUserInput {
    return normalizeTex(serializedState.value);
}

function getStartUserInput(): PerseusExpressionUserInput {
    return "";
}

function getOneCorrectAnswerFromRubric(
    rubric: PerseusExpressionRubric,
): string | null | undefined {
    // TODO(LEMS-2656): remove TS suppression
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const correctAnswers = (rubric.answerForms || []).filter(
        (answerForm) => answerForm.considered === "correct",
    );
    if (correctAnswers.length === 0) {
        return;
    }
    return correctAnswers[0].value;
}

function getCorrectUserInput(
    options: PerseusExpressionWidgetOptions,
): PerseusExpressionUserInput {
    for (const form of options.answerForms) {
        if (form.considered === "correct") {
            return form.value;
        }
    }
    return "";
}

export default {
    name: "expression",
    displayName: "Expression / Equation",
    widget: ExpressionWithDependencies,
    version: expressionLogic.version,

    // For use by the editor
    isLintable: true,

    getOneCorrectAnswerFromRubric,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof ExpressionWithDependencies>;
