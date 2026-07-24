import {screen} from "@testing-library/react";

import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicBlankQuestion} from "./blank.testdata";

describe("Blank Widget", function () {
    it("Verify the Blank Widget Renders", async () => {
        // Arrange and Act
        renderQuestion(basicBlankQuestion);

        //TO-DO: This test is here to set the precedent of requiring testing
        //The goal is to add more tests later on and replace this stub for a more useful test

        // Assert
        expect(screen.getByTestId("blank-widget")).toBeInTheDocument();
        //NOTE: We aim to replace getByTestId with a different check (current idea is using a role)
    });
});
