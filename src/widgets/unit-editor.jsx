/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

// TODO(joel): teach KAS how to accept an answer only if it's expressed in
// terms of a certain type.
// TODO(joel): Allow sigfigs within a range rather than an exact expected
// value?

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const InlineIcon = require("../components/inline-icon.jsx");
const NumberInput = require("../components/number-input.jsx");

const {iconOk, iconRemove} = require("../icon-paths.js");
const {displaySigFigs} = require("../sigfigs.jsx");

const ALL = "all";
const SOME = "some";
const MAX_SIGFIGS = 10;


var sigfigPrint = function(num, sigfigs) {
    return displaySigFigs(num, sigfigs, -MAX_SIGFIGS, false);
};

// Extract the primitive units from a unit expression. This first simplifies
// `expr` to a `Mul` like "5 kg m / s^2" then removes the first term.
var primUnits = function(expr) {
    return expr.simplify().asMul().partition()[1].flatten().simplify();
};

// Show the name of a unit and whether it's recognized by KAS.
//
// In the future I plan for this to show an example of a thing that would be
// accepted in that unit.
var UnitExample = React.createClass({
    render: function() {
        var icon;
        if (this.state.valid) {
            icon = <span>
                <span className="unit-example-okay">
                    <InlineIcon {...iconOk} />
                </span>
                {this.state.solvedExample}
            </span>;
        } else {
            icon = <span className="unit-example-not-okay">
                <InlineIcon {...iconRemove} />
            </span>;
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

const UnitInputEditor = React.createClass({
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
            var unitsArr = acceptingUnits.map((name, i) =>
                <UnitExample name={name}
                             original={this.original || null}
                             sigfigs={this.props.sigfigs}
                             key={i} />
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
                {this.parsed
                    ? <span className="unit-example-okay">
                        <InlineIcon {...iconOk} />
                    </span>
                    : <span className="unit-example-not-okay">
                        <InlineIcon {...iconRemove} />
                    </span>
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
            warnings.push("Answer did not parse");
        }

        if (accepting === SOME && acceptingUnits.length === 0) {
            warnings.push("There are no accepted units");
        }

        return warnings;
    },
});

module.exports = UnitInputEditor;
