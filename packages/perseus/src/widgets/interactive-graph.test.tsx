import {shouldUseMafs} from "./interactive-graph";

import type {
    PerseusGraphTypeLinear,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeNone,
} from "../perseus-types";

describe("shouldUseMafs", () => {
    it("is false given no mafs flags", () => {
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = undefined;

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is false when mafs flags is a boolean", () => {
        // boolean values aren't valid; we expect the mafs flags to be an
        // object.
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = true;

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is false for a point graph when the feature flag is off", () => {
        const graph: PerseusGraphTypePoint = {
            type: "point",
            numPoints: 42,
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a point graph when the `point` feature flag is on", () => {
        const graph: PerseusGraphTypePoint = {
            type: "point",
            numPoints: 42,
        };
        const mafsFlags = {
            point: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a point graph with numPoints = 'unlimited'", () => {
        const graph: PerseusGraphTypePoint = {
            type: "point",
            numPoints: "unlimited",
        };
        const mafsFlags = {
            point: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a point graph without numPoints set when the feature flag is on", () => {
        // numPoints defaults to 1
        const graph: PerseusGraphTypePoint = {
            type: "point",
        };
        const mafsFlags = {
            point: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a polygon graph when the feature flag is off", () => {
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
            numSides: 3,
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a polygon graph when the feature flag is on", () => {
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
            numSides: 3,
        };
        const mafsFlags = {
            polygon: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a polygon graph when numSides is 'unlimited'", () => {
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
            numSides: "unlimited",
        };
        const mafsFlags = {
            polygon: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a polygon graph when numSides is not set", () => {
        // numSides defaults to 3
        const graph: PerseusGraphTypePolygon = {
            type: "polygon",
        };
        const mafsFlags = {
            polygon: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is false for a linear graph when the feature flag is off", () => {
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(false);
    });

    it("is true for a linear graph when the feature flag is on", () => {
        const graph: PerseusGraphTypeLinear = {
            type: "linear",
        };
        const mafsFlags = {
            linear: true,
        };

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });

    it("is always true for a 'none' graph (no interactive element)", () => {
        const graph: PerseusGraphTypeNone = {
            type: "none",
        };
        const mafsFlags = {};

        expect(shouldUseMafs(mafsFlags, graph)).toBe(true);
    });
});
