// TODO(joel): teach KAS how to accept an answer only if it's expressed in
// terms of a certain type.
// TODO(joel): Allow sigfigs within a range rather than an exact expected
// value?

var _ = require("underscore");
var lens = require("../../hubble/index.js");

var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var ApiOptions = require("../perseus-api.jsx").Options;
var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var MathOutput   = require("../components/math-output.jsx");
var NumberInput = require("../components/number-input.jsx");
var { SignificantFigures, displaySigFigs } = require("../sigfigs.jsx");

var ALL = "all";
var SOME = "some";
var MAX_SIGFIGS = 10;

var countSigfigs = function(value) {
    return new SignificantFigures(value).sigFigs;
};

var sigfigPrint = function(num, sigfigs) {
    return displaySigFigs(num, sigfigs, -MAX_SIGFIGS, false);
};

/* I just wrote this, but it's old by analogy to `OldExpression`, in that it's
 * the version that non-mathquill platforms get stuck with. Constructed with an
 * <input>, a parser, popsicle sticks, and glue.
 *
 * In the same way as OldExpression, this parses continuously as you type, then
 * shows and hides an error buddy. The error message is only shown after a
* rolling two second delay, but hidden immediately on further typing.
 */
var OldUnitInput = React.createClass({
    mixins: [Changeable],

    propTypes: {
        value: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            apiOptions: ApiOptions.defaults,
            value: "",
        };
    },

    // TODO(joel) think about showing the error buddy
    render: function() {
        var inputType = this.props.apiOptions.staticRender ?
                React.createFactory(MathOutput) :
                React.DOM.input;
        var input = inputType({
            onChange: this.handleChange,
            ref: "input",
            className: ApiClassNames.INTERACTIVE,
            value: this.props.value,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        });

        return <div className="old-unit-input">
            {input}
            <div ref="error"
                 className="error"
                 style={{display: "none"}}>
                <$_>{"I don't understand that"}</$_>
            </div>
        </div>;
    },

    _errorTimeout: null,

    _showError: function() {
        if (this.props.value === "") {
            return;
        }

        var $error = $(this.refs.error.getDOMNode());
        if (!$error.is(":visible")) {
            $error.css({ top: 50, opacity: 0.1 }).show()
                .animate({ top: 0, opacity: 1.0 }, 300);
        }
    },

    _hideError: function() {
        var $error = $(this.refs.error.getDOMNode());
        if ($error.is(":visible")) {
            $error.animate({ top: 50, opacity: 0.1 }, 300, function() {
                $(this).hide();
            });
        }
    },

    componentDidUpdate: function() {
        clearTimeout(this._errorTimeout);
        if (KAS.unitParse(this.props.value).parsed) {
            this._hideError();
        } else {
            this._errorTimeout = setTimeout(this._showError, 2000);
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this._errorTimeout);
    },

    handleBlur: function() {
        this.props.onBlur([]);
        clearTimeout(this._errorTimeout);
        if (!KAS.unitParse(this.props.value).parsed) {
            this._showError();
        }
    },

    handleChange: function(event) {
        this._hideError();
        this.props.onChange({ value: event.target.value });
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() {};
        return OldUnitInput.validate(this.getUserInput(), rubric);
    },

    getUserInput: function() {
        return this.props.value;
    },

    // begin mobile stuff

    getInputPaths: function() {
        // The widget itself is an input, so we return a single empty list to
        // indicate this.
        return [[]];
    },

    focusInputPath: function(inputPath) {
        this.refs.input.getDOMNode().focus();
    },

    handleFocus: function() {
        this.props.onFocus([]);
    },

    blurInputPath: function(inputPath) {
        this.refs.input.getDOMNode().blur();
    },

    setInputValue: function(path, newValue, cb) {
        this.props.onChange({
            value: newValue
        }, cb);
    },

    getDOMNodeForPath: function() {
        return this.refs.input.getDOMNode();
    },

    getGrammarTypeForPath: function(inputPath) {
        return "unit";
    },

    // end mobile stuff

    statics: {
        displayMode: "inline-block",
    }
});

// Extract the primitive units from a unit expression. This first simplifies
// `expr` to a `Mul` like "5 kg m / s^2" then removes the first term.
var primUnits = function(expr) {
    return expr.simplify().asMul().partition()[1].flatten().simplify();
};

_.extend(OldUnitInput, {
    validate: function(state, rubric) {
        var answer = KAS.unitParse(rubric.value).expr;
        var guess = KAS.unitParse(state);
        if (!guess.parsed) {
            return  {
                type: "invalid",
                message: $._("I couldn't understand those units."),
            };
        }

        // Note: we check sigfigs, then numerical correctness, then units, so
        // the most significant things come last, that way the user will see
        // the most important message.
        var message = null;

        // did the user specify the right number of sigfigs?
        // TODO(joel) - add a grading mode where the wrong number of sigfigs
        // isn't marked wrong
        var sigfigs = rubric.sigfigs;
        var sigfigsCorrect = countSigfigs(guess.coefficient) === sigfigs;
        if (!sigfigsCorrect) {
            message = $._("Check your significant figures.");
        }

        // now we need to check that the answer is correct to the precision we
        // require.
        var numericallyCorrect;
        try {
            var x = new KAS.Var("x");
            var equality = new KAS.Eq(
                answer.simplify(),
                "=",
                new KAS.Mul(x, guess.expr.simplify())
            );

            var conversion = equality.solveLinearEquationForVariable(x);

            // Make sure the conversion factor between the user's input answer
            // and the canonical answer is 1, to sigfig places.
            // TODO(joel) is this sound?
            numericallyCorrect =
                Number(conversion.eval()).toPrecision(sigfigs) ===
                Number(1).toPrecision(sigfigs);
        } catch (e) {
            numericallyCorrect = false;
        }

        if (!numericallyCorrect) {
            message = $._("That answer is numerically incorrect.");
        }

        var kasCorrect;
        var guessUnit = primUnits(guess.expr.simplify());
        var answerUnit = primUnits(answer.simplify());

        if (rubric.accepting === ALL) {
            // We're accepting all units - KAS does the hard work of figuring
            // out if the user's unit is equivalent to the author's unit.
            kasCorrect = KAS.compare(
                guessUnit,
                answerUnit
            ).equal;
        } else {
            // Are any of the accepted units the same as what the user entered?
            kasCorrect = _(rubric.acceptingUnits).any(unit => {
                var thisAnswerUnit = primUnits(
                    KAS.unitParse(unit).unit.simplify()
                );
                return KAS.compare(
                    thisAnswerUnit,
                    guessUnit
                    // TODO(joel) - make this work as intended.
                    // { form: true }
                ).equal;
            });
        }
        if (!kasCorrect) {
            var message = $._("Check your units.");
        }

        var correct = kasCorrect && numericallyCorrect && sigfigsCorrect;

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message,
        };
    }
});


// Show the name of a unit and whether it's recognized by KAS.
//
// In the future I plan for this to show an example of a thing that would be
// accepted in that unit.
var UnitExample = React.createClass({
    render: function() {
        var icon;
        if (this.state.valid) {
            icon = <span>
                <i className="icon-ok unit-example-okay" />
                {this.state.solvedExample}
            </span>;
        } else {
            icon = <i className="icon-remove unit-example-not-okay" />;
        }

        return <div>
            {icon} {this.props.name}
        </div>;
    },

    componentWillReceiveProps: function(nextProps) {
        this._checkValidity(nextProps);
    },

    componentWillMount: function() {
        this._checkValidity(this.props);
    },

    _checkValidity: function({ name, original, sigfigs }) {
        var parseResult = KAS.unitParse(name);
        var solvedExample = "";

        // A unit is valid if it parses and is equivalent to the original.
        var valid = true;

        if (parseResult.parsed && original) {
            var x = new KAS.Var("x");
            var { unit } = parseResult;
            var equality = new KAS.Eq(
                original,
                "=",
                new KAS.Mul(x, unit)
            );
            try {
                var answer = equality.solveLinearEquationForVariable(x);

                // The third parameter is the least significant decimal place.
                // I.e. the index of the last place you care about
                // (543210.(-1)(-2)(-3) etc). We use -10 because that should
                // always be safe since we only care up to maximum 10 decimal
                // places.
                solvedExample = sigfigPrint(answer.eval(), sigfigs);

                valid = KAS.compare(
                    primUnits(original),
                    primUnits(unit)
                ).equal;
            } catch (e) {
                valid = false;
            }
        } else {
            valid = false;
        }

        this.setState({
            valid,
            solvedExample,
        });
    },
});

var UnitInputEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        value: React.PropTypes.string,
        acceptingUnits: React.PropTypes.arrayOf(React.PropTypes.string),
        accepting: React.PropTypes.oneOf([ALL, SOME]),
        sigfigs: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            value: "5x10^5 kg m / s^2",
            accepting: ALL,
            sigfigs: 3
        };
    },

    render: function() {
        var { acceptingUnits, accepting } = this.props;
        acceptingUnits = acceptingUnits || [];
        var acceptingElem = null;
        if (accepting === SOME) {
            var unitsArr = acceptingUnits.map(name =>
                <UnitExample name={name}
                             original={this.original || null}
                             sigfigs={this.props.sigfigs} />
            );

            acceptingElem = <div>
                <input
                    type="text"
                    defaultValue={acceptingUnits.join(", ")}
                    onChange={this.handleAcceptingUnitsChange}
                />
                {" "}(comma-separated)
                {unitsArr}
            </div>;
        }

        return <div className="unit-editor">
            <div>
                <input value={this.props.value}
                       className="unit-editor-canonical"
                       onBlur={this._handleBlur}
                       onKeyPress={this._handleBlur}
                       onChange={this.onChange} />
                {" "}
                {this.parsed ?
                    <i className="icon-ok unit-example-okay" /> :
                    <i className="icon-remove unit-example-not-okay" />
                }
            </div>

            <div>
                Significant Figures:{" "}
                <NumberInput value={this.props.sigfigs}
                             onChange={this.handleSigfigChange}
                             checkValidity={this._checkSigfigValidity}
                             useArrowKeys />
            </div>

            <div>
                <label>
                    <input type="radio"
                           name={this.groupId}
                           onChange={() => this._setAccepting(ALL)}
                           checked={this.props.accepting === ALL} />
                    {" Any equivalent unit "}
                </label>
                <label>
                    <input type="radio"
                           name={this.groupId}
                           onChange={() => this._setAccepting(SOME)}
                           checked={this.props.accepting === SOME} />
                    {" Only these units "}
                </label>
            </div>

            {acceptingElem}
        </div>;
    },

    handleAcceptingUnitsChange: function(event) {
        var acceptingUnits = event.target.value
            .split(",")
            .map(str => str.trim())
            .filter(str => str !== "");
        this.change({ acceptingUnits });
    },

    handleSigfigChange: function(sigfigs) {
        this.change({ sigfigs });
    },

    _checkSigfigValidity: function(sigfigs) {
        return sigfigs > 0 && sigfigs <= MAX_SIGFIGS;
    },

    _setAccepting: function(val) {
        this.change({ accepting: val });
    },

    componentWillMount: function() {
        this.groupId = _.uniqueId("accepting");
        this._doOriginal(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this._doOriginal(nextProps);
    },

    _doOriginal: function(props) {
        var tryParse = KAS.unitParse(props.value);
        this.parsed = false;

        // Only update this state if the unit parsed *and* it has a magnitude
        // attached to it. KAS can also parse units without magnitudes ("1.2
        // g" vs "g").
        if (tryParse.parsed && tryParse.type === "unitMagnitude") {
            this.original = tryParse.expr;
            this.parsed = true;
        }
    },

    onChange: function(event) {
        this.props.onChange({ value: event.target.value });
    },

    getSaveWarnings: function() {
        var { value, accepting, acceptingUnits } = this.props;
        var warnings = [];

        var tryParse = KAS.unitParse(value);
        if (!tryParse.parsed) {
            warnings.push("answer did not parse");
        }

        if (accepting === SOME && acceptingUnits.length === 0) {
            warnings.push("there are no accepted units");
        }

        return warnings;
    },
});

module.exports = {
    name: "unit-input",
    displayName: "Unit",
    getWidget: (enabledFeatures) => {
        // Allow toggling between the two versions of the widget
        return OldUnitInput;
    },
    editor: UnitInputEditor,
    transform: x => lens(x).del(["value"]).freeze(),
    version: { major: 0, minor: 1 },
    countSigfigs,
    sigfigPrint,
    hidden: true,
};
