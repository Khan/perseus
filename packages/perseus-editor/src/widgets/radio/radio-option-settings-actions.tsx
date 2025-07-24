import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import caretDoubleDownIcon from "@phosphor-icons/core/bold/caret-double-down-bold.svg";
import caretDoubleUpIcon from "@phosphor-icons/core/bold/caret-double-up-bold.svg";
import caretDownIcon from "@phosphor-icons/core/bold/caret-down-bold.svg";
import caretUpIcon from "@phosphor-icons/core/bold/caret-up-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import styles from "./radio-editor.module.css";

export type ChoiceMovementType = "up" | "down" | "top" | "bottom";

interface RadioOptionSettingsActionsProps {
    content: string;
    showDelete: boolean;
    showMove: boolean;
    onDelete: () => void;
    onMove: (movement: ChoiceMovementType) => void;
}

export function RadioOptionSettingsActions({
    content,
    showDelete,
    showMove,
    onDelete,
    onMove,
}: RadioOptionSettingsActionsProps) {
    return (
        <div className={styles.radioOptionActionsContainer}>
            {showDelete && (
                <Button
                    size="small"
                    kind="tertiary"
                    startIcon={trashIcon}
                    onClick={() => {
                        if (
                            // eslint-disable-next-line no-alert
                            window.confirm(
                                `Are you sure you want to remove this choice? \n\n${content}`,
                            )
                        ) {
                            onDelete();
                        }
                    }}
                >
                    Remove
                </Button>
            )}

            {showMove && (
                <>
                    <Spring />

                    <IconButton
                        icon={caretDoubleUpIcon}
                        kind="tertiary"
                        size="xsmall"
                        aria-label="Move choice to the top"
                        onClick={() => onMove("top")}
                    />
                    <IconButton
                        icon={caretUpIcon}
                        kind="tertiary"
                        size="xsmall"
                        aria-label="Move choice up"
                        onClick={() => onMove("up")}
                    />
                    <IconButton
                        icon={caretDownIcon}
                        kind="tertiary"
                        size="xsmall"
                        aria-label="Move choice down"
                        onClick={() => onMove("down")}
                    />
                    <IconButton
                        icon={caretDoubleDownIcon}
                        kind="tertiary"
                        size="xsmall"
                        aria-label="Move choice to the bottom"
                        onClick={() => onMove("bottom")}
                    />
                </>
            )}
        </div>
    );
}
