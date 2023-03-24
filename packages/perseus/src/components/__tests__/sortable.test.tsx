import {render} from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom"; // Imports custom mathers

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
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
                layout="horizontal"
                options={["a", "b", "c"]}
                waitForKatexLoad={false}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot("first render");
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
                layout="horizontal"
                options={["a", "b", "c"]}
                waitForKatexLoad={false}
            />,
        );

        if (!sortable) {
            throw new Error("Failed to render");
        }

        // @ts-expect-error [FEI-5003] - TS2339 - Property 'moveOptionToIndex' does not exist on type 'never'.
        sortable.moveOptionToIndex("a", 1);

        // @ts-expect-error [FEI-5003] - TS2339 - Property 'getOptions' does not exist on type 'never'.
        expect(sortable?.getOptions()).toStrictEqual(["b", "a", "c"]);
    });

    it("throws an error when an item is out of bounds", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout="horizontal"
                options={["a", "b", "c"]}
                waitForKatexLoad={false}
            />,
        );

        if (!sortable) {
            throw new Error("Failed to render");
        }

        const underTest = () => sortable?.moveOptionToIndex("a", 99);

        expect(underTest).toThrowError();
    });

    it("throws an error when an item is out of bounds (negative)", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout="horizontal"
                options={["a", "b", "c"]}
                waitForKatexLoad={false}
            />,
        );

        if (!sortable) {
            throw new Error("Failed to render");
        }

        const underTest = () => sortable?.moveOptionToIndex("a", -1);

        expect(underTest).toThrowError();
    });

    it("throws an error when the item is not in the set", () => {
        let sortable: Sortable | null = null;

        render(
            <Sortable
                ref={(r) => (sortable = r)}
                layout="horizontal"
                options={["a", "b", "c"]}
                waitForKatexLoad={false}
            />,
        );

        if (!sortable) {
            throw new Error("Failed to render");
        }

        const underTest = () => sortable?.moveOptionToIndex("dog", 99);

        expect(underTest).toThrowError();
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
                "endPosition": {},
                "height": 0,
                "key": 0,
                "option": "a",
                "type": "static",
                "width": 0,
              },
              {
                "endPosition": {},
                "height": 0,
                "key": 1,
                "option": "b",
                "type": "static",
                "width": 0,
              },
              {
                "endPosition": {},
                "height": 0,
                "key": 2,
                "option": "c",
                "type": "static",
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
            expect(item.type).toBe("disabled");
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
            expect(item.type).toBe("static");
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
