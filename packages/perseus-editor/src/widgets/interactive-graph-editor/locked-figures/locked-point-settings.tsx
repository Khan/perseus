/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
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

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {LockedLabelType, LockedPointType} from "@khanacademy/perseus";

export type Props = LockedFigureSettingsCommonProps &
    LockedPointType & {
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedPointType>) => void;
    };

const LockedPointSettings = (props: Props) => {
    const {
        flags,
        coord,
        color: pointColor,
        filled = true,
        labels,
        onChangeProps,
        onMove,
        onRemove,
    } = props;

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
        updatedLabel: LockedLabelType,
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
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                // Summary: Point, coords, color (filled/open)
                <View style={styles.row}>
                    <LabelLarge>{`Point (${coord[0]}, ${coord[1]})`}</LabelLarge>
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
                style={styles.spaceUnder}
            />

            {flags?.["mafs"]?.["locked-point-labels"] && (
                <>
                    {labels.map((label, labelIndex) => (
                        <LockedLabelSettings
                            {...label}
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
                                    coord[1] - 1 * labels?.length,
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
                </>
            )}

            <LockedFigureSettingsActions
                figureType={props.type}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
};

const styles = StyleSheet.create({
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
});

export default LockedPointSettings;
