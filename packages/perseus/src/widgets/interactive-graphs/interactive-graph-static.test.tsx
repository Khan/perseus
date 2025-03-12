import {screen} from "@testing-library/react";

import {ApiOptions} from "../../perseus-api";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {interactiveGraphQuestionBuilder} from "./interactive-graph-question-builder";

import type {APIOptions} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

const blankOptions: APIOptions = Object.freeze(ApiOptions.defaults);

describe.each`
    type             | staticMode | expectedColor
    ${"Interactive"} | ${false}   | ${"var(--mafs-blue)"}
    ${"Static"}      | ${true}    | ${"var(--static-gray)"}
`("$type", ({staticMode, expectedColor}) => {
    test("Segment graph", () => {
        // Arrange
        const segmentQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                .withSegments({numSegments: 1})
                .build();
        renderQuestion(segmentQuestion, blankOptions);

        // Act
        // Segment contains two points and the line segment in between.
        const points = screen.getAllByTestId("movable-point__center");
        const innerSegment = screen.getByTestId("movable-line__line");
        const [point1, point2] = points;

        // Assert
        expect(points).toHaveLength(2);
        expect(point1).toHaveStyle({fill: expectedColor});
        expect(point2).toHaveStyle({fill: expectedColor});
        expect(innerSegment).toHaveStyle({stroke: expectedColor});
    });

    test("Linear graph", () => {
        // Arrange
        const linearQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                .withLinear()
                .build();
        renderQuestion(linearQuestion, blankOptions);

        // Act
        // Linear graph contains two points, and inner segment,
        // and two vectors.
        const points = screen.getAllByTestId("movable-point__center");
        const innerSegment = screen.getByTestId("movable-line__line");
        const outerVectors = screen.getAllByTestId("movable-line__vector");
        const [point1, point2] = points;
        const [outerVector1, outerVector2] = outerVectors;

        // Assert
        expect(points).toHaveLength(2);
        expect(outerVectors).toHaveLength(2);
        expect(point1).toHaveStyle({fill: expectedColor});
        expect(point2).toHaveStyle({fill: expectedColor});
        expect(innerSegment).toHaveStyle({stroke: expectedColor});
        expect(outerVector1).toHaveStyle({stroke: expectedColor});
        expect(outerVector2).toHaveStyle({stroke: expectedColor});
    });

    test("Linear System graph", () => {
        // Arrange
        const linearSystemQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                .withLinearSystem()
                .build();
        renderQuestion(linearSystemQuestion, blankOptions);

        // Act
        // Linear graph contains two lines with two points, and inner segment,
        // and two vectors each.
        const points = screen.getAllByTestId("movable-point__center");
        const innerSegment = screen.getAllByTestId("movable-line__line");
        const outerVectors = screen.getAllByTestId("movable-line__vector");

        // Assert
        // Everything is doubled from the Linear test
        expect(points).toHaveLength(4);
        expect(innerSegment).toHaveLength(2);
        expect(outerVectors).toHaveLength(4);
        for (const point of points) {
            expect(point).toHaveStyle({fill: expectedColor});
        }
        for (const segment of innerSegment) {
            expect(segment).toHaveStyle({stroke: expectedColor});
        }
        for (const vector of outerVectors) {
            expect(vector).toHaveStyle({stroke: expectedColor});
        }
    });

    test("Ray graph", () => {
        // Arrange
        const rayQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withStaticMode(staticMode)
            .withRay()
            .build();
        renderQuestion(rayQuestion, blankOptions);

        // Act
        // Linear graph contains two points, and inner segment,
        // and one outer vector.
        const points = screen.getAllByTestId("movable-point__center");
        const innerSegment = screen.getByTestId("movable-line__line");
        const outerVector = screen.getByTestId("movable-line__vector");
        const [point1, point2] = points;

        // Assert
        expect(points).toHaveLength(2);
        expect(point1).toHaveStyle({fill: expectedColor});
        expect(point2).toHaveStyle({fill: expectedColor});
        expect(innerSegment).toHaveStyle({stroke: expectedColor});
        expect(outerVector).toHaveStyle({stroke: expectedColor});
    });

    test("Circle graph", () => {
        // Arrange
        const circleQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                .withCircle()
                .build();
        renderQuestion(circleQuestion, blankOptions);

        // Act
        // Circle graph contains the circle itself, a center drag handle,
        // and the radius point.
        const circle = screen.getByTestId("movable-circle__circle");
        const center = screen.getByTestId("movable-circle__handle");
        const radiusPoint = screen.getByTestId("movable-point__center");

        // Assert
        expect(circle).toHaveAttribute("stroke", expectedColor);
        expect(center).toHaveAttribute("fill", expectedColor);
        expect(radiusPoint).toHaveStyle({fill: expectedColor});
    });

    test("Quadratic", () => {
        // Arrange
        const quadraticQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                .withQuadratic()
                .build();
        renderQuestion(quadraticQuestion);

        // Act
        // Quadratic graph contains the parabola itself and three points.
        const points = screen.getAllByTestId("movable-point__center");
        // There's no way to get a test ID into the Mafs Plot.ofX, so
        // we need to use a query selector here.
        // eslint-disable-next-line testing-library/no-node-access
        const parabola = document.querySelector("path");

        // Assert
        expect(points).toHaveLength(3);
        for (const point of points) {
            expect(point).toHaveStyle({fill: expectedColor});
        }
        expect(parabola).toHaveStyle({color: expectedColor});
    });

    test("Sinusoid", () => {
        // Arrange
        const sinusoidQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                .withSinusoid()
                .build();
        renderQuestion(sinusoidQuestion, blankOptions);

        // Act
        // Sinusoid graph contains the sinusoid plot itself and two points.
        const points = screen.getAllByTestId("movable-point__center");
        // There's no way to get a test ID into the Mafs Plot.ofX, so
        // we need to use a query selector here.
        // eslint-disable-next-line testing-library/no-node-access
        const sinusoid = document.querySelector("path");

        // Assert
        expect(points).toHaveLength(2);
        for (const point of points) {
            expect(point).toHaveStyle({fill: expectedColor});
        }
        expect(sinusoid).toHaveStyle({color: expectedColor});
    });

    test("Point", () => {
        // Arrange
        const pointQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withStaticMode(staticMode)
            .withPoints(1)
            .build();
        renderQuestion(pointQuestion, blankOptions);

        // Act
        // Point graph contains a single point.
        const point = screen.getByTestId("movable-point__center");

        // Assert
        expect(point).toHaveStyle({fill: expectedColor});
    });

    test("Polygon", () => {
        // Arrange
        const polygonQuestion: PerseusRenderer =
            interactiveGraphQuestionBuilder()
                .withStaticMode(staticMode)
                // Defaults to 3 sides
                .withPolygon()
                .build();
        renderQuestion(polygonQuestion, blankOptions);

        // Act
        // Polygon graph contains the polygon and the three points.
        const points = screen.getAllByTestId("movable-point__center");
        // There's no way to get a test ID into the Mafs Polyline, so
        // we need to use a query selector here.
        // eslint-disable-next-line testing-library/no-node-access
        const polygon = document.querySelector("polygon");

        // Assert
        expect(points).toHaveLength(3);
        for (const point of points) {
            expect(point).toHaveStyle({fill: expectedColor});
        }
        expect(polygon).toHaveStyle({color: expectedColor});
    });

    test("Angle (angle arc)", () => {
        // Arrange
        const angleQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withStaticMode(staticMode)
            // Defaults to 53 degree angle
            .withAngle()
            .build();
        renderQuestion(angleQuestion, blankOptions);

        // Act
        // Angle graph contains 3 points, two inner segments,
        // two outer vectors, and the angle arc.
        const points = screen.getAllByTestId("movable-point__center");
        const innerSegments = screen.getAllByTestId("angle-graph__line");
        const outerVectors = screen.getAllByTestId("angle-graph__vector");
        const arc = screen.getByTestId("angle-indicators__arc");

        // Assert
        expect(points).toHaveLength(3);
        expect(innerSegments).toHaveLength(2);
        expect(outerVectors).toHaveLength(2);
        for (const point of points) {
            expect(point).toHaveStyle({fill: expectedColor});
        }
        for (const segment of innerSegments) {
            expect(segment).toHaveStyle({stroke: expectedColor});
        }
        for (const vector of outerVectors) {
            expect(vector).toHaveStyle({stroke: expectedColor});
        }
        expect(arc).toBeInTheDocument();
    });

    test("Angle (right angle)", () => {
        // Arrange
        const angleQuestion: PerseusRenderer = interactiveGraphQuestionBuilder()
            .withStaticMode(staticMode)
            // Defaults to 53 degree angle
            .withAngle({
                // Right angle
                startCoords: [
                    [0, 5],
                    [0, 0], // vertex
                    [5, 0],
                ],
                coords: [
                    [0, 5],
                    [0, 0], // vertex
                    [5, 0],
                ],
            })
            .build();
        renderQuestion(angleQuestion, blankOptions);

        // Act
        // Angle graph contains 3 points, two inner segments,
        // two outer vectors, and the right angle square.
        const points = screen.getAllByTestId("movable-point__center");
        const innerSegments = screen.getAllByTestId("angle-graph__line");
        const outerVectors = screen.getAllByTestId("angle-graph__vector");

        const rightAngle = screen.getByTestId("angle-indicators__right-angle");

        // Assert
        expect(points).toHaveLength(3);
        expect(innerSegments).toHaveLength(2);
        expect(outerVectors).toHaveLength(2);
        for (const point of points) {
            expect(point).toHaveStyle({fill: expectedColor});
        }
        for (const segment of innerSegments) {
            expect(segment).toHaveStyle({stroke: expectedColor});
        }
        for (const vector of outerVectors) {
            expect(vector).toHaveStyle({stroke: expectedColor});
        }
        expect(rightAngle).toBeInTheDocument();
    });
});
