/* eslint-disable testing-library/prefer-user-event */
import {fireEvent} from "@testing-library/react";

import {Graphie} from "../../util/graphie";
import Movable from "../movable";

// Yay for side-effect imports!
// eslint-disable-next-line import/no-unassigned-import
import "../../util/interactive";

describe("Movable", () => {
    it("should be constructable", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );

        expect(movable).toBeDefined();
    });

    it("should have accessor properties", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );

        expect(typeof movable.isHovering).toBe("function");
        expect(typeof movable.cursor).toBe("function");
        expect(typeof movable.added).toBe("function");
        expect(typeof movable.isHovering).toBe("function");
        expect(typeof movable.isMouseOver).toBe("function");
        expect(typeof movable.isDragging).toBe("function");
        expect(typeof movable.mouseTarget).toBe("function");
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

    test("cloneState() should copy state", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );

        expect(movable.cloneState()).not.toBe(movable.state);
    });

    test("modify() resets movable to initial state when no params given", () => {
        const movable = new Movable(
            new Graphie(document.createElement("div")),
            {},
        );

        const state = movable.cloneState();
        movable.state.added = false;

        // It seems that all usages of this function in our production code
        // pass the original state + mutations to modify(). However, it _does_
        // work to pass no arguments so we'll keep this Characterization test
        // here for now.
        movable.modify();

        expect(movable.cloneState()).toEqual(state);
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
        fireEvent.mouseMove(document, {clientX: 120, clientY: 80});

        expect(onMove).toHaveBeenCalledWith([2, 2], [0, 0]);
    });

    test("grab() fires onMoveEnd when mouse up", () => {
        const dummyGraphie: any = {};
        const onMoveEnd = jest.fn();
        const movable = new Movable(dummyGraphie, {onMoveEnd});

        movable.grab([0, 0]);
        fireEvent.mouseUp(document);

        expect(onMoveEnd).toHaveBeenCalledWith([0, 0], [0, 0]);
    });

    test("grab() fires onClick if still hovering when mouse up", () => {
        const dummyGraphie: any = {};
        const onClick = jest.fn();
        const movable = new Movable(dummyGraphie, {onClick});

        movable.grab([0, 0]);
        fireEvent.mouseUp(document);

        expect(onClick).toHaveBeenCalledWith([0, 0], [0, 0]);
    });
});
