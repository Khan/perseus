import {act, render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as React from "react";

import * as Dependencies from "../../../dependencies";
import {mockImageLoading} from "../../../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import {AnswerTile} from "./answer-tile";
import {generateAnswerTileMenu} from "./answer-tile.testdata";

import type {UserEvent} from "@testing-library/user-event";

function defaultProps() {
    return {
        tileId: "tile-1",
        content: "Bongo",
        label: "Bongo",
        state: "rest",
        menu: null,
    } as const;
}

describe("AnswerTile", () => {
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
    });

    describe("content", () => {
        it("renders text content from markdown", () => {
            // Arrange, Act
            render(<AnswerTile {...defaultProps()} content="Bongo" />);

            expect(screen.getByText("Bongo")).toBeInTheDocument();
        });

        it("renders TeX content", () => {
            // Arrange, Act
            render(
                <AnswerTile
                    {...defaultProps()}
                    content="$x^2$"
                    label="x squared"
                />,
            );

            expect(screen.getByText("x^2")).toBeInTheDocument();
        });

        it("renders image content with its alt text", async () => {
            // Arrange
            const unmockImageLoading = mockImageLoading();

            // Act
            render(
                <AnswerTile
                    {...defaultProps()}
                    content="![a bongo drum](https://example.com/bongo.png)"
                    label="a bongo drum"
                />,
            );

            // The mocked image loader fires its load event on a timer.
            act(() => {
                jest.runOnlyPendingTimers();
            });

            // Assert
            expect(screen.getByAltText("a bongo drum")).toBeInTheDocument();

            unmockImageLoading();
        });

        it("renders the label for screen readers when content is empty", () => {
            // Arrange, Act
            render(
                <AnswerTile {...defaultProps()} content="" label="(empty)" />,
            );

            expect(screen.getByText("(empty)")).toBeInTheDocument();
        });

        it("treats whitespace-only content as empty", () => {
            // Arrange, Act
            render(
                <AnswerTile {...defaultProps()} content="  " label="(empty)" />,
            );

            expect(screen.getByText("(empty)")).toBeInTheDocument();
        });
    });

    describe("menu integration", () => {
        it("renders the action menu when menu data is provided", () => {
            // Arrange, Act
            render(
                <AnswerTile
                    {...defaultProps()}
                    menu={generateAnswerTileMenu()}
                />,
            );

            expect(
                screen.getByRole("button", {name: "Bongo"}),
            ).toBeInTheDocument();
        });

        it("renders no menu when menu is null", () => {
            // Arrange, Act
            render(<AnswerTile {...defaultProps()} menu={null} />);

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("calls onMove with the target id when a move action is selected", async () => {
            // Arrange
            const onMove = jest.fn();
            render(
                <AnswerTile
                    {...defaultProps()}
                    menu={generateAnswerTileMenu({onMove})}
                />,
            );

            // Act
            await user.click(screen.getByRole("button", {name: "Bongo"}));
            await user.click(
                await screen.findByRole("menuitem", {name: "Move to Blank 2"}),
            );

            // Assert
            expect(onMove).toHaveBeenCalledWith("blank-2");
        });

        it("forwards menuRef to the opener button", () => {
            // Arrange
            const menuRef = React.createRef<HTMLButtonElement>();

            // Act
            render(
                <AnswerTile
                    {...defaultProps()}
                    menu={generateAnswerTileMenu({menuRef})}
                />,
            );

            // Assert
            expect(menuRef.current).toBe(
                screen.getByRole("button", {name: "Bongo"}),
            );
        });

        it("keeps the menu opener focusable when visibility is on-hover-or-focus", async () => {
            // Arrange
            render(
                <AnswerTile
                    {...defaultProps()}
                    menu={generateAnswerTileMenu()}
                    menuVisibility="on-hover-or-focus"
                />,
            );

            // Act
            await user.tab();

            // Assert
            expect(screen.getByRole("button", {name: "Bongo"})).toHaveFocus();
        });
    });

    describe("states", () => {
        // The icon graphic (check vs x) lives in a generated stylesheet,
        // so jsdom cannot tell the two apart. The stories cover which
        // glyph shows for each state.
        it.each(["correct", "incorrect"] as const)(
            "renders a state icon when the state is %s",
            (state) => {
                // Arrange, Act
                render(<AnswerTile {...defaultProps()} state={state} />);

                expect(
                    screen.getByTestId("answer-tile-state-icon-tile-1"),
                ).toBeInTheDocument();
            },
        );

        it("hides the state icons from assistive technology", () => {
            // Arrange, Act
            render(<AnswerTile {...defaultProps()} state="correct" />);

            expect(
                screen.getByTestId("answer-tile-state-icon-tile-1"),
            ).toHaveAttribute("aria-hidden", "true");
        });

        it.each(["correct", "incorrect", "disabled"] as const)(
            "does not render the action menu when the state is %s",
            (state) => {
                // Arrange, Act
                render(
                    <AnswerTile
                        {...defaultProps()}
                        state={state}
                        menu={generateAnswerTileMenu()}
                    />,
                );

                expect(screen.queryByRole("button")).not.toBeInTheDocument();
            },
        );

        it("renders no state icon when the state is disabled", () => {
            // Arrange, Act
            render(<AnswerTile {...defaultProps()} state="disabled" />);

            expect(
                screen.queryByTestId("answer-tile-state-icon-tile-1"),
            ).not.toBeInTheDocument();
        });

        it("marks the tile as disabled via its class when the state is disabled", () => {
            // Arrange, Act
            render(<AnswerTile {...defaultProps()} state="disabled" />);

            expect(screen.getByTestId("answer-tile-tile-1")).toHaveClass(
                "disabled",
            );
        });
    });
});
