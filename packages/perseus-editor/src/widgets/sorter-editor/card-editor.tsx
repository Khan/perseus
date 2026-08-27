import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import arrowDown from "@phosphor-icons/core/regular/arrow-down.svg";
import arrowUp from "@phosphor-icons/core/regular/arrow-up.svg";
import trash from "@phosphor-icons/core/regular/trash.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    // Zero-based, but the cards are numbered from one in their labels so the
    // numbering matches what the author sees.
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
 * An editor for a single sorter card: its text, plus the controls that move it
 * within the answer or remove it.
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
        <View tag="li" style={styles.card}>
            {/*
             * The cards have no visible label, but screen reader users still
             * need each input to have a distinguishable name, hence the
             * aria-label. The card's controls are named the same way so it's
             * clear which card each one acts on.
             */}
            <TextField
                aria-label={`Card ${cardNumber}`}
                value={value}
                onChange={onChange}
                style={styles.cardInput}
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

const styles = StyleSheet.create({
    // A card's text sits on one line with the controls that reorder and remove
    // it, so the controls stay next to the card they act on.
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_040,
    },
    // Let the text take the space the controls don't need.
    cardInput: {
        flexGrow: 1,
    },
});

export default CardEditor;
