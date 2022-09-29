// @flow

import {render, screen} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import FocusRing from "../../radio/focus-ring.jsx";

describe("choice icon", () => {
    describe.each([[true], [false]])("multipleSelect: %s", (multipleSelect) => {
        it("renders with the correct border radius", () => {
            let expectedRadius;
            if (multipleSelect) {
                expectedRadius = "5px";
            } else {
                expectedRadius = "50%";
            }

            render(<FocusRing multipleSelect={multipleSelect} />);

            const focusRing = screen.getByTestId("focus-ring");

            expect(focusRing).toHaveStyle(`border-radius: ${expectedRadius}`);
        });
    });
});
