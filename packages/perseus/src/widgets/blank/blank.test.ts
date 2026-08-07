import {screen} from "@testing-library/react";

import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicBlankQuestion} from "./blank.testdata";

describe("Blank Widget", function () {
    it("Verify the Blank Widget Renders", async () => {
        // Arrange and Act
        renderQuestion(basicBlankQuestion);

        // Assert
        // TODO(LEMS-4448): replace `getByTestId` when the UI is more fleshed out
        expect(screen.getByTestId("blank-widget")).toBeInTheDocument();
        //NOTE: We aim to replace getByTestId with a different check (current idea is using a role)
    });
});
