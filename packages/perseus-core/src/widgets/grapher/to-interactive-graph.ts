import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import invariant from "tiny-invariant";

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
    if (grapherOptions.availableTypes.length !== 1) {
        // Only grapher widgets with a single available graph type can be
        // converted to interactive-graph widgets.
        return null;
    }

    const [type] = grapherOptions.availableTypes;
    if (type === "quadratic") {
        // Quadratic graphers cannot be converted to interactive-graph,
        // because the 3-point user input from the interactive-graph cannot be
        // losslessly converted back to the 2-point user input for Grapher.
        return null;
    }

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
        correct: grapherOptions.correct
            ? grapherAnswerTypesToPerseusGraphType(grapherOptions.correct)
            : {type: type === "absolute_value" ? "absolute-value" : type},
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
            invariant(
                interactiveGraphUserInput.asymptote != null,
                "exponential graph asymptote must not be nullish in user input",
            );
            const asymptoteY = interactiveGraphUserInput.asymptote;
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
            invariant(
                interactiveGraphUserInput.asymptote != null,
                "logarithm graph asymptote must not be nullish in user input",
            );
            const asymptoteX = interactiveGraphUserInput.asymptote;
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
        case "angle":
        case "circle":
        case "linear-system":
        case "none":
        case "point":
        case "polygon":
        case "quadratic":
        case "ray":
        case "segment":
        case "vector":
            throw Error(
                "Can't convert interactive-graph user input to grapher user input. Type: " +
                    interactiveGraphUserInput.type,
            );
        default:
            throw new UnreachableCaseError(interactiveGraphUserInput);
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
            throw Error(
                "Can't convert GrapherAnswerTypes to interactive graph. Type: quadratic",
            );
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
