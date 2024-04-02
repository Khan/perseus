import {View} from "@khanacademy/wonder-blocks-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";
import {useEffect, useRef} from "react";
import _ from "underscore";

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
import {GraphStateContext} from "./reducer/use-graph-state";

import type {InteractiveGraphProps, InteractiveGraphState} from "./types";
import type {Widget} from "../../renderer";

import "mafs/core.css";
import "./mafs-styles.css";

export type MafsWrapperProps = {
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

export const MafsGraph = React.forwardRef<
    Partial<Widget>,
    React.PropsWithChildren<MafsWrapperProps>
>((props, ref) => {
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

    // Destructuring first to keep useEffect from making excess calls
    const [xSnap, ySnap] = props.snapStep;
    useEffect(() => {
        dispatch(changeSnapStep([xSnap, ySnap]));
    }, [xSnap, ySnap]);

    // Destructuring first to keep useEffect from making excess calls
    const [[xMinRange, xMaxRange], [yMinRange, yMaxRange]] = props.range;
    useEffect(() => {
        dispatch(
            changeRange([
                [xMinRange, xMaxRange],
                [yMinRange, yMaxRange],
            ]),
        );
    }, [xMinRange, xMaxRange, yMinRange, yMaxRange]);

    React.useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, props.graph),
    }));

    return (
        <GraphStateContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
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
        </GraphStateContext.Provider>
    );
});
