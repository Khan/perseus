import {KeypadContext} from "@khanacademy/keypad-context";
import {KeypadInput} from "@khanacademy/math-input";
import {expressionLogic} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {css, StyleSheet} from "aphrodite";
import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useImperativeHandle,
    useRef,
} from "react";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import MathInput from "../../components/math-input";
import {useDependencies} from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/expression/expression-ai-utils";

import type {Widget, WidgetExports, WidgetProps, FocusPath} from "../../types";
import type {ExpressionPromptJSON} from "../../widget-ai-utils/expression/expression-ai-utils";
import type {
    KeypadConfiguration,
    KeypadKey,
    LegacyButtonSets,
    PerseusExpressionRubric,
    PerseusExpressionUserInput,
    PerseusExpressionWidgetOptions,
} from "@khanacademy/perseus-core";

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

type Props = ExternalProps & {
    // From useDependencies hook
    analytics: ReturnType<typeof useDependencies>["analytics"];
    // Required non-null props
    apiOptions: NonNullable<ExternalProps["apiOptions"]>;
    buttonSets: NonNullable<ExternalProps["buttonSets"]>;
    functions: NonNullable<ExternalProps["functions"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    onBlur: NonNullable<ExternalProps["onBlur"]>;
    onFocus: NonNullable<ExternalProps["onFocus"]>;
    times: NonNullable<ExternalProps["times"]>;
    // Note: visibleLabel and ariaLabel are optional, inherited from ExternalProps
};

// Default values for object/array props (defined outside to avoid recreating on each render)
const defaultButtonSets: LegacyButtonSets = [
    "basic",
    "trig",
    "prealgebra",
    "logarithms",
];

// Empty functions for default props (defined outside to maintain referential equality)
const defaultOnFocus = () => {};
const defaultOnBlur = () => {};

const KeypadInputWithInterface = React.forwardRef<any, any>((props, ref) => {
    const keypadInputRef = React.useRef<KeypadInput>(null);
    React.useImperativeHandle(ref, () => ({
        focus: (cb) => keypadInputRef.current?.focus(cb),
        blur: () => keypadInputRef.current?.blur(),
        insert: (val) => {
            // The `KeypadInput` component from `@khanacademy/math-input`
            // does not have an `insert` method, so we have to call the
            // `mathField` directly.
            keypadInputRef.current?.mathField.write(val);
        },
    }));

    return <KeypadInput ref={keypadInputRef} {...props} />;
});
KeypadInputWithInterface.displayName = "KeypadInputWithInterface";

// The new, MathQuill input expression widget
export const Expression = forwardRef<Widget, Props>(
    function Expression(props, ref) {
        // Destructure props with inline defaults
        const {
            apiOptions = ApiOptions.defaults,
            buttonSets = defaultButtonSets,
            times = false,
            // functions: __functions = [],
            onFocus = defaultOnFocus,
            onBlur = defaultOnBlur,
            userInput = "",
            visibleLabel,
            ariaLabel,
            analytics,
            keypadElement,
            extraKeys,
            handleUserInput,
            trackInteraction,
            widgetId,
            // linterContext = linterContextDefault,
        } = props;

        // Hooks
        const {strings} = usePerseusI18n();
        const {setKeypadActive} = React.useContext(KeypadContext);
        const textareaId = useId();
        const inputRef = useRef<any>(null); // KeypadInput/MathInput don't export ref types
        const rootRef = useRef<HTMLDivElement>(null);
        const isMountedRef = useRef(true);

        // Lifecycle: mount and unmount
        useEffect(() => {
            // Fire analytics event
            analytics?.onAnalyticsEvent({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: "null",
                    widgetType: "expression",
                    widgetId: widgetId,
                },
            });

            isMountedRef.current = true;

            // Imperatively add ID to the input element
            // This is needed for accessibility (associating label with input)
            if (rootRef.current) {
                const isMobile = apiOptions.customKeypad;
                const selector = isMobile ? ".mq-textarea > span" : "textarea";
                const inputElement = rootRef.current.querySelector(selector);

                if (inputElement instanceof HTMLElement) {
                    inputElement.setAttribute("id", textareaId);
                }
            }

            return () => {
                isMountedRef.current = false;
            };
        }, []); // eslint-disable-line react-hooks/exhaustive-deps
        // Empty deps - mount only (analytics should fire once)

        // Event handlers
        const handleFocus = () => {
            analytics?.onAnalyticsEvent({
                type: "perseus:expression-focused",
                payload: null,
            });
            onFocus([]);
        };

        const handleBlur = () => {
            onBlur([]);
        };

        const handleChange = (newVal: string, cb: () => void) => {
            const normalized = normalizeTex(newVal);
            handleUserInput(normalized, cb);
        };

        const changeAndTrack = (value: string, cb: () => void) => {
            handleChange(value, cb);
            trackInteraction();
        };

        const mobileHandleFocus = () => {
            keypadElement?.configure(getKeypadConfiguration(), () => {
                if (isMountedRef.current) {
                    handleFocus();
                }
            });
        };

        // Helper function for keypad configuration
        const getKeypadConfiguration = useCallback((): KeypadConfiguration => {
            return {
                keypadType: "EXPRESSION",
                extraKeys: extraKeys,
                times: times,
            };
        }, [extraKeys, times]);

        // Implement Widget interface
        useImperativeHandle(
            ref,
            () => ({
                focus: (): boolean => {
                    // Try direct focus first
                    if (inputRef.current?.focus) {
                        inputRef.current.focus(setKeypadActive);
                        return true;
                    }

                    // Fallback: querySelector approach
                    if (!rootRef.current) {
                        return false;
                    }

                    const isMobile = apiOptions.customKeypad;
                    const selector = isMobile
                        ? ".mq-textarea > span"
                        : "textarea";
                    const element = rootRef.current.querySelector(selector);

                    if (!(element instanceof HTMLElement)) {
                        return false;
                    }

                    element.focus();

                    return true;
                },

                focusInputPath: (path: FocusPath) => {
                    inputRef.current?.focus?.(setKeypadActive);
                },

                blurInputPath: (path: FocusPath) => {
                    if (typeof inputRef.current?.blur === "function") {
                        inputRef.current?.blur();
                    }
                },

                insert: (keyPressed: KeypadKey) => {
                    inputRef.current?.insert?.(keyPressed);
                },

                getInputPaths: () => [[]],

                getUserInput: (): PerseusExpressionUserInput => {
                    return normalizeTex(userInput);
                },

                getKeypadConfiguration,

                getPromptJSON: (): ExpressionPromptJSON => {
                    return _getPromptJSON(props, normalizeTex(userInput));
                },

                /**
                 * @deprecated and likely very broken API
                 * [LEMS-3185] do not trust serializedState
                 */
                getSerializedState: () => {
                    const {userInput: _, answerForms: __, ...rest} = props;
                    return {
                        ...rest,
                        value: userInput,
                        keypadConfiguration: getKeypadConfiguration(),
                    };
                },
            }),
            [
                props,
                userInput,
                apiOptions,
                setKeypadActive,
                getKeypadConfiguration,
            ],
        );

        // Render
        const keypadConfiguration = getKeypadConfiguration();

        if (apiOptions.customKeypad) {
            return (
                <View
                    ref={rootRef}
                    className={css(styles.mobileLabelInputWrapper)}
                >
                    {!!visibleLabel && (
                        <LabelSmall htmlFor={textareaId} tag="label">
                            {visibleLabel}
                        </LabelSmall>
                    )}
                    <KeypadInputWithInterface
                        ref={inputRef}
                        ariaLabel={ariaLabel || strings.mathInputBox}
                        value={userInput}
                        keypadElement={keypadElement}
                        onChange={changeAndTrack}
                        onFocus={mobileHandleFocus}
                        onBlur={handleBlur}
                    />
                </View>
            );
        }

        return (
            <View
                ref={rootRef}
                className={css(styles.desktopLabelInputWrapper)}
            >
                {!!visibleLabel && (
                    <LabelSmall htmlFor={textareaId} tag="label">
                        {visibleLabel}
                    </LabelSmall>
                )}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error */}
                <div className="perseus-widget-expression">
                    <MathInput
                        ref={inputRef}
                        value={userInput}
                        onChange={changeAndTrack}
                        convertDotToTimes={times}
                        buttonSets={buttonSets}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ariaLabel={ariaLabel || strings.mathInputBox}
                        extraKeys={keypadConfiguration.extraKeys}
                        onAnalyticsEvent={
                            analytics?.onAnalyticsEvent ?? (async () => {})
                        }
                    />
                </div>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    mobileLabelInputWrapper: {
        padding: "15px 4px 0",
    },
    desktopLabelInputWrapper: {
        margin: "5px 5px 0",
    },
});

const ExpressionWithDependencies = forwardRef<Widget, ExternalProps>(
    (props, ref) => {
        const deps = useDependencies();
        return <Expression ref={ref} analytics={deps.analytics} {...props} />;
    },
);

ExpressionWithDependencies.displayName = "ExpressionWithDependencies";

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
