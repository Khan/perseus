import {testDependencies} from "../../../../../testing/test-dependencies";
import {setDependencies} from "../../dependencies";
import {
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "../__testdata__/grapher.testdata";

import {renderQuestion} from "./renderQuestion";

describe("grapher widget", () => {
    beforeEach(() => {
        setDependencies(testDependencies);
    });

    it("should snapshot linear graph question", () => {
        // Arrange and Act
        const {container} = renderQuestion(linearQuestion);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot question with multiple graph types", () => {
        // Arrange and Act
        const {container} = renderQuestion(multipleAvailableTypesQuestion);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });
});
