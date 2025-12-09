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
                static: false,
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

export const article = {
    content:
        "###Backstory\n\nDuring World War II, in August of 1943, the [[☃ definition 1]] launched a massive bombing campaign on Milan and its outskirts. The explosions and the ensuing fires killed over 700 people and destroyed many of the city’s most important buildings and monuments, including a significant portion of Santa Maria delle Grazie. Miraculously, the wall with the painting survived, probably because it had been shored up with sandbags and mattresses, but the roof of the refectory was blown off and the other walls were decimated. The _Last Supper_ remained exposed to the elements, covered only with a tarp, for several months, until the refectory (the dining room of the monastery where the _Last Supper_ was painted), was rebuilt and a team of restorers began working to preserve and restore the painting.",
    images: {},
    widgets: {
        "definition 1": generateDefinitionWidget({
            options: generateDefinitionOptions({
                definition:
                    "The Allies, led by the United Kingdom, the United States, and the Soviet Union, were the group of countries who opposed the Axis powers (Germany, Japan, and Italy) during World War II.",
                togglePrompt: "Allies",
            }),
        }),
    },
} as const;
