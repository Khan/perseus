// @flow

import type {PerseusRenderer} from "../../perseus-types.js";

export const question1: PerseusRenderer = {
    content:
        "[[☃ passage 1]]\n\nWe can see the word “promotes” is used in [[☃ passage-ref 1]]\n\n",
    images: {},
    widgets: {
        "passage 1": {
            alignment: "default",
            graded: true,
            options: {
                footnotes: "",
                passageText:
                    "Our electronic devices are keeping us awake—not just because we spend time using them when we should be sleeping, but also because they emit a blue light that keeps our brains awake. One study showed that people who used screens that emitted blue light were unable to produce sufficient melatonin, a hormone that {{promotes}} sleep. In order to enjoy a more restful night, experts recommend shutting off screens at least two hours before bed. ",
                passageTitle: "",
                showLineNumbers: true,
                static: false,
            },
            static: false,
            type: "passage",
            version: {
                major: 0,
                minor: 0,
            },
        },
        "passage-ref 1": {
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "",
            },
            type: "passage-ref",
            version: {
                major: 0,
                minor: 1,
            },
        },
    },
};
