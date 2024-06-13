import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {flags} from "../../__stories__/flags-for-api-options";
import {getDefaultFigureForType} from "../../components/util";
import InteractiveGraphEditor from "../interactive-graph-editor";

import type {PerseusGraphType} from "@khanacademy/perseus";

const baseProps = {
    apiOptions: ApiOptions.defaults,
    box: [288, 288] as [number, number],
    gridStep: [1, 1] as [number, number],
    snapStep: [1, 1] as [number, number],
    onChange: () => {},
    graph: undefined,
};

const mafsProps = {
    ...baseProps,
    apiOptions: {
        ...ApiOptions.defaults,
        flags,
    },
    graph: {type: "segment"} as PerseusGraphType,
};

describe("InteractiveGraphEditor getSaveWarnings", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test.each`
        lockedFigureType
        ${"point"}
        ${"line"}
        ${"ellipse"}
        ${"vector"}`("empty if there are no errors for $lockedFigureType", ({lockedFigureType}) => {
            // Arrange
            jest.spyOn(React, "useRef").mockReturnValue({
                current: null,
            });
            const ref = React.useRef<InteractiveGraphEditor>(null);

            // Act
            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    graph={{type: "segment"}}
                    correct={{type: "segment"}}
                    lockedFigures={[
                        {
                            ...getDefaultFigureForType(lockedFigureType),
                        },
                    ]}
                    ref={ref}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            expect(ref.current?.getSaveWarnings()).toEqual([]);

        });

    describe("locked point", () => {
        test("returns an error when a locked point is out of range", async () => {
            // Arrange
            jest.spyOn(React, "useRef").mockReturnValue({
                current: null,
            });
            const ref = React.useRef<InteractiveGraphEditor>(null);

            // Act
            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    graph={{type: "segment"}}
                    correct={{type: "segment"}}
                    lockedFigures={[
                        {
                            ...getDefaultFigureForType("point"),
                            coord: [-50, 5],
                        },
                    ]}
                    ref={ref}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            expect(ref.current?.getSaveWarnings()).toEqual([
                "The locked point's x coordinate must be within the graph's range.",
            ]);
        });
    });

    describe("locked line", () => {
        test("returns an error when the line is out of range", async () => {
            // Arrange
            jest.spyOn(React, "useRef").mockReturnValue({
                current: null,
            });
            const ref = React.useRef<InteractiveGraphEditor>(null);

            // Act
            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    graph={{type: "segment"}}
                    correct={{type: "segment"}}
                    lockedFigures={[
                        {
                            ...getDefaultFigureForType("line"),
                            points: [
                                {
                                    ...getDefaultFigureForType("point"),
                                    coord: [-50, 5],
                                },
                                {
                                    ...getDefaultFigureForType("point"),
                                    coord: [5, 5],
                                },
                            ],
                        },
                    ]}
                    ref={ref}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            expect(ref.current?.getSaveWarnings()).toEqual([
                "The locked line must be within the graph's range.",
            ]);
        });

        test("returns an error when a locked line has length 0", async () => {
            // Arrange
            jest.spyOn(React, "useRef").mockReturnValue({
                current: null,
            });
            const ref = React.useRef<InteractiveGraphEditor>(null);

            // Act
            render(
                <InteractiveGraphEditor
                    {...mafsProps}
                    graph={{type: "segment"}}
                    correct={{type: "segment"}}
                    lockedFigures={[
                        {
                            ...getDefaultFigureForType("line"),
                            points: [
                                // Line has length 0
                                getDefaultFigureForType("point"),
                                getDefaultFigureForType("point"),
                            ],
                        },
                    ]}
                    ref={ref}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Assert
            expect(ref.current?.getSaveWarnings()).toEqual([
                "The locked line cannot have length 0.",
            ]);
        });
    });
});