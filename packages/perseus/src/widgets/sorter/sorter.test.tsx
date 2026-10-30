import {screen} from "@testing-library/react";

import {renderQuestion} from "../../__tests__/render-question";
import {getFeatureFlags} from "../../testing/feature-flags-util";

import {basicQuestion} from "./sorter.testdata";

describe("sorter widget switcher", () => {
    it("renders the drag-and-drop sorter when the dnd-widget-sorter flag is on", () => {
        // Arrange, Act
        renderQuestion(basicQuestion, {
            apiOptions: {
                flags: getFeatureFlags({"dnd-widget-sorter": true}),
            },
        });

        // Assert
        expect(screen.getByRole("list", {name: "Choices"})).toBeInTheDocument();
    });

    it("renders the legacy sorter when the dnd-widget-sorter flag is off", () => {
        // Arrange, Act
        renderQuestion(basicQuestion, {
            apiOptions: {
                flags: getFeatureFlags({"dnd-widget-sorter": false}),
            },
        });

        // Assert
        expect(
            screen.queryByRole("list", {name: "Choices"}),
        ).not.toBeInTheDocument();
    });
});
