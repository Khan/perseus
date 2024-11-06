import {getPromptJSON} from "./prompt-utils";

describe("LabelImage getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
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
            choices: ["Trucks", "Vans", "Cars", "SUVs"],
            imageUrl:
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
            imageAlt:
                "A bar graph with four bar lines that shows the horizontal axis labeled Number in the parking lot and the vertical axis labeled Vehicle Type. The horizontal axis is labeled, from left to right: 0, 10, 20, 30, 40, and 50. The vertical axis has, from the bottom to the top, four unlabeled bar lines as follows: the first unlabeled bar line extends to the middle of 0 and 10, the second unlabeled bar line extends to 40, the third unlabeled bar line extends to the middle of 20 and 30, and fourth unlabeled bar line extends to 10.",
        };

        const userInput: any = {
            markers: [
                {
                    label: "The fourth unlabeled bar line.",
                    selected: ["Vans"],
                },
                {
                    label: "The third unlabeled bar line.",
                    selected: ["SUVs"],
                },
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "label-image",
            options: {
                markers: [
                    {
                        label: "The fourth unlabeled bar line.",
                    },
                    {
                        label: "The third unlabeled bar line.",
                    },
                    {
                        label: "The second unlabeled bar line.",
                    },
                    {
                        label: "The first unlabeled bar line.",
                    },
                ],
                choices: ["Trucks", "Vans", "Cars", "SUVs"],
                imageUrl:
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
                imageAlt:
                    "A bar graph with four bar lines that shows the horizontal axis labeled Number in the parking lot and the vertical axis labeled Vehicle Type. The horizontal axis is labeled, from left to right: 0, 10, 20, 30, 40, and 50. The vertical axis has, from the bottom to the top, four unlabeled bar lines as follows: the first unlabeled bar line extends to the middle of 0 and 10, the second unlabeled bar line extends to 40, the third unlabeled bar line extends to the middle of 20 and 30, and fourth unlabeled bar line extends to 10.",
            },
            userInput: {
                markers: [
                    {
                        label: "The fourth unlabeled bar line.",
                        selected: ["Vans"],
                    },
                    {
                        label: "The third unlabeled bar line.",
                        selected: ["SUVs"],
                    },
                ],
            },
        });
    });
});
