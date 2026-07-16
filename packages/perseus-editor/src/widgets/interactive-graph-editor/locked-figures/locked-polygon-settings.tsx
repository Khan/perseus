import {
    type Coord,
    getDefaultFigureForType,
    type LockedFigureColor,
    type LockedFigureFillType,
    type LockedLabelType,
    type LockedPolygonType,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import arrowFatDown from "@phosphor-icons/core/regular/arrow-fat-down.svg";
import arrowFatLeft from "@phosphor-icons/core/regular/arrow-fat-left.svg";
import arrowFatRight from "@phosphor-icons/core/regular/arrow-fat-right.svg";
import arrowFatUp from "@phosphor-icons/core/regular/arrow-fat-up.svg";
import minusCircle from "@phosphor-icons/core/regular/minus-circle.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import LabeledSwitch from "../../../components/labeled-switch";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";
import {TypedSingleSelect} from "../../../components/typed-single-select";

import ColorSelect from "./color-select";
import LineStrokeSelect from "./line-stroke-select";
import LineWeightSelect from "./line-weight-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import styles from "./locked-polygon-settings.module.css";
import PolygonSwatch from "./polygon-swatch";
import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Passed to Wonder Blocks `StyleType`-only props (PerseusEditorAccordion's
// `containerStyle`/`panelStyle`, child `style`/`containerStyle`), which do not
// accept a CSS-module className.
const spaceUnderStyle: StyleType = {marginBottom: sizing.size_080};
const pointAccordionContainerStyle: StyleType = {
    backgroundColor: semanticColor.core.background.base.default,
};
const pointAccordionPanelStyle: StyleType = {
    alignItems: "start",
};
const labelContainerStyle: StyleType = {
    backgroundColor: semanticColor.core.background.base.default,
};

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
        editingDisabled = false,
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
                <View className={`${styles.row} ${styles.header}`}>
                    <BodyText
                        size="medium"
                        weight="bold"
                        tag="span"
                    >{`Polygon, ${points.length} sides`}</BodyText>
                    <PolygonSwatch
                        color={color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
            <View className={`${styles.row} ${styles.colorRow}`}>
                {/* Color */}
                <ColorSelect
                    selectedValue={color}
                    editingDisabled={editingDisabled}
                    onChange={handleColorChange}
                />

                {/* Fill opacity */}
                <BodyText
                    tag="label"
                    className={`${styles.row} ${styles.truncatedWidth} ${styles.fillLabel}`}
                >
                    fill
                    <TypedSingleSelect<LockedFigureFillType>
                        selectedValue={fillStyle}
                        disabled={editingDisabled}
                        onChange={(value) => onChangeProps({fillStyle: value})}
                        options={{
                            none: "none",
                            white: "white",
                            translucent: "translucent",
                            solid: "solid",
                        }}
                        // Placeholder is required, but never gets used.
                        placeholder=""
                    />
                </BodyText>
            </View>

            {/* Stroke style */}
            <LineStrokeSelect
                selectedValue={strokeStyle}
                editingDisabled={editingDisabled}
                onChange={(value) => onChangeProps({strokeStyle: value})}
                containerStyle={spaceUnderStyle}
            />

            {/* Weight */}
            <LineWeightSelect
                selectedValue={weight}
                editingDisabled={editingDisabled}
                onChange={(value) =>
                    onChangeProps({
                        weight: value,
                    })
                }
                containerStyle={spaceUnderStyle}
            />

            {/* Show vertices switch */}
            <LabeledSwitch
                label="show vertices"
                checked={showVertices}
                disabled={editingDisabled}
                onChange={(newValue: boolean) =>
                    onChangeProps({showVertices: newValue})
                }
                style={spaceUnderStyle}
            />

            <PerseusEditorAccordion
                header={
                    <BodyText size="medium" weight="bold" tag="span">
                        Points
                    </BodyText>
                }
                expanded={true}
                containerStyle={pointAccordionContainerStyle}
                panelStyle={pointAccordionPanelStyle}
            >
                {points.map((point, index) => {
                    const pointLabel = String.fromCharCode(65 + index);

                    return (
                        <View
                            key={`locked-polygon-point-index-${index}`}
                            className={`${styles.row} ${styles.spaceUnder}`}
                        >
                            {/* Give the points alphabet labels */}
                            <BodyText
                                size="medium"
                                weight="bold"
                            >{`${pointLabel}:`}</BodyText>
                            <CoordinatePairInput
                                coord={point}
                                labels={["x", "y"]}
                                style={{marginInlineStart: sizing.size_160}}
                                disabled={editingDisabled}
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
                                        disabled={editingDisabled}
                                        onClick={() => {
                                            const newPoints = [...points];
                                            newPoints.splice(index, 1);
                                            props.onChangeProps({
                                                points: newPoints,
                                            });
                                        }}
                                        className={styles.icon}
                                    />
                                )
                            }
                        </View>
                    );
                })}
                <View
                    className={`${styles.row} ${styles.polygonActionsContainer}`}
                >
                    <Button
                        kind="tertiary"
                        startIcon={plusCircle}
                        disabled={editingDisabled}
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
                    <View className={styles.movementButtonsContainer}>
                        <IconButton
                            aria-label="Move polygon up"
                            size="small"
                            icon={arrowFatUp}
                            kind="tertiary"
                            disabled={editingDisabled}
                            onClick={() => handlePolygonMove("up")}
                        />
                        <View className={styles.row}>
                            <IconButton
                                aria-label="Move polygon left"
                                size="small"
                                icon={arrowFatLeft}
                                kind="tertiary"
                                disabled={editingDisabled}
                                onClick={() => handlePolygonMove("left")}
                            />
                            <IconButton
                                aria-label="Move polygon down"
                                size="small"
                                icon={arrowFatDown}
                                kind="tertiary"
                                disabled={editingDisabled}
                                onClick={() => handlePolygonMove("down")}
                            />
                            <IconButton
                                aria-label="Move polygon right"
                                size="small"
                                icon={arrowFatRight}
                                kind="tertiary"
                                disabled={editingDisabled}
                                onClick={() => handlePolygonMove("right")}
                            />
                        </View>
                    </View>
                </View>
            </PerseusEditorAccordion>

            {/* Aria label */}
            <View className={`${styles.horizontalRule} ${styles.sectionTop}`} />
            <LockedFigureAria
                ariaLabel={ariaLabel}
                getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                editingDisabled={editingDisabled}
                onChangeProps={(newProps) => {
                    onChangeProps(newProps);
                }}
            />

            {/* Visible Labels */}
            <View
                className={`${styles.horizontalRule} ${styles.dividerTight}`}
            />
            <BodyText className={styles.sectionTop}>Visible labels</BodyText>
            {labels.map((label, labelIndex) => (
                <LockedLabelSettings
                    {...label}
                    key={labelIndex}
                    editingDisabled={editingDisabled}
                    expanded={true}
                    onChangeProps={(newLabel) => {
                        handleLabelChange(newLabel, labelIndex);
                    }}
                    onRemove={() => {
                        handleLabelRemove(labelIndex);
                    }}
                    containerStyle={labelContainerStyle}
                />
            ))}
            <Button
                kind="tertiary"
                startIcon={plusCircle}
                disabled={editingDisabled}
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
                className={styles.addButton}
            >
                Add visible label
            </Button>

            {/* Actions */}
            <LockedFigureSettingsActions
                figureType={props.type}
                editingDisabled={editingDisabled}
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
};

export default LockedPolygonSettings;
