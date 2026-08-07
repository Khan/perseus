import {DragDropProvider, useDraggable, useDroppable} from "@dnd-kit/react";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {DragEndEvent} from "@dnd-kit/react";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * This is a temporary example storybook demo of the new dnd-kit-react
 * library, in order to appease knip. We can clean this up
 * after we have real implementations of the dnd-kit library.
 *
 * TODO (LEMS-4369): Clean-up/remove this file
 */

function DraggableChip() {
    const {ref} = useDraggable({id: "chip"});
    return (
        <button ref={ref} type="button">
            Drag me
        </button>
    );
}

function DropZone({children}: {children: React.ReactNode}) {
    const {ref, isDropTarget} = useDroppable({id: "zone"});
    return (
        <View
            tag="section"
            aria-label="Drop zone"
            ref={ref}
            style={[styles.zone, isDropTarget && styles.zoneActive]}
        >
            {children}
        </View>
    );
}

function DndKitDemo() {
    const [dropped, setDropped] = React.useState(false);
    return (
        <DragDropProvider
            onDragEnd={({operation}: DragEndEvent) =>
                setDropped(operation.target != null)
            }
        >
            {!dropped && <DraggableChip />}
            <DropZone>{dropped ? <DraggableChip /> : "Drop here"}</DropZone>
        </DragDropProvider>
    );
}

const styles = StyleSheet.create({
    zone: {
        marginBlockStart: sizing.size_160,
        padding: sizing.size_320,
        borderWidth: border.width.thin,
        borderStyle: "dashed",
        borderColor: semanticColor.core.border.neutral.default,
    },
    zoneActive: {
        borderStyle: "solid",
        borderColor: semanticColor.core.border.instructive.default,
        backgroundColor: semanticColor.core.background.instructive.subtle,
    },
});

const meta: Meta<typeof DndKitDemo> = {
    title: "Playground/dnd-kit Demo",
    component: DndKitDemo,
    tags: ["!manifest"],
};

export default meta;

type Story = StoryObj<typeof DndKitDemo>;

export const Default: Story = {};
