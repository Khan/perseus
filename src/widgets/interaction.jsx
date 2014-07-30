/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var ElementContainer = require("./interaction/element-container.jsx");
var Graphie = require("../components/graphie.jsx");
var GraphSettings = require("../components/graph-settings.jsx");


var Interaction = React.createClass({
    mixins: [JsonifyProps, Changeable],

    // TODO(eater): Make more better
    propTypes: {
        graph: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {};
    },

    _setupGraphie: function(graphie, options) {
        graphie.graphInit(_.extend({}, options, {
            grid: _.contains(["graph", "grid"], this.props.graph.markings),
            axes: _.contains(["graph"], this.props.graph.markings),
            ticks: _.contains(["graph"], this.props.graph.markings),
            labels: _.contains(["graph"], this.props.graph.markings),
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            axisArrows: "<->",
            unityLabels: false
        }));
        if (this.props.graph.markings === "graph") {
            var labels = this.props.graph.labels;
            var range = this.props.graph.range;
            graphie.label([0, range[1][1]], labels[1], "above");
            graphie.label([range[0][1], 0], labels[0], "right");
        }

    },

    render: function() {
        return <Graphie
                box={this.props.graph.box}
                range={this.props.graph.range}
                options={this.props.graph}
                setup={this._setupGraphie}>
        </Graphie>;
    },

    simpleValidate: function(rubric) {
        return Interaction.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


_.extend(Interaction, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});


var InteractionEditor = React.createClass({
    mixins: [JsonifyProps, Changeable],

    // TODO(eater): Make more better
    propTypes: {
        graph: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            graph: {
                box: [400, 400],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                tickStep: [1, 1],
                gridStep: [1, 1],
                markings: "graph",
            }
        };
    },

    _updateGraphProps: function(newProps) {
        // TODO(eater): GraphSettings should name this tickStep instead
        // of step. Grr..
        this.change({
            graph: _.extend(_.omit(newProps, "step"), {
                    tickStep: newProps.step
                })
        });
    },

    _addNewElement: function(e) {
        var elementType = e.target.value;
        if (elementType === "") {
            return;
        }
        e.target.value = "";
        // TODO(eater): something here
    },

    render: function() {
        return <div className="perseus-widget-interaction-editor">
            <ElementContainer title="Grid settings">
                <GraphSettings
                    editableSettings={["canvas", "graph"]}
                    box={this.props.graph.box}
                    labels={this.props.graph.labels}
                    range={this.props.graph.range}
                    step={this.props.graph.tickStep /*TODO(eater): grr names*/}
                    gridStep={this.props.graph.gridStep}
                    markings={this.props.graph.markings}
                    onChange={this._updateGraphProps} />
                {(this.props.graph.valid === true) || <div>
                    {this.props.graph.valid}
                </div>}
            </ElementContainer>
            <div className="perseus-widget-interaction-editor-select-element">
                <select onChange={this._addNewElement}>
                    <option value="">Add an element{"\u2026"}</option>
                    <option disabled>--</option>
                    <option value="point">Point</option>
                </select>
            </div>
        </div>;
    }
});


module.exports = {
    name: "interaction",
    displayName: "Interaction",
    widget: Interaction,
    editor: InteractionEditor,
    transform: _.identity
};
