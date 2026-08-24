import {useDroppable} from "@dnd-kit/react";
import * as React from "react";
import {useId} from "react";

import {AnswerTile, type AnswerTileProps} from "./answer-tile";
import styles from "./choice-bank.module.css";

interface ChoiceBankProps {
    /**
     * The answer tiles to lay out. Each renders as its own `<li>`. Pass an
     * empty array for an empty bank (e.g. once every tile has been placed).
     */
    answerTiles: AnswerTileProps[];
    /** Visible label; also names the tile list for assistive tech. */
    label: string;
}

/**
 * ChoiceBank is a reflow-aware card holding the draggable answer tiles: a
 * label on top, with tiles wrapping onto new rows below.
 */
export function ChoiceBank({
    answerTiles,
    label,
}: ChoiceBankProps): React.ReactElement {
    const labelId = useId();
    const id = "droppable" + answerTiles[0].label;
    console.log("bank id: " + id);
    const {ref} = useDroppable({id});

    return (
        <div className={styles.choiceBank}>
            <span id={labelId} className={styles.label}>
                {label}
            </span>
            <ul ref={ref} className={styles.list} aria-labelledby={labelId}>
                {answerTiles.map((answerTile) => (
                    <AnswerTile key={answerTile.tileId} {...answerTile} />
                ))}
            </ul>
        </div>
    );
}
