import * as React from "react";

import {rtlDecorator} from "../../../widgets/__testutils__/story-decorators";
import {AnswerTile} from "../answer-tile";
import {DndActionMenu} from "../dnd-action-menu";
import {
    generateActionMenuProps,
    generateTestBlanks,
} from "../dnd-action-menu/dnd-action-menu.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

/** Give the menu room to open in the story canvas. */
function StoryPadding({children}: {children: React.ReactNode}) {
    return (
        <div style={{display: "flex", marginBlock: 240, marginInline: 32}}>
            {children}
        </div>
    );
}

/**
 * `AnswerTile` contains the `DndActionMenu`. These stories show the menu
 * inside the tile, because that is how widgets use it.
 */
const meta: Meta<typeof DndActionMenu> = {
    title: "Components/Drag and Drop/Action Menu",
    component: DndActionMenu,
    render: (args) => (
        <StoryPadding>
            <AnswerTile
                tileId="tile-1"
                content={args.tileLabel}
                label={args.tileLabel}
                moveTargets={args.moveTargets}
                onMove={args.onMove}
                clearFromLabel={args.clearFromLabel}
                onClear={args.onClear}
                remainingUses={args.remainingUses}
            />
        </StoryPadding>
    ),
    args: generateActionMenuProps({moveTargets: generateTestBlanks(4)}),
};

export default meta;

type Story = StoryObj<typeof DndActionMenu>;

/**
 * The action menu on a tile in the choice bank: a "Move to" header followed
 * by one action per available blank. Click the six-dot handle to open it.
 */
export const Default: Story = {};

/** A tile placed in Blank 1, which should list the other blanks, and a "Clear" option. */
export const PlacedInBlank: Story = {
    args: {
        moveTargets: generateTestBlanks(4).slice(1),
        clearFromLabel: "Blank 1",
        onClear: () => {},
    },
};

/**
 * A tile with nowhere to move and nothing to clear. The opener disables
 * itself rather than open an empty menu, and stays focusable so its
 * position stays discoverable.
 */
export const NoAvailableActions: Story = {
    args: {
        moveTargets: [],
    },
};

/**
 * Column-based widgets (e.g. Categorizer) use authored column labels as move
 * targets. Long labels widen the menu past its minimum width and wrap.
 */
export const LongCategoryLabels: Story = {
    args: {
        tileLabel: "Iron",
        moveTargets: [
            {id: "col-1", label: "Physical changes to matter"},
            {id: "col-2", label: "Chemical changes to matter"},
        ],
        clearFromLabel: "Physical changes to matter",
        onClear: () => {},
    },
};

/**
 * A multi-use tile: the remaining-use count is spoken as part of the
 * opener's description ("Penny, 5 remaining. Actions menu").
 */
export const MultiUse: Story = {
    args: {
        tileLabel: "Penny",
        remainingUses: 5,
    },
};

/** Right-to-left */
export const RightToLeft: Story = {
    args: {
        tileLabel: "بونغو",
        moveTargets: [
            {id: "blank-1", label: "الفراغ 1"},
            {id: "blank-2", label: "الفراغ 2"},
        ],
    },
    parameters: {
        // Render in a separate iframe on the docs page so the document-level
        // dir doesn't flip the surrounding stories.
        docs: {story: {inline: false, height: "620px"}},
    },
    // Note: the fixed copy ("Move to", "Clear") renders in English here —
    // the temporary strings module isn't swappable per story.
    decorators: [rtlDecorator],
};
