import {getPromptJSON} from "./prompt-utils";

describe("Grapher getPromptJSON", () => {
    it("it returns JSON with the expected format and fields for a linear graph", () => {
        const renderProps: any = {
            availableTypes: ["linear"],
            graph: {
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                step: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImage: {url: "http://khanaacademy.org/image.jpg"},
            },
        };

        const userInput: any = {
            type: "linear",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "grapher",
            options: {
                availableTypes: ["linear"],
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                tickStep: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImageUrl: "http://khanaacademy.org/image.jpg",
            },
            userInput: {
                type: "linear",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        });
    });

    it('it returns JSON with the expected format and fields for a "logarithm" graph', () => {
        const renderProps: any = {
            availableTypes: ["lograithm"],
            graph: {
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                step: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImage: {url: ""},
            },
        };

        const userInput: any = {
            type: "logarithm",
            coords: [
                [0, 0],
                [1, 1],
            ],
            asymptote: [-1, 4],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "grapher",
            options: {
                availableTypes: ["lograithm"],
                range: [0, 10, 0, 10],
                labels: ["x", "y"],
                tickStep: 1,
                gridStep: 1,
                snapStep: 1,
                backgroundImageUrl: "",
            },
            userInput: {
                type: "logarithm",
                coords: [
                    [0, 0],
                    [1, 1],
                ],
                asymptote: [-1, 4],
            },
        });
    });
});
