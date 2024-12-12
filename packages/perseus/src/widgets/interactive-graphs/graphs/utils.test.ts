import {getIntersectionOfRayWithBox, getArrayWithoutDuplicates} from "./utils";

import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

describe("getIntersectionOfRayWithBox", () => {
    test("a horizontal ray passing through the origin to the left", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [1, 0];
        const throughPoint: vec.Vector2 = [-1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-7, 0]);
    });

    test("a horizontal ray passing through the origin to the right", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [-1, 0];
        const throughPoint: vec.Vector2 = [1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([7, 0]);
    });

    test("a vertical ray passing through the origin upward", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [0, -1];
        const throughPoint: vec.Vector2 = [0, 1];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([0, 11]);
    });

    test("a vertical ray passing through the origin downward", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [0, 1];
        const throughPoint: vec.Vector2 = [0, -1];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([0, -11]);
    });

    test("a y coordinate of -0 for the initialPoint when the ray points right", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [-1, -0];
        const throughPoint: vec.Vector2 = [1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([7, 0]);
    });

    test("a y coordinate of -0 for the throughPoint when the ray points right", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [-1, 0];
        const throughPoint: vec.Vector2 = [1, -0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([7, 0]);
    });

    test("a y coordinate of -0 for the initialPoint when the ray points left", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [1, -0];
        const throughPoint: vec.Vector2 = [-1, 0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-7, 0]);
    });

    test("a y coordinate of -0 for the throughPoint when the ray points left", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [1, 0];
        const throughPoint: vec.Vector2 = [-1, -0];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-7, 0]);
    });

    test("a diagonal ray from top right to bottom left, when floating point gets imprecise", () => {
        // This is a regression test for https://khanacademy.atlassian.net/browse/LEMS-2004
        const box: [Interval, Interval] = [
            [-1.11, 7.89],
            [-1.11, 7.89],
        ];
        const initialPoint: vec.Vector2 = [6, 6];
        const throughPoint: vec.Vector2 = [1, 1];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([-1.11, -1.11]);
    });
});

describe("removeDuplicateCoordsFromArray", () => {
    test("removes duplicate coordinates", () => {
        // Arrange
        const arr: Coord[] = [
            [0, 0],
            [0, 0],
            [1, 1],
        ];

        // Act
        const result = getArrayWithoutDuplicates(arr);

        // Assert
        expect(result).toEqual([
            [0, 0],
            [1, 1],
        ]);
    });

    test("removes many duplicate coordinates", () => {
        // Arrange
        const arr: Coord[] = [
            [0, 0],
            [1, 1],
            [0, 0],
            [1, 1],
            [0, 0],
            [1, 1],
        ];

        // Act
        const result = getArrayWithoutDuplicates(arr);

        // Assert
        expect(result).toEqual([
            [0, 0],
            [1, 1],
        ]);
    });

    test("does not remove unique coordinates", () => {
        // Arrange
        const arr: Coord[] = [
            [0, 1],
            [1, 2],
            [2, 3],
        ];

        // Act
        const result = getArrayWithoutDuplicates(arr);

        // Assert
        expect(result).toEqual([
            [0, 1],
            [1, 2],
            [2, 3],
        ]);
    });
});
