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

type KeypadInputProps = React.ComponentProps<typeof KeypadInput>;
interface KeypadInputWithInterfaceMethods {
    focus: (cb?: (keypadActive: boolean) => void) => void;
    blur: () => void;
    insert: (val: any) => void;
}
/**
 * Wrapper component for KeypadInput that adds the Widget interface methods.
 *
 * KeypadInput from @khanacademy/math-input is a class component that doesn't
 * export its ref type or provide an `insert` method. This wrapper:
 * - Provides a consistent interface with focus(), blur(), and insert() methods
 * - Uses mathField.pressKey() for insert to match KeypadInput's internal behavior
 * - Ensures proper key translation (FRAC → fraction, trig functions, etc.)
 * - Allows the Expression widget to treat mobile and desktop inputs uniformly
 *
 * This is a temporary workaround until KeypadInput is converted to a
 * functional component with proper TypeScript types.
 */
const KeypadInputWithInterface = React.forwardRef<
    KeypadInputWithInterfaceMethods,
    KeypadInputProps
>((props, ref) => {
    const keypadInputRef = React.useRef<KeypadInput>(null);
    const noopKeypadActivation = (_keypadActive: boolean) => {};
    React.useImperativeHandle(ref, () => ({
        focus: (cb) =>
            keypadInputRef.current?.focus(cb ?? noopKeypadActivation),
        blur: () => keypadInputRef.current?.blur(),
        insert: (val) => {
            // The `KeypadInput` component from `@khanacademy/math-input`
            // does not have an `insert` method, so we call `pressKey` on
            // the mathField directly. This matches KeypadInput's internal
            // key handling (see math-input.tsx line 360) and ensures proper
            // key translation (e.g., FRAC → fraction command, trig functions).
            const mathField = keypadInputRef.current?.mathField;
            if (mathField && typeof mathField.pressKey === "function") {
                mathField.pressKey(val);
            }
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
        } = props;

        // Hooks
        const {strings} = usePerseusI18n();
        // KeypadContext provides setKeypadActive which is passed to focus() to notify
        // the mobile keypad system when an input becomes active. This is only used on
        // mobile (when apiOptions.customKeypad is true) but is safe to call on desktop.
        const {setKeypadActive} = React.useContext(KeypadContext);
        const textareaId = useId();
        const inputRef = useRef<any>(null); // KeypadInput/MathInput don't export ref types
        const rootRef = useRef<HTMLDivElement>(null);
        // Track mount status to prevent state updates after unmount (matches class component behavior)
        const isMountedRef = useRef(false);

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
        // Empty deps intentional - this effect runs once on mount to:
        // 1. Fire analytics event (should only fire once, not on every prop change)
        // 2. Set up the input element ID for label association
        // apiOptions.customKeypad is used to determine the selector, but it never changes
        // after initial mount (switching between mobile/desktop requires a full remount)

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

        const changeAndTrack = (value: string, cb: () => void) => {
            const normalized = normalizeTex(value);
            handleUserInput(normalized, cb);
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

        const getFocusTarget = useCallback((): HTMLElement | null => {
            if (!rootRef.current) {
                return null;
            }

            const isMobile = apiOptions.customKeypad;
            const selector = isMobile ? ".mq-textarea > span" : "textarea";
            const element = rootRef.current.querySelector(selector);
            return element instanceof HTMLElement ? element : null;
        }, [apiOptions.customKeypad]);

        // Implement Widget interface
        useImperativeHandle(
            ref,
            () => ({
                /**
                 * Focus the input element.
                 *
                 * This method handles focus for both mobile (KeypadInput) and desktop
                 * (MathInput) variants. It uses a multi-step approach with fallbacks:
                 * 1. Attempt to focus via the input component's focus() method
                 * 2. Query for the expected focus target element
                 * 3. Fall back to previously identified target or active element
                 *
                 * Edge case: If called immediately after mount, the input component's
                 * internal textarea may not be fully initialized yet. The fallback logic
                 * handles this by attempting to focus whatever element is available.
                 * The ID set in useEffect is only for accessibility (label association)
                 * and doesn't affect focus targeting.
                 *
                 * @returns true if focus was successfully moved to the input element
                 */
                focus: (): boolean => {
                    const targetBefore = getFocusTarget();

                    // Try direct focus first; this may be a custom KeypadInput or MathInput.
                    inputRef.current?.focus?.(setKeypadActive);

                    // Prefer the element we expect to focus; fall back to whatever is active.
                    const targetAfter =
                        getFocusTarget() ??
                        targetBefore ??
                        (document.activeElement instanceof HTMLElement
                            ? document.activeElement
                            : null);

                    if (!targetAfter) {
                        return false;
                    }

                    if (document.activeElement !== targetAfter) {
                        targetAfter.focus();
                    }

                    return document.activeElement === targetAfter;
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
                setKeypadActive,
                getKeypadConfiguration,
                getFocusTarget,
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
                        style={{}}
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
