import interactiveGraphWidgetLogic from "../../widgets/interactive-graph";
import {getDefaultFigureForType} from "../get-default-figure-for-type";
import {generateTestPerseusRenderer} from "../test-utils";

import type {
    InteractiveGraphWidget,
    LockedEllipseType,
    LockedFunctionType,
    LockedLabelType,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
    LockedVectorType,
    PerseusGraphTypeAbsoluteValue,
    PerseusGraphTypeAngle,
    PerseusGraphTypeCircle,
    PerseusGraphTypeExponential,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypeLogarithm,
    PerseusGraphTypeNone,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeQuadratic,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid,
    PerseusGraphTypeTangent,
    PerseusInteractiveGraphWidgetOptions,
    PerseusRenderer,
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
    options?: Partial<Omit<PerseusGraphTypeAngle, "type">>,
): PerseusGraphTypeAngle {
    return {
        type: "angle",
        ...options,
    };
}

export function generateIGCircleGraph(
    options?: Partial<Omit<PerseusGraphTypeCircle, "type">>,
): PerseusGraphTypeCircle {
    return {
        type: "circle",
        ...options,
    };
}

export function generateIGLinearGraph(
    options?: Partial<Omit<PerseusGraphTypeLinear, "type">>,
): PerseusGraphTypeLinear {
    return {
        type: "linear",
        ...options,
    };
}

export function generateIGLinearSystemGraph(
    options?: Partial<Omit<PerseusGraphTypeLinearSystem, "type">>,
): PerseusGraphTypeLinearSystem {
    return {
        type: "linear-system",
        ...options,
    };
}

export function generateIGLogarithmGraph(
    options?: Partial<Omit<PerseusGraphTypeLogarithm, "type">>,
): PerseusGraphTypeLogarithm {
    return {
        type: "logarithm",
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

export function generateIGTangentGraph(
    options?: Partial<Omit<PerseusGraphTypeTangent, "type">>,
): PerseusGraphTypeTangent {
    return {
        type: "tangent",
        ...options,
    };
}

export function generateIGLockedPoint(
    options?: Partial<Omit<LockedPointType, "type">>,
): LockedPointType {
    return {
        ...getDefaultFigureForType("point"),
        ...options,
    };
}

export function generateIGLockedLine(
    options?: Partial<Omit<LockedLineType, "type">>,
): LockedLineType {
    return {
        ...getDefaultFigureForType("line"),
        ...options,
    };
}

export function generateIGLockedVector(
    options?: Partial<Omit<LockedVectorType, "type">>,
): LockedVectorType {
    return {
        ...getDefaultFigureForType("vector"),
        ...options,
    };
}

export function generateIGLockedEllipse(
    options?: Partial<Omit<LockedEllipseType, "type">>,
): LockedEllipseType {
    return {
        ...getDefaultFigureForType("ellipse"),
        ...options,
    };
}

export function generateIGLockedPolygon(
    options?: Partial<Omit<LockedPolygonType, "type">>,
): LockedPolygonType {
    return {
        ...getDefaultFigureForType("polygon"),
        ...options,
    };
}

export function generateIGLockedFunction(
    options?: Partial<Omit<LockedFunctionType, "type">>,
): LockedFunctionType {
    return {
        ...getDefaultFigureForType("function"),
        ...options,
    };
}

export function generateIGLockedLabel(
    options?: Partial<Omit<LockedLabelType, "type">>,
): LockedLabelType {
    return {
        ...getDefaultFigureForType("label"),
        ...options,
    };
}

export function generateIGExponentialGraph(
    options?: Partial<Omit<PerseusGraphTypeExponential, "type">>,
): PerseusGraphTypeExponential {
    return {
        type: "exponential",
        ...options,
    };
}

export function generateIGAbsoluteValueGraph(
    options?: Partial<Omit<PerseusGraphTypeAbsoluteValue, "type">>,
): PerseusGraphTypeAbsoluteValue {
    return {
        type: "absolute-value",
        ...options,
    };
}

export function generateInteractiveGraphQuestion(
    options?: Partial<PerseusInteractiveGraphWidgetOptions> & {
        content?: string;
        isStatic?: boolean;
    },
): PerseusRenderer {
    const {content, isStatic, ...widgetOptions} = options ?? {};

    // If `correct` is set but `graph` is not, default `graph` to match
    // the correct answer's type. For graph types that need shared config
    // (like numSides, numPoints, snapTo), callers should pass `graph`
    // explicitly.
    if (widgetOptions.correct && !widgetOptions.graph) {
        widgetOptions.graph = {type: widgetOptions.correct.type};
    }

    return generateTestPerseusRenderer({
        content: content ?? "[[☃ interactive-graph 1]]",
        widgets: {
            "interactive-graph 1": generateInteractiveGraphWidget({
                static: isStatic ?? false,
                options: generateInteractiveGraphOptions(widgetOptions),
            }),
        },
    });
}
