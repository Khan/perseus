/**
 * LockedLabelSettings is a component that allows the user to edit the
 * settings of specifically a locked label on the graph within the
 * Interactive Graph widget.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {
    lockedFigureColors,
    type LockedFigure,
    type LockedFigureColor,
    type LockedLabelType,
} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

export type Props = LockedLabelType & {
    /**
     * Called when the props (coord, color, etc.) are updated.
     */
    onChangeProps: (newProps: Partial<LockedFigure>) => void;

    // Movement props. Used for standalone label actions.
    // Not used within other locked figure settings.
    /**
     * Called when a movement button (top, up, down, bottom) is pressed.
     * This is also used to indicate that this LockedLabelSettings component
     * is for a standalone label, not part of a larger locked figure.
     */
    onMove?: (movement: LockedFigureSettingsMovementType) => void;
    /**
     * Called when the delete button is pressed.
     */
    onRemove: () => void;

    // Accordion props. Used for standalone labels for the expand/collapse
    // button functionality. Not used within other locked figure settings.
    /**
     * Whether this accordion is expanded.
     */
    expanded?: boolean;
    /**
     * Called when the accordion is expanded or collapsed.
     */
    onToggle?: (expanded: boolean) => void;

    // Container style for the accordion.
    containerStyle?: StyleType;
};

export default function LockedLabelSettings(props: Props) {
    const {
        type,
        coord,
        color,
        size,
        text,
        expanded,
        onChangeProps,
        onMove,
        onRemove,
        onToggle,
        containerStyle,
    } = props;

    return (
        <PerseusEditorAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                <View style={[styles.row, styles.accordionHeaderContainer]}>
                    <LabelLarge>
                        Label ({coord[0]}, {coord[1]})
                    </LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    {text !== "" && (
                        <LabelLarge
                            style={[
                                {
                                    backgroundColor: wbColor.white,
                                    color: lockedFigureColors[color],
                                },
                                styles.accordionHeader,
                            ]}
                        >
                            {text}
                        </LabelLarge>
                    )}
                </View>
            }
            containerStyle={containerStyle}
        >
            {/* Coord settings */}
            <CoordinatePairInput
                coord={coord}
                onChange={(newCoords) => {
                    onChangeProps({coord: newCoords});
                }}
                style={styles.spaceUnder}
            />

            {/* Text settings */}
            <LabelMedium tag="label" style={[styles.row, styles.spaceUnder]}>
                TeX
                <Strut size={spacing.xSmall_8} />
                <TextField
                    value={text}
                    placeholder="ex. x^2 or \frac{1}{2}"
                    onChange={(newValue) =>
                        onChangeProps({
                            text: newValue,
                        })
                    }
                />
            </LabelMedium>

            <View style={styles.row}>
                {/* Color settings */}
                {onMove && (
                    <>
                        <ColorSelect
                            selectedValue={color}
                            onChange={(newColor: LockedFigureColor) => {
                                onChangeProps({color: newColor});
                            }}
                            style={styles.spaceUnder}
                        />
                        <Strut size={spacing.medium_16} />
                    </>
                )}

                {/* Size settings */}
                <LabelMedium tag="label" style={styles.row}>
                    size
                    <Strut size={spacing.xSmall_8} />
                    <SingleSelect
                        selectedValue={size}
                        onChange={(newValue: "small" | "medium" | "large") =>
                            onChangeProps({
                                size: newValue,
                            })
                        }
                        // Placeholder is required, but never gets used since
                        // we have a label for the select.
                        placeholder=""
                    >
                        <OptionItem value="small" label="small" />
                        <OptionItem value="medium" label="medium" />
                        <OptionItem value="large" label="large" />
                    </SingleSelect>
                </LabelMedium>
            </View>

            {/* Actions */}
            <LockedFigureSettingsActions
                figureType={type}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
}
const styles = StyleSheet.create({
    accordionHeaderContainer: {
        // Stop the label summary from wrapping.
        whiteSpace: "nowrap",
    },
    accordionHeader: {
        padding: spacing.xxxSmall_4,
        marginInlineEnd: spacing.xSmall_8,
        borderRadius: spacing.xxxSmall_4,
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
});
