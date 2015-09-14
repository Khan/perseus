var React = require("react");

var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var NumberInput = require("../components/number-input.jsx");
var TextInput = require("../components/text-input.jsx");

var draw = require("./molecule/molecule-drawing.js");
var layout = require("./molecule/molecule-layout.js").layout;
var SmilesParser = require("./molecule/smiles-parser.js");

var parse = SmilesParser.parse;
var ParseError = SmilesParser.ParseError;

var borderSize = 30;

var Molecule = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        smiles: React.PropTypes.string,
        rotationAngle: React.PropTypes.number,
    },

    stateFromSmiles: function(smiles) {
        try {
            this.setState({
                parsedSmiles: parse(smiles),
                error: null,
            });
        } catch(e) {
            if (e instanceof ParseError) {
                this.setState({error: e.message});
            } else {
                throw e;
            }
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.stateFromSmiles(nextProps.smiles);
    },

    componentWillMount: function() {
        this.stateFromSmiles(this.props.smiles);
    },

    componentDidMount: function() {
        this.canvasRender();
    },

    componentDidUpdate: function() {
        this.canvasRender();
    },


    getInitialState: function() {
        return { parsedSmiles: null, error: null };
    },

    setCanvasBounds: function(canvas, items) {
        var xmax = _.max(items, function(item) {
            if (! item.pos) {
                return -Infinity;
            }
            return item.pos[0];
        }).pos[0];
        var ymax = _.max(items, function(item) {
            if (! item.pos) {
                return -Infinity;
            }
            return item.pos[1];
        }).pos[1];
        var xmin = _.min(items, function(item) {
            if (! item.pos) {
                return Infinity;
            }
            return item.pos[0];
        }).pos[0];
        var ymin = _.min(items, function(item) {
            if (! item.pos) {
                return Infinity;
            }
            return item.pos[1];
        }).pos[1];
        var width = xmax - xmin + 2*borderSize;
        var height = ymax - ymin + 2*borderSize;
        canvas.width = width;
        canvas.height = height;
        return [borderSize - xmin, borderSize - ymin];
    },

    canvasRender: function() {
        // Since canvas drawing happens only through an imperative API, we sync
        // up the component with the canvas here, which happens when the component
        // mounts or updates.
        if (!!this.state.error || !this.state.parsedSmiles) { return; }
        var items = layout(this.state.parsedSmiles, this.props.rotationAngle);
        var canvas = this.refs.canvas;
        var translation = this.setCanvasBounds(canvas, items);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(translation[0], translation[1]);
        draw(ctx, items);
        ctx.restore();
    },
    render: function() {
        // TODO(colin): escape the punctuation in the SMILES alt text for
        // screen readers?
        var content = <canvas className="molecule-canvas"
                              id={this.props.id + "-molecule"}
                              ref="canvas">
            A molecular structure drawing.  SMILES notation:
            {this.props.smiles}.
        </canvas>;
        if (!!this.state.error) {
            content = <div className="error">{this.state.error}</div>;
        }
        return <div className="molecule-canvas">{content}</div>;
    },
});


var MoleculeWidget = React.createClass({
    propTypes: {
        smiles: React.PropTypes.string,
        rotationAngle: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {rotationAngle: 0};
    },

    simpleValidate: function() {
        return {type: "points", earned: 0, total: 0, message: null};
    },

    getUserInput: function() {
        return [];
    },

    validate: function(state, rubric) {
        // TODO(colin): this is here as part of the interface for a component.
        // Figure out if there is something more appropriate that this should
        // return.
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    },

    render: function () {
        return <Molecule id={this.props.widgetId}
                         smiles={this.props.smiles}
                         rotationAngle={this.props.rotationAngle} />;
    },
});

var MoleculeWidgetEditor = React.createClass({
    propTypes: {
        smiles: React.PropTypes.string,
        rotationAngle: React.PropTypes.number,
    },

    mixins: [Changeable, EditorJsonify],

    updateMolecule: function(newValue) {
        this.change({smiles: newValue});
    },

    updateRotation: function(newValue) {
        this.change({rotationAngle: newValue});
    },

    render: function() {
        return <div>
        <div>
            {/* TODO(colin): instead of nbsp hacks, use styles to get the
              * spacing right.
              */}
            <label>SMILES:&nbsp;
                <TextInput onChange={this.updateMolecule}
                           value={this.props.smiles} />
            </label>
        </div>
        <div>
            <label>Rotation (deg):&nbsp;
                <NumberInput onChange={this.updateRotation}
                             value={this.props.rotationAngle} />
            </label>
        </div>
        </div>;
    },

});

module.exports = {
    name: "molecule-renderer",
    displayName: "Molecule renderer",
    hidden: false,
    widget: MoleculeWidget,
    editor: MoleculeWidgetEditor,
    molecule: Molecule,
};
