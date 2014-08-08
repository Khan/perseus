/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var NumberInput = require("../components/number-input.jsx");

var EN_DASH = "\u2013";

var PassageRef = React.createClass({
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            passageNumber: 1,
            referenceNumber: 1
        };
    },

    getInitialState: function() {
        return {
            lineRange: null
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState);
    },

    render: function() {
        var lineRange = this.state.lineRange;
        if (!lineRange) {
            return <span>
                lines ?{EN_DASH}?
            </span>;
        }

        if (lineRange[0] === lineRange[1]) {
            return <span>
                line {lineRange[0]}
            </span>;
        }

        return <span>
            lines {lineRange[0]}{EN_DASH}{lineRange[1]}
        </span>;
    },

    componentDidMount: function() {
        _.defer(this._updateRange);
    },

    componentDidUpdate: function() {
        _.defer(this._updateRange);
    },

    _updateRange: function() {
        var passage = this.props.interWidgets(
                "passage " + this.props.passageNumber)[0];

        var range = null;
        if (passage) {
            range = passage.getReference(this.props.referenceNumber);
        }

        this.setState({
            lineRange: range
        });
    },

    simpleValidate: function(rubric) {
        return PassageRef.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "inline"
    }
});

_.extend(PassageRef, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

var PassageRefEditor = React.createClass({
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            passageNumber: 1,
            referenceNumber: 1
        };
    },

    render: function() {
        return <div>
            <div>
                Passage Number:
                <NumberInput
                    value={this.props.passageNumber}
                    onChange={this.change("passageNumber")} />
            </div>
            <div>
                Reference Number:
                <NumberInput
                    value={this.props.referenceNumber}
                    onChange={this.change("referenceNumber")} />
            </div>
        </div>;
    }
});

module.exports = {
    name: "passage-ref",
    displayName: "PassageRef",
    widget: PassageRef,
    editor: PassageRefEditor,
    transform: (editorProps) => {
        return _.pick(editorProps, "passageNumber", "referenceNumber");
    },
    version: {major: 0, minor: 0}
};
