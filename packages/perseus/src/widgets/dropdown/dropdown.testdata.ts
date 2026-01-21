import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const basicDropdown: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    widgets: {
        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
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
            }),
        }),
    },
});

export const dropdownWithMath: PerseusRenderer = generateTestPerseusRenderer({
    content: "If x equals 4, then [[☃ dropdown 1]] equals $10$.",
    widgets: {
        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
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
                ],
            }),
        }),
    },
});

export const dropdownWithVisibleLabel: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "[[☃ dropdown 1]]",
        widgets: {
            "dropdown 1": generateDropdownWidget({
                options: generateDropdownOptions({
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
                }),
            }),
            "dropdown 2": generateDropdownWidget({
                options: generateDropdownOptions({
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
                }),
            }),
        },
    });

export const inlineDropdownWithVisibleLabel: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "The dropdown widget is often used inline. This is how it would look in an article with the new visible label:\n\nLorem ipsum odor amet, consectetuer adipiscing elit. Mus curae sollicitudin penatibus, mattis suscipit habitant tincidunt mauris. Vitae curae dolor gravida vehicula adipiscing vulputate penatibus. [[☃ dropdown 1]] Ultricies mollis taciti vel, penatibus dapibus interdum pharetra. Ultricies sollicitudin facilisi vehicula dapibus ligula maecenas libero ligula. Lobortis luctus accumsan rhoncus posuere sapien mi habitant fusce. Per ultrices ac mus ligula habitant pulvinar aliquam dui lacus.\n\nAnother use case is that it can be used in tables:\n\nheader 1 | header 2 \n- | -\ndata 1 | [[☃ dropdown 2]]\ndata 4 | data 5\ndata 7 | data 8",
        widgets: {
            "dropdown 1": generateDropdownWidget({
                options: generateDropdownOptions({
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
                }),
            }),
            "dropdown 2": generateDropdownWidget({
                options: generateDropdownOptions({
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
                }),
            }),
        },
    });

export const dropdownWithEmptyPlaceholder: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
        widgets: {
            "dropdown 1": generateDropdownWidget({
                options: generateDropdownOptions({
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
                }),
            }),
        },
    });
