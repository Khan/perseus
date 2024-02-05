import {fireEvent} from "@testing-library/react";

import {Graphie} from "../util/graphie";

import {Movable} from "./movable";

// Yay for side-effect imports!
// eslint-disable-next-line import/no-unassigned-import
import "../util/interactive";

describe("Movable", () => {
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
    ];

    it.each(properties)("has a %s property", (property) => {
        const dummyGraphie: any = {};
        const movable = new Movable(dummyGraphie, {});
        expect(movable[property]).toBeDefined();
    });

    const getters = [
        "cursor",
        "added",
        "isHovering",
        "isMouseOver",
        "isDragging",
        "mouseTarget",
    ];

    it.each(getters)(
        "returns the corresponding state property from %s()",
        (getter) => {
            const dummyGraphie: any = {};
            const movable = new Movable(dummyGraphie, {});
            expect(movable[getter]()).toBe(movable.state[getter]);
        },
    );

    it("sets default state when constructed", () => {
        const dummyGraphie: any = {};
        const movable = new Movable(dummyGraphie, {});
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
            remove: [],
        });
    });

    it("calls the modify listener when constructed", () => {
        const dummyGraphie: any = {};
        const modifySpy = jest.fn().mockName("modify");

        const _ = new Movable(dummyGraphie, {modify: modifySpy});

        const baseExpectedState = {
            add: [],
            added: false,
            cursor: null,
            draw: [],
            id: expect.any(String),
            isDragging: false,
            isHovering: false,
            isMouseOver: false,
            modify: [modifySpy],
            mouseTarget: null,
            onClick: [],
            onMove: [],
            onMoveEnd: [],
            onMoveStart: [],
            remove: [],
        };
        expect(modifySpy.mock.calls).toEqual([
            [baseExpectedState, {}],
            [
                {...baseExpectedState, added: true},
                {...baseExpectedState, added: true},
            ],
        ]);
    });

    test("cloneState()", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );

        expect(movable.cloneState()).toEqual(
            expect.objectContaining({
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
                remove: [],
            }),
        );
    });

    test("cloneState() makes a copy", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );

        expect(movable.cloneState()).not.toBe(movable.state);
    });

    test("modify() retains original ID", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );
        const id = movable.state.id;

        movable.modify({added: true});

        expect(movable.state.id).toBe(id);
    });

    test("grab() fires onMoveStart", () => {
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [
                [-10, 10],
                [-10, 10],
            ],
        });
        const onMoveStart = jest.fn();
        const movable = new Movable(graphie, {onMoveStart});

        movable.grab([0, 0]);

        expect(onMoveStart).toHaveBeenCalledWith([0, 0], [0, 0]);
    });

    test("grab() fires onMove when mouse moves", () => {
        const graphie = new Graphie(document.createElement("div"));
        graphie.init({
            range: [
                [-10, 10],
                [-10, 10],
            ],
            scale: [10, 10],
        });
        const onMove = jest.fn();
        const movable = new Movable(graphie, {onMove});

        movable.grab([0, 0]);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseMove(document, {clientX: 120, clientY: 80});

        expect(onMove).toHaveBeenCalledWith([2, 2], [0, 0]);
    });

    test("grab() fires onMoveEnd when mouse up", () => {
        const dummyGraphie: any = {};
        const onMoveEnd = jest.fn();
        const movable = new Movable(dummyGraphie, {onMoveEnd});

        movable.grab([0, 0]);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(document);

        expect(onMoveEnd).toHaveBeenCalledWith([0, 0], [0, 0]);
    });

    test("grab() fires onClick if still hovering when mouse up", () => {
        const dummyGraphie: any = {};
        const onClick = jest.fn();
        const movable = new Movable(dummyGraphie, {onClick});

        movable.grab([0, 0]);
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseUp(document);

        expect(onClick).toHaveBeenCalledWith([0, 0], [0, 0]);
    });

    test("draw() fires a draw event", () => {
        const dummyGraphie: any = {};
        const drawSpy = jest.fn();
        const movable = new Movable(dummyGraphie, {draw: drawSpy});

        movable.draw();

        const expectedState = {
            add: [],
            added: true,
            cursor: null,
            draw: [drawSpy],
            id: expect.any(String),
            isDragging: false,
            isHovering: false,
            isMouseOver: false,
            modify: [],
            mouseTarget: null,
            onClick: [],
            onMove: [],
            onMoveEnd: [],
            onMoveStart: [],
            remove: [],
        };

        expect(drawSpy).toHaveBeenCalledWith(expectedState, expectedState);
    });
});
