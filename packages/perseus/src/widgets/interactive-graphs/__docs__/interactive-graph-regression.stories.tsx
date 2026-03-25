import {
    generateInteractiveGraphQuestion,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLockedEllipse,
    generateIGLockedFunction,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLockedVector,
    generateIGNoneGraph,
    generateIGSegmentGraph,
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import UserInputManager from "../../../user-input-manager";
import {sinusoidWithPiTicks} from "../interactive-graph.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof MafsQuestionRenderer>;

const meta: Meta<typeof MafsQuestionRenderer> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests",
    component: MafsQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
    decorators: (Story) => (
        // Add margin so we can look at individual story canvases for
        // graphs that have axis ticks off the graph.
        <View style={{marginInlineStart: 32}}>
            <Story />
        </View>
    ),
};
export default meta;

function MobileContainerDecorator(Story) {
    return (
        <div className="framework-perseus perseus-mobile">
            <Story />
        </div>
    );
}

export const MafsWithCustomAxisLabels: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            labels: ["\\text{Custom $x$ label}", "\\text{Custom $y$ label}"],
        }),
    },
};

export const MafsWithFractionalGridStep: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            gridStep: [2.571, 3.123],
        }),
    },
};

export const MafsWithFractionalAxisTicks: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            step: [1.5, 1.5],
        }),
    },
};

export const MafsWithAxesMarkings: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            markings: "axes",
        }),
    },
};

export const MafsWithGridMarkings: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            markings: "grid",
        }),
    },
};

export const MafsWithNoMarkings: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            markings: "none",
        }),
    },
};

export const MafsWithSmallRange: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-2, 2],
                [-2, 2],
            ],
        }),
    },
};

export const MafsWithLargeRange: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-50, 50],
                [-50, 50],
            ],
        }),
    },
};

export const MafsWithYAxisAtLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [0, 20],
                [-10, 10],
            ],
            lockedFigures: [
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [1, 1]}),
                        generateIGLockedPoint({coord: [5, 2]}),
                    ],
                }),
            ],
        }),
    },
};

export const MafsWithYAxisNearLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-1, 20],
                [-10, 10],
            ],
            lockedFigures: [
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [1, 1]}),
                        generateIGLockedPoint({coord: [5, 2]}),
                    ],
                }),
            ],
        }),
    },
};

export const MafsWithYAxisJustOverLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-3, 20],
                [-10, 10],
            ],
            lockedFigures: [
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [1, 1]}),
                        generateIGLockedPoint({coord: [5, 2]}),
                    ],
                }),
            ],
        }),
    },
};

export const MafsWithYAxisOffLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [1, 20],
                [-10, 10],
            ],
        }),
    },
};

export const MafsWithYAxisOffFarLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [6, 20],
                [-10, 10],
            ],
        }),
    },
};

export const MafsWithYAxisAtRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-20, 0],
                [-10, 10],
            ],
        }),
    },
};

export const MafsWithYAxisOffRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-20, -1],
                [-10, 10],
            ],
        }),
    },
};

export const MafsWithYAxisOffFarRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-20, -6],
                [-10, 10],
            ],
        }),
    },
};

export const MafsWithXAxisAtBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [0, 20],
            ],
        }),
    },
};

export const MafsWithXAxisNearBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-1, 20],
            ],
        }),
    },
};

export const MafsWithXAxisOffBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [1, 20],
            ],
        }),
    },
};

export const MafsWithXAxisJustOverBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-3, 20],
            ],
            lockedFigures: [
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [-3, 2]}),
                        generateIGLockedPoint({coord: [5, 16]}),
                    ],
                }),
            ],
        }),
    },
};

export const MafsWithXAxisAtTop: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-20, 0],
            ],
        }),
    },
};

export const MafsWithXAxisOffTop: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-20, -1],
            ],
        }),
    },
};

export const MafsWithLabelsAlongEdge: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: [
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            ],
            labelLocation: "alongEdge",
        }),
    },
};

export const MafsWithLabelsAlongEdgeAtLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [0, 10],
                [0, 10],
            ],
            labels: [
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            ],
            labelLocation: "alongEdge",
        }),
    },
};

export const MafsWithLabelsAlongEdgeJustOverLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-1, 10],
                [-1, 10],
            ],
            labels: [
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            ],
            labelLocation: "alongEdge",
        }),
    },
};

export const MafsWithLabelsAlongEdgeAtRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [0, 0.01],
                [0, 0.01],
            ],
            step: [0.001, 0.001],
            gridStep: [0.001, 0.001],
            labels: [
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            ],
            labelLocation: "alongEdge",
        }),
    },
};

export const MafsWithLabelsAlongEdgeWithCloseToZeroXMin: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-0.03, 0.84],
                [-2.8, 63],
            ],
            step: [0.2, 10],
            gridStep: [0.05, 5],
            snapStep: [0.025, 2],
            labels: ["Time (seconds)", "Distance (meters)"],
            labelLocation: "alongEdge",
        }),
    },
};

export const MafsWithLabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000: Story =
    {
        args: {
            question: generateInteractiveGraphQuestion({
                range: [
                    [-30, 840],
                    [-2.8, 63],
                ],
                step: [200, 10],
                gridStep: [50, 5],
                snapStep: [25, 2],
                labels: ["Time (seconds)", "Distance (meters)"],
                labelLocation: "alongEdge",
            }),
        },
    };

export const MafsWithLabelsAlongEdgeZoomed: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [0, 0.5],
                [0, 0.5],
            ],
            step: [0.1, 0.1],
            gridStep: [0.1, 0.1],
            labels: [
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            ],
            labelLocation: "alongEdge",
        }),
    },
};

export const MafsInMobileContainer: Story = {
    args: {
        question: generateInteractiveGraphQuestion(),
    },
    decorators: [MobileContainerDecorator],
};

export const MafsWithMultipleSegments: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGSegmentGraph({numSegments: 3}),
        }),
    },
};

export const MafsCircleGraphWithNonsquareRange: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGCircleGraph(),
            range: [
                [-10, 10],
                [-5, 5],
            ],
        }),
    },
    // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
    // I'm unclear why this one story forces mobile when none of the others do,
    // and this story doesn't look mobile-specific. :thinking:
    decorators: [MobileContainerDecorator],
};

export const MafsLineGraphWithNonsquareRange: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-5, 5],
                [-10, 10],
            ],
            lockedFigures: [
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [-3, -3]}),
                        generateIGLockedPoint({coord: [3, 3]}),
                    ],
                }),
            ],
        }),
    },
};

export const MafsWithLockedPoints: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            lockedFigures: [
                generateIGLockedPoint({coord: [3, 2]}),
                generateIGLockedPoint({coord: [-1, 1]}),
                generateIGLockedPoint({coord: [0, -4]}),
            ],
        }),
    },
};

export const MafsWithLockedLine: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            lockedFigures: [
                generateIGLockedLine({
                    points: [
                        generateIGLockedPoint({coord: [-1, 1]}),
                        generateIGLockedPoint({coord: [2, 3]}),
                    ],
                }),
            ],
        }),
    },
};

export const MafsWithProtractor: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGAngleGraph(),
            showProtractor: true,
        }),
    },
};

export const MafsWithPiTicks: Story = {
    args: {
        question: sinusoidWithPiTicks,
    },
};

export const MafsWithAnswerlessData: Story = {
    args: {
        question: (() => {
            const question = generateInteractiveGraphQuestion();
            const answerfulItem = generateTestPerseusItem({question});
            const answerlessItem = splitPerseusItem(answerfulItem);
            return answerlessItem.question;
        })(),
    },
};

/* Locked figure weight regression tests */

function lockedFiguresQuestionWithWeight(weight: "thin" | "medium" | "thick") {
    return generateInteractiveGraphQuestion({
        correct: generateIGNoneGraph(),
        lockedFigures: [
            generateIGLockedLine({
                kind: "segment",
                weight,
                points: [
                    generateIGLockedPoint({coord: [2, 2]}),
                    generateIGLockedPoint({coord: [9, 9]}),
                ],
            }),
            generateIGLockedLine({
                kind: "ray",
                weight,
                points: [
                    generateIGLockedPoint({coord: [2, 1]}),
                    generateIGLockedPoint({coord: [9, 8]}),
                ],
            }),
            generateIGLockedLine({
                kind: "line",
                weight,
                points: [
                    generateIGLockedPoint({coord: [2, 0]}),
                    generateIGLockedPoint({coord: [9, 7]}),
                ],
            }),
            generateIGLockedVector({
                points: [
                    [4, -7],
                    [7, -4],
                ],
                weight,
                color: "green",
            }),
            generateIGLockedEllipse({
                center: [-5, 5],
                radius: [1, 1],
                weight,
                color: "blue",
            }),
            generateIGLockedPolygon({
                points: [
                    [-7.5, -3.5],
                    [-6.5, -2.5],
                    [-5.5, -3.5],
                    [-6.5, -4.5],
                ],
                weight,
                color: "pink",
            }),
            generateIGLockedFunction({equation: "x^2", weight, color: "red"}),
        ],
    });
}

export const LockedFiguresWithThinWeight: Story = {
    args: {
        question: lockedFiguresQuestionWithWeight("thin"),
    },
};

export const LockedFiguresWithMediumWeight: Story = {
    args: {
        question: lockedFiguresQuestionWithWeight("medium"),
    },
};

export const LockedFiguresWithThickWeight: Story = {
    args: {
        question: lockedFiguresQuestionWithWeight("thick"),
    },
};

export const ShowXMinArrow: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGNoneGraph(),
            graph: generateIGNoneGraph(),
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {xMin: true, xMax: false, yMin: false, yMax: false},
        }),
    },
};

export const ShowXMaxArrow: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGNoneGraph(),
            graph: generateIGNoneGraph(),
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {xMin: false, xMax: true, yMin: false, yMax: false},
        }),
    },
};

export const ShowYMinArrow: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGNoneGraph(),
            graph: generateIGNoneGraph(),
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {xMin: false, xMax: false, yMin: true, yMax: false},
        }),
    },
};

export const ShowYMaxArrow: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGNoneGraph(),
            graph: generateIGNoneGraph(),
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {xMin: false, xMax: false, yMin: false, yMax: true},
        }),
    },
};

export const ShowAllArrows: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGNoneGraph(),
            graph: generateIGNoneGraph(),
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {xMin: true, xMax: true, yMin: true, yMax: true},
        }),
    },
};

export const ShowNoArrows: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGNoneGraph(),
            graph: generateIGNoneGraph(),
            range: [
                [-10, 10],
                [-10, 10],
            ],
            showAxisArrows: {
                xMin: false,
                xMax: false,
                yMin: false,
                yMax: false,
            },
        }),
    },
};

function MafsQuestionRenderer(props: {question: PerseusRenderer}) {
    const {question} = props;
    return (
        <UserInputManager widgets={question.widgets} problemNum={0}>
            {({userInput, handleUserInput, initializeUserInput}) => (
                <Renderer
                    userInput={userInput}
                    handleUserInput={handleUserInput}
                    initializeUserInput={initializeUserInput}
                    strings={mockStrings}
                    content={question.content}
                    widgets={question.widgets}
                    images={question.images}
                    apiOptions={ApiOptions.defaults}
                />
            )}
        </UserInputManager>
    );
}
