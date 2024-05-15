import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import LockedLineSettings from "../locked-line-settings";
import {getDefaultFigureForType} from "../util";

const defaultProps = {
    ...getDefaultFigureForType("line"),
    onChangeProps: () => {},
    onRemove: () => {},
};

describe("LockedPointSettings", () => {
    test("renders", () => {
        // Arrange

        // Act
        render(<LockedLineSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Line (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects kind (segment)", () => {
        // Arrange

        // Act
        render(<LockedLineSettings {...defaultProps} kind="segment" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Segment (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    test("summary reflects kind (ray)", () => {
        // Arrange

        // Act
        render(<LockedLineSettings {...defaultProps} kind="ray" />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Ray (0, 0), (2, 2)");
        expect(titleText).toBeInTheDocument();
    });

    test("should show the line's color and style by default", () => {
        // Arrange
        render(<LockedLineSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const lineSwatch = screen.getByLabelText("grayH, solid");

        // Assert
        expect(lineSwatch).toBeInTheDocument();
    });

    test("should change the line color label to new color", () => {
        // Arrange
        render(<LockedLineSettings {...defaultProps} color="green" />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const lineSwatch = screen.getByLabelText("green, solid");

        // Assert
        expect(lineSwatch).toBeInTheDocument();
    });

    test("should change the line label to dashed for dashed style", () => {
        // Arrange
        render(<LockedLineSettings {...defaultProps} lineStyle="dashed" />, {
            wrapper: RenderStateRoot,
        });

        // Act
        const lineSwatch = screen.getByLabelText("grayH, dashed");

        // Assert
        expect(lineSwatch).toBeInTheDocument();
    });
});
