/**
 * These GradedGroupSet tests are specifically for the JIPT integration.
 * This widget renders differently when JIPT is active to make translation
 * easier for translators.
 */

import {testDependencies} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {article1} from "./graded-group-set.testdata";

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
