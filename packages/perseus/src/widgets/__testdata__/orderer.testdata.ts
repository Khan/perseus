import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "**Without using a calculator, put the numbers in order  from least to greatest.**  \n\n[[\u2603 orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            version: {major: 0, minor: 0},
            type: "orderer",
            graded: true,
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "$10.9$", images: {}, widgets: {}},
                    {content: "$11$", images: {}, widgets: {}},
                    {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "$10.9$", images: {}, widgets: {}},
                    {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                    {content: "$11$", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        "**Without using a calculator, put the numbers in order  from least to greatest.**  \n\n[[\u2603 orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            version: {major: 0, minor: 0},
            type: "orderer",
            graded: true,
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
    },
};
