import classNames from "classnames";
import $ from "jquery";
import MathQuill from "mathquill";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import TexButtons from "./tex-buttons";

import type {ButtonSetsType} from "./tex-buttons";

type ButtonsVisibleType = "always" | "never" | "focused";

type Props = {
    className?: string;
    value: string;
    onChange: any;
    convertDotToTimes: boolean;
    buttonsVisible: ButtonsVisibleType;
    buttonSets: ButtonSetsType;
    labelText?: string;
    onFocus?: () => void;
    onBlur?: () => void;
};

type DefaultProps = {
    value: Props["value"];
    convertDotToTimes: Props["convertDotToTimes"];
    buttonsVisible: Props["buttonsVisible"];
};

type State = {
    focused: boolean;
};

// A WYSIWYG math input that calls `onChange(LaTeX-string)`
class MathInput extends React.Component<Props, State> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property 'mouseDown' has no initializer and is not definitely assigned in the constructor.
    mouseDown: boolean;

    static defaultProps: DefaultProps = {
        value: "",
        convertDotToTimes: false,
        buttonsVisible: "focused",
    };

    state: State = {focused: false};

    componentDidMount() {
        window.addEventListener("mousedown", this.handleMouseDown);
        window.addEventListener("mouseup", this.handleMouseUp);

        let initialized = false;

        // Initialize MathQuill.MathField instance
        this.mathField({
            // LaTeX commands that, when typed, are immediately replaced by the
            // appropriate symbol. This does not include ln, log, or any of the
            // trig functions; those are always interpreted as commands.
            autoCommands: "pi theta phi sqrt nthroot",

            // Pop the cursor out of super/subscripts on arithmetic operators
            // or (in)equalities.
            charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",

            // Prevent excessive super/subscripts or fractions from being
            // created without operands, e.g. when somebody holds down a key
            supSubsRequireOperand: true,

            // The name of this option is somewhat misleading, as tabbing in
            // MathQuill breaks you out of a nested context (fraction/script)
            // if you're in one, but moves focus to the next input if you're
            // not. Spaces (with this option enabled) are just ignored in the
            // latter case.
            //
            // TODO(alex): In order to allow inputting mixed numbers, we will
            // have to accept spaces in certain cases. The desired behavior is
            // still to escape nested contexts if currently in one, but to
            // insert a space if not (we don't expect mixed numbers in nested
            // contexts). We should also limit to one consecutive space.
            spaceBehavesLikeTab: true,

            handlers: {
                edited: (mathField) => {
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
                        const left = mathField.__controller.cursor[MathQuill.L];
                        if (left && left.ctrlSeq === "\\cdot ") {
                            mathField.__controller.backspace();
                            mathField.cmd("\\times");
                        }
                    } else {
                        value = value.replace(/\\times/g, "\\cdot");
                    }

                    if (initialized && this.props.value !== value) {
                        this.props.onChange(value);
                    }
                },
                enter: () => {
                    // NOTE(kevinb): This isn't how answers to exercises are
                    // submitted.  The actual mechanism for this can be found
                    // in exercise-problem-template.jsx, see `handleSubmit`.

                    // This handler is called when the user presses the enter
                    // key. Since this isn't an actual <input> element, we have
                    // to manually trigger the usually automatic form submit.
                    // eslint-disable-next-line react/no-string-refs
                    // @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call. | TS2339 - Property 'submit' does not exist on type 'JQueryStatic'.
                    $(ReactDOM.findDOMNode(this.refs.mathinput)).submit();
                },
                upOutOf: (mathField) => {
                    // This handler is called when the user presses the up
                    // arrow key, but there is nowhere in the expression to go
                    // up to (no numerator or exponent). For ease of use,
                    // interpret this as an attempt to create an exponent.
                    mathField.typedText("^");
                },
            },
        });

        // Ideally, we would be able to pass an initial value directly into
        // the constructor above
        // @ts-expect-error [FEI-5003] - TS2554 - Expected 1 arguments, but got 0.
        this.mathField().latex(this.props.value);

        initialized = true;
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.handleMouseDown);
        window.removeEventListener("mouseup", this.handleMouseUp);
    }

    // handlers:
    // keep track of two related bits of state:
    // * this.state.focused - whether the buttons are currently shown
    // * this.mouseDown - whether a mouse click is active that started in the
    //   buttons div

    handleFocus: () => void = () => {
        this.setState({focused: true});
        // TODO(joel) fix properly - we should probably allow onFocus handlers
        // to this property, but we need to work correctly with them.
        // if (this.props.onFocus) {
        //     this.props.onFocus();
        // }
    };

    handleMouseDown: (arg1: MouseEvent) => void = (event) => {
        // @ts-expect-error [FEI-5003] - TS2531 - Object is possibly 'null'. | TS2345 - Argument of type 'EventTarget | null' is not assignable to parameter of type 'Node | null'.
        const focused = ReactDOM.findDOMNode(this).contains(event.target);
        this.mouseDown = focused;
        if (!focused) {
            this.setState({focused: false});
        }
    };

    handleMouseUp: (arg1: MouseEvent) => void = () => {
        // this mouse click started in the buttons div so we should focus the
        // input
        if (this.mouseDown) {
            this.focus();
        }
        this.mouseDown = false;
    };

    handleBlur: (arg1: React.FocusEvent) => void = (e) => {
        // TODO(michaelpolyak): Consider trapping focus within the button group.
        // Focusing back on the input when TAB out of the last button in the
        // group. This will probably require ESCAPE key handling to enable to
        // close (blur) the button group in order to focus on next page element.
        if (
            !this.mouseDown &&
            // @ts-expect-error [FEI-5003] - TS2531 - Object is possibly 'null'.
            !ReactDOM.findDOMNode(this).contains(e.relatedTarget)
        ) {
            this.setState({focused: false});
        }
    };

    _shouldShowButtons: () => boolean = () => {
        if (this.props.buttonsVisible === "always") {
            return true;
        }
        if (this.props.buttonsVisible === "never") {
            return false;
        }
        return this.state.focused;
    };

    insert: (arg1: any) => void = (value) => {
        // @ts-expect-error [FEI-5003] - TS2554 - Expected 1 arguments, but got 0.
        const input = this.mathField();
        if (_(value).isFunction()) {
            value(input);
        } else if (value[0] === "\\") {
            input.cmd(value).focus();
        } else {
            input.write(value).focus();
        }
        input.focus();
    };

    mathField: (arg1: any) => any = (options) => {
        // The MathQuill API is now "versioned" through its own "InterVer"
        // system.
        // See: https://github.com/mathquill/mathquill/pull/459
        const MQ = MathQuill.getInterface(2);

        // MathQuill.MathField takes a DOM node, MathQuill-ifies it if it's
        // seeing that node for the first time, then returns the associated
        // MathQuill object for that node. It is stable - will always return
        // the same object when called on the same DOM node.
        // eslint-disable-next-line react/no-string-refs
        return MQ.MathField(ReactDOM.findDOMNode(this.refs.mathinput), options);
    };

    focus: () => void = () => {
        // @ts-expect-error [FEI-5003] - TS2554 - Expected 1 arguments, but got 0.
        this.mathField().focus();
        this.setState({focused: true});
    };

    blur: () => void = () => {
        // @ts-expect-error [FEI-5003] - TS2554 - Expected 1 arguments, but got 0.
        this.mathField().blur();
        this.setState({focused: false});
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

        let buttons = null;
        if (this._shouldShowButtons()) {
            // @ts-expect-error [FEI-5003] - TS2322 - Type 'Element' is not assignable to type 'null'.
            buttons = (
                <TexButtons
                    sets={this.props.buttonSets}
                    className="math-input-buttons absolute"
                    convertDotToTimes={this.props.convertDotToTimes}
                    onInsert={this.insert}
                />
            );
        }

        return (
            <div style={{display: "inline-block"}}>
                <div style={{display: "inline-block"}}>
                    <span
                        className={className}
                        // eslint-disable-next-line react/no-string-refs
                        ref="mathinput"
                        aria-label={this.props.labelText}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </div>
                <div style={{position: "relative"}} onBlur={this.handleBlur}>
                    {buttons}
                </div>
            </div>
        );
    }
}

export default MathInput;
