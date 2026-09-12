import {screen} from "@testing-library/react";

import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import * as Widgets from "../../widgets";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {basicFillInTheBlankQuestion} from "./fill-in-the-blank.testdata";

describe("Fill in the Blank Widget", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    it("renders the widget", () => {
        // Arrange, Act
        renderQuestion(basicFillInTheBlankQuestion);

        // The placeholder has no accessible role or name to query by yet.
        expect(
            screen.getByTestId("fill-in-the-blank-widget"),
        ).toBeInTheDocument();
    });

    it("is registered in the widget registry", () => {
        // Arrange, Act
        const widget = Widgets.getWidget("fill-in-the-blank");

        expect(widget).not.toBeNull();
    });

    it("is hidden from the content editor's widget dropdown", () => {
        // Arrange, Act
        const publicWidgets = Widgets.getPublicWidgets();

        expect(publicWidgets["fill-in-the-blank"]).toBeUndefined();
    });
});
