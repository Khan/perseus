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
import {generateAnswerTileProps} from "./answer-tile.testdata";

import type {UserEvent} from "@testing-library/user-event";

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
            render(
                <AnswerTile {...generateAnswerTileProps({content: "Bongo"})} />,
            );

            expect(screen.getByText("Bongo")).toBeInTheDocument();
        });

        it("renders TeX content", () => {
            // Arrange, Act
            render(
                <AnswerTile
                    {...generateAnswerTileProps({
                        content: "$x^2$",
                        label: "x squared",
                    })}
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
                    {...generateAnswerTileProps({
                        content:
                            "![a bongo drum](https://example.com/bongo.png)",
                        label: "a bongo drum",
                    })}
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
                <AnswerTile
                    {...generateAnswerTileProps({
                        content: "",
                        label: "(empty)",
                    })}
                />,
            );

            expect(screen.getByText("(empty)")).toBeInTheDocument();
        });

        it("treats whitespace-only content as empty", () => {
            // Arrange, Act
            render(
                <AnswerTile
                    {...generateAnswerTileProps({
                        content: "  ",
                        label: "(empty)",
                    })}
                />,
            );

            expect(screen.getByText("(empty)")).toBeInTheDocument();
        });
    });

    describe("menu integration", () => {
        it("renders the action menu labeled with the tile label", () => {
            // Arrange, Act
            render(
                <AnswerTile {...generateAnswerTileProps({label: "Bongo"})} />,
            );

            expect(
                screen.getByRole("button", {name: "Bongo"}),
            ).toBeInTheDocument();
        });

        it("calls onMove with the target id when a move action is selected", async () => {
            // Arrange
            const onMove = jest.fn();
            render(
                <AnswerTile
                    {...generateAnswerTileProps({
                        label: "Bongo",
                        moveTargets: [{id: "blank-2", label: "Blank 2"}],
                        onMove,
                    })}
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

        it("calls onClear when the clear action is selected", async () => {
            // Arrange
            const onClear = jest.fn();
            render(
                <AnswerTile
                    {...generateAnswerTileProps({
                        label: "Bongo",
                        moveTargets: [],
                        clearFromLabel: "Blank 1",
                        onClear,
                    })}
                />,
            );

            // Act
            await user.click(screen.getByRole("button", {name: "Bongo"}));
            await user.click(
                await screen.findByRole("menuitem", {
                    name: "Clear from Blank 1",
                }),
            );

            // Assert
            expect(onClear).toHaveBeenCalled();
        });

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
    });

    describe("scored states", () => {
        it.each(["correct", "incorrect"] as const)(
            "does not render the action menu when showCorrectness is %s",
            (showCorrectness) => {
                // Arrange, Act
                render(
                    <AnswerTile
                        {...generateAnswerTileProps({showCorrectness})}
                    />,
                );

                expect(screen.queryByRole("button")).not.toBeInTheDocument();
            },
        );

        it("does not render the action menu when the tile is disabled", () => {
            // Arrange, Act
            render(
                <AnswerTile {...generateAnswerTileProps({disabled: true})} />,
            );

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });
    });
});
