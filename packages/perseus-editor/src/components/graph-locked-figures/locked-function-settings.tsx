/**
 * LockedFunctionSettings is a component that allows the user to edit the
 * settings of specifically a locked function on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import LineStyleSelect from "./line-style-select";
import LineSwatch from "./line-swatch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {StyleOptions} from "./line-style-select";
import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {LockedFigureColor, LockedFunctionType} from "@khanacademy/perseus";

export type Props = LockedFunctionType &
    LockedFigureSettingsCommonProps & {
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFunctionType>) => void;
    };

export const LockedFunctionSettings = (props: Props) => {
    const {
        color: lineColor,
        strokeStyle,
        equation,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const lineLabel = `Function (<tbd>)`;

    function handleColorChange(newColor: LockedFigureColor) {
        onChangeProps({
            color: newColor,
        });
    }

    function handleStyleChange(newStyle: StyleOptions) {
        onChangeProps({
            strokeStyle: newStyle,
        });
    }

    function handleEquationChange(newEquation: string) {
        onChangeProps({
            equation: newEquation,
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
                    <LineSwatch color={lineColor} lineStyle={strokeStyle} />
                </View>
            }
        >
            <View style={[styles.row, styles.spaceUnder]}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.small_12} />

                {/* Line style settings */}
                <LineStyleSelect
                    selectedValue={strokeStyle}
                    onChange={handleStyleChange}
                />
            </View>

            <LabelMedium tag="label" style={[styles.row, styles.equationRow]}>
                {"equation:"}
                <TextField
                    type="text"
                    value={equation}
                    onChange={handleEquationChange}
                    style={[styles.textField]}
                />
            </LabelMedium>

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
    equationRow: {
        marginTop: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        width: "100%",
    },
});

export default LockedFunctionSettings;
