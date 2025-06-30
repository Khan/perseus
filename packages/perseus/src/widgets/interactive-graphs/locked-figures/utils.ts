import type {StrokeWeight} from "@khanacademy/perseus-core";

export const strokeWeights: Record<StrokeWeight, number> = {
    thin: 1,
    medium: 2,
    thick: 4,
} as const;

export function clampDomain(
    domain: [number, number],
    graphBounds: [number, number],
): [number, number] | null {
    // If the domain is invalid, return the graph bounds
    if (domain[0] > domain[1]) {
        return graphBounds;
    }

    // If the domain is outside the graph bounds, return null
    if (
        (domain[0] < graphBounds[0] && domain[1] < graphBounds[0]) ||
        (domain[0] > graphBounds[1] && domain[1] > graphBounds[1])
    ) {
        return null;
    }

    // Clamp the function to the bounds of the graph to prevent memory
    // leaks when the domain is set to something like [-Infinity, Infinity].
    const min = Math.max(domain[0], graphBounds[0]);
    const max = Math.min(domain[1], graphBounds[1]);

    return [min, max];
}
