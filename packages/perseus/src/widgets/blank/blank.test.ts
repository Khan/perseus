import {screen} from "@testing-library/react";

import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./blank.testdata";

describe("Blank Widget", function () {
    it("Verify the Blank Widget Renders", async () => {
        // Arrange and Act
        renderQuestion(question1);

        // Assert
        expect(screen.getByTestId("blank-widget")).toBeInTheDocument();
    });
});
