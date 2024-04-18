import {render, screen} from "@testing-library/react";
import * as MafsLibrary from "mafs";
import React from "react";

import * as ReducerGraphState from "../../reducer/use-graph-state";

import {StyledMovablePoint} from "./movable-point";

jest.mock("mafs", () => {
    const originalModule = jest.requireActual("mafs");
    return {
        __esModule: true,
        ...originalModule,
        useMovable: jest.fn(),
    };
});

describe("StyledMovablePoint", () => {
    let useGraphStateMock: jest.SpyInstance;
    let useMovableMock: jest.SpyInstance;
    const Mafs = MafsLibrary.Mafs;
    const baseGraphStateContext = {
        state: {
            snapStep: 1,
            range: [
                [0, 0],
                [1, 1],
            ],
            markings: "foo",
        } as any,
        dispatch: () => {},
        graphOptions: {},
    };

    beforeEach(() => {
        useGraphStateMock = jest.spyOn(ReducerGraphState, "default");
        useMovableMock = jest
            .spyOn(MafsLibrary, "useMovable")
            .mockReturnValue({dragging: false});
    });

    describe("Tooltip", () => {
        /*  NOTE: When a WonderBlocks Tooltip is added to an element, it isn't rendered with the element.
                  Instead, it is rendered elsewhere in the document (usually the bottom of the <body>),
                        and only when the user interacts with the element.
                  This makes checking for the Tooltip element difficult to manage in a test.
                  However, the tooltip does add an "aria-describedby" attribute to the targeted element.
                  Therefore, these tests infer that a Tooltip has been added by looking at the "aria-describedby" attribute.
         */
        it("References a tooltip when option is indicated", () => {
            const graphStateContext = {
                ...baseGraphStateContext,
                graphOptions: {showTooltips: true},
            };
            useGraphStateMock.mockReturnValue(graphStateContext);
            render(
                <Mafs width={200} height={200}>
                    <StyledMovablePoint point={[0, 0]} onMove={() => {}} />,
                </Mafs>,
            );
            expect(screen.getByTestId("movable-point")).toHaveAttribute(
                "aria-describedby",
                "uid-tooltip-0-aria-content",
            );
        });

        it("Does NOT reference a tooltip when option is 'false'", () => {
            const graphStateContext = {
                ...baseGraphStateContext,
                graphOptions: {showTooltips: false},
            };
            useGraphStateMock.mockReturnValue(graphStateContext);
            render(
                <Mafs width={200} height={200}>
                    <StyledMovablePoint point={[0, 0]} onMove={() => {}} />,
                </Mafs>,
            );
            expect(screen.getByTestId("movable-point")).not.toHaveAttribute(
                "aria-describedby",
                "uid-tooltip-0-aria-content",
            );
        });
    });

    describe("Hairlines", () => {
        it("Shows hairlines when dragging and 'markings' are NOT set to 'none'", () => {
            useGraphStateMock.mockReturnValue(baseGraphStateContext);
            useMovableMock.mockReturnValue({dragging: true});
            const {container} = render(
                <Mafs width={200} height={200}>
                    <StyledMovablePoint point={[0, 0]} onMove={() => {}} />,
                </Mafs>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const svgGroups = container.querySelectorAll("svg > g");
            expect(svgGroups).toHaveLength(2);
            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = svgGroups[0].querySelectorAll("line");
            expect(hairLines).toHaveLength(2);
        });

        it("Hairlines do NOT show when not dragging", () => {
            useGraphStateMock.mockReturnValue(baseGraphStateContext);
            const {container} = render(
                <Mafs width={200} height={200}>
                    <StyledMovablePoint point={[0, 0]} onMove={() => {}} />,
                </Mafs>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const svgGroups = container.querySelectorAll("svg > g");
            expect(svgGroups).toHaveLength(1);
        });

        it("Hairlines do NOT show when 'markings' are set to 'none'", () => {
            const graphStateContext = {...baseGraphStateContext};
            graphStateContext.state.markings = "none";
            useGraphStateMock.mockReturnValue(graphStateContext);
            useMovableMock.mockReturnValue({dragging: true});
            const {container} = render(
                <Mafs width={200} height={200}>
                    <StyledMovablePoint point={[0, 0]} onMove={() => {}} />,
                </Mafs>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const svgGroups = container.querySelectorAll("svg > g");
            expect(svgGroups).toHaveLength(1);
        });
    });
});
