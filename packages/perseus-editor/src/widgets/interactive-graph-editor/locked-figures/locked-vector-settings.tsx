/**
 * LockedVectorSettings is a component that allows the user to edit the
 * settings of specifically a locked vector on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {vector as kvector} from "@khanacademy/kmath";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import {vec} from "mafs";
import * as React from "react";

import CoordinatePairInput from "../../../components/coordinate-pair-input";
import PerseusEditorAccordion from "../../../components/perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineSwatch from "./line-swatch";
import LockedFigureAria from "./locked-figure-aria";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedLabelSettings from "./locked-label-settings";
import {
    generateLockedFigureAppearanceDescription,
    generateSpokenMathDetails,
    getDefaultFigureForType,
} from "./util";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigure,
    LockedFigureColor,
    LockedLabelType,
    LockedVectorType,
} from "@khanacademy/perseus";

const lengthErrorMessage = "The vector cannot have length 0.";

export type Props = LockedVectorType &
    LockedFigureSettingsCommonProps & {
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFigure>) => void;
    };

const LockedVectorSettings = (props: Props) => {
    const {
        flags,
        points,
        color: lineColor,
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
        let visiblelabel = "";
        if (labels && labels.length > 0) {
            visiblelabel += ` ${labels.map((l) => l.text).join(", ")}`;
        }

        let str = await generateSpokenMathDetails(
            `Vector${visiblelabel} from (${tail[0]}, ${tail[1]}) to (${tip[0]}, ${tip[1]})`,
        );

        const vectorAppearance =
            generateLockedFigureAppearanceDescription(lineColor);
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
            const newLabels = labels?.map((label) => ({
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
        newProps.labels = labels?.map((label) => ({
            ...label,
            color: newColor,
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
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                <View style={styles.row}>
                    <LabelLarge>{lineLabel}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <LineSwatch color={lineColor} lineStyle="solid" />
                </View>
            }
        >
            <View style={[styles.row, styles.spaceUnder]}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    // @ts-expect-error: Type 'string' is not assignable to type '"blue" | "green" | "orange" | "pink" | "purple" | "red" | "grayH"'.
                    onChange={handleColorChange}
                />
            </View>

            {/* Zero length error message */}
            {isInvalid && (
                <LabelMedium style={styles.errorText}>
                    {lengthErrorMessage}
                </LabelMedium>
            )}

            {/* Coordinates */}
            <PerseusEditorAccordion
                expanded={true} // Initial state is expanded
                containerStyle={styles.container}
                panelStyle={styles.accordionPanel}
                header={
                    <View style={styles.row}>
                        <LabelLarge>{`Tail (${tail[0]}, ${tail[1]})`}</LabelLarge>
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
                containerStyle={styles.container}
                panelStyle={styles.accordionPanel}
                header={
                    <View style={styles.row}>
                        <LabelLarge>{`Tip (${tip[0]}, ${tip[1]})`}</LabelLarge>
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

            {flags?.["mafs"]?.["locked-figures-aria"] && (
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

            {flags?.["mafs"]?.["locked-vector-labels"] && (
                <>
                    <Strut size={spacing.xxxSmall_4} />
                    <View style={styles.horizontalRule} />
                    <Strut size={spacing.small_12} />

                    <LabelMedium>Visible labels</LabelMedium>

                    {labels?.map((label, labelIndex) => (
                        <LockedLabelSettings
                            {...label}
                            expanded={true}
                            // @ts-expect-error: Type 'Partial<LockedFigure>' is not assignable to type 'LockedLabelType'
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
                                vec.midpoint(tail, tip),
                            );

                            const newLabel = {
                                ...getDefaultFigureForType("label"),
                                coord: labelLocation,
                                // Default to the same color as the vector
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
    accordionPanel: {
        paddingBottom: spacing.medium_16,
    },
    container: {
        marginTop: spacing.xSmall_8,
        marginBottom: 0,
        marginLeft: -spacing.xxxSmall_4,
        marginRight: -spacing.xxxSmall_4,
        backgroundColor: wbColor.white,
    },
    errorText: {
        color: wbColor.red,
        marginTop: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
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

export default LockedVectorSettings;
