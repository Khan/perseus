import {act, render} from "@testing-library/react";
import $ from "jquery";
import * as React from "react";

import AssetContext from "../../asset-context";
import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import Sortable from "../sortable";

describe("Sortable", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = render(
            <Sortable
                layout={"horizontal"}
                options={["a", "b", "c"]}
                waitForTexRendererToLoad={false}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("renders a spinner while waiting for the TeX renderer to load", () => {
        let simulateFakeTeXRendering = () => {};
        function FakeTeX({
            children,
            onRender,
        }: {
            children: string;
            onRender?: () => unknown;
        }) {
            simulateFakeTeXRendering = onRender || simulateFakeTeXRendering;
            return <div className="fake-tex">{children}</div>;
        }
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: FakeTeX,
        });

        // Act
        const {container} = render(
            <Sortable
                waitForTexRendererToLoad={true}
                layout={"horizontal"}
                options={["a", "b", "c"]}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot("first render: displays a spinner");

        // Act
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => simulateFakeTeXRendering());

        // Assert
        expect(container).toMatchSnapshot(
            "second render: displays the sortable",
        );
    });
});

describe("moveOptionToIndex", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("rearranges items", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout={"horizontal"}
                options={["a", "b", "c"]}
                waitForTexRendererToLoad={false}
            />,
        );

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!sortable) {
            throw new Error("Failed to render");
        }

        // @ts-expect-error - TS2339 - Property 'moveOptionToIndex' does not exist on type 'never'.
        act(() => sortable.moveOptionToIndex("a", 1));

        // @ts-expect-error - TS2339 - Property 'getOptions' does not exist on type 'never'.
        expect(sortable?.getOptions()).toStrictEqual(["b", "a", "c"]);
    });

    it("throws an error when an item is out of bounds", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout={"horizontal"}
                options={["a", "b", "c"]}
                waitForTexRendererToLoad={false}
            />,
        );

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!sortable) {
            throw new Error("Failed to render");
        }

        const underTest = () => sortable?.moveOptionToIndex("a", 99);

        expect(underTest).toThrow();
    });

    it("throws an error when an item is out of bounds (negative)", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout={"horizontal"}
                options={["a", "b", "c"]}
                waitForTexRendererToLoad={false}
            />,
        );

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!sortable) {
            throw new Error("Failed to render");
        }

        const underTest = () => sortable?.moveOptionToIndex("a", -1);

        expect(underTest).toThrow();
    });

    it("throws an error when the item is not in the set", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout={"horizontal"}
                options={["a", "b", "c"]}
                waitForTexRendererToLoad={false}
            />,
        );

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!sortable) {
            throw new Error("Failed to render");
        }

        const underTest = () => sortable?.moveOptionToIndex("dog", 99);

        expect(underTest).toThrow();
    });
});

describe("Sortable.itemsFromProps", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("builds a sortable item", () => {
        // Arrange
        const props = {
            disabled: false,
            options: ["a", "b", "c"],
        } as const;

        // Act
        const items = Sortable.itemsFromProps(props);

        // Assert
        expect(items).toMatchInlineSnapshot(`
            [
              {
                "height": 0,
                "key": 0,
                "option": "a",
                "state": "static",
                "width": 0,
              },
              {
                "height": 0,
                "key": 1,
                "option": "b",
                "state": "static",
                "width": 0,
              },
              {
                "height": 0,
                "key": 2,
                "option": "c",
                "state": "static",
                "width": 0,
              },
            ]
        `);
    });

    it("disables the items if disabled is true", () => {
        // Arrange
        const props = {
            options: ["a", "b", "c"],
            disabled: true,
        } as const;

        // Act
        const items = Sortable.itemsFromProps(props);

        // Assert
        items.forEach((item) => {
            expect(item.state).toBe("disabled");
        });
    });
    it("sets the item type to static if disabled is false", () => {
        // Arrange
        const props = {
            options: ["a", "b", "c"],
            disabled: false,
        } as const;

        // Act
        const items = Sortable.itemsFromProps(props);

        // Assert
        items.forEach((item) => {
            expect(item.state).toBe("static");
        });
    });
});

describe("Sortable.clearItemMeasurements", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("resets items measurements", () => {
        const props = {
            options: ["a", "b", "c"],
            disabled: true,
        } as const;

        const items = Sortable.itemsFromProps(props).map((item) => {
            return {
                ...item,
                height: 100,
                width: 100,
            };
        });

        // Act
        const resetItems = Sortable.clearItemMeasurements(items);

        resetItems.forEach((item) => {
            expect(item.width).toBe(0);
            expect(item.height).toBe(0);
        });
    });
});

describe("Sortable AssetContext integration", () => {
    let setAssetStatus: jest.Mock;

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        // jsdom returns 0 for layout properties. Without non-zero dimensions,
        // componentDidUpdate's reset condition (!width && !height) is always
        // true, creating an infinite measure loop that prevents the quiescence
        // timer from ever firing. Mocking these mirrors what production DOM
        // gives us — measurements stabilize after one pass.
        jest.spyOn($.fn, "outerWidth").mockReturnValue(100);
        jest.spyOn($.fn, "outerHeight").mockReturnValue(50);
        setAssetStatus = jest.fn();
    });

    function renderInContext(
        options: ReadonlyArray<string> = ["a", "b", "c"],
    ): {sortable: Sortable; unmount: () => void} {
        let sortable: Sortable | null = null;
        const {unmount} = render(
            <AssetContext.Provider value={{assetStatuses: {}, setAssetStatus}}>
                <Sortable
                    ref={(r) => (sortable = r)}
                    layout="horizontal"
                    options={options}
                    waitForTexRendererToLoad={false}
                />
            </AssetContext.Provider>,
        );
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!sortable) {
            throw new Error("Failed to render Sortable");
        }
        return {sortable, unmount};
    }

    // Force a measurement pass via the imperative API. We call measureItems
    // directly (rather than driving it via setTimeout(0) inside componentDid-
    // Update) because React 18's setState commit happens in a microtask that
    // jest's fake timers don't flush — so the setState callback inside
    // measureItems would otherwise never run, and the quiescence timer would
    // never be scheduled. act() forces React to flush synchronously.
    function triggerMeasurement(sortable: Sortable) {
        act(() => {
            sortable.measureItems();
        });
    }

    it("registers itself as not-loaded when mounting", () => {
        // Arrange, Act
        renderInContext();

        // Assert
        expect(setAssetStatus).toHaveBeenCalledWith(
            expect.stringMatching(/^sortable-\d+$/),
            false,
        );
    });

    it("marks itself loaded after the quiescence window", () => {
        // Arrange
        const {sortable} = renderInContext();
        const key = setAssetStatus.mock.calls[0][0];

        // Act
        triggerMeasurement(sortable);
        act(() => {
            jest.advanceTimersByTime(50);
        });

        // Assert
        expect(setAssetStatus).toHaveBeenLastCalledWith(key, true);
    });

    it("does not mark itself loaded before the quiescence window expires", () => {
        // Arrange
        const {sortable} = renderInContext();
        const key = setAssetStatus.mock.calls[0][0];

        // Act
        triggerMeasurement(sortable);
        act(() => {
            jest.advanceTimersByTime(49);
        });

        // Assert
        expect(setAssetStatus).not.toHaveBeenCalledWith(key, true);
    });

    it("does not settle when a new measurement arrives mid-window", () => {
        // Arrange
        const {sortable} = renderInContext();
        const key = setAssetStatus.mock.calls[0][0];

        // Act: first measurement schedules a 50ms timer, then partway
        // through the window a second measurement arrives, which should
        // reset the timer to a fresh 50ms window. Total clock reaches 50ms,
        // which would have fired the original timer if reset weren't working.
        triggerMeasurement(sortable);
        act(() => {
            jest.advanceTimersByTime(30);
        });
        triggerMeasurement(sortable);
        act(() => {
            jest.advanceTimersByTime(20);
        });

        // Assert
        expect(setAssetStatus).not.toHaveBeenCalledWith(key, true);
    });

    it("settles after the new deadline when a measurement resets the timer", () => {
        // Arrange
        const {sortable} = renderInContext();
        const key = setAssetStatus.mock.calls[0][0];

        // Act: measurement, partial wait, second measurement resets the
        // timer, then advance well past the new deadline.
        triggerMeasurement(sortable);
        act(() => {
            jest.advanceTimersByTime(30);
        });
        triggerMeasurement(sortable);
        act(() => {
            jest.advanceTimersByTime(120);
        });

        // Assert
        expect(setAssetStatus).toHaveBeenCalledWith(key, true);
    });

    it("marks itself loaded on unmount", () => {
        // Arrange
        const {sortable, unmount} = renderInContext();
        const key = setAssetStatus.mock.calls[0][0];
        triggerMeasurement(sortable);
        setAssetStatus.mockClear();

        // Act
        unmount();

        // Assert
        expect(setAssetStatus).toHaveBeenCalledWith(key, true);
    });

    it("clears the pending quiescence timer on unmount", () => {
        // Arrange: schedule the quiescence timer but unmount before it fires.
        const {sortable, unmount} = renderInContext();
        triggerMeasurement(sortable);

        // Act
        unmount();
        const callCountAfterUnmount = setAssetStatus.mock.calls.length;
        act(() => {
            jest.advanceTimersByTime(100);
        });

        // Assert: the cleared timer did not call setAssetStatus again.
        expect(setAssetStatus).toHaveBeenCalledTimes(callCountAfterUnmount);
    });
});
