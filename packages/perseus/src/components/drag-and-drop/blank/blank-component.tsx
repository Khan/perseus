import {useDragOperation, useDroppable} from "@dnd-kit/react";
import classNames from "classnames";
import * as React from "react";

import {cssVariable} from "../css-variable";
import {readTileDragData} from "../drag-ids";

import styles from "./blank-component.module.css";

/** How a blank renders: full size, or smaller for exponents/indices. */
export type BlankDisplayType = "normal" | "superscript" | "subscript";

export interface BlankComponentProps {
    /**
     * Unique identifier of this blank. It doubles as the dnd-kit droppable
     * id and as the target id the widget receives when a tile moves here,
     * so it must be unique within the surrounding PerseusDndProvider.
     * The blank widget passes its renderer-assigned `widgetId`; widgets
     * that use this component directly supply their own ids.
     */
    blankId: string;
    displayType: BlankDisplayType;
    /** The placed answer tile, when one sits in this blank. */
    children?: React.ReactNode;
    /**
     * The tile that sits in this blank. The blank uses it to notice
     * that its own tile is mid-drag and show the empty slot underneath,
     * so the slot looks like it was there all along. Pass it whenever
     * children are passed.
     */
    placedTileId?: string;
    /**
     * Minimum width of the empty slot. The FITB spec sizes an empty blank
     * to the widest answer tile so the slot's size does not reveal the
     * answer; the widget computes that width and passes it here. Defaults
     * to the design's 65px minimum. A placed tile still grows the blank
     * beyond this.
     */
    minWidth?: number;
    /**
     * Keeps the empty-slot width when a tile is placed, so the line
     * does not reflow. Without it a filled blank hugs its tile.
     */
    keepsWidthWhenFilled?: boolean;
    /** Extra class for the slot element, for widget-level layout. */
    className?: string;
    // TODO(LEMS-4448): Remove once there is a better way to identify a blank.
    testId?: string;
}

/**
 * Blank is the drop slot an answer tile can be placed into. It is part of
 * the Drag-and-Drop widget family. It renders the slot's chrome (dashed
 * border while empty) and registers itself as a dnd-kit drop target.
 *
 * Fill in the Blank reaches it through the `blank` widget, which owns the
 * Perseus widget plumbing; other widgets can render it directly.
 */
export function BlankComponent(props: BlankComponentProps): React.ReactElement {
    const {
        blankId,
        displayType,
        children,
        placedTileId,
        minWidth,
        keepsWidthWhenFilled,
        className,
        testId,
    } = props;

    const {ref, isDropTarget} = useDroppable({id: blankId});
    const {source} = useDragOperation();

    // A filled blank disappears visually: the design shows only the placed
    // tile (the Answer Blank has no filled variant in Figma). The element
    // stays in the DOM as the drop target so a swap can still land here.
    const isFilled = React.Children.toArray(children).length > 0;

    // While this blank's own tile is mid-drag it still occupies layout
    // space (dnd-kit moves it with a transform), so showing the empty
    // chrome again puts the dashed slot underneath the departing tile.
    const dragged = readTileDragData(source?.data);
    const isTileDraggingOut =
        placedTileId != null &&
        dragged?.tileId === placedTileId &&
        dragged?.fromBlankId === blankId;

    // The slot chrome hides behind a placed tile, but comes back while
    // that tile drags away.
    const showsPlacedTile = isFilled && !isTileDraggingOut;

    // The width is a CSS variable, set filled or not: the rules choose
    // when to consume it. A filled blank in "hug" mode does not, and
    // narrow-mode rules override it.
    const minWidthStyle =
        minWidth != null
            ? cssVariable("--blank-min-inline-size", `${minWidth}px`)
            : undefined;

    const slotClasses = classNames(
        styles.container,
        DISPLAY_TYPE_CLASSES[displayType],
        showsPlacedTile && styles.filled,
        keepsWidthWhenFilled && styles.keepsWidth,
        isDropTarget && styles.dropTarget,
        className,
    );

    return (
        <div
            ref={ref}
            className={slotClasses}
            style={minWidthStyle}
            // A styling hook for the surrounding layout. A widget that
            // holds blanks cannot select them by class: CSS Modules
            // compile class names to hashes, and the markup between the
            // widget and the blank belongs to the renderer.
            data-blank="true"
            data-testid={testId}
        >
            {children}
        </div>
    );
}

const DISPLAY_TYPE_CLASSES: Record<BlankDisplayType, string | undefined> = {
    normal: undefined,
    superscript: classNames(styles.superSub, styles.superscript),
    subscript: classNames(styles.superSub, styles.subscript),
};
