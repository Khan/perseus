import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";

import GraphLockedLayer from "./graph-locked-layer";
import {LinearGraph, SegmentGraph} from "./graphs";
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

    const [state, dispatch] = React.useReducer(
        interactiveGraphReducer,
        props,
        initializeGraphState,
    );

    React.useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, props.graph),
    }));

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
        </View>
    );
});
