import {render, screen} from "@testing-library/react";
import {
    type UserEvent,
    userEvent as userEventLib,
} from "@testing-library/user-event";
import {Mafs} from "mafs";
import React from "react";

import * as ReducerGraphConfig from "../../reducer/use-graph-config";
import * as UseDraggableModule from "../use-draggable";

import {MovablePoint} from "./movable-point";

import type {GraphConfig} from "../../reducer/use-graph-config";

jest.mock("@khanacademy/wonder-blocks-tooltip", () => {
    const originalModule = jest.requireActual(
        "@khanacademy/wonder-blocks-tooltip",
    );

    return {
        ...originalModule,
        __esModule: true,
        default: function MockToolTip({children, ...props}) {
            /*
            NOTE: When a WonderBlocks Tooltip is added to an element, it isn't
                  rendered with the element. Instead, it is rendered elsewhere
                  in the document (usually the bottom of the <body>), and only
                  when the user interacts with the element. This makes checking
                  for the Tooltip element difficult to manage in a test.
                  Therefore, these tests mock the Tooltip component and check
                  if/how it is called.
            */
            return (
                <div {...props} data-testid="tooltip-content-for-test">
                    {children}
                </div>
            );
        },
    };
});

function mockGraphConfig(config) {
    return jest.spyOn(ReducerGraphConfig, "default").mockReturnValue(config);
}

function mockDraggingState(state) {
    return jest
        .spyOn(UseDraggableModule, "useDraggable")
        .mockReturnValue(state ?? {dragging: false});
}

describe("MovablePoint", () => {
    const baseGraphConfigContext: GraphConfig = {
        range: [
            [0, 1],
            [0, 1],
        ],
        tickStep: [1, 1],
        gridStep: [1, 1],
        snapStep: [1, 1],
        markings: "graph",
        showTooltips: false,
        graphDimensionsInPixels: [200, 200],
        width: 200,
        height: 200,
        labels: [],
    };

    const graphConfigContextWithTooltips = {
        ...baseGraphConfigContext,
        showTooltips: true,
    };

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    describe("Tooltip", () => {
        it("References a tooltip when option is indicated", () => {
            mockGraphConfig(graphConfigContextWithTooltips);
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );
            expect(
                screen.getByTestId("tooltip-content-for-test"),
            ).toBeInTheDocument();
        });

        it("Does NOT reference a tooltip when option is 'false'", async () => {
            mockGraphConfig(baseGraphConfigContext);
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );
            expect(screen.queryByTestId("tooltip-content-for-test")).toBeNull();
        });

        it("Defaults to a 'blue' background by default", () => {
            mockGraphConfig(graphConfigContextWithTooltips);
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            expect(
                screen.queryByTestId("tooltip-content-for-test"),
            ).toHaveAttribute("backgroundColor", "blue");
        });

        it("Uses 'fadedOffBlack64' background when the point is disabled", () => {
            mockGraphConfig({
                ...graphConfigContextWithTooltips,
                disableKeyboardInteraction: true,
            });
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        color="#f00"
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            expect(
                screen.queryByTestId("tooltip-content-for-test"),
            ).toHaveAttribute("backgroundColor", "fadedOffBlack64");
        });
    });

    describe("Hairlines", () => {
        it("Shows hairlines when dragging and 'markings' are NOT set to 'none'", () => {
            mockGraphConfig(baseGraphConfigContext);
            mockDraggingState({dragging: true});
            const {container} = render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = container.querySelectorAll("svg line");
            expect(hairLines).toHaveLength(2);
        });

        it("Shows hairlines when focused via keyboard and 'markings' are NOT set to 'none'", async () => {
            mockGraphConfig(baseGraphConfigContext);
            const {container} = render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            // Tab to the graph first.
            await userEvent.tab();
            // Tab to the point to give it focus.
            await userEvent.tab();

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = container.querySelectorAll("svg line");
            expect(hairLines).toHaveLength(2);
        });

        it("Shows hairlines when focused via click and 'markings' are NOT set to 'none'", async () => {
            mockGraphConfig(baseGraphConfigContext);
            const {container} = render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        ariaLabel="point-label"
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            const point = screen.getByLabelText("point-label");
            await userEvent.click(point);

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = container.querySelectorAll("svg line");
            expect(hairLines).toHaveLength(2);
        });

        it("Hairlines do NOT show when not dragging and not focused", () => {
            mockGraphConfig(baseGraphConfigContext);
            const {container} = render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = container.querySelectorAll("svg line");
            expect(hairLines).toHaveLength(0);
        });

        it("Hairlines do NOT show when dragging and 'markings' are set to 'none'", () => {
            const graphStateContext = {...baseGraphConfigContext};
            graphStateContext.markings = "none";
            mockGraphConfig(graphStateContext);
            mockDraggingState({dragging: true});
            const {container} = render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = container.querySelectorAll("svg line");
            expect(hairLines).toHaveLength(0);
        });

        it("Hairlines do NOT show when focused and 'markings' are set to 'none'", async () => {
            const graphStateContext = {...baseGraphConfigContext};
            graphStateContext.markings = "none";
            mockGraphConfig(graphStateContext);
            const {container} = render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        onMove={() => {}}
                    />
                </Mafs>,
            );

            // Tab to the graph first.
            await userEvent.tab();
            // Tab to the point to give it focus.
            await userEvent.tab();

            // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
            const hairLines = container.querySelectorAll("svg line");
            expect(hairLines).toHaveLength(0);
        });
    });

    it("calls onFocus() when you tab to it", async () => {
        const focusSpy = jest.fn();
        render(
            <Mafs width={200} height={200}>
                <MovablePoint
                    point={[0, 0]}
                    sequenceNumber={1}
                    onFocus={focusSpy}
                />
                ,
            </Mafs>,
        );

        expect(focusSpy).not.toHaveBeenCalled();

        await userEvent.tab(); // tab to the graph
        await userEvent.tab(); // tab to the point

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur() when you tab away from it", async () => {
        const blurSpy = jest.fn();
        render(
            <Mafs width={200} height={200}>
                <MovablePoint
                    point={[0, 0]}
                    sequenceNumber={1}
                    onBlur={blurSpy}
                />
                ,
            </Mafs>,
        );

        expect(blurSpy).not.toHaveBeenCalled();

        await userEvent.tab(); // tab to the graph
        await userEvent.tab(); // tab to the point
        await userEvent.tab(); // tab away

        expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    it("calls onFocusChange(true) when you click it", async () => {
        const focusSpy = jest.fn();
        render(
            <Mafs width={200} height={200}>
                <MovablePoint
                    point={[0, 0]}
                    sequenceNumber={1}
                    onFocus={focusSpy}
                />
            </Mafs>,
        );

        expect(focusSpy).not.toHaveBeenCalled();

        await userEvent.click(screen.getByTestId("movable-point"));

        expect(focusSpy).toHaveBeenCalled();
    });

    describe("accessibility", () => {
        it("uses the default sequence number when ariaLabel and sequence number are not provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint point={[0, 0]} />
                </Mafs>,
            );

            expect(
                screen.getByLabelText("Point 1 at 0 comma 0."),
            ).toBeInTheDocument();
        });

        it("uses sequence number when sequence is provided and aria label is not provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint point={[0, 0]} sequenceNumber={2} />
                </Mafs>,
            );

            expect(
                screen.getByLabelText("Point 2 at 0 comma 0."),
            ).toBeInTheDocument();
        });

        it("uses the ariaLabel when both sequence and ariaLabel are provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        sequenceNumber={1}
                        ariaLabel="Aria Label being used instead of sequence number"
                    />
                </Mafs>,
            );

            expect(
                screen.getByLabelText(
                    "Aria Label being used instead of sequence number",
                ),
            ).toBeInTheDocument();
        });

        it("uses the ariaLabel when only ariaLabel is provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        ariaLabel="Custom aria label"
                    />
                </Mafs>,
            );

            expect(
                screen.getByLabelText("Custom aria label"),
            ).toBeInTheDocument();
        });

        it("uses the ariaDescribedBy when provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint
                        point={[0, 0]}
                        ariaDescribedBy="description"
                    />
                    <p id="description">Aria is described by me</p>
                </Mafs>,
            );

            const pointElement = screen.getByRole("button", {
                name: "Point 1 at 0 comma 0.",
            });
            expect(pointElement).toHaveAttribute(
                "aria-describedby",
                "description",
            );

            const descriptionElement = screen.getByText(
                "Aria is described by me",
            );
            expect(descriptionElement).toBeInTheDocument();
        });

        it("uses the ariaLive when provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint point={[0, 0]} ariaLive="assertive" />
                </Mafs>,
            );

            expect(
                screen.getByLabelText("Point 1 at 0 comma 0."),
            ).toHaveAttribute("aria-live", "assertive");
        });

        it("uses the default ariaLive when not provided", () => {
            render(
                <Mafs width={200} height={200}>
                    <MovablePoint point={[0, 0]} />
                </Mafs>,
            );

            expect(
                screen.getByLabelText("Point 1 at 0 comma 0."),
            ).toHaveAttribute("aria-live", "polite");
        });
    });
});
