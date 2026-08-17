import {act, render, waitFor} from "@testing-library/react";
import * as React from "react";

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import Sortable from "../sortable";

/**
 * Puts a `document.fonts` under the test's control, with loading unfinished.
 *
 * jsdom implements no `FontFaceSet`, so there is no accessor to spy on — the
 * property has to be created outright. Callers must `delete document.fonts`
 * afterwards; nothing resets it automatically.
 *
 * Returns a function that announces a finished batch of font loads, which is
 * the signal the real `FontFaceSet` emits and the component listens for.
 */
function stubFontLoading(): () => void {
    // A real FontFaceSet is an EventTarget, which is the only part of it the
    // component touches, so the stub can be a plain one.
    // eslint-disable-next-line no-restricted-syntax
    const fonts = new EventTarget() as unknown as FontFaceSet;

    Object.defineProperty(document, "fonts", {
        value: fonts,
        configurable: true,
    });

    return () => fonts.dispatchEvent(new Event("loadingdone"));
}

describe("Sortable", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        // `Document.fonts` isn't optional, so removing the stub needs a cast.
        // eslint-disable-next-line no-restricted-syntax
        delete (document as {fonts?: FontFaceSet}).fonts;
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

    // A row's height is set by the line box around its content, which the
    // parent font's strut sizes. Measuring before that font loads makes every
    // row a few pixels too tall, and nothing re-renders when a font arrives, so
    // without this the wrong height sticks for the life of the component.
    //
    // The assertion is on `clearItemMeasurements` rather than on `onMeasure`
    // because jsdom reports every dimension as 0. That leaves the "dimensions
    // have been reset" branch of `componentDidUpdate` permanently true, so
    // `measureItems` re-runs on a loop here and its call count means nothing.
    it("measures items again once web fonts have loaded", async () => {
        // Arrange
        const fontsHaveLoaded = stubFontLoading();
        const clearMeasurements = jest.spyOn(Sortable, "clearItemMeasurements");

        render(
            <Sortable
                layout="vertical"
                options={["a", "b", "c"]}
                waitForTexRendererToLoad={false}
            />,
        );

        // Ignore the measuring the initial render does, so that what's left is
        // attributable to the fonts alone.
        await waitFor(() => expect(clearMeasurements).toHaveBeenCalled());
        clearMeasurements.mockClear();

        // Act
        act(() => fontsHaveLoaded());

        // Assert
        await waitFor(() => expect(clearMeasurements).toHaveBeenCalled());
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
