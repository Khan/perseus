import invariant from "tiny-invariant";

import {
    generateGrapherGraph,
    generateGrapherWidgetOptions,
} from "../../utils/generators/grapher-widget-generator";

import type {PerseusGrapherWidgetOptions} from "../../data-schema";

import grapherWidgetLogic from "./index";

describe("grapherWidgetLogic.accessible()", () => {
    const accessible = grapherWidgetLogic.accessible;
    invariant(accessible instanceof Function);

    const accessibleGraph = generateGrapherWidgetOptions({
        graph: generateGrapherGraph({backgroundImage: {url: null}}),
        availableTypes: ["linear"],
    });

    it("returns true when the graph is accessible", () => {
        expect(accessible(accessibleGraph)).toBe(true);
    });

    it("returns false when the graph has a background image URL", () => {
        const graph = {
            ...accessibleGraph,
            graph: {
                ...accessibleGraph.graph,
                backgroundImage: {url: "something"},
            },
        };

        expect(accessible(graph)).toBe(false);
    });

    it("returns true when the graph has an empty background image URL", () => {
        const graph = {
            ...accessibleGraph,
            graph: {
                ...accessibleGraph.graph,
                backgroundImage: {url: ""},
            },
        };

        expect(accessible(graph)).toBe(true);
    });

    it("returns false when the graph is quadratic", () => {
        const graph: PerseusGrapherWidgetOptions = {
            ...accessibleGraph,
            availableTypes: ["quadratic"],
        };

        expect(accessible(graph)).toBe(false);
    });

    it("returns false when the graph has multiple available types (the choose-your-own-function case)", () => {
        const graph: PerseusGrapherWidgetOptions = {
            ...accessibleGraph,
            availableTypes: ["linear", "tangent"],
        };

        expect(accessible(graph)).toBe(false);
    });
});
