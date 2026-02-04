import $ from "jquery";
import Raphael from "raphael";

import * as Dependencies from "../dependencies";
import {testDependencies} from "../testing/test-dependencies";

import GraphUtils, {normalizeRange} from "./graphie";

import type {Graphie} from "./graphie";

function createMockRaphaelElement(name = "mockRaphaelElement") {
    return {
        constructor: {prototype: Raphael.el},
        attr: jest.fn().mockName(`${name}.attr`),
    };
}

function createMockRaphael() {
    return {
        setSize: jest.fn().mockName("raphael.setSize"),
        ellipse: jest.fn().mockName("raphael.ellipse"),
        rect: jest.fn().mockName("raphael.rect"),
        path: jest.fn().mockName("raphael.path"),
        set: jest
            .fn()
            .mockName("raphael.set")
            .mockImplementation(createFakeRaphaelSet),
    };
}

function createFakeRaphaelSet() {
    const contents: any[] = [];
    return {
        constructor: {prototype: Raphael.st},
        push(...items) {
            return contents.push(...items);
        },
        attr: jest.fn().mockName("raphael.set().attr"),
    };
}

function createAndInitGraphie(): Graphie {
    const graphie = GraphUtils.createGraphie(document.createElement("div"));
    graphie.raphael = createMockRaphael();

    // The graph is 50px by 50px
    graphie.init({
        range: [
            [0, 10],
            [0, 10],
        ],
        scale: 5,
        isMobile: false,
    });

    return graphie;
}

describe("Graphie drawing tools", () => {
    it("sets the canvas size when initialized", () => {
        const graphie = createAndInitGraphie();
        expect(graphie.raphael.setSize).toHaveBeenCalledWith(50, 50);
    });

    describe("circle", () => {
        it("uses the given center and radius", () => {
            const graphie = createAndInitGraphie();

            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.circle([1, 2], 3);

            expect(graphie.raphael.ellipse).toHaveBeenCalledWith(5, 40, 15, 15);
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();

            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.circle([0, 0], 1, {fill: "#112233", stroke: "#445566"});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    fill: "#112233",
                    stroke: "#445566",
                }),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.circle([0, 0], 1);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                // The defaults
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();

            const mockRaphaelElement1 = createMockRaphaelElement(
                "mockRaphaelElement1",
            );
            const mockRaphaelElement2 = createMockRaphaelElement(
                "mockRaphaelElement2",
            );
            graphie.raphael.ellipse.mockReturnValueOnce(mockRaphaelElement1);
            graphie.raphael.ellipse.mockReturnValueOnce(mockRaphaelElement2);

            graphie.circle([0, 0], 1, {fill: "#112233", stroke: "#445566"});
            graphie.circle([0, 0], 1);

            expect(mockRaphaelElement2.attr.mock.calls).toEqual([
                [
                    {
                        fill: "none",
                        "stroke-width": 2,
                    },
                ],
            ]);
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.circle([0, 0], 1, {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            const result = graphie.circle([0, 0], 1);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("rect", () => {
        it("uses the given bottom left corner, width, and height", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.rect.mockReturnValue(mockRaphaelElement);

            graphie.rect(1, 2, 3, 4);

            // Raphael.rect() takes the *top*-left corner of the rectangle in
            // pixel coordinates.
            expect(graphie.raphael.rect).toHaveBeenCalledWith(5, 20, 15, 20);
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.rect.mockReturnValue(mockRaphaelElement);

            graphie.rect(0, 0, 1, 1, {fill: "#112233", stroke: "#445566"});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    fill: "#112233",
                    stroke: "#445566",
                }),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.rect.mockReturnValue(mockRaphaelElement);

            graphie.rect(0, 0, 1, 1);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.rect.mockReturnValueOnce(el1);
            graphie.raphael.rect.mockReturnValueOnce(el2);

            graphie.rect(0, 0, 1, 1, {fill: "#123456"});
            graphie.rect(0, 0, 1, 1);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.rect.mockReturnValueOnce(mockRaphaelElement);

            graphie.rect(0, 0, 1, 1, {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.rect.mockReturnValueOnce(mockRaphaelElement);

            const result = graphie.rect(0, 0, 1, 1);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("ellipse", () => {
        it("uses the given center and radii", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.ellipse([1, 2], [3, 4]);

            expect(graphie.raphael.ellipse).toHaveBeenCalledWith(5, 40, 15, 20);
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.ellipse([0, 0], [1, 1], {fill: "#123456"});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    fill: "#123456",
                }),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.ellipse([0, 0], [1, 1]);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.ellipse.mockReturnValueOnce(el1);
            graphie.raphael.ellipse.mockReturnValueOnce(el2);

            graphie.ellipse([0, 0], [1, 1], {fill: "#123456"});
            graphie.ellipse([0, 0], [1, 1]);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.ellipse([0, 0], [1, 1], {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            const result = graphie.ellipse([0, 0], [1, 1]);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("fixedEllipse", () => {
        it("uses the given center and radii to position and size the wrapper element", () => {
            const graphie = createAndInitGraphie();

            const {wrapper, visibleShape} = graphie.fixedEllipse(
                [1, 2],
                [3, 4],
                1,
                0,
            );

            expect(wrapper.style.width).toBe("30px");
            expect(wrapper.style.height).toBe("40px");
            expect(wrapper.style.top).toBe("20px");
            expect(wrapper.style.left).toBe("-10px");
            expect(visibleShape.attrs).toEqual(
                expect.objectContaining({
                    cx: 15,
                    cy: 20,
                    rx: 15,
                    ry: 20,
                }),
            );
            expect(visibleShape.type).toBe("ellipse");
        });
    });

    describe("arc", () => {
        it("uses the given center, radius, and angles", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.arc([0, 0], [1, 1], 0, 90, false);

            expect(graphie.raphael.path).toHaveBeenCalledWith(
                "M5 50A5 5 0 0 0 0 45",
            );
        });

        it("draws an arc larger than 180 degrees", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.arc([0, 0], [1, 1], 0, 270, false);

            expect(graphie.raphael.path).toHaveBeenCalledWith(
                "M5 50A5 5 0 1 0 0 55",
            );
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.arc([0, 0], [1, 1], 0, 90, false, {
                fill: "#112233",
                stroke: "#445566",
            });

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    fill: "#112233",
                    stroke: "#445566",
                }),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.arc([0, 0], [1, 1], 0, 90, false);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.path.mockReturnValue(el1);
            graphie.raphael.path.mockReturnValue(el2);

            graphie.arc([0, 0], [1, 1], 0, 90, false, {fill: "#112233"});
            graphie.arc([0, 0], [1, 1], 0, 90, false);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.arc([0, 0], [1, 1], 0, 90, false, {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            const result = graphie.arc([0, 0], [1, 1], 0, 90, false);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("path", () => {
        it("draws an SVG path connecting the given points", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.path([
                [0, 0],
                [1, 1],
            ]);

            expect(graphie.raphael.path).toHaveBeenCalledWith("M0 50L5 45");
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.path(
                [
                    [0, 0],
                    [1, 1],
                ],
                {fill: "#112233"},
            );

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    fill: "#112233",
                }),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.path([
                [0, 0],
                [1, 1],
            ]);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.path.mockReturnValueOnce(el1);
            graphie.raphael.path.mockReturnValueOnce(el2);

            graphie.path(
                [
                    [0, 0],
                    [1, 1],
                ],
                {fill: "#999999"},
            );
            graphie.path([
                [0, 0],
                [1, 1],
            ]);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.path(
                [
                    [0, 0],
                    [1, 1],
                ],
                {strokeWidth: 42},
            );

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            const result = graphie.path([
                [0, 0],
                [1, 1],
            ]);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("fixedPath", () => {
        it("creates a container element the size of the path, with 2px padding on each side", () => {
            const graphie = createAndInitGraphie();

            const {wrapper, visibleShape} = graphie.fixedPath(
                [
                    [0, 0],
                    [1, 1],
                ],
                [0, 0],
                (points) => "M" + points.map(([x, y]) => `${x},${y}`).join("L"),
            );

            expect(wrapper.style.position).toBe("absolute");
            expect(wrapper.style.top).toBe("43px");
            expect(wrapper.style.left).toBe("-2px");
            expect(wrapper.style.height).toBe("9px");
            expect(wrapper.style.width).toBe("9px");
            expect(visibleShape[0].getAttribute("d")).toBe("M2,7L7,2");
        });
    });

    describe("scaledPath", () => {
        it("creates a path from points specified *in pixel coordinates*", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());

            graphie.scaledPath([
                [3, 42],
                [5, 7],
            ]);

            expect(graphie.raphael.path).toHaveBeenCalledWith("M3 42L5 7");
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.scaledPath(
                [
                    [1, 1],
                    [2, 2],
                ],
                {stroke: "#112233"},
            );

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({stroke: "#112233"}),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.scaledPath([
                [1, 1],
                [2, 2],
            ]);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.path.mockReturnValueOnce(el1);
            graphie.raphael.path.mockReturnValueOnce(el2);

            graphie.scaledPath(
                [
                    [1, 1],
                    [2, 2],
                ],
                {fill: "#112233"},
            );
            graphie.scaledPath([
                [1, 1],
                [2, 2],
            ]);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.scaledPath(
                [
                    [1, 1],
                    [2, 2],
                ],
                {strokeWidth: 42},
            );

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            const result = graphie.scaledPath([
                [1, 1],
                [2, 2],
            ]);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("line", () => {
        it("draws a path between two points", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.line([0, 0], [1, 1]);

            expect(graphie.raphael.path).toHaveBeenCalledWith("M0 50L5 45");
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.line([0, 0], [1, 1], {stroke: "#112233"});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    stroke: "#112233",
                }),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.line([0, 0], [1, 1]);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.path.mockReturnValueOnce(el1);
            graphie.raphael.path.mockReturnValueOnce(el2);

            graphie.line([0, 0], [1, 1], {stroke: "#112233"});
            graphie.line([0, 0], [1, 1]);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.line([0, 0], [1, 1], {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            const result = graphie.line([0, 0], [1, 1]);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("parabola", () => {
        it("draws a path using the quadratic 'Q' SVG command", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.parabola(1, 2, 3);

            expect(graphie.raphael.path.mock.calls[0]).toMatchInlineSnapshot(`
                [
                  "M-60,-565 Q-5,645 50,-565",
                ]
            `);
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.parabola(1, 2, 3, {stroke: "#112233"});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({stroke: "#112233"}),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.parabola(1, 2, 3);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.path.mockReturnValueOnce(el1);
            graphie.raphael.path.mockReturnValueOnce(el2);

            graphie.parabola(1, 2, 3, {stroke: "#112233"});
            graphie.parabola(1, 2, 3);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.parabola(1, 2, 3, {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            const result = graphie.parabola(1, 2, 3);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("fixedLine", () => {
        it("creates a container element the size of the line", () => {
            const graphie = createAndInitGraphie();

            const {wrapper, visibleShape} = graphie.fixedLine(
                [0, 0],
                [1, 1],
                6,
            );

            expect(wrapper.style.position).toBe("absolute");
            expect(wrapper.style.top).toBe("42px");
            expect(wrapper.style.left).toBe("-3px");
            expect(wrapper.style.height).toBe("11px");
            expect(wrapper.style.width).toBe("11px");
            expect(visibleShape[0].getAttribute("d")).toBe("M3,8L8,3");
        });
    });

    describe("sinusoid", () => {
        it("draws a path", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.sinusoid(1, 2, 3, 4);

            expect(graphie.raphael.path).toHaveBeenCalled();
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.sinusoid(1, 2, 3, 4, {stroke: "#112233"});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({stroke: "#112233"}),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.sinusoid(1, 2, 3, 4);

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            const el1 = createMockRaphaelElement("el1");
            const el2 = createMockRaphaelElement("el2");
            graphie.raphael.path.mockReturnValueOnce(el1);
            graphie.raphael.path.mockReturnValueOnce(el2);

            graphie.sinusoid(1, 2, 3, 4, {stroke: "#112233"});
            graphie.sinusoid(1, 2, 3, 4);

            expect(el2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.sinusoid(1, 2, 3, 4, {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            const result = graphie.sinusoid(1, 2, 3, 4);

            expect(result).toBe(mockRaphaelElement);
        });
    });

    describe("grid", () => {
        it("draws each gridline", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.grid([0, 10], [0, 10]);

            expect(graphie.raphael.path).toHaveBeenCalledTimes(22);
        });

        it("spaces out the gridlines by `step` units", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.grid([0, 10], [0, 10], {step: [2, 2]});

            expect(graphie.raphael.path).toHaveBeenCalledTimes(12);
        });

        it("uses the given style", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);
            const fakeSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeSet);

            graphie.grid([0, 10], [0, 10], {stroke: "#112233"});

            expect(fakeSet.attr).toHaveBeenCalledWith(
                expect.objectContaining({stroke: "#112233"}),
            );
        });

        it("resets `step` to the default if it is not given", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);

            graphie.grid([0, 10], [0, 10], {step: [2, 2]});
            expect(graphie.raphael.path).toHaveBeenCalledTimes(12);
            graphie.raphael.path.mockClear();

            graphie.grid([0, 10], [0, 10]);
            expect(graphie.raphael.path).toHaveBeenCalledTimes(22);
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);
            const fakeSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeSet);

            graphie.grid([0, 10], [0, 10], {strokeWidth: 42});

            expect(fakeSet.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    "stroke-width": 42,
                }),
            );
        });

        it("returns a Raphael `Set` of the elements drawn", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.path.mockReturnValue(mockRaphaelElement);
            const fakeSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeSet);

            const result = graphie.grid([0, 10], [0, 10]);

            expect(result).toBe(fakeSet);
        });
    });

    describe("label", () => {
        it("creates a span containing the text", () => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            const graphie = createAndInitGraphie();

            const $span = graphie.label(
                [0, 0],
                "this is the text",
                "center",
                false,
            );

            expect($span[0].innerHTML).toBe("this is the text");
        });

        it("puts the specified amount of padding around the label", () => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            const graphie = createAndInitGraphie();

            const $span = graphie.label(
                [0, 0],
                "this is the text",
                "center",
                false,
                {labelDistance: 42},
            );

            expect($span[0].style.padding).toBe("42px");
        });

        it("defaults the padding to 7px if not specified", () => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            const graphie = createAndInitGraphie();

            const $span = graphie.label(
                [0, 0],
                "this is the text",
                "center",
                false,
            );

            expect($span[0].style.padding).toBe("7px");
        });

        it("resets the padding to the default after each call", () => {
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            const graphie = createAndInitGraphie();

            graphie.label([0, 0], "this is the text", "center", false, {
                labelDistance: 42,
            });
            const $span = graphie.label(
                [0, 0],
                "this is the text",
                "center",
                false,
            );

            expect($span[0].style.padding).toBe("7px");
        });
    });

    describe("plotParametric", () => {
        it("plots the given parametric curve", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());

            graphie.plotParametric((t) => [t, 0], [0, 1]);

            expect(graphie.raphael.path).toHaveBeenCalledWith(
                expect.stringMatching(/^M0 5/),
            );
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            graphie.plotParametric((t) => [t, 0], [0, 1], {stroke: "#112233"});

            expect(fakeRaphaelSet.attr).toHaveBeenCalledWith(
                expect.objectContaining({stroke: "#112233"}),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            graphie.plotParametric((t) => [t, 0], [0, 1]);

            expect(fakeRaphaelSet.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const set1 = createFakeRaphaelSet();
            const set2 = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(set1);
            graphie.raphael.set.mockReturnValue(set2);

            graphie.plotParametric((t) => [t, 0], [0, 1], {stroke: "#112233"});
            graphie.plotParametric((t) => [t, 0], [0, 1]);

            expect(set2.attr).toHaveBeenCalledWith({
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            graphie.plotParametric((t) => [t, 0], [0, 1], {strokeWidth: 42});

            expect(fakeRaphaelSet.attr).toHaveBeenCalledWith(
                expect.objectContaining({"stroke-width": 42}),
            );
        });

        it("returns the Raphael set", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            const result = graphie.plotParametric((t) => [t, 0], [0, 1]);

            expect(result).toBe(fakeRaphaelSet);
        });
    });

    describe("plot", () => {
        it("plots the given function", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());

            graphie.plot((x) => 1, [0, 1]);

            expect(graphie.raphael.path).toHaveBeenCalledWith(
                expect.stringMatching(/^M0 45/),
            );
        });

        it("uses the style, if given", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            graphie.plot((x) => 1, [0, 1], {stroke: "#112233"});

            expect(fakeRaphaelSet.attr).toHaveBeenCalledWith(
                expect.objectContaining({stroke: "#112233"}),
            );
        });

        it("uses the default style, if none given", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            graphie.plot((x) => 1, [0, 1]);

            expect(fakeRaphaelSet.attr).toHaveBeenCalledWith({
                fill: "none",
                "plot-points": 10,
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const set1 = createFakeRaphaelSet();
            const set2 = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(set1);
            graphie.raphael.set.mockReturnValue(set2);

            graphie.plot((x) => 1, [0, 1], {stroke: "#112233"});
            graphie.plot((x) => 1, [0, 1]);

            expect(set2.attr).toHaveBeenCalledWith({
                fill: "none",
                "plot-points": 10,
                "stroke-width": 2,
            });
        });

        it("dasherizes Raphael attribute names (e.g. strokeWidth -> stroke-width)", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            graphie.plot((x) => 1, [0, 1], {strokeWidth: 42});

            expect(fakeRaphaelSet.attr).toHaveBeenCalledWith(
                expect.objectContaining({"stroke-width": 42}),
            );
        });

        it("returns the Raphael set", () => {
            const graphie = createAndInitGraphie();
            graphie.raphael.path.mockReturnValue(createMockRaphaelElement());
            const fakeRaphaelSet = createFakeRaphaelSet();
            graphie.raphael.set.mockReturnValue(fakeRaphaelSet);

            const result = graphie.plot((x) => 1, [0, 1]);

            expect(result).toBe(fakeRaphaelSet);
        });
    });

    describe("addMouseLayer", () => {
        it("should attach new mouse layer (Raphael canvas) to graph", () => {
            const graphie = createAndInitGraphie();

            graphie.addMouseLayer({});

            expect(graphie.mouselayer).toBeDefined();
        });

        it("should add a new mouse layer (div) into graph's DOM element", () => {
            const graphie = createAndInitGraphie();

            graphie.addMouseLayer({});

            expect(graphie._mouselayerWrapper).toBeDefined();
            expect(graphie._mouselayerWrapper?.parentNode).toBe(graphie.el);
        });

        it("should add addToMouseLayerWrapper() implementation", () => {
            const graphie = createAndInitGraphie();
            graphie.addMouseLayer({});

            graphie.addToMouseLayerWrapper(document.createElement("span"));

            expect(graphie._mouselayerWrapper?.children.length).toBe(1);
        });

        it("should add a new visible layer (div) into graph's DOM element", () => {
            const graphie = createAndInitGraphie();

            graphie.addMouseLayer({});

            expect(graphie._visiblelayerWrapper).toBeDefined();
            expect(graphie._visiblelayerWrapper?.parentNode).toBe(graphie.el);
        });

        it("should add addToVisibleLayerWrapper() implementation", () => {
            const graphie = createAndInitGraphie();
            graphie.addMouseLayer({});

            graphie.addToVisibleLayerWrapper(document.createElement("span"));

            expect(graphie._visiblelayerWrapper?.children.length).toBe(1);
        });

        it.each([
            "onClick",
            "onMouseDown",
            "onMouseMove",
            "onMouseOver",
            "onMouseOut",
        ])(
            "should add click target that covers the entire graph when %s handler provided",
            async (eventName) => {
                const graphie = createAndInitGraphie();
                const handler = jest.fn();

                graphie.addMouseLayer({[eventName]: handler});

                // eslint-disable-next-line testing-library/no-node-access
                const target = graphie.el.querySelector("rect");
                expect(target?.getAttribute("width")).toBe("50");
                expect(target?.getAttribute("height")).toBe("50");
            },
        );

        it("should disable drawing area if allowScratchpad is false", async () => {
            const graphie = createAndInitGraphie();
            const onSetDrawingAreaAvailable = jest.fn();
            graphie.addMouseLayer({
                setDrawingAreaAvailable: onSetDrawingAreaAvailable,
                allowScratchpad: false,
            });

            expect(onSetDrawingAreaAvailable).toHaveBeenCalledWith(false);
        });
    });

    describe("getMousePx", () => {
        it.each([
            {
                graphPosition: {left: 0, top: 0},
                mouseEvent: {pageX: 10, pageY: 10},
                expectedPixelCoord: [10, 10],
            },
            {
                graphPosition: {left: 20, top: 10},
                mouseEvent: {pageX: 40, pageY: 40},
                expectedPixelCoord: [20, 30],
            },
        ])(
            "should return pixel coordinates $expectedPixelCoord for the mouse event $mouseEvent (graph at $graphPosition)",
            ({graphPosition, mouseEvent, expectedPixelCoord}) => {
                const graphie = createAndInitGraphie();
                jest.spyOn($.fn, "offset").mockReturnValue(graphPosition);

                const mousePx = graphie.getMousePx(mouseEvent);

                expect(mousePx).toEqual(expectedPixelCoord);
            },
        );
    });

    describe("getMouseCoord", () => {
        it.each([
            {
                graphPosition: {left: 0, top: 0},
                mouseEvent: {pageX: 10, pageY: 10},
                expectedGraphCoord: [2, 8],
            },
            {
                graphPosition: {left: 20, top: 10},
                mouseEvent: {pageX: 30, pageY: 20},
                expectedGraphCoord: [2, 8],
            },
        ])(
            "should return graph coordinates $expectedGraphCoord for the mouse event $mouseEvent (graph at $graphPosition)",
            ({graphPosition, mouseEvent, expectedGraphCoord}) => {
                const graphie = GraphUtils.createGraphie(
                    document.createElement("div"),
                );
                // The graph is 50px by 50px.
                graphie.init({
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    scale: 5,
                });
                jest.spyOn($.fn, "offset").mockReturnValue(graphPosition);

                const mousePx = graphie.getMouseCoord(mouseEvent);

                expect(mousePx).toEqual(expectedGraphCoord);
            },
        );
    });
});

describe("normalizeRange", () => {
    it("does nothing to a range specified as [[xMin, xMax], [yMin, yMax]]", () => {
        expect(
            normalizeRange([
                [-1, 2],
                [-3, 4],
            ]),
        ).toEqual([
            [-1, 2],
            [-3, 4],
        ]);
    });

    it("treats a single number as the magnitude of min and max for x and y", () => {
        expect(normalizeRange(7)).toEqual([
            [-7, 7],
            [-7, 7],
        ]);
    });

    it("treats a pair of number as the magnitudes for x and y, respectively", () => {
        expect(normalizeRange([3, 5])).toEqual([
            [-3, 3],
            [-5, 5],
        ]);
    });

    it("passes undefined through", () => {
        expect(normalizeRange(undefined)).toBe(undefined);
    });
});
