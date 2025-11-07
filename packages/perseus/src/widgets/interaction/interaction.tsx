/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable @typescript-eslint/no-invalid-this, react/no-unsafe */
import * as KAS from "@khanacademy/kas";
import {vector as kvector} from "@khanacademy/kmath";
import * as React from "react";
import _ from "underscore";

import Graphie from "../../components/graphie";
import withAPIOptions from "../../components/with-api-options";
import Util from "../../util";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/interaction/interaction-ai-utils";

import type {Coord} from "../../interactive2/types";
import type {APIOptions, Widget, WidgetExports, WidgetProps} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {
    PerseusInteractionElement,
    PerseusInteractionWidgetOptions,
} from "@khanacademy/perseus-core";

// @ts-expect-error - TS2339 - Property 'Label' does not exist on type 'typeof Graphie'.
const Label = Graphie.Label;
// @ts-expect-error - TS2339 - Property 'Line' does not exist on type 'typeof Graphie'.
const Line = Graphie.Line;
// @ts-expect-error - TS2339 - Property 'MovablePoint' does not exist on type 'typeof Graphie'.
const MovablePoint = Graphie.MovablePoint;
// @ts-expect-error - TS2339 - Property 'MovableLine' does not exist on type 'typeof Graphie'.
const MovableLine = Graphie.MovableLine;
// @ts-expect-error - TS2339 - Property 'Plot' does not exist on type 'typeof Graphie'.
const Plot = Graphie.Plot;
// @ts-expect-error - TS2339 - Property 'PlotParametric' does not exist on type 'typeof Graphie'.
const PlotParametric = Graphie.PlotParametric;
// @ts-expect-error - TS2339 - Property 'Point' does not exist on type 'typeof Graphie'.
const Point = Graphie.Point;
// @ts-expect-error - TS2339 - Property 'Rect' does not exist on type 'typeof Graphie'.
const Rect = Graphie.Rect;
const {unescapeMathMode} = Util;

// Memoize KAS parsing
const KAShashFunc = (
    expr: any,
    options:
        | undefined
        | {
              [".decimal_separator"]: never;
              [".functions"]: never;
          }
        | {
              functions: any;
          },
) => {
    // @ts-expect-error - TS2322 - Type '{ ".decimal_separator": never; ".functions": never; } | { functions: any; } | {}' is not assignable to type '{ ".decimal_separator": never; ".functions": never; } | { functions: any; } | undefined'.
    options = options || {};
    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2339 - Property 'decimal_separator' does not exist on type '{ ".decimal_separator": never; ".functions": never; } | { functions: any; }'.
    let result = expr + "||" + options.decimal_separator + "||";
    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2339 - Property 'functions' does not exist on type '{ ".decimal_separator": never; ".functions": never; } | { functions: any; }'.
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
const KAScompile = (
    expr: any,
    options: {
        functions: any;
    },
) => {
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

type PropsWithAPIOptions = {
    apiOptions: APIOptions;
};

type Props = PropsWithAPIOptions & WidgetProps<PerseusInteractionWidgetOptions>;

type DefaultProps = {
    graph: Props["graph"];
    elements: Props["elements"];
};

type State = {
    variables: any;
    functions: any;
};

class InteractionClass extends React.Component<Props, State> implements Widget {
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

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

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

    _setupGraphie: (arg1: any, arg2: any) => void = (graphie, options) => {
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

    _updatePointLocation: (arg1: string, arg2: Coord) => void = (
        subscript,
        coord,
    ) => {
        const variables = _.clone(this.state.variables);
        variables["x_" + subscript] = coord[0];
        variables["y_" + subscript] = coord[1];
        this.setState({variables: variables});
        this.props.trackInteraction();
    };

    _updateLineLocation: (arg1: any, arg2: Coord) => void = (
        options,
        startCoord,
    ) => {
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
        const xDiff = this._eval(
            "(" + options.endX + ")-(" + options.startX + ")",
        );
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
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

    _eval: (arg1: any, arg2: any) => number = (expression, variables) => {
        const func = KAScompile(expression, {functions: this.state.functions});
        const compiledVars = _.extend({}, this.state.variables, variables);
        _.each(_.keys(compiledVars), (name) => {
            if (_.isString(compiledVars[name])) {
                const func = KAScompile(compiledVars[name], {
                    functions: this.state.functions,
                });
                compiledVars[name] = function (x: any) {
                    return func(
                        _.extend({}, compiledVars, {
                            x: x,
                        }),
                    );
                };
            }
        });
        // Default to 0 if the expression couldn't be parsed
        return func(compiledVars) || 0;
    };

    // Return an array of all the variables in an expression
    _extractVars: (arg1: any) => ReadonlyArray<any> = (expr) => {
        if (expr == null) {
            return [];
        }
        let vars: Array<any> = [];
        _.each(
            expr.args(),
            function (arg) {
                if (arg && arg.constructor.name === "Expr") {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    render(): React.ReactNode {
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(element.options.coordX),
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(element.options.coordY),
                                    ]}
                                    color={element.options.color}
                                />
                            );
                        }
                        if (element.type === "line") {
                            const start = [
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(element.options.startX),
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(element.options.startY),
                            ];
                            const end = [
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(element.options.endX),
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                (coord: any) => {
                                    const coordX = Math.max(
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(
                                            element.options.constraintXMin,
                                        ),
                                        Math.min(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                            this._eval(
                                                element.options.constraintXMax,
                                            ),
                                            coord[0],
                                        ),
                                    );
                                    const coordY = Math.max(
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(
                                            element.options.constraintYMin,
                                        ),
                                        Math.min(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this.state.variables[
                                            "x_" + element.options.varSubscript
                                        ],
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this.state.variables[
                                            "y_" + element.options.varSubscript
                                        ],
                                    ]}
                                    constraints={constraints}
                                    foo_x={element.options.constraint}
                                    foo_y={element.options.constraintFn}
                                    foo_z={element.options.snap}
                                    onMove={_.partial(
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                (coord: any) => {
                                    const coordX = Math.max(
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(
                                            element.options.constraintXMin,
                                        ),
                                        Math.min(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                            this._eval(
                                                element.options.constraintXMax,
                                            ),
                                            coord[0],
                                        ),
                                    );
                                    const coordY = Math.max(
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(
                                            element.options.constraintYMin,
                                        ),
                                        Math.min(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(
                                            element.options.constraintFn,
                                            {x: coord[0]},
                                        ),
                                    ];
                                });
                            }
                            const start = [
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this.state.variables[
                                    "x_" + element.options.startSubscript
                                ],
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this.state.variables[
                                    "y_" + element.options.startSubscript
                                ],
                            ];
                            const end = [
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this.state.variables[
                                    "x_" + element.options.endSubscript
                                ],
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._updateLineLocation,
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                            const fn = (x: any) => {
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                return this._eval(element.options.value, {
                                    x: x,
                                });
                            };
                            // find all the variables referenced by this
                            // function
                            const vars = _.without(
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._extractVars(
                                    // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                                    KASparse(element.options.value).expr,
                                ),
                                "x",
                            );
                            // and find their values, so we redraw if any
                            // change
                            const varValues = _.object(
                                vars,
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                _.map(vars, (v) => this.state.variables[v]),
                            );

                            const range = [
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(
                                    element.options.rangeMin,
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    this.state.variables,
                                ),
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(
                                    element.options.rangeMax,
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                            const fn = (t: any) => {
                                return [
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    this._eval(element.options.x, {t: t}),
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    this._eval(element.options.y, {t: t}),
                                ];
                            };
                            // find all the variables referenced by this
                            // function
                            const vars = _.without(
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._extractVars(
                                    // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                                    KASparse(element.options.x).expr,
                                ).concat(
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    this._extractVars(
                                        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                                        KASparse(element.options.y).expr,
                                    ),
                                ),
                                "t",
                            );
                            // and find their values, so we redraw if any change
                            const varValues = _.object(
                                vars,
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                _.map(vars, (v) => this.state.variables[v]),
                            );

                            const range = [
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(
                                    element.options.rangeMin,
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    this.state.variables,
                                ),
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(
                                    element.options.rangeMax,
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this._eval(element.options.coordX),
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    x={this._eval(element.options.coordX)}
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    y={this._eval(element.options.coordY)}
                                    width={_.max([
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        this._eval(element.options.width),
                                        0,
                                    ])}
                                    height={_.max([
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
}

const _getInitialVariables: (
    arg1: ReadonlyArray<PerseusInteractionElement>,
) => any = (elements) => {
    const variables: Record<string, any> = {};
    // TODO(eater): look at all this copypasta! refactor this!
    _.each(_.where(elements, {type: "movable-point"}), (element) => {
        // @ts-expect-error - TS2339 - Property 'varSubscript' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const subscript = element.options.varSubscript;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1. | TS2339 - Property 'startX' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const startXExpr = KASparse(element.options.startX || "0").expr;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1. | TS2339 - Property 'startY' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
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
        // @ts-expect-error - TS2339 - Property 'startSubscript' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const startSubscript = element.options.startSubscript;
        // @ts-expect-error - TS2339 - Property 'endSubscript' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const endSubscript = element.options.endSubscript;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1. | TS2339 - Property 'startX' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const startXExpr = KASparse(element.options.startX || "0").expr;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1. | TS2339 - Property 'startY' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const startYExpr = KASparse(element.options.startY || "0").expr;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1. | TS2339 - Property 'endX' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        const endXExpr = KASparse(element.options.endX || "0").expr;
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1. | TS2339 - Property 'endY' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
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
        // @ts-expect-error - TS2339 - Property 'funcName' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'. | TS2339 - Property 'value' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        variables[element.options.funcName] = element.options.value;
    });
    return variables;
};

const _getInitialFunctions: (
    arg1: ReadonlyArray<PerseusInteractionElement>,
) => ReadonlyArray<string> = (elements) => {
    return _.map(
        _.where(elements, {type: "function"}),
        // @ts-expect-error - TS2339 - Property 'funcName' does not exist on type 'PerseusInteractionFunctionElementOptions | PerseusInteractionLabelElementOptions | ... 5 more ... | PerseusInteractionRectangleElementOptions'.
        (element) => element.options.funcName,
    );
};

const Interaction = withAPIOptions(InteractionClass);

export default {
    name: "interaction",
    displayName: "Interaction",
    widget: Interaction,
    hidden: true,
} satisfies WidgetExports<typeof Interaction>;
