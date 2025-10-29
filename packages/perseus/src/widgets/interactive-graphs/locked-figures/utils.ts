import type {StrokeWeight} from "@khanacademy/perseus-core";

export const strokeWeights: Record<StrokeWeight, number> = {
    thin: 1,
    medium: 2,
    thick: 4,
} as const;

export function clampDomain(
    domain: [number | null, number | null],
    graphBounds: [number, number],
): [number, number] | null {
    // Infinity values are lost (converted to null) when passed through
    // JSON serialization. Therefore, we shouldn't rely upon the parser to
    // validate the domain values. Instead, that responsibility should be
    // maintained here.
    const normalizedDomain: [number, number] = [
        domain[0] === null ? -Infinity : domain[0],
        domain[1] === null ? Infinity : domain[1],
    ];
    // If the domain is invalid, return the graph bounds
    if (normalizedDomain[0] > normalizedDomain[1]) {
        return graphBounds;
    }

    // If the domain is outside the graph bounds, return null
    if (
        (normalizedDomain[0] < graphBounds[0] &&
            normalizedDomain[1] < graphBounds[0]) ||
        (normalizedDomain[0] > graphBounds[1] &&
            normalizedDomain[1] > graphBounds[1])
    ) {
        return null;
    }

    // Clamp the function to the bounds of the graph to prevent memory
    // leaks when the domain is set to something like [-Infinity, Infinity].
    const min = Math.max(normalizedDomain[0], graphBounds[0]);
    const max = Math.min(normalizedDomain[1], graphBounds[1]);

    return [min, max];
}
