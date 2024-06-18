/**
 * The part of a locked figure settings panel that contains actions
 * for this panel and its associated locked figure, including
 * the delete button.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import caretDoubleDownIcon from "@phosphor-icons/core/bold/caret-double-down-bold.svg";
import caretDoubleUpIcon from "@phosphor-icons/core/bold/caret-double-up-bold.svg";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import caretUpIcon from "@phosphor-icons/core/bold/caret-up-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {LockedFigureType} from "@khanacademy/perseus";

export type LockedFigureSettingsMovementType = "top" | "up" | "down" | "bottom";

type Props = {
    figureType: LockedFigureType;
    onMove: (movement: LockedFigureSettingsMovementType) => void;
    onRemove: () => void;
};

const LockedFigureSettingsActions = (props: Props) => {
    const {figureType, onMove, onRemove} = props;

    return (
        <View style={styles.container}>
            <Button
                startIcon={trashIcon}
                aria-label={`Delete locked ${figureType}`}
                onClick={onRemove}
                kind="tertiary"
                style={styles.deleteButton}
            >
                Delete
            </Button>

            <Spring />

            <IconButton
                icon={caretDoubleUpIcon}
                size="small"
                aria-label={`Move locked ${figureType} to the top`}
                onClick={() => onMove("top")}
                style={styles.iconButton}
            />
            <IconButton
                icon={caretUpIcon}
                size="small"
                aria-label={`Move locked ${figureType} up`}
                onClick={() => onMove("up")}
                style={styles.iconButton}
            />
            <IconButton
                icon={caretDownIcon}
                size="small"
                aria-label={`Move locked ${figureType} down`}
                onClick={() => onMove("down")}
                style={styles.iconButton}
            />
            <IconButton
                icon={caretDoubleDownIcon}
                size="small"
                aria-label={`Move locked ${figureType} to the bottom`}
                onClick={() => onMove("bottom")}
                style={styles.iconButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.xxxSmall_4,
    },
    deleteButton: {
        // Line up the delete icon with the rest of the content.
        marginInlineStart: -spacing.xxxSmall_4,
    },
    iconButton: {
        // Reset the margin because the icon buttons
        // overlap each other otherwise.
        margin: 0,
    },
});

export default LockedFigureSettingsActions;
