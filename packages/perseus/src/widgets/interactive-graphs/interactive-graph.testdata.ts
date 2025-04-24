/* eslint-disable max-lines */
import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";

import type {LockedFunctionOptions} from "./interactive-graph-question-builder";
import type {Coord} from "../../interactive2/types";
import type {PerseusRenderer, RadioWidget} from "@khanacademy/perseus-core";

// Data for the interactive graph widget

export const angleQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withContent(
        "**Drag the vertex of the angle to place the vertex at point $\\text{A}$.**  \n\n**Drag another point on the angle to make one of the rays go through point $\\text{B}$.**\n\n**Make the other ray go through one of the unlabeled black points to create an acute angle.**  \n*The arc symbol near the vertex indicates the angle being measured.*\n\n[[☃ interactive-graph 1]]",
    )
    .withBackgroundImage(
        "https://ka-perseus-graphie.s3.amazonaws.com/807ea77cf7031c1b9a45694083f05b5e09b01946.png",
        400,
        400,
        {bottom: 0, left: 0, scale: 1},
    )
    .withMarkings("none")
    .withAngle({
        allowReflexAngles: false,
        angleOffsetDeg: 1,
        coords: [
            [2.2059851900220853, 2.2059851900220853],
            [-2, -2],
            [-4.973144353700384, 5.004289159600586],
        ],
        snapDegrees: 4,
    })
    .build();

export const angleQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withAngle().build();

export const angleWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withAngle({
            startCoords: [
                [5, 1],
                [1, 1],
                [4, 5],
            ],
        })
        .build();

export const circleQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withCircle({center: [-2, -4], radius: 2})
    .build();

export const circleQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withCircle().build();

export const linearQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withLinear({
        coords: [
            [-1, 1],
            [0, -2],
        ],
    })
    .build();

export const linearQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withLinear().build();

export const linearSystemQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withLinearSystem({
            coords: [
                [
                    [-7, 7],
                    [0, -2],
                ],
                [
                    [-3, -7],
                    [7, -3],
                ],
            ],
        })
        .build();

export const linearSystemQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withLinearSystem().build();

export const pointQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withContent(
        "We want to find the zeros of this polynomial:\n\n$p(x)=x(2x+5)(x+1)$\n\n**Plot all the zeros ($x$-intercepts) of the polynomial in the interactive graph.**\n\n[[\u2603 interactive-graph 1]]",
    )
    .withBackgroundImage(
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/9e825947f778170369f22da5f87239cbf4c1ebe3",
        425,
        425,
    )
    .withMarkings("none")
    .withGridStep(0.5, 0.5)
    .withSnapStep(0.5, 0.5)
    .withTickStep(1, 1)
    .withXRange(-4, 4)
    .withYRange(-4, 4)
    .withPoints("unlimited", {
        coords: [
            [0, 0],
            [-2.5, 0],
            [-1, 0],
        ],
    })
    .build();

export const pointQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withPoints(1).build();

export const pointQuestionWithStartingCoords: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withPoints(2, {
            startCoords: [
                [0, 0],
                [2, 2],
            ],
        })
        .build();

export const finitePointQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "Vector $\\vec v$ is graphed in the interactive graph below.\n\n**Assuming $3\\vec v$ starts at the origin, plot its endpoint.**\n\n[[\u2603 interactive-graph 1]]",
        )
        .withBackgroundImage(
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/d6983eff3063dac5815cc4d48c565cddba819765",
            400,
            400,
        )
        .withMarkings("none")
        .withGridStep(1, 1)
        .withSnapStep(1, 1)
        .withTickStep(1, 1)
        .withXRange(-8, 8)
        .withYRange(-8, 8)
        .withPoints(1, {
            coords: [[0, 0]],
        })
        .build();

export const unlimitedPointQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder().withPoints("unlimited").build();

export const polygonQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Sides shown** Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(0.5, 0.5)
        .withSnapStep(0.25, 0.25)
        .withTickStep(0.5, 0.5)
        .withMarkings("none")
        .withXRange(-1, 6)
        .withYRange(-1, 6)
        .withPolygon("grid", {
            match: "congruent",
            numSides: 3,
            showSides: true,
            coords: [
                [3.5, 2],
                [3.5, 5],
                [-0.5, 2],
            ],
        })
        .build();

export const unlimitedPolygonQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Sides shown** Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(1, 1)
        .withSnapStep(0.25, 0.25)
        .withTickStep(1, 1)
        .withXRange(-10, 10)
        .withYRange(-10, 10)
        .withPolygon("grid", {
            match: "congruent",
            numSides: "unlimited",
            showSides: true,
            showAngles: true,
            coords: [],
        })
        .build();

export const polygonWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withPolygon("grid", {
            startCoords: [
                [6, 6],
                [8, 6],
                [8, 8],
                [6, 8],
            ],
        })
        .build();

export const unlimitedPolygonWithCorrectAnswerQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withPolygon("grid", {
            numSides: "unlimited",
            coords: [
                [-4.5, -6],
                [4.5, -5],
                [3.5, 0.5],
                [-4.5, 0],
            ],
        })
        .build();

export const polygonWithAnglesQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Angles shown** Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(0.5, 0.5)
        .withSnapStep(0.25, 0.25)
        .withTickStep(0.5, 0.5)
        .withXRange(-1, 6)
        .withYRange(-1, 6)
        .withPolygon("grid", {
            match: "congruent",
            numSides: 3,
            showAngles: true,
            coords: [
                [3.5, 2],
                [3.5, 5],
                [-0.5, 2],
            ],
        })
        .build();

export const polygonWithAnglesAndAnglesSnapToQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Example of snapTo set to `angles`.** \n Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(0.5, 0.5)
        .withSnapStep(0.25, 0.25)
        .withTickStep(0.5, 0.5)
        .withXRange(-1, 6)
        .withYRange(-1, 6)
        .withPolygon("angles", {
            match: "congruent",
            numSides: 3,
            showSides: true,
            showAngles: true,
            coords: [
                [3.5, 2],
                [3.5, 5],
                [-0.5, 2],
            ],
        })
        .build();

export const polygonWithAnglesAndManySidesQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Polygon with angles and many sides** \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(0.5, 0.5)
        .withSnapStep(0.25, 0.25)
        .withTickStep(0.5, 0.5)
        .withXRange(-1, 6)
        .withYRange(-1, 6)
        .withPolygon("grid", {
            match: "congruent",
            numSides: 9,
            showSides: true,
            showAngles: true,
        })
        .build();

export const polygonWithAnglesAndFourSidesQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Polygon with angles and four sides** \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(0.5, 0.5)
        .withSnapStep(0.25, 0.25)
        .withTickStep(0.5, 0.5)
        .withXRange(-1, 6)
        .withYRange(-1, 6)
        .withPolygon("grid", {
            match: "congruent",
            numSides: 4,
            showSides: true,
            showAngles: true,
        })
        .build();

export const polygonWithFourSidesSnappingQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Example of snapping to sides** \n[[\u2603 interactive-graph 1]] \n",
        )
        .withGridStep(0.5, 0.5)
        .withSnapStep(0.25, 0.25)
        .withTickStep(0.5, 0.5)
        .withXRange(-1, 6)
        .withYRange(-1, 6)
        .withPolygon("sides", {
            match: "congruent",
            numSides: 4,
            showSides: true,
            showAngles: false,
        })
        .build();

export const polygonWithUnlimitedSidesQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Example of unlimited polygon sides** \n[[\u2603 interactive-graph 1]] \n",
        )
        .withPolygon("grid", {
            showAngles: true,
            showSides: true,
            numSides: "unlimited",
            coords: [
                [0, 0],
                [-2.5, 0],
                [-1, 0],
            ],
        })
        .build();

export const polygonQuestionDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withPolygon("grid").build();

export const rayQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withContent(
        "**Move the ray so it has an endpoint at point $\\text{B}$ and goes through point $\\text{A}$. Then complete the statement below.**\n\n[[☃ interactive-graph 1]]",
    )
    .withMarkings("none")
    .addLockedPointAt(5, 3)
    .addLockedPointAt(-5, -5)
    .withRay({
        coords: [
            [5, 3],
            [-5, -5],
        ],
    })
    .build();

export const rayQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withRay().build();

export const segmentQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "Line segment $\\overline{OG}$ is rotated $180^\\circ$ about the point $(-2,4)$.  \n\n**Draw the image of this rotation using the interactive graph.**\n\n*The direction of a rotation by a positive angle is counter-clockwise.* \n\n[[☃ interactive-graph 1]]\n\n",
        )
        .addLockedPointAt(-2, 4, {color: "green"})
        .addLockedLine([-6, 3], [3, 1], {kind: "segment", color: "blue"})
        .withSegments({
            coords: [
                [
                    [-7, 7],
                    [2, 5],
                ],
            ],
        })
        .build();

export const segmentQuestionDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withSegments({
            coords: [
                [
                    [-5, 5],
                    [5, 5],
                ],
            ],
        })
        .build();

export const segmentWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withSegments({
            startCoords: [
                [
                    [0, 0],
                    [2, 2],
                ],
            ],
        })
        .build();

export const segmentsWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withSegments({
            startCoords: [
                [
                    [0, 0],
                    [2, 2],
                ],
                [
                    [0, 2],
                    [2, 0],
                ],
            ],
        })
        .build();

export const linearWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withLinear({
            startCoords: [
                [3, 0],
                [3, 3],
            ],
        })
        .build();

export const linearSystemWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withLinearSystem({
            startCoords: [
                [
                    [-3, 0],
                    [-3, 3],
                ],
                [
                    [3, 0],
                    [3, 3],
                ],
            ],
        })
        .build();

export const rayWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withRay({
            startCoords: [
                [3, 0],
                [3, 3],
            ],
        })
        .build();

export const circleWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withCircle({startCoords: {center: [9, 9], radius: 5}})
        .build();

export const quadraticWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withQuadratic({
            startCoords: [
                [-1, -1],
                [0, 0],
                [1, -1],
            ],
        })
        .build();

export const sinusoidWithStartingCoordsAndPiTicksQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withXRange(-5 * Math.PI, 5 * Math.PI)
        .withTickStep(Math.PI, 1)
        .withGridStep(Math.PI / 2, 1)
        .withSnapStep(Math.PI / 4, 1)
        .withSinusoid({
            startCoords: [
                [0, 0],
                [3 * Math.PI, -3],
            ],
        })
        .build();

export const segmentWithLockedPointsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPointAt(-7, -7, {filled: true})
        .addLockedPointAt(2, -5, {filled: false})
        .withSegments()
        .build();

export const segmentWithLockedPointsWithColorQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPointAt(-7, -7, {color: "green"})
        .addLockedPointAt(2, -5, {color: "green"})
        .withSegments()
        .build();

export const segmentWithLockedLineQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedLine([-7, -7], [2, -5], {
            kind: "line",
            color: "green",
            filled: [true, false],
            showPoint1: true,
            showPoint2: true,
        })
        .addLockedLine([-7, -6], [2, -4], {
            kind: "segment",
            color: "grayH",
            filled: [false, true],
            showPoint1: true,
            showPoint2: true,
        })
        .addLockedLine([-7, -8], [2, -6], {
            kind: "ray",
            color: "pink",
            filled: [false, true],
            showPoint1: true,
            showPoint2: true,
        })
        .withSegments()
        .build();

export const sinusoidQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withContent(
            "**Graph $h(x)=3\\sin(2x-\\pi)+2$ in the interactive widget.**  \n*Note that one moveable point always defines an extremum point in the graph and the other point always defines a neighbouring intersection with the midline.*\n\n[[☃ interactive-graph 1]]",
        )
        .withBackgroundImage(
            // Tick labels using increments of pi on the x axis.
            "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
            425,
            425,
            {
                scale: 1,
                bottom: 0,
                left: 0,
            },
        )
        .withMarkings("none")
        .withSinusoid({
            coords: [
                [1, 2],
                [1.5, 5],
            ],
        })
        .build();

export const sinusoidMinimalQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder().withSinusoid().build();

export const noneQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withContent("This graph isn't interactive.\n\n[[☃ interactive-graph 1]]")
    .withNoInteractiveFigure()
    .addLockedFunction("5*sin(x)+x^3/20-ln(abs(x))", {color: "green"})
    .addLockedEllipse([-5, 5], [2, 2], {color: "red", fillStyle: "translucent"})
    .addLockedEllipse([5, -5], [2, 2], {color: "red", fillStyle: "translucent"})
    .build();

export const sinusoidQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withSinusoid().build();

export const questionsAndAnswers: ReadonlyArray<
    [
        PerseusRenderer, // Correct answer
        ReadonlyArray<Coord>, // Incorrect answer
        ReadonlyArray<Coord>,
    ]
> = [
    [
        // question
        polygonQuestion,
        // correct answer
        [
            [5.5, 2],
            [1.5, 5],
            [1.5, 2],
        ],
        // incorrect answer
        [
            [5.0, 2],
            [1.5, 5],
            [1.5, 2],
        ],
    ],
    [
        // question
        interactiveGraphQuestionBuilder()
            .withContent(
                "**Plot the image of triangle $\\triangle ABC$ under a reflection across line $\\ell$.**\n\n[[\u2603 interactive-graph 1]]",
            )
            .withBackgroundImage(
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1aa858afa68530210704235a0134a165b4b66d43",
                400,
                400,
            )
            .withMarkings("none")
            .withSnapStep(1, 1)
            .withGridStep(1, 1)
            .withTickStep(1, 1)
            .withXRange(-8, 8)
            .withYRange(-8, 8)
            .withPolygon("grid", {
                coords: [
                    [-6, -7],
                    [1, -4],
                    [-3, -4],
                ],
            })
            .build(),
        // correct answer
        [
            [-6, -7],
            [1, -4],
            [-3, -4],
        ],
        // incorrect answer
        [
            [-8, -7],
            [1, -4],
            [-3, -4],
        ],
    ],
    [
        // question
        pointQuestion,
        // correct answer
        [
            [0, 0],
            [-2.5, 0],
            [-1, 0],
        ],
        // incorrect answer
        [
            [3, 0],
            [-2.5, 0],
            [-1, 0],
        ],
    ],
    [
        // question
        interactiveGraphQuestionBuilder()
            .withContent(
                "The graph below contains quadrilateral $TREK$ and the point $P(-8,-6)$.  \n  \n**Draw the image of quadrilateral $TREK$ under a dilation whose center is $P$ and scale factor is $3$.**  \n  \n[[\u2603 interactive-graph 1]]",
            )
            .withBackgroundImage(
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/a1b7a05c177742523250b64a3995c9b37aac3399",
                425,
                425,
                {
                    scale: 1,
                    bottom: 0,
                    left: 0,
                },
            )
            .withMarkings("none")
            .withSnapStep(1, 1)
            .withGridStep(1, 1)
            .withTickStep(2, 2)
            .withXRange(-12, 12)
            .withYRange(-8, 16)
            .withPolygon("grid", {
                numSides: "unlimited",
                coords: [
                    [-5, 0],
                    [4, 15],
                    [4, 0],
                    [1, 3],
                ],
            })
            .build(),
        // correct answer
        [
            [-5, 0],
            [4, 15],
            [4, 0],
            [1, 3],
        ],
        // incorrect answer
        [
            [-5, 0],
            [0, 15],
            [4, 0],
            [1, 3],
        ],
    ],
];

export const segmentWithAllLockedLineSegmentVariations: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedLine([-7, -5], [2, -3], {
            kind: "segment",
            color: "green",
            filled: [true, false],
            showPoint1: true,
            showPoint2: true,
            lineStyle: "solid",
        })
        .addLockedLine([-7, -6], [2, -4], {
            kind: "segment",
            color: "grayH",
            filled: [true, false],
            showPoint1: true,
            showPoint2: false,
            lineStyle: "dashed",
        })
        .addLockedLine([-7, -7], [2, -5], {
            kind: "segment",
            color: "pink",
            filled: [true, false],
            showPoint1: false,
            showPoint2: false,
            lineStyle: "solid",
        })
        .build();

export const segmentWithAllLockedLineVariations: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedLine([-7, -5], [2, -3], {
            kind: "line",
            color: "green",
            filled: [true, false],
            showPoint1: true,
            showPoint2: true,
            lineStyle: "solid",
        })
        .addLockedLine([-7, -6], [2, -4], {
            kind: "line",
            color: "grayH",
            filled: [true, false],
            showPoint1: true,
            showPoint2: false,
            lineStyle: "dashed",
        })
        .addLockedLine([-7, -7], [2, -5], {
            kind: "line",
            color: "pink",
            filled: [true, false],
            showPoint1: false,
            showPoint2: false,
            lineStyle: "solid",
        })
        .build();

export const segmentWithAllLockedRayVariations: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedLine([-7, -5], [2, -3], {
            kind: "ray",
            color: "green",
            filled: [true, false],
            showPoint1: true,
            showPoint2: true,
            lineStyle: "solid",
        })
        .addLockedLine([-7, -6], [2, -4], {
            kind: "ray",
            color: "grayH",
            filled: [true, false],
            showPoint1: true,
            showPoint2: false,
            lineStyle: "dashed",
        })
        .addLockedLine([-7, -7], [2, -5], {
            kind: "ray",
            color: "pink",
            filled: [true, false],
            showPoint1: false,
            showPoint2: false,
            lineStyle: "solid",
        })
        .build();

export const segmentWithLockedVectors: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedVector([0, 0], [2, 2])
        .addLockedVector([2, 2], [-2, 4], {color: "green"})
        .build();

export const segmentWithLockedEllipses: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedEllipse([0, 0], [5, 5])
        .addLockedEllipse([-5, 5], [2, 3], {
            angle: (3 * Math.PI) / 4,
            color: "green",
            fillStyle: "solid",
            strokeStyle: "solid",
        })
        .addLockedEllipse([5, 5], [2, 3], {
            angle: Math.PI / 4,
            color: "green",
            fillStyle: "translucent",
            strokeStyle: "dashed",
        })
        .build();

export const segmentWithLockedEllipseWhite: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedEllipse([0, 0], [5, 5], {
            color: "green",
            fillStyle: "white",
        })
        .addLockedEllipse([-5, 5], [2, 3], {
            color: "pink",
            fillStyle: "translucent",
        })
        .build();

export const segmentWithLockedPolygons: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPolygon([
            [-3, 4],
            [-5, 1],
            [-1, 1],
        ])
        .addLockedPolygon(
            [
                [1, 4],
                [4, 4],
                [4, 1],
                [1, 1],
            ],
            {
                color: "green",
                showVertices: true,
                fillStyle: "translucent",
                strokeStyle: "dashed",
            },
        )
        .addLockedPolygon(
            [
                [0, -1],
                [-2, -3],
                [-1, -5],
                [1, -5],
                [2, -3],
            ],
            {
                color: "purple",
                showVertices: false,
                fillStyle: "solid",
                strokeStyle: "solid",
            },
        )
        .build();

export const segmentWithLockedPolygonWhite: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPolygon(
            [
                [0, 3],
                [-3, 0],
                [3, 0],
            ],
            {
                color: "green",
                fillStyle: "white",
            },
        )
        .addLockedPolygon(
            [
                [-5, 0],
                [-3, -1],
                [3, -1],
            ],
            {
                color: "pink",
                fillStyle: "translucent",
            },
        )
        .build();

export const segmentWithLockedFunction = (
    equation: string = "x^2",
    options?: LockedFunctionOptions,
): PerseusRenderer => {
    return interactiveGraphQuestionBuilder()
        .addLockedFunction(equation, options)
        .build();
};

export const segmentWithLockedFunctionAndAsymmetricRange = (
    equation: string = "x^2",
    options?: LockedFunctionOptions,
): PerseusRenderer => {
    return interactiveGraphQuestionBuilder()
        .withXRange(-5, 5)
        .withYRange(-10, 10)
        .addLockedFunction(equation, options)
        .build();
};

export const segmentWithLockedLabels: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedLabel("small $\\frac{1}{2}$", [-6, 2], {
            color: "pink",
            size: "small",
        })
        .addLockedLabel("medium $E_0 = mc^2$", [1, 2], {
            color: "blue",
            size: "medium",
        })
        .addLockedLabel("large $\\sqrt{2a}$", [-3, -2], {
            color: "green",
            size: "large",
        })
        .build();

export const segmentWithLockedFigures: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPointAt(-7, -7, {labels: [{text: "A"}], ariaLabel: "Point A"})
        .addLockedLine([-7, -5], [2, -3], {
            showPoint1: true,
            showPoint2: true,
            labels: [{text: "B"}],
            ariaLabel: "Line B",
        })
        .addLockedVector([0, 0], [8, 2], {
            color: "purple",
            labels: [{text: "C"}],
            ariaLabel: "Vector C",
        })
        .addLockedEllipse([0, 5], [4, 2], {
            angle: Math.PI / 4,
            color: "blue",
            labels: [{text: "D"}],
            ariaLabel: "Ellipse D",
        })
        .addLockedPolygon(
            [
                [-9, 4],
                [-6, 4],
                [-6, 1],
                [-9, 1],
            ],
            {color: "pink", labels: [{text: "E"}], ariaLabel: "Polygon E"},
        )
        .addLockedFunction("sin(x)", {
            color: "red",
            labels: [{text: "F"}],
            ariaLabel: "Function F",
        })
        .addLockedLabel("$\\sqrt{\\frac{1}{2}}$", [6, -5])
        .build();

export const quadraticQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder().withQuadratic().build();

export const quadraticQuestionWithDefaultCorrect: PerseusRenderer =
    interactiveGraphQuestionBuilder().withQuadratic().build();

export const staticGraphQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPointAt(-7, -7)
        .addLockedLine([-7, -5], [2, -3])
        .addLockedVector([0, 0], [8, 2], {color: "purple"})
        .addLockedEllipse([0, 5], [4, 2], {angle: Math.PI / 4, color: "blue"})
        .addLockedPolygon(
            [
                [-9, 4],
                [-6, 4],
                [-6, 1],
                [-9, 1],
            ],
            {color: "pink"},
        )
        .withStaticMode(true)
        .build();

export const staticGraphQuestionWithAnotherWidget: () => PerseusRenderer =
    () => {
        const result = interactiveGraphQuestionBuilder()
            .addLockedPointAt(-7, -7)
            .addLockedLine([-7, -5], [2, -3])
            .addLockedVector([0, 0], [8, 2], {color: "purple"})
            .addLockedEllipse([0, 5], [4, 2], {
                angle: Math.PI / 4,
                color: "blue",
            })
            .addLockedPolygon(
                [
                    [-9, 4],
                    [-6, 4],
                    [-6, 1],
                    [-9, 1],
                ],
                {color: "pink"},
            )
            .withStaticMode(true)
            .build();
        result["widgets"] = {
            ...result["widgets"],
            "radio 1": {
                graded: true,
                version: {
                    major: 1,
                    minor: 0,
                },
                static: false,
                type: "radio",
                options: {
                    displayCount: null,
                    choices: [
                        {
                            content: "$-8$ and $8$",
                            correct: false,
                            clue: "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                        },
                        {
                            content: "$-8$",
                            correct: false,
                            clue: "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                        },
                        {
                            content: "The right answer !!!\n\n",
                            correct: true,
                            isNoneOfTheAbove: false,
                            clue: "$8$ is the positive square root of $64$.",
                        },
                        {
                            content: "No value of $x$ satisfies the equation.",
                            correct: false,
                            isNoneOfTheAbove: false,
                            clue: "$8$ satisfies the equation.",
                        },
                    ],
                    countChoices: false,
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    randomize: false,
                    deselectEnabled: false,
                },
                alignment: "default",
            } as RadioWidget,
        };
        result["content"] = "[[\u2603 radio 1]]\n\n" + result["content"];
        return result;
    };

export const interactiveGraphWithAriaLabel: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withNoInteractiveFigure()
        .withFullGraphAriaLabel("Segment Graph Title")
        .withFullGraphAriaDescription(
            "There is a segment on the graph that runs from five units left and five units up to five units right and five units up.",
        )
        .build();

export const graphWithLabeledPoint: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPointAt(0, 0, {
            labels: [{text: "A"}],
        })
        .build();

export const graphWithLabeledLine: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedLine([-7, -5], [2, -3], {
            labels: [{text: "B"}],
        })
        .build();

export const graphWithLabeledVector: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedVector([0, 0], [8, 2], {
            labels: [{text: "C"}],
        })
        .build();

export const graphWithLabeledEllipse: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedEllipse([0, 0], [4, 2], {
            labels: [{text: "D"}],
        })
        .build();

export const graphWithLabeledPolygon: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedPolygon(
            [
                [0, 0],
                [4, 0],
                [2, 4],
            ],
            {
                labels: [{text: "E"}],
            },
        )
        .build();

export const graphWithLabeledFunction: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .addLockedFunction("sin(x)", {
            labels: [{text: "F"}],
        })
        .build();

export const sinusoidWithPiTicks: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withXRange(-6 * Math.PI, 6 * Math.PI)
        .withYRange(-10 * Math.PI, 10 * Math.PI)
        .withTickStep(Math.PI, 2 * Math.PI)
        .withGridStep(Math.PI, 2 * Math.PI)
        .withSnapStep(Math.PI / 2, Math.PI)
        .withSinusoid()
        .build();
