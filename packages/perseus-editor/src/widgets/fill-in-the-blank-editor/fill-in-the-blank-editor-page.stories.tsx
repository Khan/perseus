import {
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";
import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import {registerFillInTheBlankEditor} from "./register-poc";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

import "../../styles/perseus-editor.css";

// The usual EditorPage story setup: everything shipped, registered up front.
registerAllWidgetsAndEditorsForTesting();

// …then Fill in the Blank on top, for this story only. See `register-poc.ts`
// for why this is not in `extra-widgets.ts` / `all-editors.ts`.
registerFillInTheBlankEditor();

// The preview iframe is a separate Storybook story with its own module graph,
// so registering above does not reach it. It needs the widget registered on
// its own side, which is what this preview story does.
const PREVIEW_STORY_ID = "dev-support-preview-fill-in-the-blank--default";

/**
 * Fill in the Blank inside the real content editor.
 *
 * Add one from the "Add a widget…" dropdown, or start from the authored
 * example below. The preview pane on the right is the live widget — drag the
 * choices into the blanks.
 *
 * Proof of concept: the widget and editor are registered by this story alone.
 * Plan and open questions:
 * `packages/perseus/src/widgets/fill-in-the-blank/notes/`.
 */
export default {
    title: "Editors/EditorPage (Fill in the Blank)",
};

/** An empty editor page — insert a Fill in the Blank from the dropdown. */
export const Demo = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview previewStoryId={PREVIEW_STORY_ID} />;
};

// The cast below is the price of the POC's scope. `PerseusRenderer["widgets"]`
// is keyed by the `PerseusWidget` union in `perseus-core`'s data-schema, and
// "fill-in-the-blank" is deliberately not in it yet — the options shape has to
// survive design review first. `satisfies` cannot express a type the union
// does not contain, so this is a genuine unsafe boundary. It disappears the
// moment the widget is added to the schema.
function makeQuestion(
    stimulus: string,
    options: Record<string, unknown>,
): PerseusRenderer {
    return {
        content: `${stimulus}\n\n[[☃ fill-in-the-blank 1]]`,
        images: {},
        // eslint-disable-next-line no-restricted-syntax
        widgets: {
            "fill-in-the-blank 1": {
                type: "fill-in-the-blank",
                alignment: "block",
                static: false,
                graded: true,
                version: {major: 0, minor: 0},
                options,
            },
        } as PerseusRenderer["widgets"],
    };
}

/** Text choices in a sentence — the everyday case. */
const paragraphQuestion = makeQuestion("Complete the sentences about drums.", {
    content:
        "The [[☃ blank 1]] drum is a long-bodied drum typically " +
        "held between the knees. A drum with small metal disks " +
        "around the edge is a [[☃ blank 2]].",
    widgets: {
        "blank 1": generateBlankWidget({
            options: generateBlankOptions({correctId: "tile-1"}),
        }),
        "blank 2": generateBlankWidget({
            options: generateBlankOptions({correctId: "tile-4"}),
        }),
    },
    tiles: [
        {id: "tile-1", content: "djembe", label: "djembe"},
        {id: "tile-2", content: "bongo", label: "bongo"},
        {id: "tile-3", content: "snare", label: "snare"},
        {id: "tile-4", content: "tambourine", label: "tambourine"},
    ],
    tileUsage: "single",
    randomizeTiles: false,
});

/**
 * The other end of the range: TeX choices reused across four blanks, two of
 * them typeset as a subscript and a superscript. The `\,` thin spaces are
 * authored by hand to keep each slot off the Cl and Br glyphs — they are not
 * automatic.
 */
const chemicalEquationQuestion = makeQuestion(
    "The following equation represents the reaction between chlorine gas " +
        "and aqueous sodium bromide.",
    {
        content:
            "**Balance the equation by filling in the correct coefficients " +
            "for each substance.**\n\n" +
            "$\\text{Cl}\\,$[[☃ blank 1]] $(g)\\ +$ [[☃ blank 2]] " +
            "$\\text{NaBr}(aq) \\rightarrow$ [[☃ blank 3]] " +
            "$\\text{NaCl}(aq)\\ + \\text{Br}\\,$[[☃ blank 4]] $(l)$",
        widgets: {
            "blank 1": generateBlankWidget({
                options: generateBlankOptions({
                    correctId: "tile-3",
                    displayType: "subscript",
                }),
            }),
            "blank 2": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-3"}),
            }),
            "blank 3": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-3"}),
            }),
            "blank 4": generateBlankWidget({
                options: generateBlankOptions({
                    correctId: "tile-3",
                    displayType: "superscript",
                }),
            }),
        },
        tiles: [
            {id: "tile-1", content: "", label: "empty"},
            {id: "tile-2", content: "$1$", label: "1"},
            {id: "tile-3", content: "$2$", label: "2"},
            {id: "tile-4", content: "$3$", label: "3"},
        ],
        tileUsage: "multi",
        maxUsesPerTile: 4,
        randomizeTiles: false,
    },
);

/**
 * Image choices — the case the Overview says to use sparingly, and only where
 * the picture *is* the concept. Currency is its own example.
 */
const imageChoicesQuestion = makeQuestion(
    "Each coin below is worth a different amount.",
    {
        content:
            "A coin worth five cents is a [[☃ blank 1]], and a coin worth " +
            "ten cents is a [[☃ blank 2]].",
        widgets: {
            "blank 1": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-2"}),
            }),
            "blank 2": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-3"}),
            }),
        },
        tiles: [
            {
                id: "tile-1",
                content: "![a penny](https://cdn.kastatic.org/penny.png)",
                label: "a penny",
                imageHeight: 48,
            },
            {
                id: "tile-2",
                content: "![a nickel](https://cdn.kastatic.org/nickel.png)",
                label: "a nickel",
                imageHeight: 48,
            },
            {
                id: "tile-3",
                content: "![a dime](https://cdn.kastatic.org/dime.png)",
                label: "a dime",
                imageHeight: 48,
            },
        ],
        tileUsage: "single",
        randomizeTiles: false,
    },
);

/**
 * Options that the editor's own UI cannot produce: choice 1 holds text *and*
 * an image, and choice 2 holds two images. Only hand-edited or pasted JSON
 * gets here, which is exactly why the `fill-in-the-blank-widget-error` linter
 * rule exists — open this story and the **issues panel** above the editor
 * reports both.
 */
const invalidJsonQuestion = makeQuestion(
    "This question was authored by hand, and is wrong on purpose.",
    {
        content: "A coin worth five cents is a [[☃ blank 1]].",
        widgets: {
            "blank 1": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-1"}),
            }),
        },
        tiles: [
            {
                id: "tile-1",
                content:
                    "nickel ![a nickel](https://cdn.kastatic.org/nickel.png)",
                label: "a nickel",
                imageHeight: 48,
            },
            {
                id: "tile-2",
                content:
                    "![a penny](https://cdn.kastatic.org/penny.png)" +
                    "![a dime](https://cdn.kastatic.org/dime.png)",
                label: "two coins",
                imageHeight: 48,
            },
        ],
        tileUsage: "single",
        randomizeTiles: false,
    },
);

/** Text choices in a sentence: single-use, all blanks inline. */
export const WithParagraph = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={paragraphQuestion}
            previewStoryId={PREVIEW_STORY_ID}
        />
    );
};

/**
 * TeX choices in an equation: multi-use, with a subscript and a superscript
 * blank. Shown beside `WithParagraph` so the two ends of the widget's range
 * can be demoed back to back.
 */
export const WithChemicalEquation = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={chemicalEquationQuestion}
            previewStoryId={PREVIEW_STORY_ID}
        />
    );
};

/** Image choices: the add-image flow, the seven height presets, live shape checks. */
export const WithImageChoices = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={imageChoicesQuestion}
            previewStoryId={PREVIEW_STORY_ID}
        />
    );
};

/**
 * A hand-authored question mixing text and images in one choice. The issues
 * panel should report it; the editor UI cannot create this state.
 */
export const WithInvalidJson = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={invalidJsonQuestion}
            previewStoryId={PREVIEW_STORY_ID}
        />
    );
};
