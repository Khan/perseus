import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import LockedPointSettings from "../locked-point-settings";
import {getDefaultFigureForType} from "../util";

const defaultProps = getDefaultFigureForType("point");

describe("LockedPointSettings", () => {
    test("Should show the point's coordinates and color by default", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings {...defaultProps} onChangeProps={() => {}} />,
            {wrapper: RenderStateRoot},
        );

        const titleText = screen.getByText("Point (0, 0)");
        const colorSwatch = screen.getByLabelText("Color: grayH, filled");

        // Assert
        expect(titleText).toBeInTheDocument();
        expect(colorSwatch).toBeInTheDocument();
    });

    test("Should not show the color in summary if toggled off", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                toggled={false}
                onToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const titleText = screen.getByText("Point (0, 0)");
        const colorSwatch = screen.queryByLabelText(
            "Point color: blue, filled",
        );

        // Assert
        expect(titleText).toBeInTheDocument();
        expect(colorSwatch).not.toBeInTheDocument();
    });

    test("Should show toggle switch if onToggle is passed in", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                onToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getByLabelText("show point on graph");

        // Assert
        expect(toggleSwitch).toBeInTheDocument();
    });

    test("Toggle switch should match toggled prop when true", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                toggled={true}
                onToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getByLabelText("show point on graph");

        // Assert
        expect(toggleSwitch).toBeChecked();
    });

    test("Toggle switch should match toggled prop when false", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                toggled={false}
                onToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const toggleSwitch = screen.getByLabelText("show point on graph");

        // Assert
        expect(toggleSwitch).not.toBeChecked();
    });

    test("Should show extra fields if toggled on", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                toggled={true}
                onToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const colorSelect = screen.getByLabelText("color");
        const openCheckbox = screen.getByLabelText("open point");

        // Assert
        expect(colorSelect).toBeInTheDocument();
        expect(openCheckbox).toBeInTheDocument();
    });

    test("Should not show extra fields if toggled off", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                onChangeProps={() => {}}
                toggled={false}
                onToggle={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const colorSelect = screen.queryByLabelText("Color");
        const openCheckbox = screen.queryByLabelText("Open point");

        // Assert
        expect(colorSelect).not.toBeInTheDocument();
        expect(openCheckbox).not.toBeInTheDocument();
    });

    test("Summary should reflect the coordinates", () => {
        // Arrange

        // Act
        render(
            <LockedPointSettings
                {...defaultProps}
                coord={[23, 45]}
                onChangeProps={() => {}}
            />,
            {wrapper: RenderStateRoot},
        );

        const titleText = screen.getByText("Point (23, 45)");

        // Assert
        expect(titleText).toBeInTheDocument();
    });
});
