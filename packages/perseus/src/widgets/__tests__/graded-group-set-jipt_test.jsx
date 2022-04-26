// @flow

/**
 * These GradedGroupSet tests are specifically for the JIPT integration.
 * This widget renders differently when JIPT is active to make translation
 * easier for translators.
 */

import * as Dependencies from "../../../perseus-all-package/dependencies.js";
import {renderQuestion} from "../../../perseus-all-package/widgets/__tests__/renderQuestion.jsx";
import {testDependencies} from "../../../perseus-testing/test-dependencies.js";
import {article1} from "../__testdata__/graded-group-set_testdata.js";

describe("graded-group-set", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            JIPT: {
                useJIPT: true,
                domInsertChecks: [],
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
