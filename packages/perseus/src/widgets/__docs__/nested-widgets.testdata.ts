import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateExplanationOptions,
    generateExplanationWidget,
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateImageOptions,
    generateImageWidget,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioWidget,
    generateTestPerseusRenderer,
    generateVideoWidget,
} from "@khanacademy/perseus-core";

import type {
    PerseusRenderer,
    PerseusExplanationWidgetOptions,
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

export const gradedGroupWithRadioAndDefinition: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "[[☃ graded-group 1]]",
        widgets: {
            "graded-group 1": generateGradedGroupWidget({
                options: generateGradedGroupOptions({
                    title: "Jean-Luc Picard's first command",
                    content:
                        "What ship was [[☃ definition 1]] first command?\n\n[[☃ radio 1]]",
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
                        "definition 1": generateDefinitionWidget({
                            options: generateDefinitionOptions({
                                definition:
                                    "Jean-Luc Picard is the esteemed captain of the USS Enterprise.",
                                togglePrompt: "Jean-Luc Picard's",
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

export const definitionInContentAndExplanation: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "During World War II, the [[☃ definition 1]] opposed the Axis powers.\n\n[[☃ explanation 1]]",
        widgets: {
            "definition 1": generateDefinitionWidget({
                options: generateDefinitionOptions({
                    definition:
                        "The Allies, led by the United Kingdom, the United States, and the Soviet Union, were the group of countries who opposed the Axis powers (Germany, Japan, and Italy) during World War II.",
                    togglePrompt: "Allies",
                }),
            }),
            "explanation 1": generateExplanationWidget({
                options: generateExplanationOptions({
                    showPrompt: "Show explanation",
                    hidePrompt: "Hide explanation",
                    explanation:
                        "The [[☃ definition 2]] were defeated in 1945.",
                    widgets: {
                        "definition 2": generateDefinitionWidget({
                            options: generateDefinitionOptions({
                                definition:
                                    "The Axis powers were Germany, Japan, and Italy, the group of countries who opposed the Allies during World War II.",
                                togglePrompt: "Axis powers",
                            }),
                        }),
                    },
                }),
            }),
        },
    });

export const numericInputInTable: PerseusRenderer = generateTestPerseusRenderer(
    {
        content:
            "| Normal-size input | Small-size input |\n" +
            "| --- | --- |\n" +
            "| [[☃ numeric-input 1]] | [[☃ numeric-input 2]] |",
        widgets: {
            "numeric-input 1": generateNumericInputWidget({
                options: generateNumericInputOptions({size: "normal"}),
            }),
            "numeric-input 2": generateNumericInputWidget({
                options: generateNumericInputOptions({size: "small"}),
            }),
        },
    },
);

export const numericInputInGradedGroup: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "[[☃ graded-group 1]]",
        widgets: {
            "graded-group 1": generateGradedGroupWidget({
                options: generateGradedGroupOptions({
                    title: "USS Enterprise registry",
                    content:
                        "What is the registry number of the original USS " +
                        "Enterprise?\n\nNCC-[[☃ numeric-input 1]]",
                    widgets: {
                        "numeric-input 1": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                size: "normal",
                            }),
                        }),
                    },
                }),
            }),
        },
    });

export const numericInputInExplanation: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "Warp factors are not linear.\n\n[[☃ explanation 1]]",
        widgets: {
            "explanation 1": generateExplanationWidget({
                options: generateExplanationOptions({
                    showPrompt: "Show practice problem",
                    hidePrompt: "Hide practice problem",
                    explanation:
                        "Warp 1 equals the speed of light. Enter the warp " +
                        "factor that equals twice the speed of light: " +
                        "[[☃ numeric-input 1]]",
                    widgets: {
                        "numeric-input 1": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                size: "normal",
                            }),
                        }),
                    },
                }),
            }),
        },
    });

export const explanationWithDefinitionOptions: PerseusExplanationWidgetOptions =
    generateExplanationOptions({
        explanation:
            "During World War II, in August of 1943, the [[☃ definition 1]] launched a massive bombing campaign on Milan and its outskirts.",
        widgets: {
            "definition 1": generateDefinitionWidget({
                options: generateDefinitionOptions({
                    definition:
                        "The Allies, led by the United Kingdom, the United States, and the Soviet Union, were the group of countries who opposed the Axis powers (Germany, Japan, and Italy) during World War II.",
                    togglePrompt: "Allies",
                }),
            }),
        },
    });
