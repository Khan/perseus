import {getPromptJSON} from "./prompt-utils";

describe("InteractiveGraph getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            graph: {type: "angle"},
            backgroundImage: {
                url: "https://www.khanacademy.org/some-image.png",
            },
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "angle",
            coords: [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: renderProps.graph,
                backgroundImageUrl: renderProps.backgroundImage.url,
                range: renderProps.range,
                labels: renderProps.labels,
            },
            userInput: {
                coords: userInput.coords,
                angleOffsetDegrees: undefined,
            },
        });
    });
});
