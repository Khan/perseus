import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {act, renderHook} from "@testing-library/react";

import {CHOICE_BANK_DROP_ID} from "./choice-bank";
import {useTileMoveActions} from "./use-tile-move-actions";

import type {TilePlacements, TileUsage} from "./tile-placements";
import type {DragEndEvent} from "@dnd-kit/react";

jest.mock("@khanacademy/wonder-blocks-announcer", () => ({
    announceMessage: jest.fn(),
}));

const BLANK_IDS = ["blank 1", "blank 2"];

/** Renders the hook around mutable controlled placements. */
function setupHook(
    initialPlacements: TilePlacements = {},
    tileUsage: TileUsage = "single",
) {
    let placements = initialPlacements;
    const onPlacementsChange = jest.fn((next: TilePlacements) => {
        placements = next;
    });
    const rendered = renderHook(() =>
        useTileMoveActions({
            placements,
            onPlacementsChange,
            tileUsage,
            getTileLabel: (tileId) => `tile ${tileId}`,
            getBlankLabel: (blankId) => `Blank ${blankId.slice(-1)}`,
            blankIds: BLANK_IDS,
        }),
    );
    return {...rendered, onPlacementsChange};
}

/** Builds the drag-end event shape the hook consumes. */
function generateDragEnd(
    source: {tileId: string; fromBlankId?: string} | null,
    targetId: string,
    canceled = false,
): DragEndEvent {
    // eslint-disable-next-line no-restricted-syntax -- The hook reads only these fields; a full dnd-kit event needs a live drag manager.
    return {
        canceled,
        operation: {
            source: {id: "drag-id", data: source ?? undefined},
            target: {id: targetId},
        },
    } as unknown as DragEndEvent;
}

describe("useTileMoveActions", () => {
    beforeEach(() => {
        jest.mocked(announceMessage).mockClear();
    });

    describe("handleDragEnd", () => {
        it("places a bank tile dropped on a blank and announces it", () => {
            const {result, onPlacementsChange} = setupHook();

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd({tileId: "x"}, "blank 1"),
                );
            });

            expect(onPlacementsChange).toHaveBeenCalledWith({"blank 1": "x"});
            expect(announceMessage).toHaveBeenCalledWith({
                message: "tile x moved to Blank 1.",
            });
        });

        it("announces the eviction when a drop displaces another tile", () => {
            const {result} = setupHook({"blank 1": "y"});

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd({tileId: "x"}, "blank 1"),
                );
            });

            expect(announceMessage).toHaveBeenCalledWith({
                message: "tile x moved to Blank 1. tile y returned to Choices.",
            });
        });

        it("clears a placed tile dropped on the bank", () => {
            const {result, onPlacementsChange} = setupHook({"blank 1": "x"});

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd(
                        {tileId: "x", fromBlankId: "blank 1"},
                        CHOICE_BANK_DROP_ID,
                    ),
                );
            });

            expect(onPlacementsChange).toHaveBeenCalledWith({});
            expect(announceMessage).toHaveBeenCalledWith({
                message: "tile x returned to Choices.",
            });
        });

        it("ignores a cancelled drag, even with a reported target", () => {
            const {result, onPlacementsChange} = setupHook();

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd({tileId: "x"}, "blank 1", true),
                );
            });

            expect(onPlacementsChange).not.toHaveBeenCalled();
            expect(announceMessage).not.toHaveBeenCalled();
        });

        it("ignores a tile dropped on its own blank", () => {
            const {result, onPlacementsChange} = setupHook({"blank 1": "x"});

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd(
                        {tileId: "x", fromBlankId: "blank 1"},
                        "blank 1",
                    ),
                );
            });

            expect(onPlacementsChange).not.toHaveBeenCalled();
            expect(announceMessage).not.toHaveBeenCalled();
        });

        it("ignores a bank copy dropped on a blank already holding the tile", () => {
            const {result, onPlacementsChange} = setupHook(
                {"blank 1": "x"},
                "multi",
            );

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd({tileId: "x"}, "blank 1"),
                );
            });

            expect(onPlacementsChange).not.toHaveBeenCalled();
            expect(announceMessage).not.toHaveBeenCalled();
        });

        it("ignores a drag that carries no tile payload", () => {
            const {result, onPlacementsChange} = setupHook();

            act(() => {
                result.current.handleDragEnd(generateDragEnd(null, "blank 1"));
            });

            expect(onPlacementsChange).not.toHaveBeenCalled();
        });

        it("ignores a drop outside the bank and the blanks", () => {
            const {result, onPlacementsChange} = setupHook();

            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd({tileId: "x"}, "elsewhere"),
                );
            });

            expect(onPlacementsChange).not.toHaveBeenCalled();
        });
    });

    describe("menu focus", () => {
        it("focuses the first bank menu after a menu move", () => {
            const {result, rerender} = setupHook();
            const bankButton = document.createElement("button");
            const focus = jest.spyOn(bankButton, "focus");
            result.current.firstBankMenuRef(bankButton);

            act(() => {
                result.current.handleMove({tileId: "x"}, "blank 1");
            });
            rerender();

            expect(focus).toHaveBeenCalled();
        });

        it("falls back to the placed tile's menu when the bank is empty", () => {
            const {result, rerender} = setupHook();
            const placedButton = document.createElement("button");
            const focus = jest.spyOn(placedButton, "focus");
            result.current.placedMenuRef("blank 1")(placedButton);

            act(() => {
                result.current.handleMove({tileId: "x"}, "blank 1");
            });
            rerender();

            expect(focus).toHaveBeenCalled();
        });

        it("drops a focus request once a later action supersedes it", () => {
            // Arrange — a controlled parent declines the menu move: the
            // placements never change, so the request must not fire on
            // the next change (here, a drag).
            let accept = false;
            let placements: TilePlacements = {};
            const {result, rerender} = renderHook(() =>
                useTileMoveActions({
                    placements,
                    onPlacementsChange: (next) => {
                        if (accept) {
                            placements = next;
                        }
                    },
                    tileUsage: "single",
                    getTileLabel: (tileId) => tileId,
                    getBlankLabel: (blankId) => blankId,
                    blankIds: BLANK_IDS,
                }),
            );
            const bankButton = document.createElement("button");
            const focus = jest.spyOn(bankButton, "focus");
            result.current.firstBankMenuRef(bankButton);
            act(() => {
                result.current.handleMove({tileId: "x"}, "blank 1");
            });
            rerender();

            // Act — a later drag move applies and re-renders.
            accept = true;
            act(() => {
                result.current.handleDragEnd(
                    generateDragEnd({tileId: "y"}, "blank 2"),
                );
            });
            rerender();

            expect(focus).not.toHaveBeenCalled();
        });
    });
});
