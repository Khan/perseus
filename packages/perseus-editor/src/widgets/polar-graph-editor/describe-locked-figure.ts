import {PolarMath} from "@khanacademy/perseus-core";

import {formatPolarEquation} from "./format-polar-equation";

import type {
    Coord,
    PerseusPolarGraphType,
    PolarAngleUnit,
} from "@khanacademy/perseus-core";

/** Two decimals reads naturally and hides float noise. */
function number(value: number): string {
    return `${Math.round(value * 100) / 100}`;
}

function position(point: Coord, angleUnit: PolarAngleUnit): string {
    const {r, thetaDegrees} = PolarMath.toPolar(point);
    const angle =
        angleUnit === "degrees"
            ? `${number(thetaDegrees)} degrees`
            : `${PolarMath.formatRadians(thetaDegrees)} radians`;
    return `radius ${number(r)}, angle ${angle}`;
}

/**
 * The two halves of a locked figure's generated aria label, in the pattern
 * interactive graph uses ("Circle with radius 3"): the figure's name, and
 * its measurements. The editor puts any visible labels between them and
 * the appearance after, so a result reads "Circle A with radius 3.
 * Appearance solid gray border, with no fill."
 */
export function describeLockedFigure(
    figure: PerseusPolarGraphType,
    angleUnit: PolarAngleUnit,
): {noun: string; details: string} {
    const coords = figure.coords ?? [];
    const equation = formatPolarEquation(figure, angleUnit);
    switch (figure.type) {
        case "point":
            return {
                noun: coords.length === 1 ? "Point" : "Points",
                details: coords
                    .map((point) => `at ${position(point, angleUnit)}`)
                    .join("; "),
            };
        case "ray":
            return {
                noun: "Ray",
                details:
                    coords.length > 0
                        ? `from the pole at ${position(coords[0], angleUnit)}`
                        : "",
            };
        case "angle": {
            if (coords.length < 2) {
                return {noun: "Angle at the pole", details: ""};
            }
            const measure = PolarMath.getAngleMeasureDegrees([
                coords[0],
                coords[1],
            ]);
            const measureText =
                angleUnit === "degrees"
                    ? `${number(measure)} degrees`
                    : `${PolarMath.formatRadians(measure)} radians`;
            return {
                noun: "Angle at the pole",
                details:
                    `measuring ${measureText}, with its initial side at ` +
                    position(coords[0], angleUnit),
            };
        }
        case "circle":
            return {
                noun: "Circle",
                details:
                    coords.length > 0
                        ? `with radius ${number(
                              PolarMath.toPolar(coords[0]).r,
                          )}`
                        : "",
            };
        case "limacon":
            return {
                noun: "Limaçon",
                details: equation ? `with equation ${equation}` : "",
            };
        case "rose":
            return {
                noun: "Rose",
                details: equation ? `with equation ${equation}` : "",
            };
        case "lemniscate":
            return {
                noun: "Lemniscate",
                details: equation ? `with equation ${equation}` : "",
            };
    }
}
