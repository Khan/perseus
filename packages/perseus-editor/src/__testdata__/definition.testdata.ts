import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Read the excerpt and answer the question below. \n\nThe [[\u2603 definition 2]] and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    widgets: {
        "definition 1": generateDefinitionWidget({
            options: generateDefinitionOptions({
                definition:
                    "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
                togglePrompt: "the Pequots",
            }),
        }),
        "definition 2": generateDefinitionWidget({
            options: generateDefinitionOptions({
                definition:
                    "A governor is an administrative leader and head of a polity or political region, ranking under the head of state and in some cases, such as governors-general, as the head of state's official representative.",
                togglePrompt: "Governor",
            }),
        }),
    },
});
