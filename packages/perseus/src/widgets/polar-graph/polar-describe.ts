import {PolarMath} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import {srFormatNumber} from "../interactive-graphs/graphs/strings/format-number";

import type {I18nContextType} from "../../components/i18n-context";
import type {
    Coord,
    PerseusPolarGraphType,
    PolarAngleUnit,
} from "@khanacademy/perseus-core";

/** "Point 1 at radius 3, angle 45 degrees.", or "Point A …" when labeled. */
export function describePolarPoint(
    index: number,
    point: Coord,
    angleUnit: PolarAngleUnit,
    i18n: I18nContextType,
    label?: string,
): string {
    const {strings, locale} = i18n;
    const {r, thetaDegrees} = PolarMath.toPolar(point);
    const pointLabel = label || `${index + 1}`;
    const radius = srFormatNumber(r, locale);
    return angleUnit === "degrees"
        ? strings.srPolarPointDegrees({
              pointLabel,
              radius,
              angle: srFormatNumber(thetaDegrees, locale),
          })
        : strings.srPolarPointRadians({
              pointLabel,
              radius,
              angle: PolarMath.formatRadians(thetaDegrees),
          });
}

/** "Far tip of the limaçon at radius 4, angle 0 degrees." */
export function describeNamedPoint(
    name: string,
    point: Coord,
    angleUnit: PolarAngleUnit,
    i18n: I18nContextType,
): string {
    const {strings, locale} = i18n;
    const {r, thetaDegrees} = PolarMath.toPolar(point);
    const radius = srFormatNumber(r, locale);
    return angleUnit === "degrees"
        ? strings.srPolarNamedPointDegrees({
              name,
              radius,
              angle: srFormatNumber(thetaDegrees, locale),
          })
        : strings.srPolarNamedPointRadians({
              name,
              radius,
              angle: PolarMath.formatRadians(thetaDegrees),
          });
}

/** The aria-label of the group that holds the drawn figure and its handles. */
export function describePolarFigure(
    state: PerseusPolarGraphType,
    angleUnit: PolarAngleUnit,
    i18n: I18nContextType,
): string {
    const {strings, locale} = i18n;
    switch (state.type) {
        case "point":
            return strings.srPolarGraph;
        case "ray":
            return strings.srPolarRayGraph;
        case "angle": {
            if (!state.coords) {
                return strings.srPolarGraph;
            }
            const measure = PolarMath.getAngleMeasureDegrees(state.coords);
            return angleUnit === "degrees"
                ? strings.srPolarAngleGraphDegrees({
                      measure: srFormatNumber(measure, locale),
                  })
                : strings.srPolarAngleGraphRadians({
                      measure: PolarMath.formatRadians(measure),
                  });
        }
        case "lemniscate":
            return strings.srPolarLemniscateGraph;
        case "circle":
            return strings.srPolarCircleGraph;
        case "limacon":
            return strings.srPolarLimaconGraph;
        case "rose":
            return strings.srPolarRoseGraph({
                k: `${state.k ?? PolarMath.DEFAULT_ROSE_K}`,
            });
        default:
            throw new UnreachableCaseError(state);
    }
}

/** One sentence per handle or drawn part of the figure, in reading order. */
export function describePolarHandles(
    state: PerseusPolarGraphType,
    angleUnit: PolarAngleUnit,
    i18n: I18nContextType,
    pointLabels: ReadonlyArray<string> = [],
): string[] {
    const {strings, locale} = i18n;
    const coords = state.coords ?? [];
    if (coords.length === 0) {
        return [];
    }
    let elements: string[];
    switch (state.type) {
        case "point":
            elements = coords.map((point, index) =>
                describePolarPoint(
                    index,
                    point,
                    angleUnit,
                    i18n,
                    pointLabels[index],
                ),
            );
            break;
        case "ray":
            elements = [
                describeNamedPoint(
                    strings.srPolarRayPoint,
                    coords[0],
                    angleUnit,
                    i18n,
                ),
            ];
            break;
        case "angle":
            elements = [
                describeNamedPoint(
                    strings.srPolarInitialSide,
                    coords[0],
                    angleUnit,
                    i18n,
                ),
                describeNamedPoint(
                    strings.srPolarTerminalSide,
                    coords[1],
                    angleUnit,
                    i18n,
                ),
            ];
            break;
        case "lemniscate":
            elements = [
                describeNamedPoint(
                    strings.srPolarLemniscateTip,
                    coords[0],
                    angleUnit,
                    i18n,
                ),
            ];
            break;
        case "circle":
            elements = [
                strings.srPolarCircleShape({
                    radius: srFormatNumber(
                        PolarMath.toPolar(coords[0]).r,
                        locale,
                    ),
                }),
                describeNamedPoint(
                    strings.srPolarCirclePoint,
                    coords[0],
                    angleUnit,
                    i18n,
                ),
            ];
            break;
        case "limacon":
            elements = [
                describeNamedPoint(
                    strings.srPolarFarTip,
                    coords[0],
                    angleUnit,
                    i18n,
                ),
                describeNamedPoint(
                    strings.srPolarNearPoint,
                    coords[1],
                    angleUnit,
                    i18n,
                ),
            ];
            break;
        case "rose":
            elements = [
                describeNamedPoint(
                    strings.srPolarPetalTip,
                    coords[0],
                    angleUnit,
                    i18n,
                ),
            ];
            break;
        default:
            throw new UnreachableCaseError(state);
    }
    return elements;
}

/** The live description of every interactive element on the graph. */
export function describePolarElements(
    state: PerseusPolarGraphType,
    angleUnit: PolarAngleUnit,
    i18n: I18nContextType,
    pointLabels: ReadonlyArray<string> = [],
): string {
    const elements = describePolarHandles(state, angleUnit, i18n, pointLabels);
    if (elements.length === 0) {
        return i18n.strings.srNoInteractiveElements;
    }
    return i18n.strings.srInteractiveElements({elements: elements.join(" ")});
}
