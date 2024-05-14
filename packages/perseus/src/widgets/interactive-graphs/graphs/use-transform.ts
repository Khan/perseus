import {type Interval, vec} from "mafs";

import useGraphConfig from "../reducer/use-graph-config";

const matrixBuilder = vec.matrixBuilder;

export type GraphDimensions = {
    range: [Interval, Interval];
    width: number; // pixels
    height: number; // pixels
};

// When converting vectors, we don't need to translate because a vector
// is like a pair of x and y distances, which are not bound to specific graph locations.
export function vectorsToPixels(
    vectors: vec.Vector2[],
    graphState: GraphDimensions,
    translation: vec.Vector2 = [0, 0],
) {
    const {range, width, height} = graphState;
    const [[xMin, xMax], [yMin, yMax]] = range;
    const transformToPx = matrixBuilder()
        .translate(...translation)
        .scale(width / (xMax - xMin), -height / (yMax - yMin))
        .get();
    return vectors.map((p) => vec.transform(p, transformToPx));
}

export function dimensionsToPixels(
    dimens: vec.Vector2[],
    graphState: GraphDimensions,
): vec.Vector2[] {
    const {range, width, height} = graphState;
    const [[xMin, xMax], [yMin, yMax]] = range;
    const transformToPx = matrixBuilder()
        .scale(width / (xMax - xMin), height / (yMax - yMin))
        .get();
    return dimens.map((d) => vec.transform(d, transformToPx));
}

// When converting points, we translate so the pixel point ends up in the right location.
// This is because points are specific locations on graphs, unlike vectors.
export function pointToPixel(point: vec.Vector2, graphState: GraphDimensions) {
    const [[xMin], [, yMax]] = graphState.range;
    const [a, b] = [-xMin, -yMax];
    return vectorsToPixels([point], graphState, [a, b])[0];
}

export const useTransformVectorsToPixels = (...vectors: vec.Vector2[]) => {
    const graphState = useGraphConfig();
    return vectorsToPixels(vectors, graphState);
};

export const useTransformDimensionsToPixels = (...dimens: vec.Vector2[]) => {
    const graphState = useGraphConfig();
    return dimensionsToPixels(dimens, graphState);
};
