import * as React from "react";
import {useId} from "react";

import styles from "./choice-bank.module.css";

interface ChoiceBankProps {
    /**
     * The answer tiles to lay out. Each renders as its own `<li>`.
     *
     * TODO(LEMS-4363): The real `AnswerTile` component is built separately.
     */
    children: React.ReactNode;
    /** Visible label; also names the tile list for assistive tech. */
    label?: string;
}

/**
 * ChoiceBank is a reflow-aware card holding the draggable answer tiles: a
 * "Choices" label on top, with tiles wrapping onto new rows below.
 *
 * Tiles render as a labelled `<ul>` so screen readers announce a list of tiles.
 */
export function ChoiceBank({
    children,
    label = "Choices",
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
