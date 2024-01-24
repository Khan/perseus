// eslint-disable-next-line import/no-extraneous-dependencies
import Raphael from "raphael";

import GraphUtils from "./graphie";

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
    };
}

function createAndInitGraphie(): Graphie {
    const graphie = GraphUtils.createGraphie();
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

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(expect.objectContaining({
                fill: "#123456"
            }));
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

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(expect.objectContaining({
                "stroke-width": 42,
            }));
        });

        it("returns the Raphael element", () => {
            const graphie = createAndInitGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            const result = graphie.ellipse([0, 0], [1, 1]);

            expect(result).toBe(mockRaphaelElement);
        });
    });
});
