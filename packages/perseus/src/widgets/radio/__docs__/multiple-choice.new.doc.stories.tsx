import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import UserInputManager from "../../../user-input-manager";
import {radioQuestionBuilder} from "../radio-question-builder";

import type {Meta, StoryObj} from "@storybook/react-vite";

// Define the type for the question structure
interface RendererQuestion {
    content: string;
    widgets: Record<string, any>;
    images: Record<string, any>;
}

/**
 * Component to render any radio question
 */
function RadioDemo({
    question,
}: {
    question: RendererQuestion;
}): React.ReactElement {
    return (
        <UserInputManager widgets={question.widgets} problemNum={0}>
            {({userInput, handleUserInput, initializeUserInput}) => (
                <Renderer
                    userInput={userInput}
                    handleUserInput={handleUserInput}
                    initializeUserInput={initializeUserInput}
                    strings={mockStrings}
                    content={question.content}
                    widgets={question.widgets}
                    images={question.images}
                    apiOptions={ApiOptions.defaults}
                />
            )}
        </UserInputManager>
    );
}

const meta = {
    title: "Widgets/RadioNew",
    tags: ["!dev"],
    component: RadioDemo,
    parameters: {
        docs: {
            description: {
                component: `
The Radio widget is the cornerstone widget in Khan Academy's content library. Created in April 2013, it is Perseus' second oldest widget and by far the most frequently used widget across our content library.

This versatile component handles all multiple-choice questions, supporting both single-select (radio buttons) and multiple-select (checkboxes) formats. It supports rich content within choices: mathematical expressions via MathJax, Markdown formatting, images, and passage references (PassageRef).
## Key Features

- **Rich Content**: Seamlessly displays math equations, formatted text, images, and passage references
- **Flexible Selection**: Supports both single-answer and multiple-answer questions
- **Randomization**: Optionally shuffles choices to prevent pattern recognition
- **Pedagogical Tools**: Allows the inclusion of a rationale for each choice to help learners understand why an answer is correct or incorrect
- **Accessibility**: Built from the ground up with screen reader compatibility and keyboard navigation
`,
            },
        },
    },
    // We just want to document the API for this initial doc, not control it. We have better methods of control
    // using our ServerItemRendererWithDebugUi, but we want to have a simple introduction to the widget.
    argTypes: {
        question: {
            control: false,
            table: {
                disable: true,
            },
        },

        // PerseusRadioWidgetOptions
        choices: {
            control: false,
            description: "The choices provided to the user",
            table: {
                category: "Radio Widget Options",
                type: {summary: "PerseusRadioChoice[]"},
                defaultValue: {summary: "[]"},
            },
        },
        multipleSelect: {
            control: false,
            description:
                "Does this set allow for multiple selections to be correct?",
            table: {
                category: "Radio Widget Options",
                type: {summary: "boolean"},
                defaultValue: {summary: "false"},
            },
        },
        countChoices: {
            control: false,
            description:
                "If multipleSelect is enabled, specify the number expected to be correct",
            table: {
                category: "Radio Widget Options",
                type: {summary: "boolean"},
                defaultValue: {summary: "false"},
            },
        },
        hasNoneOfTheAbove: {
            control: false,
            description: "Does this have a 'none of the above' option?",
            table: {
                category: "Radio Widget Options",
                type: {summary: "boolean"},
                defaultValue: {summary: "false"},
            },
        },
        randomize: {
            control: false,
            description:
                "Randomize the order of the options or keep them as defined",
            table: {
                category: "Radio Widget Options",
                type: {summary: "boolean"},
                defaultValue: {summary: "false"},
            },
        },
        numCorrect: {
            control: false,
            description:
                "How many of the choices are correct (used to tell learners)",
            table: {
                category: "Radio Widget Options",
                type: {summary: "number"},
                defaultValue: {summary: "1"},
            },
        },

        // PerseusRadioChoice
        content: {
            control: false,
            description: "Translatable Markdown; The label for this choice",
            table: {
                category: "Perseus Radio Choice",
                type: {summary: "string"},
            },
        },
        id: {
            control: false,
            description:
                "An opaque string that uniquely identifies this choice within the radio widget",
            table: {
                category: "Perseus Radio Choice",
                type: {summary: "string"},
            },
        },
        rationale: {
            control: false,
            description:
                "Translatable Markdown; Rationale to give the user when they get it wrong",
            table: {
                category: "Perseus Radio Choice",
                type: {summary: "string | undefined"},
                defaultValue: {summary: "undefined"},
            },
        },
        correct: {
            control: false,
            description: "Whether this option is a correct answer or not",
            table: {
                category: "Perseus Radio Choice",
                type: {summary: "boolean | undefined"},
                defaultValue: {summary: "undefined"},
            },
        },
        isNoneOfTheAbove: {
            control: false,
            description:
                "If this is none of the above, override the content with 'None of the above'",
            table: {
                category: "Perseus Radio Choice",
                type: {summary: "boolean | undefined"},
                defaultValue: {summary: "undefined"},
            },
        },

        // PerseusRadioUserInput
        choicesSelected: {
            control: false,
            description:
                "Array of booleans indicating which choices are selected by the user",
            table: {
                category: "Perseus Radio User Input",
                type: {summary: "boolean[]"},
                defaultValue: {summary: "[]"},
            },
        },
    } as const,
} as Meta<typeof RadioDemo>;

export default meta;

type Story = StoryObj<typeof RadioDemo>;

// Create the question data for each story
const singleSelectQuestion = radioQuestionBuilder()
    .addChoice("Option A", {correct: true})
    .addChoice("Option B", {correct: false})
    .addChoice("Option C", {correct: false})
    .build();

const multipleSelectQuestion = radioQuestionBuilder()
    .addChoice("Option A", {correct: true})
    .addChoice("Option B", {correct: true})
    .addChoice("Option C", {correct: false})
    .withMultipleSelect(true)
    .withCountChoices(true)
    .build();

export const DefaultSingleSelect: Story = {
    args: {
        question: singleSelectQuestion,
    },
};

export const MultipleSelect: Story = {
    args: {
        question: multipleSelectQuestion,
    },
};
