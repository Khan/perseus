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
import matrixBuilder = vec.matrixBuilder;

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
    const [[xMin, xMax], [yMin, yMax]] = props.range;
    const legacyGrid = getLegacyGrid([width, height], props.backgroundImage);

    const transformToPx = matrixBuilder().translate(-xMin, -yMax).scale(width / (xMax - xMin), -height / (yMax - yMin)).get()

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
                    pointerEvents: "none",
                }}
            >
                {props.lockedFigures?.map(figure => {
                    const [xPx, yPx] = vec.transform(figure.coord, transformToPx);
                    return <div style={{position: "absolute", top: yPx, left: xPx}}><TeX>Hello</TeX></div>
                })}

            </View>
        </View>
    );
});
