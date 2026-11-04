import {Graphie} from "../util/graphie";

import {Movable} from "./movable";
import {MovablePoint} from "./movable-point";
import WrappedEllipse from "./wrapped-ellipse";

// Yay for side-effect imports!
// eslint-disable-next-line import/no-unassigned-import
import "../util/interactive";

describe("MovablePoint", () => {
    it("sets its initial state on construction", () => {
        // Arrange
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [
                [-10, 10],
                [-10, 10],
            ],
        });
        graphie.addMouseLayer({});
        const movable = new Movable(graphie, {});
        const movablePoint = new MovablePoint(graphie, movable, {});

        expect(movablePoint.state).toEqual({
            add: [expect.any(Function)],
            added: true,
            constraints: [],
            coord: [0, 0],
            cursor: "move",
            draw: [expect.any(Function), expect.any(Function)],
            hasMoved: false,
            id: expect.any(String),
            modify: [expect.any(Function)],
            onClick: [],
            onMove: [],
            onMoveEnd: [],
            onMoveStart: [],
            outOfBounds: false,
            pointSize: 4,
            remove: [expect.any(Function)],
            shadow: false,
            static: false,
            tooltip: false,
            touchOffset: null,
            mouseTarget: expect.any(WrappedEllipse),
            visibleShape: expect.any(WrappedEllipse),
            // Note: fill/stroke resolve to "" in jsdom because tokenValue()
            // reads CSS custom properties — jsdom doesn't define them. Raphael
            // then renders "" as fill/stroke="none" in the DOM (visible in
            // snapshots). Correct hex values resolve in a real browser (Chromatic).
            normalStyle: {
                scale: 1,
                fill: "",
                stroke: "",
            },
            highlightStyle: {
                scale: 2,
                fill: "",
                stroke: "",
            },
        });
    });

    it("sets its initial prevState on construction", () => {
        // Arrange
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [
                [-10, 10],
                [-10, 10],
            ],
        });
        graphie.addMouseLayer({});
        const movable = new Movable(graphie, {});
        const movablePoint = new MovablePoint(graphie, movable, {});

        expect(movablePoint.prevState).toEqual({
            add: [expect.any(Function)],
            added: true,
            constraints: [],
            coord: [0, 0],
            cursor: "move",
            draw: [expect.any(Function), expect.any(Function)],
            hasMoved: false,
            id: expect.any(String),
            isDragging: false,
            isHovering: false,
            isMouseOver: false,
            modify: [expect.any(Function)],
            onClick: [],
            onMove: [],
            onMoveEnd: [],
            onMoveStart: [],
            outOfBounds: false,
            pointSize: 4,
            remove: [expect.any(Function)],
            shadow: false,
            static: false,
            tooltip: false,
            touchOffset: null,
            mouseTarget: expect.any(WrappedEllipse),
            visibleShape: expect.any(WrappedEllipse),
            // Note: fill/stroke resolve to "" in jsdom because tokenValue()
            // reads CSS custom properties — jsdom doesn't define them. Raphael
            // then renders "" as fill/stroke="none" in the DOM (visible in
            // snapshots). Correct hex values resolve in a real browser (Chromatic).
            normalStyle: {
                scale: 1,
                fill: "",
                stroke: "",
            },
            highlightStyle: {
                scale: 2,
                fill: "",
                stroke: "",
            },
        });
    });

    describe("when static changes after construction", () => {
        function createGraphie() {
            const graphieDiv = document.createElement("div");
            const graphie = new Graphie(graphieDiv);
            graphie.init({
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
            });
            graphie.addMouseLayer({});
            return {graphie, graphieDiv};
        }

        function getMouseTargets(graphieDiv: HTMLElement) {
            // Mouse targets are bare SVG elements with no accessible role.

            return graphieDiv.querySelectorAll(
                "[data-interactive-kind-for-testing='movable-point']",
            );
        }

        it("removes its mouse target when it becomes static", () => {
            // Arrange
            const {graphie, graphieDiv} = createGraphie();
            const movable = new Movable(graphie, {});
            const movablePoint = new MovablePoint(graphie, movable, {
                static: false,
            });

            // Act
            movablePoint.modify({static: true});

            // Assert
            expect(movablePoint.state.mouseTarget).toBeNull();
            expect(getMouseTargets(graphieDiv)).toHaveLength(0);
        });

        it("adds a mouse target when it stops being static", () => {
            // Arrange
            const {graphie, graphieDiv} = createGraphie();
            const movable = new Movable(graphie, {});
            const movablePoint = new MovablePoint(graphie, movable, {
                static: true,
            });

            // Act
            movablePoint.modify({static: false});

            // Assert
            expect(movablePoint.state.mouseTarget).toEqual(
                expect.any(WrappedEllipse),
            );
            expect(getMouseTargets(graphieDiv)).toHaveLength(1);
        });
    });
});
