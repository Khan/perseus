import polarGraphWidgetLogic from "../../widgets/polar-graph";
import {generateTestPerseusRenderer} from "../test-utils";

import type {
    PerseusPolarGraphType,
    PerseusPolarLockedFigure,
    PerseusPolarGraphTypeAngle,
    PerseusPolarGraphTypeCircle,
    PerseusPolarGraphTypeLemniscate,
    PerseusPolarGraphTypeLimacon,
    PerseusPolarGraphTypePoint,
    PerseusPolarGraphTypeRay,
    PerseusPolarGraphTypeRose,
    PerseusPolarGraphWidgetOptions,
    PerseusRenderer,
    PolarGraphWidget,
} from "../../data-schema";

export function generatePolarGraphWidget(
    polarGraphWidgetProperties?: Partial<Omit<PolarGraphWidget, "type">>,
): PolarGraphWidget {
    return {
        type: "polar-graph",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generatePolarGraphOptions(),
        ...polarGraphWidgetProperties,
    };
}

export function generatePolarGraphOptions(
    options?: Partial<PerseusPolarGraphWidgetOptions>,
): PerseusPolarGraphWidgetOptions {
    return {
        ...polarGraphWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generatePolarGraphPointGraph(
    options?: Partial<Omit<PerseusPolarGraphTypePoint, "type">>,
): PerseusPolarGraphTypePoint {
    return {
        type: "point",
        ...options,
    };
}

export function generatePolarGraphRayGraph(
    options?: Partial<Omit<PerseusPolarGraphTypeRay, "type">>,
): PerseusPolarGraphTypeRay {
    return {
        type: "ray",
        ...options,
    };
}

export function generatePolarGraphAngleGraph(
    options?: Partial<Omit<PerseusPolarGraphTypeAngle, "type">>,
): PerseusPolarGraphTypeAngle {
    return {
        type: "angle",
        ...options,
    };
}

export function generatePolarGraphLemniscateGraph(
    options?: Partial<Omit<PerseusPolarGraphTypeLemniscate, "type">>,
): PerseusPolarGraphTypeLemniscate {
    return {
        type: "lemniscate",
        ...options,
    };
}

export function generatePolarGraphCircleGraph(
    options?: Partial<Omit<PerseusPolarGraphTypeCircle, "type">>,
): PerseusPolarGraphTypeCircle {
    return {
        type: "circle",
        ...options,
    };
}

export function generatePolarGraphLimaconGraph(
    options?: Partial<Omit<PerseusPolarGraphTypeLimacon, "type">>,
): PerseusPolarGraphTypeLimacon {
    return {
        type: "limacon",
        ...options,
    };
}

export function generatePolarGraphRoseGraph(
    options?: Partial<Omit<PerseusPolarGraphTypeRose, "type">>,
): PerseusPolarGraphTypeRose {
    return {
        type: "rose",
        ...options,
    };
}

export function generatePolarGraphLockedFigure(
    figure: PerseusPolarGraphType,
    options?: Partial<Omit<PerseusPolarLockedFigure, "figure">>,
): PerseusPolarLockedFigure {
    // The same defaults as a new locked figure on interactive graph.
    return {
        figure,
        color: "grayH",
        strokeStyle: "solid",
        weight: "medium",
        filled: true,
        fillStyle: "none",
        labels: [],
        ...options,
    };
}

/**
 * A one-widget question. When only `correct` is given, `graph` is derived
 * from it by dropping the answer coordinates, so test data stays short.
 */
export function generatePolarGraphQuestion(
    options?: Partial<PerseusPolarGraphWidgetOptions> & {
        content?: string;
        isStatic?: boolean;
        graded?: boolean;
    },
): PerseusRenderer {
    const {
        content = "[[☃ polar-graph 1]]",
        isStatic = false,
        graded = true,
        ...widgetOptions
    } = options ?? {};

    if (widgetOptions.correct && !widgetOptions.graph) {
        const {coords: _, ...graphConfig} = widgetOptions.correct;
        widgetOptions.graph = graphConfig;
    }

    return generateTestPerseusRenderer({
        content,
        widgets: {
            "polar-graph 1": generatePolarGraphWidget({
                static: isStatic,
                graded,
                options: generatePolarGraphOptions(widgetOptions),
            }),
        },
    });
}
