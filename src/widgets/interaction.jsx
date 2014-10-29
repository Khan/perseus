var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var ArrowPicker = require("./interaction/arrow-picker.jsx");
var ColorPicker = require("./interaction/color-picker.jsx");
var ConstraintEditor = require("./interaction/constraint-editor.jsx");
var DashPicker = require("./interaction/dash-picker.jsx");
var ElementContainer = require("./interaction/element-container.jsx");
var Graphie = require("../components/graphie.jsx");
var GraphSettings = require("../components/graph-settings.jsx");
var MathInput = require("../components/math-input.jsx");
var NumberInput = require("../components/number-input.jsx");
var TeX = require("react-components/tex.jsx");
var TextInput = require("../components/text-input.jsx");

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

_compileCache = Object.create(null);
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
    elements: []
};

var Interaction = React.createClass({
    mixins: [Changeable],

    // TODO(eater): Make more better
    propTypes: {
        graph: React.PropTypes.object,
        elements: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    getDefaultProps: function() {
        return defaultInteractionProps;
    },

    getInitialState: function() {
        return {
            variables: this._getInitialVariables(this.props.elements),
            functions: this._getInitialFunctions(this.props.elements)
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
            functions: this._getInitialFunctions(nextProps.elements)
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
            unityLabels: false
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
    },

    _eval: function(expression, variables) {
        var func = KAScompile(expression,
            {functions: this.state.functions});
        var compiledVars = _.extend({}, this.state.variables, variables);
        _.each(_.keys(compiledVars), (name) => {
            if (_.isString(compiledVars[name])) {
                var func = KAScompile(compiledVars[name], {
                    functions: this.state.functions
                });
                compiledVars[name] = function(x) {
                    return func(_.extend({}, compiledVars, {
                        x: x
                    }));
                };
            }
        });
        val = func(compiledVars);
        // Default to 0 if the expression couldn't be parsed
        return val || 0;
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
                setup={this._setupGraphie}>
            {_.map(this.props.elements, function(element, n) {
                if (element.type === "point") {
                    return <Point
                        key={element.key}
                        coord={[this._eval(element.options.coordX),
                            this._eval(element.options.coordY)]}
                        color={element.options.color} />;
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
                            arrows: element.options.arrows
                        }} />;
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
                                element.options.startSubscript]
                        ];
                    var end = [
                            this.state.variables["x_" +
                                element.options.endSubscript],
                            this.state.variables["y_" +
                                element.options.endSubscript]
                        ];
                    return <MovableLine
                        key={element.key}
                        constraints={constraints}
                        onMove={_.bind(this._updateLineLocation, this,
                            element.options)}
                        foo_x={element.options.constraint}
                        foo_y={element.options.constraintFn}
                        foo_z={element.options.snap}>
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
                            plotPoints: 100  // TODO(eater): why so slow?
                        }} />;
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
                            plotPoints: 100  // TODO(eater): why so slow?
                        }} />;
                } else if (element.type === "label") {
                    var coord = [this._eval(element.options.coordX),
                                 this._eval(element.options.coordY)];
                    return <Label
                        key={n + 1}
                        coord={coord}
                        text={element.options.label}
                        style={{
                            color: element.options.color
                        }} />;
                } else if (element.type === "rectangle") {
                    return <Rect
                        key={n + 1}
                        x={this._eval(element.options.coordX)}
                        y={this._eval(element.options.coordY)}
                        width={_.max([this._eval(element.options.width), 0])}
                        height={_.max([this._eval(element.options.height), 0])}
                        style={{
                            stroke: "none",
                            fill: element.options.color
                        }} />;
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


//
// Editor for non-interactive points
//
// TODO(eater): Factor this out
//
var PointEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        coordX: React.PropTypes.string,
        coordY: React.PropTypes.string,
        color: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            coordX: "0",
            coordY: "0",
            color: KhanUtil.BLACK
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Coordinate: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordX}
                    onChange={this.change("coordX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordY}
                    onChange={this.change("coordY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                <ColorPicker
                    value={this.props.color}
                    onChange={this.change("color")} />
            </div>
        </div>;
    }
});


//
// Editor for non-interactive line segments
//
// TODO(eater): Factor this out
//
var LineEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        startX: React.PropTypes.string,
        startY: React.PropTypes.string,
        endX: React.PropTypes.string,
        endY: React.PropTypes.string,
        color: React.PropTypes.string,
        strokeDasharray: React.PropTypes.string,
        arrows: React.PropTypes.string,
        strokeWidth: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            startX: "-5",
            startY: "5",
            endX: "5",
            endY: "5",
            color: KhanUtil.BLACK,
            strokeDasharray: "",
            arrows: "",
            strokeWidth: 2
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Start: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startX}
                    onChange={this.change("startX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startY}
                    onChange={this.change("startY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                End: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.endX}
                    onChange={this.change("endX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.endY}
                    onChange={this.change("endY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                <ColorPicker
                    value={this.props.color}
                    onChange={this.change("color")} />
            </div>
            <div className="perseus-widget-row">
                <DashPicker
                    value={this.props.strokeDasharray}
                    onChange={this.change("strokeDasharray")} />
                &nbsp; &nbsp;
                <ArrowPicker
                    value={this.props.arrows}
                    onChange={this.change("arrows")} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Width: <NumberInput
                        value={this.props.strokeWidth}
                        placeholder={2}
                        onChange={this.change("strokeWidth")}/>
                </div>
            </div>
        </div>;
    }
});


//
// Editor for interactive movable points
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
var MovablePointEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        startX: React.PropTypes.string,
        startY: React.PropTypes.string,
        constraint: React.PropTypes.string,
        snap: React.PropTypes.number,
        constraintFn: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            startX: "0",
            startY: "0",
            constraint: "none",
            snap: 0.5,
            constraintFn: "0",
            constraintXMin: "-10",
            constraintXMax: "10",
            constraintYMin: "-10",
            constraintYMax: "10"
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Start: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startX}
                    onChange={this.change("startX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startY}
                    onChange={this.change("startY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                Update <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX> <NumberInput
                    value={this.props.varSubscript}
                    placeholder={0}
                    onChange={this.change("varSubscript")}/>
            </div>
            <ConstraintEditor {...this.props} />
        </div>;
    }
});


//
// Editor for interactive movable line segments
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
var MovableLineEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        startX: React.PropTypes.string,
        startY: React.PropTypes.string,
        endX: React.PropTypes.string,
        endY: React.PropTypes.string,
        constraint: React.PropTypes.string,
        snap: React.PropTypes.number,
        constraintFn: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            startX: "-5",
            startY: "5",
            endX: "5",
            endY: "5",
            constraint: "none",
            snap: 0.5,
            constraintFn: "0",
            constraintXMin: "-10",
            constraintXMax: "10",
            constraintYMin: "-10",
            constraintYMax: "10"
        };
    },

    render: function() {
        return <div className="graph-settings">
            Initial position:
            <div className="perseus-widget-row">
                Start: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startX}
                    onChange={this.change("startX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startY}
                    onChange={this.change("startY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                End: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.endX}
                    onChange={this.change("endX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.endY}
                    onChange={this.change("endY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                Start updates <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>
                    <NumberInput
                        value={this.props.startSubscript}
                        placeholder={0}
                        onChange={this.change("startSubscript")}/>
            </div>
            <div className="perseus-widget-row">
                End updates <TeX>(x_m, y_m)</TeX> for <TeX>m =</TeX>
                    <NumberInput
                        value={this.props.endSubscript}
                        placeholder={0}
                        onChange={this.change("endSubscript")}/>
            </div>
            <div className="perseus-widget-row">
                All constraints are applied to the start point.
            </div>
            <ConstraintEditor {...this.props} />
        </div>;
    }
});


//
// Editor for function plots
//
// TODO(eater): Factor this out
//
var FunctionEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        value: React.PropTypes.string,
        rangeMin: React.PropTypes.string,
        rangeMax: React.PropTypes.string,
        color: React.PropTypes.string,
        strokeDashArray: React.PropTypes.string,
        strokeWidth: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            value: "x",
            rangeMin: "-10",
            rangeMax: "10",
            color: KhanUtil.BLUE,
            strokeDasharray: "",
            strokeWidth: 2
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                <TeX>{this.props.funcName + "(x)="}</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.value}
                    onChange={this.change("value")} />
            </div>
            <div className="perseus-widget-row">
                Range: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.rangeMin}
                    onChange={this.change("rangeMin")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.rangeMax}
                    onChange={this.change("rangeMax")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                <ColorPicker
                    value={this.props.color}
                    onChange={this.change("color")} />
            </div>
            <div className="perseus-widget-row">
                <DashPicker
                    value={this.props.strokeDasharray}
                    onChange={this.change("strokeDasharray")} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Width: <NumberInput
                        value={this.props.strokeWidth}
                        placeholder={2}
                        onChange={this.change("strokeWidth")}/>
                </div>
            </div>
        </div>;
    }
});


//
// Editor for parametric plots
//
// TODO(eater): Factor this out
//
var ParametricEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        x: React.PropTypes.string,
        y: React.PropTypes.string,
        rangeMin: React.PropTypes.string,
        rangeMax: React.PropTypes.string,
        color: React.PropTypes.string,
        strokeDashArray: React.PropTypes.string,
        strokeWidth: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            x: "cos(t)",
            y: "sin(t)",
            rangeMin: "0",
            rangeMax: "2\\pi",
            color: KhanUtil.BLUE,
            strokeDasharray: "",
            strokeWidth: 2
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                <TeX>X(t) =</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.x}
                    onChange={this.change("x")} />
            </div>
            <div className="perseus-widget-row">
                <TeX>Y(t) =</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.y}
                    onChange={this.change("y")} />
            </div>
            <div className="perseus-widget-row">
                Range: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.rangeMin}
                    onChange={this.change("rangeMin")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.rangeMax}
                    onChange={this.change("rangeMax")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                <ColorPicker
                    value={this.props.color}
                    onChange={this.change("color")} />
            </div>
            <div className="perseus-widget-row">
                <DashPicker
                    value={this.props.strokeDasharray}
                    onChange={this.change("strokeDasharray")} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Width: <NumberInput
                        value={this.props.strokeWidth}
                        placeholder={2}
                        onChange={this.change("strokeWidth")}/>
                </div>
            </div>
        </div>;
    }
});


//
// Editor for labels
//
// TODO(eater): Factor this out maybe?
// TODO(eater): Add text direction
//
var LabelEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
    },

    getDefaultProps: function() {
        return {
            coordX: "0",
            coordY: "0",
            color: KhanUtil.BLACK,
            label: "\\phi"
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                <TextInput
                    value={this.props.label}
                    onChange={this.change("label")}
                    style={{
                        width: "100%"
                    }}
                    />
            </div>
            <div className="perseus-widget-row">
                Location: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordX}
                    onChange={this.change("coordX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordY}
                    onChange={this.change("coordY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                <ColorPicker
                    value={this.props.color}
                    onChange={this.change("color")} />
            </div>
        </div>;
    }
});


//
// Editor for rectangles
//
// TODO(eater): Factor this out maybe?
//
var RectangleEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
    },

    getDefaultProps: function() {
        return {
            coordX: "-5",
            coordY: "5",
            width: "2",
            height: "3",
            color: KhanUtil.LIGHT_BLUE
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Top left: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordX}
                    onChange={this.change("coordX")} />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordY}
                    onChange={this.change("coordY")} />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                Width: <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.width}
                    onChange={this.change("width")} />
            </div>
            <div className="perseus-widget-row">
                Height: <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.height}
                    onChange={this.change("height")} />
            </div>
            <div className="perseus-widget-row">
                <ColorPicker
                    value={this.props.color}
                    lightColors={true}
                    onChange={this.change("color")} />
            </div>
            <div className="perseus-widget-row">
                You want a border? Sorry, draw your own.
            </div>
        </div>;
    }
});



var InteractionEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    // TODO(eater): Make more better
    propTypes: {
        graph: React.PropTypes.object,
        elements: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    getDefaultProps: function() {
        return defaultInteractionProps;
    },

    getInitialState: function() {
        return {
            usedVarSubscripts: this._getAllVarSubscripts(this.props.elements),
            usedFunctionNames: this._getAllFunctionNames(this.props.elements)
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            usedVarSubscripts: this._getAllVarSubscripts(nextProps.elements),
            usedFunctionNames: this._getAllFunctionNames(nextProps.elements)
        });
    },

    _getAllVarSubscripts: function(elements) {
        return _.map(_.where(elements, {type: "movable-point"}),
            (element) => element.options.varSubscript).concat(
            _.map(_.where(elements, {type: "movable-line"}),
            (element) => element.options.startSubscript)).concat(
            _.map(_.where(elements, {type: "movable-line"}),
            (element) => element.options.endSubscript));
    },

    _getAllFunctionNames: function(elements) {
        return _.map(_.where(elements, {type: "function"}),
            (element) => element.options.funcName);
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
        var newElement = {
            type: elementType,
            key: elementType + "-" + (Math.random()*0xffffff<<0).toString(16),
            options: elementType === "point" ?
                        _.clone(PointEditor.defaultProps) :
                        elementType === "line" ?
                        _.clone(LineEditor.defaultProps) :
                        elementType === "movable-point" ?
                        _.clone(MovablePointEditor.defaultProps) :
                        elementType === "movable-line" ?
                        _.clone(MovableLineEditor.defaultProps) :
                        elementType === "function" ?
                        _.clone(FunctionEditor.defaultProps) :
                        elementType === "parametric" ?
                        _.clone(ParametricEditor.defaultProps) :
                        elementType === "label" ?
                        _.clone(LabelEditor.defaultProps) :
                        elementType === "rectangle" ?
                        _.clone(RectangleEditor.defaultProps) : {}
        };
        if (elementType === "movable-point") {
            var nextSubscript =
                _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
            newElement.options.varSubscript = nextSubscript;
        } else if (elementType === "movable-line") {
            var nextSubscript =
                _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
            newElement.options.startSubscript = nextSubscript;
            newElement.options.endSubscript = nextSubscript + 1;
        } else if (elementType === "function") {
            // TODO(eater): The 22nd function added will be {(x) since '{'
            // comes after 'z'
            var nextLetter = String.fromCharCode(_.max([_.max(_.map(
                this.state.usedFunctionNames, function(c) {
                return c.charCodeAt(0); })),
                "e".charCodeAt(0)]) + 1);
            newElement.options.funcName = nextLetter;
        }
        this.change({
            elements: this.props.elements.concat(newElement)
        });
    },

    _deleteElement: function(index) {
        var element = this.props.elements[index];
        this.change({elements: _.without(this.props.elements, element)});
    },

    _moveElementUp: function(index) {
        var element = this.props.elements[index];
        var newElements = _.without(this.props.elements, element);
        newElements.splice(index - 1, 0, element);
        this.change({elements: newElements});
    },

    _moveElementDown: function(index) {
        var element = this.props.elements[index];
        var newElements = _.without(this.props.elements, element);
        newElements.splice(index + 1, 0, element);
        this.change({elements: newElements});
    },

    render: function() {
        return <div className="perseus-widget-interaction-editor">
            <ElementContainer
                    title="Grid settings">
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
            {_.map(this.props.elements, function(element, n) {
                if (element.type === "movable-point") {
                    return <ElementContainer
                            title={<span>Movable point <TeX>
                                    {"(x_{" + element.options.varSubscript +
                                    "}, y_{" + element.options.varSubscript +
                                    "})"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}>
                        <MovablePointEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "movable-line") {
                    return <ElementContainer
                            title={<span>Movable line <TeX>
                                    {"(x_{" + element.options.startSubscript +
                                    "}, y_{" + element.options.startSubscript +
                                    "})"}</TeX> to <TeX>
                                    {"(x_{" + element.options.endSubscript +
                                    "}, y_{" + element.options.endSubscript +
                                    "})"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}>
                        <MovableLineEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "point") {
                    return <ElementContainer
                            title={<span>Point <TeX>
                                    {"(" + element.options.coordX +
                                    ", " + element.options.coordY +
                                    ")"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}>
                        <PointEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "line") {
                    return <ElementContainer
                            title={<span>Line <TeX>
                                    {"(" + element.options.startX +
                                    ", " + element.options.startY +
                                    ")"}</TeX> to <TeX>
                                    {"(" + element.options.endX +
                                    ", " + element.options.endY +
                                    ")"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}>
                        <LineEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "function") {
                    return <ElementContainer
                            title={<span>Function <TeX>{
                                element.options.funcName + "(x) = " +
                                element.options.value
                            }</TeX></span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}>
                        <FunctionEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "parametric") {
                    return <ElementContainer
                            title={<span>Parametric</span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}>
                        <ParametricEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "label") {
                    return <ElementContainer
                            title={<span>Label <TeX>
                                {element.options.label}</TeX> </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}>
                        <LabelEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }} />
                    </ElementContainer>;
                } else if (element.type === "rectangle") {
                    return <ElementContainer
                            title={<span>Rectangle <TeX>{"(" +
                                element.options.coordX + ", " +
                                element.options.coordY + ")"}</TeX>
                                &nbsp;&mdash;&nbsp;
                                <TeX>{element.options.width + " \\times " +
                                element.options.height}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}>
                        <RectangleEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }} />
                    </ElementContainer>;
                }
            }, this)}
            <div className="perseus-widget-interaction-editor-select-element">
                <select onChange={this._addNewElement}>
                    <option value="">Add an element{"\u2026"}</option>
                    <option disabled>--</option>
                    <option value="point">Point</option>
                    <option value="line">Line segment</option>
                    <option value="function">Function plot</option>
                    <option value="parametric">Parametric plot</option>
                    <option value="label">Label</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="movable-point">
                        &#x2605; Movable point</option>
                    <option value="movable-line">
                        &#x2605; Movable line segment</option>
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
