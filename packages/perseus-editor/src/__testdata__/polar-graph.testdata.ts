import {
    PolarMath,
    generatePolarGraphAngleGraph,
    generatePolarGraphPointGraph,
    generatePolarGraphQuestion,
} from "@khanacademy/perseus-core";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = generatePolarGraphQuestion({
    content: "Plot the point $(3, 45^\\circ)$.\n\n[[☃ polar-graph 1]]",
    correct: generatePolarGraphPointGraph({
        numPoints: 1,
        coords: [PolarMath.fromPolar(3, 45)],
    }),
});

/** An angle that starts closed on the polar axis and opens to 120°. */
export const questionWithStartPositions: PerseusRenderer =
    generatePolarGraphQuestion({
        content:
            "Open the angle to $120^\\circ$ in standard position." +
            "\n\n[[☃ polar-graph 1]]",
        graph: generatePolarGraphAngleGraph({
            startCoords: [PolarMath.fromPolar(3, 0), PolarMath.fromPolar(3, 0)],
        }),
        correct: generatePolarGraphAngleGraph({
            coords: [PolarMath.fromPolar(3, 0), PolarMath.fromPolar(3, 120)],
        }),
    });
