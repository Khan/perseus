import {DragDropProvider, useDragDropManager} from "@dnd-kit/react";
import {act, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {mockImageLoading} from "../../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";
import {PerseusDndProvider} from "../perseus-dnd-provider";

import {AnswerTile} from "./answer-tile";
import styles from "./answer-tile.module.css";
import {generateAnswerTileProps} from "./answer-tile.testdata";

import type {DragDropManager, DragEndEvent} from "@dnd-kit/react";
import type {UserEvent} from "@testing-library/user-event";

// Renders tiles inside their own drag context and captures the manager,
// so tests can assert on the registered draggables' state.
let capturedManager: DragDropManager | null = null;
function CaptureManager() {
    capturedManager = useDragDropManager();
    return null;
}
function DndProbeWrapper({children}: {children: React.ReactNode}) {
    return (
        <DragDropProvider>
            <CaptureManager />
            {children}
        </DragDropProvider>
    );
}

describe("AnswerTile", () => {
    let user: UserEvent;

    beforeEach(() => {
        capturedManager = null;
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
    });

    it("renders text content from markdown", () => {
        // Arrange, Act
        render(
            <AnswerTile {...generateAnswerTileProps({content: "Banana"})} />,
        );

        expect(screen.getByText("Banana")).toBeInTheDocument();
    });

    it("renders image content with its alt text", async () => {
        // Arrange — the URL is never fetched: the mock stands in for the
        // browser's image loading and fires the load event on a timer.
        const unmockImageLoading = mockImageLoading();
        render(
            <AnswerTile
                {...generateAnswerTileProps({
                    content: "![a bongo drum](http://localhost/bongo.png)",
                    label: "a bongo drum",
                })}
            />,
        );

        // Act
        act(() => {
            jest.runOnlyPendingTimers();
        });

        // Assert
        expect(screen.getByAltText("a bongo drum")).toBeInTheDocument();

        unmockImageLoading();
    });

    it("sizes an image tile's image through the authored height", () => {
        // Arrange, Act
        const {container} = render(
            <AnswerTile
                {...generateAnswerTileProps({
                    content: "![a bongo drum](http://localhost/bongo.png)",
                    label: "a bongo drum",
                    imageHeight: 48,
                })}
            />,
        );

        // Assert — the CSS reads the variable on the tile root, which
        // is a semantics-free div with no query-friendly handle.
        // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
        expect(container.firstElementChild?.getAttribute("style")).toContain(
            "--answer-tile-image-height: 48px",
        );
    });

    it.each(["", "  "])(
        "renders the label for screen readers when content is %j",
        (content) => {
            // Arrange, Act
            render(
                <AnswerTile
                    {...generateAnswerTileProps({content, label: "(empty)"})}
                />,
            );

            expect(screen.getByText("(empty)")).toBeInTheDocument();
        },
    );

    it("renders the action menu labeled with the tile label", () => {
        // Arrange, Act
        render(<AnswerTile {...generateAnswerTileProps({label: "Bongo"})} />);

        expect(screen.getByRole("button", {name: "Bongo"})).toBeInTheDocument();
    });

    // The tile's one piece of logic: a scored tile has no menu, whichever
    // result it shows.
    it.each([
        {scoring: "correct"},
        {scoring: "incorrect"},
        {scoring: "unused"},
    ] as const)("does not render the action menu for a %o tile", (props) => {
        // Arrange, Act
        render(<AnswerTile {...generateAnswerTileProps(props)} />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    // onClear is optional on the tile and the menu, so dropping the tile's
    // forwarding would compile and fail silently. This also covers the
    // Clear-only menu of a placed tile in a one-blank exercise. The
    // PerseusDndProvider supplies the activation constraints that keep
    // a still click on the opener a click instead of a drag.
    it("calls onClear when the clear action is selected", async () => {
        // Arrange
        const onClear = jest.fn();
        render(
            <PerseusDndProvider>
                <AnswerTile
                    {...generateAnswerTileProps({
                        label: "Bongo",
                        moveTargets: [],
                        clearFromLabel: "Blank 1",
                        onClear,
                    })}
                />
            </PerseusDndProvider>,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        // Assert
        expect(onClear).toHaveBeenCalled();
    });

    // The drag gating is asserted on the dnd-kit registry (the state the
    // sensors consult) rather than on DOM attributes, whose application
    // is scheduled on animation frames that JSDOM never delivers.
    it("registers the tile as draggable", () => {
        // Arrange, Act
        render(<AnswerTile {...generateAnswerTileProps()} />, {
            wrapper: DndProbeWrapper,
        });

        const [draggable] = capturedManager!.registry.draggables.value;
        expect(draggable.disabled).toBe(false);
    });

    it.each([
        {scoring: "correct"},
        {scoring: "incorrect"},
        {scoring: "unused"},
    ] as const)("disables dragging for a %o tile", (props) => {
        // Arrange, Act
        render(<AnswerTile {...generateAnswerTileProps(props)} />, {
            wrapper: DndProbeWrapper,
        });

        const [draggable] = capturedManager!.registry.draggables.value;
        expect(draggable.disabled).toBe(true);
    });

    // menuRef is optional too, and the widget's after-move focus return
    // depends on it reaching the opener.
    it("forwards menuRef to the opener button", () => {
        // Arrange
        const menuRef = React.createRef<HTMLButtonElement>();

        // Act
        render(
            <AnswerTile
                {...generateAnswerTileProps({label: "Bongo", menuRef})}
            />,
        );

        // Assert
        expect(menuRef.current).toBe(
            screen.getByRole("button", {name: "Bongo"}),
        );
    });
    describe("a tile that mounts under the pointer", () => {
        function renderDroppedTile(mountsUnderPointer: boolean) {
            render(
                <AnswerTile
                    {...generateAnswerTileProps({
                        hidesMenuAtRest: true,
                        mountsUnderPointer,
                    })}
                />,
                {wrapper: DndProbeWrapper},
            );
            // The draggable's element is the tile root.
            const [draggable] = capturedManager!.registry.draggables.value;
            return draggable.element;
        }

        it("renders full size when it mounts", () => {
            // Arrange, Act
            const tile = renderDroppedTile(true);

            // Assert
            expect(tile).toHaveClass(styles.heldExpanded);
        });

        it("renders at rest when it mounts elsewhere", () => {
            // Arrange, Act
            const tile = renderDroppedTile(false);

            // Assert
            expect(tile).not.toHaveClass(styles.heldExpanded);
        });

        it("hands off to hover once the pointer moves", async () => {
            // Arrange
            const tile = renderDroppedTile(true);

            // Act
            await user.pointer({
                target: document.body,
                coords: {clientX: 10, clientY: 10},
            });

            // Assert
            expect(tile).not.toHaveClass(styles.heldExpanded);
        });
    });

    describe("a tile that stays mounted through a drop", () => {
        // Ends the tile's drag as dnd-kit reports it to monitors.
        function endOwnDrag(pointerType: string) {
            const [draggable] = capturedManager!.registry.draggables.value;
            // eslint-disable-next-line no-restricted-syntax -- Monitors read only these fields; a full dnd-kit event needs a live drag.
            const event = {
                operation: {source: {id: draggable.id}},
                nativeEvent: {pointerType},
                canceled: false,
            } as unknown as DragEndEvent;
            act(() => {
                capturedManager!.monitor.dispatch("dragend", event);
            });
            return draggable.element;
        }

        function renderPlacedTile() {
            render(
                <AnswerTile
                    {...generateAnswerTileProps({hidesMenuAtRest: true})}
                />,
                {wrapper: DndProbeWrapper},
            );
        }

        it("renders full size after a mouse drag ends", () => {
            // Arrange
            renderPlacedTile();

            // Act
            const tile = endOwnDrag("mouse");

            // Assert
            expect(tile).toHaveClass(styles.heldExpanded);
        });

        it("renders full size after a mouse drop on its blank", () => {
            // Arrange
            render(
                <AnswerTile
                    {...generateAnswerTileProps({
                        fromBlankId: "blank 1",
                        hidesMenuAtRest: true,
                    })}
                />,
                {wrapper: DndProbeWrapper},
            );
            const [draggable] = capturedManager!.registry.draggables.value;
            // eslint-disable-next-line no-restricted-syntax -- Monitors read only these fields; a full dnd-kit event needs a live drag.
            const event = {
                operation: {
                    source: {id: "another tile"},
                    target: {id: "blank 1"},
                },
                nativeEvent: {pointerType: "mouse"},
                canceled: false,
            } as unknown as DragEndEvent;

            // Act
            act(() => {
                capturedManager!.monitor.dispatch("dragend", event);
            });

            // Assert
            expect(draggable.element).toHaveClass(styles.heldExpanded);
        });

        it("renders at rest after a touch drag ends", () => {
            // Arrange
            renderPlacedTile();

            // Act
            const tile = endOwnDrag("touch");

            // Assert
            expect(tile).not.toHaveClass(styles.heldExpanded);
        });
    });
});
