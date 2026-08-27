import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import arrowDown from "@phosphor-icons/core/regular/arrow-down.svg";
import arrowUp from "@phosphor-icons/core/regular/arrow-up.svg";
import trash from "@phosphor-icons/core/regular/trash.svg";
import * as React from "react";

import styles from "./card-editor.module.css";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Passed to TextField's `style` prop, which is typed as Wonder Blocks
// `StyleType` and does not accept a CSS-module className.
const cardInputStyle: StyleType = {flexGrow: 1};

type Props = {
    index: number;
    value: string;
    isFirst: boolean;
    isLast: boolean;
    onChange: (value: string) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onDelete: () => void;
};

/**
 * An editor for a single sorter card
 *
 * Renders as a list item, so it belongs inside the sorter editor's list of
 * cards.
 */
function CardEditor({
    index,
    value,
    isFirst,
    isLast,
    onChange,
    onMoveUp,
    onMoveDown,
    onDelete,
}: Props) {
    const cardNumber = index + 1;

    return (
        <View tag="li" className={styles.card}>
            <TextField
                aria-label={`Card ${cardNumber}`}
                value={value}
                onChange={onChange}
                style={cardInputStyle}
            />
            <IconButton
                aria-label={`Move card ${cardNumber} up`}
                icon={arrowUp}
                kind="tertiary"
                actionType="neutral"
                size="small"
                disabled={isFirst}
                onClick={onMoveUp}
            />
            <IconButton
                aria-label={`Move card ${cardNumber} down`}
                icon={arrowDown}
                kind="tertiary"
                actionType="neutral"
                size="small"
                disabled={isLast}
                onClick={onMoveDown}
            />
            <IconButton
                aria-label={`Delete card ${cardNumber}`}
                icon={trash}
                kind="tertiary"
                actionType="destructive"
                size="small"
                onClick={onDelete}
            />
        </View>
    );
}

export default CardEditor;
