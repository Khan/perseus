import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";
import {useEffect, useRef} from "react";

import GraphLockedLayer from "./graph-locked-layer";
import {LinearGraph, PolygonGraph, RayGraph, SegmentGraph} from "./graphs";
import {SvgDefs} from "./graphs/components/text-label";
import {PointGraph} from "./graphs/point";
import {Grid} from "./grid";
import {LegacyGrid} from "./legacy-grid";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";
import {
    getGradableGraph,
    initializeGraphState,
} from "./reducer/interactive-graph-state";

import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {InteractiveGraphState} from "./types";
import type {
    LockedFigure,
    PerseusGraphType,
    PerseusImageBackground,
} from "../../perseus-types";
import type {Widget} from "../../renderer";
import type {SizeClass} from "../../util/sizing-utils";
import type {Interval, vec} from "mafs";

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

export type Props = {
    graph: PerseusGraphType;
    box: [number, number];
    range: [Interval, Interval];
    step: vec.Vector2;
    gridStep: vec.Vector2;
    containerSizeClass: SizeClass;
    markings: "grid" | "graph" | "none";
    snapStep: vec.Vector2;
    lockedFigures?: ReadonlyArray<LockedFigure>;
    backgroundImage?: PerseusImageBackground;
    onChange: ({graph}: {graph: InteractiveGraphState}) => unknown;
};

export const MafsGraph = React.forwardRef<Partial<Widget>, Props>(
    (props, ref) => {
        const [width, height] = props.box;
        const [state, dispatch] = React.useReducer(
            interactiveGraphReducer,
            props,
            initializeGraphState,
        );
        const prevState = useRef<InteractiveGraphState>(state);

        useEffect(() => {
            if (prevState.current !== state) {
                props.onChange({graph: state});
            }
            prevState.current = state;
        }, [props, state]);

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
                        <SvgDefs />

                        {/* Background layer */}
                        <Grid {...props} />

                        {/* Locked layer */}
                        {props.lockedFigures && (
                            <GraphLockedLayer
                                lockedFigures={props.lockedFigures}
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
        );
    },
);
