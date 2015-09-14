var React = require("react");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var Molecule = require("./molecule.jsx").molecule;
var NumberInput = require("../components/number-input.jsx");
var TextInput = require("../components/text-input.jsx");

var Separator = React.createClass({
    propTypes: {
        data: React.PropTypes.object,
        index: React.PropTypes.number,
    },

    arrowLength: 100,

    drawArrow: function () {
        var canvas = document.getElementById("arrowCanvas" + this.props.index);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var path = new Path2D();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        var offset = 5;
        path.moveTo(offset, canvas.height / 2);
        path.lineTo(canvas.width - offset, canvas.height / 2);
        path.moveTo(canvas.width - 2*offset, canvas.height / 2 - offset);
        path.lineTo(canvas.width - offset, canvas.height / 2);
        path.moveTo(canvas.width - 2*offset, canvas.height / 2 + offset);
        path.lineTo(canvas.width - offset, canvas.height / 2);
        ctx.stroke(path);
    },

    componentDidMount: function () {
        this.drawArrow();
    },

    componentDidUpdate: function () {
        this.drawArrow();
    },

    render: function () {
        return <div className="arrow-container">
        <div className="above-text">{this.props.data.topText}</div>
            <canvas width={this.arrowLength}
                    height="30"
                    id={"arrowCanvas" + this.props.index}>
                Reaction arrow pointing to the right.
            </canvas>
        <div className="below-text">{this.props.data.bottomText}</div>
        </div>;
    },
});

var ReactionDiagramWidget = React.createClass({
    propTypes: {
        // TODO(colin): at the moment, these must be arrays of two elements;
        // we're limited to a single reaction step.  At some point, add support
        // for more steps in the reaction.
        smiles: React.PropTypes.arrayOf(React.PropTypes.string),
        rotationAngle: React.PropTypes.arrayOf(React.PropTypes.number),
        separators: React.PropTypes.arrayOf(React.PropTypes.object),
    },

    getDefaultProps: function() {
        return {smiles: [], rotationAngle: [], separators: []};
    },

    simpleValidate: function() {
        return {type: "points", earned: 0, total: 0, message: null};
    },

    getUserInput: function() {
        return [];
    },

    validate: function(state, rubric) {
        // TODO(colin): this appears to be part of the perseus interface.
        // Figure out if there's a more appropriate value to return.
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    },

    focus: function() {

        return true;
    },

    render: function () {
        return <div className="reaction" ref="reaction">
            {_.map(this.props.smiles, function(s, i) {
                var id = this.props.widgetId + "-" + i;
                return <div key={id} className="molecule-container">
                    <Molecule smiles={s}
                              rotationAngle={this.props.rotationAngle[i]}
                              id={id} />
                    {i === this.props.smiles.length - 1 ?
                     null :
                     <Separator index={i}
                                data={this.props.separators[i]} />}
                </div>;
            }.bind(this))}
        </div>;
    },
});

var ReactionDiagramWidgetEditor = React.createClass({
    propTypes: {
        smiles: React.PropTypes.arrayOf(React.PropTypes.string),
        rotationAngle: React.PropTypes.arrayOf(React.PropTypes.number),
        separators: React.PropTypes.arrayOf(React.PropTypes.object),
    },

    getDefaultProps: function() {
        return {
            smiles: ["", ""],
            rotationAngle: [0, 0],
            separators: [{type: "right", topText: "", bottomText: ""}],
        };
    },

    mixins: [Changeable, EditorJsonify],

    updateMolecule: function(idx) {
        return function(newValue) {
            var newSmiles = _.clone(this.props.smiles);
            newSmiles[idx] = newValue;
            this.change({smiles: newSmiles});
        }.bind(this);
    },

    updateRotation: function(idx) {
        return function(newValue) {
            var newRot = _.clone(this.props.rotationAngle);
            newRot[idx] = newValue;
            this.change({rotationAngle: newRot});
        }.bind(this);
    },

    updateSeparators: function(idx, propName) {
        return function(newValue) {
            var newSep = _.map(this.props.separators, _.clone);
            newSep[idx][propName] = newValue;
            this.change({separators: newSep});
        }.bind(this);
    },

    render: function() {
        // TODO(colin): use styling instead of &nbsp hacks.
        return <div>
        <div>
            <label>LHS SMILES:&nbsp;
                <TextInput onChange={this.updateMolecule(0)}
                           value={this.props.smiles[0]} />
            </label>
        </div>
        <div>
            <label>LHS Rotation (deg):&nbsp;
                <NumberInput onChange={this.updateRotation(0)}
                             value={this.props.rotationAngle[0]} />
            </label>
        </div>
        <div>
            <label>RHS SMILES:&nbsp;
                <TextInput onChange={this.updateMolecule(1)}
                           value={this.props.smiles[1]} />
            </label>
        </div>
        <div>
            <label>RHS Rotation (deg):&nbsp;
                <NumberInput onChange={this.updateRotation(1)}
                             value={this.props.rotationAngle[1]} />
            </label>
        </div>
        <div>
            <label>Top of arrow text:&nbsp;
                <TextInput onChange={this.updateSeparators(0, "topText")}
                           value={this.props.separators[0].topText} />
            </label>
        </div>
        <div>
            <label>Bottom of arrow text:&nbsp;
                <TextInput onChange={this.updateSeparators(0, "bottomText")}
                           value={this.props.separators[0].bottomText} />
            </label>
        </div>

        </div>;
    },

});

module.exports = {
    name: "reaction-diagram",
    displayName: "Chemical reaction",
    hidden: false,
    widget: ReactionDiagramWidget,
    editor: ReactionDiagramWidgetEditor,
};
