import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import {Mafs, Polygon} from "mafs";
import React from "react";

import {hasFocusVisible} from "./polygon";

import type {UserEvent} from "@testing-library/user-event";

describe("hasFocusVisible", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("returns true when polygon is focused", async () => {
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
        if (polygon) {
            await userEvent.tab();
            await userEvent.tab();
        }

        expect(polygon).toBeInTheDocument();
        expect(polygon).toHaveFocus();
        expect(hasFocusVisible(polygon)).toBe(true);
    });

    it("returns false when polygon is not focused", async () => {
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
        if (polygon) {
            await userEvent.tab();
        }

        expect(polygon).toBeInTheDocument();
        expect(polygon).not.toHaveFocus();
        expect(hasFocusVisible(polygon)).toBe(false);
    });
});
