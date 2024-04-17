import {render, screen} from "@testing-library/react";
import {Mafs} from "mafs";
import React from "react";

import * as ReducerGraphState from "../../reducer/use-graph-state";

import {StyledMovablePoint} from "./movable-point";

describe("StyledMovablePoint", () => {
    let useGraphStateMock;

    beforeEach(() => {
        useGraphStateMock = jest.spyOn(ReducerGraphState, "default");
    });

    /*  NOTE: When a WonderBlocks Tooltip is added to an element, it isn't rendered with the element.
              Instead, it is rendered elsewhere in the document (usually the bottom of the <body>),
                    and only when the user interacts with the element.
              This makes checking for the Tooltip element difficult to manage in a test.
              However, the tooltip does add an "aria-describedby" attribute to the targeted element.
              Therefore, these tests infer that a Tooltip has been added by looking at the "aria-describedby" attribute.
     */
    it("References a tooltip when option is indicated", () => {
        const graphStateContext = {
            state: {snapStep: 1} as any,
            dispatch: () => {},
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
            state: {snapStep: 1} as any,
            dispatch: () => {},
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
