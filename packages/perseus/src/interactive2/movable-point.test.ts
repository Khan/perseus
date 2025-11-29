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
            normalStyle: {
                scale: 1,
                fill: "#1865f2",
                stroke: "#1865f2",
            },
            highlightStyle: {
                scale: 2,
                fill: "#1865f2",
                stroke: "#1865f2",
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
            normalStyle: {
                scale: 1,
                fill: "#1865f2",
                stroke: "#1865f2",
            },
            highlightStyle: {
                scale: 2,
                fill: "#1865f2",
                stroke: "#1865f2",
            },
        });
    });
});
