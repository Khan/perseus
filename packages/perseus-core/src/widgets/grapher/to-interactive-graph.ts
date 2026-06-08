import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {
    GrapherAnswerTypes,
    PerseusGrapherWidgetOptions,
    PerseusGraphType,
    PerseusInteractiveGraphWidgetOptions,
    Coord,
} from "../../data-schema";
import type {
    PerseusGrapherUserInput,
    PerseusInteractiveGraphUserInput,
} from "../../validation.types";

export function convertGrapherOptionsToInteractiveGraph(
    grapherOptions: PerseusGrapherWidgetOptions,
): PerseusInteractiveGraphWidgetOptions | null {
    if (grapherOptions.availableTypes.length === 1) {
        // Only grapher widgets with a single available graph type can be
        // converted to interactive-graph widgets.
        return null;
    }

    const type = grapherOptions.availableTypes[0];

    return {
        step: grapherOptions.graph.step,
        gridStep: grapherOptions.graph.gridStep,
        snapStep: grapherOptions.graph.snapStep,
        backgroundImage: grapherOptions.graph.backgroundImage,
        markings: grapherOptions.graph.markings,
        labels: grapherOptions.graph.labels,
        labelLocation: "onAxis",
        showAxisArrows: {
            xMin: true,
            xMax: true,
            yMin: true,
            yMax: true,
        },
        showAxisTicks: {x: true, y: true},
        showProtractor: grapherOptions.graph.showProtractor ?? false,
        showTooltips: grapherOptions.graph.showTooltips,
        range: grapherOptions.graph.range,
        graph: {type: type === "absolute_value" ? "absolute-value" : type},
        correct: grapherAnswerTypesToPerseusGraphType(grapherOptions.correct),
        lockedFigures: [],
    };
}

export function convertGrapherUserInputToInteractiveGraph(
    grapherUserInput: PerseusGrapherUserInput,
): PerseusInteractiveGraphUserInput {
    return grapherAnswerTypesToPerseusGraphType(grapherUserInput);
}

export function convertInteractiveGraphUserInputToGrapher(
    interactiveGraphUserInput: PerseusInteractiveGraphUserInput,
): PerseusGrapherUserInput {
    switch (interactiveGraphUserInput.type) {
        case "absolute-value":
            return {
                type: "absolute_value",
                coords: interactiveGraphUserInput.coords ?? null,
            };
        case "exponential": {
            // FIXME: assert asymptote is not nullish here.
            const asymptoteY = interactiveGraphUserInput.asymptote ?? 0;
            return {
                type: "exponential",
                coords: interactiveGraphUserInput.coords ?? null,
                asymptote: [
                    [0, asymptoteY],
                    [1, asymptoteY],
                ],
            };
        }
        case "linear":
            return {
                type: "linear",
                coords: interactiveGraphUserInput.coords ?? null,
            };
        case "logarithm": {
            // FIXME: assert asymptote is not nullish here.
            const asymptoteX = interactiveGraphUserInput.asymptote ?? 0;
            return {
                type: "logarithm",
                coords: interactiveGraphUserInput.coords ?? null,
                asymptote: [
                    [asymptoteX, 0],
                    [asymptoteX, 1],
                ],
            };
        }
        case "sinusoid":
            return {
                type: "sinusoid",
                // FIXME: avoid casting, use the parser.
                coords:
                    // eslint-disable-next-line no-restricted-syntax
                    (interactiveGraphUserInput.coords as [Coord, Coord]) ??
                    null,
            };
        case "tangent":
            return {
                type: "tangent",
                // FIXME: avoid casting, use the parser.
                coords:
                    // eslint-disable-next-line no-restricted-syntax
                    (interactiveGraphUserInput.coords as [Coord, Coord]) ??
                    null,
            };
        default:
            // This branch includes "quadratic"
            // NOTE: we can't convert interactive graph quadratic coords to
            // grapher, because that conversion is lossy (3 points -> 2 points).
            throw Error(
                "Can't convert interactive-graph user input to grapher user input. Type: " +
                    interactiveGraphUserInput.type,
            );
    }
}

function grapherAnswerTypesToPerseusGraphType(
    grapherAnswerTypes: GrapherAnswerTypes,
): PerseusGraphType {
    switch (grapherAnswerTypes.type) {
        case "absolute_value":
            return {
                type: "absolute-value",
                coords: grapherAnswerTypes.coords,
            };
        case "exponential":
            return {
                type: "exponential",
                coords: grapherAnswerTypes.coords,
                asymptote: grapherAnswerTypes.asymptote[0][1],
            };
        case "linear":
            return {
                type: "linear",
                coords: grapherAnswerTypes.coords,
            };
        case "logarithm":
            return {
                type: "logarithm",
                coords: grapherAnswerTypes.coords,
                asymptote: grapherAnswerTypes.asymptote[0][0],
            };
        case "quadratic":
            return {
                type: "quadratic",
                coords:
                    grapherAnswerTypes.coords == null
                        ? null
                        : grapherQuadraticCoordsToInteractiveGraphCoords(
                              grapherAnswerTypes.coords,
                          ),
            };
        case "sinusoid":
            return {
                type: "sinusoid",
                coords: grapherAnswerTypes.coords,
            };
        case "tangent":
            return {
                type: "tangent",
                coords: grapherAnswerTypes.coords,
            };
        default:
            throw new UnreachableCaseError(grapherAnswerTypes);
    }
}

function grapherQuadraticCoordsToInteractiveGraphCoords([vertex, secondPoint]: [
    Coord,
    Coord,
]): [Coord, Coord, Coord] {
    const thirdPoint: Coord = [
        // Reflect the x-coordinate of the second point across a vertical line
        // through the vertex.
        vertex[0] - (secondPoint[0] - vertex[0]),
        secondPoint[1],
    ];
    return [vertex, secondPoint, thirdPoint];
}
