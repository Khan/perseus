import {testDependencies} from "../../../../../testing/test-dependencies";
import {waitForInitialGraphieRender} from "../../../../../testing/wait";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./interaction.testdata";

describe("interaction widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should render", async () => {
        // Arrange/Act
        const {container} = renderQuestion(question1);
        await waitForInitialGraphieRender();

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should be unanswerable", async () => {
        // Arrange/Act
        const {renderer} = renderQuestion(question1);
        await waitForInitialGraphieRender();

        // Assert
        // Note that this widget can never be answered correctly, no matter
        // what state its in.
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
