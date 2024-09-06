import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content: "Try matching the target image\n[[\u2603 iframe 1]]\n",
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/8e518475587bc83767c72b49ff094e5870c3edc3.png":
            {
                width: 760,
                height: 688,
            },
    },
    widgets: {
        "iframe 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "iframe",
            options: {
                settings: [
                    {name: "hue", value: "210"},
                    {name: "subdivisions", value: "0"},
                    {name: "zoom", value: "2"},
                    {name: "seed", value: "6"},
                    {name: "", value: ""},
                ],
                url: "4960944252",
                height: "410",
                width: "410",
                allowFullScreen: true,
                static: false,
            },
            alignment: "default",
        },
    },
};
