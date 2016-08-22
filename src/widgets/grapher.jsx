/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, indent, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var Interactive2 = require("../interactive2.js");
var SvgImage = require("../components/svg-image.jsx");
var Util = require("../util.js");
var ButtonGroup = require("react-components/button-group.jsx");

/* Graphie and relevant components. */
var Graphie      = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;
var MovableLine  = Graphie.MovableLine;
const WrappedLine = require("../interactive2/wrapped-line.js");

var knumber = require("kmath").number;
var kvector = require("kmath").vector;
var kpoint = require("kmath").point;
const KhanColors = require("../util/colors.js");
const { containerSizeClassPropType } = require("../util/sizing-utils.js");
const { interactiveSizes } = require("../styles/constants.js");
const { getInteractiveBoxFromSizeClass } = require("../util/sizing-utils.js");

/* Mixins. */
var Changeable   = require("../mixins/changeable.jsx");

const {
    GrapherUtil,
    typeToButton,
    functionForType,
    DEFAULT_GRAPHER_PROPS,
} = require("./grapher/util.jsx");

function isFlipped(newCoord, oldCoord, line) {
    var CCW = (a, b, c) => {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    };
    return (CCW(line[0], line[1], oldCoord) > 0) !==
        (CCW(line[0], line[1], newCoord) > 0);
}

/* Styles */
var typeSelectorStyle = {
    padding: "5px 5px"
};

/* Graphing interface. */
var FunctionGrapher = React.createClass({
    mixins: [Changeable],

    _coords: function(props) {
        // Coords are usually based on props, but should fall back to the
        // model's default whenever they're not provided (if there's a model)
        props = props || this.props;
        var graph = props.graph;
        var defaultModelCoords = props.model &&
            GrapherUtil.maybePointsFromNormalized(props.model.defaultCoords,
                graph.range, graph.step, graph.snapStep);
        return props.coords || defaultModelCoords || null;
    },

    _asymptote: function(props) {
        // Unlike coords, asymptotes are never null; see defaultPlotProps.
        props = props || this.props;
        return props.asymptote;
    },

    propTypes: {
        flexibleType: React.PropTypes.bool,
        graph: React.PropTypes.any,
        hideHairlines: React.PropTypes.func,
        isMobile: React.PropTypes.bool,
        model: React.PropTypes.any,
        onChange: React.PropTypes.func,
        setDrawingAreaAvailable: React.PropTypes.func,
        showHairlines: React.PropTypes.func,
        showTooltips: React.PropTypes.bool,
        static: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            graph: {
                range: [[-10, 10], [-10, 10]],
                step: [1, 1]
            },
            coords: null,
            asymptote: null,
            isMobile: false,
        };
    },

    render: function() {
        var pointForCoord = (coord, i) => {
            return <MovablePoint
                key={i}
                coord={coord}
                static={this.props.static}
                constraints={[
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap(),
                    (coord) => {
                        // Always enforce that this is a function
                        var isFunction = _.all(this._coords(),
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
                            var extraConstraint =
                                this.props.model.extraCoordConstraint;
                            // Calculat resulting coords and verify that
                            // they're valid for this graph
                            var proposedCoords = _.clone(this._coords());
                            var oldCoord = _.clone(proposedCoords[i]);
                            proposedCoords[i] = coord;
                            return extraConstraint(coord, oldCoord,
                                proposedCoords, this._asymptote(),
                                this.props.graph);
                        }

                        return isFunction;
                    }
                ]}
                onMove={(newCoord, oldCoord) => {
                    var coords;
                    // Reflect over asymptote, if allowed
                    var asymptote = this._asymptote();
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
                        coords: coords
                    });
                }}
                showHairlines={this.props.showHairlines}
                hideHairlines={this.props.hideHairlines}
                showTooltips={this.props.showTooltips}
                isMobile={this.props.isMobile}
            />;
        };
        var points = _.map(this._coords(), pointForCoord);
        var box = this.props.graph.box;

        var imageDescription = this.props.graph.backgroundImage;
        var image = null;
        if (imageDescription.url) {
            var scale = box[0] / interactiveSizes.defaultBoxSize;
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
                        boxSizing: "initial"
                    }}>
                <div
                    className="graphie-container above-scratchpad"
                    style={{
                        width: box[0],
                        height: box[1]
                    }}>
                {image}
                <Graphie
                    {...this.props.graph}
                    setDrawingAreaAvailable={this.props.setDrawingAreaAvailable}
                >
                    {this.props.model && this.renderPlot()}
                    {this.props.model && this.renderAsymptote()}
                    {this.props.model && points}
                </Graphie>
            </div>
        </div>;
    },

    renderPlot: function() {
        var model = this.props.model;
        var xRange = this.props.graph.range[0];
        var style = {
            stroke: this.props.isMobile ? KhanColors.BLUE_C :
                KhanColors.DYNAMIC,
            ...(this.props.isMobile ? {"stroke-width": 3} : {}),
        };

        var coeffs = model.getCoefficients(this._coords(), this._asymptote());
        if (!coeffs) {
            return;
        }

        var functionProps = model.getPropsForCoeffs(coeffs, xRange);
        return <model.Movable
                    {...functionProps}
                    key={this.props.model.url}
                    range={xRange}
                    style={style} />;
    },

    renderAsymptote: function() {
        var model = this.props.model;
        var graph = this.props.graph;
        var asymptote = this._asymptote();
        var dashed = {
            strokeDasharray: "- "
        };
        return asymptote &&
            <MovableLine onMove={(newCoord, oldCoord) => {
                // Calculate and apply displacement
                var delta = kvector.subtract(newCoord, oldCoord);
                var newAsymptote = _.map(this._asymptote(), (coord) =>
                    kvector.add(coord, delta));
                this.props.onChange({
                    asymptote: newAsymptote
                });
            }} constraints={[
                Interactive2.MovableLine.constraints.bound(),
                Interactive2.MovableLine.constraints.snap(),
                (newCoord, oldCoord) => {
                    // Calculate and apply proposed displacement
                    var delta = kvector.subtract(newCoord, oldCoord);
                    var proposedAsymptote = _.map(this._asymptote(), (coord) =>
                        kvector.add(coord, delta));
                    // Verify that resulting asymptote is valid for graph
                    if (model.extraAsymptoteConstraint) {
                        return model.extraAsymptoteConstraint(newCoord,
                            oldCoord, this._coords(), proposedAsymptote,
                            graph);
                    }
                    return true;
            }]} normalStyle={dashed}
                highlightStyle={dashed}>
                {_.map(asymptote, (coord, i) =>
                    <MovablePoint
                        key={`asymptoteCoord-${i}`}
                        coord={coord}
                        static={true}
                        draw={null}
                        extendLine={true}
                        showHairlines={this.props.showHairlines}
                        hideHairlines={this.props.hideHairlines}
                        showTooltips={this.props.showTooltips}
                        isMobile={this.props.isMobile}
                    />
                )}
        </MovableLine>;
    }
});

/* Widget and editor. */
var Grapher = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.any,
        availableTypes: React.PropTypes.arrayOf(React.PropTypes.any),
        containerSizeClass: containerSizeClassPropType.isRequired,
        graph: React.PropTypes.any,
        markings: React.PropTypes.string,
        onChange: React.PropTypes.func,
        plot: React.PropTypes.any,
        static: React.PropTypes.bool,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return DEFAULT_GRAPHER_PROPS;
    },

    render: function() {
        var type = this.props.plot.type;
        var coords = this.props.plot.coords;
        var asymptote = this.props.plot.asymptote;

        var typeSelector = <div style={typeSelectorStyle}
                className="above-scratchpad">
            <ButtonGroup
                value={type}
                allowEmpty={true}
                buttons={_.map(this.props.availableTypes, typeToButton)}
                onChange={this.handleActiveTypeChange} />
        </div>;

        const box = getInteractiveBoxFromSizeClass(
                this.props.containerSizeClass);

        // Calculate additional graph properties so that the same values are
        // passed in to both FunctionGrapher and Graphie.
        const options = {
            ...this.props.graph,
            ...GrapherUtil.getGridAndSnapSteps(this.props.graph, box[0]),
            gridConfig: this._getGridConfig({
                ...this.props.graph,
                box: box,
                ...GrapherUtil.getGridAndSnapSteps(this.props.graph, box[0]),
            }),
        };

        // The `graph` prop will eventually be passed to the <Graphie>
        // component. In fact, if model is `null`, this is functionalliy
        // identical to a <Graphie>. Otherwise, some points and a plot will be
        // overlayed.
        var grapherProps = {
            graph: {
                box: box,
                range: options.range,
                step: options.step,
                snapStep: options.snapStep,
                backgroundImage: options.backgroundImage,
                options: options,
                setup: this._setupGraphie
            },
            onChange: this.handlePlotChanges,
            model: type && functionForType(type),
            coords: coords,
            asymptote: asymptote,
            static: this.props.static,
            setDrawingAreaAvailable:
                this.props.apiOptions.setDrawingAreaAvailable,
            isMobile: this.props.apiOptions.isMobile,
            showTooltips: this.props.graph.showTooltips,
            showHairlines: this.showHairlines,
            hideHairlines: this.hideHairlines,
        };

        return <div>
            <FunctionGrapher {...grapherProps} />
            {this.props.availableTypes.length > 1 && typeSelector}
        </div>;
    },

    handlePlotChanges: function(newPlot) {
        var plot = _.extend({}, this.props.plot, newPlot);
        this.props.onChange({
            plot: plot
        });
        this.props.trackInteraction();
    },

    handleActiveTypeChange: function(newType) {
        var graph = this.props.graph;
        var plot = _.extend({}, this.props.plot,
            GrapherUtil.defaultPlotProps(newType, graph));
        this.props.onChange({
            plot: plot
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
        const isMobile = this.props.apiOptions.isMobile;
        if (options.markings === "graph") {
            graphie.graphInit({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function(s) { return "\\small{" + s + "}"; },
                gridStep: options.gridStep,
                snapStep: options.snapStep,
                tickStep: isMobile ? [2, 2] :
                    _.pluck(options.gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(options.gridConfig, "unityLabel"),
                isMobile: isMobile,
            });
            graphie.label([0, options.range[1][1]], options.labels[1],
                isMobile ? "below right" : "above");
            graphie.label([options.range[0][1], 0], options.labels[0],
                isMobile ? "above left" : "right");
        } else if (options.markings === "grid") {
            graphie.graphInit({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
                gridStep: options.gridStep,
                axes: false,
                ticks: false,
                labels: false,
                isMobile: isMobile,
            });
        } else if (options.markings === "none") {
            graphie.init({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale")
            });
        }

        if (this.props.apiOptions.isMobile) {
            const hairlineStyle = {
                normalStyle: {
                    strokeWidth: 1,
                },
            };

            this.horizHairline =
                new WrappedLine(graphie, [0, 0], [0, 0], hairlineStyle);
            this.horizHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.horizHairline.hide();

            this.vertHairline =
                new WrappedLine(graphie, [0, 0], [0, 0], hairlineStyle);
            this.vertHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.vertHairline.hide();
        }
    },

    showHairlines: function(point) {
        if (this.props.apiOptions.isMobile &&
            this.props.markings !== "none") {
            // Hairlines are already initialized when the graph is loaded, so
            // here we just move them to the updated location and make them
            // visible.
            this.horizHairline.moveTo(
                [this.props.graph.range[0][0], point[1]],
                [this.props.graph.range[0][1], point[1]]
            );

            this.horizHairline.show();

            this.vertHairline.moveTo(
                [point[0], this.props.graph.range[1][0]],
                [point[0], this.props.graph.range[1][1]]
            );

            this.vertHairline.show();
        }
    },

    hideHairlines: function() {
        if (this.props.apiOptions.isMobile) {
            this.horizHairline.hide();
            this.vertHairline.hide();
        }
    },

    simpleValidate: function(rubric) {
        return GrapherUtil.validate(this.getUserInput(), rubric);
    },

    getUserInput: function() {
        return this.props.plot;
    },

    focus: $.noop
});

var propTransform = (editorProps) => {
    var widgetProps = {
        availableTypes: editorProps.availableTypes,
        graph: editorProps.graph
    };

    // If there's only one type, the graph type is deterministic
    if (widgetProps.availableTypes.length === 1) {
        var graph = widgetProps.graph;
        var type = GrapherUtil.chooseType(widgetProps.availableTypes);
        widgetProps.plot = GrapherUtil.defaultPlotProps(type, graph);
    }

    return widgetProps;
};

// Note that in addition to the standard staticTransform, in static
// mode we set static=true for the graph's handles in FunctionGrapher.
var staticTransform = (editorProps) => {
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
