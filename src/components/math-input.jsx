var classNames = require("classnames");
var React     = require("react");
var ReactDOM  = require("react-dom");
var _         = require("underscore");

// TODO(alex): Package MathQuill
var MathQuill = window.MathQuill;
var PT = React.PropTypes;
var TexButtons = require("./tex-buttons.jsx");

// A WYSIWYG math input that calls `onChange(LaTeX-string)`
var MathInput = React.createClass({
    propTypes: {
        value: PT.string,
        onChange: PT.func.isRequired,
        convertDotToTimes: PT.bool,
        buttonsVisible: PT.oneOf(['always', 'never', 'focused']),
        onFocus: PT.func,
        onBlur: PT.func,
        buttonSets: TexButtons.buttonSetsType.isRequired,
        offsetLeft: PT.number
    },

    render: function() {
        var className = classNames({
            "perseus-math-input": true,

            // mathquill usually adds these itself but react removes them when
            // updating the component.
            "mq-editable-field": true,
            "mq-math-mode": true
        });

        var buttons = null;
        var button_height = "0px";
        if (this._shouldShowButtons()) {
            buttons = <TexButtons
                className="math-input-buttons absolute"
                convertDotToTimes={this.props.convertDotToTimes}
                onInsert={this.insert}
                sets={this.props.buttonSets} />;
            button_height = (6 + 58 * this.props.buttonSets.length).toString() + "px";
        }
        var button_left = "0px";
        if(!this.props.inEditor){
            if (this.props.offsetLeft >= 260){
                button_left = "-240px";
            } else if (this.props.offsetLeft > 130 && this.props.offsetLeft < 260){
                button_left = "-120px";
            }
        }

        return <div style={{display: "inline-block"}}>
            <div style={{display: 'inline-block'}}>
                <span className={className}
                      ref="mathinput"
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur} />
            </div>
            <div style={{position: "relative", height: button_height, left: button_left}}>
                {buttons}
            </div>
        </div>;
    },

    // handlers:
    // keep track of two related bits of state:
    // * this.state.focused - whether the buttons are currently shown
    // * this.mouseDown - whether a mouse click is active that started in the
    //   buttons div

    handleFocus: function() {
        this.setState({ focused: true });
        // TODO(joel) fix properly - we should probably allow onFocus handlers
        // to this property, but we need to work correctly with them.
        // if (this.props.onFocus) {
        //     this.props.onFocus();
        // }
    },

    handleMouseDown: function(event) {
        var focused = ReactDOM.findDOMNode(this).contains(event.target);
        this.mouseDown = focused;
        if (!focused) {
            this.setState({ focused: false });
        }
    },

    handleMouseUp: function() {
        // this mouse click started in the buttons div so we should focus the
        // input
        if (this.mouseDown) {
            this.focus();
        }
        this.mouseDown = false;
    },

    handleBlur: function() {
        if (!this.mouseDown) {
            this.setState({ focused: false });
        }
    },

    _shouldShowButtons: function() {
        if (this.props.buttonsVisible === 'always') {
            return true;
        } else if (this.props.buttonsVisible === 'never') {
            return false;
        } else {
            return this.state.focused;
        }
    },

    getDefaultProps: function() {
        return {
            value: "",
            convertDotToTimes: false,
            buttonsVisible: 'focused'
        };
    },

    getInitialState: function() {
        return { focused: false };
    },

    insert: function(value) {
        var input = this.mathField();
        if (_(value).isFunction()) {
            value(input);
        } else if (value[0] === '\\') {
            input.cmd(value).focus();
        } else {
            input.write(value).focus();
        }
        input.focus();
    },

    mathField: function(options) {
        // MathQuill.MathField takes a DOM node, MathQuill-ifies it if it's
        // seeing that node for the first time, then returns the associated
        // MathQuill object for that node. It is stable - will always return
        // the same object when called on the same DOM node.
        return MathQuill.MathField(ReactDOM.findDOMNode(this.refs.mathinput), options);
    },

    componentWillUnmount: function() {
        window.removeEventListener("mousedown", this.handleMouseDown);
        window.removeEventListener("mouseup", this.handleMouseUp);
    },

    componentDidMount: function() {
        window.addEventListener("mousedown", this.handleMouseDown);
        window.addEventListener("mouseup", this.handleMouseUp);

        // These options can currently only be set globally. (Hopefully this
        // will change at some point.) They appear safe to set multiple times.

        // LaTeX commands that, when typed, are immediately replaced by the
        // appropriate symbol. This does not include ln, log, or any of the
        // trig functions; those are always interpreted as commands.
        MathQuill.addAutoCommands("pi theta phi sqrt");

        // Pop the cursor out of super/subscripts on addition or (in)equalities
        // Avoid popping on '-' to allow negative exponents
        MathQuill.addCharsThatBreakOutOfSupSub("+=<>≠≤≥");

        // Prevent excessive super/subscripts or fractions from being created
        // without operands, e.g. when somebody holds down a key
        MathQuill.disableCharsWithoutOperand("^_/");

        var initialized = false;

        // Initialize MathQuill.MathField instance
        this.mathField({
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
                    var value = mathField.latex();

                    // Provide a MathQuill-compatible way to generate the
                    // not-equals sign without pasting unicode or typing TeX
                    value = value.replace(/<>/g, "\\ne");

                    // Use the specified symbol to represent multiplication
                    // TODO(alex): Add an option to disallow variables, in
                    // which case 'x' should get converted to '\\times'
                    if (this.props.convertDotToTimes) {
                        value = value.replace(/\\cdot/g, "\\times");
                    } else {
                        value = value.replace(/\\times/g, "\\cdot");
                    }

                    if (initialized && this.props.value !== value) {
                        this.props.onChange(value);
                    }
                },
                enter: () => {
                    // This handler is called when the user presses the enter
                    // key. Since this isn't an actual <input> element, we have
                    // to manually trigger the usually automatic form submit.
                    $(ReactDOM.findDOMNode(this.refs.mathinput)).submit();
                },
                upOutOf: (mathField) => {
                    // This handler is called when the user presses the up
                    // arrow key, but there is nowhere in the expression to go
                    // up to (no numerator or exponent). For ease of use,
                    // interpret this as an attempt to create an exponent.
                    mathField.typedText("^");
                }
            }
        });

        // Ideally, we would be able to pass an initial value directly into
        // the constructor above
        this.mathField().latex(this.props.value);

        initialized = true;
    },

    componentDidUpdate: function() {
        if (!_.isEqual(this.mathField().latex(), this.props.value)) {
            this.mathField().latex(this.props.value);
        }
    },

    focus: function() {
        this.mathField().focus();
        this.setState({ focused: true });
    }
});

module.exports = MathInput;
