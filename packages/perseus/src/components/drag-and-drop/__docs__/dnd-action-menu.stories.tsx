import * as React from "react";

import {DndActionMenu} from "../dnd-action-menu";

import type {MoveTarget} from "../dnd-action-menu";
import type {Meta, StoryObj} from "@storybook/react-vite";

const FOUR_BLANKS: ReadonlyArray<MoveTarget> = [
    {id: "blank-1", label: "Blank 1", actionLabel: "Move to Blank 1"},
    {id: "blank-2", label: "Blank 2", actionLabel: "Move to Blank 2"},
    {id: "blank-3", label: "Blank 3", actionLabel: "Move to Blank 3"},
    {id: "blank-4", label: "Blank 4", actionLabel: "Move to Blank 4"},
];

/** TODO(LEMS-4363): Placeholder tile chrome around the menu opener. */
function PlaceholderTile({children}: {children: React.ReactNode}) {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                minBlockSize: 48,
                paddingBlock: 8,
                paddingInline: 8,
                borderRadius: 8,
                border: "1px solid var(--wb-semanticColor-core-border-neutral-default)",
                background:
                    "var(--wb-semanticColor-core-background-base-default)",
                // Leave the menu room to open in the story canvas.
                marginBlock: 240,
                marginInline: 32,
            }}
        >
            {children}
        </div>
    );
}

/**
 * `DndActionMenu` is the per-tile actions menu for the Drag-and-Drop widget
 * family — the keyboard/screen-reader/single-pointer alternative to dragging.
 *
 * TODO(LEMS-4363): The tile below is a throwaway placeholder standing in for
 * the real `AnswerTile`, which will render this menu at its leading edge.
 */
const meta: Meta<typeof DndActionMenu> = {
    title: "Components/Drag and Drop/Action Menu",
    component: DndActionMenu,
    render: (args) => (
        <PlaceholderTile>
            <DndActionMenu {...args} />
            {args.label}
        </PlaceholderTile>
    ),
    args: {
        tileId: "tile-1",
        label: "Bongo",
        description: "Actions menu",
        headerLabel: "Move to",
        moveTargets: FOUR_BLANKS,
        disabled: false,
    },
};

export default meta;

type Story = StoryObj<typeof DndActionMenu>;

const CLEAR_ACTION = {
    label: "Clear",
    actionLabel: "Clear Blank 1",
    onClear: () => {},
};

/** A tile in the choice bank: every blank is a target, no Clear, opens above. */
export const InChoiceBank: Story = {
    args: {
        placement: "above",
    },
};

/** A tile placed in Blank 1: the other blanks, a separator, then Clear. Opens below. */
export const PlacedInBlank: Story = {
    args: {
        moveTargets: FOUR_BLANKS.slice(1),
        clearAction: CLEAR_ACTION,
        placement: "below",
    },
};

/** A single-target exercise: one move action only. */
export const SingleMoveTarget: Story = {
    args: {
        moveTargets: FOUR_BLANKS.slice(0, 1),
        placement: "above",
    },
};

/** A placed tile with nowhere else to go: Clear is the only action. */
export const ClearOnly: Story = {
    args: {
        moveTargets: [],
        clearAction: CLEAR_ACTION,
        placement: "below",
    },
};

/** Scored state: an unused tile's menu is disabled but still focusable. */
export const Disabled: Story = {
    args: {
        placement: "above",
        disabled: true,
    },
};

/** A multi-use tile: the SR-only description carries the remaining count. */
export const MultiUse: Story = {
    args: {
        label: "Penny",
        description: "5 remaining. Actions menu.",
        placement: "above",
    },
};

/** Right-to-left: the opener margin and menu alignment mirror automatically. */
export const RightToLeft: Story = {
    args: {
        label: "بونغو",
        headerLabel: "نقل إلى",
        moveTargets: [
            {id: "blank-1", label: "الفراغ 1", actionLabel: "نقل إلى الفراغ 1"},
            {id: "blank-2", label: "الفراغ 2", actionLabel: "نقل إلى الفراغ 2"},
        ],
        placement: "above",
    },
    render: (args) => (
        <div dir="rtl">
            <PlaceholderTile>
                <DndActionMenu {...args} />
                {args.label}
            </PlaceholderTile>
        </div>
    ),
};
