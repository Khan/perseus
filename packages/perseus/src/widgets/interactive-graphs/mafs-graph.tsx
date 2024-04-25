import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";
import {useEffect, useImperativeHandle, useRef} from "react";

import AxisLabels from "./axis-labels";
import GraphLockedLayer from "./graph-locked-layer";
import {LinearGraph, PolygonGraph, RayGraph, SegmentGraph} from "./graphs";
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
    getGradableGraph,
    initializeGraphState,
} from "./reducer/interactive-graph-state";
import {GraphConfigContext} from "./reducer/use-graph-config";

import type {InteractiveGraphState, InteractiveGraphProps} from "./types";
import type {Widget} from "../../renderer";

import "mafs/core.css";
import "./mafs-styles.css";

export type Props = {
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

const renderGraph = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {state, dispatch} = props;
    const {type} = state;
    switch (type) {
        case "segment":
            return <SegmentGraph graphState={state} dispatch={dispatch} />;
        case "linear":
        case "linear-system":
            return <LinearGraph graphState={state} dispatch={dispatch} />;
        case "ray":
            return <RayGraph graphState={state} dispatch={dispatch} />;
        case "polygon":
            return <PolygonGraph graphState={state} dispatch={dispatch} />;
        case "point":
            return <PointGraph graphState={state} dispatch={dispatch} />;
        case "circle":
            throw new Error("the circle graph type is not yet implemented");
        default:
            return new UnreachableCaseError(type);
    }
};

export const StatefulMafsGraph = React.forwardRef<Partial<Widget>, Props>(
    (props, ref) => {
        const [state, dispatch] = React.useReducer(
            interactiveGraphReducer,
            props,
            initializeGraphState,
        );

        useImperativeHandle(ref, () => ({
            getUserInput: () => getGradableGraph(state, props.graph),
        }));

        return <MafsGraph state={state} dispatch={dispatch} {...props} />;
    },
);

type MafsGraphProps = Props & {
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
};

export const MafsGraph = (props: MafsGraphProps) => {
    const {state, dispatch, labels} = props;
    const [width, height] = props.box;

    const prevState = useRef<InteractiveGraphState>(state);

    useEffect(() => {
        if (prevState.current !== state) {
            props.onChange({graph: state});
        }
        prevState.current = state;
    }, [props, state]);

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

    return (
        <GraphConfigContext.Provider
            value={{
                range: state.range,
                snapStep: state.snapStep,
                markings: props.markings,
                showTooltips: !!props.showTooltips,
                graphDimensionsInPixels: props.box,
                width,
                height,
                labels,
            }}
        >
            <View
                style={{
                    width,
                    height,
                    position: "relative",
                    padding: "25px 25px 0 0",
                    boxSizing: "content-box",
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
                    {props.markings === "graph" && <AxisLabels />}
                    <Mafs
                        preserveAspectRatio={false}
                        viewBox={{
                            x: props.range[0],
                            y: props.range[1],
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
                            range={props.range}
                            containerSizeClass={props.containerSizeClass}
                            markings={props.markings}
                        />

                        {/* Locked layer */}
                        {props.lockedFigures && (
                            <GraphLockedLayer
                                lockedFigures={props.lockedFigures}
                                range={props.range}
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
