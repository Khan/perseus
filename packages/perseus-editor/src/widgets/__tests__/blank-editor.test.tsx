import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import BlankEditor from "../blank-editor";

describe("blank editor", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", async () => {
        // Act
        render(<BlankEditor onChange={() => {}} />);

        // Assert
        expect(screen.getByText("Blank Widget Stub")).toBeInTheDocument();
    });
});
