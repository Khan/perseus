/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
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
import ColorSwatch from "./color-swatch";
import CoordinatePairInput from "./coordinate-pair-input";
import LabeledSwitch from "./labeled-switch";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {AccordionProps} from "./locked-figure-settings";
import type {LockedPointType, Range} from "@khanacademy/perseus";

export type Props = AccordionProps &
    LockedPointType & {
        /**
         * The range of the graph. Used to restrict the coordinates.
         */
        range?: [Range, Range];
        /**
         * Called when the delete button is pressed.
         */
        onRemove: () => void;
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedPointType>) => void;
    };

const LockedPointSettings = (props: Props) => {
    const {
        coord,
        color: pointColor,
        filled = true,
        range,
        onChangeProps,
        onRemove,
    } = props;

    function handleColorChange(newValue) {
        onChangeProps({color: newValue});
    }

    return (
        <LockedFigureSettingsAccordion
            expanded={props.expanded}
            onToggle={props.onToggle}
            header={
                // Summary: Point, coords, color (filled/open)
                <View style={styles.row}>
                    <LabelLarge>{`Point (${coord[0]}, ${coord[1]})`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <ColorSwatch color={pointColor} filled={filled} />
                </View>
            }
        >
            <CoordinatePairInput
                coord={coord}
                range={range}
                onChangeProps={onChangeProps}
            />

            <ColorSelect
                selectedValue={pointColor}
                onChange={handleColorChange}
                style={styles.spaceUnder}
            />

            <LabeledSwitch
                label="open point"
                checked={!filled}
                onChange={(newValue) => {
                    onChangeProps({filled: !newValue});
                }}
            />

            <LockedFigureSettingsActions
                onRemove={onRemove}
                figureAriaLabel={`locked point at ${coord[0]}, ${coord[1]}`}
            />
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
});

export default LockedPointSettings;
