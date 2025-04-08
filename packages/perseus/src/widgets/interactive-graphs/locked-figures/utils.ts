export function clampDomain(
    inputDomain: [number, number],
    graphBounds: [number, number],
): [number, number] | null {
    const domain = inputDomain.map((value, index) => {
        if (value === null) {
            return graphBounds[index];
        }
        return value;
    });
    // eslint-disable-next-line no-console
    console.log("inputDomain", inputDomain);
    // eslint-disable-next-line no-console
    console.log("domain", domain);
    // If the domain is invalid, return the graph bounds
    if (domain[0] > domain[1]) {
        // eslint-disable-next-line no-console
        console.log(
            "invalid domain, returning graph bounds",
            domain,
            graphBounds,
        );
        return graphBounds;
    }

    // If the domain is outside the graph bounds, return null
    if (
        (domain[0] < graphBounds[0] && domain[1] < graphBounds[0]) ||
        (domain[0] > graphBounds[1] && domain[1] > graphBounds[1])
    ) {
        // eslint-disable-next-line no-console
        console.log(
            "domain is outside graph bounds, returning null",
            domain,
            graphBounds,
        );
        return null;
    }

    // Clamp the function to the bounds of the graph to prevent memory
    // leaks when the domain is set to something like [-Infinity, Infinity].
    const min = Math.max(domain[0], graphBounds[0]);
    const max = Math.min(domain[1], graphBounds[1]);
    // eslint-disable-next-line no-console
    console.log(
        "max is the minimum between domain and graphBounds",
        max,
        "domain[1]",
        domain[1],
        "graphBounds[1]",
        graphBounds[1],
    );
    // eslint-disable-next-line no-console
    console.log(
        "min is the maximum between domain and graphBounds",
        min,
        "domain[0]",
        domain[0],
        "graphBounds[0]",
        graphBounds[0],
    );

    // eslint-disable-next-line no-console
    console.log("clamped domain", [min, max]);
    return [min, max];
}
