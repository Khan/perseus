/**
 * DefiningPointSettings is a component that allows the user to edit the
 * settings of a point that defines a locked figure (ex. line) on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import CoordinatePairInput from "./coordinate-pair-input";
import LabeledSwitch from "./labeled-switch";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";

import type {AccordionProps} from "./locked-figure-settings";
import type {LockedPointType} from "@khanacademy/perseus";

export type Props = AccordionProps &
    LockedPointType & {
        /**
         * Optional label for the point to display in the header summary.
         * Defaults to "Point".
         */
        label: string;
        /**
         * Whether the extra point settings are toggled open.
         */
        showPoint?: boolean;
        /**
         * Optional error message to display.
         */
        error?: string | null;
        /**
         * Called when the extra settings toggle switch is changed.
         */
        onTogglePoint?: (newValue) => void;
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedPointType>) => void;
    };

const DefiningPointSettings = (props: Props) => {
    const {
        coord,
        color: pointColor,
        filled = true,
        label,
        showPoint = "false",
        error,
        onChangeProps,
        onTogglePoint,
    } = props;

    function handleColorChange(newValue) {
        onChangeProps({color: newValue});
    }

    return (
        <LockedFigureSettingsAccordion
            expanded={props.expanded}
            onToggle={props.onToggle}
            containerStyle={styles.container}
            panelStyle={styles.accordionPanel}
            header={
                // Summary: Point, coords, color (filled/open)
                <View style={styles.row}>
                    <LabelLarge>{`${label || "Point"} (${coord[0]}, ${coord[1]})`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    {showPoint && (
                        <ColorSwatch color={pointColor} filled={filled} />
                    )}
                </View>
            }
        >
            {/* Coordinates */}
            <CoordinatePairInput
                coord={coord}
                error={!!error}
                onChange={(newCoords) => {
                    onChangeProps({coord: newCoords});
                }}
            />

            {/* Toggle switch */}
            {onTogglePoint && (
                <LabeledSwitch
                    label="show point on graph"
                    checked={!!showPoint}
                    style={showPoint && styles.spaceUnder}
                    onChange={onTogglePoint}
                />
            )}

            {/* Toggleable section */}
            {showPoint && (
                <>
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
                </>
            )}
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.xSmall_8,
        marginBottom: 0,
        marginLeft: -spacing.xxxSmall_4,
        marginRight: -spacing.xxxSmall_4,
        backgroundColor: wbColor.white,
    },
    accordionPanel: {
        // Need more space since we don't have the actions' margins.
        paddingBottom: spacing.medium_16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
});

export default DefiningPointSettings;
