import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {LabelImagePromptJSON} from "./prompt-utils";
import type {PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const textQuestion: PerseusRenderer = {
    content:
        "Carol created a chart and a bar graph to show how many of each type of vehicle were in her supermarket parking lot.\n\nVehicle Type | Number in the parking lot\n:- | :-: \nTrucks| $25$ \nVans | $5$ \nCars| $40$ \nSUVs | $10$ \n\n**Label each bar on the bar graph.**\n\n[[☃ label-image 1]]\n\n",
    images: {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e28332fd2321975639ab50c9ce442e568c18421":
            {
                width: 341,
                height: 310,
            },
    },
    widgets: {
        "label-image 1": {
            type: "label-image",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                choices: ["Trucks", "Vans", "Cars", "SUVs"],
                imageAlt:
                    "A bar graph with four bar lines that shows the horizontal axis labeled Number in the parking lot and the vertical axis labeled Vehicle Type. The horizontal axis is labeled, from left to right: 0, 10, 20, 30, 40, and 50. The vertical axis has, from the bottom to the top, four unlabeled bar lines as follows: the first unlabeled bar line extends to the middle of 0 and 10, the second unlabeled bar line extends to 40, the third unlabeled bar line extends to the middle of 20 and 30, and fourth unlabeled bar line extends to 10.",
                imageUrl:
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
                imageWidth: 415,
                imageHeight: 314,
                markers: [
                    {
                        answers: ["SUVs"],
                        label: "The fourth unlabeled bar line.",
                        x: 25,
                        y: 17.7,
                    },
                    {
                        answers: ["Trucks"],
                        label: "The third unlabeled bar line.",
                        x: 25,
                        y: 35.3,
                    },
                    {
                        answers: ["Cars"],
                        label: "The second unlabeled bar line.",
                        x: 25,
                        y: 53,
                    },
                    {
                        answers: ["Vans"],
                        label: "The first unlabeled bar line.",
                        x: 25,
                        y: 70.3,
                    },
                ],
                multipleAnswers: false,
                hideChoicesFromInstructions: true,
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("label image widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(textQuestion);
        const widget = renderer.getWidgetInstance("label-image 1");
        const questionOptions = textQuestion.widgets["label-image 1"].options;

        // Act
        const toggleAnswerSwitch = await screen.findByRole("switch");
        await userEvent.click(toggleAnswerSwitch);

        // Toggle the button
        const markerButton = await screen.findByLabelText(
            questionOptions.markers[0].label,
        );
        await userEvent.click(markerButton);

        // Select a choice
        const choices = await screen.findAllByText(questionOptions.choices[3]);
        const choice = choices[choices.length - 1];
        await userEvent.click(choice);

        const json = widget?.getPromptJSON?.() as LabelImagePromptJSON;

        // Assert
        expect(json).toEqual({
            type: "label-image",
            options: {
                choices: questionOptions.choices,
                imageUrl: questionOptions.imageUrl,
                imageAlt: questionOptions.imageAlt,
                markers: [
                    {
                        label: questionOptions.markers[0].label,
                    },
                    {
                        label: questionOptions.markers[1].label,
                    },
                    {
                        label: questionOptions.markers[2].label,
                    },
                    {
                        label: questionOptions.markers[3].label,
                    },
                ],
            },
            userInput: {
                markers: [
                    {
                        label: questionOptions.markers[0].label,
                        selected: [questionOptions.choices[3]],
                    },
                    {
                        label: questionOptions.markers[1].label,
                        selected: undefined,
                    },
                    {
                        label: questionOptions.markers[2].label,
                        selected: undefined,
                    },
                    {
                        label: questionOptions.markers[3].label,
                        selected: undefined,
                    },
                ],
            },
        });
    });
});
