import MovablePoint from "./movable-point";
import {Movable} from "./movable";
import {Graphie} from "../util/graphie";

// Yay for side-effect imports!
// eslint-disable-next-line import/no-unassigned-import
import "../util/interactive";

const constructors = [
    ["MovablePoint", MovablePoint],
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
        const movablePoint = new MovablePoint(graphie, movable, {})

        // Act/Assert
        expect(movablePoint[property]).toBeDefined()
    })
})
