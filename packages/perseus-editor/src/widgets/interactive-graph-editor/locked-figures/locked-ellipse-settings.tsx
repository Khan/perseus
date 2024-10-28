import {components, lockedFigureFillStyles} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import AngleInput from "../../../components/angle-input";
import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";
import {radianToDegree} from "../../../components/util";

import ColorSelect from "./color-select";
import EllipseSwatch from "./ellipse-swatch";
import LineStrokeSelect from "./line-stroke-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import {
    generateLockedFigureAppearanceDescription,
    getDefaultFigureForType,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigureFillType,
    LockedEllipseType,
    LockedFigureColor,
    LockedLabelType,
} from "@khanacademy/perseus";

const {InfoTip} = components;

export type Props = LockedFigureSettingsCommonProps &
    LockedEllipseType & {
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedEllipseType>) => void;
    };

const LockedEllipseSettings = (props: Props) => {
    const {
        flags,
        center,
        radius,
        angle,
        color,
        labels,
        ariaLabel,
        fillStyle,
        strokeStyle,
        expanded,
        onToggle,
        onChangeProps,
        onMove,
        onRemove,
    } = props;

    function getPrepopulatedAriaLabel() {
        let visiblelabel = "";
        if (labels && labels.length > 0) {
            visiblelabel += ` ${labels.map((l) => l.text).join(", ")}`;
        }

        const isCircle = radius[0] === radius[1];
        let str = "";

        if (isCircle) {
            str += `Circle${visiblelabel} with radius ${radius[0]}`;
        } else {
            str += `Ellipse${visiblelabel} with x radius ${radius[0]} and y radius ${radius[1]}`;
        }

        str += `, centered at (${center[0]}, ${center[1]})`;

        if (!isCircle && angle !== 0) {
            str += `, rotated by ${radianToDegree(angle)} degrees`;
        }

        const ellipseAppearance = generateLockedFigureAppearanceDescription(
            color,
            strokeStyle,
            fillStyle,
        );
        str += ellipseAppearance;
        return str;
    }

    function handleCenterChange(newCoord: Coord) {
        const xOffset = newCoord[0] - center[0];
        const yOffset = newCoord[1] - center[1];

        const newProps: Partial<LockedEllipseType> = {
            center: newCoord,
        };

        // Update the coord by the same amount as the point for all labels
        newProps.labels = labels?.map((label) => ({
            ...label,
            coord: [label.coord[0] + xOffset, label.coord[1] + yOffset],
        }));

        onChangeProps(newProps);
    }

    function handleColorChange(newValue: LockedFigureColor) {
        const newProps: Partial<LockedEllipseType> = {
            color: newValue,
        };

        // Update the color of the all labels to match the point
        newProps.labels = labels?.map((label) => ({
            ...label,
            color: newValue,
        }));

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

    return (
        <PerseusEditorAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                // Summary: Ellipse, center, radius, color (opacity, dashed)
                <View style={styles.row}>
                    <LabelLarge>{`Ellipse (${center[0]}, ${center[1]}), radius ${radius[0]}, ${radius[1]}`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <EllipseSwatch
                        color={props.color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
            {/* Center point */}
            <View style={styles.row}>
                <CoordinatePairInput
                    coord={center}
                    style={styles.spaceUnder}
                    onChange={handleCenterChange}
                />
                <View style={styles.spaceUnder}>
                    <InfoTip>
                        The coordinates for the center of the ellipse.
                    </InfoTip>
                </View>
            </View>

            {/* Radius */}
            <CoordinatePairInput
                coord={radius}
                labels={["x radius", "y radius"]}
                style={styles.spaceUnder}
                onChange={(newCoords: Coord) =>
                    onChangeProps({radius: newCoords})
                }
            />

            {/* Angle */}
            <AngleInput
                angle={angle}
                onChange={(newAngle: number) =>
                    onChangeProps({angle: newAngle})
                }
            />
            <Strut size={spacing.xSmall_8} />

            <View style={[styles.row, styles.spaceUnder]}>
                {/* Color */}
                <ColorSelect
                    selectedValue={color}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.medium_16} />

                {/* Fill opacity */}
                <LabelMedium
                    tag="label"
                    style={[styles.row, styles.truncatedWidth]}
                >
                    fill
                    <Strut size={spacing.xxSmall_6} />
                    <SingleSelect
                        selectedValue={fillStyle}
                        onChange={(value: LockedFigureFillType) =>
                            onChangeProps({fillStyle: value})
                        }
                        // Placeholder is required, but never gets used.
                        placeholder=""
                    >
                        {Object.keys(lockedFigureFillStyles).map((option) => (
                            <OptionItem
                                key={option}
                                value={option}
                                label={option}
                            />
                        ))}
                    </SingleSelect>
                </LabelMedium>
            </View>

            {/* Stroke style */}
            <LineStrokeSelect
                selectedValue={strokeStyle}
                onChange={(value: "solid" | "dashed") =>
                    onChangeProps({strokeStyle: value})
                }
            />

            {/* Aria label */}
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

            {/* Visible Labels */}
            {flags?.["mafs"]?.["locked-ellipse-labels"] && (
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
                            const newLabel = {
                                ...getDefaultFigureForType("label"),
                                coord: [
                                    center[0],
                                    // Additional vertical offset for each
                                    // label so they don't overlap.
                                    center[1] - (labels?.length ?? 0),
                                ],
                                // Default to the same color as the ellipse
                                color: color,
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
    truncatedWidth: {
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },
    addButton: {
        alignSelf: "start",
    },
    labelContainer: {
        backgroundColor: wbColor.white,
    },
    horizontalRule: {
        height: 1,
        backgroundColor: wbColor.offBlack16,
    },
});

export default LockedEllipseSettings;
