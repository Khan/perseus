import {useLatestRef} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {useEffect, useImperativeHandle, useRef} from "react";

import {MafsGraph} from "./mafs-graph";
import {mafsStateToInteractiveGraph} from "./mafs-state-to-interactive-graph";
import {initializeGraphState} from "./reducer/initialize-graph-state";
import {
    changeRange,
    changeSnapStep,
    reinitialize,
} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";
import {getGradableGraph} from "./reducer/interactive-graph-state";

import type {InteractiveGraphProps, InteractiveGraphState} from "./types";
import type {
    PerseusGraphType,
    PerseusInteractiveGraphUserInput,
} from "@khanacademy/perseus-core";

export type StatefulMafsGraphProps = {
    box: [number, number];
    backgroundImage?: InteractiveGraphProps["backgroundImage"];
    graph: PerseusGraphType;
    /**
     * The correct answer for this widget.
     */
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct?: PerseusGraphType;
    lockedFigures: InteractiveGraphProps["lockedFigures"];
    range: InteractiveGraphProps["range"];
    snapStep: [x: number, y: number];
    step: InteractiveGraphProps["step"];
    gridStep: [x: number, y: number];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: InteractiveGraphProps["markings"];
    onChange: (userInput: PerseusGraphType) => void;
    showTooltips: Required<InteractiveGraphProps["showTooltips"]>;
    showProtractor: boolean;
    labels: ReadonlyArray<string>;
    labelLocation?: InteractiveGraphProps["labelLocation"];
    fullGraphAriaLabel?: InteractiveGraphProps["fullGraphAriaLabel"];
    fullGraphAriaDescription?: InteractiveGraphProps["fullGraphAriaDescription"];
    readOnly: boolean;
    static: InteractiveGraphProps["static"];
};

export type StatefulMafsGraphType = {
    getUserInput: () => PerseusInteractiveGraphUserInput;
};

export const StatefulMafsGraph = React.forwardRef<
    StatefulMafsGraphType,
    StatefulMafsGraphProps
>(function StatefulMafsGraphWithRef(props, ref) {
    const {onChange, graph} = props;

    const [state, dispatch] = React.useReducer(
        interactiveGraphReducer,
        props,
        initializeGraphState,
    );

    useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, graph),
    }));

    const prevState = useRef<InteractiveGraphState>(state);

    useEffect(() => {
        if (prevState.current !== state) {
            onChange(mafsStateToInteractiveGraph(state, graph));
        }
        prevState.current = state;
    }, [onChange, state, graph]);

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

    // Update the graph whenever any of the following values changes.
    // This is necessary to keep the graph previews in sync with the updated
    // graph settings within the interative graph editor.
    const numSegments = graph.type === "segment" ? graph.numSegments : null;
    const numPoints = graph.type === "point" ? graph.numPoints : null;
    const numSides = graph.type === "polygon" ? graph.numSides : null;
    const snapTo = graph.type === "polygon" ? graph.snapTo : null;
    const showAngles =
        graph.type === "polygon" || graph.type === "angle"
            ? graph.showAngles
            : null;
    const allowReflexAngles =
        graph.type === "angle" ? graph.allowReflexAngles : null;
    const showSides = graph.type === "polygon" ? graph.showSides : null;
    const startCoords = "startCoords" in graph ? graph.startCoords : undefined;

    const originalPropsRef = useRef(props);
    const latestPropsRef = useLatestRef(props);
    useEffect(() => {
        // This conditional prevents the state from being "reinitialized" right
        // after the first render. This is an optimization, but also prevents
        // a bug where the graph would be marked "incorrect" during grading
        // even if the user never interacted with it.
        if (latestPropsRef.current !== originalPropsRef.current) {
            dispatch(reinitialize(latestPropsRef.current));
        }
    }, [
        graph.type,
        numPoints,
        numSegments,
        numSides,
        snapTo,
        showAngles,
        showSides,
        latestPropsRef,
        startCoords,
        allowReflexAngles,
    ]);

    // If the graph is static, it always displays the correct answer. This is
    // standard behavior for Perseus widgets (e.g. compare the Radio widget).
    if (props.static && props.correct) {
        return (
            <MafsGraph
                {...props}
                state={initializeGraphState({...props, graph: props.correct})}
                dispatch={dispatch}
            />
        );
    }

    return <MafsGraph {...props} state={state} dispatch={dispatch} />;
});
