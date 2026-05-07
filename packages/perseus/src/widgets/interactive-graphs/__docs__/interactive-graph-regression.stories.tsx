import {
    generateInteractiveGraphQuestion,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLockedEllipse,
    generateIGLockedFunction,
    generateIGLockedLabel,
    generateIGLockedLine,
    generateIGLockedPoint,
    generateIGLockedPolygon,
    generateIGLockedVector,
    generateIGNoneGraph,
    generateIGPolygonGraph,
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

type Story = StoryObj<typeof MafsQuestionRenderer>;

const meta: Meta<typeof MafsQuestionRenderer> = {
    title: "Widgets/Interactive Graph/Visual Regression Tests",
    component: MafsQuestionRenderer,
    tags: ["!autodocs", "!manifest"],
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

export const CustomAxisLabels: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            labels: ["\\text{Custom $x$ label}", "\\text{Custom $y$ label}"],
        }),
    },
};

export const FractionalGridStep: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            gridStep: [2.571, 3.123],
        }),
    },
};

export const FractionalAxisTicks: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            step: [1.5, 1.5],
        }),
    },
};

export const AxesMarkings: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            markings: "axes",
        }),
    },
};

export const GridMarkings: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            markings: "grid",
        }),
    },
};

export const NoMarkings: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            markings: "none",
        }),
    },
};

export const SmallRange: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-2, 2],
                [-2, 2],
            ],
        }),
    },
};

export const LargeRange: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-50, 50],
                [-50, 50],
            ],
        }),
    },
};

export const YAxisAtLeft: Story = {
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

export const YAxisNearLeft: Story = {
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

export const YAxisJustOverLeft: Story = {
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

export const YAxisOffLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [1, 20],
                [-10, 10],
            ],
        }),
    },
};

export const YAxisOffFarLeft: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [6, 20],
                [-10, 10],
            ],
        }),
    },
};

export const YAxisAtRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-20, 0],
                [-10, 10],
            ],
        }),
    },
};

export const YAxisOffRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-20, -1],
                [-10, 10],
            ],
        }),
    },
};

export const YAxisOffFarRight: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-20, -6],
                [-10, 10],
            ],
        }),
    },
};

export const XAxisAtBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [0, 20],
            ],
        }),
    },
};

export const XAxisNearBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-1, 20],
            ],
        }),
    },
};

export const XAxisOffBottom: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [1, 20],
            ],
        }),
    },
};

export const XAxisJustOverBottom: Story = {
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

export const XAxisAtTop: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-20, 0],
            ],
        }),
    },
};

export const XAxisOffTop: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            range: [
                [-10, 10],
                [-20, -1],
            ],
        }),
    },
};

export const LabelsAlongEdge: Story = {
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

export const LabelsAlongEdgeAtLeft: Story = {
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

export const LabelsAlongEdgeJustOverLeft: Story = {
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

export const LabelsAlongEdgeAtRight: Story = {
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

export const LabelsAlongEdgeWithCloseToZeroXMin: Story = {
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

export const LabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000: Story = {
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

export const LabelsAlongEdgeZoomed: Story = {
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

export const InMobileContainer: Story = {
    args: {
        question: generateInteractiveGraphQuestion(),
    },
    decorators: [MobileContainerDecorator],
};

export const MultipleSegments: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGSegmentGraph({numSegments: 3}),
        }),
    },
};

export const CircleGraphWithNonsquareRange: Story = {
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

export const LineGraphWithNonsquareRange: Story = {
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

export const LockedPoints: Story = {
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

export const LockedLine: Story = {
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

export const Protractor: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            correct: generateIGAngleGraph(),
            showProtractor: true,
        }),
    },
};

export const PiTicks: Story = {
    args: {
        question: sinusoidWithPiTicks,
    },
};

export const AnswerlessData: Story = {
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

export const Ungraded: Story = {
    args: {
        question: generateInteractiveGraphQuestion({graded: false}),
    },
};

// Static graph: when `static` is true, interactive elements use `--static-gray`
// instead of `--mafs-blue`. This regression story exercises the static-gray
// color path used by movable points/lines when keyboard interaction is disabled.
export const StaticGraph: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            isStatic: true,
            correct: generateIGPolygonGraph({
                coords: [
                    [-3, -2],
                    [3, -2],
                    [0, 4],
                ],
            }),
        }),
    },
};

// Locked label: covers the `rgba(255, 255, 255, 0.8)` background color used
// behind locked text labels and the `font.size` token applied via the WB tokens.
export const LockedLabel: Story = {
    args: {
        question: generateInteractiveGraphQuestion({
            lockedFigures: [
                generateIGLockedLabel({
                    coord: [0, 0],
                    text: "Origin",
                    color: "blue",
                    size: "medium",
                }),
                generateIGLockedLabel({
                    coord: [3, -3],
                    text: "y = x^2",
                    color: "green",
                    size: "small",
                }),
                generateIGLockedLabel({
                    coord: [-5, -3],
                    text: "Large label",
                    color: "red",
                    size: "large",
                }),
            ],
        }),
    },
};
