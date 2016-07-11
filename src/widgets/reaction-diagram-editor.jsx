/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const NumberInput = require("../components/number-input.jsx");
const TextInput = require("../components/text-input.jsx");

var ReactionDiagramWidgetEditor = React.createClass({
    propTypes: {
        rotationAngle: React.PropTypes.arrayOf(React.PropTypes.number),
        separators: React.PropTypes.arrayOf(React.PropTypes.object),
        smiles: React.PropTypes.arrayOf(React.PropTypes.string),
    },

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            smiles: ["", ""],
            rotationAngle: [0, 0],
            separators: [{type: "right", topText: "", bottomText: ""}],
        };
    },

    updateMolecule: function(idx) {
        return function(newValue) {
            const newSmiles = [...this.props.smiles];
            newSmiles[idx] = newValue;
            this.change({smiles: newSmiles});
        }.bind(this);
    },

    updateRotation: function(idx) {
        return function(newValue) {
            const newRot = [...this.props.rotationAngle];
            newRot[idx] = newValue;
            this.change({rotationAngle: newRot});
        }.bind(this);
    },

    updateSeparators: function(idx, propName) {
        return (newValue) => {
            const newSep = this.props.separators.map(
                sep => {return {...sep};});
            newSep[idx][propName] = newValue;
            this.change({separators: newSep});
        };
    },

    render: function() {
        // TODO(colin): use styling instead of &nbsp hacks.
        return <div>
        <div>
            <label>LHS SMILES:&nbsp;
                <TextInput
                    onChange={this.updateMolecule(0)}
                    value={this.props.smiles[0]}
                />
            </label>
        </div>
        <div>
            <label>LHS Rotation (deg):&nbsp;
                <NumberInput
                    onChange={this.updateRotation(0)}
                    value={this.props.rotationAngle[0]}
                />
            </label>
        </div>
        <div>
            <label>RHS SMILES:&nbsp;
                <TextInput
                    onChange={this.updateMolecule(1)}
                    value={this.props.smiles[1]}
                />
            </label>
        </div>
        <div>
            <label>RHS Rotation (deg):&nbsp;
                <NumberInput
                    onChange={this.updateRotation(1)}
                    value={this.props.rotationAngle[1]}
                />
            </label>
        </div>
        <div>
            <label>Top of arrow text:&nbsp;
                <TextInput
                    onChange={this.updateSeparators(0, "topText")}
                    value={this.props.separators[0].topText}
                />
            </label>
        </div>
        <div>
            <label>Bottom of arrow text:&nbsp;
                <TextInput
                    onChange={this.updateSeparators(0, "bottomText")}
                    value={this.props.separators[0].bottomText}
                />
            </label>
        </div>

        </div>;
    },

});

module.exports = ReactionDiagramWidgetEditor;
