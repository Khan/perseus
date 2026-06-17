import {angles} from "@khanacademy/kmath";
import {components} from "@khanacademy/perseus";
import {
    getDefaultFigureForType,
    lockedFigureFillStyles,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {sizing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import AngleInput from "../../../components/angle-input";
import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import EllipseSwatch from "./ellipse-swatch";
import LineStrokeSelect from "./line-stroke-select";
import LineWeightSelect from "./line-weight-select";
import styles from "./locked-ellipse-settings.module.css";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigureFillType,
    LockedEllipseType,
    LockedFigureColor,
    LockedLabelType,
} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {convertRadiansToDegrees} = angles;
const {InfoTip} = components;

// Passed to CoordinatePairInput's/View's `style` and LockedLabelSettings'
// `containerStyle`, which are typed as Wonder Blocks `StyleType` and do not
// accept a CSS-module className.
const spaceUnderStyle: StyleType = {
    marginBottom: sizing.size_080,
};
const labelContainerStyle: StyleType = {
    backgroundColor: semanticColor.core.background.base.default,
};

export type Props = LockedFigureSettingsCommonProps &
    LockedEllipseType & {
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedEllipseType>) => void;
    };

const LockedEllipseSettings = (props: Props) => {
    const {
        center,
        radius,
        angle,
        color,
        labels,
        ariaLabel,
        fillStyle,
        strokeStyle,
        weight,
        expanded,
        onToggle,
        onChangeProps,
        onMove,
        onRemove,
    } = props;

    /**
     * Generate the prepopulated aria label for the ellipse,
     * with the math details converted into spoken words.
     */
    async function getPrepopulatedAriaLabel() {
        // Ensure negative values are read correctly within aria labels.
        const visiblelabel = await joinLabelsAsSpokenMath(labels);
        const spokenCenterX = await generateSpokenMathDetails(`$${center[0]}$`);
        const spokenCenterY = await generateSpokenMathDetails(`$${center[1]}$`);
        const spokenRotation = await generateSpokenMathDetails(
            `$${convertRadiansToDegrees(angle)}$`,
        );

        const isCircle = radius[0] === radius[1];
        let str = "";

        if (isCircle) {
            str += `Circle${visiblelabel} with radius ${radius[0]}`;
        } else {
            str += `Ellipse${visiblelabel} with x radius ${radius[0]} and y radius ${radius[1]}`;
        }

        str += `, centered at ${spokenCenterX} comma ${spokenCenterY}`;

        if (!isCircle && angle !== 0) {
            str += `, rotated by ${spokenRotation} degrees`;
        }

        const ellipseAppearance = generateLockedFigureAppearanceDescription(
            color,
            strokeStyle,
            fillStyle,
            weight,
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
        newProps.labels = labels.map((label) => ({
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
        newProps.labels = labels.map((label) => ({
            ...label,
            color: newValue,
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
            header={
                // Summary: Ellipse, center, radius, color (opacity, dashed)
                <View className={`${styles.row} ${styles.header}`}>
                    <BodyText
                        size="medium"
                        tag="span"
                        weight="bold"
                    >{`Ellipse (${center[0]}, ${center[1]}), radius ${radius[0]}, ${radius[1]}`}</BodyText>
                    <EllipseSwatch
                        color={props.color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
            {/* Center point */}
            <View className={styles.row}>
                <CoordinatePairInput
                    coord={center}
                    style={spaceUnderStyle}
                    onChange={handleCenterChange}
                />
                <View className={styles.spaceUnder}>
                    <InfoTip>
                        The coordinates for the center of the ellipse.
                    </InfoTip>
                </View>
            </View>

            {/* Radius */}
            <CoordinatePairInput
                coord={radius}
                labels={["x radius", "y radius"]}
                style={spaceUnderStyle}
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

            <View className={`${styles.row} ${styles.colorRow}`}>
                {/* Color */}
                <ColorSelect
                    selectedValue={color}
                    onChange={handleColorChange}
                />

                {/* Fill opacity */}
                <BodyText
                    tag="label"
                    className={`${styles.row} ${styles.truncatedWidth} ${styles.fillLabel}`}
                >
                    fill
                    <SingleSelect
                        selectedValue={fillStyle}
                        // TODO(LEMS-2656): remove TS suppression
                        onChange={
                            // eslint-disable-next-line no-restricted-syntax
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
                </BodyText>
            </View>

            {/* Stroke style */}
            <LineStrokeSelect
                selectedValue={strokeStyle}
                onChange={(value) => onChangeProps({strokeStyle: value})}
                containerStyle={{marginBottom: sizing.size_080}}
            />

            {/* Weight */}
            <LineWeightSelect
                selectedValue={weight}
                onChange={(value) => onChangeProps({weight: value})}
            />

            {/* Aria label */}
            <View className={`${styles.horizontalRule} ${styles.sectionTop}`} />
            <LockedFigureAria
                ariaLabel={ariaLabel}
                getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
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
                onClick={() => {
                    const newLabel = {
                        ...getDefaultFigureForType("label"),
                        coord: [
                            center[0],
                            // Additional vertical offset for each
                            // label so they don't overlap.
                            center[1] - labels.length,
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
                onMove={onMove}
                onRemove={onRemove}
            />
        </PerseusEditorAccordion>
    );
};

export default LockedEllipseSettings;
