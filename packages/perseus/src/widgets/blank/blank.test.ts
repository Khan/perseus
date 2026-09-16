import {screen} from "@testing-library/react";

import {registerWidgets} from "../../widgets" /* widget-manifest import */;
import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicBlankQuestion, superscriptQuestion} from "./blank.testdata";

import {blankRegistration} from "." /* widget-manifest import */;

// widget-manifest setup: start
function registerManifestWidgets(): void {
    registerWidgets([blankRegistration]);
}
registerManifestWidgets();
// widget-manifest setup: end
describe("Blank Widget", function () {
    it("Verify the Blank Widget Renders", async () => {
        // Arrange and Act
        renderQuestion(basicBlankQuestion);

        // Assert
        // TODO(LEMS-4448): replace `getByTestId` when the UI is more fleshed out
        expect(screen.getByTestId("blank-widget")).toBeInTheDocument();
        //NOTE: We aim to replace getByTestId with a different check (current idea is using a role)
    });

    it("applies the super-sub styling when displayType is not normal", () => {
        // Arrange, Act
        renderQuestion(superscriptQuestion);

        expect(screen.getByTestId("blank-widget").className).toContain(
            "superSub",
        );
    });

    it("omits the super-sub styling when displayType is normal", () => {
        // Arrange, Act
        renderQuestion(basicBlankQuestion);

        expect(screen.getByTestId("blank-widget").className).not.toContain(
            "superSub",
        );
    });
});
