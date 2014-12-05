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

var UnitInputEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        value: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            value: "5x10^5 kg m / s^2",
        };
    },

    render: function() {
        return <input value={this.props.value}
                      onChange={this.onChange} />;
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
