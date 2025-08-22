import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const basicDropdown: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "greater/less than or equal to",
                choices: [
                    {
                        content: "greater than or equal to",
                        correct: false,
                    },
                    {
                        content: "less than or equal to",
                        correct: true,
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const dropdownWithMath: PerseusRenderer = {
    content: "If x equals 4, then [[☃ dropdown 1]] equals $10$.",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "",
                choices: [
                    {
                        content: "$5\\sqrt{x}$",
                        correct: true,
                    },
                    {
                        content: "$5x$",
                        correct: false,
                    },
                    {
                        content: "$\\frac{1}{2}$",
                        correct: false,
                    },
                    {
                        content: "$\\sqrt{\\frac{\\frac{1}{2}}{\\frac{1}{3}}}$",
                        correct: false,
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const dropdownWithVisibleLabel: PerseusRenderer = {
    content: "[[☃ dropdown 1]]",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "Choose an answer",
                choices: [
                    {
                        content: "True",
                        correct: true,
                    },
                    {
                        content: "False",
                        correct: false,
                    },
                ],
                visibleLabel: "Test label",
                ariaLabel: "Test ARIA label",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
        "dropdown 2": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "",
                choices: [
                    {
                        content: "True",
                        correct: true,
                    },
                    {
                        content: "False",
                        correct: false,
                    },
                ],
                visibleLabel: "Test label",
                ariaLabel: "Test ARIA label",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const inlineDropdownWithVisibleLabel: PerseusRenderer = {
    content:
        "The dropdown widget is often used inline. This is how it would look in an article with the new visible label:\n\nLorem ipsum odor amet, consectetuer adipiscing elit. Mus curae sollicitudin penatibus, mattis suscipit habitant tincidunt mauris. Vitae curae dolor gravida vehicula adipiscing vulputate penatibus. [[☃ dropdown 1]] Ultricies mollis taciti vel, penatibus dapibus interdum pharetra. Ultricies sollicitudin facilisi vehicula dapibus ligula maecenas libero ligula. Lobortis luctus accumsan rhoncus posuere sapien mi habitant fusce. Per ultrices ac mus ligula habitant pulvinar aliquam dui lacus.\n\nAnother use case is that it can be used in tables:\n\nheader 1 | header 2 \n- | -\ndata 1 | [[☃ dropdown 2]]\ndata 4 | data 5\ndata 7 | data 8",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "Choose an answer",
                choices: [
                    {
                        content: "True",
                        correct: true,
                    },
                    {
                        content: "False",
                        correct: false,
                    },
                ],
                visibleLabel: "Test label",
                ariaLabel: "Test ARIA label",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
        "dropdown 2": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "",
                choices: [
                    {
                        content: "True",
                        correct: true,
                    },
                    {
                        content: "False",
                        correct: false,
                    },
                ],
                visibleLabel: "Test label",
                ariaLabel: "Test ARIA label",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const dropdownWithEmptyPlaceholder: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "",
                choices: [
                    {
                        content: "greater than or equal to",
                        correct: false,
                    },
                    {
                        content: "less than or equal to",
                        correct: true,
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};
