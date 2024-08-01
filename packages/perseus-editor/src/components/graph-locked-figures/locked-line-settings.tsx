/**
 * LockedLineSettings is a component that allows the user to edit the
 * settings of specifically a locked line on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {vector as kvector} from "@khanacademy/kmath";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import DefiningPointSettings from "./defining-point-settings";
import LineSwatch from "./line-swatch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    LockedFigure,
    LockedFigureColor,
    LockedLineType,
    LockedPointType,
} from "@khanacademy/perseus";

const lengthZeroStr = "The line cannot have length 0.";

export type Props = LockedLineType &
    LockedFigureSettingsCommonProps & {
        /**
         * Called when the props (points, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedFigure>) => void;
    };

const LockedLineSettings = (props: Props) => {
    const {
        kind,
        points,
        color: lineColor,
        lineStyle = "solid",
        showPoint1,
        showPoint2,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const [point1, point2] = points;

    const capitalizeKind = kind.charAt(0).toUpperCase() + kind.slice(1);
    const lineLabel = `${capitalizeKind} (${point1.coord[0]},
        ${point1.coord[1]}), (${point2.coord[0]}, ${point2.coord[1]})`;

    // Check if the line has length 0.
    const isInvalid = kvector.equal(point1.coord, point2.coord);

    function handleChangePoint(
        newPointProps: Partial<LockedPointType>,
        index: 0 | 1,
    ) {
        const newPoints = [...points] as [LockedPointType, LockedPointType];
        newPoints[index] = {
            ...points[index],
            ...newPointProps,
        };
        onChangeProps({
            points: newPoints,
        });
    }

    function handleColorChange(newColor: LockedFigureColor) {
        onChangeProps({
            color: newColor,
            // Keep the line's points' colors in sync with the line color.
            points: [
                {
                    ...point1,
                    color: newColor,
                },
                {
                    ...point2,
                    color: newColor,
                },
            ],
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
                    <LineSwatch color={lineColor} lineStyle={lineStyle} />
                </View>
            }
        >
            {/* Line kind settings */}
            <LabelMedium tag="label" style={[styles.row, styles.spaceUnder]}>
                kind
                <Strut size={spacing.xxxSmall_4} />
                <SingleSelect
                    selectedValue={kind}
                    onChange={(value: "line" | "segment" | "ray") =>
                        onChangeProps({kind: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="line" label="line" />
                    <OptionItem value="ray" label="ray" />
                    <OptionItem value="segment" label="segment" />
                </SingleSelect>
            </LabelMedium>

            <View style={styles.row}>
                {/* Line color settings */}
                <ColorSelect
                    selectedValue={lineColor}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.small_12} />

                {/* Line style settings */}
                <LabelMedium
                    tag="label"
                    style={[styles.row, styles.truncatedWidth]}
                >
                    style
                    <Strut size={spacing.xxxSmall_4} />
                    <SingleSelect
                        selectedValue={lineStyle}
                        onChange={(value: "solid" | "dashed") =>
                            onChangeProps({lineStyle: value})
                        }
                        // Placeholder is required, but never gets used.
                        placeholder=""
                        style={styles.selectMarginOffset}
                    >
                        <OptionItem value="solid" label="solid" />
                        <OptionItem value="dashed" label="dashed" />
                    </SingleSelect>
                </LabelMedium>
            </View>

            {/* Points error message */}
            {isInvalid && (
                <LabelMedium style={styles.errorText}>
                    {lengthZeroStr}
                </LabelMedium>
            )}

            {/* Defining points settings */}
            <DefiningPointSettings
                label="Point 1"
                showPoint={showPoint1}
                error={isInvalid ? lengthZeroStr : null}
                {...point1}
                onTogglePoint={(newValue) =>
                    onChangeProps({showPoint1: newValue})
                }
                onChangeProps={(newProps) => handleChangePoint(newProps, 0)}
            />
            <DefiningPointSettings
                label="Point 2"
                showPoint={showPoint2}
                error={isInvalid ? lengthZeroStr : null}
                {...point2}
                onTogglePoint={(newValue) =>
                    onChangeProps({showPoint2: newValue})
                }
                onChangeProps={(newProps) => handleChangePoint(newProps, 1)}
            />

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
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    selectMarginOffset: {
        // Align with the point settings accordions.
        marginInlineEnd: -spacing.xxxSmall_4,
    },
    errorText: {
        color: wbColor.red,
    },
    truncatedWidth: {
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },
});

export default LockedLineSettings;
