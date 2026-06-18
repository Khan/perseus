/**
 * The part of a locked figure settings panel that contains actions
 * for this panel and its associated locked figure, including
 * the delete button.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import caretDoubleDownIcon from "@phosphor-icons/core/bold/caret-double-down-bold.svg";
import caretDoubleUpIcon from "@phosphor-icons/core/bold/caret-double-up-bold.svg";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import caretUpIcon from "@phosphor-icons/core/bold/caret-up-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import styles from "./locked-figure-settings-actions.module.css";

import type {LockedFigureType} from "@khanacademy/perseus-core";

export type LockedFigureSettingsMovementType =
    | "back"
    | "backward"
    | "forward"
    | "front";

interface Props {
    figureType: LockedFigureType;
    editingDisabled?: boolean;
    onMove?: (movement: LockedFigureSettingsMovementType) => void;
    onRemove: () => void;
}

const LockedFigureSettingsActions = (props: Props) => {
    const {figureType, editingDisabled = false, onMove, onRemove} = props;

    return (
        <View className={styles.container}>
            <Button
                startIcon={trashIcon}
                aria-label={`Delete locked ${figureType}`}
                onClick={onRemove}
                kind="tertiary"
                disabled={editingDisabled}
                className={styles.deleteButton}
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
                        disabled={editingDisabled}
                        onClick={() => onMove("back")}
                    />
                    <IconButton
                        icon={caretUpIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} backward`}
                        disabled={editingDisabled}
                        onClick={() => onMove("backward")}
                    />
                    <IconButton
                        icon={caretDownIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} forward`}
                        disabled={editingDisabled}
                        onClick={() => onMove("forward")}
                    />
                    <IconButton
                        icon={caretDoubleDownIcon}
                        kind="tertiary"
                        size="small"
                        aria-label={`Move locked ${figureType} to the front`}
                        disabled={editingDisabled}
                        onClick={() => onMove("front")}
                    />
                </>
            )}
        </View>
    );
};

export default LockedFigureSettingsActions;
