import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";

import AxisLabels from "./backgrounds/axis-labels";
import {AxisTickLabels} from "./backgrounds/axis-tick-labels";
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

import type {
    InteractiveGraphState,
    InteractiveGraphProps,
    PointGraphState,
} from "./types";
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
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
    readOnly: boolean;
    static: boolean | null | undefined;
};

export const MafsGraph = (props: MafsGraphProps) => {
    const {state, dispatch, labels, readOnly} = props;
    const [width, height] = props.box;
    const tickStep = props.step as vec.Vector2;

    const graphRef = React.useRef<HTMLElement>(null);

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
                        marginBottom: "20px",
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
                    ref={graphRef}
                    tabIndex={0}
                >
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
                                <AxisTickLabels />
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
                            />
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
                        </Mafs>
                    </View>
                </View>
                {renderGraphControls({state, dispatch})}
            </View>
        </GraphConfigContext.Provider>
    );
};

const renderPointGraphControls = (props: {
    state: PointGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => (
    <View
        style={{
            flexDirection: "row",
        }}
    >
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
        {(props.state.focusedPointIndex !== null ||
            props.state.previouslyFocusedPointIndex !== null) && (
            <Button
                kind="secondary"
                color="destructive"
                style={{
                    width: "100%",
                    marginLeft: "20px",
                }}
                onClick={(event) => {
                    props.dispatch(
                        actions.pointGraph.removePoint(
                            props.state.previouslyFocusedPointIndex!,
                        ),
                    );
                }}
            >
                Remove Point
            </Button>
        )}
    </View>
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
