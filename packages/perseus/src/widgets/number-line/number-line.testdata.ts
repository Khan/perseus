import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[\u2603 number-line 1]]",
    images: {},
    widgets: {
        "number-line 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "number-line",
            options: {
                labelRange: [null, null],
                initialX: null,
                tickStep: 1,
                labelStyle: "decimal",
                labelTicks: true,
                snapDivisions: 2,
                range: [-4, 4],
                static: false,
                correctRel: "eq",
                numDivisions: null,
                divisionRange: [1, 10],
                correctX: -2.5,
            },
            alignment: "default",
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[\u2603 number-line 1]]",
    images: {},
    widgets: {
        "number-line 1": {
            type: "number-line",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                range: [0, 1],
                labelRange: [null, null],
                labelStyle: "improper",
                labelTicks: false,
                divisionRange: [1, 12],
                numDivisions: 1,
                snapDivisions: 1,
                tickStep: null,
                correctRel: "eq",
                correctX: 0.5,
                initialX: null,
                showTooltip: false,
                isTickCtrl: true,
            },
        },
    },
};

export const snapshots: PerseusRenderer = {
    content:
        "$E=2.5$\n\n**Move the dot to $-E$ on the number line.**\n\n\n[[\u2603 number-line 1]]",
    images: {},
    widgets: {
        "number-line 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "number-line",
            options: {
                labelRange: [null, null],
                initialX: null,
                tickStep: 1,
                labelStyle: "decimal",
                labelTicks: true,
                snapDivisions: 2,
                range: [-10, 10],
                static: false,
                correctRel: "eq",
                numDivisions: null,
                divisionRange: [1, 10],
                correctX: -2.5,
            },
            alignment: "default",
        },
    },
};
