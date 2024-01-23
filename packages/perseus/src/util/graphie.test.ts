// eslint-disable-next-line import/no-extraneous-dependencies
import Raphael from "raphael";

import GraphUtils from "./graphie";

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
    };
}

describe("Graphie drawing tools", () => {
    describe("circle", () => {
        it("uses the given center and radius", () => {
            const graphie = GraphUtils.createGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael = createMockRaphael();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.init({
                range: [
                    [0, 10],
                    [0, 10],
                ],
                scale: 5,
                isMobile: false,
            });

            graphie.circle([1, 2], 3);

            // The size of the canvas (width and height) should have been set:
            expect(graphie.raphael.setSize).toHaveBeenCalledWith(50, 50);
            expect(graphie.raphael.ellipse).toHaveBeenCalledWith(5, 40, 15, 15);
            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                // The defaults
                fill: "none",
                "stroke-width": 2,
            });
        });

        it("uses the style, if given", () => {
            const graphie = GraphUtils.createGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael = createMockRaphael();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.init({
                range: [
                    [0, 10],
                    [0, 10],
                ],
                scale: 5,
                isMobile: false,
            });

            graphie.circle([0, 0], 1, {fill: "#112233", stroke: "#445566"});

            // The size of the canvas (width and height) should have been set:
            expect(graphie.raphael.setSize).toHaveBeenCalledWith(50, 50);
            expect(graphie.raphael.ellipse).toHaveBeenCalledWith(0, 50, 5, 5);
            expect(mockRaphaelElement.attr).toHaveBeenCalledWith({
                fill: "#112233",
                stroke: "#445566",
                "stroke-width": 2,
            });
        });

        it("restores the previous style after drawing", () => {
            const graphie = GraphUtils.createGraphie();
            const mockRaphaelElement1 = createMockRaphaelElement(
                "mockRaphaelElement1",
            );
            const mockRaphaelElement2 = createMockRaphaelElement(
                "mockRaphaelElement2",
            );
            graphie.raphael = createMockRaphael();
            graphie.raphael.ellipse.mockReturnValueOnce(mockRaphaelElement1);
            graphie.raphael.ellipse.mockReturnValueOnce(mockRaphaelElement2);

            graphie.init({
                range: [
                    [0, 10],
                    [0, 10],
                ],
                scale: 5,
                isMobile: false,
            });

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
            const graphie = GraphUtils.createGraphie();
            const mockRaphaelElement = createMockRaphaelElement();
            graphie.raphael = createMockRaphael();
            graphie.raphael.ellipse.mockReturnValue(mockRaphaelElement);

            graphie.init({
                range: [
                    [0, 10],
                    [0, 10],
                ],
                scale: 5,
                isMobile: false,
            });

            graphie.circle([0, 0], 1, {strokeWidth: 42});

            expect(mockRaphaelElement.attr).toHaveBeenCalledWith(
                expect.objectContaining({
                    fill: "none",
                    "stroke-width": 42,
                }),
            );
        });
    });
});
