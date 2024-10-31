import {getPromptJSON} from "./prompt-utils";

describe("Iframe getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            url: "https://www.khanacademy.org/",
        };

        const userInput: any = {
            message: "Keep on going!",
            status: "incomplete",
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "iframe",
            options: {
                url: renderProps.url,
            },
            userInput: {
                message: userInput.message,
                status: userInput.status,
            },
        });
    });
});
