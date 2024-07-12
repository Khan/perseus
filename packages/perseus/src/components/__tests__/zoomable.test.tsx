import {describe, beforeEach, it} from "@jest/globals";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Zoomable from "../zoomable";

const mockSize = (
    el: HTMLElement | null | undefined,
    size: {
        height: number;
        width: number;
    },
) => {
    if (el) {
        jest.spyOn(el, "offsetWidth", "get").mockImplementation(
            () => size.width,
        );
        jest.spyOn(el, "offsetHeight", "get").mockImplementation(
            () => size.height,
        );
    }
};

// The zoomable does some measuring after the initial render to determine what
// its zoomed-out scaling should be. So on initial render, we want to wait for
// this process so that we "see" the settled component state.
const renderAndWaitToSettle = (component: React.ReactElement) => {
    const result = render(component);

    act(() => jest.runAllTimers());

    return result;
};

describe("Zoomable", () => {
    let userEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should render zoomed-out (scale != 1) initially", async () => {
        // Arrange and Act
        const {container} = renderAndWaitToSettle(
            <Zoomable readyToMeasure>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(0, 0); transform-origin: 0 0; opacity: 1; height: 0px; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should toggle to zoomed-in (scale == 1) when clicked", async () => {
        // Arrange
        const {container} = renderAndWaitToSettle(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Act
        await waitFor(async () => {
            await userEvent.click(screen.getByText("Some zoomable text"));
        });

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(1, 1); transform-origin: 0 0; opacity: 1; height: 1px; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should toggle back to zoomed-out state when clicked while zoomed in", async () => {
        // Arrange
        const {container} = renderAndWaitToSettle(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        await userEvent.click(screen.getByText("Some zoomable text"));
        act(() => jest.runOnlyPendingTimers());

        // Act
        await userEvent.click(screen.getByText("Some zoomable text"));
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(0, 0); transform-origin: 0 0; opacity: 1; height: 0px; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should use provided computeChildBounds function when zooming", async () => {
        // Arrange
        const computeChildBounds = jest.fn(() => ({width: 1000, height: 1000}));

        // Act
        renderAndWaitToSettle(
            <Zoomable computeChildBounds={computeChildBounds}>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Assert
        expect(computeChildBounds).toHaveBeenCalled();
    });

    it("should scale if computeChildBounds is larger than root node size", async () => {
        // Arrange
        // We don't use the renderAndWaitToSettle() helper here because we need
        // to mock _after_ initial render but _before_ the measuring stage
        // happens after that render!
        const {container} = render(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Parent node bounds
        // eslint-disable-next-line testing-library/no-node-access
        const rootNode = container.firstElementChild as HTMLElement;
        mockSize(rootNode, {width: 400, height: 100});

        // Child node bounds
        mockSize(screen.getByText("Some zoomable text"), {
            width: 800,
            height: 200,
        });

        // Act
        // The measure action uses a setState and setTimeout(0)
        act(() => jest.runAllTimers());

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(0.4993757802746567, 0.4993757802746567); transform-origin: 0 0; opacity: 1; height: 101px; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should not scale if computeChildBounds is smaller than root node size", async () => {
        // Arrange
        const {container} = render(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Parent node bounds
        // eslint-disable-next-line testing-library/no-node-access
        const rootNode = container.firstElementChild as HTMLElement;
        mockSize(rootNode, {width: 400, height: 100});

        // Child node bounds
        mockSize(screen.getByText("Some zoomable text"), {
            width: 100,
            height: 100,
        });

        // Act
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(1, 1); transform-origin: 0 0; opacity: 1; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should reset to initial state on window resize", async () => {
        // Arrange
        // Simulate window resize event
        const resizeWindowTo = (width: number, height: number) => {
            const resizeEvent = document.createEvent("Event");
            resizeEvent.initEvent("resize", true, true);

            window.innerWidth = width;
            window.innerHeight = height;
            window.dispatchEvent(resizeEvent);
        };

        render(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );
        // We need two cycles to get everything rendered and visible
        act(() => jest.runOnlyPendingTimers());
        act(() => jest.runOnlyPendingTimers());

        // Act
        act(() => resizeWindowTo(500, 500));

        // Assert
        // The children are initially displayed with an opacity of 0 to give
        // the component a chance to render and measure. Once that's done, the
        // content becomes visible. So intial state is invisible.
        expect(screen.queryByText("Some zoomable text")).not.toBeVisible();
    });

    it("should not call onClick prop when zoomed out (ie. initial render)", async () => {
        // Arrange
        const onClickHandler = jest.fn();
        renderAndWaitToSettle(
            <Zoomable>
                <span onClick={onClickHandler}>Some zoomable text</span>
            </Zoomable>,
        );

        // Act
        await userEvent.click(screen.getByText("Some zoomable text"));

        // Assert
        expect(onClickHandler).not.toHaveBeenCalled();
    });

    it("should call onClick prop when zoomed in", async () => {
        // Arrange
        const {rerender} = renderAndWaitToSettle(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );
        await userEvent.click(screen.getByText("Some zoomable text"));

        // Act
        const onClickHandler = jest.fn();
        rerender(
            <Zoomable>
                <span onClick={onClickHandler}>Some zoomable text</span>
            </Zoomable>,
        );
        await userEvent.click(screen.getByText("Some zoomable text"));

        // Assert
        expect(onClickHandler).toHaveBeenCalledTimes(1);
    });

    describe.each([
        ["onTouchStartCapture", fireEvent.touchStart],
        ["onTouchEndCapture", fireEvent.touchEnd],
        ["onTouchCancelCapture", fireEvent.touchCancel],
    ])("propogation of touch event: %s", (propName: string, eventFirer) => {
        it("should not propogate event to children when zoomed out", async () => {
            // Arrange
            const props: Record<string, any> = {};
            props[propName] = jest.fn();

            renderAndWaitToSettle(
                <Zoomable>
                    <span {...props}>Some zoomable text</span>
                </Zoomable>,
            );

            // Act
            eventFirer(screen.getByText("Some zoomable text"));
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(props[propName]).not.toHaveBeenCalled();
        });

        it("should propogate event to children when not zoomed", async () => {
            // Arrange
            const props: Record<string, any> = {};
            props[propName] = jest.fn();

            renderAndWaitToSettle(
                <Zoomable>
                    <span {...props}>Some zoomable text</span>
                </Zoomable>,
            );

            await userEvent.click(screen.getByText("Some zoomable text"));
            act(() => jest.runOnlyPendingTimers());

            // Act
            eventFirer(screen.getByText("Some zoomable text"));

            // Assert
            expect(props[propName]).toHaveBeenCalled();
        });
    });

    describe("child node mutations", () => {
        let computeChildBounds;
        let componentContainer;

        beforeEach(() => {
            // Arrange
            const sizes = [
                // First render
                {width: 100, height: 100},
                // Post-mutation render
                {width: 1000, height: 1000},
            ];
            computeChildBounds = jest.fn(() => sizes.shift());

            // eslint-disable-next-line testing-library/no-render-in-lifecycle
            const {container} = render(
                <Zoomable computeChildBounds={computeChildBounds}>
                    <span>Some zoomable text</span>
                </Zoomable>,
            );
            componentContainer = container;

            // eslint-disable-next-line testing-library/no-node-access
            const rootNode = container.firstElementChild as HTMLElement;
            mockSize(rootNode, {width: 200, height: 200});

            act(() => jest.runOnlyPendingTimers());
        });

        it("should update measurements", async () => {
            // Act
            screen.getByText("Some zoomable text").innerHTML =
                "Some more zoomable text";
            await waitFor(() => {
                screen.queryByText("Some more zoomable text");
            });

            // Assert
            expect(computeChildBounds).toHaveBeenCalledTimes(2);
            expect(componentContainer).toMatchInlineSnapshot(`
                <div>
                  <span
                    style="display: block; width: 100%; transform: scale(1, 1); transform-origin: 0 0; opacity: 1; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out; height: 1001px;"
                  >
                    <span>
                      Some more zoomable text
                    </span>
                  </span>
                </div>
            `);
        });

        it("should remain zoomed", async () => {
            // Arrange

            // Act
            screen.getByText("Some zoomable text").innerHTML =
                "Some more zoomable text";
            await waitFor(() => {
                screen.queryByText("Some more zoomable text");
            });

            // Assert
            expect(computeChildBounds).toHaveBeenCalledTimes(2);
            expect(componentContainer).toMatchInlineSnapshot(`
                <div>
                  <span
                    style="display: block; width: 100%; transform: scale(1, 1); transform-origin: 0 0; opacity: 1; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out; height: 1001px;"
                  >
                    <span>
                      Some more zoomable text
                    </span>
                  </span>
                </div>
            `);
        });

        it("should remain unzoomed", async () => {
            // Arrange
            // We default to "zoomed", so this "unzooms"
            await userEvent.click(screen.getByText("Some zoomable text"));
            act(() => jest.runOnlyPendingTimers());

            // Act
            screen.getByText("Some zoomable text").innerHTML =
                "Some more zoomable text";
            await waitFor(() => {
                screen.queryByText("Some more zoomable text");
            });

            // Assert
            expect(computeChildBounds).toHaveBeenCalledTimes(2);
            expect(componentContainer).toMatchInlineSnapshot(`
                <div>
                  <span
                    style="display: block; width: 100%; transform: scale(0.1998001998001998, 0.1998001998001998); transform-origin: 0 0; opacity: 1; transition-property: opacity transform; transition-duration: 0.3s; transition-timing-function: ease-out; height: 200px;"
                  >
                    <span>
                      Some more zoomable text
                    </span>
                  </span>
                </div>
            `);
        });
    });
});
