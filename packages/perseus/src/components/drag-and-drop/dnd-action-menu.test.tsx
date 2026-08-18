import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import {DndActionMenu} from "./dnd-action-menu";

import type {MoveTarget} from "./dnd-action-menu";

const THREE_BLANKS: ReadonlyArray<MoveTarget> = [
    {id: "blank-1", label: "Blank 1"},
    {id: "blank-2", label: "Blank 2"},
    {id: "blank-3", label: "Blank 3"},
];

function clearAction(onClear: () => void = jest.fn()) {
    return {targetLabel: "Blank 1", onClear};
}

function defaultProps() {
    return {
        tileId: "tile-1",
        label: "Bongo",
        moveTargets: THREE_BLANKS,
        onMove: jest.fn(),
        placement: "above",
        disabled: false,
    } as const;
}

describe("DndActionMenu", () => {
    it("renders a menu button labeled by the tile value", () => {
        // Arrange, Act
        render(<DndActionMenu {...defaultProps()} label="Bongo" />);

        expect(screen.getByRole("button", {name: "Bongo"})).toBeInTheDocument();
    });

    it("describes the button with the actions-menu text", () => {
        // Arrange, Act
        render(<DndActionMenu {...defaultProps()} />);

        expect(
            screen.getByRole("button", {name: "Bongo"}),
        ).toHaveAccessibleDescription("Actions menu");
    });

    it("describes the button with the remaining-count text for multi-use tiles", () => {
        // Arrange, Act
        render(
            <DndActionMenu
                {...defaultProps()}
                label="Penny"
                remainingUses={5}
            />,
        );

        expect(
            screen.getByRole("button", {name: "Penny"}),
        ).toHaveAccessibleDescription("5 remaining. Actions menu");
    });

    it("opens the menu on click", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findAllByRole("menuitem")).not.toHaveLength(0);
    });

    it("renders the header text visibly", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findByText("Move to")).toBeInTheDocument();
    });

    it("hides the header from assistive technology", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        const header = await screen.findByTestId("dnd-action-menu-header");
        expect(header).toHaveAttribute("aria-hidden", "true");
        expect(
            screen.queryByRole("menuitem", {name: "Move to"}),
        ).not.toBeInTheDocument();
    });

    it("renders one move action per move target", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <DndActionMenu {...defaultProps()} moveTargets={THREE_BLANKS} />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — no clear action, so every menu item is a move action.
        expect(await screen.findAllByRole("menuitem")).toHaveLength(3);
    });

    it("labels each move action with the target name", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <DndActionMenu {...defaultProps()} moveTargets={THREE_BLANKS} />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findByText("Blank 1")).toBeInTheDocument();
        expect(screen.getByText("Blank 2")).toBeInTheDocument();
        expect(screen.getByText("Blank 3")).toBeInTheDocument();
    });

    it("gives each move action its spoken action label", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <DndActionMenu {...defaultProps()} moveTargets={THREE_BLANKS} />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(
            await screen.findByRole("menuitem", {name: "Move to Blank 1"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("menuitem", {name: "Move to Blank 2"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("menuitem", {name: "Move to Blank 3"}),
        ).toBeInTheDocument();
    });

    it("omits the clear action when the tile is not placed in a blank", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findAllByRole("menuitem")).toHaveLength(3);
        expect(
            screen.queryByRole("menuitem", {name: /clear/i}),
        ).not.toBeInTheDocument();
    });

    it("renders the clear action after a separator when the tile is placed", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <DndActionMenu {...defaultProps()} clearAction={clearAction()} />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — the element right before Clear is WB's separator, which
        // is visual-only (aria-hidden), so it has no "separator" role.
        const clearItem = await screen.findByRole("menuitem", {
            name: "Clear Blank 1",
        });
        expect(clearItem).toBeInTheDocument();
        // eslint-disable-next-line testing-library/no-node-access -- the separator is aria-hidden, so sibling order is the only way to assert its position
        expect(clearItem.previousElementSibling).toHaveAttribute(
            "aria-hidden",
            "true",
        );
    });

    it("gives the clear action its spoken action label", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <DndActionMenu {...defaultProps()} clearAction={clearAction()} />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        const clearItem = await screen.findByRole("menuitem", {
            name: "Clear Blank 1",
        });
        expect(clearItem).toHaveTextContent("Clear");
    });

    it("calls onMove with the target id when a move action is selected", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        const onMove = jest.fn();
        render(<DndActionMenu {...defaultProps()} onMove={onMove} />);
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
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        const onClear = jest.fn();
        render(
            <DndActionMenu
                {...defaultProps()}
                clearAction={clearAction(onClear)}
            />,
        );
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Act
        await user.click(
            await screen.findByRole("menuitem", {name: "Clear Blank 1"}),
        );

        // Assert
        expect(onClear).toHaveBeenCalled();
    });

    it("renders no move actions when moveTargets is empty", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <DndActionMenu
                {...defaultProps()}
                moveTargets={[]}
                clearAction={clearAction()}
            />,
        );

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert — only the clear action remains.
        expect(await screen.findAllByRole("menuitem")).toHaveLength(1);
        expect(
            screen.getByRole("menuitem", {name: "Clear Blank 1"}),
        ).toBeInTheDocument();
    });

    it("disables menu interaction when disabled is true", async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} disabled={true} />);
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
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} moveTargets={[]} />);
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
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} />);
        const opener = screen.getByRole("button", {name: "Bongo"});
        await user.click(opener);

        // Act
        await user.click(
            await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
        );

        // Assert
        expect(opener).toHaveFocus();
    });

    it('aligns the menu above the opener when placement is "above"', async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} placement="above" />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findByTestId("dropdown-popper")).toHaveAttribute(
            "data-placement",
            "top-start",
        );
    });

    it('aligns the menu below the opener when placement is "below"', async () => {
        // Arrange
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(<DndActionMenu {...defaultProps()} placement="below" />);

        // Act
        await user.click(screen.getByRole("button", {name: "Bongo"}));

        // Assert
        expect(await screen.findByTestId("dropdown-popper")).toHaveAttribute(
            "data-placement",
            "bottom-start",
        );
    });

    it("forwards its ref to the opener button", () => {
        // Arrange
        const ref = React.createRef<HTMLButtonElement>();

        // Act
        render(<DndActionMenu {...defaultProps()} ref={ref} />);

        // Assert — the parent uses this ref for post-move focus return.
        expect(ref.current).toBe(screen.getByRole("button", {name: "Bongo"}));
    });
});
