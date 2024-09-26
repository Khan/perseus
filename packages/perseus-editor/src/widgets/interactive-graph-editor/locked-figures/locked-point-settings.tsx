/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabeledTextField, TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import pencilCircle from "@phosphor-icons/core/regular/pencil-circle.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import LabeledSwitch from "./labeled-switch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import {getDefaultFigureForType} from "./util";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {
    APIOptions,
    LockedLabelType,
    LockedPointType,
} from "@khanacademy/perseus";

export type Props = LockedPointType & {
    /**
     * Optional flags to determine which features are enabled.
     */
    flags?: APIOptions["flags"];
    /**
     * Optional label for the point to display in the header summary.
     * Defaults to "Point".
     */
    headerLabel?: string;
    /**
     * Whether the extra point settings are toggled open.
     */
    showPoint?: boolean;
    /**
     * Optional error message to display.
     */
    error?: string | null;
    /**
     * Called when the extra settings toggle switch is changed.
     */
    onTogglePoint?: (newValue) => void;
    /**
     * Called when the props (coords, color, etc.) are updated.
     */
    onChangeProps: (newProps: Partial<LockedPointType>) => void;

    // Accordion props
    /**
     * Whether this accordion is expanded.
     */
    expanded?: boolean;
    /**
     * Called when the accordion is expanded or collapsed.
     */
    onToggle?: (expanded: boolean) => void;

    // Movement props, used for standalone locked points
    // (not defining locked points within locked lines).
    /**
     * Called when the point is moved.
     */
    onMove?: (movement: LockedFigureSettingsMovementType) => void;
    /**
     * Called when the point is removed.
     */
    onRemove?: () => void;
};

const LockedPointSettings = (props: Props) => {
    const {
        flags,
        headerLabel,
        coord,
        color: pointColor,
        filled = true,
        labels,
        ariaLabel,
        onChangeProps,
        onMove,
        onRemove,
        // defining point props
        showPoint,
        expanded,
        onTogglePoint,
        onToggle,
    } = props;

    const isDefiningPoint = !onMove && !onRemove;
    const hasAriaLabel = ariaLabel || ariaLabel === "";

    function handleColorChange(newValue) {
        const newProps: Partial<LockedPointType> = {
            color: newValue,
        };

        // Update the color of the all labels to match the point
        if (labels) {
            newProps.labels = labels.map((label) => ({
                ...label,
                color: newValue,
            }));
        }

        onChangeProps(newProps);
    }

    function handleCoordChange(newCoord) {
        const xOffset = newCoord[0] - coord[0];
        const yOffset = newCoord[1] - coord[1];

        const newProps: Partial<LockedPointType> = {
            coord: newCoord,
        };

        // Update the coord by the same amount as the point for all labels
        if (labels) {
            newProps.labels = labels.map((label) => ({
                ...label,
                coord: [label.coord[0] + xOffset, label.coord[1] + yOffset],
            }));
        }

        onChangeProps(newProps);
    }

    function handleLabelChange(
        updatedLabel: LockedLabelType,
        labelIndex: number,
    ) {
        if (!labels) {
            return;
        }

        const updatedLabels = [...labels];
        updatedLabels[labelIndex] = {
            ...labels[labelIndex],
            ...updatedLabel,
        };

        onChangeProps({labels: updatedLabels});
    }

    function handleLabelRemove(labelIndex: number) {
        if (!labels) {
            return;
        }

        const updatedLabels = labels.filter((_, index) => index !== labelIndex);

        onChangeProps({labels: updatedLabels});
    }

    /**
     * Get a prepopulated aria label for the point.
     *
     * If the point has no labels, the aria label will just be
     * "Point at (x, y)".
     *
     * If the point has labels, the aria label will be
     * "Point at (x, y) with label1, label2, label3".
     */
    function getPrepopulatedAriaLabel() {
        let str = `Point at (${coord[0]}, ${coord[1]})`;

        if (labels && labels.length > 0) {
            str += " with label";
            // Make it "with labels" instead of "with label" if there are
            // multiple labels.
            if (labels.length > 1) {
                str += "s";
            }

            for (let i = 0; i < labels.length; i++) {
                // Separate additional labels with commas.
                if (i > 0) {
                    str += ",";
                }
                str += ` ${labels[i].text}`;
            }
        }

        return str;
    }

    return (
        <PerseusEditorAccordion
            expanded={expanded}
            onToggle={onToggle}
            containerStyle={
                isDefiningPoint ? styles.definingContainer : undefined
            }
            panelStyle={isDefiningPoint ? styles.definingPanel : undefined}
            header={
                // Summary: Point, coords, color (filled/open)
                <View style={styles.row}>
                    <LabelLarge>{`${headerLabel || "Point"} (${coord[0]}, ${coord[1]})`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <ColorSwatch color={pointColor} filled={filled} />
                </View>
            }
        >
            <CoordinatePairInput
                coord={coord}
                style={styles.spaceUnder}
                onChange={handleCoordChange}
            />

            {/* Toggle switch */}
            {onTogglePoint && (
                <LabeledSwitch
                    label="show point on graph"
                    checked={!!showPoint}
                    style={showPoint && styles.spaceUnder}
                    onChange={onTogglePoint}
                />
            )}

            {/* Toggleable section */}
            {(!isDefiningPoint || showPoint) && (
                <>
                    <ColorSelect
                        selectedValue={pointColor}
                        onChange={handleColorChange}
                        style={styles.spaceUnder}
                    />
                    <LabeledSwitch
                        label="open point"
                        checked={!filled}
                        onChange={(newValue) => {
                            onChangeProps({filled: !newValue});
                        }}
                    />
                </>
            )}

            {!isDefiningPoint && flags?.["mafs"]?.["locked-figures-aria"] && (
                <View>
                    <Strut size={spacing.small_12} />
                    <View style={styles.horizontalRule} />

                    <LabeledTextField
                        label="Aria label"
                        description={`The figure is hidden from screen readers
                            if this field is left blank.`}
                        value={ariaLabel ?? ""}
                        onChange={(newValue) => {
                            onChangeProps({
                                // Save as undefined if the field is empty.
                                ariaLabel: newValue || undefined,
                            });
                        }}
                        placeholder="Ex. Point at (x, y)"
                        style={styles.ariaLabelTextField}
                    />

                    <Button
                        kind="tertiary"
                        startIcon={pencilCircle}
                        style={styles.addButton}
                        onClick={() => {
                            onChangeProps({
                                ariaLabel: getPrepopulatedAriaLabel(),
                            });
                        }}
                    >
                        Auto-generate
                    </Button>
                </View>
            )}

            {((!isDefiningPoint && flags?.["mafs"]?.["locked-point-labels"]) ||
                (isDefiningPoint &&
                    flags?.["mafs"]?.["locked-line-labels"])) && (
                <>
                    <Strut size={spacing.xxxSmall_4} />
                    <View style={styles.horizontalRule} />
                    <Strut size={spacing.small_12} />

                    <LabelMedium>Visible labels</LabelMedium>

                    {labels?.map((label, labelIndex) => (
                        <LockedLabelSettings
                            {...label}
                            containerStyle={
                                !isDefiningPoint &&
                                styles.lockedPointLabelContainer
                            }
                            expanded={true}
                            onChangeProps={(newLabel: LockedLabelType) => {
                                handleLabelChange(newLabel, labelIndex);
                            }}
                            onRemove={() => {
                                handleLabelRemove(labelIndex);
                            }}
                        />
                    ))}
                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        onClick={() => {
                            const newLabel = {
                                ...getDefaultFigureForType("label"),
                                // Place the label at the same position
                                // as the point. Add a small offset to
                                // avoid crowding.
                                coord: [
                                    coord[0] + 0.5,
                                    // Additional offset for each label so
                                    // they don't overlap.
                                    coord[1] - 1 * (labels?.length ?? 0),
                                ],
                                // Default to the same color as the point
                                color: pointColor,
                            } satisfies LockedLabelType;

                            onChangeProps({
                                labels: [...(labels ?? []), newLabel],
                            });
                        }}
                        style={styles.addButton}
                    >
                        Add visible label
                    </Button>
                </>
            )}

            {onRemove && (
                <LockedFigureSettingsActions
                    figureType={props.type}
                    onMove={onMove}
                    onRemove={onRemove}
                />
            )}
        </PerseusEditorAccordion>
    );
};

const styles = StyleSheet.create({
    definingContainer: {
        marginTop: spacing.xSmall_8,
        marginBottom: 0,
        marginLeft: -spacing.xxxSmall_4,
        marginRight: -spacing.xxxSmall_4,
        backgroundColor: wbColor.white,
    },
    definingPanel: {
        // Need more space since we don't have the actions' margins.
        paddingBottom: spacing.xxSmall_6,
    },
    // A regular point (NOT a defining point) has label
    // accordions with white backgrounds.
    lockedPointLabelContainer: {
        backgroundColor: wbColor.white,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    addButton: {
        alignSelf: "start",
    },
    horizontalRule: {
        height: 1,
        backgroundColor: wbColor.offBlack16,
    },
    ariaLabelTextField: {
        marginTop: spacing.xSmall_8,
    },
});

export default LockedPointSettings;
