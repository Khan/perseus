import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import FocusRing from "../../radio/focus-ring";

describe("choice icon", () => {
    describe.each([[true], [false]])("multipleSelect: %s", (multipleSelect) => {
        it("renders with the correct border radius", () => {
            // Arrange/Act
            // @ts-expect-error [FEI-5003] - TS2739 - Type '{ multipleSelect: any; }' is missing the following properties from type 'Props': visible, color
            render(<FocusRing multipleSelect={multipleSelect} />);

            const focusRing = screen.getByTestId("focus-ring");

            // Assert
            const expectedRadius = multipleSelect ? "5px" : "50%";
            expect(focusRing).toHaveStyle(`border-radius: ${expectedRadius}`);
        });
    });
});
