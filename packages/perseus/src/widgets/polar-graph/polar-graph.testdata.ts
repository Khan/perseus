import {
    PolarMath,
    generatePolarGraphAngleGraph,
    generatePolarGraphLockedFigure,
    generatePolarGraphCircleGraph,
    generatePolarGraphLemniscateGraph,
    generatePolarGraphLimaconGraph,
    generatePolarGraphPointGraph,
    generatePolarGraphQuestion,
    generatePolarGraphRayGraph,
    generatePolarGraphRoseGraph,
} from "@khanacademy/perseus-core";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

/** Plot the point (3, 45°) on a 15° grid labeled in degrees. */
export const singlePointDegrees: PerseusRenderer = generatePolarGraphQuestion({
    content: "Plot the point $(3, 45^\\circ)$.\n\n[[☃ polar-graph 1]]",
    correct: generatePolarGraphPointGraph({
        numPoints: 1,
        coords: [PolarMath.fromPolar(3, 45)],
    }),
    fullGraphAriaLabel: "A polar graph with circles one unit apart.",
});

/** Plot (2, π/2) and (4, π), labeled in radians, spokes every 30°. */
export const twoPointsRadians: PerseusRenderer = generatePolarGraphQuestion({
    content:
        "Plot the points $(2, \\pi/2)$ and $(4, \\pi)$." +
        "\n\n[[☃ polar-graph 1]]",
    angleUnit: "radians",
    angleStepDegrees: 30,
    correct: generatePolarGraphPointGraph({
        numPoints: 2,
        coords: [
            [0, 2],
            [-4, 0],
        ],
    }),
});

/** A smaller grid with half-unit circles, for checking label density. */
export const halfUnitGrid: PerseusRenderer = generatePolarGraphQuestion({
    content: "Plot the point $(1.5, 90^\\circ)$.\n\n[[☃ polar-graph 1]]",
    maxRadius: 2,
    radiusStep: 0.5,
    angleStepDegrees: 45,
    correct: generatePolarGraphPointGraph({
        numPoints: 1,
        coords: [[0, 1.5]],
    }),
});

/** Draw the ray θ = 5π/6. */
export const rayRadians: PerseusRenderer = generatePolarGraphQuestion({
    content: "Graph $\\theta = 5\\pi/6$.\n\n[[☃ polar-graph 1]]",
    angleUnit: "radians",
    angleStepDegrees: 30,
    correct: generatePolarGraphRayGraph({
        coords: [PolarMath.fromPolar(3, 150)],
    }),
});

/** Draw the circle r = 3. */
export const circleRadiusThree: PerseusRenderer = generatePolarGraphQuestion({
    content: "Graph $r = 3$.\n\n[[☃ polar-graph 1]]",
    correct: generatePolarGraphCircleGraph({coords: [[3, 0]]}),
});

/**
 * Draw the cardioid r = 2(1 + cos θ): far tip at (4, 0°), near point at
 * the pole.
 */
export const cardioid: PerseusRenderer = generatePolarGraphQuestion({
    content: "Graph $r = 2(1 + \\cos\\theta)$.\n\n[[☃ polar-graph 1]]",
    correct: generatePolarGraphLimaconGraph({
        coords: [
            [4, 0],
            [0, 0],
        ],
    }),
});

/** Draw the rose r = 4 cos(3θ): a petal tip at (4, 0°) and k = 3. */
export const threePetalRose: PerseusRenderer = generatePolarGraphQuestion({
    content: "Graph $r = 4\\cos(3\\theta)$.\n\n[[☃ polar-graph 1]]",
    graph: generatePolarGraphRoseGraph({k: 2}),
    correct: generatePolarGraphRoseGraph({k: 3, coords: [[4, 0]]}),
});

/** Draw 5π/6 in standard position, with the measure shown. */
export const angleStandardPosition: PerseusRenderer =
    generatePolarGraphQuestion({
        content:
            "Draw an angle of $5\\pi/6$ in standard position." +
            "\n\n[[☃ polar-graph 1]]",
        angleUnit: "radians",
        angleStepDegrees: 30,
        correct: generatePolarGraphAngleGraph({
            showAngles: true,
            coords: [PolarMath.fromPolar(3, 0), PolarMath.fromPolar(3, 150)],
        }),
    });

/** Draw any angle measuring 120°; the sides may point anywhere. */
export const angleCongruent: PerseusRenderer = generatePolarGraphQuestion({
    content:
        "Draw an angle that measures $120^\\circ$.\n\n[[☃ polar-graph 1]]",
    angleStepDegrees: 30,
    correct: generatePolarGraphAngleGraph({
        showAngles: true,
        match: "congruent",
        coords: [PolarMath.fromPolar(3, 0), PolarMath.fromPolar(3, 120)],
    }),
});

/** Draw the lemniscate r² = 9 cos 2θ. */
export const lemniscate: PerseusRenderer = generatePolarGraphQuestion({
    content: "Graph $r^2 = 9\\cos(2\\theta)$.\n\n[[☃ polar-graph 1]]",
    correct: generatePolarGraphLemniscateGraph({coords: [[3, 0]]}),
});

/** Read a point off an author-drawn cardioid. */
export const readFromCurve: PerseusRenderer = generatePolarGraphQuestion({
    content:
        "Plot the point where the cardioid crosses the polar axis." +
        "\n\n[[☃ polar-graph 1]]",
    lockedFigures: [
        generatePolarGraphLockedFigure(
            generatePolarGraphLimaconGraph({
                coords: [
                    [4, 0],
                    [0, 0],
                ],
            }),
            {
                color: "purple",
                ariaLabel: "The cardioid r = 2(1 + cos θ)",
                labels: [
                    {
                        type: "label",
                        coord: [4.3, 1.2],
                        text: "$r = 2(1 + \\cos\\theta)$",
                        color: "purple",
                        size: "medium",
                    },
                ],
            },
        ),
    ],
    fullGraphAriaDescription: "A purple cardioid opens to the right.",
    correct: generatePolarGraphPointGraph({coords: [[4, 0]]}),
});

/** Two named points with their labels shown. */
export const labeledPoints: PerseusRenderer = generatePolarGraphQuestion({
    content:
        "Plot $A = (3, 0^\\circ)$ and $B = (2, 90^\\circ)$." +
        "\n\n[[☃ polar-graph 1]]",
    correct: generatePolarGraphPointGraph({
        numPoints: 2,
        pointLabels: ["A", "B"],
        showPointLabels: true,
        coords: [
            [3, 0],
            [0, 2],
        ],
    }),
});

/** A sketchpad: the same graph with grading turned off. */
export const ungradedRose: PerseusRenderer = generatePolarGraphQuestion({
    content: "Change k and watch the petals.\n\n[[☃ polar-graph 1]]",
    graded: false,
    graph: generatePolarGraphRoseGraph({k: 3}),
    correct: generatePolarGraphRoseGraph({k: 3, coords: [[4, 0]]}),
});
