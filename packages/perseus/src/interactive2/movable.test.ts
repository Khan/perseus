import Movable, {MovableClassRenameMe} from "./movable";

describe("Movable", () => {
    const constructors = [
        ["the old implementation", Movable],
        ["the class-based implementation", MovableClassRenameMe],
    ]

    describe.each(constructors)("%s", (_: string, Movable: any) => {
        const properties = [
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
        ]

        it.each(properties)("has a %s property", (property) => {
            const dummyGraphie: any = {}
            const movable = new Movable(dummyGraphie, {})
            expect(movable[property]).toBeDefined()
        })

        const getters = [
            "cursor",
            "added",
            "isHovering",
            "isMouseOver",
            "isDragging",
            "mouseTarget",
        ]

        it.each(getters)("returns the corresponding state property from %s()", (getter) => {
            const dummyGraphie: any = {}
            const movable = new Movable(dummyGraphie, {})
            expect(movable[getter]()).toBe(movable.state[getter]);
        })

        it("sets default state when constructed", () => {
            const dummyGraphie: any = {}
            const movable = new Movable(dummyGraphie, {})
            expect(movable.state).toEqual({
                id: expect.any(String),
                add: [],
                added: true,
                cursor: null,
                draw: [],
                isDragging: false,
                isHovering: false,
                isMouseOver: false,
                modify: [],
                mouseTarget: null,
                onClick: [],
                onMove: [],
                onMoveEnd: [],
                onMoveStart: [],
                remove: []
            })
        })

        it("calls the modify listener when constructed", () => {
            const dummyGraphie: any = {}
            const modifySpy = jest.fn().mockName("modify");

            new Movable(dummyGraphie, {modify: modifySpy})

            const baseExpectedState = {
                "add": [],
                "added": false,
                "cursor": null,
                "draw": [],
                "id": expect.any(String),
                "isDragging": false,
                "isHovering": false,
                "isMouseOver": false,
                "modify": [modifySpy],
                "mouseTarget": null,
                "onClick": [],
                "onMove": [],
                "onMoveEnd": [],
                "onMoveStart": [],
                "remove": [],
            }
            expect(modifySpy.mock.calls).toEqual([
                [baseExpectedState, {}],
                [{...baseExpectedState, added: true}, {...baseExpectedState, added: true}],
            ]);
        })
    });
})
