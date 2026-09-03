import {FillInTheBlank} from "@khanacademy/perseus";
import {
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";
import {registerFillInTheBlankEditor} from "./register-poc";
import {getFillInTheBlankSaveWarnings} from "./validation";

import type {FillInTheBlankEditorOptions} from "./types";
import type {TilePlacements} from "@khanacademy/perseus";
import type {Meta, StoryObj} from "@storybook/react-vite";

// Both sides of this story need the registry: the preview renders the blank
// widgets through `Renderer`, and the answer zone's nested `Editor` looks up
// an editor per embedded widget. Registering here rather than relying on
// another story module having done it first.
registerAllWidgetsAndEditorsForTesting();
registerFillInTheBlankEditor();

/**
 * Demo of the Fill in the Blank editor POC. Edit on the left; the right side
 * is the real render component, updating as you type. Drag the choices into
 * the blanks to check the exercise actually works.

 * Plan and open questions:
 * `packages/perseus/src/widgets/fill-in-the-blank/notes/`.
 */
const meta: Meta = {
    title: "Widgets/Fill in the Blank/Editor Demo",
    component: FillInTheBlankEditor,
    // No "!dev": unlike the other editor demos, this POC exists to be opened
    // and driven by hand (edit on the left, drag on the right), so it needs to
    // be reachable from the sidebar rather than docs-only.
    tags: ["!manifest"],
} satisfies Meta<typeof FillInTheBlankEditor>;
export default meta;

/** The drums paragraph, matching the render POC's Figma-derived demo. */
const drumsOptions: FillInTheBlankEditorOptions = {
    content:
        "The [[☃ blank 1]] drum is a long-bodied drum typically held " +
        "between the knees. A drum with small metal disks around the edge " +
        "is a [[☃ blank 2]].",
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
};

/** An empty widget, as an author would first meet it. */
const blankSlateOptions: FillInTheBlankEditorOptions = {
    content: "",
    widgets: {},
    tiles: [],
    tileUsage: "single",
    randomizeTiles: true,
};

interface DemoProps {
    initialOptions: FillInTheBlankEditorOptions;
}

/**
 * Holds the authored options and the learner's placements, so the editor and
 * the render component share one source of truth — the loop the POC exists to
 * demonstrate.
 */
function FillInTheBlankEditorDemo({initialOptions}: DemoProps) {
    const [options, setOptions] =
        React.useState<FillInTheBlankEditorOptions>(initialOptions);
    const [placements, setPlacements] = React.useState<TilePlacements>({});

    const onChange = (changes: Partial<FillInTheBlankEditorOptions>) => {
        action("onChange")(changes);
        setOptions((previous) => ({...previous, ...changes}));
    };

    const warnings = getFillInTheBlankSaveWarnings(options);

    return (
        <div style={{display: "flex", gap: 32, alignItems: "flex-start"}}>
            <div style={{width: PROD_EDITOR_WIDTH, flexShrink: 0}}>
                <FillInTheBlankEditor {...options} onChange={onChange} />
                <h3>Save warnings</h3>
                {warnings.length === 0 ? (
                    <p>None.</p>
                ) : (
                    <ul>
                        {warnings.map((warning) => (
                            <li key={warning}>{warning}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div style={{flexGrow: 1, minInlineSize: 0}}>
                <h3>Preview</h3>
                <FillInTheBlank
                    content={options.content}
                    widgets={options.widgets}
                    tiles={options.tiles}
                    tileUsage={options.tileUsage}
                    maxUsesPerTile={options.maxUsesPerTile}
                    placements={placements}
                    onPlacementsChange={setPlacements}
                />
                <h3>Serialized options</h3>
                <pre style={{overflowX: "auto"}}>
                    {JSON.stringify(options, null, 2)}
                </pre>
            </div>
        </div>
    );
}

type Story = StoryObj<typeof meta>;

/** An authored two-blank sentence, ready to edit. */
export const Default: Story = {
    render: () => <FillInTheBlankEditorDemo initialOptions={drumsOptions} />,
};

/** Authoring from nothing: add a blank, add choices, pick the answers. */
export const BlankSlate: Story = {
    render: () => (
        <FillInTheBlankEditorDemo initialOptions={blankSlateOptions} />
    ),
};

/** Multi-use choices, capped — the chemical-equation shape. */
export const MultiUseChoices: Story = {
    render: () => (
        <FillInTheBlankEditorDemo
            initialOptions={{
                ...drumsOptions,
                tileUsage: "multi",
                maxUsesPerTile: 2,
            }}
        />
    ),
};
