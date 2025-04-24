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

import type {LockedFigureType} from "@khanacademy/perseus-core";

export type LockedFigureSettingsMovementType =
    | "back"
    | "backward"
    | "forward"
    | "front";

type Props = {
    figureType: LockedFigureType;
    onMove?: (movement: LockedFigureSettingsMovementType) => void;
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

            {onMove && (
                <>
                    <Spring />

                    <IconButton
                        icon={caretDoubleUpIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} to the back`}
                        onClick={() => onMove("back")}
                    />
                    <IconButton
                        icon={caretUpIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} backward`}
                        onClick={() => onMove("backward")}
                    />
                    <IconButton
                        icon={caretDownIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} forward`}
                        onClick={() => onMove("forward")}
                    />
                    <IconButton
                        icon={caretDoubleDownIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} to the front`}
                        onClick={() => onMove("front")}
                    />
                </>
            )}
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
});

export default LockedFigureSettingsActions;
