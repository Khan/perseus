/**
 * LockedVectorSettings is a component that allows the user to edit the
 * settings of specifically a locked vector on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {vector as kvector} from "@khanacademy/kmath";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../coordinate-pair-input";
import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineSwatch from "./line-swatch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigure,
    LockedFigureColor,
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
    const {points, color: lineColor, onChangeProps, onMove, onRemove} = props;
    const [tail, tip] = points;
    const lineLabel = `Vector (${tail[0]}, ${tail[1]}), (${tip[0]}, ${tip[1]})`;

    // Check if the line has length 0.
    const isInvalid = kvector.equal(tail, tip);

    function handleChangePoint(newCoord: Coord | undefined, index: 0 | 1) {
        if (typeof newCoord !== "undefined") {
            const newPoints = [...points] satisfies [tail: Coord, tip: Coord];
            newPoints[index] = [...newCoord];
            onChangeProps({
                points: newPoints,
            });
        }
    }

    function handleColorChange(newColor: LockedFigureColor) {
        onChangeProps({
            color: newColor,
        });
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

            {/* Actions */}
            <LockedFigureSettingsActions
                showM2Features={props.showM2Features}
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
});

export default LockedVectorSettings;
