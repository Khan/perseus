import {getIntersectionOfRayWithBox} from "./utils";
import {Interval, vec} from "mafs";

describe("getIntersectionOfRayWithBox", () => {
    test("given a horizontal ray passing through the origin to the left", () => {
        const box: [Interval, Interval] = [[-7, 7], [-11, 11]];
        const initialPoint: vec.Vector2 = [1, 0];
        const throughPoint: vec.Vector2 = [-1, 0];
        const intersection = getIntersectionOfRayWithBox(initialPoint, throughPoint, box);
        expect(intersection).toEqual([-7, 0]);
    });

    test("given a horizontal ray passing through the origin to the right", () => {
        const box: [Interval, Interval] = [[-7, 7], [-11, 11]];
        const initialPoint: vec.Vector2 = [-1, 0];
        const throughPoint: vec.Vector2 = [1, 0];
        const intersection = getIntersectionOfRayWithBox(initialPoint, throughPoint, box);
        expect(intersection).toEqual([7, 0]);
    });

    test("given a y coordinate of -0 for the initialPoint when the ray points right", () => {
        const box: [Interval, Interval] = [[-7, 7], [-11, 11]];
        const initialPoint: vec.Vector2 = [-1, -0];
        const throughPoint: vec.Vector2 = [1, 0];
        const intersection = getIntersectionOfRayWithBox(initialPoint, throughPoint, box);
        expect(intersection).toEqual([7, 0]);
    });

    test("given a y coordinate of -0 for the throughPoint when the ray points right", () => {
        const box: [Interval, Interval] = [[-7, 7], [-11, 11]];
        const initialPoint: vec.Vector2 = [-1, 0];
        const throughPoint: vec.Vector2 = [1, -0];
        const intersection = getIntersectionOfRayWithBox(initialPoint, throughPoint, box);
        expect(intersection).toEqual([7, 0]);
    });

    test("given a y coordinate of -0 for the initialPoint when the ray points left", () => {
        const box: [Interval, Interval] = [[-7, 7], [-11, 11]];
        const initialPoint: vec.Vector2 = [1, -0];
        const throughPoint: vec.Vector2 = [-1, 0];
        const intersection = getIntersectionOfRayWithBox(initialPoint, throughPoint, box);
        expect(intersection).toEqual([-7, 0]);
    });

    test("given a y coordinate of -0 for the throughPoint when the ray points left", () => {
        const box: [Interval, Interval] = [[-7, 7], [-11, 11]];
        const initialPoint: vec.Vector2 = [1, 0];
        const throughPoint: vec.Vector2 = [-1, -0];
        const intersection = getIntersectionOfRayWithBox(initialPoint, throughPoint, box);
        expect(intersection).toEqual([-7, 0]);
    });
});
