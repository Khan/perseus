import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";

import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";
import {sinusoidWithPiTicks} from "./interactive-graph.testdata";

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
        question: interactiveGraphQuestionBuilder()
            .withAxisLabels(
                "\\text{Custom $x$ label}",
                "\\text{Custom $y$ label}",
            )
            .build(),
    },
};

export const MafsWithFractionalGridStep: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withGridStep(2.571, 3.123)
            .build(),
    },
};

export const MafsWithFractionalAxisTicks: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withTickStep(1.5, 1.5)
            .build(),
    },
};

export const MafsWithAxesMarkings: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withMarkings("axes")
            .build(),
    },
};

export const MafsWithGridMarkings: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withMarkings("grid")
            .build(),
    },
};

export const MafsWithNoMarkings: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withMarkings("none")
            .build(),
    },
};

export const MafsWithSmallRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-2, 2)
            .withYRange(-2, 2)
            .build(),
    },
};

export const MafsWithLargeRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-50, 50)
            .withYRange(-50, 50)
            .build(),
    },
};

export const MafsWithYAxisAtLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(0, 20)
            .addLockedLine([1, 1], [5, 2])
            .build(),
    },
};

export const MafsWithYAxisNearLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-1, 20)
            .addLockedLine([1, 1], [5, 2])
            .build(),
    },
};

export const MafsWithYAxisJustOverLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-3, 20)
            .addLockedLine([1, 1], [5, 2])
            .build(),
    },
};

export const MafsWithYAxisOffLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(1, 20).build(),
    },
};

export const MafsWithYAxisOffFarLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(6, 20).build(),
    },
};

export const MafsWithYAxisAtRight: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build(),
    },
};

export const MafsWithYAxisOffRight: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build(),
    },
};

export const MafsWithYAxisOffFarRight: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(-20, -6).build(),
    },
};

export const MafsWithXAxisAtBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(0, 20).build(),
    },
};

export const MafsWithXAxisNearBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build(),
    },
};

export const MafsWithXAxisOffBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(1, 20).build(),
    },
};

export const MafsWithXAxisJustOverBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withYRange(-3, 20)
            .addLockedLine([-3, 2], [5, 16])
            .build(),
    },
};

export const MafsWithXAxisAtTop: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build(),
    },
};

export const MafsWithXAxisOffTop: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build(),
    },
};

export const MafsWithLabelsAlongEdge: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-10, 10)
            .withYRange(-10, 10)
            .withAxisLabels(
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            )
            .withLabelLocation("alongEdge")
            .build(),
    },
};

export const MafsWithLabelsAlongEdgeAtLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(0, 10)
            .withYRange(0, 10)
            .withAxisLabels(
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            )
            .withLabelLocation("alongEdge")
            .build(),
    },
};

export const MafsWithLabelsAlongEdgeJustOverLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-1, 10)
            .withYRange(-1, 10)
            .withAxisLabels(
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            )
            .withLabelLocation("alongEdge")
            .build(),
    },
};

export const MafsWithLabelsAlongEdgeAtRight: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(0, 0.01)
            .withYRange(0, 0.01)
            .withTickStep(0.001, 0.001)
            .withGridStep(0.001, 0.001)
            .withAxisLabels(
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            )
            .withLabelLocation("alongEdge")
            .build(),
    },
};

export const MafsWithLabelsAlongEdgeWithCloseToZeroXMin: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-0.03, 0.84)
            .withYRange(-2.8, 63)
            .withTickStep(0.2, 10)
            .withGridStep(0.05, 5)
            .withSnapStep(0.025, 2)
            .withAxisLabels("Time (seconds)", "Distance (meters)")
            .withLabelLocation("alongEdge")
            .build(),
    },
};

export const MafsWithLabelsAlongEdgeWithCloseToZeroXMinMultipliedBy1000: Story =
    {
        args: {
            question: interactiveGraphQuestionBuilder()
                .withXRange(-30, 840)
                .withYRange(-2.8, 63)
                .withTickStep(200, 10)
                .withGridStep(50, 5)
                .withSnapStep(25, 2)
                .withAxisLabels("Time (seconds)", "Distance (meters)")
                .withLabelLocation("alongEdge")
                .build(),
        },
    };

export const MafsWithLabelsAlongEdgeZoomed: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(0, 0.5)
            .withYRange(0, 0.5)
            .withTickStep(0.1, 0.1)
            .withGridStep(0.1, 0.1)
            .withAxisLabels(
                "Video Game Hours per Week",
                "Reaction Time (milliseconds)",
            )
            .withLabelLocation("alongEdge")
            .build(),
    },
};

export const MafsInMobileContainer: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().build(),
    },
    decorators: [MobileContainerDecorator],
};

export const MafsWithMultipleSegments: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withSegments({numSegments: 3})
            .build(),
    },
};

export const MafsCircleGraphWithNonsquareRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withCircle()
            .withXRange(-10, 10)
            .withYRange(-5, 5)
            .build(),
    },
    // NOTE(jeremy): I migrated these stories to the v3 CSF story format, but
    // I'm unclear why this one story forces mobile when none of the others do,
    // and this story doesn't look mobile-specific. :thinking:
    decorators: [MobileContainerDecorator],
};

export const MafsLineGraphWithNonsquareRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .addLockedLine([-3, -3], [3, 3])
            .withXRange(-5, 5)
            .withYRange(-10, 10)
            .build(),
    },
};

export const MafsWithLockedPoints: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .addLockedPointAt(3, 2)
            .addLockedPointAt(-1, 1)
            .addLockedPointAt(0, -4)
            .build(),
    },
};

export const MafsWithLockedLine: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .addLockedLine([-1, 1], [2, 3])
            .build(),
    },
};

export const MafsWithProtractor: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withAngle()
            .withProtractor()
            .build(),
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
            const question = interactiveGraphQuestionBuilder().build();
            const answerfulItem = generateTestPerseusItem({question});
            const answerlessItem = splitPerseusItem(answerfulItem);
            return answerlessItem.question;
        })(),
    },
};

/* Locked figure weight regression tests */

function lockedFiguresQuestionWithWeight(weight: "thin" | "medium" | "thick") {
    return interactiveGraphQuestionBuilder()
        .withNoInteractiveFigure()
        .addLockedLine([2, 2], [9, 9], {kind: "segment", weight})
        .addLockedLine([2, 1], [9, 8], {kind: "ray", weight})
        .addLockedLine([2, 0], [9, 7], {kind: "line", weight})
        .addLockedVector([4, -7], [7, -4], {weight, color: "green"})
        .addLockedEllipse([-5, 5], [1, 1], {weight, color: "blue"})
        .addLockedPolygon(
            [
                [-7.5, -3.5],
                [-6.5, -2.5],
                [-5.5, -3.5],
                [-6.5, -4.5],
            ],
            {weight, color: "pink"},
        )
        .addLockedFunction("x^2", {weight, color: "red"})
        .build();
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

function MafsQuestionRenderer(props: {question: PerseusRenderer}) {
    const {question} = props;
    return (
        <Renderer
            strings={mockStrings}
            content={question.content}
            widgets={question.widgets}
            images={question.images}
            apiOptions={ApiOptions.defaults}
        />
    );
}
