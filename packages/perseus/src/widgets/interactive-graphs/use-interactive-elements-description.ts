import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {usePerseusI18n} from "../../components/i18n-context";

import {getAbsoluteValueDescription} from "./graphs/absolute-value";
import {getAngleGraphDescription} from "./graphs/angle";
import {getCircleGraphDescription} from "./graphs/circle";
import {usePointAriaLabel} from "./graphs/components/build-point-aria-label";
import {getExponentialDescription} from "./graphs/exponential";
import {getLinearGraphDescription} from "./graphs/linear";
import {getLinearSystemGraphDescription} from "./graphs/linear-system";
import {getLogarithmDescription} from "./graphs/logarithm";
import {getPointGraphDescription} from "./graphs/point";
import {getPolygonGraphDescription} from "./graphs/polygon";
import {getQuadraticGraphDescription} from "./graphs/quadratic";
import {getRayGraphDescription} from "./graphs/ray";
import {getSegmentGraphDescription} from "./graphs/segment";
import {getSinusoidDescription} from "./graphs/sinusoid";
import {getTangentDescription} from "./graphs/tangent";
import {getVectorGraphDescription} from "./graphs/vector";

import type {InteractiveGraphProps, InteractiveGraphState} from "./types";
import type {ReactNode} from "react";

/**
 * Returns the screen-reader description string for the interactive elements
 * of the given graph state. Keeps the "build the SR description" path in
 * React-land so it can use the `usePointAriaLabel` hook directly.
 */
export function useInteractiveElementsDescription(
    state: InteractiveGraphState,
    markings: InteractiveGraphProps["markings"],
): ReactNode {
    const i18n = usePerseusI18n();
    // Hook must be called unconditionally; states without `pointLabels` pass
    // `undefined` and the hook returns a no-op builder.
    const pointLabels = "pointLabels" in state ? state.pointLabels : undefined;
    const buildLabel = usePointAriaLabel(pointLabels);

    const {type} = state;
    switch (type) {
        case "angle":
            return getAngleGraphDescription(state, i18n);
        case "segment":
            return getSegmentGraphDescription(state, i18n);
        case "linear-system":
            return getLinearSystemGraphDescription(state, i18n);
        case "linear":
            return getLinearGraphDescription(state, i18n);
        case "ray":
            return getRayGraphDescription(state, i18n);
        case "polygon":
            return getPolygonGraphDescription(
                state,
                i18n,
                markings,
                buildLabel,
            );
        case "point":
            return getPointGraphDescription(state, i18n, buildLabel);
        case "circle":
            return getCircleGraphDescription(state, i18n);
        case "quadratic":
            return getQuadraticGraphDescription(state, i18n);
        case "sinusoid":
            return getSinusoidDescription(state, i18n);
        case "exponential":
            return getExponentialDescription(state, i18n);
        case "none":
            return null;
        case "absolute-value":
            return getAbsoluteValueDescription(state, i18n);
        case "tangent":
            return getTangentDescription(state, i18n);
        case "logarithm":
            return getLogarithmDescription(state, i18n);
        case "vector":
            return getVectorGraphDescription(state, i18n);
        default:
            throw new UnreachableCaseError(type);
    }
}
