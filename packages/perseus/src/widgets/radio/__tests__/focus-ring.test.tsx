import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import FocusRing from "../focus-ring";

describe("choice icon", () => {
    describe.each([[true], [false]])("multipleSelect: %s", (multipleSelect) => {
        it("renders with the correct border radius", () => {
            // Arrange/Act
            render(<FocusRing multipleSelect={multipleSelect} />);

            const focusRing = screen.getByTestId("focus-ring");

            // Assert
            const expectedRadius = multipleSelect ? "5px" : "50%";
            expect(focusRing).toHaveStyle(`border-radius: ${expectedRadius}`);
        });
    });
});
