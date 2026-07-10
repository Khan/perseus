import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

import {Graphie} from "../util/graphie";

import {Movable} from "./movable";
import {MovablePoint} from "./movable-point";
import WrappedEllipse from "./wrapped-ellipse";

// Yay for side-effect imports!
// eslint-disable-next-line import/no-unassigned-import
import "../util/interactive";

// graphie only accepts raw CSS colors, so MovablePoint resolves its color
// tokens through tokenValue(). In a real browser that returns a hex value, but
// in jsdom the CSS custom properties aren't defined so it returns "". We mock
// tokenValue() to return the token (its CSS variable string) unchanged, which
// lets these tests assert *which* color token is used for each state (the
// gray-vs-blue rendering itself is verified visually in Chromatic).
jest.mock("@khanacademy/wonder-blocks-tokens", () => ({
    ...jest.requireActual("@khanacademy/wonder-blocks-tokens"),
    tokenValue: (token: string) => token,
}));

function createGraphie() {
    const graphie = new Graphie(document.createElement("div"));
    graphie.init({
        range: [
            [-10, 10],
            [-10, 10],
        ],
    });
    graphie.addMouseLayer({});
    return graphie;
}

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
            // A non-static point renders in the interactive color.
            normalStyle: {
                scale: 1,
                fill: semanticColor.core.foreground.instructive.default,
                stroke: semanticColor.core.foreground.instructive.default,
            },
            highlightStyle: {
                scale: 2,
                fill: semanticColor.core.foreground.instructive.default,
                stroke: semanticColor.core.foreground.instructive.default,
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
            // A non-static point renders in the interactive color.
            normalStyle: {
                scale: 1,
                fill: semanticColor.core.foreground.instructive.default,
                stroke: semanticColor.core.foreground.instructive.default,
            },
            highlightStyle: {
                scale: 2,
                fill: semanticColor.core.foreground.instructive.default,
                stroke: semanticColor.core.foreground.instructive.default,
            },
        });
    });

    describe("static styling", () => {
        it("renders a non-static point in the interactive color", () => {
            // Arrange, Act
            const graphie = createGraphie();
            const movable = new Movable(graphie, {});
            const movablePoint = new MovablePoint(graphie, movable, {
                static: false,
            });

            // Assert
            expect(movablePoint.state.normalStyle).toMatchObject({
                fill: semanticColor.core.foreground.instructive.default,
                stroke: semanticColor.core.foreground.instructive.default,
            });
        });

        it("renders a static point in the muted gray (disabled) color", () => {
            // Arrange, Act
            const graphie = createGraphie();
            const movable = new Movable(graphie, {});
            const movablePoint = new MovablePoint(graphie, movable, {
                static: true,
            });

            // Assert
            expect(movablePoint.state.normalStyle).toMatchObject({
                fill: semanticColor.core.foreground.disabled.strong,
                stroke: semanticColor.core.foreground.disabled.strong,
            });
        });
    });
});
