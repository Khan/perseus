/* eslint-disable react/no-unsafe */
/* eslint-disable react/sort-comp */
import {
    components,
    interactiveSizes,
    InteractiveGraphWidget,
    SizingUtils,
    Util,
} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import * as Typography from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import _ from "underscore";

import GraphPointsCountSelector from "../components/graph-points-count-selector";
import GraphSettings from "../components/graph-settings";
import GraphTypeSelector from "../components/graph-type-selector";
import SegmentCountSelector from "../components/segment-count-selector";
import {parsePointCount} from "../util/points";

import type {
    PerseusImageBackground,
    PerseusInteractiveGraphWidgetOptions,
    APIOptionsWithDefaults,
} from "@khanacademy/perseus";
import type {PropsFor, StyleType} from "@khanacademy/wonder-blocks-core";

const {InfoTip} = components;
const {containerSizeClass, getInteractiveBoxFromSizeClass} = SizingUtils;
const DeprecationMixin = Util.DeprecationMixin;
const InteractiveGraph = InteractiveGraphWidget.widget;

type InteractiveGraphProps = PropsFor<typeof InteractiveGraph>;

const defaultBackgroundImage = {
    url: null,
} as const;

const deprecatedProps = {
    showGraph: function (props) {
        return {markings: props.showGraph ? "graph" : "none"};
    },
} as const;

type Range = [number, number]; // [min, max]

// Renders the given children in a View laid out horizontally.
const Row = (props: {style?: StyleType; children: React.ReactNode}) => {
    const {children, style} = props;

    return (
        <View
            style={{
                ...style,
                flexDirection: "row",
                marginTop: Spacing.xSmall_8,
            }}
        >
            {children}
        </View>
    );
};

const FieldLabel = (props: {children: string}) => {
    return (
        <Typography.LabelSmall style={{marginRight: Spacing.xSmall_8}}>
            {props.children}
        </Typography.LabelSmall>
    );
};

type Props = {
    apiOptions: APIOptionsWithDefaults;

    labels: ReadonlyArray<string>;
    range: [Range, Range]; // x, y
    step: [number, number]; // x, y
    gridStep: [number, number]; // x, y
    snapStep: [number, number]; // x, y
    box: [number, number]; // x, y

    valid: boolean;
    backgroundImage: PerseusImageBackground;
    markings: string; // TODO(jeremy)
    showProtractor: boolean;
    showRuler: boolean;
    showTooltips: boolean;
    rulerLabel: string;
    rulerTicks: number;
    correct: any; // TODO(jeremy)

    graph: InteractiveGraphProps["graph"];
    onChange: (props: Partial<Props>) => void;
};

type DefaultProps = {
    labels: Props["labels"];
    range: Props["range"];
    step: Props["step"];
    valid: Props["valid"];
    backgroundImage: Props["backgroundImage"];
    markings: Props["markings"];
    showProtractor: Props["showProtractor"];
    showRuler: Props["showRuler"];
    showTooltips: Props["showTooltips"];
    rulerLabel: Props["rulerLabel"];
    rulerTicks: Props["rulerTicks"];
    correct: Props["correct"];
};

class InteractiveGraphEditor extends React.Component<Props> {
    displayName = "InteractiveGraphEditor";
    className = "perseus-widget-interactive-graph";

    static widgetName = "interactive-graph";

    static defaultProps: DefaultProps = {
        ...InteractiveGraph.defaultProps,
        valid: true,
        backgroundImage: defaultBackgroundImage,
        showTooltips: false,
        correct: {
            type: InteractiveGraph.defaultProps.graph.type,
            coords: null,
        },
    };

    // TODO(jack): Use versioning instead of DeprecationMixin
    deprecatedProps = deprecatedProps;

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        DeprecationMixin.UNSAFE_componentWillMount.call(this);
    }

    render() {
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
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
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
                // @ts-expect-error - TS2769 - No overload matches this call.
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
            // @ts-expect-error - TS2345 - Argument of type '{ readonly ref: "graph"; readonly box: any; readonly range: any; readonly labels: any; readonly step: any; readonly gridStep: any; readonly snapStep: any; readonly graph: any; readonly backgroundImage: any; ... 6 more ...; readonly onChange: (newProps: Pick<...> & ... 1 more ... & InexactPartial<...>) => void; }' is not assignable to parameter of type 'Props'.
            equationString = InteractiveGraph.getEquationString(graphProps);
        } else {
            graph = <div className="perseus-error">{this.props.valid}</div>;
        }

        return (
            <View>
                <Row>
                    <FieldLabel>Type of Graph:</FieldLabel>
                    <GraphTypeSelector
                        graphType={
                            this.props.graph?.type ??
                            InteractiveGraph.defaultProps.graph.type
                        }
                        onChange={(
                            type: Required<InteractiveGraphProps>["graph"]["type"],
                        ) => {
                            this.props.onChange({
                                graph: {type},
                                correct: {type},
                            });
                        }}
                    />
                </Row>
                {this.props.correct?.type === "point" && (
                    <Row>
                        <FieldLabel>Number of Points:</FieldLabel>
                        <GraphPointsCountSelector
                            numPoints={this.props.correct?.numPoints}
                            onChange={(points) => {
                                this.props.onChange({
                                    correct: {
                                        type: "point",
                                        numPoints: points,
                                    },
                                });
                            }}
                        />
                    </Row>
                )}
                {this.props.correct?.type === "polygon" && (
                    <>
                        <Row>
                            <FieldLabel>Number of sides:</FieldLabel>
                            <select
                                key="polygon-select"
                                value={this.props.correct?.numSides || 3}
                                onChange={(e) => {
                                    const graph = {
                                        ...this.props.correct,
                                        numSides: parsePointCount(
                                            e.target.value,
                                        ),
                                        coords: null,
                                        // reset the snap for UNLIMITED, which
                                        // only supports "grid"
                                        // From: D6578
                                        snapTo: "grid",
                                    };

                                    this.props.onChange({correct: graph});
                                }}
                            >
                                {_.map(_.range(3, 13), function (n) {
                                    return (
                                        <option key={n} value={n}>
                                            {`${n} sides`}
                                        </option>
                                    );
                                })}
                                <option value={"unlimited"}>
                                    unlimited sides
                                </option>
                            </select>
                        </Row>
                        <Row>
                            <FieldLabel>Snap to:</FieldLabel>
                            <select
                                key="polygon-snap"
                                value={this.props.correct?.snapTo}
                                onChange={(e) => {
                                    const graph = {
                                        ...this.props.correct,
                                        snapTo: e.target.value,
                                        coords: null,
                                    };

                                    this.props.onChange({correct: graph});
                                }}
                            >
                                <option value="grid">grid</option>
                                {this.props.correct?.numSides !==
                                    "unlimited" && (
                                    <React.Fragment>
                                        <option value="angles">
                                            interior angles
                                        </option>
                                        <option value="sides">
                                            side measures
                                        </option>
                                    </React.Fragment>
                                )}
                            </select>
                            <InfoTip>
                                <p>
                                    These options affect the movement of the
                                    vertex points. The grid option will guide
                                    the points to the nearest half step along
                                    the grid.
                                </p>
                                <p>
                                    The interior angle and side measure options
                                    guide the points to the nearest whole angle
                                    or side
                                </p>{" "}
                                measure respectively.
                            </InfoTip>
                        </Row>
                        <Row>
                            <Typography.LabelSmall tag="label">
                                Show angle measures:{" "}
                                <input
                                    type="checkbox"
                                    checked={this.props.correct?.showAngles}
                                    onChange={() => {
                                        this.props.onChange({
                                            correct: {
                                                ...this.props.correct,
                                                showAngles:
                                                    !this.props.correct
                                                        .showAngles,
                                            },
                                        });
                                    }}
                                />
                            </Typography.LabelSmall>
                            <InfoTip>
                                <p>Displays the interior angle measures.</p>
                            </InfoTip>
                        </Row>
                        <Row>
                            <Typography.LabelSmall tag="label">
                                Show side measures:{" "}
                                <input
                                    type="checkbox"
                                    checked={this.props.correct?.showSides}
                                    onChange={() => {
                                        this.props.onChange({
                                            correct: {
                                                ...this.props.correct,
                                                showSides:
                                                    !this.props.correct
                                                        .showSides,
                                            },
                                        });
                                    }}
                                />
                            </Typography.LabelSmall>
                            <InfoTip>
                                <p>Displays the side lengths.</p>
                            </InfoTip>
                        </Row>
                    </>
                )}
                {this.props.correct?.type === "segment" && (
                    <Row>
                        <FieldLabel>Number of segments: </FieldLabel>
                        <SegmentCountSelector
                            numSegments={this.props.correct?.numSegments}
                            onChange={(sides) => {
                                this.props.onChange({
                                    correct: {
                                        type: "segment",
                                        numSegments: sides,
                                        coords: null,
                                    },
                                });
                            }}
                        />
                    </Row>
                )}

                <Row>
                    <FieldLabel>Correct answer:</FieldLabel>
                    <Typography.BodyMonospace
                        style={{
                            fontSize: 12,
                            backgroundColor: "#eee",
                            paddingInline: Spacing.xxSmall_6,
                            borderColor: "#ccc",
                            borderStyle: "solid",
                            borderWidth: 1,
                        }}
                    >
                        {equationString}
                    </Typography.BodyMonospace>
                    <InfoTip>
                        <p>
                            Graph the correct answer in the graph below and
                            ensure the equation or point coordinates displayed
                            represent the correct answer.
                        </p>
                    </InfoTip>
                </Row>
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
            </View>
        );
    }

    changeMatchType(e) {
        const correct = _.extend({}, this.props.correct, {
            match: e.target.value,
        });
        this.props.onChange({correct: correct});
    }

    serialize(): PerseusInteractiveGraphWidgetOptions {
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
            // @ts-expect-error TS2339 Property 'getUserInput' does not exist on type 'ReactInstance'. Property 'getUserInput' does not exist on type 'Component<any, {}, any>'.
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
                        // @ts-expect-error - TS2339 - Property 'graph' does not exist on type 'Pick<any, "step" | "range" | "backgroundImage" | "snapStep" | "labels" | "showTooltips" | "markings" | "gridStep" | "showProtractor" | "showRuler" | "rulerLabel" | "rulerTicks">'.
                        json.graph[key] = correct[key];
                    }
                },
            );
        }
        // @ts-expect-error TS2739 Type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "step" | "gridStep" | "snapStep" | "backgroundImage" | "markings" | "labels" | ... 5 more ... | "range">' is missing the following properties from type 'PerseusInteractiveGraphWidgetOptions': graph, correct
        return json;
    }
}

export default InteractiveGraphEditor;
