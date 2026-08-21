import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import {DndActionMenu} from "./dnd-action-menu";
import {
    generateActionMenuProps,
    generateTestBlanks,
} from "./dnd-action-menu.testdata";

import type {UserEvent} from "@testing-library/user-event";

describe("DndActionMenu", () => {
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    });

    it("renders a menu button labeled by the tile value", () => {
        // Arrange, Act
        render(<DndActionMenu {...generateActionMenuProps()} />);

        expect(screen.getByRole("button", {name: "Bongo"})).toBeInTheDocument();
    });

    it("describes the button with the actions-menu text", () => {
        // Arrange, Act
        render(<DndActionMenu {...generateActionMenuProps()} />);

        expect(
            screen.getByRole("button", {name: "Bongo"}),
        ).toHaveAccessibleDescription("Actions menu");
    });

    it("describes the button with the remaining-count text for multi-use tiles", () => {
        // Arrange, Act
        render(
            <DndActionMenu {...generateActionMenuProps()} remainingUses={5} />,
        );

        expect(
            screen.getByRole("button", {name: "Bongo"}),
        ).toHaveAccessibleDescription("5 remaining. Actions menu");
    });

    it("opens the menu on click", async () => {
        // Arrange
        render(<DndActionMenu {...generateActionMenuProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findAllByRole("menuitem")).not.toHaveLength(0);
    });

    it("renders the header text visibly", async () => {
        // Arrange
        render(<DndActionMenu {...generateActionMenuProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findByText("Move to")).toBeInTheDocument();
    });

    it("hides the header from assistive technology", async () => {
        // Arrange
        render(<DndActionMenu {...generateActionMenuProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — text queries still find aria-hidden elements, so the
        // span is reachable here even though it's out of the a11y tree.
        const header = await screen.findByText("Move to");
        expect(header).toHaveAttribute("aria-hidden", "true");
        expect(
            screen.queryByRole("menuitem", {name: "Move to"}),
        ).not.toBeInTheDocument();
    });

    it("renders a move action per target, with visible and spoken labels", async () => {
        // Arrange
        render(<DndActionMenu {...generateActionMenuProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — no clear action, so every menu item is a move action.
        // findBy waits for the menu's portal to render; once one query has
        // succeeded, the remaining assertions can use synchronous getBy.
        // Each item shows the target's name ("Blank 1") but is spoken with
        // the full action phrasing ("Move to Blank 1").
        expect(await screen.findAllByRole("menuitem")).toHaveLength(3);
        for (const target of ["Blank 1", "Blank 2", "Blank 3"]) {
            expect(
                screen.getByRole("menuitem", {name: `Move to ${target}`}),
            ).toHaveTextContent(target);
        }
    });

    it("omits the clear action when the tile is not placed in a blank", async () => {
        // Arrange
        render(<DndActionMenu {...generateActionMenuProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findAllByRole("menuitem")).toHaveLength(3);
        expect(
            screen.queryByRole("menuitem", {name: /clear/i}),
        ).not.toBeInTheDocument();
    });

    it("renders the clear action with its spoken label when the tile is placed", async () => {
        // Arrange
        render(
            <DndActionMenu
                {...generateActionMenuProps()}
                clearFromLabel="Blank 1"
                onClear={jest.fn()}
            />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — visible text is "Clear"; the spoken label names the blank.
        const clearItem = await screen.findByRole("menuitem", {
            name: "Clear from Blank 1",
        });
        expect(clearItem).toHaveTextContent("Clear");
    });

    it("calls onMove with the target id when a move action is selected", async () => {
        // Arrange
        const onMove = jest.fn();
        render(
            <DndActionMenu {...generateActionMenuProps()} onMove={onMove} />,
        );
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Act
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        // Assert
        expect(onMove).toHaveBeenCalledWith("blank-2");
    });

    it("calls onClear when the clear action is selected", async () => {
        // Arrange
        const onClear = jest.fn();
        render(
            <DndActionMenu
                {...generateActionMenuProps()}
                clearFromLabel="Blank 1"
                onClear={onClear}
            />,
        );
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Act
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear from Blank 1"}),
        );

        // Assert
        expect(onClear).toHaveBeenCalled();
    });

    it("renders no move actions when moveTargets is empty", async () => {
        // Arrange
        render(
            <DndActionMenu
                {...generateActionMenuProps()}
                moveTargets={[]}
                clearFromLabel="Blank 1"
                onClear={jest.fn()}
            />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — only the clear action remains.
        expect(await screen.findAllByRole("menuitem")).toHaveLength(1);
        expect(
            screen.getByRole("menuitem", {name: "Clear from Blank 1"}),
        ).toBeInTheDocument();
    });

    it("disables menu interaction when disabled is true", async () => {
        // Arrange
        render(
            <DndActionMenu {...generateActionMenuProps()} disabled={true} />,
        );
        const opener = screen.getByRole("button", {name: "Bongo"});

        // Act
        await user.click(opener);

        // Assert — still focusable (aria-disabled), but the menu won't open.
        expect(opener).toHaveAttribute("aria-disabled", "true");
        expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });

    it("disables the opener when there are no move targets and no clear action", async () => {
        // Arrange — nothing to move to and nothing to clear would open an
        // empty menu, so the opener must disable itself.
        render(
            <DndActionMenu {...generateActionMenuProps()} moveTargets={[]} />,
        );
        const opener = screen.getByRole("button", {name: "Bongo"});

        // Act
        await user.click(opener);

        // Assert
        expect(opener).toHaveAttribute("aria-disabled", "true");
        expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });

    it("returns focus to the opener after a move action is selected", async () => {
        // Arrange — guards the MergedRefOpener wiring: ActionMenu can only
        // restore focus on close if its injected ref reached the button.
        render(<DndActionMenu {...generateActionMenuProps()} />);
        const opener = screen.getByRole("button", {name: "Bongo"});
        await user.click(opener);

        // Act
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        // Assert
        expect(opener).toHaveFocus();
    });

    it("forwards its ref to the opener button", () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        render(<DndActionMenu {...generateActionMenuProps()} ref={ref} />);

        // Assert — the parent uses this ref for post-move focus return.
        expect(ref.current).toBe(screen.getByRole("button", {name: "Bongo"}));
    });
});

// Guards against tests mutating shared fixtures.
describe("generateTestBlanks", () => {
    it("returns a fresh array on each call", () => {
        // Arrange, Act
        const first = generateTestBlanks();
        const second = generateTestBlanks();

        expect(first).not.toBe(second);
        expect(first).toEqual(second);
    });
});
