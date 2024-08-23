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
import {X, Y} from "./math";
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
    // the interactive elements and locked figures
    const viewBoxSettings = calculateNestedSVGViewBox(
        state.range,
        width,
        height,
    );

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
                                lockedFigures={props.lockedFigures}
                            />
                            {/* Axis Ticks and Labels */}
                            {
                                // Only render the axis ticks and arrows if the markings are set to a full "graph"
                                props.markings === "graph" && (
                                    <>
                                        <AxisTicks />
                                        <AxisArrows />
                                    </>
                                )
                            }
                            <svg
                                width={width}
                                height={height}
                                viewBox={`${viewBoxSettings.x} ${viewBoxSettings.y} ${width} ${height}`}
                                preserveAspectRatio="xMidYMin"
                                x={viewBoxSettings.x}
                                y={viewBoxSettings.y}
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

const getRangeDiff = (range: vec.Vector2) => {
    const [min, max] = range;
    return Math.abs(max - min);
};

// We need to adjust the nested SVG viewbox min values based on the range of the graph
// in order to ensure that the graph is centered within the SVG and the clipping mask
const calculateNestedSVGViewBox = (
    range: vec.Vector2[],
    width: number,
    height: number,
) => {
    // X RANGE
    let xMin = 0; // When range.xMin is 0, we want to use 0 as the xMin value for the SVG
    const totalXRange = getRangeDiff(range[X]);
    const gridCellWidth = width / totalXRange;

    // If the x range is entirely positive, we need to adjust the xMin to be 0
    if (range[X][0] > 0) {
        const leftAdjustment = gridCellWidth * Math.abs(range[X][0]);
        xMin = leftAdjustment;
    }
    // If the xMin is negative, we need to manually adjust
    if (range[X][0] < 0) {
        xMin = -gridCellWidth * Math.abs(range[X][0]);
    }

    // Y RANGE
    let yMin = -height; // When yMin is 0, we want to use the full height of the SVG
    const totalYRange = getRangeDiff(range[Y]);
    const gridCellHeight = height / totalYRange;

    // If the y range is entirely positive, we want to subtract the height
    // from the sum of the gridcell height and the min y value
    if (range[Y][0] > 0) {
        yMin = -height - gridCellHeight * Math.abs(range[Y][0]);
    }

    // If the yMin is negative, we want to
    if (range[Y][0] < 0) {
        yMin = -height + gridCellHeight * Math.abs(range[Y][0]);
    }

    // Create the viewbox for the nested SVG
    return {
        x: xMin,
        y: yMin,
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
