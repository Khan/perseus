/**
 * TEMPORARY demo page for @dnd-kit/react.
 *
 * This page was added alongside the adoption of `@dnd-kit/react` (see ADR #953,
 * "Adopt 3rd party library for upcoming Perseus Drag and Drop Widgets"). It is a
 * throwaway scratchpad that exercises the library's core building blocks so we
 * can confirm the dependency installs, renders, and behaves as expected before
 * "Operation Dragon Drop" starts building real widgets (Fill-in-the-Blank,
 * Sorter, Categorizer, Composer).
 *
 * It is intentionally minimal and is NOT a Perseus widget. Once the real widgets
 * land, this file can be deleted.
 *
 * Capabilities demonstrated here:
 *  - `DragDropProvider` + drag lifecycle events (`onDragEnd`)
 *  - `useSortable` – animated "make room" reordering of a list
 *  - `useDraggable` / `useDroppable` – moving items between drop zones, with
 *    live drop-target highlighting
 *
 * The library also ships a keyboard sensor out of the box: because each draggable
 * item below is a native, focusable `<button>`, you can Tab to an item, press
 * Space/Enter to pick it up, use the arrow keys to move it, and Space/Enter again
 * to drop it — no extra code required.
 */
import {DragDropProvider, useDraggable, useDroppable} from "@dnd-kit/react";
import {useSortable} from "@dnd-kit/react/sortable";
import * as React from "react";
import {useState} from "react";

import type {DragEndEvent} from "@dnd-kit/react";
import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta = {
    title: "Internal/Drag & Drop (dnd-kit)",
    // This is a temporary, exploratory demo rather than a real component, so we
    // keep it out of the component manifest.
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Temporary demo of `@dnd-kit/react`, added while adopting the " +
                    "library for upcoming Perseus drag-and-drop widgets (ADR #953). " +
                    "Not a widget — safe to delete once the real widgets exist.",
            },
        },
    },
};
export default meta;

/** Immutably move the item at `from` to `to` within an array. */
function arrayMove<T>(array: ReadonlyArray<T>, from: number, to: number): T[] {
    const next = array.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
}

// --- Shared styles -----------------------------------------------------------
// Plain inline styles keep this throwaway demo self-contained; real widgets will
// use Wonder Blocks tokens and Aphrodite like the rest of Perseus.

const itemBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #d6d8da",
    background: "#ffffff",
    font: "inherit",
    fontSize: "1.4rem",
    textAlign: "left",
    cursor: "grab",
    touchAction: "none", // let dnd-kit handle touch gestures
};

// =============================================================================
// Example 1: Sortable list (animated reordering)
// =============================================================================

type SortableRow = {id: string; label: string};

function SortableItem({
    id,
    index,
    label,
}: {
    id: string;
    index: number;
    label: string;
}) {
    // `useSortable` wires the element up as both a draggable and a droppable and
    // handles the animated "make room" shuffle as other items move past it.
    const {ref, isDragging} = useSortable({id, index});

    return (
        // A native <button> gives us focus + keyboard support for free, which is
        // what the dnd-kit keyboard sensor hooks into.
        <button
            type="button"
            ref={ref}
            style={{
                ...itemBaseStyle,
                cursor: isDragging ? "grabbing" : "grab",
                opacity: isDragging ? 0.6 : 1,
                boxShadow: isDragging
                    ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                    : "none",
            }}
        >
            <span aria-hidden="true">⠿</span>
            {label}
        </button>
    );
}

function SortableListDemo() {
    const [items, setItems] = useState<ReadonlyArray<SortableRow>>([
        {id: "apple", label: "Apple"},
        {id: "banana", label: "Banana"},
        {id: "cherry", label: "Cherry"},
        {id: "date", label: "Date"},
        {id: "elderberry", label: "Elderberry"},
    ]);

    return (
        <DragDropProvider
            onDragEnd={(event: DragEndEvent) => {
                const {source, target} = event.operation;
                if (event.canceled || !source || !target) {
                    return;
                }
                setItems((current) => {
                    const from = current.findIndex((i) => i.id === source.id);
                    const to = current.findIndex((i) => i.id === target.id);
                    if (from === -1 || to === -1 || from === to) {
                        return current;
                    }
                    return arrayMove(current, from, to);
                });
            }}
        >
            <ul
                style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    maxWidth: 320,
                }}
            >
                {items.map((item, index) => (
                    <li key={item.id}>
                        <SortableItem
                            id={item.id}
                            index={index}
                            label={item.label}
                        />
                    </li>
                ))}
            </ul>
        </DragDropProvider>
    );
}

export const SortableList: Story = {
    render: () => <SortableListDemo />,
};

// =============================================================================
// Example 2: Dragging items between drop zones
// =============================================================================

type ZoneId = "todo" | "doing" | "done";

const ZONES: ReadonlyArray<{id: ZoneId; title: string}> = [
    {id: "todo", title: "To do"},
    {id: "doing", title: "In progress"},
    {id: "done", title: "Done"},
];

const INITIAL_ASSIGNMENTS: Record<string, ZoneId> = {
    "Write ADR": "done",
    "Install dnd-kit": "doing",
    "Build FITB widget": "todo",
    "Build Sorter widget": "todo",
};

function DraggableCard({id}: {id: string}) {
    const {ref, isDragging} = useDraggable({id});
    return (
        <button
            type="button"
            ref={ref}
            style={{
                ...itemBaseStyle,
                width: "100%",
                cursor: isDragging ? "grabbing" : "grab",
                opacity: isDragging ? 0.4 : 1,
            }}
        >
            {id}
        </button>
    );
}

function DropZone({
    id,
    title,
    cards,
}: {
    id: ZoneId;
    title: string;
    cards: ReadonlyArray<string>;
}) {
    const {ref, isDropTarget} = useDroppable({id});
    return (
        // A labeled <section> gives the drop region an accessible name without
        // reaching for a role on a bare <div>. dnd-kit's callback ref accepts
        // any `Element`, so it attaches to the <section> without a cast.
        <section
            ref={ref}
            aria-label={title}
            style={{
                flex: 1,
                minWidth: 160,
                padding: 12,
                borderRadius: 12,
                border: `2px dashed ${isDropTarget ? "#1865f2" : "#d6d8da"}`,
                background: isDropTarget ? "#e8f0ff" : "#f7f8fa",
                transition: "background 120ms ease, border-color 120ms ease",
            }}
        >
            <h3
                style={{
                    margin: "0 0 12px",
                    fontSize: "1.3rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#3b3e40",
                }}
            >
                {title}
            </h3>
            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                {cards.map((card) => (
                    <DraggableCard key={card} id={card} />
                ))}
            </div>
        </section>
    );
}

function DropZonesDemo() {
    const [assignments, setAssignments] =
        useState<Record<string, ZoneId>>(INITIAL_ASSIGNMENTS);

    return (
        <DragDropProvider
            onDragEnd={(event: DragEndEvent) => {
                const {source, target} = event.operation;
                if (event.canceled || !source || !target) {
                    return;
                }
                const cardId = String(source.id);
                // The drop target's id is a dnd-kit UniqueIdentifier; match it
                // back to a known zone rather than casting the raw value.
                const zoneId = ZONES.find((z) => z.id === target.id)?.id;
                if (!zoneId) {
                    return;
                }
                setAssignments((current) =>
                    current[cardId] === zoneId
                        ? current
                        : {...current, [cardId]: zoneId},
                );
            }}
        >
            <div style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
                {ZONES.map((zone) => (
                    <DropZone
                        key={zone.id}
                        id={zone.id}
                        title={zone.title}
                        cards={Object.keys(assignments).filter(
                            (card) => assignments[card] === zone.id,
                        )}
                    />
                ))}
            </div>
        </DragDropProvider>
    );
}

export const DropZones: Story = {
    render: () => <DropZonesDemo />,
};
