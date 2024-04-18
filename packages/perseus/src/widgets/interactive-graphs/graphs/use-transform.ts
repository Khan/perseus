import {type Interval, vec} from "mafs";

import useGraphState from "../reducer/use-graph-state";

const matrixBuilder = vec.matrixBuilder;

export type GraphDimensions = {
    state: {
        range: [Interval, Interval];
    };
    width: number; // pixels
    height: number; // pixels
};

export function vectorToPixel(
    points: vec.Vector2[],
    graphState: GraphDimensions,
    translation: vec.Vector2 = [0, 0],
) {
    const {state, width, height} = graphState;
    const [[xMin, xMax], [yMin, yMax]] = state.range;
    const transformToPx = matrixBuilder()
        .translate(...translation)
        .scale(width / (xMax - xMin), -height / (yMax - yMin))
        .get();
    return points.map((p) => vec.transform(p, transformToPx));
}

export function pointToPixel(
    points: vec.Vector2[],
    graphState: GraphDimensions,
) {
    const {state} = graphState;
    const [[xMin], [, yMax]] = state.range;
    const [a, b] = [-xMin, -yMax];
    return vectorToPixel(points, graphState, [a, b]);
}

export const useTransformVectorToPixel = (...points: vec.Vector2[]) => {
    const graphState = useGraphState();
    return vectorToPixel(points, graphState);
};
