/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import LabeledSwitch from "../../../components/labeled-switch";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import {
    generateSpokenMathDetails,
    generateLockedFigureAppearanceDescription,
    getDefaultFigureForType,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsMovementType} from "./locked-figure-settings-actions";
import type {LockedLabelType, LockedPointType} from "@khanacademy/perseus-core";

export type Props = LockedPointType & {
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
        error,
        expanded,
        onTogglePoint,
        onToggle,
    } = props;

    const isDefiningPoint = !onMove && !onRemove;

    /**
     * Get a prepopulated aria label for the point, with the math
     * details converted into spoken words.
     *
     * If the point has no labels, the aria label will just be
     * "Point at (x, y)".
     *
     * If the point has labels, the aria label will be
     * "Point label1, label2, label3 at (x, y)".
     */
    async function getPrepopulatedAriaLabel() {
        const visiblelabel = await joinLabelsAsSpokenMath(labels);
        // Ensure negative values are read correctly within aria labels.
        const spokenX = await generateSpokenMathDetails(`$${coord[0]}$`);
        const spokenY = await generateSpokenMathDetails(`$${coord[1]}$`);

        let str = `Point${visiblelabel} at ${spokenX} comma ${spokenY}`;

        const pointAppearance = generateLockedFigureAppearanceDescription(
            pointColor,
            "solid",
            filled ? undefined : "none",
        );
        str += pointAppearance;

        return str;
    }

    function handleColorChange(newValue) {
        const newProps: Partial<LockedPointType> = {
            color: newValue,
        };

        // Update the color of the all labels to match the point
        newProps.labels = labels.map((label) => ({
            ...label,
            color: newValue,
        }));

        onChangeProps(newProps);
    }

    function handleCoordChange(newCoord) {
        const xOffset = newCoord[0] - coord[0];
        const yOffset = newCoord[1] - coord[1];

        const newProps: Partial<LockedPointType> = {
            coord: newCoord,
        };

        // Update the coord by the same amount as the point for all labels
        newProps.labels = labels.map((label) => ({
            ...label,
            coord: [label.coord[0] + xOffset, label.coord[1] + yOffset],
        }));

        onChangeProps(newProps);
    }

    function handleLabelChange(
        updatedLabel: Partial<LockedLabelType>,
        labelIndex: number,
    ) {
        const updatedLabels = [...labels];
        updatedLabels[labelIndex] = {
            ...labels[labelIndex],
            ...updatedLabel,
        };

        onChangeProps({labels: updatedLabels});
    }

    function handleLabelRemove(labelIndex: number) {
        const updatedLabels = labels.filter((_, index) => index !== labelIndex);

        onChangeProps({labels: updatedLabels});
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
                error={!!error}
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

            {!isDefiningPoint && (
                <>
                    <Strut size={spacing.small_12} />
                    <View style={styles.horizontalRule} />

                    <LockedFigureAria
                        ariaLabel={ariaLabel}
                        getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                        onChangeProps={(newProps) => {
                            onChangeProps(newProps);
                        }}
                    />
                </>
            )}

            {/* Visible labels */}
            <Strut size={spacing.xxxSmall_4} />
            <View style={styles.horizontalRule} />
            <Strut size={spacing.small_12} />
            <LabelMedium>Visible labels</LabelMedium>
            {labels.map((label, labelIndex) => (
                <LockedLabelSettings
                    {...label}
                    key={labelIndex}
                    containerStyle={
                        !isDefiningPoint && styles.lockedPointLabelContainer
                    }
                    expanded={true}
                    onChangeProps={(newLabel) => {
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
                            coord[1] - labels.length,
                        ],
                        // Default to the same color as the point
                        color: pointColor,
                    } satisfies LockedLabelType;

                    onChangeProps({
                        labels: [...labels, newLabel],
                    });
                }}
                style={styles.addButton}
            >
                Add visible label
            </Button>

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
});

export default LockedPointSettings;
