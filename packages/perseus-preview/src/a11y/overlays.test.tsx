import {render, screen} from "@testing-library/react";
import * as React from "react";

import {A11yOverlays, getOverlayRect} from "./overlays";

describe("A11yOverlays", () => {
    it("renders one overlay per target element", () => {
        // Arrange
        const container = document.createElement("div");
        const target1 = document.createElement("div");
        const target2 = document.createElement("div");

        // Act
        render(
            <A11yOverlays container={container} targets={[target1, target2]} />,
        );

        // Assert
        expect(screen.queryAllByTestId("a11y-overlay")).toHaveLength(2);
    });
});

describe("getOverlayRect", () => {
    it("computes the overlay rect relative to the container", () => {
        // Arrange, Act
        const rect = getOverlayRect(
            {top: 100, left: 50, width: 200, height: 80},
            {top: 20, left: 10},
        );

        // Assert
        expect(rect).toEqual({top: 76, left: 36, width: 208, height: 88});
    });
});
