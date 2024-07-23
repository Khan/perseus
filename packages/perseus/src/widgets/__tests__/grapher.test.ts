import {testDependencies} from "../../../../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../../../../testing/wait";
import * as Dependencies from "../../dependencies";
import {
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "../__testdata__/grapher.testdata";

import {renderQuestion} from "./renderQuestion";

describe("grapher widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot linear graph question", async () => {
        // Arrange and Act
        const {container} = renderQuestion(linearQuestion);
        await waitForInitialGraphieRender();

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot question with multiple graph types", async () => {
        // Arrange and Act
        const {container} = renderQuestion(multipleAvailableTypesQuestion);
        await waitForInitialGraphieRender();

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });
});
