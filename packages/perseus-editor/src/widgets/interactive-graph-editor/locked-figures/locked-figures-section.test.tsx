import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedFiguresSection from "./locked-figures-section";
import {getDefaultFigureForType} from "./util";

import type {UserEvent} from "@testing-library/user-event";

const defaultFigures = [
    getDefaultFigureForType("point"),
    getDefaultFigureForType("line"),
    getDefaultFigureForType("vector"),
];

describe("LockedFiguresSection", () => {
    let userEvent: UserEvent;
    const getDefaultFigureHeader = (type: "point" | "line" | "vector") => {
        switch (type) {
            case "point":
                return screen.getByRole("button", {
                    name: "Point (0, 0) grayH, filled",
                });
            case "line":
                return screen.getByRole("button", {
                    name: "Line (0, 0), (2, 2) grayH, solid",
                });
            case "vector":
                return screen.getByRole("button", {
                    name: "Vector (0, 0), (2, 2) grayH, solid",
                });
        }
    };
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders", () => {
        // Arrange, Act
        render(
            <LockedFiguresSection
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Add locked figure")).toBeInTheDocument();
    });

    test("renders no expand/collapse button when there are no figures", () => {
        // Arrange, Act
        render(
            <LockedFiguresSection
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.queryByRole("button", {name: "Expand all"})).toBeNull();
        expect(screen.queryByRole("button", {name: "Collapse all"})).toBeNull();
    });

    test("renders with figures", () => {
        // Arrange, Act
        render(
            <LockedFiguresSection
                figures={defaultFigures}
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        expect(screen.getByText("Point (0, 0)")).toBeInTheDocument();
        expect(screen.getByText("Line (0, 0), (2, 2)")).toBeInTheDocument();
        expect(screen.getByText("Vector (0, 0), (2, 2)")).toBeInTheDocument();
        expect(
            screen.getByRole("button", {name: "Expand all"}),
        ).toBeInTheDocument();
    });

    test("renders all collapsed by default", () => {
        // Arrange
        render(
            <LockedFiguresSection
                figures={defaultFigures}
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const pointHeader = getDefaultFigureHeader("point");
        const lineHeader = getDefaultFigureHeader("line");
        const vectorHeader = getDefaultFigureHeader("vector");

        // Assert
        expect(pointHeader.getAttribute("aria-expanded")).toBe("false");
        expect(lineHeader.getAttribute("aria-expanded")).toBe("false");
        expect(vectorHeader.getAttribute("aria-expanded")).toBe("false");
    });

    test("renders all expanded when expand all button is clicked", async () => {
        // Arrange
        render(
            <LockedFiguresSection
                figures={defaultFigures}
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const expandAllButton = screen.getByRole("button", {
            name: "Expand all",
        });

        const pointHeader = getDefaultFigureHeader("point");
        const lineHeader = getDefaultFigureHeader("line");
        const vectorHeader = getDefaultFigureHeader("vector");

        // Act
        await userEvent.click(expandAllButton);

        // Assert
        expect(pointHeader.getAttribute("aria-expanded")).toBe("true");
        expect(lineHeader.getAttribute("aria-expanded")).toBe("true");
        expect(vectorHeader.getAttribute("aria-expanded")).toBe("true");
    });

    test("renders all collapsed when collapse all button is clicked", async () => {
        // Arrange
        render(
            <LockedFiguresSection
                figures={defaultFigures}
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const expandAllButton = screen.getByRole("button", {
            name: "Expand all",
        });

        const pointHeader = getDefaultFigureHeader("point");
        const lineHeader = getDefaultFigureHeader("line");
        const vectorHeader = getDefaultFigureHeader("vector");

        // Act
        await userEvent.click(expandAllButton);

        const collapseAllButton = screen.getByRole("button", {
            name: "Collapse all",
        });
        await userEvent.click(collapseAllButton);

        // Assert
        expect(pointHeader.getAttribute("aria-expanded")).toBe("false");
        expect(lineHeader.getAttribute("aria-expanded")).toBe("false");
        expect(vectorHeader.getAttribute("aria-expanded")).toBe("false");
    });

    test("render collapse button when some figures are expanded", async () => {
        // Arrange
        render(
            <LockedFiguresSection
                figures={defaultFigures}
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const pointHeader = screen.getByRole("button", {
            name: "Point (0, 0) grayH, filled",
        });

        // Act
        await userEvent.click(pointHeader);

        // Assert
        expect(
            screen.getByRole("button", {name: "Collapse all"}),
        ).toBeInTheDocument();
    });

    test("expands the respective figure when its header is clicked", async () => {
        // Arrange
        render(
            <LockedFiguresSection
                figures={[
                    getDefaultFigureForType("point"),
                    {...getDefaultFigureForType("point"), coord: [1, 1]},
                    getDefaultFigureForType("line"),
                ]}
                onChange={jest.fn()}
                editingDisabled={false}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        const pointHeader = screen.getByRole("button", {
            name: "Point (0, 0) grayH, filled",
        });
        const point2Header = screen.getByRole("button", {
            name: "Point (1, 1) grayH, filled",
        });
        const lineHeader = screen.getByRole("button", {
            name: "Line (0, 0), (2, 2) grayH, solid",
        });

        // Act
        await userEvent.click(point2Header);

        // Assert
        expect(point2Header.getAttribute("aria-expanded")).toBe("true");
        expect(pointHeader.getAttribute("aria-expanded")).toBe("false");
        expect(lineHeader.getAttribute("aria-expanded")).toBe("false");
    });

    test("should disable inputs and expand the accordions when editingDisabled is true", () => {
        // Arrange
        render(
            <fieldset disabled>
                <LockedFiguresSection
                    figures={defaultFigures}
                    editingDisabled={true}
                    onChange={jest.fn()}
                />
            </fieldset>,
            {
                wrapper: RenderStateRoot,
            },
        );
        const pointHeader = getDefaultFigureHeader("point");
        const lineHeader = getDefaultFigureHeader("line");
        const vectorHeader = getDefaultFigureHeader("vector");

        // Assert: All figures are expanded
        expect(pointHeader.getAttribute("aria-expanded")).toBe("true");
        expect(lineHeader.getAttribute("aria-expanded")).toBe("true");
        expect(vectorHeader.getAttribute("aria-expanded")).toBe("true");
    });
});
