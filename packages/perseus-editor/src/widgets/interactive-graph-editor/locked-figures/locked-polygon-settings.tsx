import {
    getDefaultFigureForType,
    lockedFigureFillStyles,
    type Coord,
    type LockedFigureFillType,
    type LockedPolygonType,
    type LockedFigureColor,
    type LockedLabelType,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import arrowFatDown from "@phosphor-icons/core/regular/arrow-fat-down.svg";
import arrowFatLeft from "@phosphor-icons/core/regular/arrow-fat-left.svg";
import arrowFatRight from "@phosphor-icons/core/regular/arrow-fat-right.svg";
import arrowFatUp from "@phosphor-icons/core/regular/arrow-fat-up.svg";
import minusCircle from "@phosphor-icons/core/regular/minus-circle.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import LabeledSwitch from "../../../components/labeled-switch";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineWeightSelect from "./line-weight-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import PolygonSwatch from "./polygon-swatch";
import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";

export type Props = LockedFigureSettingsCommonProps &
    LockedPolygonType & {
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedPolygonType>) => void;
    };

const LockedPolygonSettings = (props: Props) => {
    const {
        points,
        color,
        showVertices,
        fillStyle,
        strokeStyle,
        weight,
        labels,
        ariaLabel,
        expanded,
        onToggle,
        onChangeProps,
        onMove,
        onRemove,
    } = props;

    /**
     * Generate the prepopulated aria label for the polygon,
     * with the math details converted into spoken words.
     */
    async function getPrepopulatedAriaLabel() {
        const visiblelabel = await joinLabelsAsSpokenMath(labels);

        let str = `Polygon${visiblelabel} with ${points.length} sides, vertices at `;

        // Add the coordinates of each point to the aria label
        const pointsList = await Promise.all(
            points.map(async ([x, y]) => {
                // Ensure negative values are read correctly within aria labels.
                const spokenX = await generateSpokenMathDetails(`$${x}$`);
                const spokenY = await generateSpokenMathDetails(`$${y}$`);
                return `${spokenX} comma ${spokenY}`;
            }),
        );
        str += pointsList.join(", ");

        const polygonAppearance = generateLockedFigureAppearanceDescription(
            color,
            strokeStyle,
            fillStyle,
            weight,
        );
        str += polygonAppearance;
        return str;
    }

    function handleColorChange(newValue: LockedFigureColor) {
        const newProps: Partial<LockedPolygonType> = {
            color: newValue,
        };

        // Update the color of the all labels to match the point
        newProps.labels = labels.map((label) => ({
            ...label,
            color: newValue,
        }));

        onChangeProps(newProps);
    }

    function handlePolygonMove(movement: "up" | "down" | "left" | "right") {
        switch (movement) {
            case "up":
                onChangeProps({
                    points: points.map(([x, y]) => [x, y + 1]),
                    labels: labels.map((label) => ({
                        ...label,
                        coord: [label.coord[0], label.coord[1] + 1],
                    })),
                });
                break;
            case "down":
                onChangeProps({
                    points: points.map(([x, y]) => [x, y - 1]),
                    labels: labels.map((label) => ({
                        ...label,
                        coord: [label.coord[0], label.coord[1] - 1],
                    })),
                });
                break;
            case "left":
                onChangeProps({
                    points: points.map(([x, y]) => [x - 1, y]),
                    labels: labels.map((label) => ({
                        ...label,
                        coord: [label.coord[0] - 1, label.coord[1]],
                    })),
                });
                break;
            case "right":
                onChangeProps({
                    points: points.map(([x, y]) => [x + 1, y]),
                    labels: labels.map((label) => ({
                        ...label,
                        coord: [label.coord[0] + 1, label.coord[1]],
                    })),
                });
                break;
        }
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
            header={
                // Summary: Polygon, number of sides, style swatch
                <View style={styles.row}>
                    <LabelLarge>{`Polygon, ${points.length} sides`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <PolygonSwatch
                        color={color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
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
                        // TODO(LEMS-2656): remove TS suppression
                        onChange={
                            ((value: LockedFigureFillType) =>
                                onChangeProps({fillStyle: value})) as any
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
                onChange={(value) => onChangeProps({strokeStyle: value})}
                containerStyle={styles.spaceUnder}
            />

            {/* Weight */}
            <LineWeightSelect
                selectedValue={weight}
                onChange={(value) =>
                    onChangeProps({
                        weight: value,
                    })
                }
                containerStyle={styles.spaceUnder}
            />

            {/* Show vertices switch */}
            <LabeledSwitch
                label="show vertices"
                checked={showVertices}
                onChange={(newValue: boolean) =>
                    onChangeProps({showVertices: newValue})
                }
                style={styles.spaceUnder}
            />

            <PerseusEditorAccordion
                header={<LabelLarge>Points</LabelLarge>}
                expanded={true}
                containerStyle={styles.pointAccordionContainer}
                panelStyle={styles.pointAccordionPanel}
            >
                {points.map((point, index) => {
                    const pointLabel = String.fromCharCode(65 + index);

                    return (
                        <View
                            key={`locked-polygon-point-index-${index}`}
                            style={[styles.row, styles.spaceUnder]}
                        >
                            {/* Give the points alphabet labels */}
                            <LabelLarge>{`${pointLabel}:`}</LabelLarge>
                            <Strut size={spacing.medium_16} />
                            <CoordinatePairInput
                                coord={point}
                                labels={["x", "y"]}
                                onChange={(newValue: Coord) => {
                                    const newPoints = [...points];
                                    newPoints[index] = newValue;
                                    props.onChangeProps({points: newPoints});
                                }}
                            />
                            {
                                // Only show the minus (delete) buttons if there are
                                // more than 3 points. 3 points is the minimum number
                                // of points for a polygon (triangle).
                                points.length > 3 && (
                                    <IconButton
                                        aria-label={`Delete polygon point ${pointLabel}`}
                                        icon={minusCircle}
                                        kind="tertiary"
                                        actionType="destructive"
                                        onClick={() => {
                                            const newPoints = [...points];
                                            newPoints.splice(index, 1);
                                            props.onChangeProps({
                                                points: newPoints,
                                            });
                                        }}
                                        style={styles.icon}
                                    />
                                )
                            }
                        </View>
                    );
                })}
                <View style={[styles.row, styles.polygonActionsContainer]}>
                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        onClick={() => {
                            props.onChangeProps({
                                points: [...points, [0, 0]],
                            });
                        }}
                    >
                        Add point
                    </Button>

                    <Spring />

                    {/* Buttons to move the entire polygon */}
                    <View style={styles.movementButtonsContainer}>
                        <IconButton
                            aria-label="Move polygon up"
                            size="small"
                            icon={arrowFatUp}
                            kind="tertiary"
                            onClick={() => handlePolygonMove("up")}
                        />
                        <View style={styles.row}>
                            <IconButton
                                aria-label="Move polygon left"
                                size="small"
                                icon={arrowFatLeft}
                                kind="tertiary"
                                onClick={() => handlePolygonMove("left")}
                            />
                            <IconButton
                                aria-label="Move polygon down"
                                size="small"
                                icon={arrowFatDown}
                                kind="tertiary"
                                onClick={() => handlePolygonMove("down")}
                            />
                            <IconButton
                                aria-label="Move polygon right"
                                size="small"
                                icon={arrowFatRight}
                                kind="tertiary"
                                onClick={() => handlePolygonMove("right")}
                            />
                        </View>
                    </View>
                </View>
            </PerseusEditorAccordion>

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

            {/* Visible Labels */}
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
                    const newLabel = {
                        ...getDefaultFigureForType("label"),
                        coord: [
                            points[0][0],
                            // Additional vertical offset for each
                            // label so they don't overlap.
                            points[0][1] - labels.length,
                        ],
                        // Default to the same color as the ellipse
                        color: color,
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
    pointAccordionContainer: {
        backgroundColor: semanticColor.core.background.base.default,
    },
    pointAccordionPanel: {
        alignItems: "start",
    },
    icon: {
        marginInlineStart: spacing.xxxSmall_4,
    },
    polygonActionsContainer: {
        width: "100%",
    },
    movementButtonsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "fit-content",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    truncatedWidth: {
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },

    // Styles for the visible labels section
    addButton: {
        alignSelf: "start",
    },
    labelContainer: {
        backgroundColor: semanticColor.core.background.base.default,
    },
    horizontalRule: {
        height: 1,
        backgroundColor: semanticColor.core.border.neutral.subtle,
    },
});

export default LockedPolygonSettings;
