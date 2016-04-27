/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Interactive2 = require("../interactive2.js");
const SvgImage = require("../components/svg-image.jsx");
const Util = require("../util.js");
const ButtonGroup = require("react-components/button-group.jsx");

/* Graphie and relevant components. */
const Graphie      = require("../components/graphie.jsx");
const MovablePoint = Graphie.MovablePoint;
const MovableLine  = Graphie.MovableLine;

const knumber = require("kmath").number;
const kvector = require("kmath").vector;
const kpoint = require("kmath").point;
const KhanColors = require("../util/colors.js");

/* Mixins. */
const Changeable   = require("../mixins/changeable.jsx");

const {
    GrapherUtil,
    typeToButton,
    functionForType,
    DEFAULT_GRAPHER_PROPS,
    DEFAULT_BOX_SIZE,
} = require("./grapher/util.jsx");

function isFlipped(newCoord, oldCoord, line) {
    const CCW = (a, b, c) => {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    };
    return (CCW(line[0], line[1], oldCoord) > 0) !==
        (CCW(line[0], line[1], newCoord) > 0);
}

/* Styles */
const typeSelectorStyle = {
    padding: "5px 5px",
};

/* Graphing interface. */
const FunctionGrapher = React.createClass({
    propTypes: {
        flexibleType: React.PropTypes.bool,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        graph: React.PropTypes.any,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        model: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        static: React.PropTypes.bool,
    },

    mixins: [Changeable],

    _coords: function(props) {
        // Coords are usually based on props, but should fall back to the
        // model's default whenever they're not provided (if there's a model)
        props = props || this.props;
        const graph = props.graph;
        const defaultModelCoords = props.model &&
            GrapherUtil.maybePointsFromNormalized(props.model.defaultCoords,
                graph.range, graph.step, graph.snapStep);
        return props.coords || defaultModelCoords || null;
    },

    _asymptote: function(props) {
        // Unlike coords, asymptotes are never null; see defaultPlotProps.
        props = props || this.props;
        return props.asymptote;
    },

    getDefaultProps: function() {
        return {
            graph: {
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
            },
            coords: null,
            asymptote: null,
        };
    },

    render: function() {
        const pointForCoord = (coord, i) => {
            return <MovablePoint
                key={i}
                coord={coord}
                static={this.props.static}
                constraints={[
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap(),
                    (coord) => {
                        // Always enforce that this is a function
                        const isFunction = _.all(this._coords(),
                            (otherCoord, j) => {
                                return i === j  || !otherCoord ||
                                    !knumber.equal(coord[0], otherCoord[0]);
                            });

                        // Evaluate this criteria before per-point constraints
                        if (!isFunction) {
                            return false;
                        }

                        // Specific functions have extra per-point constraints
                        if (this.props.model &&
                                this.props.model.extraCoordConstraint) {
                            const extraConstraint =
                                this.props.model.extraCoordConstraint;
                            // Calculat resulting coords and verify that
                            // they're valid for this graph
                            const proposedCoords = _.clone(this._coords());
                            const oldCoord = _.clone(proposedCoords[i]);
                            proposedCoords[i] = coord;
                            return extraConstraint(coord, oldCoord,
                                proposedCoords, this._asymptote(),
                                this.props.graph);
                        }

                        return isFunction;
                    },
                ]}
                onMove={(newCoord, oldCoord) => {
                    let coords;
                    // Reflect over asymptote, if allowed
                    const asymptote = this._asymptote();
                    if (asymptote &&
                            this.props.model.allowReflectOverAsymptote &&
                            isFlipped(newCoord, oldCoord, asymptote)) {
                        coords = _.map(this._coords(), (coord) => {
                            return kpoint.reflectOverLine(coord, asymptote);
                        });
                    } else {
                        coords = _.clone(this._coords());
                    }
                    coords[i] = newCoord;
                    this.props.onChange({
                        coords: coords,
                    });
                }} />;
        };
        const points = _.map(this._coords(), pointForCoord);
        const box = this.props.graph.box;

        const imageDescription = this.props.graph.backgroundImage;
        let image = null;
        if (imageDescription.url) {
            const scale = box[0] / DEFAULT_BOX_SIZE;
            image = <SvgImage src={imageDescription.url}
                              width={imageDescription.width}
                              height={imageDescription.height}
                              scale={scale} />;
        }

        return <div
                    className={"perseus-widget " + "perseus-widget-grapher"}
                    style={{
                        width: box[0],
                        height: this.props.flexibleType ? "auto" : box[1],
                    }}>
                <div
                    className="graphie-container above-scratchpad"
                    style={{
                        width: box[0],
                        height: box[1],
                    }}>
                {image}
                <Graphie {...this.props.graph}>
                    {this.props.model && this.renderPlot()}
                    {this.props.model && this.renderAsymptote()}
                    {this.props.model && points}
                </Graphie>
            </div>
        </div>;
    },

    renderPlot: function() {
        const model = this.props.model;
        const xRange = this.props.graph.range[0];
        const style = { stroke: KhanColors.DYNAMIC };

        const coeffs = model.getCoefficients(this._coords(), this._asymptote());
        if (!coeffs) {
            return;
        }

        const functionProps = model.getPropsForCoeffs(coeffs, xRange);
        return <model.Movable
                    {...functionProps}
                    key={this.props.model.url}
                    range={xRange}
                    style={style} />;
    },

    renderAsymptote: function() {
        const model = this.props.model;
        const graph = this.props.graph;
        const asymptote = this._asymptote();
        const dashed = {
            strokeDasharray: "- ",
        };
        return asymptote &&
            <MovableLine onMove={(newCoord, oldCoord) => {
                // Calculate and apply displacement
                const delta = kvector.subtract(newCoord, oldCoord);
                const newAsymptote = _.map(this._asymptote(), (coord) =>
                    kvector.add(coord, delta));
                this.props.onChange({
                    asymptote: newAsymptote,
                });
            }} constraints={[
                Interactive2.MovableLine.constraints.bound(),
                Interactive2.MovableLine.constraints.snap(),
                (newCoord, oldCoord) => {
                    // Calculate and apply proposed displacement
                    const delta = kvector.subtract(newCoord, oldCoord);
                    const proposedAsymptote = _.map(this._asymptote(),
                        (coord) => kvector.add(coord, delta));
                    // Verify that resulting asymptote is valid for graph
                    if (model.extraAsymptoteConstraint) {
                        return model.extraAsymptoteConstraint(newCoord,
                            oldCoord, this._coords(), proposedAsymptote,
                            graph);
                    }
                    return true;
                },
            ]} normalStyle={dashed}
                highlightStyle={dashed}>
                {_.map(asymptote, (coord) =>
                    <MovablePoint coord={coord}
                        static={true}
                        draw={null}
                        extendLine={true} />
                )}
        </MovableLine>;
    },
});

/* Widget and editor. */
const Grapher = React.createClass({
    propTypes: {
        availableTypes: React.PropTypes.arrayOf(React.PropTypes.string),
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        graph: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        plot: React.PropTypes.any,
        static: React.PropTypes.bool,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return DEFAULT_GRAPHER_PROPS;
    },

    render: function() {
        const type = this.props.plot.type;
        const coords = this.props.plot.coords;
        const asymptote = this.props.plot.asymptote;

        const typeSelector = <div style={typeSelectorStyle}
                className="above-scratchpad">
            <ButtonGroup
                value={type}
                allowEmpty={true}
                buttons={_.map(this.props.availableTypes, typeToButton)}
                onChange={this.handleActiveTypeChange} />
        </div>;

        const box = this.props.graph.box;

        // Calculate additional graph properties so that the same values are
        // passed in to both FunctionGrapher and Graphie.
        const options = _.extend({}, this.props.graph,
            GrapherUtil.getGridAndSnapSteps(this.props.graph));
        _.extend(options, {
            gridConfig: this._getGridConfig(options),
        });

        // The `graph` prop will eventually be passed to the <Graphie>
        // component. In fact, if model is `null`, this is functionalliy
        // identical to a <Graphie>. Otherwise, some points and a plot will be
        // overlayed.
        const grapherProps = {
            graph: {
                box: box,
                range: options.range,
                step: options.step,
                snapStep: options.snapStep,
                backgroundImage: options.backgroundImage,
                options: options,
                setup: this._setupGraphie,
            },
            onChange: this.handlePlotChanges,
            model: type && functionForType(type),
            coords: coords,
            asymptote: asymptote,
            static: this.props.static,
        };

        return <div>
            <FunctionGrapher {...grapherProps} />
            {this.props.availableTypes.length > 1 && typeSelector}
        </div>;
    },

    handlePlotChanges: function(newPlot) {
        const plot = _.extend({}, this.props.plot, newPlot);
        this.props.onChange({
            plot: plot,
        });
        this.props.trackInteraction();
    },

    handleActiveTypeChange: function(newType) {
        const graph = this.props.graph;
        const plot = _.extend({}, this.props.plot,
            GrapherUtil.defaultPlotProps(newType, graph));
        this.props.onChange({
            plot: plot,
        });
    },

    _getGridConfig: function(options) {
        return _.map(options.step, function(step, i) {
            return Util.gridDimensionConfig(
                    step,
                    options.range[i],
                    options.box[i],
                    options.gridStep[i]);
        });
    },

    _setupGraphie: function(graphie, options) {
        if (options.markings === "graph") {
            graphie.graphInit({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function(s) { return "\\small{" + s + "}"; },
                gridStep: options.gridStep,
                snapStep: options.snapStep,
                tickStep: _.pluck(options.gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(options.gridConfig, "unityLabel"),
            });
            graphie.label([0, options.range[1][1]], options.labels[1],
                "above");
            graphie.label([options.range[0][1], 0], options.labels[0],
                "right");
        } else if (options.markings === "grid") {
            graphie.graphInit({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
                gridStep: options.gridStep,
                axes: false,
                ticks: false,
                labels: false,
            });
        } else if (options.markings === "none") {
            graphie.init({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
            });
        }
    },

    simpleValidate: function(rubric) {
        return GrapherUtil.validate(this.getUserInput(), rubric);
    },

    getUserInput: function() {
        return this.props.plot;
    },

    focus: $.noop,
});

const propTransform = (editorProps) => {
    const widgetProps = _.pick(editorProps, "availableTypes");
    widgetProps.graph = _.extend(editorProps.graph, {
        box: [DEFAULT_BOX_SIZE, DEFAULT_BOX_SIZE],
    });

    // If there's only one type, the graph type is deterministic
    if (widgetProps.availableTypes.length === 1) {
        const graph = widgetProps.graph;
        const type = GrapherUtil.chooseType(widgetProps.availableTypes);
        widgetProps.plot = GrapherUtil.defaultPlotProps(type, graph);
    }

    return widgetProps;
};

// Note that in addition to the standard staticTransform, in static
// mode we set static=true for the graph's handles in FunctionGrapher.
const staticTransform = (editorProps) => {
    return _.extend({}, propTransform(editorProps), {
        // Don't display graph type choices if we're in static mode
        availableTypes: [editorProps.correct.type],
        // Display the same graph marked as correct in the widget editor.
        plot: editorProps.correct,
    });
};

module.exports = {
    name: "grapher",
    displayName: "Grapher",
    widget: Grapher,
    transform: propTransform,
    staticTransform: staticTransform,
};
