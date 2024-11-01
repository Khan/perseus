import {getPromptJSON} from "./prompt-utils";

describe("Orderer getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            options: [
                {
                    content: "Third item",
                    images: {},
                    widgets: {},
                },
                {
                    content: "First item",
                    images: {},
                    widgets: {},
                },
                {
                    content: "Second item",
                    images: {},
                    widgets: {},
                },
            ],
        };

        const userInput = {
            current: ["First item", "Second item", "Third item"],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        const expectedOptions = renderProps.options.map(
            (option: any) => option.content,
        );

        expect(resultJSON).toEqual({
            type: "orderer",
            options: {
                options: expectedOptions,
            },
            userInput: {
                values: userInput.current,
            },
        });
    });
});
