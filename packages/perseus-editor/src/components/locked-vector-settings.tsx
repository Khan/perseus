/**
 * LockedVectorSettings is a component that allows the user to edit the
 * settings of specifically a locked vector on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSelect from "./color-select";
import CoordinatePairInput from "./coordinate-pair-input";
import DefiningPointSettings from "./defining-point-settings";
import LineSwatch from "./line-swatch";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {AccordionProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigure,
    LockedFigureColor,
    LockedVectorType,
} from "@khanacademy/perseus";

export type Props = LockedVectorType &
    AccordionProps & {
        /**
         * Called when the delete button is pressed.
         */
        onRemove: () => void;
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFigure>) => void;
    };

const LockedVectorSettings = (props: Props) => {
    const {points, color: lineColor, onChangeProps, onRemove} = props;
    const [tail, tip] = points;
    const lineLabel = `Vector (${tail[0]}, ${tail[1]}), (${tip[0]}, ${tip[1]})`;

    function handleChangePoint(newCoord: Coord | undefined, index: 0 | 1) {
        if (newCoord) {
            const newPoints = [...points] as [Coord, Coord];
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
        <LockedFigureSettingsAccordion
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

            {/* Coordinates */}
            {/*
                TODO: Wrap each coordinate pair input with LockedFigureSettingsAccordion
            */}
            <CoordinatePairInput
                coord={tail}
                // error={!!error}
                onChangeProps={(newProps) => {
                    handleChangePoint(newProps.coord, 0);
                }}
            />
            <CoordinatePairInput
                coord={tip}
                // error={!!error}
                onChangeProps={(newProps) => {
                    handleChangePoint(newProps.coord, 1);
                }}
            />

            {/* Actions */}
            <LockedFigureSettingsActions
                onRemove={onRemove}
                figureAriaLabel={`locked vector defined by starting point
                    ${tail[0]}, ${tail[1]} and extending to
                    ${tip[0]}, ${tip[1]}.`}
            />
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default LockedVectorSettings;
