import {components, lockedEllipseFillStyles} from "@khanacademy/perseus";
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import AngleInput from "./angle-input";
import ColorSelect from "./color-select";
import CoordinatePairInput from "./coordinate-pair-input";
import EllipseSwatch from "./ellipse-swatch";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedEllipseFillType,
    LockedEllipseType,
    LockedFigureColor,
} from "@khanacademy/perseus";

const {InfoTip} = components;

export type Props = LockedFigureSettingsCommonProps & LockedEllipseType;

const LockedEllipseSettings = (props: Props) => {
    const {
        center,
        radius,
        angle,
        color,
        fillStyle,
        strokeStyle,
        expanded,
        range,
        onToggle,
        onChangeProps,
        onRemove,
    } = props;

    const ids = useUniqueIdWithMock();
    const strokeSelectId = ids.get("stroke-style-select");
    const fillSelectId = ids.get("fill-style-select");

    function handleColorChange(newValue: LockedFigureColor) {
        onChangeProps({color: newValue});
    }

    return (
        <LockedFigureSettingsAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                // Summary: Ellipse, center, radius, color (opacity, dashed)
                <View style={styles.row}>
                    <LabelLarge>{`Ellipse (${center[0]}, ${center[1]}), radius ${radius[0]}, ${radius[1]}`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <EllipseSwatch
                        color={props.color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
            {/* Center point */}
            <View style={styles.row}>
                <CoordinatePairInput
                    coord={center}
                    range={range}
                    onChange={(newCoords: Coord) =>
                        onChangeProps({center: newCoords})
                    }
                />
                <View style={styles.spaceUnder}>
                    <InfoTip>
                        The coordinates for the center of the ellipse.
                    </InfoTip>
                </View>
            </View>

            {/* Radius */}
            <CoordinatePairInput
                coord={radius}
                labels={["x radius", "y radius"]}
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
            <Strut size={spacing.xSmall_8} />

            <View style={[styles.row, styles.spaceUnder]}>
                {/* Color */}
                <ColorSelect
                    selectedValue={color}
                    onChange={handleColorChange}
                />
                <Strut size={spacing.medium_16} />

                {/* Fill opacity */}
                <LabelMedium
                    tag="label"
                    htmlFor={fillSelectId}
                    style={styles.label}
                >
                    fill
                </LabelMedium>
                <SingleSelect
                    id={fillSelectId}
                    selectedValue={fillStyle}
                    onChange={(value: LockedEllipseFillType) =>
                        onChangeProps({fillStyle: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    {Object.keys(lockedEllipseFillStyles).map((option) => (
                        <OptionItem key={option} value={option} label={option}>
                            {option}
                        </OptionItem>
                    ))}
                </SingleSelect>
            </View>

            {/* Stroke style */}
            <View style={styles.row}>
                <LabelMedium
                    tag="label"
                    htmlFor={strokeSelectId}
                    style={styles.label}
                >
                    stroke
                </LabelMedium>
                <SingleSelect
                    id={strokeSelectId}
                    selectedValue={strokeStyle}
                    onChange={(value: "solid" | "dashed") =>
                        onChangeProps({strokeStyle: value})
                    }
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    <OptionItem value="solid" label="solid">
                        solid
                    </OptionItem>
                    <OptionItem value="dashed" label="dashed">
                        dashed
                    </OptionItem>
                </SingleSelect>
            </View>

            {/* Actions */}
            <LockedFigureSettingsActions
                onRemove={onRemove}
                figureAriaLabel={`locked ellipse at ${center[0]}, ${center[1]}`}
            />
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginInlineEnd: spacing.xxSmall_6,
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
});

export default LockedEllipseSettings;
