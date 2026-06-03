import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateImageOptions,
    generateImageWidget,
    generateRadioChoice,
    generateRadioWidget,
    generateTestPerseusRenderer,
    generateVideoWidget,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const gradedGroupWithRadioAndExplanation: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "[[☃ graded-group 1]]",
        widgets: {
            "graded-group 1": generateGradedGroupWidget({
                options: generateGradedGroupOptions({
                    title: "Jean-Luc Picard's first command",
                    content:
                        "What ship was Jean-Luc Picard's first command?\n\n[[☃ radio 1]]\n\n[[☃ explanation 1]]",
                    widgets: {
                        "radio 1": generateRadioWidget({
                            options: {
                                choices: [
                                    generateRadioChoice(
                                        "USS Voyager (NCC-74656)",
                                    ),
                                    generateRadioChoice(
                                        "USS Enterprise (NCC-1701-D)",
                                    ),
                                    generateRadioChoice(
                                        "USS Enterprise (NX-01)",
                                    ),
                                    generateRadioChoice(
                                        "USS Stargazer (NCC-2893)",
                                        {
                                            correct: true,
                                        },
                                    ),
                                ],
                            },
                        }),
                        "explanation 1": generateExplanationWidget({
                            options: generateExplanationOptions({
                                showPrompt: "Show explanation",
                                hidePrompt: "Hide explanation",
                                explanation:
                                    "Captain Picard commanded the USS Stargazer (NCC-2893) before taking command of the USS Enterprise (NCC-1701-D).",
                            }),
                        }),
                    },
                }),
            }),
        },
    });

export const videoInContent: PerseusRenderer = generateTestPerseusRenderer({
    content: `Warp energy efficiency has improved significantly!
                A simple remodulization of the warp field was all that was needed.
                \n\n[[☃ explanation 1]]`,
    widgets: {
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                hidePrompt: "Close tutorial",
                explanation: `Excerpt from Starfleet Academy Warp Fields 101 course:\n\n[[☃ video 1]]`,
                showPrompt: "Show Warp Field tutorial",
                widgets: {
                    "video 1": generateVideoWidget({
                        options: {
                            location:
                                "https://youtube.com/embed/7mH6Mal6Oh8?rel=0&controls=0",
                        },
                    }),
                },
            }),
        }),
    },
});

export const imageInContent: PerseusRenderer = generateTestPerseusRenderer({
    content: `It appears that cats and tribbles share the same "cuteness" gene."
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
