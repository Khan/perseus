import {screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {CategorizerPromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

export const randomizedQuestion: PerseusRenderer = {
    content:
        "**Classify each graph according to the kind of relationship it suggests.**\n\n$\\qquad\\qquad\\quad\\text{Graph 1}\\qquad\\qquad\\quad\\qquad\\qquad\\quad\\text{Graph 2}$\n\n\n\n[[\u2603 categorizer 1]]\n\n**Graph 1.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/049c091ed0978112aba3a36b0591d992baf7b1ac.png)\n\n**Graph 2.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/40df186f39fb6d65de6bee0d8b681502d10cb37a.png)  \n",
    images: {},
    widgets: {
        "categorizer 1": {
            version: {major: 0, minor: 0},
            type: "categorizer",
            graded: true,
            alignment: "default",
            options: {
                items: ["Graph $1$", "Graph $2$"],
                values: [1, 3],
                randomizeItems: true,
                categories: [
                    "No relationship",
                    "Positive linear relationship",
                    "Negative linear relationship",
                    "Nonlinear relationship",
                ],
                highlightLint: false,
                static: false,
            },
        },
    },
};

describe("categorizer widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI for a randomized question", async () => {
        // arrange
        const {renderer} = renderQuestion(randomizedQuestion);
        const widget = renderer.getWidgetInstance("categorizer 1");

        // act
        await userEvent.click(screen.getAllByRole("button")[0]);
        await userEvent.click(screen.getAllByRole("button")[5]);

        const json = widget?.getPromptJSON?.() as CategorizerPromptJSON;
        const rowGroups = screen.getAllByRole("rowgroup");

        const categories = within(rowGroups[0]).getAllByRole("columnheader");
        const items = within(rowGroups[1]).getAllByRole("row");

        // assert
        json.options.categories.forEach((category, i) => {
            expect(categories[i].textContent).toEqual(category);
        });

        const itemRe = /(Graph) \$(\d+)\$/;
        json.options.items.forEach((item, i) => {
            const itemPlainText = item.replace(itemRe, "$1 $2");
            expect(items[i].textContent).toEqual(itemPlainText);
        });

        expect(json.userInput.itemToCategoryMapping).toEqual([0, 1]);
    });
});
