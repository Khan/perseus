/**
 * LockedVectorSettings is a component that allows the user to edit the
 * settings of specifically a locked vector on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {vector as kvector} from "@khanacademy/kmath";
import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {vec} from "mafs";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineSwatch from "./line-swatch";
import LineWeightSelect from "./line-weight-select";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import styles from "./locked-vector-settings.module.css";
import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    joinLabelsAsSpokenMath,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigure,
    LockedFigureColor,
    LockedLabelType,
    LockedVectorType,
    StrokeWeight,
} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const lengthErrorMessage = "The vector cannot have length 0.";

// Passed to PerseusEditorAccordion's `containerStyle`/`panelStyle` and
// LockedLabelSettings' `containerStyle`, which are typed as Wonder Blocks
// `StyleType` and do not accept a CSS-module className.
const coordsAccordionContainerStyle: StyleType = {
    marginTop: sizing.size_080,
    marginBottom: 0,
    marginLeft: -sizing.size_040,
    marginRight: -sizing.size_040,
    backgroundColor: semanticColor.core.background.base.default,
};
const coordsAccordionPanelStyle: StyleType = {
    paddingBottom: sizing.size_160,
};
const labelContainerStyle: StyleType = {
    backgroundColor: semanticColor.core.background.base.default,
};

export type Props = LockedVectorType &
    LockedFigureSettingsCommonProps & {
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFigure>) => void;
    };

const LockedVectorSettings = (props: Props) => {
    const {
        points,
        color: lineColor,
        weight,
        labels,
        ariaLabel,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const [tail, tip] = points;
    const lineLabel = `Vector (${tail[0]}, ${tail[1]}), (${tip[0]}, ${tip[1]})`;

    // Check if the line has length 0.
    const isInvalid = kvector.equal(tail, tip);

    /**
     * Generate the prepopulated aria label for the vector,
     * with the math details converted into spoken words.
     */
    async function getPrepopulatedAriaLabel() {
        const visiblelabel = await joinLabelsAsSpokenMath(labels);
        // Ensure negative values are read correctly within aria labels.
        const spokenTailX = await generateSpokenMathDetails(`$${tail[0]}$`);
        const spokenTailY = await generateSpokenMathDetails(`$${tail[1]}$`);
        const spokenTipX = await generateSpokenMathDetails(`$${tip[0]}$`);
        const spokenTipY = await generateSpokenMathDetails(`$${tip[1]}$`);

        let str = `Vector${visiblelabel} from ${spokenTailX} comma ${spokenTailY} to ${spokenTipX} comma ${spokenTipY}`;

        const vectorAppearance = generateLockedFigureAppearanceDescription(
            lineColor,
            "solid",
            undefined, // No fill style for vectors
            weight,
        );
        str += vectorAppearance;

        return str;
    }

    function handleChangePoint(newCoord: Coord | undefined, index: 0 | 1) {
        if (typeof newCoord !== "undefined") {
            const newPoints = [...points] satisfies [tail: Coord, tip: Coord];
            newPoints[index] = [...newCoord];

            // Update labels to match the new points
            const oldMidpoint = vec.midpoint(tail, tip);
            const newMidpoint = vec.midpoint(newPoints[0], newPoints[1]);
            const offset = vec.sub(newMidpoint, oldMidpoint);
            const newLabels = labels.map((label) => ({
                ...label,
                coord: vec.add(label.coord, offset),
            }));

            onChangeProps({
                points: newPoints,
                labels: newLabels,
            });
        }
    }

    function handleColorChange(newColor: LockedFigureColor) {
        const newProps: Partial<LockedVectorType> = {
            color: newColor,
        };

        // Update the color of the all labels to match the point
        newProps.labels = labels.map((label) => ({
            ...label,
            color: newColor,
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
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                <View className={styles.row}>
                    <BodyText size="medium" weight="bold" tag="span">
                        {lineLabel}
                    </BodyText>
                    <LineSwatch color={lineColor} lineStyle="solid" />
                </View>
            }
        >
            {/* Line color settings */}
            <ColorSelect
                selectedValue={lineColor}
                onChange={handleColorChange}
                style={{marginBottom: sizing.size_080}}
            />

            {/* Line weight settings */}
            <LineWeightSelect
                selectedValue={weight}
                onChange={(value: StrokeWeight) =>
                    onChangeProps({weight: value})
                }
            />

            {/* Zero length error message */}
            {isInvalid && (
                <BodyText className={styles.errorText}>
                    {lengthErrorMessage}
                </BodyText>
            )}

            {/* Coordinates */}
            <PerseusEditorAccordion
                expanded={true} // Initial state is expanded
                containerStyle={coordsAccordionContainerStyle}
                panelStyle={coordsAccordionPanelStyle}
                header={
                    <View className={styles.row}>
                        <BodyText
                            size="medium"
                            weight="bold"
                            tag="span"
                        >{`Tail (${tail[0]}, ${tail[1]})`}</BodyText>
                    </View>
                }
            >
                <CoordinatePairInput
                    coord={tail}
                    error={isInvalid}
                    onChange={(newProps) => {
                        handleChangePoint(newProps, 0);
                    }}
                />
            </PerseusEditorAccordion>

            <PerseusEditorAccordion
                expanded={true} // Initial state is expanded
                containerStyle={coordsAccordionContainerStyle}
                panelStyle={coordsAccordionPanelStyle}
                header={
                    <View className={styles.row}>
                        <BodyText
                            size="medium"
                            weight="bold"
                            tag="span"
                        >{`Tip (${tip[0]}, ${tip[1]})`}</BodyText>
                    </View>
                }
            >
                <CoordinatePairInput
                    coord={tip}
                    error={isInvalid}
                    onChange={(newProps) => {
                        handleChangePoint(newProps, 1);
                    }}
                />
            </PerseusEditorAccordion>

            {/* Aria label */}
            <View className={`${styles.horizontalRule} ${styles.sectionTop}`} />
            <LockedFigureAria
                ariaLabel={ariaLabel}
                getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                onChangeProps={(newProps) => {
                    onChangeProps(newProps);
                }}
            />

            {/* Visible labels */}
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
                    // Additional vertical offset for each label so
                    // they don't overlap.
                    const offsetPerLabel: vec.Vector2 = [0, -1];
                    const labelLocation = vec.add(
                        vec.scale(offsetPerLabel, labels.length),
                        vec.midpoint(tail, tip),
                    );

                    const newLabel = {
                        ...getDefaultFigureForType("label"),
                        coord: labelLocation,
                        // Default to the same color as the vector
                        color: lineColor,
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

export default LockedVectorSettings;
