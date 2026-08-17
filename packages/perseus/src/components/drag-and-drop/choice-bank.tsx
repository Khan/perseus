import * as React from "react";
import {useId} from "react";

import styles from "./choice-bank.module.css";

interface ChoiceBankProps {
    /**
     * The answer tiles to lay out. Each renders as its own `<li>`. Pass an
     * empty array for an empty bank (e.g. once every tile has been placed).
     */
    children: React.ReactNode;
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

    return (
        <div className={styles.choiceBank}>
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
