import {
    generateInteractiveGraphQuestion,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLinearGraph,
    generateIGLinearSystemGraph,
    generateIGNoneGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
    generateIGQuadraticGraph,
    generateIGRayGraph,
    generateIGSegmentGraph,
    generateIGSinusoidGraph,
    generateIGExponentialGraph,
    generateIGLogarithmGraph,
    generateIGTangentGraph,
    generateIGVectorGraph,
    generateIGAbsoluteValueGraph,
    generateIGLockedPoint,
    generateIGLockedLine,
    generateIGLockedVector,
    generateIGLockedEllipse,
    generateIGLockedPolygon,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateRadioWidget,
    type PerseusRenderer,
    type LockedFunctionType,
} from "@khanacademy/perseus-core";

import type {Coord} from "../../interactive2/types";

// Data for the Interactive Graph widget

export const angleQuestion: PerseusRenderer = generateInteractiveGraphQuestion({
    content:
        "**Drag the vertex of the angle to place the vertex at point $\\text{A}$.**  \n\n**Drag another point on the angle to make one of the rays go through point $\\text{B}$.**\n\n**Make the other ray go through one of the unlabeled black points to create an acute angle.**  \n*The arc symbol near the vertex indicates the angle being measured.*\n\n[[☃ interactive-graph 1]]",
    backgroundImage: {
        url: "https://ka-perseus-graphie.s3.amazonaws.com/807ea77cf7031c1b9a45694083f05b5e09b01946.png",
        height: 400,
        width: 400,
        bottom: 0,
        left: 0,
        scale: 1,
    },
    markings: "none",
    correct: generateIGAngleGraph({
        allowReflexAngles: false,
        angleOffsetDeg: 1,
        coords: [
            [2.2059851900220853, 2.2059851900220853],
            [-2, -2],
            [-4.973144353700384, 5.004289159600586],
        ],
        snapDegrees: 4,
    }),
});

export const angleQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGAngleGraph(),
    });

export const circleQuestion: PerseusRenderer = generateInteractiveGraphQuestion(
    {
        correct: generateIGCircleGraph({center: [-2, -4], radius: 2}),
    },
);

export const circleQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGCircleGraph({center: [0, 0], radius: 2}),
    });

export const linearQuestion: PerseusRenderer = generateInteractiveGraphQuestion(
    {
        correct: generateIGLinearGraph({
            coords: [
                [-1, 1],
                [0, -2],
            ],
        }),
    },
);

export const linearQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGLinearGraph(),
    });

export const linearSystemQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGLinearSystemGraph({
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
        }),
    });

export const linearSystemQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGLinearSystemGraph(),
    });

export const pointQuestion: PerseusRenderer = generateInteractiveGraphQuestion({
    content:
        "We want to find the zeros of this polynomial:\n\n$p(x)=x(2x+5)(x+1)$\n\n**Plot all the zeros ($x$-intercepts) of the polynomial in the interactive graph.**\n\n[[☃ interactive-graph 1]]",
    backgroundImage: {
        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/9e825947f778170369f22da5f87239cbf4c1ebe3",
        height: 425,
        width: 425,
    },
    markings: "none",
    gridStep: [0.5, 0.5],
    snapStep: [0.5, 0.5],
    step: [1, 1],
    range: [
        [-4, 4],
        [-4, 4],
    ],
    correct: generateIGPointGraph({
        numPoints: "unlimited",
        coords: [
            [0, 0],
            [-2.5, 0],
            [-1, 0],
        ],
    }),
});

export const floatingPointIssueQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGPointGraph({numPoints: 5}),
        showTooltips: true,
        range: [
            [0, 5],
            [0, 3],
        ],
        step: [1, 0.5],
        gridStep: [1, 0.1],
        snapStep: [0.5, 0.1],
    });

export const pointQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGPointGraph({numPoints: 1}),
    });

export const finitePointQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "Vector $\\vec v$ is graphed in the interactive graph below.\n\n**Assuming $3\\vec v$ starts at the origin, plot its endpoint.**\n\n[[☃ interactive-graph 1]]",
        backgroundImage: {
            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/d6983eff3063dac5815cc4d48c565cddba819765",
            height: 400,
            width: 400,
        },
        markings: "none",
        gridStep: [1, 1],
        snapStep: [1, 1],
        step: [1, 1],
        range: [
            [-8, 8],
            [-8, 8],
        ],
        correct: generateIGPointGraph({
            numPoints: 1,
            coords: [[0, 0]],
        }),
    });

export const unlimitedPointQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGPointGraph({numPoints: "unlimited"}),
    });

export const polygonQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Sides shown** Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[☃ interactive-graph 1]] \n",
        gridStep: [0.5, 0.5],
        snapStep: [0.25, 0.25],
        step: [0.5, 0.5],
        markings: "none",
        range: [
            [-1, 6],
            [-1, 6],
        ],
        correct: generateIGPolygonGraph({
            snapTo: "grid",
            match: "congruent",
            numSides: 3,
            showSides: true,
            coords: [
                [3.5, 2],
                [3.5, 5],
                [-0.5, 2],
            ],
        }),
    });

export const unlimitedPolygonQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Sides shown** Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[☃ interactive-graph 1]] \n",
        gridStep: [1, 1],
        snapStep: [0.25, 0.25],
        step: [1, 1],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        correct: generateIGPolygonGraph({
            snapTo: "grid",
            match: "congruent",
            numSides: "unlimited",
            showSides: true,
            showAngles: true,
            coords: [],
        }),
    });

export const polygonQuestionDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGPolygonGraph({snapTo: "grid"}),
    });

export const rayQuestion: PerseusRenderer = generateInteractiveGraphQuestion({
    content:
        "**Move the ray so it has an endpoint at point $\\text{B}$ and goes through point $\\text{A}$. Then complete the statement below.**\n\n[[☃ interactive-graph 1]]",
    markings: "none",
    lockedFigures: [
        generateIGLockedPoint({coord: [5, 3]}),
        generateIGLockedPoint({coord: [-5, -5]}),
    ],
    correct: generateIGRayGraph({
        coords: [
            [5, 3],
            [-5, -5],
        ],
    }),
});

export const rayQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGRayGraph(),
    });

export const vectorQuestion: PerseusRenderer = generateInteractiveGraphQuestion(
    {
        correct: generateIGVectorGraph({
            coords: [
                [0, 0],
                [3, 4],
            ],
        }),
    },
);

export const segmentQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "Line segment $\\overline{OG}$ is rotated $180^\\circ$ about the point $(-2,4)$.  \n\n**Draw the image of this rotation using the interactive graph.**\n\n*The direction of a rotation by a positive angle is counter-clockwise.* \n\n[[☃ interactive-graph 1]]\n\n",
        lockedFigures: [
            generateIGLockedPoint({coord: [-2, 4], color: "green"}),
            generateIGLockedLine({
                kind: "segment",
                color: "blue",
                points: [
                    generateIGLockedPoint({coord: [-6, 3], color: "blue"}),
                    generateIGLockedPoint({coord: [3, 1], color: "blue"}),
                ],
            }),
        ],
        correct: generateIGSegmentGraph({
            numSegments: 1,
            coords: [
                [
                    [-7, 7],
                    [2, 5],
                ],
            ],
        }),
    });

export const segmentQuestionDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph({
            coords: [
                [
                    [-5, 5],
                    [5, 5],
                ],
            ],
        }),
    });

export const segmentWithLockedPointsQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPoint({coord: [-7, -7], filled: true}),
            generateIGLockedPoint({coord: [2, -5], filled: false}),
        ],
    });

export const segmentWithLockedPointsWithColorQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPoint({coord: [-7, -7], color: "green"}),
            generateIGLockedPoint({coord: [2, -5], color: "green"}),
        ],
    });

export const segmentWithLockedLineQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedLine({
                kind: "line",
                color: "green",
                showPoint1: true,
                showPoint2: true,
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -7],
                        color: "green",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -5],
                        color: "green",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "segment",
                color: "grayH",
                showPoint1: true,
                showPoint2: true,
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -6],
                        color: "grayH",
                        filled: false,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -4],
                        color: "grayH",
                        filled: true,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "ray",
                color: "pink",
                showPoint1: true,
                showPoint2: true,
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -8],
                        color: "pink",
                        filled: false,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -6],
                        color: "pink",
                        filled: true,
                    }),
                ],
            }),
        ],
    });

export const sinusoidQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Graph $h(x)=3\\sin(2x-\\pi)+2$ in the interactive widget.**  \n*Note that one moveable point always defines an extremum point in the graph and the other point always defines a neighbouring intersection with the midline.*\n\n[[☃ interactive-graph 1]]",
        backgroundImage: {
            // Tick labels using increments of pi on the x axis.
            url: "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
            height: 425,
            width: 425,
            scale: 1,
            bottom: 0,
            left: 0,
        },
        markings: "none",
        correct: generateIGSinusoidGraph({
            coords: [
                [1, 2],
                [1.5, 5],
            ],
        }),
    });

export const noneQuestion: PerseusRenderer = generateInteractiveGraphQuestion({
    content: "This graph isn't interactive.\n\n[[☃ interactive-graph 1]]",
    correct: generateIGNoneGraph(),
    lockedFigures: [
        generateIGLockedFunction({
            equation: "5*sin(x)+x^3/20-ln(abs(x))",
            color: "green",
        }),
        generateIGLockedEllipse({
            center: [-5, 5],
            radius: [2, 2],
            color: "red",
            fillStyle: "translucent",
        }),
        generateIGLockedEllipse({
            center: [5, -5],
            radius: [2, 2],
            color: "red",
            fillStyle: "translucent",
        }),
    ],
});

export const sinusoidQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSinusoidGraph(),
    });

export const exponentialQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Graph $f(x) = -2 \\cdot 3^x + 5$ in the interactive widget.**\n\n[[☃ interactive-graph 1]]",
        correct: generateIGExponentialGraph({
            coords: [
                [0, 3],
                [1, -1],
            ],
            asymptote: 5,
        }),
    });

export const tangentQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Graph $f(x)=2\\tan(x)$ in the interactive widget.**\n\n[[☃ interactive-graph 1]]",
        correct: generateIGTangentGraph({
            coords: [
                [1, 2],
                [1.5, 4],
            ],
        }),
    });

export const tangentQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGTangentGraph(),
    });

export const absoluteValueQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Graph $f(x)=|x|$ in the interactive widget.**\n\n[[☃ interactive-graph 1]]",
        correct: generateIGAbsoluteValueGraph({
            coords: [
                [0, 0],
                [2, 2],
            ],
        }),
    });

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
        generateInteractiveGraphQuestion({
            content:
                "**Plot the image of triangle $\\triangle ABC$ under a reflection across line $\\ell$.**\n\n[[☃ interactive-graph 1]]",
            backgroundImage: {
                url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1aa858afa68530210704235a0134a165b4b66d43",
                height: 400,
                width: 400,
            },
            markings: "none",
            snapStep: [1, 1],
            gridStep: [1, 1],
            step: [1, 1],
            range: [
                [-8, 8],
                [-8, 8],
            ],
            correct: generateIGPolygonGraph({
                snapTo: "grid",
                coords: [
                    [-6, -7],
                    [1, -4],
                    [-3, -4],
                ],
            }),
        }),
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
        generateInteractiveGraphQuestion({
            content:
                "The graph below contains quadrilateral $TREK$ and the point $P(-8,-6)$.  \n  \n**Draw the image of quadrilateral $TREK$ under a dilation whose center is $P$ and scale factor is $3$.**  \n  \n[[☃ interactive-graph 1]]",
            backgroundImage: {
                url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/a1b7a05c177742523250b64a3995c9b37aac3399",
                height: 425,
                width: 425,
                scale: 1,
                bottom: 0,
                left: 0,
            },
            markings: "none",
            snapStep: [1, 1],
            gridStep: [1, 1],
            step: [2, 2],
            range: [
                [-12, 12],
                [-8, 16],
            ],
            correct: generateIGPolygonGraph({
                snapTo: "grid",
                numSides: "unlimited",
                coords: [
                    [-5, 0],
                    [4, 15],
                    [4, 0],
                    [1, 3],
                ],
            }),
        }),
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
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedLine({
                kind: "segment",
                color: "green",
                showPoint1: true,
                showPoint2: true,
                lineStyle: "solid",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -5],
                        color: "green",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -3],
                        color: "green",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "segment",
                color: "grayH",
                showPoint1: true,
                showPoint2: false,
                lineStyle: "dashed",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -6],
                        color: "grayH",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -4],
                        color: "grayH",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "segment",
                color: "pink",
                showPoint1: false,
                showPoint2: false,
                lineStyle: "solid",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -7],
                        color: "pink",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -5],
                        color: "pink",
                        filled: false,
                    }),
                ],
            }),
        ],
    });

export const segmentWithAllLockedLineVariations: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedLine({
                kind: "line",
                color: "green",
                showPoint1: true,
                showPoint2: true,
                lineStyle: "solid",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -5],
                        color: "green",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -3],
                        color: "green",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "line",
                color: "grayH",
                showPoint1: true,
                showPoint2: false,
                lineStyle: "dashed",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -6],
                        color: "grayH",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -4],
                        color: "grayH",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "line",
                color: "pink",
                showPoint1: false,
                showPoint2: false,
                lineStyle: "solid",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -7],
                        color: "pink",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -5],
                        color: "pink",
                        filled: false,
                    }),
                ],
            }),
        ],
    });

export const segmentWithAllLockedRayVariations: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedLine({
                kind: "ray",
                color: "green",
                showPoint1: true,
                showPoint2: true,
                lineStyle: "solid",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -5],
                        color: "green",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -3],
                        color: "green",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "ray",
                color: "grayH",
                showPoint1: true,
                showPoint2: false,
                lineStyle: "dashed",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -6],
                        color: "grayH",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -4],
                        color: "grayH",
                        filled: false,
                    }),
                ],
            }),
            generateIGLockedLine({
                kind: "ray",
                color: "pink",
                showPoint1: false,
                showPoint2: false,
                lineStyle: "solid",
                points: [
                    generateIGLockedPoint({
                        coord: [-7, -7],
                        color: "pink",
                        filled: true,
                    }),
                    generateIGLockedPoint({
                        coord: [2, -5],
                        color: "pink",
                        filled: false,
                    }),
                ],
            }),
        ],
    });

export const segmentWithLockedVectors: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedVector({
                points: [
                    [0, 0],
                    [2, 2],
                ],
            }),
            generateIGLockedVector({
                points: [
                    [2, 2],
                    [-2, 4],
                ],
                color: "green",
            }),
        ],
    });

export const segmentWithLockedEllipses: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedEllipse({center: [0, 0], radius: [5, 5]}),
            generateIGLockedEllipse({
                center: [-5, 5],
                radius: [2, 3],
                angle: (3 * Math.PI) / 4,
                color: "green",
                fillStyle: "solid",
                strokeStyle: "solid",
            }),
            generateIGLockedEllipse({
                center: [5, 5],
                radius: [2, 3],
                angle: Math.PI / 4,
                color: "green",
                fillStyle: "translucent",
                strokeStyle: "dashed",
            }),
        ],
    });

export const segmentWithLockedEllipseWhite: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedEllipse({
                center: [0, 0],
                radius: [5, 5],
                color: "green",
                fillStyle: "white",
            }),
            generateIGLockedEllipse({
                center: [-5, 5],
                radius: [2, 3],
                color: "pink",
                fillStyle: "translucent",
            }),
        ],
    });

export const segmentWithLockedPolygons: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPolygon({
                points: [
                    [-3, 4],
                    [-5, 1],
                    [-1, 1],
                ],
            }),
            generateIGLockedPolygon({
                points: [
                    [1, 4],
                    [4, 4],
                    [4, 1],
                    [1, 1],
                ],
                color: "green",
                showVertices: true,
                fillStyle: "translucent",
                strokeStyle: "dashed",
            }),
            generateIGLockedPolygon({
                points: [
                    [0, -1],
                    [-2, -3],
                    [-1, -5],
                    [1, -5],
                    [2, -3],
                ],
                color: "purple",
                showVertices: false,
                fillStyle: "solid",
                strokeStyle: "solid",
            }),
        ],
    });

export const segmentWithLockedPolygonWhite: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPolygon({
                points: [
                    [0, 3],
                    [-3, 0],
                    [3, 0],
                ],
                color: "green",
                fillStyle: "white",
            }),
            generateIGLockedPolygon({
                points: [
                    [-5, 0],
                    [-3, -1],
                    [3, -1],
                ],
                color: "pink",
                fillStyle: "translucent",
            }),
        ],
    });

export const segmentWithLockedFunction = (
    equation: string = "x^2",
    options?: Partial<Omit<LockedFunctionType, "type">>,
): PerseusRenderer => {
    return generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [generateIGLockedFunction({equation, ...options})],
    });
};

export const segmentWithLockedFunctionAndAsymmetricRange = (
    equation: string = "x^2",
    options?: Partial<Omit<LockedFunctionType, "type">>,
): PerseusRenderer => {
    return generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        range: [
            [-5, 5],
            [-10, 10],
        ],
        lockedFigures: [generateIGLockedFunction({equation, ...options})],
    });
};

export const segmentWithLockedLabels: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedLabel({
                text: "small $\\frac{1}{2}$",
                coord: [-6, 2],
                color: "pink",
                size: "small",
            }),
            generateIGLockedLabel({
                text: "medium $E_0 = mc^2$",
                coord: [1, 2],
                color: "blue",
                size: "medium",
            }),
            generateIGLockedLabel({
                text: "large $\\sqrt{2a}$",
                coord: [-3, -2],
                color: "green",
                size: "large",
            }),
        ],
    });

export const quadraticQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGQuadraticGraph({
            coords: [
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        }),
    });

export const quadraticQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGQuadraticGraph(),
    });

export const staticGraphQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        isStatic: true,
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPoint({coord: [-7, -7]}),
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [-7, -5]}),
                    generateIGLockedPoint({coord: [2, -3]}),
                ],
            }),
            generateIGLockedVector({
                points: [
                    [0, 0],
                    [8, 2],
                ],
                color: "purple",
            }),
            generateIGLockedEllipse({
                center: [0, 5],
                radius: [4, 2],
                angle: Math.PI / 4,
                color: "blue",
            }),
            generateIGLockedPolygon({
                points: [
                    [-9, 4],
                    [-6, 4],
                    [-6, 1],
                    [-9, 1],
                ],
                color: "pink",
            }),
        ],
    });

export const staticGraphQuestionWithAnotherWidget: () => PerseusRenderer =
    () => {
        const igQuestion = generateInteractiveGraphQuestion({
            isStatic: true,
            correct: generateIGSegmentGraph(),
            lockedFigures: [
                generateIGLockedPoint({coord: [-7, -7]}),
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [-7, -5]}),
                        generateIGLockedPoint({coord: [2, -3]}),
                    ],
                }),
                generateIGLockedVector({
                    points: [
                        [0, 0],
                        [8, 2],
                    ],
                    color: "purple",
                }),
                generateIGLockedEllipse({
                    center: [0, 5],
                    radius: [4, 2],
                    angle: Math.PI / 4,
                    color: "blue",
                }),
                generateIGLockedPolygon({
                    points: [
                        [-9, 4],
                        [-6, 4],
                        [-6, 1],
                        [-9, 1],
                    ],
                    color: "pink",
                }),
            ],
        });
        return {
            ...igQuestion,
            content: "[[☃ radio 1]]\n\n" + igQuestion.content,
            widgets: {
                ...igQuestion.widgets,
                "radio 1": generateRadioWidget({
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "$-8$ and $8$",
                                correct: false,
                                rationale:
                                    "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "$-8$",
                                correct: false,
                                rationale:
                                    "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                            },
                            {
                                id: "2-2-2-2-2",
                                content: "The right answer !!!\n\n",
                                correct: true,
                                isNoneOfTheAbove: false,
                                rationale:
                                    "$8$ is the positive square root of $64$.",
                            },
                            {
                                id: "3-3-3-3-3",
                                content:
                                    "No value of $x$ satisfies the equation.",
                                correct: false,
                                isNoneOfTheAbove: false,
                                rationale: "$8$ satisfies the equation.",
                            },
                        ],
                    },
                }),
            },
        };
    };

export const interactiveGraphWithAriaLabel: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGNoneGraph(),
        fullGraphAriaLabel: "Segment Graph Title",
        fullGraphAriaDescription:
            "There is a segment on the graph that runs from five units left and five units up to five units right and five units up.",
    });

export const graphWithLabeledPoint: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPoint({
                coord: [0, 0],
                labels: [generateIGLockedLabel({text: "A", coord: [0.5, 0]})],
            }),
        ],
    });

export const graphWithLabeledLine: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedLine({
                points: [
                    generateIGLockedPoint({coord: [-7, -5]}),
                    generateIGLockedPoint({coord: [2, -3]}),
                ],
                labels: [generateIGLockedLabel({text: "B", coord: [-2.5, -4]})],
            }),
        ],
    });

export const graphWithLabeledVector: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedVector({
                points: [
                    [0, 0],
                    [8, 2],
                ],
                labels: [generateIGLockedLabel({text: "C", coord: [4, 1]})],
            }),
        ],
    });

export const graphWithLabeledEllipse: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedEllipse({
                center: [0, 0],
                radius: [4, 2],
                labels: [generateIGLockedLabel({text: "D", coord: [0, 0]})],
            }),
        ],
    });

export const graphWithLabeledPolygon: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedPolygon({
                points: [
                    [0, 0],
                    [4, 0],
                    [2, 4],
                ],
                labels: [generateIGLockedLabel({text: "E", coord: [0, 0]})],
            }),
        ],
    });

export const graphWithLabeledFunction: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGSegmentGraph(),
        lockedFigures: [
            generateIGLockedFunction({
                equation: "sin(x)",
                labels: [generateIGLockedLabel({text: "F", coord: [0, 0]})],
            }),
        ],
    });

export const logarithmQuestion: PerseusRenderer =
    generateInteractiveGraphQuestion({
        content:
            "**Graph $f(x) = \\log(x + 6)$ in the interactive widget.**\n\n[[☃ interactive-graph 1]]",
        correct: generateIGLogarithmGraph({
            coords: [
                [-4, -3],
                [-5, -7],
            ],
            asymptote: -6,
        }),
    });

export const logarithmQuestionWithDefaultCorrect: PerseusRenderer =
    generateInteractiveGraphQuestion({
        correct: generateIGLogarithmGraph(),
    });

export const sinusoidWithPiTicks: PerseusRenderer =
    generateInteractiveGraphQuestion({
        range: [
            [-6 * Math.PI, 6 * Math.PI],
            [-10 * Math.PI, 10 * Math.PI],
        ],
        step: [Math.PI, 2 * Math.PI],
        gridStep: [Math.PI, 2 * Math.PI],
        snapStep: [Math.PI / 2, Math.PI],
        correct: generateIGSinusoidGraph(),
    });
