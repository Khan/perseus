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
    answerTiles: ReadonlyArray<AnswerTileProps>;
    /** Visible label; also names the tile list for assistive tech. */
    label: string;
    /**
     * Identifies the bank's drop target in drag events: a tile dropped
     * here returns to the bank. Pass a stable id when the widget needs to
     * recognize the bank in its drag-end handling; defaults to a generated
     * unique id.
     */
    bankId?: string;
}

/**
 * ChoiceBank is a reflow-aware card holding the draggable answer tiles: a
 * label on top, with tiles wrapping onto new rows below.
 */
export function ChoiceBank({
    answerTiles,
    label,
    bankId,
}: ChoiceBankProps): React.ReactElement {
    const labelId = useId();
    const generatedBankId = useId();
    const {ref} = useDroppable({id: bankId ?? generatedBankId});

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
                {answerTiles.map((answerTile) => (
                    <li key={answerTile.tileId} className={styles.item}>
                        <AnswerTile {...answerTile} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
