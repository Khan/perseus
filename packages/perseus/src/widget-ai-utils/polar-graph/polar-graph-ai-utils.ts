import {PolarMath} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {
    Coord,
    PerseusPolarGraphType,
    PerseusPolarGraphUserInput,
    PolarAngleUnit,
    PolarGraphPublicWidgetOptions,
} from "@khanacademy/perseus-core";

type CartesianAndPolarPoint = {
    x: number;
    y: number;
    r: number;
    thetaDegrees: number;
};

export type PolarGraphPromptJSON = {
    type: "polar-graph";
    options: {
        maxRadius: number;
        radiusStep: number;
        angleStepDegrees: number;
        angleUnit: PolarAngleUnit;
        graph: {
            type: PerseusPolarGraphType["type"];
            numPoints?: number;
            k?: number;
            /** Whether the learner can change a rose's k. */
            fixedK?: boolean;
        };
        /** Figures the author drew for the learner to read from. */
        lockedFigures: ReadonlyArray<{
            type: PerseusPolarGraphType["type"];
            points: ReadonlyArray<CartesianAndPolarPoint>;
            equation?: Equation;
            /** The TeX of each label placed with the figure. */
            labels: ReadonlyArray<string>;
        }>;
        /** The TeX of each label that belongs to no figure. */
        lockedLabels: ReadonlyArray<string>;
    };
    userInput: {
        type: PerseusPolarGraphType["type"];
        /** Each handle both ways, so a tutor can talk about either form. */
        points: ReadonlyArray<CartesianAndPolarPoint>;
        /** The equation's parameters, when the sub-type has some. */
        equation?: Equation;
    };
};

type Equation =
    | {form: "theta = c"; thetaDegrees: number}
    | {form: "r = a"; a: number}
    | {
          form: "r = a + b cos(theta - phi)";
          a: number;
          b: number;
          phiDegrees: number;
      }
    | {
          form: "r = a cos(k(theta - phi))";
          a: number;
          k: number;
          phiDegrees: number;
      }
    | {
          form: "r^2 = a^2 cos(2(theta - phi))";
          a: number;
          phiDegrees: number;
      }
    | {
          form: "angle at the pole";
          initialSideDegrees: number;
          terminalSideDegrees: number;
          measureDegrees: number;
      };

function pointsBothWays(
    coords: ReadonlyArray<Coord>,
): CartesianAndPolarPoint[] {
    return coords.map(([x, y]) => {
        const {r, thetaDegrees} = PolarMath.toPolar([x, y]);
        return {x, y, r, thetaDegrees};
    });
}

function describeEquation(state: PerseusPolarGraphType): Equation | undefined {
    const coords = state.coords ?? [];
    if (coords.length === 0) {
        return undefined;
    }
    switch (state.type) {
        case "point":
            return undefined;
        case "ray":
            return {
                form: "theta = c",
                thetaDegrees: PolarMath.toPolar(coords[0]).thetaDegrees,
            };
        case "angle": {
            if (coords.length < 2) {
                return undefined;
            }
            const sides: [Coord, Coord] = [coords[0], coords[1]];
            return {
                form: "angle at the pole",
                initialSideDegrees: PolarMath.toPolar(sides[0]).thetaDegrees,
                terminalSideDegrees: PolarMath.toPolar(sides[1]).thetaDegrees,
                measureDegrees: PolarMath.getAngleMeasureDegrees(sides),
            };
        }
        case "lemniscate": {
            const {a, phiDegrees} = PolarMath.getLemniscateParams([coords[0]]);
            return {form: "r^2 = a^2 cos(2(theta - phi))", a, phiDegrees};
        }
        case "circle":
            return {form: "r = a", a: PolarMath.toPolar(coords[0]).r};
        case "limacon": {
            if (coords.length < 2) {
                return undefined;
            }
            const {a, b, phiDegrees} = PolarMath.getLimaconParams([
                coords[0],
                coords[1],
            ]);
            return {form: "r = a + b cos(theta - phi)", a, b, phiDegrees};
        }
        case "rose": {
            const {a, k, phiDegrees} = PolarMath.getRoseParams(
                [coords[0]],
                state.k ?? PolarMath.DEFAULT_ROSE_K,
            );
            return {form: "r = a cos(k(theta - phi))", a, k, phiDegrees};
        }
        default:
            throw new UnreachableCaseError(state);
    }
}

export function getPromptJSON(
    options: PolarGraphPublicWidgetOptions,
    userInput: PerseusPolarGraphUserInput | undefined,
): PolarGraphPromptJSON {
    const coords = userInput?.coords ?? [];
    const {graph} = options;
    return {
        type: "polar-graph",
        options: {
            maxRadius: options.maxRadius,
            radiusStep: options.radiusStep,
            angleStepDegrees: options.angleStepDegrees,
            angleUnit: options.angleUnit,
            graph: {
                type: graph.type,
                ...(graph.type === "point" && {
                    numPoints: graph.numPoints ?? PolarMath.DEFAULT_NUM_POINTS,
                }),
                ...(graph.type === "rose" && {
                    k: graph.k ?? PolarMath.DEFAULT_ROSE_K,
                    fixedK: graph.fixedK ?? false,
                }),
            },
            lockedFigures: options.lockedFigures.map((locked) => ({
                type: locked.figure.type,
                points: pointsBothWays(locked.figure.coords ?? []),
                equation: describeEquation(locked.figure),
                labels: locked.labels.map((label) => label.text),
            })),
            lockedLabels: options.lockedLabels.map((label) => label.text),
        },
        userInput: {
            type: userInput?.type ?? graph.type,
            points: pointsBothWays(coords),
            ...(userInput && {equation: describeEquation(userInput)}),
        },
    };
}
