/**
 * LockedLineSettings is a component that allows the user to edit the
 * settings of specifically a locked line on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {vector as kvector} from "@khanacademy/kmath";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import {vec} from "mafs";
import * as React from "react";

import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineSwatch from "./line-swatch";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import LockedPointSettings from "./locked-point-settings";
import {getDefaultFigureForType} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigure,
    LockedFigureColor,
    LockedLabelType,
    LockedLineType,
    LockedPointType,
} from "@khanacademy/perseus";

const lengthZeroStr = "The line cannot have length 0.";

export type Props = LockedLineType &
    LockedFigureSettingsCommonProps & {
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFigure>) => void;
    };

const LockedLineSettings = (props: Props) => {
    const {
        flags,
        kind,
        points,
        color: lineColor,
        lineStyle = "solid",
        showPoint1,
        showPoint2,
        labels,
        ariaLabel,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const [point1, point2] = points;

    const capitalizeKind = kind.charAt(0).toUpperCase() + kind.slice(1);
    const lineLabel = `${capitalizeKind} (${point1.coord[0]},
        ${point1.coord[1]}), (${point2.coord[0]}, ${point2.coord[1]})`;

    // Check if the line has length 0.
    const isInvalid = kvector.equal(point1.coord, point2.coord);

    function getPrepopulatedAriaLabel() {
        let str = `${capitalizeKind} from (${point1.coord[0]}, ${point1.coord[1]}) to (${point2.coord[0]}, ${point2.coord[1]})`;

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

    function handleChangePoint(
        newPointProps: Partial<LockedPointType>,
        index: 0 | 1,
    ) {
        const newPoints = [...points] as [LockedPointType, LockedPointType];
        newPoints[index] = {
            ...points[index],
            ...newPointProps,
        };

        // Update labels to be centered between the two points,
        // retaining existing offset.
        const oldMidpoint = vec.midpoint(points[0].coord, points[1].coord);
        const newMidpoint = vec.midpoint(
            newPoints[0].coord,
            newPoints[1].coord,
        );
        const offset: Coord = [
            newMidpoint[0] - oldMidpoint[0],
            newMidpoint[1] - oldMidpoint[1],
        ];
        const newLabels = labels?.map((label, labelIndex) => ({
            ...label,
            coord: [
                label.coord[0] + offset[0],
                label.coord[1] + offset[1],
            ] satisfies Coord,
        }));

        onChangeProps({
            points: newPoints,
            labels: newLabels,
        });
    }

    function handleColorChange(newColor: LockedFigureColor) {
        const newLabels = labels?.map((label) => ({
            ...label,
            color: newColor,
        }));

        onChangeProps({
            color: newColor,
            // Keep the line's points' colors in sync with the line color.
            points: [
                {
                    ...point1,
                    color: newColor,
                    labels: point1.labels?.map((label) => ({
                        ...label,
                        color: newColor,
                    })),
                },
                {
                    ...point2,
                    color: newColor,
                    labels: point2.labels?.map((label) => ({
                        ...label,
                        color: newColor,
                    })),
                },
            ],
            // Keep the line's labels' colors in sync with the line color.
            labels: newLabels,
        });
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

    return (
        <PerseusEditorAccordion
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                <View style={styles.row}>
                    <LabelLarge>{lineLabel}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <LineSwatch color={lineColor} lineStyle={lineStyle} />
                </View>
            }
        >
            {/* Line kind settings */}
            <LabelMedium tag="label" style={[styles.row, styles.spaceUnder]}>
                kind
                <Strut size={spacing.xxxSmall_4} />
                <SingleSelect
                    selectedValue={kind}
                    onChange={(value: "line" | "segment" | "ray") =>
                        onChangeProps({kind: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="line" label="line" />
                    <OptionItem value="ray" label="ray" />
                    <OptionItem value="segment" label="segment" />
                </SingleSelect>
            </LabelMedium>

            <View style={styles.row}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.small_12} />

                {/* Line style settings */}
                <LineStrokeSelect
                    selectedValue={lineStyle}
                    onChange={(value: "solid" | "dashed") =>
                        onChangeProps({lineStyle: value})
                    }
                />
            </View>

            {/* Points error message */}
            {isInvalid && (
                <LabelMedium style={styles.errorText}>
                    {lengthZeroStr}
                </LabelMedium>
            )}

            {/* Defining points settings */}
            <LockedPointSettings
                flags={flags}
                headerLabel="Point 1"
                expanded={true}
                showPoint={showPoint1}
                error={isInvalid ? lengthZeroStr : null}
                {...point1}
                onTogglePoint={(newValue) =>
                    onChangeProps({showPoint1: newValue})
                }
                onChangeProps={(newProps) => handleChangePoint(newProps, 0)}
            />
            <LockedPointSettings
                flags={flags}
                headerLabel="Point 2"
                expanded={true}
                showPoint={showPoint2}
                error={isInvalid ? lengthZeroStr : null}
                {...point2}
                onTogglePoint={(newValue) =>
                    onChangeProps({showPoint2: newValue})
                }
                onChangeProps={(newProps) => handleChangePoint(newProps, 1)}
            />

            {flags?.["mafs"]?.["locked-figures-aria"] && (
                <>
                    <Strut size={spacing.small_12} />
                    <View style={styles.horizontalRule} />

                    <LockedFigureAria
                        ariaLabel={ariaLabel}
                        prePopulatedAriaLabel={getPrepopulatedAriaLabel()}
                        onChangeProps={(newProps) => {
                            onChangeProps(newProps);
                        }}
                    />
                </>
            )}

            {flags?.["mafs"]?.["locked-line-labels"] && (
                <>
                    <Strut size={spacing.xxxSmall_4} />
                    <View style={styles.horizontalRule} />
                    <Strut size={spacing.small_12} />

                    <LabelMedium>Visible labels</LabelMedium>

                    {labels?.map((label, labelIndex) => (
                        <LockedLabelSettings
                            {...label}
                            expanded={true}
                            onChangeProps={(newLabel: LockedLabelType) => {
                                handleLabelChange(newLabel, labelIndex);
                            }}
                            onRemove={() => {
                                handleLabelRemove(labelIndex);
                            }}
                            containerStyle={styles.labelContainer}
                        />
                    ))}

                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        onClick={() => {
                            // Additional vertical offset for each label so
                            // they don't overlap.
                            const offsetPerLabel: vec.Vector2 = [0, -1];
                            const labelLocation = vec.add(
                                vec.scale(offsetPerLabel, labels?.length ?? 0),
                                vec.midpoint(points[0].coord, points[1].coord),
                            );

                            const newLabel = {
                                ...getDefaultFigureForType("label"),
                                coord: labelLocation,
                                // Default to the same color as the line
                                color: lineColor,
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

            {/* Actions */}
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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    errorText: {
        color: wbColor.red,
    },
    addButton: {
        alignSelf: "start",
    },
    horizontalRule: {
        height: 1,
        backgroundColor: wbColor.offBlack16,
    },
    labelContainer: {
        backgroundColor: wbColor.white,
    },
});

export default LockedLineSettings;
