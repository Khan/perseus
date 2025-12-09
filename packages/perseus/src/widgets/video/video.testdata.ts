import {
    generateTestPerseusRenderer,
    generateVideoWidget,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Watch the Biogeography: Where Life Lives video to find the answer.\n\n[[\u2603 video 1]]\n\n",
    widgets: {
        "video 1": generateVideoWidget({
            options: {location: "biogeography-where-life-lives"},
        }),
    },
});

export const question2: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Watch the WMF at Angkor Wat video to find the answer.\n\n[[\u2603 video 1]]\n\n",
    widgets: {
        "video 1": generateVideoWidget({
            options: {location: "https://player.vimeo.com/video/4754041"},
        }),
    },
});
