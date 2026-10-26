import {vector as kvector} from "@khanacademy/kmath";
import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import {
    ApiOptions,
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
    InteractiveGraphWidget,
    interactiveSizes,
    Util,
} from "@khanacademy/perseus";
import type {
    PerseusGraphType,
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphWidgetOptions,
} from "@khanacademy/perseus-core";
import {interactiveGraphLogic} from "@khanacademy/perseus-core";
import {Id, View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import AngleAnswerOptions from "./components/angle-answer-options";
import GraphPointsCountSelector from "./components/graph-points-count-selector";
import GraphTypeSelector from "./components/graph-type-selector";
import {InteractiveGraphCorrectAnswer} from "./components/interactive-graph-correct-answer";
import InteractiveGraphDescription from "./components/interactive-graph-description";
import type {InteractiveGraphSettingsData} from "./components/interactive-graph-settings";
import InteractiveGraphSettings from "./components/interactive-graph-settings";
import InteractiveGraphSRTree from "./components/interactive-graph-sr-tree";
import PolygonAnswerOptions from "./components/polygon-answer-options";
import SegmentCountSelector from "./components/segment-count-selector";
import ShowPointLabelsToggle from "./components/show-point-labels-toggle";
import VectorAnswerOptions from "./components/vector-answer-options";
import LabeledRow from "./locked-figures/labeled-row";
import LockedFiguresSection from "./locked-figures/locked-figures-section";
import StartCoordsSettings from "./start-coords/start-coords-settings";
import {shouldShowStartCoordsUI} from "./start-coords/util";
import {reshapePointLabelsForGraphType} from "./utils/reshape-point-labels";
import type {WidgetEditorProps} from "../widget-editor-props";

const InteractiveGraph: typeof InteractiveGraphWidget.widget =
    InteractiveGraphWidget.widget;

interface State {
    /**
     * An error message to display in the graph area, or true if the
     * graph is valid.
     */
    valid: true | string;
}

export type Props = WidgetEditorProps<PerseusInteractiveGraphWidgetOptions>;

/**
 * An editor for the InteractiveGraph widget, which allows the user to
 * specify the graph's properties and the correct answer.
 *
 * Used in the exercise editor.
 */
class InteractiveGraphEditor extends React.Component<Props, State> {
    static bestPractices = {
        // TODO: replace with real best practices
        // see: https://github.com/Khan/perseus/pull/3466#discussion_r3157121327
        url: "https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3295281289/Interactive+Graph+Widget#Adding-a-new-Interactive-Graph-Widget",
        label: "Interactive Graph best practices",
    };
    displayName = "InteractiveGraphEditor";
    className = "perseus-widget-interactive-graph";

    state: State = {
        valid: true,
    };

    static defaultProps = {
        ...interactiveGraphLogic.defaultWidgetOptions,
    };

    handleChange(changes: Partial<PerseusInteractiveGraphWidgetOptions>) {
        this.props.onChange({
            step: this.props.step,
            gridStep: this.props.gridStep,
            snapStep: this.props.snapStep,
            backgroundImage: this.props.backgroundImage,
            markings: this.props.markings,
            labels: this.props.labels,
            labelLocation: this.props.labelLocation,
            showAxisArrows: this.props.showAxisArrows,
            showAxisTicks: this.props.showAxisTicks,
            showProtractor: this.props.showProtractor,
            showRuler: this.props.showRuler,
            showTooltips: this.props.showTooltips,
            rulerLabel: this.props.rulerLabel,
            rulerTicks: this.props.rulerTicks,
            range: this.props.range,
            graph: this.props.graph,
            correct: this.props.correct,
            lockedFigures: this.props.lockedFigures,
            fullGraphAriaLabel: this.props.fullGraphAriaLabel,
            fullGraphAriaDescription: this.props.fullGraphAriaDescription,
            ...changes,
        });
    }

    handleSettingsChange({valid, ...settings}: InteractiveGraphSettingsData) {
        this.setState({valid});
        if (valid === true) {
            this.handleChange(settings);
        }
    }

    changeStartCoords = (coords) => {
        if (!this.props.graph?.type) {
            return;
        }

        const graph = {
            ...this.props.graph,
            startCoords: coords,
        };
        this.handleChange({graph: graph});
    };

    changePointLabels = (pointLabels: ReadonlyArray<string>) => {
        const next = reshapePointLabelsForGraphType(
            pointLabels,
            this.props.graph,
            this.props.correct,
        );
        if (next) {
            this.handleChange(next);
        }
    };

    changeShowPointLabels = (showPointLabels: boolean) => {
        const {graph, correct} = this.props;
        if (graph === undefined || correct === undefined) {
            return;
        }
        const newGraph = withShowPointLabels(graph, showPointLabels);
        const newCorrect = withShowPointLabels(correct, showPointLabels);
        // Custom point labels are not applicable for `vector` or `none`
        // graph types — they have no movable points to label.
        if (newGraph === undefined || newCorrect === undefined) {
            return;
        }
        this.handleChange({graph: newGraph, correct: newCorrect});
    };

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
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

        // Exponential: the start asymptote must not fall between or on the
        // curve's start points — that configuration produces an invalid
        // exponential (the coefficient formula requires all points to be
        // strictly on one side of the asymptote).
        if (
            this.props.graph?.type === "exponential" &&
            this.props.graph.startCoords != null
        ) {
            const {coords, asymptote} = this.props.graph.startCoords;
            const asymptoteY = asymptote;
            const minY = Math.min(coords[0][1], coords[1][1]);
            const maxY = Math.max(coords[0][1], coords[1][1]);
            if (asymptoteY >= minY && asymptoteY <= maxY) {
                issues.push(
                    "The exponential start asymptote must not fall between or on the curve's start points.",
                );
            }
        }

        // Logarithm: the start asymptote must not fall between or on the
        // curve's start points — that configuration produces an invalid
        // logarithm (the coefficient formula requires all points to be
        // strictly on one side of the asymptote).
        if (
            this.props.graph?.type === "logarithm" &&
            this.props.graph.startCoords != null
        ) {
            const {coords, asymptote} = this.props.graph.startCoords;
            const asymptoteX = asymptote;
            const minX = Math.min(coords[0][0], coords[1][0]);
            const maxX = Math.max(coords[0][0], coords[1][0]);
            if (asymptoteX >= minX && asymptoteX <= maxX) {
                issues.push(
                    "The logarithm start asymptote must not fall between or on the curve's start points.",
                );
            }
        }

        return issues;
    };

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

        const apiOptionsWithDefaults: APIOptionsWithDefaults = {
            // TODO(LEMS-4681): Remove ApiOptions.defaults once all apiOptions
            //  are passed to this component.
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };

        if (this.state.valid === true) {
            // Default `correct` to `graph` if the type is wrong. This works
            // around a bug in the AX editor.
            // See: https://khanacademy.atlassian.net/browse/LEMS-3903
            const correct =
                this.props.correct.type === this.props.graph?.type
                    ? this.props.correct
                    : this.props.graph;

            const graphProps = {
                options: {
                    range: this.props.range,
                    showAxisArrows: this.props.showAxisArrows,
                    showAxisTicks: this.props.showAxisTicks,
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
                    fullGraphAriaDescription:
                        this.props.fullGraphAriaDescription,
                },
                // Set the "correct answer" graph to static when editing is disabled
                // TODO(LEMS-4681): Remove default for editingDisabled once all
                //  apiOptions are passed to this component.
                static: this.props.apiOptions?.editingDisabled ?? false,
                trackInteraction: function () {},
                userInput:
                    this.props.static === true &&
                    correct != null &&
                    "showPointLabels" in correct
                        ? {...correct, showPointLabels: false}
                        : correct,
                handleUserInput: (
                    newGraph: PerseusInteractiveGraphUserInput,
                ) => {
                    // The code below was written under the assumption that
                    // static graphs can never display visible point labels,
                    // though I don't think there's any product reason for that
                    // restriction. If we set `showPointLabels = true` on the
                    // `correct` field of a static graph, the graph in the
                    // editor will show the labels while the learner view does
                    // not. This conditional prevents that inconsistency by
                    // hiding the labels in the editor.
                    // TODO(benchristel): let static graphs show point labels,
                    //  and delete this special-case handling.
                    if (
                        this.props.static === true &&
                        "showPointLabels" in newGraph
                    ) {
                        newGraph = {
                            ...newGraph,
                            showPointLabels:
                                "showPointLabels" in this.props.correct
                                    ? this.props.correct.showPointLabels
                                    : undefined,
                        };
                    }
                    this.handleChange({correct: newGraph});
                }
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
                        // TODO(LEMS-4681): Use apiOptions here.
                        ...apiOptionsWithDefaults,
                        isMobile: false,
                    }}
                />
            );
            // TODO(kevinb): Update getEquationString to only accept the data it actually
            // needs to compute the equation string.
            // @ts-expect-error - TS2345 - Argument of type '{ readonly ref: "graph"; readonly box: any; readonly range: any; readonly labels: any; readonly step: any; readonly gridStep: any; readonly snapStep: any; readonly graph: any; readonly backgroundImage: any; ... 6 more ...; readonly onChange: (newProps: Pick<...> & ... 1 more ... & InexactPartial<...>) => void; }' is not assignable to parameter of type 'Props'.
            equationString = InteractiveGraph.getEquationString(graphProps);
        } else {
            graph = <div className="perseus-error">{this.state.valid}</div>;
        }

        return (
            <Id>
                {(graphId) => (
                    <View>
                        <LabeledRow label="Answer type" labelSize="medium">
                            <GraphTypeSelector
                                disabled={
                                    this.props.apiOptions?.editingDisabled ??
                                    false
                                }
                                graphType={this.props.graph?.type ?? "none"}
                                onChange={(type) => {
                                    this.handleChange({
                                        graph: {type},
                                        correct: {type},
                                    });
                                }}
                            />
                        </LabeledRow>
                        <InteractiveGraphDescription
                            ariaLabelValue={this.props.fullGraphAriaLabel ?? ""}
                            ariaDescriptionValue={
                                this.props.fullGraphAriaDescription ?? ""
                            }
                            editingDisabled={
                                this.props.apiOptions?.editingDisabled ?? false
                            }
                            onChange={(options) => this.handleChange(options)}
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
                                onChange={(options) =>
                                    this.handleChange(options)
                                }
                            />
                        )}
                        {this.props.correct?.type === "point" && (
                            <GraphPointsCountSelector
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={(options) =>
                                    this.handleChange(options)
                                }
                            />
                        )}
                        {this.props.correct?.type === "polygon" && (
                            <PolygonAnswerOptions
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={(options) =>
                                    this.handleChange(options)
                                }
                            />
                        )}
                        {this.props.correct?.type === "vector" && (
                            <VectorAnswerOptions
                                correct={this.props.correct}
                                onChange={(options) =>
                                    this.handleChange(options)
                                }
                            />
                        )}
                        {this.props.correct?.type === "segment" && (
                            <SegmentCountSelector
                                correct={this.props.correct}
                                graph={this.props.graph}
                                onChange={(options) =>
                                    this.handleChange(options)
                                }
                            />
                        )}

                        {!this.props.static &&
                            this.props.graph?.type &&
                            this.props.graph.type !== "vector" &&
                            this.props.graph.type !== "none" && (
                                <ShowPointLabelsToggle
                                    showPointLabels={
                                        this.props.graph.showPointLabels ===
                                        true
                                    }
                                    pointLabels={this.props.graph.pointLabels}
                                    onChange={this.changeShowPointLabels}
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
                                    editingDisabled={
                                        this.props.apiOptions
                                            ?.editingDisabled ?? false
                                    }
                                    onChange={this.changeStartCoords}
                                    onChangePointLabels={this.changePointLabels}
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
                            editingDisabled={
                                this.props.apiOptions?.editingDisabled ?? false
                            }
                        />
                        <InteractiveGraphSettings
                            box={getInteractiveBoxFromSizeClass(sizeClass)}
                            range={this.props.range}
                            showAxisArrows={this.props.showAxisArrows}
                            showAxisTicks={this.props.showAxisTicks}
                            labels={this.props.labels}
                            labelLocation={this.props.labelLocation}
                            step={this.props.step}
                            gridStep={gridStep}
                            snapStep={snapStep}
                            valid={this.state.valid}
                            backgroundImage={this.props.backgroundImage}
                            markings={this.props.markings}
                            showProtractor={this.props.showProtractor}
                            showTooltips={this.props.showTooltips}
                            onChange={(settings) =>
                                this.handleSettingsChange(settings)
                            }
                            // TODO(LEMS-4681): Use apiOptions here.
                            apiOptions={apiOptionsWithDefaults}
                        />
                        <LockedFiguresSection
                            figures={this.props.lockedFigures}
                            onChange={(options) => this.handleChange(options)}
                            // TODO(LEMS-4681): Use apiOptions here.
                            apiOptions={apiOptionsWithDefaults}
                        />
                    </View>
                )}
            </Id>
        );
    }
}

// Returns a copy of `graph` with `showPointLabels` set, narrowed per the
// graph type so TypeScript can verify that every variant that supports
// `showPointLabels` is handled. Returns `undefined` for `vector` and
// `none`, which have no movable points to label. The exhaustive default
// makes TypeScript fail this code if a new `PerseusGraphType` variant is
// added — that's the point.
function withShowPointLabels(
    graph: PerseusGraphType,
    showPointLabels: boolean,
): PerseusGraphType | undefined {
    switch (graph.type) {
        case "absolute-value":
        case "angle":
        case "circle":
        case "exponential":
        case "linear":
        case "linear-system":
        case "logarithm":
        case "point":
        case "polygon":
        case "quadratic":
        case "ray":
        case "segment":
        case "sinusoid":
        case "tangent":
            return {...graph, showPointLabels};
        case "none":
        case "vector":
            return undefined;
        default:
            throw new UnreachableCaseError(graph);
    }
}

export default InteractiveGraphEditor;
