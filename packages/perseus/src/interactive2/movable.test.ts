import Movable from "./movable";

describe("Movable", () => {
    it("has methods", () => {
        const dummyGraphie = {}
        const movable = new Movable(dummyGraphie, {})
        const keys: string[] = [];
        for (let key in movable) {
            keys.push(key);
        }
        expect(new Set(keys)).toEqual(new Set([
            "graphie",
            "state",
            "prevState",
            "cursor",
            "added",
            "isHovering",
            "isMouseOver",
            "isDragging",
            "mouseTarget",
            "_fireEvent",
            "_applyConstraints",
            "draw",
            "listen",
            "unlisten",
            "cloneState",
            "_createDefaultState",
            "modify",
            "grab",
            "update",
            "remove",
            "toBack",
            "toFront",
        ]))
    })
})
