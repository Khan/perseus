import {
    number as knumber,
    vector as kvector,
    point as kpoint,
} from "@khanacademy/kmath";
import {deepClone, GrapherUtil} from "@khanacademy/perseus-core";
import * as React from "react";

import ButtonGroup from "../../components/button-group";
import Graphie from "../../components/graphie";
import SvgImage from "../../components/svg-image";
import Interactive2 from "../../interactive2";
import WrappedLine from "../../interactive2/wrapped-line";
import * as Changeable from "../../mixins/changeable";
import {interactiveSizes} from "../../styles/constants";
import Util from "../../util";
import KhanColors from "../../util/colors";
import {getInteractiveBoxFromSizeClass} from "../../util/sizing-utils";
/* Graphie and relevant components. */
/* Mixins. */
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/grapher/grapher-ai-utils";

import {
    DEFAULT_GRAPHER_PROPS,
    chooseType,
    defaultPlotProps,
    getGridAndSnapSteps,
    maybePointsFromNormalized,
    movableTypeToComponent,
    typeToButton,
} from "./util";

import type {Coord, Line} from "../../interactive2/types";
import type {ChangeableProps} from "../../mixins/changeable";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {GridDimensions} from "../../util";
import type {GrapherPromptJSON} from "../../widget-ai-utils/grapher/grapher-ai-utils";
import type {
    PerseusGrapherWidgetOptions,
    PerseusGrapherUserInput,
    GrapherPublicWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// @ts-expect-error - TS2339 - Property 'MovablePoint' does not exist on type 'typeof Graphie'.
const MovablePoint = Graphie.MovablePoint;
// @ts-expect-error - TS2339 - Property 'MovableLine' does not exist on type 'typeof Graphie'.
const MovableLine = Graphie.MovableLine;

function isFlipped(newCoord: Coord, oldCoord: Coord, line: Line) {
    const CCW = (a: Coord, b: Coord, c: Coord) => {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    };
    return (
        CCW(line[0], line[1], oldCoord) > 0 !==
        CCW(line[0], line[1], newCoord) > 0
    );
}

/* Styles */
const typeSelectorStyle = {
    padding: "5px 5px",
} as const;

type FunctionGrapherProps = ChangeableProps & {
    graph: any;
    coords: any;
    asymptote: any;
    hideHairlines: () => void;
    isMobile: boolean;
    model: any;
    setDrawingAreaAvailable: () => void;
    showHairlines: () => void;
    showTooltips: boolean;
    static: boolean;
};

type DefaultFunctionGrapherProps = any;

/* Graphing interface. */
class FunctionGrapher extends React.Component<FunctionGrapherProps> {
    static defaultProps: DefaultFunctionGrapherProps = {
        graph: {
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
        },
        coords: null,
        asymptote: null,
        isMobile: false,
    };

    _coords = () => {
        const props = this.props;
        const graph = props.graph;
        const defaultModelCoords =
            props.model &&
            maybePointsFromNormalized(
                props.model.defaultCoords,
                graph.range,
                graph.step,
                graph.snapStep,
            );
        return props.coords || defaultModelCoords || null;
    };

    _asymptote = () => {
        // Unlike coords, asymptotes are never null; see defaultPlotProps.
        return this.props.asymptote;
    };

    change = (...args) => {
        // TODO(LEMS-2656): remove TS suppression
        // @ts-expect-error: Argument of type 'any[]' is not assignable to parameter of type '[newPropsOrSinglePropName: string | { [key: string]: any; }, propValue?: any, callback?: (() => unknown) | undefined]'. Target requires 1 element(s) but source may have fewer.
        return Changeable.change.apply(this, args);
    };

    renderPlot = () => {
        const model = this.props.model;
        const xRange = this.props.graph.range[0];
        const style = {
            stroke: this.props.isMobile
                ? KhanColors.BLUE_C
                : KhanColors.DYNAMIC,
            ...(this.props.isMobile ? {"stroke-width": 3} : {}),
        } as const;

        const coeffs = model.getCoefficients(this._coords(), this._asymptote());
        if (!coeffs) {
            return;
        }

        const functionProps = model.getPropsForCoeffs(coeffs, xRange);
        const Movable = movableTypeToComponent[model.movable];
        return (
            <Movable
                {...functionProps}
                key={this.props.model.url}
                range={xRange}
                style={style}
            />
        );
    };

    renderAsymptote = () => {
        const model = this.props.model;
        const graph = this.props.graph;
        const asymptote = this._asymptote();
        const showAsymptote = asymptote?.length > 0;
        const dashed = {
            strokeDasharray: "- ",
        } as const;

        return (
            showAsymptote && (
                <MovableLine
                    onMove={(newCoord, oldCoord) => {
                        // Calculate and apply displacement
                        const delta = kvector.subtract(newCoord, oldCoord);
                        const newAsymptote = this._asymptote().map((coord) =>
                            kvector.add(coord, delta),
                        );
                        this.props.onChange({
                            asymptote: newAsymptote,
                        });
                    }}
                    constraints={[
                        // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => void'.
                        Interactive2.MovableLine.constraints.bound(),
                        // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => void'.
                        Interactive2.MovableLine.constraints.snap(),
                        (newCoord, oldCoord: any) => {
                            // Calculate and apply proposed displacement
                            const delta = kvector.subtract(newCoord, oldCoord);
                            const proposedAsymptote = this._asymptote().map(
                                (coord) => kvector.add(coord, delta),
                            );
                            // Verify that resulting asymptote is valid for graph
                            if (model.extraAsymptoteConstraint) {
                                return model.extraAsymptoteConstraint(
                                    newCoord,
                                    oldCoord,
                                    this._coords(),
                                    proposedAsymptote,
                                    graph,
                                );
                            }
                            return true;
                        },
                    ]}
                    normalStyle={dashed}
                    highlightStyle={dashed}
                >
                    {asymptote.map((coord, i) => (
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
                    ))}
                </MovableLine>
            )
        );
    };

    render(): React.ReactNode {
        const pointForCoord = (coord: any, i) => {
            return (
                <MovablePoint
                    key={i}
                    coord={coord}
                    static={this.props.static}
                    constraints={[
                        Interactive2.MovablePoint.constraints.bound(),
                        Interactive2.MovablePoint.constraints.snap(),
                        (coord: any) => {
                            // Always enforce that this is a function
                            const isFunction = this._coords().every(
                                (otherCoord, j) => {
                                    return (
                                        i === j ||
                                        !otherCoord ||
                                        !knumber.equal(coord[0], otherCoord[0])
                                    );
                                },
                            );

                            // Evaluate this criteria before per-point
                            // constraints
                            if (!isFunction) {
                                return false;
                            }

                            // Specific functions have extra per-point
                            // constraints
                            if (
                                this.props.model &&
                                this.props.model.extraCoordConstraint
                            ) {
                                const extraConstraint =
                                    this.props.model.extraCoordConstraint;
                                // Calculate resulting coords and verify that
                                // they're valid for this graph
                                const proposedCoords = deepClone(
                                    this._coords(),
                                );
                                const oldCoord = deepClone(proposedCoords[i]);
                                proposedCoords[i] = coord;
                                return extraConstraint(
                                    coord,
                                    oldCoord,
                                    proposedCoords,
                                    this._asymptote(),
                                    this.props.graph,
                                );
                            }

                            return isFunction;
                        },
                    ]}
                    onMove={(newCoord, oldCoord) => {
                        let coords;
                        // Reflect over asymptote, if allowed
                        const asymptote = this._asymptote();
                        if (
                            asymptote &&
                            this.props.model.allowReflectOverAsymptote &&
                            isFlipped(newCoord, oldCoord, asymptote)
                        ) {
                            coords = this._coords().map((coord) => {
                                return kpoint.reflectOverLine(coord, asymptote);
                            });
                        } else {
                            coords = deepClone(this._coords());
                        }
                        coords[i] = newCoord;
                        this.props.onChange({
                            coords: coords,
                        });
                    }}
                    showHairlines={this.props.showHairlines}
                    hideHairlines={this.props.hideHairlines}
                    showTooltips={this.props.showTooltips}
                    isMobile={this.props.isMobile}
                />
            );
        };
        const points = this._coords().map(pointForCoord);
        const box = this.props.graph.box;

        const imageDescription = this.props.graph.backgroundImage;
        let image = null;
        if (imageDescription.url) {
            const scale = box[0] / interactiveSizes.defaultBoxSize;
            // @ts-expect-error - TS2322 - Type 'Element' is not assignable to type 'null'.
            image = (
                // @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; width: any; height: any; scale: number; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'.
                <SvgImage
                    src={imageDescription.url}
                    width={imageDescription.width}
                    height={imageDescription.height}
                    scale={scale}
                />
            );
        }

        return (
            <div
                className={"perseus-widget " + "perseus-widget-grapher"}
                style={{
                    width: box[0],
                    height: box[1],
                    boxSizing: "initial",
                }}
            >
                <div
                    className="graphie-container blank-background"
                    style={{
                        width: box[0],
                        height: box[1],
                    }}
                >
                    {image}
                    <Graphie
                        {...this.props.graph}
                        setDrawingAreaAvailable={
                            this.props.setDrawingAreaAvailable
                        }
                    >
                        {this.props.model && this.renderPlot()}
                        {this.props.model && this.renderAsymptote()}
                        {this.props.model && points}
                    </Graphie>
                </div>
            </div>
        );
    }
}

type RenderProps = Pick<GrapherPublicWidgetOptions, "availableTypes" | "graph">;

type Props = WidgetProps<RenderProps, PerseusGrapherUserInput>;

/* Widget and editor. */
class Grapher extends React.Component<Props> implements Widget {
    horizHairline: any;
    vertHairline: any;

    handlePlotChanges: (arg1: any) => any = (newPlot) => {
        const plot = {...this.props.userInput, ...newPlot};
        this.props.handleUserInput(plot);
        this.props.trackInteraction();
    };

    handleActiveTypeChange: (arg1: any) => any = (newType) => {
        const graph = this.props.graph;
        const plot = {
            ...this.props.userInput,
            ...defaultPlotProps(newType, graph),
        };
        this.props.handleUserInput(plot);
    };

    _getGridConfig(
        options: Props["graph"] & {
            box: NonNullable<Props["graph"]["box"]>;
            gridStep: NonNullable<Props["graph"]["gridStep"]>;
        },
    ): ReadonlyArray<GridDimensions> {
        return options.step.map((step, i) => {
            return Util.gridDimensionConfig(
                step,
                options.range[i],
                options.box[i],
                options.gridStep[i],
            );
        });
    }

    _calculateMobileTickStep(
        gridStep: NonNullable<PropsFor<typeof Graphie>["gridStep"]>,
        step: NonNullable<PropsFor<typeof Graphie>["step"]>,
        ranges: NonNullable<PropsFor<typeof Graphie>["ranges"]>,
    ): any {
        const tickStep = Util.constrainedTickStepsFromTickSteps(step, ranges);

        // According to the graphInit documentation in graphie.js, tickStep is
        // relative to the grid units so we need to adjust all values by the
        // grid step.
        tickStep[0] = tickStep[0] / gridStep[0];
        tickStep[1] = tickStep[1] / gridStep[1];

        return tickStep;
    }

    _setupGraphie: (arg1: any, arg2: any) => void = (graphie, options) => {
        const isMobile = this.props.apiOptions.isMobile;

        if (options.markings === "graph") {
            graphie.graphInit({
                range: options.range,
                scale: options.gridConfig.map((e) => e.scale),
                axisArrows: "<->",
                labelFormat: function (s) {
                    return "\\small{" + s + "}";
                },
                gridStep: options.gridStep,
                snapStep: options.snapStep,
                tickStep: isMobile
                    ? this._calculateMobileTickStep(
                          options.gridStep,
                          options.step,
                          options.range,
                      )
                    : options.gridConfig.map((e) => e.tickStep),
                labelStep: 1,
                unityLabels: options.gridConfig.map((e) => e.unityLabel),
                isMobile: isMobile,
            });
            graphie.label(
                [0, options.range[1][1]],
                options.labels[1],
                isMobile ? "below right" : "above",
            );
            graphie.label(
                [options.range[0][1], 0],
                options.labels[0],
                isMobile ? "above left" : "right",
            );
        } else if (options.markings === "grid") {
            graphie.graphInit({
                range: options.range,
                scale: options.gridConfig.map((e) => e.scale),
                gridStep: options.gridStep,
                axes: false,
                ticks: false,
                labels: false,
                isMobile: isMobile,
            });
        } else if (options.markings === "none") {
            graphie.init({
                range: options.range,
                scale: options.gridConfig.map((e) => e.scale),
            });
        }

        if (this.props.apiOptions.isMobile) {
            const hairlineStyle = {
                normalStyle: {
                    strokeWidth: 1,
                },
            } as const;

            this.horizHairline = new WrappedLine(
                graphie,
                [0, 0],
                [0, 0],
                hairlineStyle,
            );
            this.horizHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.horizHairline.hide();

            this.vertHairline = new WrappedLine(
                graphie,
                [0, 0],
                [0, 0],
                hairlineStyle,
            );
            this.vertHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.vertHairline.hide();
        }
    };

    showHairlines: (arg1: Coord) => void = (point) => {
        if (this.props.apiOptions.isMobile) {
            // Hairlines are already initialized when the graph is loaded, so
            // here we just move them to the updated location and make them
            // visible.
            this.horizHairline.moveTo(
                [this.props.graph.range[0][0], point[1]],
                [this.props.graph.range[0][1], point[1]],
            );

            this.horizHairline.show();

            this.vertHairline.moveTo(
                [point[0], this.props.graph.range[1][0]],
                [point[0], this.props.graph.range[1][1]],
            );

            this.vertHairline.show();
        }
    };

    hideHairlines: () => void = () => {
        if (this.props.apiOptions.isMobile) {
            this.horizHairline.hide();
            this.vertHairline.hide();
        }
    };

    getUserInput(): PerseusGrapherUserInput {
        return this.props.userInput;
    }

    getPromptJSON(): GrapherPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState() {
        const {userInput: _, ...rest} = this.props;
        return {
            ...rest,
            plot: this.props.userInput,
        };
    }

    render(): React.ReactNode {
        const type = this.props.userInput.type;
        const coords = this.props.userInput.coords;
        const asymptote =
            "asymptote" in this.props.userInput
                ? this.props.userInput.asymptote
                : undefined;

        const typeSelector = (
            <div style={typeSelectorStyle}>
                <ButtonGroup
                    value={type}
                    allowEmpty={true}
                    buttons={this.props.availableTypes.map(typeToButton)}
                    onChange={this.handleActiveTypeChange}
                />
            </div>
        );

        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );

        // Calculate additional graph properties so that the same values are
        // passed in to both FunctionGrapher and Graphie.
        const options = {
            ...this.props.graph,
            ...getGridAndSnapSteps(this.props.graph, box[0]),
            gridConfig: this._getGridConfig({
                ...this.props.graph,
                box: box,
                ...getGridAndSnapSteps(this.props.graph, box[0]),
            }),
        } as const;

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
            model: type && GrapherUtil.functionForType(type),
            coords: coords,
            asymptote: asymptote,
            static: this.props.static,
            setDrawingAreaAvailable:
                this.props.apiOptions.setDrawingAreaAvailable,
            isMobile: this.props.apiOptions.isMobile,
            showTooltips: this.props.graph.showTooltips,
            showHairlines: this.showHairlines,
            hideHairlines: this.hideHairlines,
        } as const;

        return (
            <div>
                {/* @ts-expect-error - TS2769 - No overload matches this call. */}
                <FunctionGrapher {...grapherProps} />
                {this.props.availableTypes.length > 1 && typeSelector}
            </div>
        );
    }
}

function transform(options: GrapherPublicWidgetOptions): RenderProps {
    const {availableTypes, graph} = options;

    return {
        availableTypes,
        graph,
    };
}

// Note that in addition to the standard staticTransform, in static
// mode we set static=true for the graph's handles in FunctionGrapher.
function staticTransform(options: PerseusGrapherWidgetOptions) {
    return {
        ...transform(options),
        // Don't display graph type choices if we're in static mode
        availableTypes: [options.correct.type],
        // Display the same graph marked as correct in the widget editor.
        plot: options.correct,
    };
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusGrapherUserInput {
    return serializedState.plot;
}

function getStartUserInput(
    options: GrapherPublicWidgetOptions,
): PerseusGrapherUserInput {
    // If there's only one type, the graph type is deterministic
    if (options.availableTypes.length === 1) {
        const graph = options.graph;
        const type = chooseType(options.availableTypes);
        if (type) {
            return defaultPlotProps(type, graph);
        }
    }

    return DEFAULT_GRAPHER_PROPS.plot;
}

0 as any as WidgetProps<
    PerseusGrapherWidgetOptions,
    PerseusGrapherUserInput
> satisfies PropsFor<typeof Grapher>;

0 as any as WidgetProps<
    GrapherPublicWidgetOptions,
    PerseusGrapherUserInput
> satisfies PropsFor<typeof Grapher>;

export default {
    name: "grapher",
    displayName: "Grapher",
    hidden: true,
    widget: Grapher,
    transform,
    staticTransform,
    getUserInputFromSerializedState,
    getStartUserInput,
} satisfies WidgetExports<typeof Grapher>;
