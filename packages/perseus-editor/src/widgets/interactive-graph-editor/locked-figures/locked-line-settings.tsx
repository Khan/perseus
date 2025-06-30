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
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import {vec} from "mafs";
import * as React from "react";

import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineSwatch from "./line-swatch";
import LineWeightSelect from "./line-weight-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import LockedPointSettings from "./locked-point-settings";
import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    getDefaultFigureForType,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {Coord} from "@khanacademy/perseus";
import type {
    LockedFigure,
    LockedFigureColor,
    StrokeWeight,
    LockedLabelType,
    LockedLineType,
    LockedPointType,
} from "@khanacademy/perseus-core";

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
        kind,
        points,
        color: lineColor,
        lineStyle = "solid",
        showPoint1,
        showPoint2,
        weight,
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
    /**
     * Generate a prepopulated aria label for the line, with the math
     * details converted into spoken words.
     */
    async function getPrepopulatedAriaLabel() {
        const visiblelabel = await joinLabelsAsSpokenMath(labels);
        const point1VisibleLabel = await joinLabelsAsSpokenMath(point1.labels);
        const point2VisibleLabel = await joinLabelsAsSpokenMath(point2.labels);
        // Ensure negative values are read correctly within aria labels.
        const spokenPoint1X = await generateSpokenMathDetails(
            `$${point1.coord[0]}$`,
        );
        const spokenPoint1Y = await generateSpokenMathDetails(
            `$${point1.coord[1]}$`,
        );
        const spokenPoint2X = await generateSpokenMathDetails(
            `$${point2.coord[0]}$`,
        );
        const spokenPoint2Y = await generateSpokenMathDetails(
            `$${point2.coord[1]}$`,
        );

        // "THROUGH point1 AND point2" for LINE.
        // "FROM point1 THROUGH point2" for RAY.
        // "FROM point1 TO point2" for SEGMENT.
        let str: string;
        switch (kind) {
            case "line":
                str = `${capitalizeKind}${visiblelabel} through point${point1VisibleLabel} at ${spokenPoint1X} comma ${spokenPoint1Y} and point${point2VisibleLabel} at ${spokenPoint2X} comma ${spokenPoint2Y}`;
                break;
            case "ray":
                str = `${capitalizeKind}${visiblelabel} from point${point1VisibleLabel} at ${spokenPoint1X} comma ${spokenPoint1Y} through point${point2VisibleLabel} at ${spokenPoint2X} comma ${spokenPoint2Y}`;
                break;
            case "segment":
                str = `${capitalizeKind}${visiblelabel} from point${point1VisibleLabel} at ${spokenPoint1X} comma ${spokenPoint1Y} to point${point2VisibleLabel} at ${spokenPoint2X} comma ${spokenPoint2Y}`;
                break;
            default:
                throw new UnreachableCaseError(kind, "Unknown line kind");
        }

        const lineAppearance = generateLockedFigureAppearanceDescription(
            lineColor,
            lineStyle,
            undefined, // No fill style for lines
            weight,
        );
        str += lineAppearance;

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
        const newLabels = labels.map((label, labelIndex) => ({
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
        const newLabels = labels.map((label) => ({
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
                    labels: point1.labels.map((label) => ({
                        ...label,
                        color: newColor,
                    })),
                },
                {
                    ...point2,
                    color: newColor,
                    labels: point2.labels.map((label) => ({
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
                    // TODO(LEMS-2656): remove TS suppression
                    onChange={
                        ((value: "line" | "segment" | "ray") =>
                            onChangeProps({kind: value})) as any
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="line" label="line" />
                    <OptionItem value="ray" label="ray" />
                    <OptionItem value="segment" label="segment" />
                </SingleSelect>
            </LabelMedium>

            <View style={[styles.row, styles.spaceUnder]}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.small_12} />

                {/* Line style settings */}
                <LineStrokeSelect
                    selectedValue={lineStyle}
                    onChange={
                        ((value: "solid" | "dashed") =>
                            onChangeProps({lineStyle: value})) as any
                    }
                />
            </View>
            <LineWeightSelect
                selectedValue={weight ?? "medium"}
                onChange={
                    ((value: StrokeWeight) =>
                        onChangeProps({weight: value})) as any
                }
            />

            {/* Points error message */}
            {isInvalid && (
                <LabelMedium style={styles.errorText}>
                    {lengthZeroStr}
                </LabelMedium>
            )}

            {/* Defining points settings */}
            <LockedPointSettings
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

            {/* Aria label */}
            <Strut size={spacing.small_12} />
            <View style={styles.horizontalRule} />
            <LockedFigureAria
                ariaLabel={ariaLabel}
                getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                onChangeProps={(newProps) => {
                    onChangeProps(newProps);
                }}
            />

            {/* Visible labels */}
            <Strut size={spacing.xxxSmall_4} />
            <View style={styles.horizontalRule} />
            <Strut size={spacing.small_12} />
            <LabelMedium>Visible labels</LabelMedium>

            {labels.map((label, labelIndex) => (
                <LockedLabelSettings
                    {...label}
                    key={labelIndex}
                    expanded={true}
                    onChangeProps={(newLabel) => {
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
                        vec.scale(offsetPerLabel, labels.length),
                        vec.midpoint(points[0].coord, points[1].coord),
                    );

                    const newLabel = {
                        ...getDefaultFigureForType("label"),
                        coord: labelLocation,
                        // Default to the same color as the line
                        color: lineColor,
                    } satisfies LockedLabelType;

                    onChangeProps({
                        labels: [...labels, newLabel],
                    });
                }}
                style={styles.addButton}
            >
                Add visible label
            </Button>

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
