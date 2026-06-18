import {useLatestRef} from "@khanacademy/wonder-blocks-core";
import {useEffect, useRef} from "react";

import {reinitialize} from "./reducer/interactive-graph-action";

import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {StatefulMafsGraphProps} from "./stateful-mafs-graph";
import type {Dispatch} from "react";

/**
 * Rebuilds the reducer state from the `graph` prop when the graph definition
 * changes, keeping the editor preview in sync with author edits.
 */
export function useReinitializeOnGraphChange(
    props: StatefulMafsGraphProps,
    dispatch: Dispatch<InteractiveGraphAction>,
) {
    const {graph} = props;

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
    const pointLabels = "pointLabels" in graph ? graph.pointLabels : undefined;
    const showPointLabels =
        "showPointLabels" in graph ? graph.showPointLabels : undefined;
    // Serialize arrays so the effect compares them by value, not reference:
    // the editor rebuilds these every render, and raw-array deps would re-fire
    // reinitialize and cause Safari scroll jitter.
    const pointLabelsKey = pointLabels && JSON.stringify(pointLabels);
    const startCoordsKey = startCoords && JSON.stringify(startCoords);

    const originalPropsRef = useRef(props);
    const latestPropsRef = useLatestRef(props);
    useEffect(() => {
        // Skip the first render: reinitializing there resets
        // `hasBeenInteractedWith` and mis-grades an untouched graph as incorrect.
        if (latestPropsRef.current !== originalPropsRef.current) {
            dispatch(reinitialize(latestPropsRef.current));
        }
    }, [
        dispatch,
        graph.type,
        numPoints,
        numSegments,
        numSides,
        snapTo,
        showAngles,
        showSides,
        latestPropsRef,
        startCoordsKey,
        allowReflexAngles,
        pointLabelsKey,
        showPointLabels,
    ]);
}
