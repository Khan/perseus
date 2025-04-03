import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = {
    content:
        "Watch the Biogeography: Where Life Lives video to find the answer.\n\n[[\u2603 video 1]]\n\n",
    images: {},
    widgets: {
        "video 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "video",
            options: {
                static: false,
                location: "biogeography-where-life-lives",
            },
            alignment: "block",
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        "Watch the WMF at Angkor Wat video to find the answer.\n\n[[\u2603 video 1]]\n\n",
    images: {},
    widgets: {
        "video 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "video",
            options: {
                static: false,
                location: "https://player.vimeo.com/video/4754041",
            },
            alignment: "block",
        },
    },
};
