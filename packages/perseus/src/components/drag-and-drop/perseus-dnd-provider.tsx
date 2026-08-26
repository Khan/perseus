import {DragDropProvider, PointerSensor} from "@dnd-kit/react";
import * as React from "react";

import type {DragEndEvent} from "@dnd-kit/react";

/**
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
const SENSORS = [PointerSensor];

/**
 * Drops the Accessibility plugin from dnd-kit's defaults, which are
 * always bare plugin classes. The class is matched by name because only
 * `@dnd-kit/react` is a declared dependency, and it does not re-export
 * the plugin classes from `@dnd-kit/dom`. A dnd-kit upgrade that changes
 * the default plugin roster (including renaming this class) is caught by
 * the exact-set assertion in perseus-dnd-provider.test.tsx.
 */
function withoutAccessibilityPlugin<T>(defaultPlugins: T[]): T[] {
    return defaultPlugins.filter(
        (plugin) =>
            !(typeof plugin === "function" && plugin.name === "Accessibility"),
    );
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
