import Movable, {MovableClassRenameMe} from "./movable";

describe("Movable", () => {
    const constructors = [
        ["the old implementation", Movable],
        ["the class-based implementation", MovableClassRenameMe],
    ]

    it.each(constructors)("%s has methods", (_: string, Movable: any) => {
        const dummyGraphie: any = {}
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
