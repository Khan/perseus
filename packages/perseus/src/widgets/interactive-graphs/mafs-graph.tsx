import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";

import AxisArrows from "./backgrounds/axis-arrows";
import AxisLabels from "./backgrounds/axis-labels";
import {AxisTicks} from "./backgrounds/axis-ticks";
import {Grid} from "./backgrounds/grid";
import {LegacyGrid} from "./backgrounds/legacy-grid";
import GraphLockedLabelsLayer from "./graph-locked-labels-layer";
import GraphLockedLayer from "./graph-locked-layer";
import {
    LinearGraph,
    LinearSystemGraph,
    PolygonGraph,
    RayGraph,
    SegmentGraph,
    CircleGraph,
    QuadraticGraph,
    SinusoidGraph,
    AngleGraph,
} from "./graphs";
import {SvgDefs} from "./graphs/components/text-label";
import {PointGraph} from "./graphs/point";
import {MIN, X, Y} from "./math";
import {Protractor} from "./protractor";
import {type InteractiveGraphAction} from "./reducer/interactive-graph-action";
import {actions} from "./reducer/interactive-graph-action";
import {GraphConfigContext} from "./reducer/use-graph-config";

import type {InteractiveGraphState, InteractiveGraphProps} from "./types";
import type {vec} from "mafs";

import "mafs/core.css";
import "./mafs-styles.css";

export type MafsGraphProps = {
    showLabelsFlag?: boolean;
    box: [number, number];
    backgroundImage?: InteractiveGraphProps["backgroundImage"];
    lockedFigures?: InteractiveGraphProps["lockedFigures"];
    step: InteractiveGraphProps["step"];
    gridStep: InteractiveGraphProps["gridStep"];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: InteractiveGraphProps["markings"];
    showTooltips: Required<InteractiveGraphProps["showTooltips"]>;
    showProtractor: boolean;
    labels: InteractiveGraphProps["labels"];
    fullGraphAriaLabel?: InteractiveGraphProps["fullGraphAriaLabel"];
    fullGraphAriaDescription?: InteractiveGraphProps["fullGraphAriaDescription"];
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
    readOnly: boolean;
    static: boolean | null | undefined;
};

export const MafsGraph = (props: MafsGraphProps) => {
    const {
        state,
        dispatch,
        labels,
        readOnly,
        fullGraphAriaLabel,
        fullGraphAriaDescription,
    } = props;
    const [width, height] = props.box;
    const tickStep = props.step as vec.Vector2;

    const uniqueId = React.useId();
    const descriptionId = `interactive-graph-description-${uniqueId}`;
    const graphRef = React.useRef<HTMLElement>(null);

    // Calculate the viewBox for the nested SVG that contains
    // the interactive elements and locked figures to prevent overflow
    const {viewboxX, viewboxY} = calculateNestedSVGCoords(
        state.range,
        width,
        height,
    );
    const viewBox = `${viewboxX} ${viewboxY} ${width} ${height}`;

    return (
        <GraphConfigContext.Provider
            value={{
                range: state.range,
                snapStep: state.snapStep,
                markings: props.markings,
                tickStep: tickStep,
                gridStep: props.gridStep,
                showTooltips: !!props.showTooltips,
                graphDimensionsInPixels: props.box,
                width,
                height,
                labels,
                disableKeyboardInteraction: readOnly || !!props.static,
            }}
        >
            <View>
                <View
                    className="mafs-graph"
                    style={{
                        position: "relative",
                        padding: "25px 25px 0 0",
                        boxSizing: "content-box",
                        marginLeft: "20px",
                        marginBottom: "30px",
                        pointerEvents: props.static ? "none" : "auto",
                        userSelect: "none",
                        width,
                        height,
                    }}
                    onKeyUp={(event) => {
                        if (event.key === "Backspace") {
                            dispatch(actions.global.deleteIntent());
                            graphRef.current?.focus();
                        }
                    }}
                    aria-label={fullGraphAriaLabel}
                    aria-describedby={
                        fullGraphAriaDescription ? descriptionId : undefined
                    }
                    ref={graphRef}
                    tabIndex={0}
                >
                    {fullGraphAriaDescription && (
                        <View
                            id={descriptionId}
                            tabIndex={-1}
                            style={{
                                width: 0,
                                height: 0,
                                overflow: "hidden",
                            }}
                        >
                            {fullGraphAriaDescription}
                        </View>
                    )}
                    <LegacyGrid
                        box={props.box}
                        backgroundImage={props.backgroundImage}
                    />
                    {/* Locked labels layer */}
                    {props.showLabelsFlag && props.lockedFigures && (
                        <GraphLockedLabelsLayer
                            lockedFigures={props.lockedFigures}
                        />
                    )}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    >
                        {props.markings === "graph" && (
                            <>
                                <AxisLabels />
                            </>
                        )}
                        <Mafs
                            preserveAspectRatio={false}
                            viewBox={{
                                x: state.range[X],
                                y: state.range[Y],
                                padding: 0,
                            }}
                            pan={false}
                            zoom={false}
                            width={width}
                            height={height}
                        >
                            {/* Svg definitions to render only once */}
                            <SvgDefs />
                            {/* Background layer */}
                            <Grid
                                tickStep={props.step}
                                gridStep={props.gridStep}
                                range={state.range}
                                containerSizeClass={props.containerSizeClass}
                                markings={props.markings}
                                width={width}
                                height={height}
                            />
                            {/* Axis Ticks, Labels, and Arrows */}
                            {
                                // Only render the axis ticks and arrows if the markings are set to a full "graph"
                                props.markings === "graph" && (
                                    <>
                                        <AxisTicks />
                                        <AxisArrows />
                                    </>
                                )
                            }
                            {/* Nested SVG to prevent figures from overflowing the graph bounds */}
                            <svg
                                width={width}
                                height={height}
                                viewBox={viewBox}
                                preserveAspectRatio="xMidYMin"
                                x={viewboxX}
                                y={viewboxY}
                            >
                                {/* Locked figures layer */}
                                {props.lockedFigures && (
                                    <GraphLockedLayer
                                        lockedFigures={props.lockedFigures}
                                        range={state.range}
                                    />
                                )}
                                {/* Protractor */}
                                {props.showProtractor && <Protractor />}
                                {/* Interactive layer */}
                                {renderGraph({
                                    state,
                                    dispatch,
                                })}
                            </svg>
                        </Mafs>
                    </View>
                </View>
                {renderGraphControls({state, dispatch})}
            </View>
        </GraphConfigContext.Provider>
    );
};

const renderPointGraphControls = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => (
    <Button
        kind="secondary"
        style={{
            width: "100%",
            marginLeft: "20px",
        }}
        onClick={() => {
            props.dispatch(actions.pointGraph.addPoint([0, 0]));
        }}
    >
        Add Point
    </Button>
);

const renderGraphControls = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {state, dispatch} = props;
    const {type} = state;
    switch (type) {
        case "point":
            if (state.numPoints === "unlimited") {
                return renderPointGraphControls({state, dispatch});
            }
            return null;
        default:
            return null;
    }
};

// Calculate the difference between the min and max values of a range
const getRangeDiff = (range: vec.Vector2) => {
    const [min, max] = range;
    return Math.abs(max - min);
};

// We need to adjust the nested SVG viewbox x and Y values based on the range of the graph in order
// to ensure that the graph is sized and positioned correctly within the SVG and the clipping mask.
// Exported for testing.
export const calculateNestedSVGCoords = (
    range: vec.Vector2[],
    width: number,
    height: number,
): {viewboxX: number; viewboxY: number} => {
    // X RANGE
    let viewboxX = 0; // When xMin is 0, we want to use 0 as the viewboxX value
    const totalXRange = getRangeDiff(range[X]);
    const gridCellWidth = width / totalXRange;
    const minX = range[X][MIN];

    // If xMin is entirely positive, we need to adjust the
    // viewboxX to be the grid cell width multiplied by xMin
    if (minX > 0) {
        viewboxX = gridCellWidth * Math.abs(minX);
    }
    // If xMin is negative, we need to adjust the viewboxX to be
    // the negative value of the grid cell width multiplied by xMin
    if (minX < 0) {
        viewboxX = -gridCellWidth * Math.abs(minX);
    }

    // Y RANGE
    let viewboxY = -height; // When yMin is 0, we want to use the negative value of the graph height
    const totalYRange = getRangeDiff(range[Y]);
    const gridCellHeight = height / totalYRange;
    const minY = range[Y][MIN];

    // If the y range is entirely positive, we want a negative sum of the
    // height and the gridcell height multiplied by the absolute value of yMin
    if (minY > 0) {
        viewboxY = -height - gridCellHeight * Math.abs(minY);
    }

    // If the yMin is negative, we want to multiply the gridcell height
    // by the absolute value of yMin, and subtract the full height of the graph
    if (minY < 0) {
        viewboxY = gridCellHeight * Math.abs(minY) - height;
    }

    return {
        viewboxX,
        viewboxY,
    };
};

const renderGraph = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {state, dispatch} = props;
    const {type} = state;
    switch (type) {
        case "angle":
            return <AngleGraph graphState={state} dispatch={dispatch} />;
        case "segment":
            return <SegmentGraph graphState={state} dispatch={dispatch} />;
        case "linear-system":
            return <LinearSystemGraph graphState={state} dispatch={dispatch} />;
        case "linear":
            return <LinearGraph graphState={state} dispatch={dispatch} />;
        case "ray":
            return <RayGraph graphState={state} dispatch={dispatch} />;
        case "polygon":
            return <PolygonGraph graphState={state} dispatch={dispatch} />;
        case "point":
            return <PointGraph graphState={state} dispatch={dispatch} />;
        case "circle":
            return <CircleGraph graphState={state} dispatch={dispatch} />;
        case "quadratic":
            return <QuadraticGraph graphState={state} dispatch={dispatch} />;
        case "sinusoid":
            return <SinusoidGraph graphState={state} dispatch={dispatch} />;
        default:
            throw new UnreachableCaseError(type);
    }
};
