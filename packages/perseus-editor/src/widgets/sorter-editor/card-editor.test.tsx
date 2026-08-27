import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CardEditor from "./card-editor";

import type {UserEvent} from "@testing-library/user-event";

type Props = React.ComponentProps<typeof CardEditor>;

/**
 * Renders a card inside a list, since the card is a list item. Anything a test
 * asserts on should be passed in explicitly rather than left to these
 * placeholder values.
 */
function renderCard(props: Partial<Props> = {}) {
    render(
        <ol>
            <CardEditor
                index={0}
                value="Cat"
                isFirst={false}
                isLast={false}
                onChange={() => {}}
                onMoveUp={() => {}}
                onMoveDown={() => {}}
                onDelete={() => {}}
                {...props}
            />
        </ol>,
    );
}

describe("card-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders the card's text", () => {
        // Arrange, Act
        renderCard({value: "Cat"});

        // Assert
        expect(screen.getByRole("textbox")).toHaveValue("Cat");
    });

    it("names the input and its controls after the card's position", () => {
        // Arrange, Act
        renderCard({index: 1});

        // Assert: the index is zero-based, but authors count from one.
        expect(screen.getByRole("textbox")).toHaveAccessibleName("Card 2");
        expect(
            screen.getByRole("button", {name: "Move card 2 up"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Move card 2 down"}),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Delete card 2"}),
        ).toBeInTheDocument();
    });

    it("calls onChange with the edited text", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        renderCard({value: "Cat", onChange: onChangeMock});

        // Act
        await userEvent.type(screen.getByRole("textbox"), "s");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith("Cats");
    });

    it("calls onMoveUp when move up is clicked", async () => {
        // Arrange
        const onMoveUpMock = jest.fn();
        renderCard({index: 1, onMoveUp: onMoveUpMock});

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move card 2 up"}),
        );

        // Assert
        expect(onMoveUpMock).toHaveBeenCalled();
    });

    it("calls onMoveDown when move down is clicked", async () => {
        // Arrange
        const onMoveDownMock = jest.fn();
        renderCard({index: 1, onMoveDown: onMoveDownMock});

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move card 2 down"}),
        );

        // Assert
        expect(onMoveDownMock).toHaveBeenCalled();
    });

    it("calls onDelete when delete is clicked", async () => {
        // Arrange
        const onDeleteMock = jest.fn();
        renderCard({index: 1, onDelete: onDeleteMock});

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 2"}),
        );

        // Assert
        expect(onDeleteMock).toHaveBeenCalled();
    });

    it("disables move up for the first card", () => {
        // Arrange, Act
        renderCard({index: 0, isFirst: true});

        // Assert
        expect(
            screen.getByRole("button", {name: "Move card 1 up"}),
        ).toHaveAttribute("aria-disabled", "true");
    });

    it("disables move down for the last card", () => {
        // Arrange, Act
        renderCard({index: 0, isLast: true});

        // Assert
        expect(
            screen.getByRole("button", {name: "Move card 1 down"}),
        ).toHaveAttribute("aria-disabled", "true");
    });

    it("does not call onMoveUp when the first card's move up is clicked", async () => {
        // Arrange
        const onMoveUpMock = jest.fn();
        renderCard({index: 0, isFirst: true, onMoveUp: onMoveUpMock});

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move card 1 up"}),
        );

        // Assert
        expect(onMoveUpMock).not.toHaveBeenCalled();
    });
});
