import type {PerseusRenderer} from '../../perseus-types';

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
    replace: false,
};
