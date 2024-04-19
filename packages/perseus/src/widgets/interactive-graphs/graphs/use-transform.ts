import {type Interval, vec} from "mafs";

import useGraphConfig from "../reducer/use-graph-config";

const matrixBuilder = vec.matrixBuilder;

export type GraphDimensions = {
    range: [Interval, Interval];
    width: number; // pixels
    height: number; // pixels
};

export function vectorToPixel(
    points: vec.Vector2[],
    graphState: GraphDimensions,
    translation: vec.Vector2 = [0, 0],
) {
    const {range, width, height} = graphState;
    const [[xMin, xMax], [yMin, yMax]] = range;
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
    const [[xMin], [, yMax]] = graphState.range;
    const [a, b] = [-xMin, -yMax];
    return vectorToPixel(points, graphState, [a, b]);
}

export const useTransformVectorToPixel = (...points: vec.Vector2[]) => {
    const graphState = useGraphConfig();
    return vectorToPixel(points, graphState);
};
