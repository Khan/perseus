import {useDroppable} from "@dnd-kit/react";
import classNames from "classnames";
import * as React from "react";

import styles from "./blank.module.css";

export interface BlankProps {
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
export function Blank(props: BlankProps): React.ReactElement {
    const {blankId, displayType, children, testId} = props;

    const {ref, isDropTarget} = useDroppable({id: blankId});

    return (
        <div
            ref={ref}
            className={classNames(
                styles.container,
                displayType !== "normal" && styles["super-sub"],
                isDropTarget && styles["drop-target"],
            )}
            data-testid={testId}
        >
            {children}
        </div>
    );
}
