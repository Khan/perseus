import type {PerseusGraphType} from "@khanacademy/perseus-core";

function toTrio(pointLabels: ReadonlyArray<string>): [string, string, string] {
    return [pointLabels[0] ?? "", pointLabels[1] ?? "", pointLabels[2] ?? ""];
}

function toPair(pointLabels: ReadonlyArray<string>): [string, string] {
    return [pointLabels[0] ?? "", pointLabels[1] ?? ""];
}

function toArray(pointLabels: ReadonlyArray<string>): string[] {
    return [...pointLabels];
}

// Reshapes editor input to match each graph type's `pointLabels` schema.
// Mirrors onto `correct` only when types match (LEMS-3903 recovery: a
// mid-edit type switch keeps the previous `correct` answer intact).
export function reshapePointLabelsForGraphType(
    pointLabels: ReadonlyArray<string>,
    graph: PerseusGraphType | undefined,
    correct: PerseusGraphType | undefined,
): {graph: PerseusGraphType; correct: PerseusGraphType} | null {
    if (!graph?.type || !correct) {
        return null;
    }

    let nextGraph: PerseusGraphType;
    let nextCorrect: PerseusGraphType = correct;

    switch (graph.type) {
        case "angle":
        case "quadratic": {
            const reshaped = toTrio(pointLabels);
            nextGraph = {...graph, pointLabels: reshaped};
            if (correct.type === graph.type) {
                nextCorrect = {...correct, pointLabels: reshaped};
            }
            break;
        }
        case "absolute-value":
        case "linear":
        case "ray":
        case "vector": {
            const reshaped = toPair(pointLabels);
            nextGraph = {...graph, pointLabels: reshaped};
            if (correct.type === graph.type) {
                nextCorrect = {...correct, pointLabels: reshaped};
            }
            break;
        }
        case "circle":
        case "exponential":
        case "linear-system":
        case "logarithm":
        case "point":
        case "polygon":
        case "segment":
        case "sinusoid":
        case "tangent": {
            const reshaped = toArray(pointLabels);
            nextGraph = {...graph, pointLabels: reshaped};
            if (correct.type === graph.type) {
                nextCorrect = {...correct, pointLabels: reshaped};
            }
            break;
        }
        case "none":
            return null;
    }

    return {graph: nextGraph, correct: nextCorrect};
}
