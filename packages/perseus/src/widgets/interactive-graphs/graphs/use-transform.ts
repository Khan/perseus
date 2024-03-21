import {useTransformContext, vec} from "mafs";

export const useTransform = (...points: vec.Vector2[]) => {
    const {viewTransform, userTransform} = useTransformContext();
    const transformToPx = vec.matrixMult(viewTransform, userTransform);
    const transformedPoints = points.map((point) =>
        vec.transform(point, transformToPx),
    );
    return transformedPoints;
};
