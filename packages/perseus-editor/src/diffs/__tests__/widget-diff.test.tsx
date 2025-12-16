import {generateRadioWidget} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import WidgetDiff from "../widget-diff";

import type {PerseusWidget} from "@khanacademy/perseus-core";

describe("WidgetDiff", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    it("renders a widget in the diff view", () => {
        // Arrange
        const beforeItem: PerseusWidget = generateRadioWidget({
            options: {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "$45$",
                        correct: false,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "$42$",
                        correct: false,
                    },
                ],
            },
        });

        const afterItem: PerseusWidget = generateRadioWidget({
            options: {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "$45$",
                        correct: false,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "$15$",
                        correct: true,
                    },
                ],
            },
        });

        // Act
        const {container} = render(
            <WidgetDiff
                before={beforeItem}
                after={afterItem}
                title="Radio"
                type="radio"
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });
});
