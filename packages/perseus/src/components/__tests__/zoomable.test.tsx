import {describe, beforeEach, it} from "@jest/globals";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import "@testing-library/jest-dom"; // Imports custom mathers

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

describe("Zoomable", () => {
    it("should snapshot", () => {
        // Arrange and Act
        const {container} = render(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(1, 1)  translate(0, 8px); transform-origin: 0 0; opacity: 0;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should toggle to zoomed state when clicked", () => {
        // Arrange
        const {container} = render(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        // Act
        userEvent.click(screen.getByText("Some zoomable text"));
        jest.runOnlyPendingTimers();

        // Assert
        expect(container).toMatchInlineSnapshot(`
            <div>
              <span
                style="display: block; width: 100%; transform: scale(0, 0)  translate(0, 8px); transform-origin: 0 0; opacity: 0; height: 0px;"
              >
                <span>
                  Some zoomable text
                </span>
              </span>
            </div>
        `);
    });

    it("should toggle to unzoomed state when clicked while zoomed", () => {
        // Arrange
        const {container} = render(
            <Zoomable>
                <span>Some zoomable text</span>
            </Zoomable>,
        );

        userEvent.click(screen.getByText("Some zoomable text"));
        jest.runOnlyPendingTimers();

        // Act
        userEvent.click(screen.getByText("Some zoomable text"));
        jest.runOnlyPendingTimers();

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

    it("should use provided computeChildBounds function when zooming", () => {
        // Arrange
        const computeChildBounds = jest.fn(() => ({width: 1000, height: 1000}));

        // Act
        render(
            <Zoomable computeChildBounds={computeChildBounds}>
                <span>Some zoomable text</span>
            </Zoomable>,
        );
        jest.runOnlyPendingTimers();

        // Assert
        expect(computeChildBounds).toHaveBeenCalled();
    });

    it("should scale if computeChildBounds is larger than root node size", () => {
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
            width: 800,
            height: 200,
        });

        // Act
        // The measure action uses a setState and setTimeout(0)
        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();

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

    it("should not scale if computeChildBounds is smaller than root node size", () => {
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
        jest.runOnlyPendingTimers();

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

    it("should reset to initial state on window resize", () => {
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
        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();

        // Act
        resizeWindowTo(500, 500);

        // Assert
        // The children are initially displayed with an opacity of 0 to give
        // the component a chance to render and measure. Once that's done, the
        // content becomes visible. So intial state is invisible.
        expect(screen.queryByText("Some zoomable text")).not.toBeVisible();
    });

    it("should toggle zoom if zoomed", () => {
        // Arrange
        const onClickHandler = jest.fn();
        let zoomable: Zoomable | null | undefined;
        render(
            <Zoomable ref={(c) => (zoomable = c)}>
                <span onClick={onClickHandler}>Some zoomable text</span>
            </Zoomable>,
        );
        userEvent.click(screen.getByText("Some zoomable text"));
        jest.runOnlyPendingTimers();
        onClickHandler.mockClear();

        // Act
        userEvent.click(screen.getByText("Some zoomable text"));
        jest.runOnlyPendingTimers();

        // Assert
        expect(onClickHandler).not.toHaveBeenCalled();
        expect(zoomable?.state.zoomed).toBeTrue();
    });

    describe.each([
        ["onTouchStartCapture", fireEvent.touchStart],
        ["onTouchEndCapture", fireEvent.touchEnd],
        ["onTouchCancelCapture", fireEvent.touchCancel],
    ])("propogation of touch event: %s", (propName: string, eventFirer) => {
        it("should not propogate event to children when zoomed", () => {
            // Arrange
            const props: Record<string, any> = {};
            props[propName] = jest.fn();

            render(
                <Zoomable>
                    <span {...props}>Some zoomable text</span>
                </Zoomable>,
            );
            userEvent.click(screen.getByText("Some zoomable text"));

            // Act
            eventFirer(screen.getByText("Some zoomable text"));
            jest.runOnlyPendingTimers();

            // Assert
            expect(props[propName]).not.toHaveBeenCalled();
        });

        it("should propogate event to children when not zoomed", () => {
            // Arrange
            const props: Record<string, any> = {};
            props[propName] = jest.fn();

            render(
                <Zoomable>
                    <span {...props}>Some zoomable text</span>
                </Zoomable>,
            );
            jest.runOnlyPendingTimers();
            userEvent.click(screen.getByText("Some zoomable text"));
            jest.runOnlyPendingTimers();

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

            // eslint-disable-next-line testing-library/no-render-in-setup
            const {container} = render(
                <Zoomable computeChildBounds={computeChildBounds}>
                    <span>Some zoomable text</span>
                </Zoomable>,
            );
            componentContainer = container;

            // eslint-disable-next-line testing-library/no-node-access
            const rootNode = container.firstElementChild as HTMLElement;
            mockSize(rootNode, {width: 200, height: 200});

            jest.runOnlyPendingTimers();
        });

        it("should update measurements", async () => {
            // Act
            screen.getByText("Some zoomable text").innerHTML =
                "Some more zoomable text";
            await waitFor(() => {
                screen.getByText("Some more zoomable text");
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
                screen.getByText("Some more zoomable text");
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
            userEvent.click(screen.getByText("Some zoomable text"));
            jest.runOnlyPendingTimers();

            // Act
            screen.getByText("Some zoomable text").innerHTML =
                "Some more zoomable text";
            await waitFor(() => {
                screen.getByText("Some more zoomable text");
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
