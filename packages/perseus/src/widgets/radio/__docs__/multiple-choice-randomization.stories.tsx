import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {ArticleRendererWithDebugUI} from "../../../testing/article-renderer-with-debug-ui";

import type {
    PerseusArticle,
    PerseusRadioChoice,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta = {
    title: "Widgets/Radio/Randomization",
    component: ArticleRendererWithDebugUI,
    tags: ["!manifest", "!autodocs"],
} satisfies Meta<typeof ArticleRendererWithDebugUI>;

export default meta;

type Story = StoryObj<typeof meta>;

// Renders as Mitochondria, Nucleus, Vacuole, Ribosome — only the last two move.
const ORGANELLES = ["Mitochondria", "Nucleus", "Ribosome", "Vacuole"];
const ORGANELLE_PROMPT =
    "Which organelle produces most of a cell's energy? (Mitochondria is authored first)";

function radioChoices(contents: string[]): PerseusRadioChoice[] {
    return contents.map((content, index) =>
        generateRadioChoice(content, {
            // Ids are set explicitly because the seed hashes them and
            // `generateRadioChoice` randomises them.
            id: `radio-choice-${index}`,
            correct: index === 0,
        }),
    );
}

function gradedGroupWithRadio(
    title: string,
    prompt: string,
    contents: string[],
    randomize: boolean,
) {
    return generateGradedGroupWidget({
        options: generateGradedGroupOptions({
            title,
            content: `**${prompt}**\n\n[[☃ radio 1]]`,
            widgets: {
                "radio 1": generateRadioWidget({
                    options: generateRadioOptions({
                        choices: radioChoices(contents),
                        randomize,
                        numCorrect: 1,
                    }),
                }),
            },
        }),
    });
}

function article(
    intro: string,
    groups: Array<{
        title: string;
        prompt: string;
        contents: string[];
        randomize?: boolean;
    }>,
): PerseusArticle {
    const widgets: PerseusWidgetsMap = {};
    groups.forEach((group, index) => {
        widgets[`graded-group ${index + 1}`] = gradedGroupWithRadio(
            group.title,
            group.prompt,
            group.contents,
            group.randomize ?? true,
        );
    });

    const body = groups
        .map((_, index) => `[[☃ graded-group ${index + 1}]]`)
        .join("\n\n");

    return generateTestPerseusRenderer({
        content: `${intro}\n\n${body}`,
        widgets,
    });
}

export const SingleQuestionLooksBarelyShuffled: Story = {
    args: {
        title: "📜 One question — order is fixed, and that's expected",
        json: article(
            [
                "## A single question looks barely shuffled",
                "",
                "Authored as Mitochondria, Nucleus, Ribosome, Vacuole — it renders **Mitochondria, Nucleus, Vacuole, Ribosome**, so only the last two appear to have moved.",
                "",
                "That is one of the 24 permutations, not a failure to randomize. Reloading will not change it; the order is a pure function of the question's content. About 1 question in 12 leaves the first two choices in place.",
                "",
                'Note the **letters are position labels** and always read A, B, C, D top to bottom — only the content moves. Naming choices after the letters ("Choice A", "Choice B", …) makes a shuffled question look untouched, so avoid it when smoke testing.',
            ].join("\n"),
            [
                {
                    title: "CHECK FOR UNDERSTANDING:",
                    prompt: ORGANELLE_PROMPT,
                    contents: ORGANELLES,
                },
            ],
        ),
    },
};

export const SingleQuestionWithoutRandomization: Story = {
    args: {
        title: "📜 One question — randomize off",
        json: article(
            "## Randomize order: off\n\nThe same question unshuffled, for side-by-side comparison with the story above. Only the last two choices differ between them.",
            [
                {
                    title: "CHECK FOR UNDERSTANDING:",
                    prompt: ORGANELLE_PROMPT,
                    contents: ORGANELLES,
                    randomize: false,
                },
            ],
        ),
    },
};

export const CorrectAnswerMovesBetweenQuestions: Story = {
    args: {
        title: "📜 Five questions — the correct answer moves",
        json: article(
            [
                "## Randomization is visible across questions, not within one",
                "",
                "Every question below authors the correct answer **first**, and all five render at the same position seed — articles supply no `problemNum`, and each graded group restarts the widget index at 0.",
                "",
                "Before the fix all five shuffled identically, with the correct answer pinned to C. Now it lands at **A, B, C, D**.",
                "",
                "Question 5 is included deliberately: its permutation is the identity, so it renders in the authored order and looks entirely unshuffled. That happens to 1 in 24 four-choice questions, and is why one question is never evidence either way.",
            ].join("\n"),
            [
                {
                    title: "QUESTION 1 — correct answer renders at A:",
                    prompt: "Which city is the capital of France? (Paris is authored first)",
                    contents: ["Paris", "London", "Rome", "Madrid"],
                },
                {
                    title: "QUESTION 2 — correct answer renders at B:",
                    prompt: "Which planet is closest to the Sun? (Mercury is authored first)",
                    contents: ["Mercury", "Venus", "Earth", "Mars"],
                },
                {
                    title: "QUESTION 3 — correct answer renders at C:",
                    prompt: "Which process turns liquid water into vapour? (Evaporation is authored first)",
                    contents: [
                        "Evaporation",
                        "Condensation",
                        "Precipitation",
                        "Collection",
                    ],
                },
                {
                    title: "QUESTION 4 — correct answer renders at D:",
                    prompt: "Which gas do we breathe in to survive? (Oxygen is authored first)",
                    contents: ["Oxygen", "Carbon", "Helium", "Nitrogen"],
                },
                {
                    title: "QUESTION 5 — renders in the authored order:",
                    prompt: "Which word type names a person or thing? (Noun is authored first)",
                    contents: ["Noun", "Verb", "Adjective", "Adverb"],
                },
            ],
        ),
    },
};
