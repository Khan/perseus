/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, no-redeclare, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp, space-infix-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");

var Graphie = require("../components/graphie.jsx");

var Label = Graphie.Label;
var Line = Graphie.Line;
var MovablePoint = Graphie.MovablePoint;
var MovableLine = Graphie.MovableLine;
var Plot = Graphie.Plot;
var PlotParametric = Graphie.PlotParametric;
var Point = Graphie.Point;
var Rect = Graphie.Rect;

var kvector = require("kmath").vector;

// Memoize KAS parsing
var KAShashFunc = (expr, options) => {
    options = options || {};
    var result = expr + "||" + options.decimal_separatpr + "||";
    var functions = options.functions;
    var functionsLength = functions ? functions.length : 0;
    for (var i = 0; i < functionsLength; i++) {
        result += functions[i] + "|";
    }
    return result;
};

var _parseCache = Object.create(null);
var KASparse = (expr, options) => {
    var hash = KAShashFunc(expr, options);
    var cached = _parseCache[hash];
    if (cached) {
        return cached;
    }
    cached = KAS.parse(expr, options);
    _parseCache[hash] = cached;
    return cached;
};

var _compileCache = Object.create(null);
var KAScompile = (expr, options) => {
    var hash = KAShashFunc(expr, options);
    var cached = _compileCache[hash];
    if (cached) {
        return cached;
    }
    var parsed = KAS.parse(expr, options).expr;
    cached = parsed ? parsed.compile() : function() { return 0; };
    _compileCache[hash] = cached;
    return cached;
};

var defaultInteractionProps = {
    graph: {
        box: [400, 400],
        labels: ["x", "y"],
        range: [[-10, 10], [-10, 10]],
        tickStep: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
    },
    elements: [],
};

var Interaction = React.createClass({
    mixins: [Changeable],

    // TODO(eater): Make more better
    propTypes: {
        graph: React.PropTypes.object,
        elements: React.PropTypes.arrayOf(React.PropTypes.object),
    },

    getDefaultProps: function() {
        return defaultInteractionProps;
    },

    getInitialState: function() {
        return {
            variables: this._getInitialVariables(this.props.elements),
            functions: this._getInitialFunctions(this.props.elements),
        };
    },

    _getInitialVariables: function(elements) {
        var variables = {};
        // TODO(eater): look at all this copypasta! refactor this!
        _.each(_.where(elements, {type: "movable-point"}), function(element) {
            var subscript = element.options.varSubscript;
            var startXExpr = KASparse(element.options.startX || "0").expr;
            var startYExpr = KASparse(element.options.startY || "0").expr;
            var startX = 0;
            var startY = 0;
            if (startXExpr) {
                startX = startXExpr.eval({}) || 0;
            }
            if (startYExpr) {
                startY = startYExpr.eval({}) || 0;
            }
            variables["x_" + subscript] = startX;
            variables["y_" + subscript] = startY;
        }, this);
        _.each(_.where(elements, {type: "movable-line"}), function(element) {
            var startSubscript = element.options.startSubscript;
            var endSubscript = element.options.endSubscript;
            var startXExpr = KASparse(element.options.startX || "0").expr;
            var startYExpr = KASparse(element.options.startY || "0").expr;
            var endXExpr = KASparse(element.options.endX || "0").expr;
            var endYExpr = KASparse(element.options.endY || "0").expr;
            var startX = 0;
            var startY = 0;
            var endX = 0;
            var endY = 0;
            if (startXExpr) {
                startX = startXExpr.eval({}) || 0;
            }
            if (startYExpr) {
                startY = startYExpr.eval({}) || 0;
            }
            if (endXExpr) {
                endX = endXExpr.eval({}) || 0;
            }
            if (endYExpr) {
                endY = endYExpr.eval({}) || 0;
            }
            variables["x_" + startSubscript] = startX;
            variables["y_" + startSubscript] = startY;
            variables["x_" + endSubscript] = endX;
            variables["y_" + endSubscript] = endY;
        }, this);
        _.each(_.where(elements, {type: "function"}), function(element) {
            variables[element.options.funcName] = element.options.value;
        });
        return variables;
    },

    _getInitialFunctions: function(elements) {
        return _.map(_.where(elements, {type: "function"}),
            (element) => element.options.funcName);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            variables: this._getInitialVariables(nextProps.elements),
            functions: this._getInitialFunctions(nextProps.elements),
        });
    },

    _setupGraphie: function(graphie, options) {
        graphie.graphInit(_.extend({}, options, {
            grid: _.contains(["graph", "grid"], this.props.graph.markings),
            axes: _.contains(["graph"], this.props.graph.markings),
            ticks: _.contains(["graph"], this.props.graph.markings),
            labels: _.contains(["graph"], this.props.graph.markings),
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            axisArrows: "<->",
            unityLabels: false,
        }));
        if (this.props.graph.markings === "graph") {
            var labels = this.props.graph.labels;
            var range = this.props.graph.range;
            graphie.label([0, range[1][1]], labels[1], "above");
            graphie.label([range[0][1], 0], labels[0], "right");
        }

    },

    _updatePointLocation: function(subscript, coord) {
        var variables = _.clone(this.state.variables);
        variables["x_" + subscript] = coord[0];
        variables["y_" + subscript] = coord[1];
        this.setState({variables: variables});
        this.props.trackInteraction();
    },

    _updateLineLocation: function(options, startCoord) {
        var xDiff = this._eval("(" + options.endX +
            ")-(" + options.startX + ")");
        var yDiff = this._eval("(" + options.endY +
            ")-(" + options.startY + ")");
        var endCoord = kvector.add(startCoord, [xDiff, yDiff]);
        var variables = _.clone(this.state.variables);
        variables["x_" + options.startSubscript] = startCoord[0];
        variables["y_" + options.startSubscript] = startCoord[1];
        variables["x_" + options.endSubscript] = endCoord[0];
        variables["y_" + options.endSubscript] = endCoord[1];
        this.setState({variables: variables});
        this.props.trackInteraction();
    },

    _eval: function(expression, variables) {
        var func = KAScompile(expression,
            {functions: this.state.functions});
        var compiledVars = _.extend({}, this.state.variables, variables);
        _.each(_.keys(compiledVars), (name) => {
            if (_.isString(compiledVars[name])) {
                var func = KAScompile(compiledVars[name], {
                    functions: this.state.functions,
                });
                compiledVars[name] = function(x) {
                    return func(_.extend({}, compiledVars, {
                        x: x,
                    }));
                };
            }
        });
        // Default to 0 if the expression couldn't be parsed
        return func(compiledVars) || 0;
    },

    // Return an array of all the variables in an expression
    _extractVars: function(expr) {
        if (expr == null) {
            return [];
        }
        var vars = [];
        _.each(expr.args(), function(arg) {
            if (arg && arg.constructor.name === "Expr") {
                vars = vars.concat(this._extractVars(arg));
            }
        }, this);

        if (expr.name() === "Var") {
            vars.push(expr.prettyPrint());
        }
        return vars;
    },


    render: function() {
        return <Graphie
            box={this.props.graph.box}
            range={this.props.graph.range}
            options={this.props.graph}
            setup={this._setupGraphie}
            setDrawingAreaAvailable={
                this.props.apiOptions.setDrawingAreaAvailable}
        >
            {_.map(this.props.elements, function(element, n) {
                if (element.type === "point") {
                    return <Point
                        key={element.key}
                        coord={[this._eval(element.options.coordX),
                            this._eval(element.options.coordY)]}
                        color={element.options.color}
                    />;
                } else if (element.type === "line") {
                    var start = [this._eval(element.options.startX),
                                 this._eval(element.options.startY)];
                    var end = [this._eval(element.options.endX),
                               this._eval(element.options.endY)];
                    return <Line
                        key={element.key}
                        start={start}
                        end={end}
                        style={{
                            stroke: element.options.color,
                            strokeWidth: element.options.strokeWidth,
                            strokeDasharray: element.options.strokeDasharray,
                            arrows: element.options.arrows,
                        }}
                    />;
                } else if (element.type === "movable-point") {
                    // TODO(eater): Would be nice if the constraint system
                    // were more flexible.
                    var constraints = [(coord) => {
                        var coordX =
                            Math.max(this._eval(
                                element.options.constraintXMin),
                            Math.min(this._eval(
                                element.options.constraintXMax),
                            coord[0]));
                        var coordY =
                            Math.max(this._eval(
                                element.options.constraintYMin),
                            Math.min(this._eval(
                                element.options.constraintYMax),
                            coord[1]));
                        return [coordX, coordY];
                    }];
                    if (element.options.constraint === "snap") {
                        constraints.push(MovablePoint.constraints.snap(
                            element.options.snap));
                    } else if (element.options.constraint === "x") {
                        constraints.push((coord) => {
                            return [this._eval(
                                element.options.constraintFn,
                                {y: coord[1]}), coord[1]];
                        });
                    } else if (element.options.constraint === "y") {
                        constraints.push((coord) => {
                            return [coord[0], this._eval(
                                element.options.constraintFn, {x: coord[0]})];
                        });
                    }

                    // TODO(eater): foo_[xyz] are hacky non-props to get the
                    // component to update when constraints change
                    return <MovablePoint
                        key={element.key}
                        coord={[
                            this.state.variables["x_" +
                            element.options.varSubscript],
                            this.state.variables["y_" +
                            element.options.varSubscript]]}
                        constraints={constraints}
                        foo_x={element.options.constraint}
                        foo_y={element.options.constraintFn}
                        foo_z={element.options.snap}
                        onMove={_.partial(this._updatePointLocation,
                            element.options.varSubscript)}
                    />;
                } else if (element.type === "movable-line") {
                    // TODO(eater): Would be nice if the constraint system
                    // were more flexible.
                    // TODO(eater): Don't duplicate this code from
                    // movable-point above
                    var constraints = [(coord) => {
                        var coordX =
                            Math.max(this._eval(
                                element.options.constraintXMin),
                            Math.min(this._eval(
                                element.options.constraintXMax),
                            coord[0]));
                        var coordY =
                            Math.max(this._eval(
                                element.options.constraintYMin),
                            Math.min(this._eval(
                                element.options.constraintYMax),
                            coord[1]));
                        return [coordX, coordY];
                    }];
                    if (element.options.constraint === "snap") {
                        constraints.push(MovablePoint.constraints.snap(
                            element.options.snap));
                    } else if (element.options.constraint === "x") {
                        constraints.push((coord) => {
                            return [this._eval(
                                element.options.constraintFn,
                                {y: coord[1]}), coord[1]];
                        });
                    } else if (element.options.constraint === "y") {
                        constraints.push((coord) => {
                            return [coord[0], this._eval(
                                element.options.constraintFn,
                                {x: coord[0]})];
                        });
                    }
                    var start = [
                        this.state.variables["x_" +
                                element.options.startSubscript],
                        this.state.variables["y_" +
                                element.options.startSubscript],
                    ];
                    var end = [
                        this.state.variables["x_" +
                                element.options.endSubscript],
                        this.state.variables["y_" +
                                element.options.endSubscript],
                    ];
                    return <MovableLine
                        key={element.key}
                        constraints={constraints}
                        onMove={_.bind(this._updateLineLocation, this,
                            element.options)}
                        foo_x={element.options.constraint}
                        foo_y={element.options.constraintFn}
                        foo_z={element.options.snap}
                    >
                            <MovablePoint coord={start}
                                static={true}
                                normalStyle={{stroke: "none", fill: "none"}} />
                            <MovablePoint coord={end}
                                static={true}
                                normalStyle={{stroke: "none", fill: "none"}} />
                        </MovableLine>;
                } else if (element.type === "function") {
                    var fn = (x) => {
                        return this._eval(element.options.value, {x: x});
                    };
                    // find all the variables referenced by this function
                    var vars = _.without(this._extractVars(
                        KASparse(element.options.value).expr), "x");
                    // and find their values, so we redraw if any change
                    var varValues = _.object(vars,
                        _.map(vars, (v) => this.state.variables[v]));

                    var range=[this._eval(element.options.rangeMin,
                        this.state.variables),
                        this._eval(element.options.rangeMax,
                        this.state.variables)];

                    return <Plot
                        key={element.key}
                        fn={fn}
                        foo_fn={element.options.value}
                        foo_varvalues={varValues}
                        range={range}
                        style={{
                            stroke: element.options.color,
                            strokeWidth: element.options.strokeWidth,
                            strokeDasharray: element.options.strokeDasharray,
                            plotPoints: 100,  // TODO(eater): why so slow?
                        }}
                    />;
                } else if (element.type === "parametric") {
                    var fn = (t) => {
                        return [
                            this._eval(element.options.x, {t: t}),
                            this._eval(element.options.y, {t: t})];
                    };
                    // find all the variables referenced by this function
                    var vars = _.without(this._extractVars(
                        KASparse(element.options.x).expr).concat(
                        this._extractVars(
                        KASparse(element.options.y).expr)), "t");
                    // and find their values, so we redraw if any change
                    var varValues = _.object(vars,
                        _.map(vars, (v) => this.state.variables[v]));

                    var range = [this._eval(element.options.rangeMin,
                        this.state.variables),
                        this._eval(element.options.rangeMax,
                        this.state.variables)];

                    return <PlotParametric
                        key={element.key}
                        fn={fn}
                        foo_fnx={element.options.x}
                        foo_fny={element.options.y}
                        foo_varvalues={varValues}
                        range={range}
                        style={{
                            stroke: element.options.color,
                            strokeWidth: element.options.strokeWidth,
                            strokeDasharray: element.options.strokeDasharray,
                            plotPoints: 100,  // TODO(eater): why so slow?
                        }}
                    />;
                } else if (element.type === "label") {
                    var coord = [this._eval(element.options.coordX),
                                 this._eval(element.options.coordY)];
                    return <Label
                        key={n + 1}
                        coord={coord}
                        text={element.options.label}
                        style={{
                            color: element.options.color,
                        }}
                    />;
                } else if (element.type === "rectangle") {
                    return <Rect
                        key={n + 1}
                        x={this._eval(element.options.coordX)}
                        y={this._eval(element.options.coordY)}
                        width={_.max([this._eval(element.options.width), 0])}
                        height={_.max([this._eval(element.options.height), 0])}
                        style={{
                            stroke: "none",
                            fill: element.options.color,
                        }}
                    />;
                }
            }, this)}
        </Graphie>;
    },

    getUserInput: function() {
        // TODO(eater): Perhaps we want to be able to record the state of the
        // user's interaction. Unfortunately sending all the props will
        // probably make the attempt payload too large. So for now, don't send
        // anything.
        return {};
    },

    simpleValidate: function(rubric) {
        return Interaction.validate(this.getUserInput(), rubric);
    },
});

_.extend(Interaction, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

module.exports = {
    name: "interaction",
    displayName: "Interaction",
    widget: Interaction,
    transform: _.identity,
};
