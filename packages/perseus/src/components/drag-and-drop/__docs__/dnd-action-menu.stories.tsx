import * as React from "react";

import {mockStrings} from "../../../strings";
import {PerseusI18nContextProvider} from "../../i18n-context";

import {DndActionMenu} from "../dnd-action-menu";
import {
    generateActionMenuProps,
    generateTestBlanks,
} from "../dnd-action-menu/dnd-action-menu.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

/** TODO(LEMS-4363): Placeholder answer tile until we create the real one */
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
 * TODO(LEMS-4363): The tile below is a throwaway placeholder standing in for
 * the real `AnswerTile`, which will be created next after this PR.
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
        ...generateActionMenuProps(),
        moveTargets: generateTestBlanks(4),
    },
};

export default meta;

type Story = StoryObj<typeof DndActionMenu>;

/** Parent tile is in the choice bank, which should list the available blanks, with no "Clear" option */
// No overrides — the shared args on `meta` model this state already.
export const InChoiceBank: Story = {};

/** A tile placed in Blank 1, which should list the other blanks, and a "Clear" option. */
export const PlacedInBlank: Story = {
    args: {
        moveTargets: generateTestBlanks(4).slice(1),
        targetLabel: "Blank 1",
        onClear: () => {},
    },
};

/** Example of the menu being disabled, but still focusable.
 *  While the designs show the menu disappearing when the tile
 *  is disabled, it seemed good to have this logic anyway.
 */
export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

/**
 * Column-based widgets (e.g. Categorizer) use authored column labels as move
 * targets. Long labels widen the menu past its minimum width and wrap.
 */
export const LongCategoryLabels: Story = {
    args: {
        label: "Iron",
        moveTargets: [
            {id: "col-1", label: "Physical changes to matter"},
            {id: "col-2", label: "Chemical changes to matter"},
        ],
        targetLabel: "Physical changes to matter",
        onClear: () => {},
    },
};

/** Right-to-left */
export const RightToLeft: Story = {
    args: {
        label: "بونغو",
        moveTargets: [
            {id: "blank-1", label: "الفراغ 1"},
            {id: "blank-2", label: "الفراغ 2"},
        ],
    },
    parameters: {
        // Render in a separate iframe on the docs page so the document-level
        // dir below doesn't flip the surrounding stories.
        docs: {story: {inline: false, height: "620px"}},
    },
    decorators: [
        // The open menu renders in a portal to document.body, so a dir="rtl"
        // wrapper around the story doesn't work here. Set dir on the document
        // element instead, as a real RTL page does.
        (StoryComponent) => {
            React.useEffect(() => {
                const previous = document.documentElement.dir;
                document.documentElement.dir = "rtl";
                return () => {
                    document.documentElement.dir = previous;
                };
            }, []);
            return (
                <PerseusI18nContextProvider
                    strings={{
                        ...mockStrings,
                        moveTo: "نقل إلى",
                        clear: "مسح",
                        moveToTarget: ({target}) => `نقل إلى ${target}`,
                        clearTarget: ({target}) => `مسح من ${target}`,
                    }}
                    locale="ar"
                >
                    <StoryComponent />
                </PerseusI18nContextProvider>
            );
        },
    ],
};
