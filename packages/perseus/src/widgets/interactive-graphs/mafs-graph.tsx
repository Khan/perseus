import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";
import {useEffect, useImperativeHandle, useRef} from "react";

import AxisLabels from "./axis-labels";
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
} from "./graphs";
import {AxisTickLabels} from "./graphs/components/axis-tick-labels";
import {SvgDefs} from "./graphs/components/text-label";
import {PointGraph} from "./graphs/point";
import {Grid} from "./grid";
import {LegacyGrid} from "./legacy-grid";
import {
    changeRange,
    changeSnapStep,
    type InteractiveGraphAction,
} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";
import {
    initializeGraphState,
} from "./reducer/initialize-graph-state";
import {getGradableGraph, getRadius} from "./reducer/interactive-graph-state"
import {GraphConfigContext} from "./reducer/use-graph-config";

import type {InteractiveGraphState, InteractiveGraphProps} from "./types";
import type {Widget} from "../../renderer";
import type {vec} from "mafs";

import "mafs/core.css";
import "./mafs-styles.css";

export type StatefulMafsGraphProps = {
    box: [number, number];
    backgroundImage?: InteractiveGraphProps["backgroundImage"];
    graph: InteractiveGraphProps["graph"];
    lockedFigures?: InteractiveGraphProps["lockedFigures"];
    range: InteractiveGraphProps["range"];
    snapStep: InteractiveGraphProps["snapStep"];
    step: InteractiveGraphProps["step"];
    gridStep: InteractiveGraphProps["gridStep"];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: InteractiveGraphProps["markings"];
    onChange: InteractiveGraphProps["onChange"];
    showTooltips: Required<InteractiveGraphProps["showTooltips"]>;
    labels: InteractiveGraphProps["labels"];
};

type MafsChange = {
    graph: InteractiveGraphState;
};

const renderGraph = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {state, dispatch} = props;
    const {type} = state;
    switch (type) {
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
            return new UnreachableCaseError(type);
    }
};

// Rather than be tightly bound to how data was structured in
// the legacy interactive graph, this lets us store state
// however we want and we just transform it before handing it off
// the the parent InteractiveGraph
function mafsStateToInteractiveGraph(state: MafsChange) {
    if (state.graph.type === "circle") {
        return {
            ...state,
            graph: {
                ...state.graph,
                radius: getRadius(state.graph),
            },
        };
    }
    return {
        ...state,
    };
}

export const StatefulMafsGraph = React.forwardRef<
    Partial<Widget>,
    StatefulMafsGraphProps
>((props, ref) => {
    const {onChange} = props;

    const [state, dispatch] = React.useReducer(
        interactiveGraphReducer,
        props,
        initializeGraphState,
    );

    useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, props.graph),
    }));

    const prevState = useRef<InteractiveGraphState>(state);

    useEffect(() => {
        if (prevState.current !== state) {
            onChange(mafsStateToInteractiveGraph({graph: state}));
        }
        prevState.current = state;
    }, [onChange, state]);

    // Destructuring first to keep useEffect from making excess calls
    const [xSnap, ySnap] = props.snapStep;
    useEffect(() => {
        dispatch(changeSnapStep([xSnap, ySnap]));
    }, [dispatch, xSnap, ySnap]);

    // Destructuring first to keep useEffect from making excess calls
    const [[xMinRange, xMaxRange], [yMinRange, yMaxRange]] = props.range;
    useEffect(() => {
        dispatch(
            changeRange([
                [xMinRange, xMaxRange],
                [yMinRange, yMaxRange],
            ]),
        );
    }, [dispatch, xMinRange, xMaxRange, yMinRange, yMaxRange]);

    return <MafsGraph {...props} state={state} dispatch={dispatch} />;
});

export type MafsGraphProps = {
    box: [number, number];
    backgroundImage?: InteractiveGraphProps["backgroundImage"];
    lockedFigures?: InteractiveGraphProps["lockedFigures"];
    step: InteractiveGraphProps["step"];
    gridStep: InteractiveGraphProps["gridStep"];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: InteractiveGraphProps["markings"];
    showTooltips: Required<InteractiveGraphProps["showTooltips"]>;
    labels: InteractiveGraphProps["labels"];
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
};

export const MafsGraph = (props: MafsGraphProps) => {
    const {state, dispatch, labels} = props;
    const [width, height] = props.box;
    const tickStep = props.step as vec.Vector2;
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
            }}
        >
            <View
                className="mafs-graph"
                style={{
                    width,
                    height,
                    position: "relative",
                    padding: "25px 25px 0 0",
                    boxSizing: "content-box",
                    marginLeft: "20px",
                    marginBottom: "20px",
                }}
            >
                <LegacyGrid
                    box={props.box}
                    backgroundImage={props.backgroundImage}
                />
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
                            x: state.range[0],
                            y: state.range[1],
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

                        {/* Locked layer */}
                        {props.lockedFigures && (
                            <GraphLockedLayer
                                lockedFigures={props.lockedFigures}
                                range={state.range}
                            />
                        )}

                        {/* Interactive layer */}
                        {renderGraph({
                            state,
                            dispatch,
                        })}
                    </Mafs>
                </View>
            </View>
        </GraphConfigContext.Provider>
    );
};
