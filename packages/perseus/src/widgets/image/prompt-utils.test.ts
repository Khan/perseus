import {getPromptJSON} from "./prompt-utils";

describe("Image getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            alt: "An image of a textbook",
            title: "Textbook",
            caption: "A textbook",
            backgroundImage: {
                url: "https://www.khanacademy.org/some-image.png",
            },
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "image",
            options: {
                altText: renderProps.alt,
                title: renderProps.title,
                caption: renderProps.caption,
                imageUrl: renderProps.backgroundImage.url,
            },
        });
    });
});
