import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";

import GraphLockedLayer from "./graph-locked-layer";
import {LinearGraph, PolygonGraph, RayGraph, SegmentGraph} from "./graphs";
import {SvgDefs} from "./graphs/components/text-label";
import {PointGraph} from "./graphs/point";
import {Grid} from "./grid";
import {LegacyGrid} from "./legacy-grid";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";
import {
    getGradableGraph as getGradableGraphV1,
    initializeGraphState,
} from "./reducer/interactive-graph-state";

import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {InteractiveGraphProps} from "./types";
import type {Widget} from "../../renderer";

import "mafs/core.css";
import "./mafs-styles.css";
import {
    interactiveGraphReducerV2
} from "./reducer-v2/interactive-graph-reducer-v2";
import {
    getGradableGraphV2,
    initializeGraphStateV2
} from "./reducer-v2/interactive-graph-state-v2";

const renderGraph = (props: {
    state: any; // FIXME don't use any
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {state, dispatch} = props;
    // FIXME implement the other graph types
    const {type} = state;
    switch (type) {
        case "linear":
        case "linear-system":
            return <LinearGraph graphState={state} dispatch={dispatch} />;
        case "ray":
            return <RayGraph graphState={state} dispatch={dispatch} />;
        case "polygon":
            return <PolygonGraph graphState={state} dispatch={dispatch} />;
        case "point":
            return <PointGraph graphState={state} dispatch={dispatch} />;
        case undefined:
            // if type is undefined, we are using the new graphState format,
            // which is currently only implemented for segment graphs
        default:
            return <SegmentGraph graphState={state} dispatch={dispatch}/>;
            // throw new UnreachableCaseError(type);
    }
};

export const MafsGraph = React.forwardRef<Partial<Widget>,
    React.PropsWithChildren<InteractiveGraphProps> & { box: [number, number] }>((props, ref) => {
    const [width, height] = props.box;

    // FIXME: don't use any
    let reducer: any = interactiveGraphReducer
    let initializeState: any = initializeGraphState
    let getGradableGraph: any = getGradableGraphV1
    if (props.graph.type === "segment") {
        reducer = interactiveGraphReducerV2
        initializeState = initializeGraphStateV2
        getGradableGraph = getGradableGraphV2
    }

    const [state, dispatch] = React.useReducer(
        reducer,
        props,
        initializeState,
    );

    React.useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, props.graph),
    }));

    return (
        <View
            style={{
                width,
                height,
                position: "relative",
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
                    <SvgDefs/>

                    {/* Background layer */}
                    <Grid {...props} />

                    {/* Locked layer */}
                    {props.lockedFigures && (
                        <GraphLockedLayer lockedFigures={props.lockedFigures}/>
                    )}

                    {/* Interactive layer */}
                    {renderGraph({
                        state,
                        dispatch,
                    })}
                </Mafs>
            </View>
        </View>
    );
});
