import {fireEvent, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs, Polygon} from "mafs";
import React from "react";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";

import {hasFocusVisible} from "./polygon";

import type {UserEvent} from "@testing-library/user-event/index";

describe("hasFocusVisible", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("puts polygon in the document", async () => {
        const ref = React.createRef<SVGPolygonElement>();
        render(
            <Mafs width={200} height={200}>
                <Polygon
                    points={[
                        [0, 0],
                        [0, 2],
                        [2, 2],
                        [2, 0],
                    ]}
                    svgPolygonProps={{
                        ref,
                        tabIndex: 0,
                    }}
                />
            </Mafs>,
        );
        const polygon = ref.current;
        // await userEvent.tab();
        expect(polygon).toBeInTheDocument();
    });

    it("returns true when polygon is focused", async () => {
        const ref = React.createRef<SVGPolygonElement>();
        const {container, baseElement} = render(
            <Mafs width={200} height={200}>
                <Polygon
                    points={[
                        [0, 0],
                        [0, 2],
                        [2, 2],
                        [2, 0],
                    ]}
                    svgPolygonProps={{
                        ref,
                    }}
                />
            </Mafs>,
        );
        const polygon = ref.current;
        if (polygon) {
            // Two potential ways to focus polygon
            // await userEvent.click(container);
            // await userEvent.keyboard("{arrowdown}");
            // fireEvent.focus(polygon);
            // await userEvent.tab({shift: true});
            // await userEvent.tab({shift: true});
            // await userEvent.tab({shift: true});
            await userEvent.tab();

            await userEvent.tab();
            await userEvent.tab();

            console.log("Polygon focused:", document.activeElement === polygon);
        }
        // await userEvent.tab();
        expect(polygon).toBeInTheDocument(); // Passes
        expect(document.activeElement).toHaveFocus();
        expect(hasFocusVisible(document.activeElement)).toBe(true); // Fails
    });
});

// It seems like the lines don't darken when you tab to the shape anymore.
// Clicking off of the shape doesn't remove focus either
