import type {MafsGraphProps} from "./mafs-graph";

export function getBaseMafsGraphPropsForTests(): MafsGraphProps {
    return {
        box: [400, 400],
        step: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
        containerSizeClass: "small",
        showTooltips: false,
        showProtractor: false,
        readOnly: false,
        labels: ["x", "y"],
        lockedFigures: [],
        static: false,
        showAxisArrows: {
            xMin: true,
            xMax: true,
            yMin: true,
            yMax: true,
        },
        showAxisTicks: {x: true, y: true},
        dispatch: () => {},
        state: {
            type: "segment",
            hasBeenInteractedWith: false,
            coords: [],
            snapStep: [1, 1],
            range: [
                [-10, 10],
                [-10, 10],
            ],
        },
        widgetId: "test-widget-id",
    };
}
