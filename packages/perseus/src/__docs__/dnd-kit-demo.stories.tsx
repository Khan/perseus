import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import {
    DragDropProvider,
    useDraggable,
    useDroppable,
} from "@dnd-kit/react";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {
    border,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import type {DragEndEvent} from "@dnd-kit/react";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * A minimal smoke-test of the `@dnd-kit/react` API. It wires up a
 * `DragDropProvider` around a couple of droppable columns and some draggable
 * cards so we exercise `useDraggable` / `useDroppable` and confirm the library
 * is installed and behaves. This is a demo/dev utility rather than a shipping
 * widget, so it's tagged `!manifest`.
 */

type ColumnId = "todo" | "done";

const COLUMN_TITLES: Record<ColumnId, string> = {
    todo: "To do",
    done: "Done",
};

const CARD_LABELS: Record<string, string> = {
    "card-1": "Write the parser",
    "card-2": "Score the answer",
    "card-3": "Ship the widget",
};

// A draggable card. We use a native <button> because it is focusable and
// keyboard-operable by default, which lets dnd-kit's keyboard sensor drive it
// without us adding any custom key handlers.
function Card({id}: {id: string}) {
    const {ref, isDragging} = useDraggable({id});

    return (
        <button
            ref={ref}
            type="button"
            className={css(styles.card, isDragging && styles.cardDragging)}
        >
            {CARD_LABELS[id]}
        </button>
    );
}

// A droppable column. `isDropTarget` lets us highlight the column the pointer
// is currently over during a drag.
function Column({id, cardIds}: {id: ColumnId; cardIds: readonly string[]}) {
    const {ref, isDropTarget} = useDroppable({id});

    return (
        <View
            // A labelled region groups the cards it contains.
            tag="section"
            aria-label={COLUMN_TITLES[id]}
            ref={ref}
            style={[styles.column, isDropTarget && styles.columnActive]}
        >
            <Heading size="small" tag="h3">
                {COLUMN_TITLES[id]}
            </Heading>
            {cardIds.length === 0 ? (
                <BodyText size="small" style={styles.empty}>
                    Drop a card here
                </BodyText>
            ) : (
                cardIds.map((cardId) => <Card key={cardId} id={cardId} />)
            )}
        </View>
    );
}

function DndKitDemo() {
    const [columns, setColumns] = React.useState<Record<ColumnId, string[]>>({
        todo: ["card-1", "card-2", "card-3"],
        done: [],
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const {source, target} = event.operation;
        if (source == null || target == null) {
            return;
        }

        const cardId = String(source.id);
        const destination = target.id as ColumnId;

        setColumns((prev) => {
            // Remove the card from whichever column currently holds it, then
            // append it to the column it was dropped on.
            const next: Record<ColumnId, string[]> = {
                todo: prev.todo.filter((c) => c !== cardId),
                done: prev.done.filter((c) => c !== cardId),
            };
            next[destination] = [...next[destination], cardId];
            return next;
        });
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <View style={styles.board}>
                <Column id="todo" cardIds={columns.todo} />
                <Column id="done" cardIds={columns.done} />
            </View>
        </DragDropProvider>
    );
}

const styles = StyleSheet.create({
    board: {
        flexDirection: "row",
        gap: sizing.size_160,
        alignItems: "flex-start",
    },
    column: {
        gap: sizing.size_120,
        padding: sizing.size_160,
        minInlineSize: sizing.size_960,
        borderRadius: border.radius.radius_040,
        border: `${border.width.thin} dashed ${semanticColor.core.border.neutral.default}`,
        backgroundColor: semanticColor.core.background.instructive.subtle,
    },
    columnActive: {
        borderStyle: "solid",
        borderColor: semanticColor.core.border.instructive.default,
        backgroundColor: semanticColor.core.background.instructive.default,
    },
    empty: {
        color: semanticColor.core.foreground.neutral.subtle,
    },
    card: {
        textAlign: "start",
        padding: sizing.size_120,
        borderRadius: border.radius.radius_040,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.default}`,
        backgroundColor: semanticColor.core.background.base.default,
        color: semanticColor.core.foreground.neutral.strong,
        cursor: "grab",
    },
    cardDragging: {
        cursor: "grabbing",
        opacity: 0.5,
    },
});

const meta: Meta<typeof DndKitDemo> = {
    title: "Playground/dnd-kit Demo",
    component: DndKitDemo,
    // Demo/dev utility — keep it out of the component manifest.
    tags: ["!manifest"],
};

export default meta;

type Story = StoryObj<typeof DndKitDemo>;

export const Default: Story = {};
