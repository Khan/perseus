import {vector as kvector} from "@khanacademy/kmath";
import {
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
    InteractiveGraphWidget,
    interactiveSizes,
    Util,
} from "@khanacademy/perseus";
import {
    type LockedFigure,
    type PerseusImageBackground,
    type PerseusInteractiveGraphWidgetOptions,
    type PerseusGraphType,
    type MarkingsType,
    type InteractiveGraphDefaultWidgetOptions,
    type AxisLabelLocation,
    interactiveGraphLogic,
    type ShowAxisArrows,
} from "@khanacademy/perseus-core";
import {Id, View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import AngleAnswerOptions from "./components/angle-answer-options";
import GraphPointsCountSelector from "./components/graph-points-count-selector";
import GraphTypeSelector from "./components/graph-type-selector";
import {InteractiveGraphCorrectAnswer} from "./components/interactive-graph-correct-answer";
import InteractiveGraphDescription from "./components/interactive-graph-description";
import InteractiveGraphSettings from "./components/interactive-graph-settings";
import InteractiveGraphSRTree from "./components/interactive-graph-sr-tree";
import PolygonAnswerOptions from "./components/polygon-answer-options";
import SegmentCountSelector from "./components/segment-count-selector";
import LabeledRow from "./locked-figures/labeled-row";
import LockedFiguresSection from "./locked-figures/locked-figures-section";
import StartCoordsSettings from "./start-coords/start-coords-settings";
import {getStartCoords, shouldShowStartCoordsUI} from "./start-coords/util";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const InteractiveGraph = InteractiveGraphWidget.widget;

type InteractiveGraphProps = PropsFor<typeof InteractiveGraph>;

type Range = [min: number, max: number];

export type Props = {
    apiOptions: APIOptionsWithDefaults;

    /**
     * The labels for the x and y axes.
     */
    labels: ReadonlyArray<string>;
    /**
     * Specifies the location of the labels on the graph.  default: "onAxis".
     * - "onAxis": Labels are positioned on the axis at the right (x) and top (y) of the graph.
     * - "alongEdge": Labels are centered along the bottom (x) and left (y) edges of the graph.
     *    The y label is rotated. Typically used when the range min is near 0 with longer labels.
     */
    labelLocation?: AxisLabelLocation;
    /**
     * The range of the graph in the x and y directions.
     */
    range: [x: Range, y: Range];
    /**
     * Whether the graph is bounded on the x and y axes.
     */
    showAxisArrows: ShowAxisArrows;
    /**
     * How far apart the tick marks on the axes are in the x and y
     * directions.
     */
    step: [x: number, y: number];
    /**
     * How far apart the grid lines are in the x and y directions.
     */
    gridStep: [x: number, y: number];
    /**
     * How far apart the snap-to points are in the x and y directions.
     */
    snapStep: [x: number, y: number];
    /**
     * The size of the graph in pixels.
     */
    box: [x: number, y: number];

    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
    /**
     * The background image to display in the graph area and its properties.
     */
    backgroundImage: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * Whether to show the protractor on the graph.
     */
    showProtractor: boolean;
    /**
     * Whether to show tooltips on the graph.
     * (Currently not used, but will be in the future.)
     */
    showTooltips: boolean;
    /**
     * The current correct answer for the graph. Updated by this component
     * when the graph is changed.
     *
     * Note that the "Correct answer:" textbox is not an interactive
     * element. Instead, it is a representation of the correct answer based
     * on the state of the interactive graph previewed at the bottom of the
     * editor page.
     */
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct: PerseusGraphType;
    /**
     * The locked figures to display in the graph area.
     * Locked figures are graph elements (points, lines, line segmeents,
     * etc.) that are locked in place and not interactive.
     */
    lockedFigures?: Array<LockedFigure>;
    // Aria-label for the full graph area. Short title for the graph.
    fullGraphAriaLabel?: string;
    // Aria-description for the graph area. Longer description of the graph.
    // Note that the `aria-description` property is not supported well,
    // so this description will be hidden in a DOM element whose ID will
    // then be referenced by the graph's `aria-describedby` property.
    fullGraphAriaDescription?: string;

    /**
     * The graph to display in the graph area.
     */
    graph: InteractiveGraphProps["userInput"];
    onChange: (props: Partial<Props>) => void;
    // Whether the graph has been set to static mode.
    // Graphs in static mode are not interactive, and their coords are
    // set to those of the "correct" graph in the editor.
    static?: boolean;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for the InteractiveGraph widget, which allows the user to
 * specify the graph's properties and the correct answer.
 *
 * Used in the exercise editor.
 */
class InteractiveGraphEditor extends React.Component<Props> {
    static widgetName = "interactive-graph";
    displayName = "InteractiveGraphEditor";
    className = "perseus-widget-interactive-graph";

    static defaultProps: InteractiveGraphDefaultWidgetOptions & {
        valid: true | string;
    } = {
        ...interactiveGraphLogic.defaultWidgetOptions,
        valid: true,
        lockedFigures: [],
    };

    changeStartCoords = (coords) => {
        if (!this.props.graph?.type) {
            return;
        }

        const graph = {
            ...this.props.graph,
            startCoords: coords,
        };
        this.props.onChange({graph: graph});
    };

    // serialize() is what makes copy/paste work. All the properties included
    // in the serialization json are included when, for example, a graph
    // is copied from the question editor and pasted into the hint editor
    // (double brackets in the markdown).
    serialize(): PerseusInteractiveGraphWidgetOptions {
        const json = _.pick(
            this.props,
            "step",
            "backgroundImage",
            "markings",
            "labels",
            "labelLocation",
            "showProtractor",
            "showTooltips",
            "range",
            "showAxisArrows",
            "gridStep",
            "snapStep",
            "lockedFigures",
            "fullGraphAriaLabel",
            "fullGraphAriaDescription",
        );

        // eslint-disable-next-line react/no-string-refs
        const graph = this.refs.graph;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (graph) {
            // @ts-expect-error TS2339 Property 'getUserInput' does not exist on type 'ReactInstance'. Property 'getUserInput' does not exist on type 'Component<any, {}, any>'.
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            const correct = graph && graph.getUserInput();
            _.extend(json, {
                graph: {
                    type: correct.type,
                    startCoords:
                        this.props.graph && getStartCoords(this.props.graph),
                },
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
                        // @ts-expect-error - TS2339 - Property 'graph' does not exist on type 'Pick<any, "step" | "range" | "backgroundImage" | "snapStep" | "labels" | "showTooltips" | "markings" | "gridStep" | "showProtractor">'.
                        json.graph[key] = correct[key];
                    }
                },
            );
        }
        // @ts-expect-error TS2739 Type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "step" | "gridStep" | "snapStep" | "backgroundImage" | "markings" | "labels" | ... 5 more ... | "range">' is missing the following properties from type 'PerseusInteractiveGraphWidgetOptions': graph, correct
        return json;
    }

    getSaveWarnings = () => {
        const issues: Array<any | string> = [];

        // A locked line on the graph cannot have length 0.
        for (const figure of this.props.lockedFigures ?? []) {
            if (
                figure.type === "line" &&
                kvector.equal(figure.points[0].coord, figure.points[1].coord)
            ) {
                issues.push("The line cannot have length 0.");
            }
        }

        // Do not save a unlimited polygon that is open (coords is null).
        if (
            this.props.graph?.type === "polygon" &&
            this.props.graph.numSides === "unlimited" &&
            this.props.graph.coords === null
        ) {
            issues.push("Polygon must be closed.");
        }

        return issues;
    };

    render() {
        let graph;
        let equationString;

        const gridStep =
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            this.props.gridStep ||
            Util.getGridStep(
                this.props.range,
                this.props.step,
                interactiveSizes.defaultBoxSize,
            );
        const snapStep =
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        const sizeClass = containerSizeClass.SMALL;
        if (this.props.valid === true) {
            const correct = this.props.correct;

            // TODO(aria): send these down all at once
            const graphProps = {
                ref: "graph",
                box: this.props.box,
                range: this.props.range,
                showAxisArrows: this.props.showAxisArrows,
                labels: this.props.labels,
                labelLocation: this.props.labelLocation,
                step: this.props.step,
                gridStep: gridStep,
                snapStep: snapStep,
                backgroundImage: this.props.backgroundImage,
                markings: this.props.markings,
                showProtractor: this.props.showProtractor,
                showTooltips: this.props.showTooltips,
                lockedFigures: this.props.lockedFigures,
                fullGraphAriaLabel: this.props.fullGraphAriaLabel,
                fullGraphAriaDescription: this.props.fullGraphAriaDescription,
                // Set the "correct answer" graph to static when editing is disabled
                static: this.props.apiOptions.editingDisabled ?? false,
                trackInteraction: function () {},
                userInput: correct,
                handleUserInput: (
                    newGraph: InteractiveGraphProps["userInput"],
                ) => {
                    let correct = this.props.correct;
                    // TODO(benchristel): can we improve the type of onChange
                    // so this invariant isn't necessary?
                    invariant(newGraph != null);
                    if (correct.type === newGraph.type) {
                        correct = mergeGraphs(correct, newGraph);
                    } else {
                        // Clear options from previous graph
                        correct = newGraph;
                    }
                    this.props.onChange({
                        correct: correct,
                        graph: this.props.graph,
                    });
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
            <Id>
                {(graphId) => (
                    <View>
                        <LabeledRow label="Answer type:">
                            <GraphTypeSelector
                                graphType={
                                    this.props.graph?.type ??
                                    InteractiveGraph.defaultProps.userInput.type
                                }
                                // TODO(LEMS-2656): remove TS suppression
                                onChange={
                                    ((
                                        type: Required<InteractiveGraphProps>["userInput"]["type"],
                                    ) => {
                                        this.props.onChange({
                                            graph: {type},
                                            correct: {type},
                                        });
                                    }) as any
                                }
                            />
                        </LabeledRow>
                        <InteractiveGraphDescription
                            ariaLabelValue={this.props.fullGraphAriaLabel ?? ""}
                            ariaDescriptionValue={
                                this.props.fullGraphAriaDescription ?? ""
                            }
                            onChange={this.props.onChange}
                        />
                        <InteractiveGraphCorrectAnswer
                            id={graphId}
                            equationString={equationString}
                        >
                            {graph}
                        </InteractiveGraphCorrectAnswer>

                        {this.props.correct?.type === "angle" && (
                            <AngleAnswerOptions
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={this.props.onChange}
                            />
                        )}
                        {this.props.correct?.type === "point" && (
                            <GraphPointsCountSelector
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={this.props.onChange}
                            />
                        )}
                        {this.props.correct?.type === "polygon" && (
                            <PolygonAnswerOptions
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={this.props.onChange}
                            />
                        )}
                        {this.props.correct?.type === "segment" && (
                            <SegmentCountSelector
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={this.props.onChange}
                            />
                        )}

                        {this.props.graph?.type &&
                            shouldShowStartCoordsUI(
                                this.props.graph,
                                this.props.static,
                            ) && (
                                <StartCoordsSettings
                                    {...this.props.graph}
                                    range={this.props.range}
                                    step={this.props.step}
                                    onChange={this.changeStartCoords}
                                />
                            )}
                        <InteractiveGraphSRTree
                            graphId={graphId}
                            correct={this.props.correct}
                            fullGraphAriaLabel={this.props.fullGraphAriaLabel}
                            fullGraphAriaDescription={
                                this.props.fullGraphAriaDescription
                            }
                            lockedFigures={this.props.lockedFigures}
                        />
                        <InteractiveGraphSettings
                            box={getInteractiveBoxFromSizeClass(sizeClass)}
                            range={this.props.range}
                            showAxisArrows={this.props.showAxisArrows}
                            labels={this.props.labels}
                            labelLocation={this.props.labelLocation}
                            step={this.props.step}
                            gridStep={gridStep}
                            snapStep={snapStep}
                            valid={this.props.valid}
                            backgroundImage={this.props.backgroundImage}
                            markings={this.props.markings}
                            showProtractor={this.props.showProtractor}
                            showTooltips={this.props.showTooltips}
                            onChange={this.props.onChange}
                            editingDisabled={
                                this.props.apiOptions.editingDisabled
                            }
                        />
                        <LockedFiguresSection
                            figures={this.props.lockedFigures}
                            onChange={this.props.onChange}
                        />
                    </View>
                )}
            </Id>
        );
    }
}

// Merges two graphs that have the same `type`. Properties defined in `b`
// overwrite properties of the same name in `a`. Throws an exception if the
// types are different or not recognized.
function mergeGraphs(
    a: PerseusGraphType,
    b: PerseusGraphType,
): PerseusGraphType {
    if (a.type !== b.type) {
        throw new Error(
            `Cannot merge graphs with different types (${a.type} and ${b.type})`,
        );
    }
    switch (a.type) {
        case "angle":
            invariant(b.type === "angle");
            return {...a, ...b};
        case "circle":
            invariant(b.type === "circle");
            return {...a, ...b};
        case "linear":
            invariant(b.type === "linear");
            return {...a, ...b};
        case "linear-system":
            invariant(b.type === "linear-system");
            return {...a, ...b};
        case "none":
            invariant(b.type === "none");
            return {...a, ...b};
        case "point":
            invariant(b.type === "point");
            return {...a, ...b};
        case "polygon":
            invariant(b.type === "polygon");
            return {...a, ...b};
        case "quadratic":
            invariant(b.type === "quadratic");
            return {...a, ...b};
        case "ray":
            invariant(b.type === "ray");
            return {...a, ...b};
        case "segment":
            invariant(b.type === "segment");
            return {...a, ...b};
        case "sinusoid":
            invariant(b.type === "sinusoid");
            return {...a, ...b};
        default:
            throw new UnreachableCaseError(a);
    }
}

export default InteractiveGraphEditor;
