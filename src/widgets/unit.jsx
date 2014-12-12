// TODO(joel): teach KAS how to accept an answer only if it's expressed in
// terms of a certain type.
// TODO(joel): Allow sigfigs within a range rather than an exact expected
// value?
// TODO(joel): numerical inaccuracy: 12.4 lb is shown as equivalent to 5x10^5 N

var _ = require("underscore");
var lens = require("../../hubble/index.js");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var NumberInput = require("../components/number-input.jsx");
var { SignificantFigures, displaySigFigs } = require("../sigfigs.jsx");

var acceptAllStr = "Any equivalent unit";
var acceptSomeStr = "Only these units";

var countSigfigs = function(value) {
    return new SignificantFigures(value).sigFigs;
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
        value: React.PropTypes.string.isRequired,
    },

    // TODO(joel) think about showing the error buddy
    render: function() {
        return <div className="old-unit-input">
            <input onChange={this.handleChange}
                   value={this.props.value}
                   onBlur={this.handleBlur} />
            <div ref="error"
                 className="error"
                 style={{display: "none"}}>
                <$_>I don't understand that</$_>
            </div>
        </div>;
    },

    _errorTimeout: null,

    _showError: function() {
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
        clearTimeout(this._errorTimeout);
        if (!KAS.unitParse(this.props.value).parsed) {
            this._showError();
        }
    },

    handleChange: function(event) {
        this.props.onChange({ value: event.target.value });
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() {};
        return OldUnitInput.validate(this.getUserInput(), rubric);
    },

    getUserInput: function() {
        return this.props.value;
    },

    statics: {
        displayMode: "inline-block",
    }
});

// Extract the primitive units from a unit expression. This simplified doesn to
// something like "5 kg m / s^2" then removes the first term (taking advantage
// of the property that the coefficient moves to the front).
var primUnits = function(expr) {
    var unitTerms = lens(expr.simplify().terms).del([0]).freeze();
    var unit = unitTerms.length === 1 ? unitTerms[0] : new KAS.Mul(unitTerms);
    return unit.simplify();
};

_.extend(OldUnitInput, {
    validate: function(state, rubric) {
        var answer = KAS.unitParse(rubric.value);
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

        var simplifiedGuess = guess.expr.simplify();
        var guessNumeric = simplifiedGuess.terms[0].eval();
        var guessUnit = primUnits(simplifiedGuess);

        var simplifiedAnswer = answer.expr.simplify();
        var answerNumeric = simplifiedAnswer.terms[0].eval();
        var answerUnit = primUnits(simplifiedAnswer);

        // now we need to check that the answer is correct to the precision we
        // require.
        var numericallyCorrect =
            Number(answerNumeric).toPrecision(sigfigs) ===
            Number(guessNumeric).toPrecision(sigfigs);
        if (!numericallyCorrect) {
            message = $._("That answer is numerically incorrect.");
        }

        var kasCorrect;
        if (rubric.accepting === "all") {
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
        if (this.state.parsed) {
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

    componentWillReceiveProps: function(nextprops) {
        this._checkParse(nextprops);
    },

    componentWillMount: function() {
        this._checkParse(this.props);
    },

    _checkParse: function({ name, original, sigfigs }) {
        var parseResult = KAS.unitParse(name);
        var solvedExample = "";

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
                solvedExample = Number(answer.eval()).toPrecision(sigfigs);
            } catch (e) {
                // ignore
            }
        }
        this.setState({
            parsed: parseResult.parsed,
            solvedExample,
        });
    },
});

var UnitInputEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        value: React.PropTypes.string,
        acceptingUnits: React.PropTypes.arrayOf(React.PropTypes.string),
        accepting: React.PropTypes.oneOf(["all", "some"]),
        sigfigs: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            value: "5x10^5 kg m / s^2",
            accepting: "all",
            sigfigs: 3
        };
    },

    render: function() {
        var { acceptingUnits, accepting } = this.props;
        acceptingUnits = acceptingUnits || [];
        var acceptingElem = null;
        if (accepting === "some") {
            var unitsArr = acceptingUnits.map(name =>
                <UnitExample name={name}
                             original={this.original || null}
                             sigfigs={this.props.sigfigs} />
            );
            acceptingElem = <div>
                <input
                    type="text"
                    value={acceptingUnits.join(", ")}
                    onChange={this.handleAcceptingUnitsChange}
                />
                {" "}(comma-separated)
                {unitsArr}
            </div>;
        }

        return <div>
            <input value={this.props.value}
                   onBlur={this._handleBlur}
                   onKeyPress={this._handleBlur}
                   onChange={this.onChange} />
            <br />
            Significant Figures:{" "}
            <NumberInput value={this.props.sigfigs}
                         onChange={this.handleSigfigChange}
                         checkValidity={this._checkSigfigValidity}
                         useArrowKeys />
            <br />
            <input type="radio"
                   name="accepting"
                   value={acceptAllStr}
                   onChange={() => this._setAccepting("all")}
                   checked={this.props.accepting === "all"} />
            <a href="javascript: void 0;"
               className="unit-radio"
               onClick={() => this._setAccepting("all")}>
               {" "}{acceptAllStr}
            </a>
            <br />
            <input type="radio"
                   name="accepting"
                   value={acceptSomeStr}
                   onChange={() => this._setAccepting("some")}
                   checked={this.props.accepting === "some"} />
            <a href="javascript: void 0;"
               className="unit-radio"
               onClick={() => this._setAccepting("some")}>
               {" "}{acceptSomeStr}
            </a>
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
        return sigfigs > 0 && sigfigs <= 10;
    },

    _setAccepting: function(val) {
        this.change({ accepting: val });
    },

    componentWillMount: function() {
        this._doOriginal();
    },

    componentWillReceiveProps: function() {
        this._doOriginal();
    },

    _doOriginal: function() {
        var tryParse = KAS.unitParse(this.props.value);
        if (tryParse.parsed) {
            this.original = tryParse.expr;
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

        if (accepting === "some") {
            if (acceptingUnits.length === 0) {
                warnings.push("there are no accepted units");
            }
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
    transform: x => x,
    version: { major: 0, minor: 1 },
    countSigfigs,
    hidden: true,
};
