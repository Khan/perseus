export function clampDomain(
    inputDomain: [number | null, number | null],
    graphBounds: [number, number],
): [number, number] | null {
    const domain = inputDomain.map((value, index) => {
        // Null values are used to indicate that the domain is not set
        // (assumed to be -infinity/infinity), so we can use the graph
        // bounds to clamp the domain.
        if (value === null) {
            return graphBounds[index];
        }
        return value;
    });

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
