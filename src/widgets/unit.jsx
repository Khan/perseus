// TODO: teach KAS how to accept an answer only if it's expressed in terms of a
// certain type.

var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

/* I just wrote this, but it's old by analogy to `OldExpression`, in that it's
 * the version that non-mathquill platforms get stuck with. Constructed with an
 * <input>, a parser, popsicle sticks, and glue.
 */
var OldUnitInput = React.createClass({
    mixins: [Changeable],

    propTypes: {
        value: React.PropTypes.string.isRequired,
    },

    render: function() {
        var parsed = KAS.unitParse(this.props.value);

        // STOPSHIP(joel) - display the value in a nice way (not parsed/fail)

        return <div>
            <input onChange={this.onChange}
                   value={this.props.value} />
            {parsed.parsed ? "parsed" : "fail"}
        </div>;
    },

    onChange: function(event) {
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
        displayMode: "inline-block"
    }
});

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

        // KAS does the hard work of figuring out if the units are equivalent
        var correct = KAS.compare(answer.unit.simplify(),
                                  guess.unit.simplify()).equal;

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
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
            icon = <i className="icon-ok unit-example-okay" />;
        } else {
            icon = <i className="icon-remove unit-example-not-okay" />;
        }

        return <div>
            {icon} {this.props.name}
        </div>;
    },

    componentWillReceiveProps: function({ name }) {
        this._checkParse(name);
    },

    componentWillMount: function() {
        this._checkParse(this.props.name);
    },

    _checkParse: function(name) {
        // HACK make a mode where KAS can understand a unit name in isolation
        var { parsed } = KAS.unitParse("1 " + name);
        this.setState({ parsed });
    },
});

var acceptAll = "Any equivalent unit";
var acceptSome = "Only these units";

var all = {};
var some = {};

var UnitInputEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        value: React.PropTypes.string,
    },

    getInitialState: function() {
        return {
            cachedAcceptingUnits: [],
        };
    },

    getDefaultProps: function() {
        return {
            value: "5x10^5 kg m / s^2",
            accepting: all, // XXX not externally visible
        };
    },

    render: function() {
        var { acceptingUnits, accepting } = this.props;
        acceptingUnits = acceptingUnits || "";
        var acceptingElem;
        if (accepting === some) {
            var unitsArr = acceptingUnits
                .split(",")
                .map(str => str.trim())
                .filter(str => str !== "")
                .map(name => <UnitExample name={name} />);
            acceptingElem = <div>
                <input
                    type="text"
                    value={acceptingUnits}
                    onChange={this.handleAcceptingUnitsChange}
                />
                {" "}(comma-separated)
                {unitsArr}
            </div>;
        }

        // TODO sig fig slider (KAS?)
        return <div>
            <input value={this.props.value}
                   onBlur={this._handleBlur}
                   onKeyPress={this._handleBlur}
                   onChange={this.onChange} />
            <br />
            <input type="radio"
                   name="accepting"
                   value={acceptAll}
                   onChange={() => this._setAccepting(all)}
                   checked={this.props.accepting === all} />
            <a href="javascript: void 0;"
               className="unit-radio"
               onClick={() => this._setAccepting(all)}>
               {" "}{acceptAll}
            </a>
            <br />
            <input type="radio"
                   name="accepting"
                   value={acceptSome}
                   onChange={() => this._setAccepting(some)}
                   checked={this.props.accepting === some} />
            <a href="javascript: void 0;"
               className="unit-radio"
               onClick={() => this._setAccepting(some)}>
               {" "}{acceptSome}
            </a>
            {acceptingElem}
        </div>;
    },

    handleAcceptingUnitsChange: function(event) {
        this.change({ acceptingUnits: event.target.value });
    },

    _setAccepting: function(val) {
        this.change({ accepting: val });
    },

    onChange: function(event) {
        this.props.onChange({ value: event.target.value });
    },

    getSaveWarnings: function() {
        var tryParse = KAS.unitParse(this.props.value);
        return tryParse.parsed ? [] : ["answer did not parse"];
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
};
