import {useDragOperation, useDroppable} from "@dnd-kit/react";
import classNames from "classnames";
import * as React from "react";

import styles from "./blank-component.module.css";

export interface BlankComponentProps {
    /**
     * Unique identifier of this blank. It doubles as the dnd-kit droppable
     * id and as the target id the widget receives when a tile moves here,
     * so it must be unique within the surrounding PerseusDndProvider.
     * The blank widget passes its renderer-assigned `widgetId`; widgets
     * that use this component directly supply their own ids.
     */
    blankId: string;
    /** Rendering variant: full size, or smaller for exponents/indices. */
    displayType: "normal" | "superscript" | "subscript";
    /** The placed answer tile, when one sits in this blank. */
    children?: React.ReactNode;
    /**
     * The tileId of the placed tile, when one sits in this blank. The
     * blank uses it to notice that its own tile is mid-drag and show the
     * empty slot underneath, so the slot looks like it was there all
     * along. Pass it whenever children are passed.
     */
    placedTileId?: string;
    /**
     * Minimum width of the empty slot. The FITB spec sizes an empty blank
     * to the widest answer tile so the slot's size does not reveal the
     * answer; the widget computes that width and passes it here. Defaults
     * to the design's 65px minimum. A placed tile still grows the blank
     * beyond this.
     */
    minWidth?: React.CSSProperties["minWidth"];
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
    const {blankId, displayType, children, placedTileId, minWidth, testId} =
        props;

    const {ref, isDropTarget} = useDroppable({id: blankId});
    const {source} = useDragOperation();

    // A filled blank disappears visually: the design shows only the placed
    // tile (the Answer Blank has no filled variant in Figma). The element
    // stays in the DOM as the drop target so a swap can still land here.
    const isFilled = React.Children.toArray(children).length > 0;

    // While this blank's own tile is mid-drag it still occupies layout
    // space (dnd-kit moves it with a transform), so showing the empty
    // chrome again puts the dashed slot underneath the departing tile.
    const isTileDraggingOut =
        placedTileId != null && source?.id === placedTileId;

    return (
        <div
            ref={ref}
            className={classNames(
                styles.container,
                displayType !== "normal" && styles["super-sub"],
                isFilled && !isTileDraggingOut && styles.filled,
                isDropTarget && styles["drop-target"],
            )}
            style={!isFilled && minWidth != null ? {minWidth} : undefined}
            data-testid={testId}
        >
            {children}
        </div>
    );
}
