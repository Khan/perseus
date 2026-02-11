import {linterContextDefault} from "@khanacademy/perseus-linter";
import {inputNumberAnswerTypes} from "@khanacademy/perseus-score";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import {withDependencies} from "../../components/with-dependencies";
import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/input-number/input-number-ai-utils";
import InputWithExamples from "../numeric-input/input-with-examples";

import type {PerseusStrings} from "../../strings";
import type {
    Path,
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {InputNumberPromptJSON} from "../../widget-ai-utils/input-number/input-number-ai-utils";
import type {
    PerseusInputNumberWidgetOptions,
    PerseusInputNumberUserInput,
} from "@khanacademy/perseus-core";

type FormExampleFunction = (options: Props, strings: PerseusStrings) => string;

const formExamples: Record<string, FormExampleFunction> = {
    integer: function (_, strings) {
        return strings.integerExample;
    },
    proper: function (options, strings) {
        if (options.simplify === "optional") {
            return strings.properExample;
        }
        return strings.simplifiedProperExample;
    },
    improper: function (options, strings) {
        if (options.simplify === "optional") {
            return strings.improperExample;
        }
        return strings.simplifiedImproperExample;
    },
    mixed: function (_, strings) {
        return strings.mixedExample;
    },
    decimal: function (_, strings) {
        return strings.decimalExample;
    },
    percent: function (_, strings) {
        return strings.percentExample;
    },
    pi: function (_, strings) {
        return strings.piExample;
    },
} as const;

type ExternalProps = WidgetProps<
    PerseusInputNumberWidgetOptions,
    PerseusInputNumberUserInput
>;
type Props = ExternalProps & {
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    rightAlign: NonNullable<ExternalProps["rightAlign"]>;
    size: NonNullable<ExternalProps["size"]>;
    // NOTE(kevinb): This was the only default prop that is listed as
    // not-required in PerseusInputNumberWidgetOptions.
    answerType: NonNullable<ExternalProps["answerType"]>;
    dependencies: PerseusDependenciesV2;
};

type DefaultProps = Pick<
    Props,
    | "answerType"
    | "apiOptions"
    | "linterContext"
    | "rightAlign"
    | "size"
    | "userInput"
>;

class InputNumber extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        size: "normal",
        answerType: "number",
        rightAlign: false,
        // NOTE(kevinb): renderer.jsx should be provide this so we probably don't
        // need to include it in defaultProps.
        apiOptions: ApiOptions.defaults,
        linterContext: linterContextDefault,
        userInput: {currentValue: ""},
    };

    componentDidMount(): void {
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "input-number",
                widgetId: this.props.widgetId,
            },
        });
    }

    shouldShowExamples: () => boolean = () => {
        return this.props.answerType !== "number";
    };

    handleChange: (arg1: string, arg2: () => void) => void = (newValue, cb) => {
        this.props.handleUserInput({currentValue: newValue}, cb);
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

    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'FocusPath' is not assignable to type 'Path'.
    focusInputPath: (arg1: Path) => void = (inputPath) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
    };

    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'FocusPath' is not assignable to type 'Path'.
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

    getPromptJSON(): InputNumberPromptJSON {
        return _getPromptJSON(this.props);
    }

    examples(): ReadonlyArray<string> {
        const {strings} = this.context;
        const type = this.props.answerType;
        const forms = inputNumberAnswerTypes[type].forms.split(/\s*,\s*/);

        const examples = forms.map((form) =>
            formExamples[form](this.props, strings),
        );

        return [strings.yourAnswer].concat(examples);
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState(): any {
        return {
            alignment: this.props.alignment,
            static: this.props.static,
            simplify: this.props.simplify,
            size: this.props.size,
            answerType: this.props.answerType,
            rightAlign: this.props.rightAlign,
            currentValue: this.props.userInput.currentValue,
        };
    }

    render(): React.ReactNode {
        if (this.props.apiOptions.customKeypad) {
            const input = (
                <SimpleKeypadInput
                    // eslint-disable-next-line react/no-string-refs
                    ref="input"
                    value={this.props.userInput.currentValue}
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

        // Note: This is _very_ similar to what `numeric-input.jsx` does. If
        // you modify this, double-check if you also need to modify that
        // component.
        const inputStyles = [
            styles.default,
            this.props.size === "small" ? styles.small : null,
            this.props.rightAlign ? styles.rightAlign : styles.leftAlign,
        ];
        // Unanswered
        if (this.props.reviewMode && !this.props.userInput.currentValue) {
            inputStyles.push(styles.answerStateUnanswered);
        }

        return (
            <InputWithExamples
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                value={this.props.userInput.currentValue}
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
}

const styles = StyleSheet.create({
    default: {
        width: 80,
        height: "auto",
        // Even in RTL languages, math is LTR.
        // So we force this component to always render LTR
        direction: "ltr",
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

function getOneCorrectAnswerFromRubric(rubric: any): string | undefined {
    if (rubric.value == null) {
        return;
    }
    let answerString = String(rubric.value);
    if (rubric.inexact && rubric.maxError) {
        answerString += " \u00B1 " + rubric.maxError;
    }
    return answerString;
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusInputNumberUserInput {
    return {
        currentValue: serializedState.currentValue,
    };
}

function getStartUserInput(): PerseusInputNumberUserInput {
    return {currentValue: ""};
}

function getCorrectUserInput(
    options: PerseusInputNumberWidgetOptions,
): PerseusInputNumberUserInput {
    return {currentValue: options.value.toString()};
}

const WrappedInputNumber = withDependencies(InputNumber);

export default {
    name: "input-number",
    displayName: "Input number (deprecated - use numeric input instead)",
    hidden: true,
    widget: WrappedInputNumber,
    isLintable: true,
    getOneCorrectAnswerFromRubric,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedInputNumber>;
