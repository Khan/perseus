import MovablePoint, {MovablePointClassRenameMe} from "./movable-point";
import {Movable} from "./movable";
import {Graphie} from "../util/graphie";

// Yay for side-effect imports!
// eslint-disable-next-line import/no-unassigned-import
import "../util/interactive";
import WrappedEllipse from "./wrapped-ellipse";

const constructors = [
    ["MovablePoint", MovablePoint],
    ["MovablePointClassRenameMe", MovablePointClassRenameMe],
] as const;

describe.each(constructors)("%s", (_, MovablePoint) => {
    const properties = [
        "graphie",
        "movable",
        "state",
        "prevState",
        "coord",
        "pointSize",
        "static",
        "cursor",
        "normalStyle",
        "highlightStyle",
        "shadow",
        "tooltip",
        "added",
        "hasMoved",
        "visibleShape",
        "outOfBounds",
        "isHovering",
        "isDragging",
        "mouseTarget",
        "touchOffset",
        "_fireEvent",
        "_applyConstraints",
        "draw",
        "listen",
        "unlisten",
        "cloneState",
        "_createDefaultState",
        "modify",
        "_showTooltip",
        "_hideTooltip",
        "grab",
        "update",
        "remove",
        "constrain",
        "setCoord",
        "setCoordConstrained",
        "moveTo",
        "toBack",
        "toFront",
    ];

    it.each(properties)("has a %s property", (property) => {
        // Arrange
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [[-10, 10], [-10, 10]],
        })
        graphie.addMouseLayer({})
        const movable = new Movable(graphie, {})
        // @ts-expect-error
        const movablePoint = new MovablePoint(graphie, movable, {})

        // Act/Assert
        expect(movablePoint[property]).toBeDefined()
    })

    it("sets its initial state on construction", () => {
        // Arrange
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [[-10, 10], [-10, 10]],
        })
        graphie.addMouseLayer({})
        const movable = new Movable(graphie, {})
        // @ts-expect-error
        const movablePoint = new MovablePoint(graphie, movable, {})

        expect(movablePoint.state).toEqual({
            add: [expect.any(Function)],
            added: true,
            constraints: [],
            coord: [0, 0],
            cursor: "move",
            draw: [
                expect.any(Function),
                expect.any(Function),
            ],
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
                fill: "#71B307",
                stroke: "#71B307",
            },
            highlightStyle: {
                scale: 2,
                fill: "#71B307",
                stroke: "#71B307",
            },
        })
    })

    it("sets its initial prevState on construction", () => {
        // Arrange
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [[-10, 10], [-10, 10]],
        })
        graphie.addMouseLayer({})
        const movable = new Movable(graphie, {})
        // @ts-expect-error
        const movablePoint = new MovablePoint(graphie, movable, {})

        expect(movablePoint.prevState).toEqual({
            add: [expect.any(Function)],
            added: true,
            constraints: [],
            coord: [0, 0],
            cursor: "move",
            draw: [
                expect.any(Function),
                expect.any(Function),
            ],
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
                fill: "#71B307",
                stroke: "#71B307",
            },
            highlightStyle: {
                scale: 2,
                fill: "#71B307",
                stroke: "#71B307",
            },
        })
    })
})
