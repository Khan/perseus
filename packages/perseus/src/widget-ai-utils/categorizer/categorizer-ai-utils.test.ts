import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./categorizer-ai-utils";

import type {
    PerseusRenderer,
    PerseusCategorizerUserInput,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const randomizedQuestion: PerseusRenderer = {
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

describe("Categorizer AI utils", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("it returns JSON with the expected format and fields", () => {
        const userInput: PerseusCategorizerUserInput = {
            values: [1, 0, 0, 1],
        };

        const renderProps: any = {
            items: ["Luke Skywalker", "Darth Vader", "Yoda", "Han Solo"],
            categories: ["Galactic Empire", "Rebel Alliance"],
            values: [1, 0, 1, 1],
            userInput,
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "categorizer",
            options: {
                items: ["Luke Skywalker", "Darth Vader", "Yoda", "Han Solo"],
                categories: ["Galactic Empire", "Rebel Alliance"],
            },
            userInput: {
                itemToCategoryMapping: [1, 0, 0, 1],
            },
        });
    });

    it("should get prompt json which matches the state of the UI for a randomized question", async () => {
        // arrange
        const {renderer} = renderQuestion(randomizedQuestion);

        // act
        await userEvent.click(screen.getAllByRole("button")[0]);
        await userEvent.click(screen.getAllByRole("button")[5]);

        const json = renderer.getPromptJSON();

        // assert
        expect(json).toEqual({
            content:
                "**Classify each graph according to the kind of relationship it suggests.**\n\n$\\qquad\\qquad\\quad\\text{Graph 1}\\qquad\\qquad\\quad\\qquad\\qquad\\quad\\text{Graph 2}$\n\n\n\n[[\u2603 categorizer 1]]\n\n**Graph 1.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/049c091ed0978112aba3a36b0591d992baf7b1ac.png)\n\n**Graph 2.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/40df186f39fb6d65de6bee0d8b681502d10cb37a.png)  \n",
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    options: {
                        items: ["Graph $1$", "Graph $2$"],
                        categories: [
                            "No relationship",
                            "Positive linear relationship",
                            "Negative linear relationship",
                            "Nonlinear relationship",
                        ],
                    },
                    userInput: {
                        itemToCategoryMapping: [0, 1],
                    },
                },
            },
        });
    });
});
