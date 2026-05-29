import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const imageInContent: PerseusRenderer = generateTestPerseusRenderer({
    content: `It appears that cats and tribbles share the same "cuteness" gene as tribbles."
                \n\n[[☃ explanation 1]]`,
    widgets: {
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                hidePrompt: "Hide this cuteness",
                explanation: `Fur, purring, and lovability are all connected to their DNA.\n\n[[☃ image 1]]`,
                showPrompt: "Show a cute cat",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            backgroundImage: {
                                url: "https://cdn.kastatic.org/ka-content-images/cabd2dd6c1be5651e5d25ba2cecc4c28e664eca6.gif",
                            },
                            caption: "Cat emulating a tribble",
                            alt: "Cat sleeping on a couch",
                        }),
                    }),
                },
            }),
        }),
    },
});