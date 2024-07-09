import {segmentsIntersect} from "./geometry";

import type {Segment} from "./geometry";

describe("segmentsIntersect", () => {
    it("returns false when segments have zero length", () => {
        const segment1: Segment = [
            [0, 0],
            [0, 0],
        ];
        const segment2: Segment = [
            [1, 1],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when segments are the same", () => {
        // TODO(benchristel): is this desired behavior?
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [0, 0],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when an endpoint touches the other segment (lambda = 1)", () => {
        // TODO(benchristel): is this desired behavior?
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [0, 2],
            [2, 0],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when an endpoint touches the other segment (lambda = 0)", () => {
        // TODO(benchristel): is this desired behavior?
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [-1, 1],
            [1, -1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when endpoints touch (gamma = 0)", () => {
        // TODO(benchristel): is this desired behavior?
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [2, 1],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when endpoints touch (gamma = 1)", () => {
        // TODO(benchristel): is this desired behavior?
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [1, 1],
            [2, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false given two horizontal segments", () => {
        const segment1: Segment = [
            [0, 0],
            [1, 0],
        ];
        const segment2: Segment = [
            [0, 1],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false given two vertical segments", () => {
        const segment1: Segment = [
            [0, 0],
            [0, 1],
        ];
        const segment2: Segment = [
            [1, 0],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false given two parallel diagonal segments", () => {
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [0, 1],
            [1, 2],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns true given intersecting segments", () => {
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [1, 0],
            [0, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(true);
    });

    it("returns false when segments are not parallel but do not intersect (lambda > 1)", () => {
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [9, 0],
            [0, 9],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when segments are not parallel but do not intersect (lambda < 0)", () => {
        const segment1: Segment = [
            [0, 0],
            [1, 1],
        ];
        const segment2: Segment = [
            [-9, 0],
            [0, -9],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when segments are not parallel but do not intersect (gamma > 1)", () => {
        const segment1: Segment = [
            [-9, 0],
            [0, -9],
        ];
        const segment2: Segment = [
            [0, 0],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });

    it("returns false when segments are not parallel but do not intersect (gamma < 0)", () => {
        const segment1: Segment = [
            [9, 0],
            [0, 9],
        ];
        const segment2: Segment = [
            [0, 0],
            [1, 1],
        ];
        expect(segmentsIntersect(segment1, segment2)).toBe(false);
    });
});
