import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import CoordinatePairInput from '../coordinate-pair-input';

import type {UserEvent} from "@testing-library/user-event";

describe('CoordinatePairInput', () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("Show correct labels by default", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <CoordinatePairInput
                coord={[0, 0]}
                onChange={onChangeProps}
            />,
            {
                wrapper: RenderStateRoot,
            }
        );

        // Assert
        expect(screen.getByLabelText("x coord")).toBeInTheDocument();
        expect(screen.getByLabelText("y coord")).toBeInTheDocument();
    });

    test("Shows the correct labels if they are passed in", async () => {
        // Arrange
        const onChangeProps = jest.fn();
        render(
            <CoordinatePairInput
                coord={[0, 0]}
                labels={["coord 1", "coord 2"]}
                onChange={onChangeProps}
            />,
            {
                wrapper: RenderStateRoot,
            }
        );

        // Assert
        expect(screen.getByLabelText("coord 1")).toBeInTheDocument();
        expect(screen.getByLabelText("coord 2")).toBeInTheDocument();

    });

    test("Shows an error if the x coord is out of range", async () => {
        // Arrange

        // Act
        const onChangeProps = jest.fn();
        render(
            <CoordinatePairInput
                coord={[0, 6]}
                range={[[5, 10], [5, 10]]}
                onChange={onChangeProps}
            />,
            {
                wrapper: RenderStateRoot,
            }
        );

        // Assert
        expect(screen.getByText("x coord out of range (5 to 10)")).toBeInTheDocument();
        expect(screen.queryByText("y coord out of range (5 to 10)")).not.toBeInTheDocument();
    });

    test("Shows an error if the y coord is out of range", async () => {
        // Arrange

        // Act
        const onChangeProps = jest.fn();
        render(
            <CoordinatePairInput
                coord={[6, 0]}
                range={[[5, 10], [5, 10]]}
                onChange={onChangeProps}
            />,
            {
                wrapper: RenderStateRoot,
            }
        );

        // Assert
        expect(screen.getByText("y coord out of range (5 to 10)")).toBeInTheDocument();
        expect(screen.queryByText("x coord out of range (5 to 10)")).not.toBeInTheDocument();
    });

    test("Shows both errors if both coords are out of range", async () => {
        // Arrange

        // Act
        const onChangeProps = jest.fn();
        render(
            <CoordinatePairInput
                coord={[0, 0]}
                range={[[5, 10], [5, 10]]}
                onChange={onChangeProps}
            />,
            {
                wrapper: RenderStateRoot,
            }
        );

        // Assert
        expect(screen.getByText("x coord out of range (5 to 10)")).toBeInTheDocument();
        expect(screen.getByText("y coord out of range (5 to 10)")).toBeInTheDocument();
    });

    test("Does not show an error if the coord is in range", async () => {
        // Arrange

        // Act
        const onChangeProps = jest.fn();
        render(
            <CoordinatePairInput
                coord={[7, 7]}
                range={[[5, 10], [5, 10]]}
                onChange={onChangeProps}
            />,
            {
                wrapper: RenderStateRoot,
            }
        );

        // Assert
        expect(screen.queryByText("x coord out of range (5 to 10)")).not.toBeInTheDocument();
        expect(screen.queryByText("y coord out of range (5 to 10)")).not.toBeInTheDocument();
    });
});