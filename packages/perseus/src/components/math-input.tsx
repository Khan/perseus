import {
    CursorContext,
    convertDotToTimesByLocale,
    createMathField,
    DesktopKeypad,
    getCursorContext,
    getKeyTranslator,
    MathInputI18nContext,
    mathQuillInstance,
} from "@khanacademy/math-input";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {color, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import classNames from "classnames";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";
import {v4 as uuid} from "uuid";

import a11y from "../util/a11y";
import {debounce} from "../util/debounce";
import {PerseusI18nContext} from "./i18n-context";

import type {MathFieldInterface} from "@khanacademy/math-input";
import type {
    AnalyticsEventHandlerFn,
    KeypadKey,
    LegacyButtonSets,
} from "@khanacademy/perseus-core";

type ButtonsVisibleType = "always" | "never" | "focused";

export type KeypadButtonSets = {
    advancedRelations?: boolean;
    basicRelations?: boolean;
    divisionKey?: boolean;
    logarithms?: boolean;
    preAlgebra?: boolean;
    trigonometry?: boolean;
    scientific?: boolean;
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
    ariaLabel: string;
    onFocus?: () => void;
    onBlur?: () => void;
    extraKeys?: ReadonlyArray<KeypadKey>;
    /**
     * Whether to show the keypad buttons.
     * The strings now misleading, but we keep them for backwards compatibility.
     * - `focused` means that the keypad **appears on toggle, *off* by default**.
     * - `always` means that the keypad **appears on toggle, *on* by default.**
     * - `never` means that the keypad is **never shown**.
     */
    buttonsVisible?: ButtonsVisibleType;
    onAnalyticsEvent: AnalyticsEventHandlerFn;
};

type InnerProps = Props & {
    // NOTE(john): We'd like to use the real MathInputStrings type here, but
    // getting the types and imports to work correctly turns out to be really
    // hard, it's not worth it as we are just passing the types through.
    mathInputStrings: any;
};

type DefaultProps = {
    value: Props["value"];
    convertDotToTimes: Props["convertDotToTimes"];
};

type State = {
    focused: boolean;
    keypadOpen: boolean;
    cursorContext: (typeof CursorContext)[keyof typeof CursorContext];
    openedWithEventType?: string;
};

// A WYSIWYG math input that calls `onChange(LaTeX-string)`
class InnerMathInput extends React.Component<InnerProps, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

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

    componentDidUpdate(prevProps: Readonly<InnerProps>): void {
        if (prevProps.value !== this.props.value) {
            // Don't do anything if the user is currently focused on this input
            if (this.state.focused) {
                return;
            }
            const field = this.mathField();
            if (!field) {
                return;
            }
            const current = field.latex();
            if (this.props.value !== current) {
                field.latex(this.props.value);
            }
        }
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
        const {locale} = this.context;
        const customKeyTranslator = {
            ...getKeyTranslator(locale, this.context.strings),
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
            const {locale} = this.context;
            // Initialize MathQuill.MathField instance
            this.__mathField = createMathField(
                this.__mathFieldWrapperRef,
                locale,
                this.props.mathInputStrings,
                // TODO(LEMS-2656): remove TS suppression
                // @ts-expect-error: Type 'EditableMathQuill' is not assignable to type 'MathFieldInterface'.
                (baseConfig) => ({
                    ...baseConfig,
                    handlers: {
                        edit: debounce((mathField: MathFieldInterface) => {
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
                                    locale,
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
                                    mathField.cursor()[mathQuillInstance.L];
                                if (left && left.ctrlSeq === "\\cdot ") {
                                    mathField.controller().backspace();
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
                        }, 100),
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
                        upOutOf: (mathField: MathFieldInterface) => {
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

        this.__mathField?.setAriaLabel(this.props.ariaLabel);
        return this.__mathField;
    };

    focus: () => void = () => {
        this.mathField()?.focus();
        this.setState({focused: true});
    };

    // removing mathfield focus here makes the cursor vanished when the
    // input is still focused
    blur: () => void = () => this.setState({focused: false});

    handleKeypadPress: (key: KeypadKey, e: any) => void = (key, e) => {
        // Handle dismiss key to close the keypad
        if (key === "DISMISS") {
            this.closeKeypad();
            return;
        }

        const {locale} = this.context;
        const translator = getKeyTranslator(locale, this.context.strings)[key];
        const mathField = this.mathField();

        if (mathField) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
        if (e?.type === "click") {
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

        const popoverContentUniqueId = uuid().slice(0, 8);

        if (this.props.className) {
            className = className + " " + this.props.className;
        }

        return (
            <View
                style={[
                    styles.outerWrapper,
                    this.state.focused && styles.wrapperFocused,
                ]}
            >
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- TODO(LEMS-2871): Address a11y error */}
                <div
                    style={{
                        display: "flex",
                        padding: 1,
                    }}
                    onClick={(e) => {
                        // Prevent the click into the input from registering
                        // so that the keypad popover doesn't close when
                        // switching focus to the input.
                        e.stopPropagation();

                        const mathField = this.mathField();
                        if (!mathField) {
                            return;
                        }
                        this.setState({
                            cursorContext: getCursorContext(mathField),
                        });
                    }}
                >
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO(LEMS-2871): Address a11y error */}
                    <span
                        className={className}
                        ref={(ref) => (this.__mathFieldWrapperRef = ref)}
                        onFocus={() => this.focus()}
                        onBlur={() => this.blur()}
                    />
                    <Popover
                        opened={this.state.keypadOpen}
                        dismissEnabled
                        rootBoundary="document"
                        aria-label={this.context.strings.mathInputTitle}
                        aria-describedby={`popover-content-${popoverContentUniqueId}`}
                        onClose={() => this.closeKeypad()}
                        content={() => (
                            <>
                                <HeadingMedium
                                    id={`popover-content-${popoverContentUniqueId}`}
                                    style={a11y.srOnly}
                                >
                                    {this.context.strings.mathInputDescription}
                                </HeadingMedium>
                                <PopoverContentCore
                                    style={styles.popoverContent}
                                >
                                    <DesktopKeypad
                                        onAnalyticsEvent={
                                            this.props.onAnalyticsEvent
                                        }
                                        extraKeys={this.props.extraKeys}
                                        onClickKey={this.handleKeypadPress}
                                        cursorContext={this.state.cursorContext}
                                        convertDotToTimes={
                                            this.props.convertDotToTimes
                                        }
                                        {...(this.props.keypadButtonSets ??
                                            mapButtonSets(
                                                this.props?.buttonSets,
                                            ))}
                                        showDismiss
                                    />
                                </PopoverContentCore>
                            </>
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
                                        ? this.context.strings.closeKeypad
                                        : this.context.strings.openKeypad
                                }
                                role="button"
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

// We need to have two contexts (one for Perseus and one for MathInput), so we
// add a wrapper around the MathInput component to provide the MathInput context
// to it.
class MathInput extends React.Component<Props, State> {
    static contextType = MathInputI18nContext;
    declare context: React.ContextType<typeof MathInputI18nContext>;
    inputRef = React.createRef<InnerMathInput>();

    static defaultProps: Pick<Props, "ariaLabel"> = {
        ariaLabel: "Math input",
    };

    blur() {
        this.inputRef.current?.blur();
    }

    focus() {
        this.inputRef.current?.focus();
    }

    insert(value: any) {
        this.inputRef.current?.insert(value);
    }

    render() {
        return (
            <InnerMathInput
                {...this.props}
                ref={this.inputRef}
                mathInputStrings={this.context.strings}
            />
        );
    }
}

const MathInputIcon = ({hovered, focused, active}) => {
    let fillColor: string | undefined;
    switch (true) {
        case focused || active:
            fillColor =
                semanticColor.action.primary.progressive.default.foreground;
            break;
        case hovered:
            fillColor =
                semanticColor.action.primary.progressive.hover.background;
            break;
        default:
            fillColor = semanticColor.core.foreground.neutral.strong;
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
                fill={fillColor}
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
            case "scientific":
                keypadButtonSets.scientific = true;
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
    borderColor: semanticColor.core.border.instructive.default,
    margin: -1,
};

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        padding: sizing.size_040,
        borderRadius: 1,
    },
    iconInactive: {
        border: "2px solid transparent",
        backgroundColor: color.offBlack8,
    },
    iconActive: {
        border: `2px solid ${semanticColor.core.border.knockout.default}`,
        backgroundColor: color.offBlack64,
    },
    outerWrapper: {
        display: "inline-block",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: color.offBlack50,
        borderRadius: 3,
        background: semanticColor.core.background.base.default,
        ":hover": inputFocused,
    },
    wrapperFocused: inputFocused,
    popoverContent: {
        padding: 0,
        paddingBottom: sizing.size_060,
        maxWidth: "initial",
    },
});

export default MathInput;
