import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {interactiveGraphQuestionBuilder} from "../../__testdata__/interactive-graph-question-builder";
import {
    angleWithStartingCoordsQuestion,
    circleWithStartingCoordsQuestion,
    interactiveGraphWithAriaLabel,
    linearSystemWithStartingCoordsQuestion,
    linearWithStartingCoordsQuestion,
    pointQuestionWithStartingCoords,
    polygonWithStartingCoordsQuestion,
    quadraticWithStartingCoordsQuestion,
    rayWithStartingCoordsQuestion,
    segmentsWithStartingCoordsQuestion,
    segmentWithLockedFigures,
    segmentWithStartingCoordsQuestion,
    sinusoidMinimalQuestion,
    sinusoidWithStartingCoordsAndPiTicksQuestion,
    unlimitedPolygonWithCorrectAnswerQuestion,
} from "../../__testdata__/interactive-graph.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import InteractiveGraphEditor from "../interactive-graph-editor/interactive-graph-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Interactive Graph/Editor Demo",
    component: InteractiveGraphEditor,
    tags: ["!dev"],
} satisfies Meta<typeof InteractiveGraphEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const InteractiveGraphWithAriaLabel = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={interactiveGraphWithAriaLabel} />
);

export const InteractiveGraphSegment = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={segmentWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphSegments = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={segmentsWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphLinear = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={linearWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphLinearSystem = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={linearSystemWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphRay = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={rayWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphCircle = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={circleWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphQuadratic = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={quadraticWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphSinusoid = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview question={sinusoidMinimalQuestion} />
    );
};

export const InteractiveGraphSinusoidWithPiTicks = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={sinusoidWithStartingCoordsAndPiTicksQuestion}
        />
    );
};

export const InteractiveGraphPoint = (): React.ReactElement => (
    <EditorPageWithStorybookPreview
        question={pointQuestionWithStartingCoords}
    />
);

export const InteractiveGraphPolygon = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={polygonWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphUnlimitedPolygon = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={unlimitedPolygonWithCorrectAnswerQuestion}
        />
    );
};

export const InteractiveGraphAngle = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={angleWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphNone = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={interactiveGraphQuestionBuilder()
                .withNoInteractiveFigure()
                .addLockedFunction("5*sin(x)", {color: "red"})
                .build()}
        />
    );
};

export const LockedFigures = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview question={segmentWithLockedFigures} />
    );
};

export const InteractiveGraphZeroBounds = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={interactiveGraphQuestionBuilder()
                .withNoInteractiveFigure()
                .withXRange(0, 10)
                .withYRange(0, 10)
                .withShowAxisArrows({
                    xMin: false,
                    xMax: true,
                    yMin: false,
                    yMax: true,
                })
                .build()}
        />
    );
};
