import {
    generateDropdownOptions,
    generateDropdownWidget,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
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
};
