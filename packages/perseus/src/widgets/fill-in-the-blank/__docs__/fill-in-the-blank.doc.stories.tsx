import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import {useStorybookApiOptions} from "../../../testing/use-storybook-api-options";
import UserInputManager from "../../../user-input-manager";
import {basicFillInTheBlankQuestion} from "../fill-in-the-blank.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// eslint-disable-next-line no-restricted-syntax
const meta = {
    title: "Widgets/Fill in the Blank",
    tags: ["!dev"],
    // TODO(LEMS-4396): clean up feature flag
    globals: {featureFlags: ["dnd-widget-fitb"]},
    component: FillInTheBlankDemo,
    parameters: {
        docs: {
            description: {
                component: `
Fill in the Blank presents a passage with inline blanks above a choice bank of answer tiles. The learner moves a tile into a blank by dragging it, or through the tile's actions menu.

It is the first of a drag-and-drop family — Sorter, Categorizer and Composer follow — which is why the answer tile is named for the family (\`PerseusAnswerTile\`) rather than for this widget.

**The render below is a placeholder.** The drag-and-drop components in \`components/drag-and-drop/\` have not been assembled into the widget yet, so the options documented here are authored but not yet honoured.

## Key Features

- **Inline blanks**: the passage is a single translatable Markdown string holding \`[[☃ blank n]]\` placeholders, so translators can move a blank within the sentence
- **Rich tiles**: an answer tile's face is text, TeX, an image, or empty
- **Tile reuse**: tiles are single-use, capped, or unlimited, for the whole choice bank
- **Accessibility**: every drag has an equivalent action in the tile's actions menu, and each tile carries a screen reader label
`,
            },
        },
    },
    // We just want to document the API for this initial doc, not control it.
    argTypes: {
        question: {
            control: false,
            table: {
                disable: true,
            },
        },

        // PerseusFillInTheBlankWidgetOptions
        content: {
            control: false,
            description:
                "Translatable Markdown; the passage, holding the `[[☃ blank n]]` placeholders that translators may move within it",
            table: {
                category: "Fill in the Blank Widget Options",
                type: {summary: "string"},
                defaultValue: {summary: '""'},
            },
        },
        widgets: {
            control: false,
            description: "The blank widgets embedded in `content`, keyed by id",
            table: {
                category: "Fill in the Blank Widget Options",
                type: {summary: "PerseusWidgetsMap"},
                defaultValue: {summary: "{}"},
            },
        },
        tiles: {
            control: false,
            description: "The choice bank the learner draws answer tiles from",
            table: {
                category: "Fill in the Blank Widget Options",
                type: {summary: "PerseusAnswerTile[]"},
                defaultValue: {summary: "[]"},
            },
        },
        maxUsesPerTile: {
            control: false,
            description:
                "How many times each tile may be placed, for the whole choice bank. 1 moves a placed tile rather than copying it, so it can never occupy two blanks; above 1 copies it, up to that many uses",
            table: {
                category: "Fill in the Blank Widget Options",
                type: {summary: 'number | "unlimited"'},
                defaultValue: {summary: "1"},
            },
        },
        randomize: {
            control: false,
            description:
                "Randomize the order of the answer tiles or keep them as defined. Not yet honoured by any render code (LEMS-4388)",
            table: {
                category: "Fill in the Blank Widget Options",
                type: {summary: "boolean"},
                defaultValue: {summary: "false"},
            },
        },

        // PerseusAnswerTile
        "tiles[].id": {
            control: false,
            description:
                "An opaque string that uniquely identifies this tile within the widget. A blank's `correctId` names one of these",
            table: {
                category: "Perseus Answer Tile",
                type: {summary: "string"},
            },
        },
        "tiles[].content": {
            control: false,
            description:
                "Translatable Markdown; the tile's face. An empty string renders an empty tile",
            table: {
                category: "Perseus Answer Tile",
                type: {summary: "string"},
            },
        },
        "tiles[].label": {
            control: false,
            description:
                "Translatable plain text; names the tile for screen readers, in its actions menu and in move announcements",
            table: {
                category: "Perseus Answer Tile",
                type: {summary: "string"},
            },
        },
        "tiles[].imageHeight": {
            control: false,
            description:
                "The display height, in pixels, of an image tile's image",
            table: {
                category: "Perseus Answer Tile",
                type: {summary: "number | undefined"},
                defaultValue: {summary: "undefined"},
            },
        },
    } as const,
} as Meta<typeof FillInTheBlankDemo>;

export default meta;

type Story = StoryObj<typeof FillInTheBlankDemo>;

export const Default: Story = {
    args: {
        question: basicFillInTheBlankQuestion,
    },
};

/**
 * Component to render our example fill-in-the-blank question.
 */
function FillInTheBlankDemo({
    question,
}: {
    question: PerseusRenderer;
}): React.ReactElement {
    const apiOptions = useStorybookApiOptions(ApiOptions.defaults);

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
                    apiOptions={apiOptions}
                />
            )}
        </UserInputManager>
    );
}
