import {render} from "@testing-library/react";
import React from "react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";

import {StatefulMafsGraph} from "./stateful-mafs-graph";

import type {StatefulMafsGraphProps} from "./stateful-mafs-graph";
import type {PerseusGraphType} from "@khanacademy/perseus-core";

jest.mock("@khanacademy/wonder-blocks-announcer", () => ({
    announceMessage: jest.fn(),
}));

// Simulate the real-world race condition: in the preview iframe, the `graph`
// prop changes type via async postMessage *before* the reducer state is rebuilt
// to match. We model that lag by no-op'ing the reinitialize hook so the reducer
// state keeps its old type after the `graph` prop changes type.
jest.mock("./use-reinitialize-on-graph-change", () => ({
    useReinitializeOnGraphChange: () => {},
}));

function baseProps(
    over: Partial<StatefulMafsGraphProps>,
): StatefulMafsGraphProps {
    const props: StatefulMafsGraphProps = {
        box: [400, 400],
        step: [1, 1],
        snapStep: [0.5, 0.5],
        gridStep: [1, 1],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {xMin: true, xMax: true, yMin: true, yMax: true},
        showAxisTicks: {x: true, y: true},
        markings: "graph",
        containerSizeClass: "small",
        onChange: () => {},
        showTooltips: false,
        showProtractor: false,
        readOnly: false,
        labels: ["x", "y"],
        graph: {type: "segment"},
        correct: {type: "segment"},
        static: false,
        lockedFigures: [],
        widgetId: "test-widget-id",
    };
    return {...props, ...over};
}

const pointGraph: PerseusGraphType = {
    type: "point",
    numPoints: 1,
    coords: [[1, 0]],
};

describe("StatefulMafsGraph onChange type-guard", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });
    afterEach(() => jest.restoreAllMocks());

    it("does not serialize state when its type lags behind the graph prop type", () => {
        // Arrange: a segment graph; reducer state starts as "segment".
        const onChange = jest.fn();
        const {rerender} = render(
            <StatefulMafsGraph {...baseProps({onChange})} />,
        );

        // Act: the graph prop becomes "point" (e.g. a type change posted to the
        // iframe) at the same time the snap step changes. The snap-step effect
        // produces a new reducer state that still has the old "segment" type,
        // while the graph prop is already "point". Without the type-guard, this
        // serializes a state/graph type mismatch and throws an invariant.
        const change = () =>
            rerender(
                <StatefulMafsGraph
                    {...baseProps({
                        onChange,
                        graph: pointGraph,
                        snapStep: [2.5, 0.5],
                        gridStep: [5, 1],
                    })}
                />,
            );

        // Assert: no invariant is thrown during the transient mismatch...
        expect(change).not.toThrow();

        // ...and onChange is never called with a type that mismatches the graph
        // prop it was generated against.
        for (const call of onChange.mock.calls) {
            expect(call[0].type).toBe("point");
        }
    });
});
