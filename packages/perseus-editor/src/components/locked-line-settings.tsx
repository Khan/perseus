/**
 * LockedLineSettings is a component that allows the user to edit the
 * settings of specifically a locked line on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import LockedPointSettings from "./locked-point-settings";

import type {
    LockedFigure,
    LockedFigureColor,
    LockedLineType,
    LockedPointType,
} from "@khanacademy/perseus";

export type Props = LockedLineType & {
    onRemove: () => void;
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
        onRemove,
    } = props;
    const [point1, point2] = points;

    // Generate unique IDs so that the programmatic labels can be associated
    // with their respective text fields.
    const ids = useUniqueIdWithMock();
    const kindSelectId = ids.get("line-kind-select");
    const colorSelectId = ids.get("line-color-select");
    const styleSelectId = ids.get("line-style-select");

    const capitalizeKind = kind.charAt(0).toUpperCase() + kind.slice(1);
    const lineLabel = `${capitalizeKind} (${point1.coord[0]},
        ${point1.coord[1]}), (${point2.coord[0]}, ${point2.coord[1]})`;

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
        <LockedFigureSettingsAccordion
            header={
                <View style={styles.row}>
                    <LabelLarge>{lineLabel}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <ColorSwatch color={lineColor} />
                </View>
            }
        >
            {/* Line kind settings */}
            <View style={[styles.row, styles.spaceUnder]}>
                <LabelMedium
                    htmlFor={kindSelectId}
                    style={styles.label}
                    tag="label"
                >
                    kind
                </LabelMedium>
                <SingleSelect
                    id={kindSelectId}
                    selectedValue={kind}
                    onChange={(value: "line" | "segment" | "ray") =>
                        onChangeProps({kind: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="line" label="line" />
                    <OptionItem value="segment" label="segment" />
                    <OptionItem value="ray" label="ray" />
                </SingleSelect>
            </View>

            <View style={[styles.row, styles.spaceUnder]}>
                {/* Line color settings */}
                <ColorSelect
                    id={colorSelectId}
                    selectedValue={lineColor}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.small_12} />

                {/* Line style settings */}
                <View style={styles.row}>
                    <LabelMedium
                        htmlFor={styleSelectId}
                        style={styles.label}
                        tag="label"
                    >
                        style
                    </LabelMedium>
                    <SingleSelect
                        id={styleSelectId}
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
                </View>
            </View>

            {/* Defining points settings */}
            <LockedPointSettings
                label="Point 1"
                toggled={showPoint1}
                {...point1}
                onToggle={(newValue) => onChangeProps({showPoint1: newValue})}
                onChangeProps={(newProps) => handleChangePoint(newProps, 0)}
                style={styles.lockedPointSettingsContainer}
            />
            <LockedPointSettings
                label="Point 2"
                toggled={showPoint2}
                {...point2}
                onToggle={(newValue) => onChangeProps({showPoint2: newValue})}
                onChangeProps={(newProps) => handleChangePoint(newProps, 1)}
                style={styles.lockedPointSettingsContainer}
            />

            {/* Actions */}
            <LockedFigureSettingsActions
                onRemove={onRemove}
                figureAriaLabel={`locked line defined by
                    ${point1.coord[0]}, ${point1.coord[1]} and
                    ${point2.coord[0]}, ${point2.coord[1]}.`}
            />
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    lockedPointSettingsContainer: {
        marginTop: spacing.xSmall_8,
        marginBottom: 0,
        marginLeft: -spacing.xxxSmall_4,
        marginRight: -spacing.xxxSmall_4,
        backgroundColor: wbColor.white,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    label: {
        marginInlineEnd: spacing.xxxSmall_4,
    },
    selectMarginOffset: {
        // Align with the point settings accordions.
        marginInlineEnd: -spacing.xxxSmall_4,
    },
});

export default LockedLineSettings;
