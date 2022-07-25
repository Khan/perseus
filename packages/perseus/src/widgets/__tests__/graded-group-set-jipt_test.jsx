// @flow

/**
 * These GradedGroupSet tests are specifically for the JIPT integration.
 * This widget renders differently when JIPT is active to make translation
 * easier for translators.
 */

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {article1} from "../__testdata__/graded-group-set_testdata.js";

import {renderQuestion} from "./renderQuestion.jsx";

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
