import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {storybookDependenciesV2} from "../../../../../testing/test-dependencies";
import ArticleRenderer from "../../article-renderer";

export default {
    title: "Perseus/Widgets/Definition",
};

const question1 = {
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition:
                    "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
                togglePrompt: "the Pequots",
                static: false,
            },
            alignment: "default",
        },
    },
} as const;

const question2 = {
    content:
        "Read the excerpt and answer the question below. \n\nThe [[\u2603 definition 2]] and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition:
                    "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
                togglePrompt: "the Pequots",
                static: false,
            },
            alignment: "default",
        },
        "definition 2": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition:
                    "A governor is an administrative leader and head of a polity or political region, ranking under the head of state and in some cases, such as governors-general, as the head of state's official representative.",
                togglePrompt: "Governor",
                static: false,
            },
            alignment: "default",
        },
    },
} as const;

const article = {
    content:
        "###Backstory\n\nDuring World War II, in August of 1943, the [[☃ definition 1]] launched a massive bombing campaign on Milan and its outskirts. The explosions and the ensuing fires killed over 700 people and destroyed many of the city’s most important buildings and monuments, including a significant portion of Santa Maria delle Grazie. Miraculously, the wall with the painting survived, probably because it had been shored up with sandbags and mattresses, but the roof of the refectory was blown off and the other walls were decimated. The _Last Supper_ remained exposed to the elements, covered only with a tarp, for several months, until the refectory (the dining room of the monastery where the _Last Supper_ was painted), was rebuilt and a team of restorers began working to preserve and restore the painting.",
    images: {},
    widgets: {
        "definition 1": {
            alignment: "default",
            graded: true,
            options: {
                definition:
                    "The Allies, led by the United Kingdom, the United States, and the Soviet Union, were the group of countries who opposed the Axis powers (Germany, Japan, and Italy) during World War II.",
                static: false,
                togglePrompt: "Allies",
            },
            static: false,
            type: "definition",
            version: {major: 0, minor: 0},
        },
    },
} as const;

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const MultipleDefinitions = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};

export const ArticleDefintion = (args: StoryArgs): React.ReactElement => {
    return (
        <ArticleRenderer
            json={article}
            useNewStyles
            dependencies={storybookDependenciesV2}
        />
    );
};
