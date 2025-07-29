// Duplicated from packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts
// This is to have similar test data for packages/perseus-editor
import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

// Data for the interactive graph widget

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

export const pointQuestionWithStartingCoords: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withPoints(2, {
            startCoords: [
                [0, 0],
                [2, 2],
            ],
        })
        .build();

// Clockwise points
export const polygonWithStartingCoordsQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withMarkings("grid")
        .withPolygon("grid", {
            startCoords: [
                [-7, 5],
                [1, 5],
                [6, 0],
                [1, -5],
                [-7, -5],
                [-2, 0],
            ],
            showAngles: true,
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

export const sinusoidMinimalQuestion: PerseusRenderer =
    interactiveGraphQuestionBuilder().withSinusoid().build();

export const noneQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
    .withContent("This graph isn't interactive.\n\n[[☃ interactive-graph 1]]")
    .withNoInteractiveFigure()
    .addLockedFunction("5*sin(x)+x^3/20-ln(abs(x))", {color: "green"})
    .addLockedEllipse([-5, 5], [2, 2], {color: "red", fillStyle: "translucent"})
    .addLockedEllipse([5, -5], [2, 2], {color: "red", fillStyle: "translucent"})
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

export const interactiveGraphWithAriaLabel: PerseusRenderer =
    interactiveGraphQuestionBuilder()
        .withNoInteractiveFigure()
        .withFullGraphAriaLabel("Segment Graph Title")
        .withFullGraphAriaDescription(
            "There is a segment on the graph that runs from five units left and five units up to five units right and five units up.",
        )
        .build();
