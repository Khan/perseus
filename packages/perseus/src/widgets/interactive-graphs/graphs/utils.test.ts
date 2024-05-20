import {getIntersectionOfRayWithBox} from "./utils";

import type {Interval, vec} from "mafs";

describe("getIntersectionOfRayWithBox", () => {
    it("returns [0, 0] when the given points are the same", () => {
        const box: [Interval, Interval] = [
            [-7, 7],
            [-11, 11],
        ];
        const initialPoint: vec.Vector2 = [3, 5];
        const throughPoint: vec.Vector2 = [3, 5];
        const intersection = getIntersectionOfRayWithBox(
            initialPoint,
            throughPoint,
            box,
        );
        expect(intersection).toEqual([0, 0]);
    });

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
});
