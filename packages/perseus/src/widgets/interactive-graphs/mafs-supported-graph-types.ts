export const mafsSupportedGraphTypes = [
    "segment",
    "linear",
    "linear-system",
    "ray",
    "polygon",
    "point",
    "circle",
] as const;

export type MafsSupportedGraphType = (typeof mafsSupportedGraphTypes)[number];

// Pass these to the `flags` property of the `apiOptions` prop of the Renderer
// component, e.g.:
//
// ```
// apiOptions={{flags: {mafs: trueForAllMafsSupportedGraphTypes}}}
// ```
export const trueForAllMafsSupportedGraphTypes: Record<
    MafsSupportedGraphType,
    true
> = mafsSupportedGraphTypes.reduce(
    (acc, type) => {
        acc[type] = true;
        return acc;
    },
    {} as Record<MafsSupportedGraphType, true>,
);
