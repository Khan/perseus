/**
 * LockedLabelSettings is a component that allows the user to edit the
 * settings of specifically a locked label on the graph within the
 * Interactive Graph widget.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {components} from "@khanacademy/perseus";
import {
    lockedFigureColors,
    type LockedLabelType,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {InfoTip} = components;

export type Props = LockedLabelType & {
    /**
     * Called when the props (coord, color, etc.) are updated.
     */
    onChangeProps: (newProps: Partial<LockedLabelType>) => void;

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
                                    backgroundColor:
                                        semanticColor.core.background.base
                                            .default,
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
            <View style={styles.row}>
                <LabelMedium
                    tag="label"
                    style={[styles.row, styles.spaceUnder, {flexGrow: 1}]}
                >
                    text
                    <Strut size={spacing.xSmall_8} />
                    <TextField
                        value={text}
                        placeholder="ex. $x^2$ or $\frac{1}{2}$"
                        onChange={(newValue) =>
                            onChangeProps({
                                text: newValue,
                            })
                        }
                    />
                </LabelMedium>
                <InfoTip>
                    Surround your text with $ for TeX.
                    <br />
                    Example: {`This circle has radius $\\frac{1}{2}$ units.`}
                    <br />
                    <br />
                    It is important to use TeX when appropriate for
                    accessibility. The above example would be read as &quot;This
                    circle has radius one-half units&quot; by screen readers.
                </InfoTip>
            </View>

            <View style={styles.row}>
                <ColorSelect
                    selectedValue={color}
                    onChange={(newColor) => {
                        onChangeProps({color: newColor});
                    }}
                    style={styles.spaceUnder}
                />
                <Strut size={spacing.medium_16} />

                {/* Size settings */}
                <LabelMedium tag="label" style={styles.row}>
                    size
                    <Strut size={spacing.xSmall_8} />
                    <SingleSelect
                        selectedValue={size}
                        // TODO(LEMS-2656): remove TS suppression
                        onChange={
                            ((newValue: "small" | "medium" | "large") =>
                                onChangeProps({
                                    size: newValue,
                                })) as any
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
