const React = require("react");

const Molecule = require("./molecule.jsx").molecule;

const Separator = React.createClass({
    propTypes: {
        // TODO(colin): figure out and add shape.
        data: React.PropTypes.any,
        index: React.PropTypes.number,
    },

    componentDidMount: function() {
        this.drawArrow();
    },

    componentDidUpdate: function() {
        this.drawArrow();
    },

    arrowLength: 100,

    drawArrow: function() {
        const canvas = this.refs["arrowCanvas" + this.props.index];
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const path = new Path2D();
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        const offset = 5;
        path.moveTo(offset, canvas.height / 2);
        path.lineTo(canvas.width - offset, canvas.height / 2);
        path.moveTo(canvas.width - 2 * offset, canvas.height / 2 - offset);
        path.lineTo(canvas.width - offset, canvas.height / 2);
        path.moveTo(canvas.width - 2 * offset, canvas.height / 2 + offset);
        path.lineTo(canvas.width - offset, canvas.height / 2);
        ctx.stroke(path);
    },

    render: function() {
        return <div className="arrow-container">
            <div className="above-text">{this.props.data.topText}</div>
            <canvas
                height="30"
                id={"arrowCanvas" + this.props.index}
                ref={"arrowCanvas" + this.props.index}
                width={this.arrowLength}
            >
                Reaction arrow pointing to the right.
            </canvas>
        <div className="below-text">{this.props.data.bottomText}</div>
        </div>;
    },
});

const ReactionDiagramWidget = React.createClass({
    propTypes: {
        // TODO(colin): at the moment, these must be arrays of two elements;
        // we're limited to a single reaction step.  At some point, add support
        // for more steps in the reaction.
        rotationAngle: React.PropTypes.arrayOf(React.PropTypes.number),
        separators: React.PropTypes.arrayOf(React.PropTypes.object),
        smiles: React.PropTypes.arrayOf(React.PropTypes.string),
        widgetId: React.PropTypes.string,
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
            message: null,
        };
    },

    focus: function() {
        return true;
    },

    render: function() {
        return <div className="reaction" ref="reaction">
            {this.props.smiles.map((s, i) => {
                const id = this.props.widgetId + "-" + i;
                return <div key={id} className="molecule-container">
                    <Molecule
                        id={id}
                        rotationAngle={this.props.rotationAngle[i]}
                        smiles={s}
                    />
                    {i === this.props.smiles.length - 1 ?
                     null :
                     <Separator
                         data={this.props.separators[i]}
                         index={i}
                     />}
                </div>;
            })}
        </div>;
    },
});

module.exports = {
    name: "reaction-diagram",
    displayName: "Chemical reaction",
    hidden: false,
    widget: ReactionDiagramWidget,
};
