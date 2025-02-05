import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";

import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";
import {sinusoidWithPiTicks} from "./interactive-graph.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react";

type Story = StoryObj<typeof QuestionRenderer>;

const meta: Meta<typeof QuestionRenderer> = {
    title: "Perseus/Widgets/Interactive Graph Visual Regression Tests",
    component: QuestionRenderer,
    parameters: {
        chromatic: {disableSnapshot: false},
    },
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
        question: interactiveGraphQuestionBuilder()
            .withAxisLabels(
                "\\text{Custom $x$ label}",
                "\\text{Custom $y$ label}",
            )
            .build(),
    },
};

export const FractionalGridStep: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withGridStep(2.571, 3.123)
            .build(),
    },
};

export const FractionalAxisTicks: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withTickStep(1.5, 1.5)
            .build(),
    },
};

export const AxesMarkings: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withMarkings("axes")
            .build(),
    },
};

export const GridMarkings: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withMarkings("grid")
            .build(),
    },
};

export const NoMarkings: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withMarkings("none")
            .build(),
    },
};

export const SmallRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-2, 2)
            .withYRange(-2, 2)
            .build(),
    },
};

export const LargeRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-50, 50)
            .withYRange(-50, 50)
            .build(),
    },
};

export const YAxisAtLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(0, 20)
            .addLockedLine([1, 1], [5, 2])
            .build(),
    },
};

export const YAxisNearLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-1, 20)
            .addLockedLine([1, 1], [5, 2])
            .build(),
    },
};

export const YAxisJustOverLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withXRange(-3, 20)
            .addLockedLine([1, 1], [5, 2])
            .build(),
    },
};

export const YAxisOffLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(1, 20).build(),
    },
};

export const YAxisOffFarLeft: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(6, 20).build(),
    },
};

export const YAxisAtRight: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(-20, 0).build(),
    },
};

export const YAxisOffRight: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withXRange(-20, -1).build(),
    },
};

export const XAxisAtBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(0, 20).build(),
    },
};

export const XAxisNearBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(-1, 20).build(),
    },
};

export const XAxisOffBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(1, 20).build(),
    },
};

export const XAxisJustOverBottom: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withYRange(-3, 20)
            .addLockedLine([-3, 2], [5, 16])
            .build(),
    },
};

export const XAxisAtTop: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(-20, 0).build(),
    },
};

export const XAxisOffTop: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withYRange(-20, -1).build(),
    },
};

export const InMobileContainer: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().build(),
    },
    decorators: [MobileContainerDecorator],
};

export const MultipleSegments: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .withSegments({numSegments: 3})
            .build(),
    },
};

export const CircleGraphWithNonsquareRange: Story = {
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

export const LineGraphWithNonsquareRange: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .addLockedLine([-3, -3], [3, 3])
            .withXRange(-5, 5)
            .withYRange(-10, 10)
            .build(),
    },
};

export const LockedPoints: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .addLockedPointAt(3, 2)
            .addLockedPointAt(-1, 1)
            .addLockedPointAt(0, -4)
            .build(),
    },
};

export const LockedLine: Story = {
    args: {
        question: interactiveGraphQuestionBuilder()
            .addLockedLine([-1, 1], [2, 3])
            .build(),
    },
};

export const Protractor: Story = {
    args: {
        question: interactiveGraphQuestionBuilder().withProtractor().build(),
    },
};

export const PiTicks: Story = {
    args: {
        question: sinusoidWithPiTicks,
    },
};

function QuestionRenderer(props: {question: PerseusRenderer}) {
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
