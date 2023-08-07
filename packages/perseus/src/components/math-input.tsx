import {
    DesktopKeypad,
    Keys,
    keyTranslator,
    createMathField,
    mathQuillInstance,
    MathFieldInterface,
    CursorContext,
    getCursorContext,
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

type ButtonSets = {
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
    buttonSets: ButtonSets;
    labelText?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    hasError?: boolean;
    extraKeys?: ReadonlyArray<Keys>;
};

type DefaultProps = {
    value: Props["value"];
    convertDotToTimes: Props["convertDotToTimes"];
};

type State = {
    focused: boolean;
    keypadOpen: boolean;
    cursorContext: typeof CursorContext[keyof typeof CursorContext];
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
    // @ts-expect-error [FEI-5003] - TS2564 - Property 'mouseDown' has no initializer and is not definitely assigned in the constructor.
    mouseDown: boolean;
    __mathFieldWrapperRef: HTMLSpanElement | null = null;
    __mathField: MathFieldInterface | null = null;

    static defaultProps: DefaultProps = {
        value: "",
        convertDotToTimes: false,
    };

    state: State = {
        focused: false,
        keypadOpen: false,
        cursorContext: CursorContext.NONE,
    };

    componentDidMount() {
        // Ideally, we would be able to pass an initial value directly into
        // the constructor
        this.mathField()?.latex(this.props.value);
    }
    openKeypad: () => void = () => this.setState({keypadOpen: true});

    closeKeypad: () => void = () => this.setState({keypadOpen: false});

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
                            if (this.props.convertDotToTimes) {
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

    blur: () => void = () => {
        this.mathField()?.blur();
        this.setState({focused: false});
    };

    handleKeypadPress: (key: Keys) => void = (key) => {
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
                                    sendEvent={async () => {}}
                                    extraKeys={this.props.extraKeys}
                                    onClickKey={(key) =>
                                        this.handleKeypadPress(key as any)
                                    }
                                    cursorContext={this.state.cursorContext}
                                    multiplicationDot={
                                        !this.props.convertDotToTimes
                                    }
                                    {...this.props.buttonSets}
                                />
                            </PopoverContentCore>
                        )}
                    >
                        <Clickable
                            aria-label={
                                this.state.keypadOpen
                                    ? i18n._("close math keypad")
                                    : i18n._("open math keypad")
                            }
                            aria-checked={this.state.keypadOpen}
                            // @ts-expect-error - TS2769 - No overload matches this call.
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
                    </Popover>
                </div>
            </View>
        );
    }
}

const MathInputIcon = ({hovered, focused, active}) => {
    const color = hovered || focused || active ? Color.blue : Color.offBlack;
    const boxShadow = active ? `0 3px 1px -1px ${Color.blue}` : "none";
    return (
        <View style={{...styles.iconContainer, boxShadow}}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill={color}
                viewBox="0 0 256 256"
            >
                <path d="M112,72a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16h64A8,8,0,0,1,112,72Zm-8,104H80V152a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H64v24a8,8,0,0,0,16,0V192h24a8,8,0,0,0,0-16Zm48,0h64a8,8,0,0,0,0-16H152a8,8,0,0,0,0,16Zm64,16H152a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-61.66-90.34a8,8,0,0,0,11.32,0L184,83.31l18.34,18.35a8,8,0,0,0,11.32-11.32L195.31,72l18.35-18.34a8,8,0,0,0-11.32-11.32L184,60.69,165.66,42.34a8,8,0,0,0-11.32,11.32L172.69,72,154.34,90.34A8,8,0,0,0,154.34,101.66Z" />
            </svg>
        </View>
    );
};

const inputFocused = {
    borderWidth: 2,
    borderColor: Color.blue,
    margin: -1,
};

const styles = StyleSheet.create({
    iconContainer: {
        maxHeight: 24,
        display: "flex",
        margin: Spacing.xxxSmall_4,
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
