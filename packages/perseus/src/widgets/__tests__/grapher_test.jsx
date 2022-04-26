// @flow

// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {setDependencies} from "../../../perseus-all-package/dependencies.js";
import {renderQuestion} from "../../../perseus-all-package/widgets/__tests__/renderQuestion.jsx";
import {testDependencies} from "../../../perseus-testing/test-dependencies.js";
import {
    linearQuestion,
    multipleAvailableTypesQuestion,
} from "../__testdata__/grapher_testdata.js";

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
