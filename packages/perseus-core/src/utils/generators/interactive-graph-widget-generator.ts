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
    options?: Partial<PerseusGraphTypePoint>,
): PerseusGraphTypePoint {
    return {
        type: "point",
        ...options,
    };
}

export function generateIGPolygonGraph(
    options?: Partial<PerseusGraphTypePolygon>,
): PerseusGraphTypePolygon {
    return {
        type: "polygon",
        ...options,
    };
}

export function generateIGQuadraticGraph(
    options?: Partial<PerseusGraphTypeQuadratic>,
): PerseusGraphTypeQuadratic {
    return {
        type: "quadratic",
        ...options,
    };
}

export function generateIGRayGraph(
    options?: Partial<PerseusGraphTypeRay>,
): PerseusGraphTypeRay {
    return {
        type: "ray",
        ...options,
    };
}

export function generateIGSegmentGraph(
    options?: Partial<PerseusGraphTypeSegment>,
): PerseusGraphTypeSegment {
    return {
        type: "segment",
        ...options,
    };
}

export function generateIGSinusoidGraph(
    options?: Partial<PerseusGraphTypeSinusoid>,
): PerseusGraphTypeSinusoid {
    return {
        type: "sinusoid",
        ...options,
    };
}

export function generateIGLockedPoint(options?: Partial<LockedPointType>) {
    return {
        ...getDefaultFigureForType("point"),
        ...options,
    };
}

export function generateIGLockedLine(options?: Partial<LockedLineType>) {
    return {
        ...getDefaultFigureForType("line"),
        ...options,
    };
}

export function generateIGLockedVector(options?: Partial<LockedVectorType>) {
    return {
        ...getDefaultFigureForType("vector"),
        ...options,
    };
}

export function generateIGLockedEllipse(options?: Partial<LockedEllipseType>) {
    return {
        ...getDefaultFigureForType("ellipse"),
        ...options,
    };
}

export function generateIGLockedPolygon(options?: Partial<LockedPolygonType>) {
    return {
        ...getDefaultFigureForType("polygon"),
        ...options,
    };
}

export function generateIGLockedFunction(
    options?: Partial<LockedFunctionType>,
) {
    return {
        ...getDefaultFigureForType("function"),
        ...options,
    };
}

export function generateIGLockedLabel(options?: Partial<LockedLabelType>) {
    return {
        ...getDefaultFigureForType("label"),
        ...options,
    };
}

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
