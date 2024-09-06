import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedPolygonSettings from "./locked-polygon-settings";
import {getDefaultFigureForType} from "./util";

import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("polygon"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
};

describe("LockedPolygonSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Polygon, 3 sides");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects number of sides", () => {
        // Arrange

        // Act
        render(
            <LockedPolygonSettings
                {...defaultProps}
                points={[
                    [0, 0],
                    [1, 1],
                    [2, 2],
                    [1, -1],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        const titleText = screen.getByText("Polygon, 4 sides");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects color", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} color="blue" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByLabelText(
            "blue, stroke solid, fill none",
        );
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects stroke style", () => {
        // Arrange

        // Act
        render(
            <LockedPolygonSettings {...defaultProps} strokeStyle="dashed" />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        const titleText = screen.getByLabelText(
            "grayH, stroke dashed, fill none",
        );
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects fill style", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} fillStyle="solid" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByLabelText(
            "grayH, stroke solid, fill solid",
        );
        expect(titleText).toBeInTheDocument();
    });

    test("shows delete buttons when there are more than 3 points", () => {
        // Arrange

        // Act
        render(
            <LockedPolygonSettings
                {...defaultProps}
                points={[
                    [0, 0],
                    [1, 1],
                    [2, 2],
                    [1, -1],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        const deleteButtons = screen.getAllByLabelText(/Delete polygon point/);
        expect(deleteButtons).toHaveLength(4);
    });

    test("does not show delete buttons when there are 3 points", () => {
        // Arrange

        // Act
        render(<LockedPolygonSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const deleteButtons =
            screen.queryAllByLabelText(/Delete polygon point/);
        expect(deleteButtons).toHaveLength(0);
    });

    test("calls onToggle when header is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(
            <LockedPolygonSettings {...defaultProps} onToggle={onToggle} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const header = screen.getByRole("button", {
            name: "Polygon, 3 sides grayH, stroke solid, fill none",
        });
        await userEvent.click(header);

        // Assert
        expect(onToggle).toHaveBeenCalled();
    });

    test("calls onChange when the whole polygon is moved up", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveUpButton = screen.getByLabelText("Move polygon up");
        await userEvent.click(moveUpButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            points: [
                [1, 2],
                [2, 2],
                [2, 3],
                [1, 3],
            ],
        });
    });

    test("calls onChange when the whole polygon is moved down", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveDownButton = screen.getByLabelText("Move polygon down");
        await userEvent.click(moveDownButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            points: [
                [1, 0],
                [2, 0],
                [2, 1],
                [1, 1],
            ],
        });
    });

    test("calls onChange when the whole polygon is moved left", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveLeftButton = screen.getByLabelText("Move polygon left");
        await userEvent.click(moveLeftButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            points: [
                [0, 1],
                [1, 1],
                [1, 2],
                [0, 2],
            ],
        });
    });

    test("calls onChange when the whole polygon is moved right", async () => {
        // Arrange
        const onChangeSpy = jest.fn();
        render(
            <LockedPolygonSettings
                {...defaultProps}
                onChangeProps={onChangeSpy}
                points={[
                    [1, 1],
                    [2, 1],
                    [2, 2],
                    [1, 2],
                ]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Act
        const moveRightButton = screen.getByLabelText("Move polygon right");
        await userEvent.click(moveRightButton);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            points: [
                [2, 1],
                [3, 1],
                [3, 2],
                [2, 2],
            ],
        });
    });
});
