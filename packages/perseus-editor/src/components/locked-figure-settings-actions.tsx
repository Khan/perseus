/**
 * The part of a locked figure settings panel that contains actions
 * for this panel and its associated locked figure, including
 * the delete button.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    onRemove: () => void;
    figureAriaLabel: string;
};

const LockedFigureSettingsActions = (props: Props) => {
    const {onRemove, figureAriaLabel} = props;
    return (
        <View style={styles.container}>
            <Button
                startIcon={trashIcon}
                aria-label={`Delete ${figureAriaLabel}`}
                onClick={onRemove}
                kind="tertiary"
                style={styles.deleteButton}
            >
                Delete
            </Button>
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
