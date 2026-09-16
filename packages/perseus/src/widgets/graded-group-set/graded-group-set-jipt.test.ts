/**
 * These GradedGroupSet tests are specifically for the JIPT integration.
 * This widget renders differently when JIPT is active to make translation
 * easier for translators.
 */

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies-data";
import {registerWidgets} from "../../widgets" /* widget-manifest import */;
import {renderQuestion} from "../__testutils__/renderQuestion";
import {numericInputRegistration} from "../numeric-input" /* widget-manifest import */;

import {article1} from "./graded-group-set.testdata";

import {gradedGroupSetRegistration} from "." /* widget-manifest import */;

// widget-manifest setup: start
function registerManifestWidgets(): void {
    registerWidgets([gradedGroupSetRegistration, numericInputRegistration]);
}
registerManifestWidgets();
// widget-manifest setup: end
describe("graded-group-set", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            JIPT: {
                useJIPT: true,
            },
        });
    });

    it("should render all graded groups", () => {
        // Arrange and Act
        const {container} = renderQuestion(article1);

        // Assert
        expect(container).toMatchSnapshot();
    });
});
