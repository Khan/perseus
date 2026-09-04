import {Accessibility, PointerActivationConstraints} from "@dnd-kit/dom";
import {DragDropProvider, PointerSensor} from "@dnd-kit/react";
import * as React from "react";

import type {Draggable} from "@dnd-kit/dom";
import type {DragEndEvent} from "@dnd-kit/react";

/**
 * Sets when a press becomes a drag. A mouse or pen press on the menu
 * button becomes a drag only after 5px of movement, so a still press
 * opens the menu. Touch starts a drag on long-press. Other presses
 * drag on move or hold.
 */
function activationConstraints(event: PointerEvent, source: Draggable) {
    const {pointerType, target} = event;
    if (pointerType === "touch") {
        return [
            new PointerActivationConstraints.Delay({value: 250, tolerance: 5}),
        ];
    }
    if (target instanceof Element && target.closest("button") != null) {
        return [new PointerActivationConstraints.Distance({value: 5})];
    }
    return [
        new PointerActivationConstraints.Delay({value: 200, tolerance: 10}),
        new PointerActivationConstraints.Distance({value: 5}),
    ];
}

/**
 * Sets which presses can never become a drag. dnd-kit's default blocks
 * every interactive element, but the menu button must be able to start
 * a drag. Other interactive content keeps the guard: tile content is
 * rendered markdown and can hold a link, and a press there must stay
 * a click.
 */
function preventActivation(event: PointerEvent) {
    const {target} = event;
    if (!(target instanceof Element)) {
        return false;
    }
    if (target.closest("button") != null) {
        return false;
    }
    return (
        target.closest("a, input, textarea, select, [contenteditable=true]") !=
        null
    );
}

const SENSORS = [
    PointerSensor.configure({
        activationConstraints,
        preventActivation,
    }),
];

/**
 * Drops the Accessibility plugin from dnd-kit's defaults, which are
 * always bare plugin classes. A dnd-kit upgrade that changes the
 * default plugin roster is caught by the exact-set assertion in
 * perseus-dnd-provider.test.tsx.
 */
function withoutAccessibilityPlugin<T>(defaultPlugins: T[]): T[] {
    return defaultPlugins.filter((plugin: unknown) => plugin !== Accessibility);
}

type Props = {
    children: React.ReactNode;
    /**
     * Called when a drag gesture finishes. Read the dropped tile and its
     * target from `event.operation.source` / `event.operation.target`.
     * Temporary surface: the provider will grow an `onMove`/`onClear`
     * translation layer so widgets never touch raw dnd-kit events.
     */
    onDragEnd?: (event: DragEndEvent) => void;
};

/**
 * PerseusDndProvider is the drag-and-drop context that the Drag-and-Drop
 * widget family renders around its draggables and droppables. Each widget
 * instance mounts its own provider, so drag state never leaks between two
 * widgets on one page.
 *
 * Dragging is a pointer-device interaction (mouse and touch): keyboard and
 * screen-reader users move tiles through each tile's DndActionMenu, which
 * is the single-pointer, non-dragging alternative WCAG 2.5.7 requires.
 * Two dnd-kit defaults are therefore overridden:
 *
 * - Sensors: only the PointerSensor. dnd-kit's KeyboardSensor would add a
 *   second, competing keyboard path.
 * - Plugins: dnd-kit's Accessibility plugin is removed. It would make
 *   every tile a focusable `role="button"` (an invalid nested control
 *   around the menu's real button) and speak keyboard-drag instructions
 *   for a mode that is off. Move announcements are instead the widget's
 *   job, through the Wonder Blocks Announcer, for the drag path and the
 *   menu path alike — one owner per event.
 */
export const PerseusDndProvider = (props: Props) => {
    return (
        <DragDropProvider
            sensors={SENSORS}
            plugins={withoutAccessibilityPlugin}
            onDragEnd={props.onDragEnd}
        >
            {props.children}
        </DragDropProvider>
    );
};
