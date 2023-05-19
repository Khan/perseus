/* eslint-disable react/no-unsafe */
/* eslint-disable react/sort-comp */
import {
    components,
    interactiveSizes,
    InteractiveGraphWidget,
    SizingUtils,
    Util,
} from "@khanacademy/perseus";
import createReactClass from "create-react-class";
import * as React from "react";
import _ from "underscore";

import GraphSettings from "../components/graph-settings";

const {InfoTip} = components;
const {containerSizeClass, getInteractiveBoxFromSizeClass} = SizingUtils;
const DeprecationMixin = Util.DeprecationMixin;
const InteractiveGraph = InteractiveGraphWidget.widget;

type InteractiveGraphProps = JSX.LibraryManagedAttributes<
    typeof InteractiveGraph,
    React.ComponentProps<typeof InteractiveGraph>
>;

const defaultBackgroundImage = {
    url: null,
} as const;

const deprecatedProps = {
    showGraph: function (props) {
        return {markings: props.showGraph ? "graph" : "none"};
    },
} as const;

const InteractiveGraphEditor: any = createReactClass({
    displayName: "InteractiveGraphEditor",
    className: "perseus-widget-interactive-graph",

    statics: {
        widgetName: "interactive-graph",
    },

    getDefaultProps: function () {
        return {
            labels: ["x", "y"],
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            showTooltips: false,
            rulerLabel: "",
            rulerTicks: 10,
            correct: {
                type: "linear",
                coords: null,
            },
        };
    },

    // TODO(jack): Use versioning instead of DeprecationMixin
    deprecatedProps: deprecatedProps,

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        DeprecationMixin.UNSAFE_componentWillMount.call(this);
    },

    render: function () {
        let graph;
        let equationString;

        const gridStep =
            this.props.gridStep ||
            Util.getGridStep(
                this.props.range,
                this.props.step,
                interactiveSizes.defaultBoxSize,
            );
        const snapStep =
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        const sizeClass = containerSizeClass.SMALL;
        if (this.props.valid === true) {
            // TODO(aria): send these down all at once
            const graphProps = {
                ref: "graph",
                box: this.props.box,
                range: this.props.range,
                labels: this.props.labels,
                step: this.props.step,
                gridStep: gridStep,
                snapStep: snapStep,
                graph: this.props.correct,
                backgroundImage: this.props.backgroundImage,
                markings: this.props.markings,
                showProtractor: this.props.showProtractor,
                showRuler: this.props.showRuler,
                rulerLabel: this.props.rulerLabel,
                rulerTicks: this.props.rulerTicks,
                trackInteraction: function () {},
                onChange: (newProps: InteractiveGraphProps) => {
                    let correct = this.props.correct;
                    // @ts-expect-error [FEI-5003] - TS2532 - Object is possibly 'undefined'.
                    if (correct.type === newProps.graph.type) {
                        correct = _.extend({}, correct, newProps.graph);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.graph;
                    }
                    this.props.onChange({correct: correct});
                },
            } as const;
            graph = (
                // There are a bunch of props that renderer.jsx passes to widgets via
                // getWidgetProps() and widget-container.jsx that the editors don't
                // bother passing.
                // @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call.
                <InteractiveGraph
                    {...graphProps}
                    containerSizeClass={sizeClass}
                    apiOptions={{
                        ...this.props.apiOptions,
                        isMobile: false,
                    }}
                />
            );
            // TODO(kevinb): Update getEquationString to only accept the data it actually
            // needs to compute the equation string.
            // @ts-expect-error [FEI-5003] - TS2345 - Argument of type '{ readonly ref: "graph"; readonly box: any; readonly range: any; readonly labels: any; readonly step: any; readonly gridStep: any; readonly snapStep: any; readonly graph: any; readonly backgroundImage: any; ... 6 more ...; readonly onChange: (newProps: Pick<...> & ... 1 more ... & InexactPartial<...>) => void; }' is not assignable to parameter of type 'Props'.
            equationString = InteractiveGraph.getEquationString(graphProps);
        } else {
            graph = <div className="perseus-error">{this.props.valid}</div>;
        }

        return (
            <div className="perseus-widget-interactive-graph">
                <div>
                    Correct answer{" "}
                    <InfoTip>
                        <p>
                            Graph the correct answer in the graph below and
                            ensure the equation or point coordinates displayed
                            represent the correct answer.
                        </p>
                    </InfoTip>{" "}
                    : {equationString}
                </div>

                <GraphSettings
                    box={getInteractiveBoxFromSizeClass(sizeClass)}
                    range={this.props.range}
                    labels={this.props.labels}
                    step={this.props.step}
                    gridStep={gridStep}
                    snapStep={snapStep}
                    valid={this.props.valid}
                    backgroundImage={this.props.backgroundImage}
                    markings={this.props.markings}
                    showProtractor={this.props.showProtractor}
                    showRuler={this.props.showRuler}
                    showTooltips={this.props.showTooltips}
                    rulerLabel={this.props.rulerLabel}
                    rulerTicks={this.props.rulerTicks}
                    onChange={this.props.onChange}
                />

                {this.props.correct.type === "polygon" && (
                    <div className="type-settings">
                        <label>
                            {" "}
                            Student answer must{" "}
                            <select
                                value={this.props.correct.match}
                                onChange={this.changeMatchType}
                            >
                                <option value="exact">match exactly</option>
                                <option value="congruent">be congruent</option>
                                <option value="approx">
                                    be approximately congruent
                                </option>
                                <option value="similar">be similar</option>
                            </select>
                        </label>
                        <InfoTip>
                            <ul>
                                <li>
                                    <p>
                                        <b>Match Exactly:</b> Match exactly in
                                        size, orientation, and location on the
                                        grid even if it is not shown in the
                                        background.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>Be Congruent:</b> Be congruent in
                                        size and shape, but can be located
                                        anywhere on the grid.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>Be Approximately Congruent:</b> Be
                                        exactly similar, and congruent in size
                                        and shape to within 0.1 units, but can
                                        be located anywhere on the grid.{" "}
                                        <em>
                                            Use this with snapping to angle
                                            measure.
                                        </em>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <b>Be Similar:</b> Be similar with
                                        matching interior angles, and side
                                        measures that are matching or a multiple
                                        of the correct side measures. The figure
                                        can be located anywhere on the grid.
                                    </p>
                                </li>
                            </ul>
                        </InfoTip>
                    </div>
                )}
                {this.props.correct.type === "angle" && (
                    <div className="type-settings">
                        <div>
                            <label>
                                {" "}
                                Student answer must{" "}
                                <select
                                    value={this.props.correct.match}
                                    onChange={this.changeMatchType}
                                >
                                    <option value="exact">match exactly</option>
                                    <option value="congruent">
                                        be congruent
                                    </option>
                                </select>
                            </label>
                            <InfoTip>
                                <p>
                                    Congruency requires only that the angle
                                    measures are the same. An exact match
                                    implies congruency, but also requires that
                                    the angles have the same orientation and
                                    that the vertices are in the same position.
                                </p>
                            </InfoTip>
                        </div>
                    </div>
                )}
                {graph}
            </div>
        );
    },

    changeMatchType: function (e) {
        const correct = _.extend({}, this.props.correct, {
            match: e.target.value,
        });
        this.props.onChange({correct: correct});
    },

    serialize: function () {
        const json = _.pick(
            this.props,
            "step",
            "backgroundImage",
            "markings",
            "labels",
            "showProtractor",
            "showRuler",
            "showTooltips",
            "rulerLabel",
            "rulerTicks",
            "range",
            "gridStep",
            "snapStep",
        );

        // eslint-disable-next-line react/no-string-refs
        const graph = this.refs.graph;
        if (graph) {
            const correct = graph && graph.getUserInput();
            _.extend(json, {
                graph: {type: correct.type},
                correct: correct,
            });

            _.each(
                [
                    "allowReflexAngles",
                    "angleOffsetDeg",
                    "numPoints",
                    "numSides",
                    "numSegments",
                    "showAngles",
                    "showSides",
                    "snapTo",
                    "snapDegrees",
                ],
                function (key) {
                    if (_.has(correct, key)) {
                        // @ts-expect-error [FEI-5003] - TS2339 - Property 'graph' does not exist on type 'Pick<any, "step" | "range" | "backgroundImage" | "snapStep" | "labels" | "showTooltips" | "markings" | "gridStep" | "showProtractor" | "showRuler" | "rulerLabel" | "rulerTicks">'.
                        json.graph[key] = correct[key];
                    }
                },
            );
        }
        return json;
    },
});

export default InteractiveGraphEditor;
