/**
 * These GradedGroupSet tests are specifically for the JIPT integration.
 * This widget renders differently when JIPT is active to make translation
 * easier for translators.
 */

import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
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

        // Mocked for loading graphie in svg-image
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    it("should render all graded groups", () => {
        // Arrange and Act
        const {container} = renderQuestion(article1);

        // Assert
        expect(container).toMatchSnapshot();
    });
});
