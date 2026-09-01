import {useDroppable} from "@dnd-kit/react";
import * as React from "react";
import {useId} from "react";

import styles from "./choice-bank.module.css";

/**
 * The bank's droppable id: a tile dropped here returns to the bank.
 * Every widget mounts its own PerseusDndProvider, which scopes drag ids,
 * so one shared value stays unique for two widgets on one page.
 */
export const CHOICE_BANK_DROP_ID = "choice-bank";

interface ChoiceBankProps {
    /**
     * The answer tiles to lay out. Each child renders as its own `<li>`,
     * so pass the tiles as siblings and not inside a fragment. Pass
     * nothing for an empty bank (e.g. once every tile has been placed).
     */
    children?: React.ReactNode;
    /** Visible label; also names the tile list for assistive tech. */
    label: string;
}

/**
 * ChoiceBank is a reflow-aware card holding the draggable answer tiles: a
 * label on top, with tiles wrapping onto new rows below.
 */
export function ChoiceBank({
    children,
    label,
}: ChoiceBankProps): React.ReactElement {
    const labelId = useId();
    const {ref} = useDroppable({id: CHOICE_BANK_DROP_ID});

    // The whole card is the drop target, so a tile can land anywhere in
    // the dashed area — the list alone has no height once the bank is
    // empty. Dropped tiles still render as list items; the ref only
    // sets where a drop counts.
    return (
        <div ref={ref} className={styles.choiceBank}>
            <span id={labelId} className={styles.label}>
                {label}
            </span>
            <ul className={styles.list} aria-labelledby={labelId}>
                {React.Children.map(children, (tile) => (
                    <li className={styles.item}>{tile}</li>
                ))}
            </ul>
        </div>
    );
}
