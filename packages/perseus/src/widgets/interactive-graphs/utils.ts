import type {Coord} from "../../interactive2/types";
import type {PerseusInteractiveGraphWidgetOptions} from "../../perseus-types";

// same as pointsFromNormalized in interactive-graph.tsx
export const normalizePoints = <A extends ReadonlyArray<Coord>>(
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
    coordsList: A,
    noSnap?: boolean,
): A =>
    coordsList.map(
        (coords) =>
            // maps over [x, y]
            coords.map((coord, i) => {
                const axisRange = range[i];
                if (noSnap) {
                    return axisRange[0] + (axisRange[1] - axisRange[0]) * coord;
                }
                const axisStep = step[i];
                const nSteps = Math.floor(
                    (axisRange[1] - axisRange[0]) / axisStep,
                );
                const tick = Math.round(coord * nSteps);
                return axisRange[0] + axisStep * tick;
            }) as Coord,
    ) as any;

// same as normalizeCoords in interactive-graph.tsx
export const normalizeCoords = <A extends ReadonlyArray<Coord>>(
    coordsList: A,
    ranges: PerseusInteractiveGraphWidgetOptions["range"],
): A =>
    coordsList.map<Coord>(
        (coords) =>
            coords.map((coord, i) => {
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            }) as Coord,
    ) as any;
