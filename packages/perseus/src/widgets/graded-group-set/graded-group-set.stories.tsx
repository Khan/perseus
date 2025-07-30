import {ArticleRendererWithDebugUI} from "../../../../../testing/article-renderer-with-debug-ui";

import {
    article1,
    groupSetRadioRationaleQuestion,
} from "./graded-group-set.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set",
    component: ArticleRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that organizes multiple graded groups into a sequential set,\
                    allowing users to progress through a series of related problems or exercises.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ArticleRendererWithDebugUI>;

export const Article1: Story = {
    args: {
        json: article1,
    },
};

export const GroupSetRadioQuestion: Story = {
    args: {
        json: groupSetRadioRationaleQuestion,
    },
};

// Test story for mobile article checking fix
const mobileArticleTest: PerseusRenderer = {
    content: `This is a test article with a graded group to verify mobile answer checking works.

[[☃ graded-group-set 1]]

Try answering the question above on mobile - you should be able to check your answer!`,
    images: {},
    widgets: {
        "graded-group-set 1": {
            type: "graded-group-set",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                gradedGroups: [
                    {
                        title: "Test Question",
                        content: "What is 2 + 2?\n\n[[☃ numeric-input 1]]",
                        widgets: {
                            "numeric-input 1": {
                                type: "numeric-input",
                                alignment: "default",
                                static: false,
                                graded: true,
                                options: {
                                    static: false,
                                    answers: [
                                        {
                                            value: 4,
                                            status: "correct",
                                            message: "",
                                            simplify: "required",
                                            strict: false,
                                            maxError: null,
                                        },
                                    ],
                                    size: "normal",
                                    coefficient: false,
                                    labelText: "",
                                },
                                version: {major: 0, minor: 0},
                            },
                        },
                        images: {},
                        hint: {
                            content: "Try thinking about basic addition!",
                            widgets: {},
                            images: {},
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
            version: {major: 0, minor: 0},
        },
    },
};

export const MobileArticleTest: Story = {
    args: {
        title: "📱 Mobile Article Test (Check Answer Fix)",
        json: mobileArticleTest,
    },
};

// Skateboard Forces Article - demonstrates mobile article checking fix with realistic content
const skateboardForcesArticle: PerseusRenderer = {
    content: `You've decided to learn the sport of skateboarding. You go to a skate park where skaters are doing all sorts of jumps, flips, slides, and other tricks. One of the most basic jumps, the ollie, is shown below.

[[☃ image 1]]

How does a skater control the motion of a skateboard? Let's find out.

##Forces are interactions

To start moving forward, a skater can push backward on the ground with one foot as shown below.

[[☃ image 2]]

If the ground beneath the skater's foot wasn't there, moving his foot backward would *not* make him move forward.

Pushes require two objects to push against *each other*. This is called an **interaction.** The same is true for pulling: two objects interact by pulling on *each other*. An object can't change its motion by pushing or pulling on itself.

A push or pull from an interaction between two objects is called a **force.** The strength of a force is measured in units of newtons $(\\text{N}).$ For example, the skater's push against the ground may have a strength of $30\\,\\text{N}.$

Forces are modeled with arrows. The arrow points in the direction the force acts. The longer the arrow, the stronger the force. An arrow modeling a force can be labeled with a description of the force, the strength of the force, or both, like in the image below.

[[☃ image 3]]

[[☃ graded-group-set 1]]

##Newton's third law

When two objects interact, they push against each other in *opposite directions.* For example, when a skater's foot pushes *backward* against the ground, the ground pushes *forward* on the skater's foot. This makes the skater accelerate forward.

What if the skater pushes back on the ground harder? Then they speed up quicker. When they push the ground harder, the ground pushes back on them harder too. In fact, the ground pushes on the skater with *exactly the same strength* as the skater pushes on the ground.

These characteristics of interactions are always true and are summarized by Newton's third law: **When two objects interact, the forces they exert on each other are always the same strength, and they always act in opposite directions.**

Said another way, when object A exerts a force on object B, object B exerts a force of equal strength on object A. The forces objects A and B exert on each other act in in opposite directions.

"Object A" and "object B" can be replaced with the names of whatever objects are interacting in a given situation.  It doesn't matter which is A and which is B.

[[☃ explanation 1]]

[[☃ graded-group-set 2]]`,
    images: {},
    widgets: {
        "image 1": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [350, 243],
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-content-images/42713918d37c4fc99614b02d022f0857746cb0ab.gif",
                    width: 350,
                    height: 243,
                },
                labels: [],
                alt: "The bottom half of a person is shown standing on a skateboard. The person crouches down and jumps, kicking their right foot down on the back of the skateboard. The skateboard follows the persons feet into the air and the person drags their left foot upward and to the right against the surface of the board as it continues to rise. Both the person and the skateboard land in the same position they started.",
                caption: "",
            },
            version: {major: 0, minor: 0},
        },
        "image 2": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [350, 200],
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-content-images/f1ab8ce267b4f50f0bf916c8d9e56596cad28f89.gif",
                    width: 350,
                    height: 200,
                },
                labels: [],
                alt: "A video shows the bottom half of a person with one foot standing on a skateboard that is at rest. The other foot pushes backward on the ground, and the skateboard moves forward. The foot pushes backward two more times before standing on the skateboard. The skateboard speeds up with each push.",
                caption: "",
            },
            version: {major: 0, minor: 0},
        },
        "image 3": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [350, 226],
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-content-images/a180cd16d4c51d09eb62f65e2ac804246af9180e.svg",
                    width: 350,
                    height: 226,
                },
                labels: [],
                alt: "A boy pushes a girl, who is standing on a skateboard, to the right. An arrow points from the girl to the right.  It is labeled F push, boy on girl, 25 N. ",
                caption: "",
            },
            version: {major: 0, minor: 0},
        },
        "graded-group-set 1": {
            type: "graded-group-set",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                gradedGroups: [
                    {
                        title: "Question 1",
                        content:
                            "An upward force acts on a dog as he stands on a skateboard.\n\n[[☃ image 4]]\n\n**Complete the statement.**\n\n* The other object interacting with the dog that produces this force is [[☃ dropdown 1]].",
                        widgets: {
                            "image 4": {
                                type: "image",
                                alignment: "block",
                                static: false,
                                graded: true,
                                options: {
                                    title: "",
                                    range: [
                                        [0, 10],
                                        [0, 10],
                                    ],
                                    box: [200, 184],
                                    backgroundImage: {
                                        url: "https://cdn.kastatic.org/ka-content-images/af7cc79aa68e9cbbd3ec459d241cfe2b81bd81f3.svg",
                                        width: 200,
                                        height: 184,
                                    },
                                    labels: [],
                                    alt: "A dog stands at rest with all four paws on a skateboard.",
                                    caption: "",
                                    static: false,
                                },
                                version: {major: 0, minor: 0},
                            },
                            "dropdown 1": {
                                options: {
                                    placeholder: "",
                                    choices: [
                                        {
                                            content: "the board",
                                            correct: true,
                                        },
                                        {
                                            content: "the wheels",
                                            correct: false,
                                        },
                                        {
                                            content: "the ground",
                                            correct: false,
                                        },
                                    ],
                                    static: false,
                                },
                                type: "dropdown",
                                version: {major: 0, minor: 0},
                                graded: true,
                                alignment: "default",
                                static: false,
                            },
                        },
                        images: {},
                        hint: {
                            content:
                                "When the dog stands on the skateboard, he's only touching the board. So, he can't interact with the ground or wheels. The dog interacts with *the board.*",
                            widgets: {},
                            images: {},
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
            version: {major: 0, minor: 0},
        },
        "explanation 1": {
            type: "explanation",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                showPrompt: "What about Newton's first and second laws?",
                hidePrompt: "Hide explanation",
                explanation:
                    "The numbering of Newton's laws doesn't mean we need to learn or apply them in a certain order. They're just labels. All three laws apply simultaneously.\n\nWe're starting with Newton's third law because it helps us understand how objects exert forces on each other. Newton's first and second laws will tell us how the forces exerted on an object affect its *motion*.  ",
                widgets: {},
            },
            version: {major: 0, minor: 0},
        },
        "graded-group-set 2": {
            type: "graded-group-set",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                gradedGroups: [
                    {
                        title: "Question 2",
                        content:
                            "A skateboard slides along a rail to the right, exerting a rightward force on the rail as modeled below. *(Note: We've only modeled one of the forces the skateboard exerts on the rail.)*\n\n[[☃ image 5]]\n\n**Complete the statement.**\n\n* At the same time, the rail exerts a [[☃ dropdown 2]] force on the skateboard. The strength of this force is [[☃ dropdown 3]] the strength of the skateboard's rightward force on the rail.",
                        widgets: {
                            "image 5": {
                                type: "image",
                                alignment: "block",
                                static: false,
                                graded: true,
                                options: {
                                    title: "",
                                    range: [
                                        [0, 10],
                                        [0, 10],
                                    ],
                                    box: [350, 220],
                                    backgroundImage: {
                                        url: "https://cdn.kastatic.org/ka-content-images/145abed77eb49d6cc269a3201349ce26a03f6776.svg",
                                        width: 350,
                                        height: 220,
                                    },
                                    labels: [],
                                    alt: "A skateboard is sliding to the right along a rail.  At the point where the skateboard touches the rail, a red arrow points along the rail to the right.",
                                    caption: "",
                                    static: false,
                                },
                                version: {major: 0, minor: 0},
                            },
                            "dropdown 2": {
                                options: {
                                    placeholder: "",
                                    choices: [
                                        {
                                            content: "rightward",
                                            correct: false,
                                        },
                                        {
                                            content: "leftward",
                                            correct: true,
                                        },
                                    ],
                                    static: false,
                                },
                                type: "dropdown",
                                version: {major: 0, minor: 0},
                                graded: true,
                                alignment: "default",
                                static: false,
                            },
                            "dropdown 3": {
                                options: {
                                    placeholder: "",
                                    choices: [
                                        {
                                            content: "greater than",
                                            correct: false,
                                        },
                                        {
                                            content: "equal to",
                                            correct: true,
                                        },
                                        {
                                            content: "less than",
                                            correct: false,
                                        },
                                    ],
                                    static: false,
                                },
                                type: "dropdown",
                                version: {major: 0, minor: 0},
                                graded: true,
                                alignment: "default",
                                static: false,
                            },
                        },
                        images: {},
                        hint: {
                            content:
                                "The skateboard exerts a force on the rail to the right. According to Newton's third law, when two objects interact, they exert *equal strength* forces on each other that act in *opposite directions.* \n\nSo, the rail exerts a *leftward* force on the skateboard with a strength *equal to* the strength of the skateboard's force on the rail.",
                            widgets: {},
                            images: {},
                        },
                        widgetEnabled: true,
                        immutableWidgets: false,
                    },
                ],
            },
            version: {major: 0, minor: 0},
        },
    },
};

export const SkateboardForcesArticle: Story = {
    args: {
        title: "🛹 Skateboard Forces Article (Mobile Check Fix Demo)",
        json: skateboardForcesArticle,
    },
};
