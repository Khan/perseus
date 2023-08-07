// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {setDependencies} from "../../dependencies";
import {question1} from "../__testdata__/plotter.testdata";

import {renderQuestion} from "./renderQuestion";

describe("plotter widget", () => {
    beforeEach(() => {
        setDependencies(testDependencies);
    });

    it("should snapshot basic question", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });
});
