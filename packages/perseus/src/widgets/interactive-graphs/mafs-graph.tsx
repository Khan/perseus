import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";

import {SegmentGraph} from "./graphs";
import {Grid} from "./grid";
import {interactiveGraphReducer} from "./interactive-graph-reducer";
import {initializeGraphState} from "./interactive-graph-state";
import {getLegacyGrid} from "./legacy-grid";

import type {InteractiveGraphAction} from "./interactive-graph-action";
import type {InteractiveGraphState} from "./interactive-graph-state";
import type {InteractiveGraphProps} from "./types";
import type {PerseusGraphType} from "../../perseus-types";
import type {Widget} from "../../renderer";

import "mafs/core.css";
import "./mafs-styles.css";

const renderGraph = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
}) => {
    const {state, dispatch} = props;
    switch (state.type) {
        case "segment":
            return <SegmentGraph graphState={state} dispatch={dispatch} />;
    }
    throw new Error("Mafs is not yet implemented for graph type: " + state.type)
};

function getGradableGraph(state: InteractiveGraphState, initialGraph: PerseusGraphType): PerseusGraphType {
    if (!state.hasBeenInteractedWith) {
        return initialGraph
    }
    switch (initialGraph.type) {
        case "segment":
            return {
                ...initialGraph,
                coords: state.segments,
            };
    }
    throw new Error("Mafs is not yet implemented for graph type: " + initialGraph.type)
}

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
                    {!legacyGrid && <Grid {...props} />}
                    {renderGraph({
                        state,
                        dispatch,
                    })}
                </Mafs>
            </View>
        </View>
    );
});
