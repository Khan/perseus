import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/interaction.testdata";

import {renderQuestion} from "./renderQuestion";

describe("interaction widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", () => {
        // Arrange/Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should be unanswerable", () => {
        // Arrange/Act
        const {renderer} = renderQuestion(question1);

        // Assert
        // Note that this widget can never be answered correctly, no matter
        // what state its in.
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
