import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs, useTransformContext, vec} from "mafs";
import * as React from "react";

import GraphLockedLayer from "./graph-locked-layer";
import {LinearGraph, RayGraph, SegmentGraph} from "./graphs";
import {Grid} from "./grid";
import {interactiveGraphReducer} from "./interactive-graph-reducer";
import {
    getGradableGraph,
    initializeGraphState,
} from "./interactive-graph-state";
import {getLegacyGrid} from "./legacy-grid";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphProps, InteractiveGraphState} from "./types";
import type {Widget} from "../../renderer";

import "mafs/core.css";
import "./mafs-styles.css";
import {getDependencies} from "../../dependencies";
import {useEffect, useState} from "react";

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
        default:
            return new UnreachableCaseError(type);
    }
};

export const MafsGraph = React.forwardRef<
    Partial<Widget>,
    React.PropsWithChildren<InteractiveGraphProps> & {box: [number, number]}
>((props, ref) => {
    const [width, height] = props.box;
    const legacyGrid = getLegacyGrid([width, height], props.backgroundImage);
    const [graphToPxTransform, setGraphToPxTransform] = useState(vec.identity)

    //const {viewTransform, userTransform} = useTransformContext();
    //const transformToPx = vec.matrixMult(viewTransform, userTransform);

    const [state, dispatch] = React.useReducer(
        interactiveGraphReducer,
        props,
        initializeGraphState,
    );

    React.useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, props.graph),
    }));

    const TeX = getDependencies().TeX

    return (
        <View
            style={{
                width: props.backgroundImage?.width ?? width,
                height: props.backgroundImage?.height ?? height,
                position: "relative",
            }}
        >
            {legacyGrid}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            >
                <Mafs
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
                    <TransformExfiltrator onChange={setGraphToPxTransform}/>
                    {/* Background layer */}
                    {!legacyGrid && <Grid {...props} />}

                    {/* Locked layer */}
                    {props.lockedFigures && (
                        <GraphLockedLayer lockedFigures={props.lockedFigures} />
                    )}

                    {/* Interactive layer */}
                    {renderGraph({
                        state,
                        dispatch,
                    })}
                </Mafs>
            </View>
            <View
                // TeX layer
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: props.backgroundImage?.width ?? width,
                    height: props.backgroundImage?.height ?? height,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    pointerEvents: "none",
                }}
            >
                {props.lockedFigures?.map(figure => {
                    //debugger
                    const originPx = vec.transform([0, 0], graphToPxTransform);
                    debugger
                    const [xPx, yPx] = vec.add(/*[props.range[0][0], props.range[1][0]]*/originPx, vec.transform(figure.coord, graphToPxTransform));
                    return <div style={{position: "absolute", top: yPx, left: xPx}}><TeX>Hello</TeX></div>
                })}

            </View>
        </View>
    );
});

function TransformExfiltrator(props: {onChange: (transform: vec.Matrix) => unknown}) {
    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);

    // TODO: useLayoutEffect?
    useEffect(() => {
        props.onChange(transformToPx)
    }, transformToPx)

    return null;
}
