import interactiveGraphWidgetLogic from "../../widgets/interactive-graph";
import {getDefaultFigureForType} from "../get-default-figure-for-type";

import type {
    InteractiveGraphWidget,
    LockedEllipseType,
    LockedFunctionType,
    LockedLabelType,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
    LockedVectorType,
    PerseusGraphTypeAngle,
    PerseusGraphTypeCircle,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypeNone,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeQuadratic,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid,
    PerseusInteractiveGraphWidgetOptions,
} from "../../data-schema";

export function generateInteractiveGraphWidget(
    interactiveGraphWidgetProperties?: Partial<
        Omit<InteractiveGraphWidget, "type">
    >,
): InteractiveGraphWidget {
    return {
        type: "interactive-graph",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateInteractiveGraphOptions(), // default options
        ...interactiveGraphWidgetProperties,
    };
}

export function generateInteractiveGraphOptions(
    options?: Partial<PerseusInteractiveGraphWidgetOptions>,
): PerseusInteractiveGraphWidgetOptions {
    return {
        ...interactiveGraphWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateIGAngleGraph(
    options?: Partial<PerseusGraphTypeAngle>,
): PerseusGraphTypeAngle {
    return {
        type: "angle",
        ...options,
    };
}

export function generateIGCircleGraph(
    options?: Partial<PerseusGraphTypeCircle>,
): PerseusGraphTypeCircle {
    return {
        type: "circle",
        ...options,
    };
}

export function generateIGLinearGraph(
    options?: Partial<PerseusGraphTypeLinear>,
): PerseusGraphTypeLinear {
    return {
        type: "linear",
        ...options,
    };
}

export function generateIGLinearSystemGraph(
    options?: Partial<PerseusGraphTypeLinearSystem>,
): PerseusGraphTypeLinearSystem {
    return {
        type: "linear-system",
        ...options,
    };
}

export function generateIGNoneGraph(): PerseusGraphTypeNone {
    return {
        type: "none",
    };
}

export function generateIGPointGraph(
    options?: Partial<Omit<PerseusGraphTypePoint, "type">>,
): PerseusGraphTypePoint {
    return {
        type: "point",
        ...options,
    };
}

export function generateIGPolygonGraph(
    options?: Partial<Omit<PerseusGraphTypePolygon, "type">>,
): PerseusGraphTypePolygon {
    return {
        type: "polygon",
        ...options,
    };
}

export function generateIGQuadraticGraph(
    options?: Partial<Omit<PerseusGraphTypeQuadratic, "type">>,
): PerseusGraphTypeQuadratic {
    return {
        type: "quadratic",
        ...options,
    };
}

export function generateIGRayGraph(
    options?: Partial<Omit<PerseusGraphTypeRay, "type">>,
): PerseusGraphTypeRay {
    return {
        type: "ray",
        ...options,
    };
}

export function generateIGSegmentGraph(
    options?: Partial<Omit<PerseusGraphTypeSegment, "type">>,
): PerseusGraphTypeSegment {
    return {
        type: "segment",
        ...options,
    };
}

export function generateIGSinusoidGraph(
    options?: Partial<Omit<PerseusGraphTypeSinusoid, "type">>,
): PerseusGraphTypeSinusoid {
    return {
        type: "sinusoid",
        ...options,
    };
}

export function generateIGLockedPoint(
    options?: Partial<Omit<LockedPointType, "type">>,
) {
    return {
        ...getDefaultFigureForType("point"),
        ...options,
    };
}

export function generateIGLockedLine(
    options?: Partial<Omit<LockedLineType, "type">>,
) {
    return {
        ...getDefaultFigureForType("line"),
        ...options,
    };
}

export function generateIGLockedVector(
    options?: Partial<Omit<LockedVectorType, "type">>,
) {
    return {
        ...getDefaultFigureForType("vector"),
        ...options,
    };
}

export function generateIGLockedEllipse(
    options?: Partial<Omit<LockedEllipseType, "type">>,
) {
    return {
        ...getDefaultFigureForType("ellipse"),
        ...options,
    };
}

export function generateIGLockedPolygon(
    options?: Partial<Omit<LockedPolygonType, "type">>,
) {
    return {
        ...getDefaultFigureForType("polygon"),
        ...options,
    };
}

export function generateIGLockedFunction(
    options?: Partial<Omit<LockedFunctionType, "type">>,
) {
    return {
        ...getDefaultFigureForType("function"),
        ...options,
    };
}

export function generateIGLockedLabel(
    options?: Partial<Omit<LockedLabelType, "type">>,
) {
    return {
        ...getDefaultFigureForType("label"),
        ...options,
    };
}
