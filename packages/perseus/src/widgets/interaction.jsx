/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
// @flow
import * as KAS from "@khanacademy/kas";
import {vector as kvector} from "@khanacademy/kmath";
import * as React from "react";
import _ from "underscore";

import Graphie from "../components/graphie.jsx";
import * as Changeable from "../mixins/changeable.jsx";
import Util from "../util.js";

import type {Coord} from "../interactive2/types.js";
import type {
    PerseusInteractionElement,
    PerseusInteractionWidgetOptions,
} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

// $FlowFixMe[prop-missing]
const Label = Graphie.Label;
// $FlowFixMe[prop-missing]
const Line = Graphie.Line;
// $FlowFixMe[prop-missing]
const MovablePoint = Graphie.MovablePoint;
// $FlowFixMe[prop-missing]
const MovableLine = Graphie.MovableLine;
// $FlowFixMe[prop-missing]
const Plot = Graphie.Plot;
// $FlowFixMe[prop-missing]
const PlotParametric = Graphie.PlotParametric;
// $FlowFixMe[prop-missing]
const Point = Graphie.Point;
// $FlowFixMe[prop-missing]
const Rect = Graphie.Rect;
const {unescapeMathMode} = Util;

// Memoize KAS parsing
const KAShashFunc = (expr, options) => {
    options = options || {};
    // $FlowFixMe[prop-missing]: decimal_separator
    // $FlowFixMe[incompatible-type]
    let result = expr + "||" + options.decimal_separator + "||";
    const functions = options.functions;
    const functionsLength = functions ? functions.length : 0;
    for (let i = 0; i < functionsLength; i++) {
        result += functions[i] + "|";
    }
    return result;
};

const _parseCache = Object.create(null);
const KASparse = (expr, options) => {
    const hash = KAShashFunc(expr, options);
    let cached = _parseCache[hash];
    if (cached) {
        return cached;
    }
    cached = KAS.parse(expr, options);
    _parseCache[hash] = cached;
    return cached;
};

const _compileCache = Object.create(null);
const KAScompile = (expr, options) => {
    const hash = KAShashFunc(expr, options);
    let cached = _compileCache[hash];
    if (cached) {
        return cached;
    }
    const parsed = KAS.parse(expr, options).expr;
    cached = parsed
        ? parsed.compile()
        : function () {
              return 0;
          };
    _compileCache[hash] = cached;
    return cached;
};

type RenderProps = PerseusInteractionWidgetOptions; // There's no transform function in exports
type Rubric = PerseusInteractionWidgetOptions;
type Props = WidgetProps<RenderProps, Rubric>;

type DefaultProps = {|
    graph: Props["graph"],
    elements: Props["elements"],
|};

type State = {|
    variables: $FlowFixMe,
    functions: $FlowFixMe,
|};

class Interaction extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        graph: {
            box: [400, 400],
            labels: ["x", "y"],
            range: [
                [-10, 10],
                [-10, 10],
            ],
            tickStep: [1, 1],
            gridStep: [1, 1],
            markings: "graph",
        },
        elements: [],
    };

    state: State = {
        variables: _getInitialVariables(this.props.elements),
        functions: _getInitialFunctions(this.props.elements),
    };

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        // HACK(michaelpolyak): This widget is not wired to use the Perseus
        // `onChange` callback to save user changes. Perseus re-rendering of the
        // widget results in the loss of user changes, such as reseting the
        // positions of the movable points and lines to the initial positions
        // defined in the widget editor. The workaround here is to only reset
        // the state if there are changes to props. This workaround is only
        // possible because the widget is not designed to be graded. The correct
        // fix would be to transform `variables` to the shape of `elements` and
        // call `this.props.onChange({elements})` to preserve user changes using
        // the Perseus state saving mechanism.
        if (!_.isEqual(this.props.elements, nextProps.elements)) {
            this.setState({
                variables: _getInitialVariables(nextProps.elements),
                functions: _getInitialFunctions(nextProps.elements),
            });
        }
    }

    _setupGraphie: ($FlowFixMe, $FlowFixMe) => void = (graphie, options) => {
        graphie.graphInit(
            _.extend({}, options, {
                grid: _.contains(["graph", "grid"], this.props.graph.markings),
                axes: _.contains(["graph"], this.props.graph.markings),
                ticks: _.contains(["graph"], this.props.graph.markings),
                labels: _.contains(["graph"], this.props.graph.markings),
                labelFormat: function (s) {
                    return "\\small{" + s + "}";
                },
                axisArrows: "<->",
                unityLabels: false,
            }),
        );
    };

    _updatePointLocation: (string, Coord) => void = (subscript, coord) => {
        const variables = _.clone(this.state.variables);
        variables["x_" + subscript] = coord[0];
        variables["y_" + subscript] = coord[1];
        this.setState({variables: variables});
        this.props.trackInteraction();
    };

    _updateLineLocation: ($FlowFixMe, Coord) => void = (
        options,
        startCoord,
    ) => {
        const xDiff = this._eval(
            "(" + options.endX + ")-(" + options.startX + ")",
        );
        const yDiff = this._eval(
            "(" + options.endY + ")-(" + options.startY + ")",
        );
        const endCoord = kvector.add(startCoord, [xDiff, yDiff]);
        const variables = _.clone(this.state.variables);
        variables["x_" + options.startSubscript] = startCoord[0];
        variables["y_" + options.startSubscript] = startCoord[1];
        variables["x_" + options.endSubscript] = endCoord[0];
        variables["y_" + options.endSubscript] = endCoord[1];
        this.setState({variables: variables});
        this.props.trackInteraction();
    };

    _eval: ($FlowFixMe, $FlowFixMe) => number = (expression, variables) => {
        const func = KAScompile(expression, {functions: this.state.functions});
        const compiledVars = _.extend({}, this.state.variables, variables);
        _.each(_.keys(compiledVars), (name) => {
            if (_.isString(compiledVars[name])) {
                const func = KAScompile(compiledVars[name], {
                    functions: this.state.functions,
                });
                compiledVars[name] = function (x) {
                    return func(
                        // $FlowFixMe[extra-arg]
                        _.extend({}, compiledVars, {
                            x: x,
                        }),
                    );
                };
            }
        });
        // Default to 0 if the expression couldn't be parsed
        // $FlowFixMe[extra-arg]
        return func(compiledVars) || 0;
    };

    // Return an array of all the variables in an expression
    _extractVars: ($FlowFixMe) => $ReadOnlyArray<$FlowFixMe> = (expr) => {
        if (expr == null) {
            return [];
        }
        let vars = [];
        _.each(
            expr.args(),
            function (arg) {
                if (arg && arg.constructor.name === "Expr") {
                    vars = vars.concat(this._extractVars(arg));
                }
            },
            this,
        );

        if (expr.name() === "Var") {
            vars.push(expr.prettyPrint());
        }
        return vars;
    };

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    render(): React.Node {
        const range = this.props.graph.range;
        let labels = this.props.graph.labels;
        if (this.props.graph.markings === "graph") {
            // Content creators may need to explicitly add the dollar signs so
            // the strings are picked up by our translation tools. However,
            // these math annotations are redundant because we already render
            // all graph labels in math mode. For example, a label value of
            // `$\text{Dollars}$` will be translatable, but we only want to
            // pass the string `\text{Dollars}` to the Graph widget.
            labels = this.props.graph.labels.map((label) =>
                label.startsWith("$") && label.endsWith("$")
                    ? label.slice(1, -1)
                    : label,
            );
        }
        return (
            <Graphie
                box={this.props.graph.box}
                range={this.props.graph.range}
                options={this.props.graph}
                setup={this._setupGraphie}
                setDrawingAreaAvailable={
                    this.props.apiOptions.setDrawingAreaAvailable
                }
            >
                {this.props.graph.markings === "graph" && (
                    <Label
                        coord={[0, range[1][1]]}
                        text={labels[1]}
                        direction="above"
                    />
                )}
                {this.props.graph.markings === "graph" && (
                    <Label
                        coord={[range[0][1], 0]}
                        text={labels[0]}
                        direction="right"
                    />
                )}
                {_.map(
                    this.props.elements,
                    function (element, n) {
                        if (element.type === "point") {
                            return (
                                <Point
                                    key={element.key}
                                    coord={[
                                        this._eval(element.options.coordX),
                                        this._eval(element.options.coordY),
                                    ]}
                                    color={element.options.color}
                                />
                            );
                        }
                        if (element.type === "line") {
                            const start = [
                                this._eval(element.options.startX),
                                this._eval(element.options.startY),
                            ];
                            const end = [
                                this._eval(element.options.endX),
                                this._eval(element.options.endY),
                            ];
                            return (
                                <Line
                                    key={element.key}
                                    start={start}
                                    end={end}
                                    style={{
                                        stroke: element.options.color,
                                        strokeWidth:
                                            element.options.strokeWidth,
                                        strokeDasharray:
                                            element.options.strokeDasharray,
                                        arrows: element.options.arrows,
                                    }}
                                />
                            );
                        }
                        if (element.type === "movable-point") {
                            // TODO(eater): Would be nice if the constraint
                            // system were more flexible.
                            const constraints = [
                                (coord) => {
                                    const coordX = Math.max(
                                        this._eval(
                                            element.options.constraintXMin,
                                        ),
                                        Math.min(
                                            this._eval(
                                                element.options.constraintXMax,
                                            ),
                                            coord[0],
                                        ),
                                    );
                                    const coordY = Math.max(
                                        this._eval(
                                            element.options.constraintYMin,
                                        ),
                                        Math.min(
                                            this._eval(
                                                element.options.constraintYMax,
                                            ),
                                            coord[1],
                                        ),
                                    );
                                    return [coordX, coordY];
                                },
                            ];
                            if (element.options.constraint === "snap") {
                                constraints.push(
                                    MovablePoint.constraints.snap(
                                        element.options.snap,
                                    ),
                                );
                            } else if (element.options.constraint === "x") {
                                constraints.push((coord) => {
                                    return [
                                        this._eval(
                                            element.options.constraintFn,
                                            {y: coord[1]},
                                        ),
                                        coord[1],
                                    ];
                                });
                            } else if (element.options.constraint === "y") {
                                constraints.push((coord) => {
                                    return [
                                        coord[0],
                                        this._eval(
                                            element.options.constraintFn,
                                            {x: coord[0]},
                                        ),
                                    ];
                                });
                            }

                            // TODO(eater): foo_[xyz] are hacky non-props to
                            // get the component to update when constraints
                            // change
                            return (
                                <MovablePoint
                                    key={element.key}
                                    coord={[
                                        this.state.variables[
                                            "x_" + element.options.varSubscript
                                        ],
                                        this.state.variables[
                                            "y_" + element.options.varSubscript
                                        ],
                                    ]}
                                    constraints={constraints}
                                    foo_x={element.options.constraint}
                                    foo_y={element.options.constraintFn}
                                    foo_z={element.options.snap}
                                    onMove={_.partial(
                                        this._updatePointLocation,
                                        element.options.varSubscript,
                                    )}
                                />
                            );
                        }
                        if (element.type === "movable-line") {
                            // TODO(eater): Would be nice if the constraint
                            // system were more flexible.
                            // TODO(eater): Don't duplicate this code from
                            // movable-point above
                            const constraints = [
                                (coord) => {
                                    const coordX = Math.max(
                                        this._eval(
                                            element.options.constraintXMin,
                                        ),
                                        Math.min(
                                            this._eval(
                                                element.options.constraintXMax,
                                            ),
                                            coord[0],
                                        ),
                                    );
                                    const coordY = Math.max(
                                        this._eval(
                                            element.options.constraintYMin,
                                        ),
                                        Math.min(
                                            this._eval(
                                                element.options.constraintYMax,
                                            ),
                                            coord[1],
                                        ),
                                    );
                                    return [coordX, coordY];
                                },
                            ];
                            if (element.options.constraint === "snap") {
                                constraints.push(
                                    MovablePoint.constraints.snap(
                                        element.options.snap,
                                    ),
                                );
                            } else if (element.options.constraint === "x") {
                                constraints.push((coord) => {
                                    return [
                                        this._eval(
                                            element.options.constraintFn,
                                            {y: coord[1]},
                                        ),
                                        coord[1],
                                    ];
                                });
                            } else if (element.options.constraint === "y") {
                                constraints.push((coord) => {
                                    return [
                                        coord[0],
                                        this._eval(
                                            element.options.constraintFn,
                                            {x: coord[0]},
                                        ),
                                    ];
                                });
                            }
                            const start = [
                                this.state.variables[
                                    "x_" + element.options.startSubscript
                                ],
                                this.state.variables[
                                    "y_" + element.options.startSubscript
                                ],
                            ];
                            const end = [
                                this.state.variables[
                                    "x_" + element.options.endSubscript
                                ],
                                this.state.variables[
                                    "y_" + element.options.endSubscript
                                ],
                            ];
                            return (
                                <MovableLine
                                    key={element.key}
                                    constraints={constraints}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onMove={_.bind(
                                        this._updateLineLocation,
                                        this,
                                        element.options,
                                    )}
                                    foo_x={element.options.constraint}
                                    foo_y={element.options.constraintFn}
                                    foo_z={element.options.snap}
                                >
                                    <MovablePoint
                                        coord={start}
                                        static={true}
                                        normalStyle={{
                                            stroke: "none",
                                            fill: "none",
                                        }}
                                    />
                                    <MovablePoint
                                        coord={end}
                                        static={true}
                                        normalStyle={{
                                            stroke: "none",
                                            fill: "none",
                                        }}
                                    />
                                </MovableLine>
                            );
                        }
                        if (element.type === "function") {
                            const fn = (x) => {
                                return this._eval(element.options.value, {
                                    x: x,
                                });
                            };
                            // find all the variables referenced by this
                            // function
                            const vars = _.without(
                                this._extractVars(
                                    KASparse(element.options.value).expr,
                                ),
                                "x",
                            );
                            // and find their values, so we redraw if any
                            // change
                            const varValues = _.object(
                                vars,
                                _.map(vars, (v) => this.state.variables[v]),
                            );

                            const range = [
                                this._eval(
                                    element.options.rangeMin,
                                    this.state.variables,
                                ),
                                this._eval(
                                    element.options.rangeMax,
                                    this.state.variables,
                                ),
                            ];

                            return (
                                <Plot
                                    key={element.key}
                                    fn={fn}
                                    foo_fn={element.options.value}
                                    foo_varvalues={varValues}
                                    range={range}
                                    style={{
                                        stroke: element.options.color,
                                        strokeWidth:
                                            element.options.strokeWidth,
                                        strokeDasharray:
                                            element.options.strokeDasharray,
                                        plotPoints: 100, // TODO(eater): why
                                        // so slow?
                                    }}
                                />
                            );
                        }
                        if (element.type === "parametric") {
                            const fn = (t) => {
                                return [
                                    this._eval(element.options.x, {t: t}),
                                    this._eval(element.options.y, {t: t}),
                                ];
                            };
                            // find all the variables referenced by this
                            // function
                            const vars = _.without(
                                this._extractVars(
                                    KASparse(element.options.x).expr,
                                ).concat(
                                    this._extractVars(
                                        KASparse(element.options.y).expr,
                                    ),
                                ),
                                "t",
                            );
                            // and find their values, so we redraw if any change
                            const varValues = _.object(
                                vars,
                                _.map(vars, (v) => this.state.variables[v]),
                            );

                            const range = [
                                this._eval(
                                    element.options.rangeMin,
                                    this.state.variables,
                                ),
                                this._eval(
                                    element.options.rangeMax,
                                    this.state.variables,
                                ),
                            ];

                            return (
                                <PlotParametric
                                    key={element.key}
                                    fn={fn}
                                    foo_fnx={element.options.x}
                                    foo_fny={element.options.y}
                                    foo_varvalues={varValues}
                                    range={range}
                                    style={{
                                        stroke: element.options.color,
                                        strokeWidth:
                                            element.options.strokeWidth,
                                        strokeDasharray:
                                            element.options.strokeDasharray,
                                        plotPoints: 100, // TODO(eater): why
                                        // so slow?
                                    }}
                                />
                            );
                        }
                        if (element.type === "label") {
                            const coord = [
                                this._eval(element.options.coordX),
                                this._eval(element.options.coordY),
                            ];
                            return (
                                <Label
                                    key={n + 1}
                                    coord={coord}
                                    text={unescapeMathMode(
                                        element.options.label,
                                    )}
                                    style={{
                                        color: element.options.color,
                                    }}
                                />
                            );
                        }
                        if (element.type === "rectangle") {
                            return (
                                <Rect
                                    key={n + 1}
                                    x={this._eval(element.options.coordX)}
                                    y={this._eval(element.options.coordY)}
                                    width={_.max([
                                        this._eval(element.options.width),
                                        0,
                                    ])}
                                    height={_.max([
                                        this._eval(element.options.height),
                                        0,
                                    ])}
                                    style={{
                                        stroke: "none",
                                        fill: element.options.color,
                                    }}
                                />
                            );
                        }
                    },
                    this,
                )}
            </Graphie>
        );
    }

    getUserInput: () => $FlowFixMe = () => {
        // TODO(eater): Perhaps we want to be able to record the state of the
        // user's interaction. Unfortunately sending all the props will
        // probably make the attempt payload too large. So for now, don't send
        // anything.
        return {};
    };

    simpleValidate: ($FlowFixMe) => $FlowFixMe = (rubric) => {
        return Interaction.validate(this.getUserInput(), rubric);
    };

    static validate(state: $FlowFixMe, rubric: $FlowFixMe): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }
}

const _getInitialVariables: (
    $ReadOnlyArray<PerseusInteractionElement>,
) => $FlowFixMe = (elements) => {
    const variables = {};
    // TODO(eater): look at all this copypasta! refactor this!
    _.each(_.where(elements, {type: "movable-point"}), (element) => {
        const subscript = element.options.varSubscript;
        const startXExpr = KASparse(element.options.startX || "0").expr;
        const startYExpr = KASparse(element.options.startY || "0").expr;
        let startX = 0;
        let startY = 0;
        if (startXExpr) {
            startX = startXExpr.eval({}) || 0;
        }
        if (startYExpr) {
            startY = startYExpr.eval({}) || 0;
        }
        variables["x_" + subscript] = startX;
        variables["y_" + subscript] = startY;
    });
    _.each(_.where(elements, {type: "movable-line"}), (element) => {
        const startSubscript = element.options.startSubscript;
        const endSubscript = element.options.endSubscript;
        const startXExpr = KASparse(element.options.startX || "0").expr;
        const startYExpr = KASparse(element.options.startY || "0").expr;
        const endXExpr = KASparse(element.options.endX || "0").expr;
        const endYExpr = KASparse(element.options.endY || "0").expr;
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
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
    });
    _.each(_.where(elements, {type: "function"}), (element) => {
        variables[element.options.funcName] = element.options.value;
    });
    return variables;
};

const _getInitialFunctions: (
    $ReadOnlyArray<PerseusInteractionElement>,
) => $ReadOnlyArray<string> = (elements) => {
    return _.map(
        _.where(elements, {type: "function"}),
        (element) => element.options.funcName,
    );
};

export default ({
    name: "interaction",
    displayName: "Interaction",
    widget: Interaction,
    transform: _.identity,
    hidden: true,
}: WidgetExports<typeof Interaction>);
