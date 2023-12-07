/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    DesktopKeypad,
    keyTranslator,
    createMathField,
    mathQuillInstance,
    CursorContext,
    getCursorContext,
    convertDotToTimesByLocale,
} from "@khanacademy/math-input";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {fade} from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet} from "aphrodite";
import classNames from "classnames";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import type {LegacyButtonSets} from "../perseus-types";
import type {PerseusDependenciesV2} from "../types";
import type {Keys, MathFieldInterface} from "@khanacademy/math-input";

type ButtonsVisibleType = "always" | "never" | "focused";

type KeypadButtonSets = {
    advancedRelations?: boolean;
    basicRelations?: boolean;
    divisionKey?: boolean;
    logarithms?: boolean;
    preAlgebra?: boolean;
    trigonometry?: boolean;
};

type Props = {
    className?: string;
    value: string;
    onChange: any;
    convertDotToTimes: boolean;
    /**
     * @deprecated Use `keypadButtonSets` instead. Maps to `keypadButtonSets`.
     * @see keypadButtonSets
     */
    buttonSets?: LegacyButtonSets;
    /**
     * Overrides deprecated `buttonSets` prop.
     */
    keypadButtonSets?: KeypadButtonSets;
    labelText?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    hasError?: boolean;
    extraKeys?: ReadonlyArray<Keys>;
    /**
     * Whether to show the keypad buttons.
     * The strings now misleading, but we keep them for backwards compatibility.
     * - `focused` means that the keypad **appears on toggle, *off* by default**.
     * - `always` means that the keypad **appears on toggle, *on* by default.**
     * - `never` means that the keypad is **never shown**.
     */
    buttonsVisible?: ButtonsVisibleType;
    analytics: PerseusDependenciesV2["analytics"];
};

type DefaultProps = {
    value: Props["value"];
    convertDotToTimes: Props["convertDotToTimes"];
};

type State = {
    focused: boolean;
    keypadOpen: boolean;
    cursorContext: typeof CursorContext[keyof typeof CursorContext];
    openedWithEventType?: string;
};

const customKeyTranslator = {
    ...keyTranslator,
    // If there's something in the input that can become part of a
    // fraction, typing "/" puts it in the numerator. If not, typing
    // "/" does nothing. In that case, enter a \frac.
    FRAC: (mathQuill) => {
        const contents = mathQuill.latex();
        mathQuill.typedText("/");
        if (mathQuill.latex() === contents) {
            mathQuill.cmd("\\frac");
        }
    },
};

// A WYSIWYG math input that calls `onChange(LaTeX-string)`
class MathInput extends React.Component<Props, State> {
    // @ts-expect-error - TS2564 - Property 'mouseDown' has no initializer and is not definitely assigned in the constructor.
    mouseDown: boolean;
    __mathFieldWrapperRef: HTMLSpanElement | null = null;
    __mathField: MathFieldInterface | null = null;

    static defaultProps: DefaultProps = {
        value: "",
        convertDotToTimes: false,
    };

    state: State = {
        focused: false,
        keypadOpen: this.props.buttonsVisible === "always" ? true : false,
        cursorContext: CursorContext.NONE,
    };

    componentDidMount() {
        // Ideally, we would be able to pass an initial value directly into
        // the constructor
        this.mathField()?.latex(this.props.value);
    }

    openKeypad() {
        if (this.props.buttonsVisible === "never") {
            return;
        }
        this.setState({keypadOpen: true});
    }

    closeKeypad() {
        this.setState({keypadOpen: false});
    }

    insert: (value: any) => void = (value) => {
        const input = this.mathField();
        const inputModifier = customKeyTranslator[value];
        if (inputModifier) {
            inputModifier(input, value);
            input?.focus();
            return;
        }

        // note(Matthew): I'm not sure this is still being used
        // but it fails tests when I remove it and the way we call
        // methods directly on components makes it difficult to confirm
        // if it's dead code
        if (_(value).isFunction()) {
            value(input);
        } else if (value[0] === "\\") {
            input?.cmd(value).focus();
        } else {
            input?.write(value).focus();
        }
        input?.focus();
    };

    mathField: () => MathFieldInterface | null = () => {
        if (!this.__mathField && this.__mathFieldWrapperRef) {
            // Initialize MathQuill.MathField instance
            this.__mathField = createMathField(
                this.__mathFieldWrapperRef,
                (baseConfig) => ({
                    ...baseConfig,
                    handlers: {
                        edit: (mathField) => {
                            // This handler is guaranteed to be called on change, but
                            // unlike React it sometimes generates false positives.
                            // One of these is on initialization (with an empty string
                            // value), so we have to guard against that below.
                            let value = mathField.latex();

                            // Provide a MathQuill-compatible way to generate the
                            // not-equals sign without pasting unicode or typing TeX
                            value = value.replace(/<>/g, "\\ne");

                            // Use the specified symbol to represent multiplication
                            // TODO(alex): Add an option to disallow variables, in
                            // which case 'x' should get converted to '\\times'
                            if (
                                convertDotToTimesByLocale(
                                    this.props.convertDotToTimes,
                                )
                            ) {
                                value = value.replace(/\\cdot/g, "\\times");

                                // Preserve cursor position in the common case:
                                // typing '*' to insert a multiplication sign.
                                // We do this by modifying internal MathQuill state
                                // directly, instead of waiting for `.latex()` to be
                                // called in `componentDidUpdate()`.
                                const left =
                                    mathField.__controller.cursor[
                                        mathQuillInstance.L
                                    ];
                                if (left && left.ctrlSeq === "\\cdot ") {
                                    mathField.__controller.backspace();
                                    mathField.cmd("\\times");
                                }
                            } else {
                                value = value.replace(/\\times/g, "\\cdot");
                            }

                            if (this.props.value !== value) {
                                this.props.onChange(value);
                            }
                            this.setState({
                                cursorContext: getCursorContext(mathField),
                            });
                        },
                        enter: () => {
                            // NOTE(kevinb): This isn't how answers to exercises are
                            // submitted.  The actual mechanism for this can be found
                            // in exercise-problem-template.jsx, see `handleSubmit`.

                            // This handler is called when the user presses the enter
                            // key. Since this isn't an actual <input> element, we have
                            // to manually trigger the usually automatic form submit.
                            if (this.__mathFieldWrapperRef) {
                                $(this.__mathFieldWrapperRef).submit();
                            }
                        },
                        upOutOf: (mathField) => {
                            // This handler is called when the user presses the up
                            // arrow key, but there is nowhere in the expression to go
                            // up to (no numerator or exponent). For ease of use,
                            // interpret this as an attempt to create an exponent.
                            mathField.typedText("^");
                        },
                    },
                }),
            );
        }

        return this.__mathField;
    };

    focus: () => void = () => {
        this.mathField()?.focus();
        this.setState({focused: true});
    };

    // removing mathfield focus here makes the cursor vanished when the
    // input is still focused
    blur: () => void = () => this.setState({focused: false});

    handleKeypadPress: (key: Keys, e: any) => void = (key, e) => {
        const translator = keyTranslator[key];
        const mathField = this.mathField();

        if (mathField) {
            if (translator) {
                translator(mathField, key);
            }
            this.setState({
                cursorContext: getCursorContext(mathField),
            });
        }

        // We want to prevent taking focus from input when clicking on keypad
        //   Clickable handles "onClick" differently than react;
        //   a keyboard event is "keydown" type.
        //   In react without WonderBlocks, "enter" or "space" keydown events
        //   are also "click" events, differentiated by "detail".
        if (e.type === "click") {
            this.focus();
        }
    };

    render(): React.ReactNode {
        let className = classNames({
            "perseus-math-input": true,

            // mathquill usually adds these itself but react removes them when
            // updating the component.
            "mq-editable-field": true,
            "mq-math-mode": true,
        });

        if (this.props.className) {
            className = className + " " + this.props.className;
        }

        return (
            <View
                style={[
                    styles.outerWrapper,
                    this.state.focused && styles.wrapperFocused,
                    this.props.hasError && styles.wrapperError,
                ]}
            >
                <div
                    style={{
                        display: "flex",
                        padding: 1,
                    }}
                    onClick={() => {
                        const mathField = this.mathField();
                        if (!mathField) {
                            return;
                        }
                        this.setState({
                            cursorContext: getCursorContext(mathField),
                        });
                    }}
                >
                    <span
                        className={className}
                        ref={(ref) => (this.__mathFieldWrapperRef = ref)}
                        aria-label={this.props.labelText}
                        onFocus={() => this.focus()}
                        onBlur={() => this.blur()}
                    />
                    <Popover
                        opened={this.state.keypadOpen}
                        onClose={() => this.closeKeypad()}
                        dismissEnabled
                        content={() => (
                            <PopoverContentCore
                                closeButtonVisible
                                style={styles.popoverContent}
                            >
                                <DesktopKeypad
                                    onAnalyticsEvent={
                                        this.props.analytics.onAnalyticsEvent
                                    }
                                    extraKeys={this.props.extraKeys}
                                    onClickKey={this.handleKeypadPress}
                                    cursorContext={this.state.cursorContext}
                                    convertDotToTimes={
                                        this.props.convertDotToTimes
                                    }
                                    {...(this.props.keypadButtonSets ??
                                        mapButtonSets(this.props?.buttonSets))}
                                />
                            </PopoverContentCore>
                        )}
                    >
                        {this.props.buttonsVisible === "never" ? (
                            <MathInputIcon
                                hovered={false}
                                focused={false}
                                active={false}
                            />
                        ) : (
                            <Clickable
                                aria-label={
                                    this.state.keypadOpen
                                        ? i18n._("close math keypad")
                                        : i18n._("open math keypad")
                                }
                                aria-checked={this.state.keypadOpen}
                                role="switch"
                                onClick={() =>
                                    this.state.keypadOpen
                                        ? this.closeKeypad()
                                        : this.openKeypad()
                                }
                            >
                                {(props) => (
                                    <MathInputIcon
                                        active={this.state.keypadOpen}
                                        {...props}
                                    />
                                )}
                            </Clickable>
                        )}
                    </Popover>
                </div>
            </View>
        );
    }
}

const MathInputIcon = ({hovered, focused, active}) => {
    let color: string | undefined;
    switch (true) {
        case focused || active:
            color = Color.white;
            break;
        case hovered:
            color = Color.blue;
            break;
        default:
            color = Color.offBlack;
            break;
    }
    const dynamicClass =
        active || focused ? styles.iconActive : styles.iconInactive;
    return (
        <View style={[styles.iconContainer, dynamicClass]}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={color}
                viewBox="0 0 256 256"
            >
                <path d="M112,72a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h64A8,8,0,0,1,112,72Zm-8,104H80V152a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H64v24a8,8,0,0,0,16,0V192h24a8,8,0,0,0,0-16Zm48,0h64a8,8,0,0,0,0-16H152a8,8,0,0,0,0,16Zm64,16H152a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-61.66-90.34a8,8,0,0,0,11.32,0L184,83.31l18.34,18.35a8,8,0,0,0,11.32-11.32L195.31,72l18.35-18.34a8,8,0,0,0-11.32-11.32L184,60.69,165.66,42.34a8,8,0,0,0-11.32,11.32L172.69,72,154.34,90.34A8,8,0,0,0,154.34,101.66Z" />
            </svg>
        </View>
    );
};

const mapButtonSets = (buttonSets?: LegacyButtonSets) => {
    const keypadButtonSets: KeypadButtonSets = {};
    if (!buttonSets) {
        return keypadButtonSets;
    }
    buttonSets.forEach((buttonSet) => {
        switch (buttonSet) {
            case "advanced relations":
                keypadButtonSets.advancedRelations = true;
                break;
            case "basic relations":
                keypadButtonSets.basicRelations = true;
                break;
            case "basic+div":
                keypadButtonSets.divisionKey = true;
                break;
            case "logarithms":
                keypadButtonSets.logarithms = true;
                break;
            case "prealgebra":
                keypadButtonSets.preAlgebra = true;
                break;
            case "trig":
                keypadButtonSets.trigonometry = true;
                break;
            case "basic":
            default:
                break;
        }
    });
    return keypadButtonSets;
};

const inputFocused = {
    borderWidth: 2,
    borderColor: Color.blue,
    margin: -1,
};

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        padding: Spacing.xxxSmall_4,
        borderRadius: 1,
    },
    iconInactive: {
        backgroundColor: Color.offBlack8,
    },
    iconActive: {
        backgroundColor: Color.offBlack64,
    },
    outerWrapper: {
        display: "inline-block",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Color.offBlack50,
        borderRadius: 3,
        background: Color.white,
        ":hover": inputFocused,
    },
    wrapperFocused: inputFocused,
    wrapperError: {
        borderColor: Color.red,
        background: fade(Color.red, 0.08),
        ":hover": {
            borderColor: Color.red,
        },
    },
    popoverContent: {
        padding: 0,
        paddingBottom: Spacing.xxSmall_6,
        maxWidth: "initial",
    },
});

export default MathInput;
