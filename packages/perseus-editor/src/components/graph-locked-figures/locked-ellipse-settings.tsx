import {components, lockedFigureFillStyles} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import AngleInput from "../angle-input";
import CoordinatePairInput from "../coordinate-pair-input";
import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import EllipseSwatch from "./ellipse-swatch";
import LineStrokeSelect from "./line-stroke-select";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";
import type {
    Coord,
    LockedFigureFillType,
    LockedEllipseType,
    LockedFigureColor,
} from "@khanacademy/perseus";

const {InfoTip} = components;

export type Props = LockedFigureSettingsCommonProps &
    LockedEllipseType & {
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedEllipseType>) => void;
    };

const LockedEllipseSettings = (props: Props) => {
    const {
        center,
        radius,
        angle,
        color,
        fillStyle,
        strokeStyle,
        expanded,
        onToggle,
        onChangeProps,
        onMove,
        onRemove,
    } = props;

    function handleColorChange(newValue: LockedFigureColor) {
        onChangeProps({color: newValue});
    }

    return (
        <PerseusEditorAccordion
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
                    style={styles.spaceUnder}
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
                style={styles.spaceUnder}
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
                    style={[styles.row, styles.truncatedWidth]}
                >
                    fill
                    <Strut size={spacing.xxSmall_6} />
                    <SingleSelect
                        selectedValue={fillStyle}
                        onChange={(value: LockedFigureFillType) =>
                            onChangeProps({fillStyle: value})
                        }
                        // Placeholder is required, but never gets used.
                        placeholder=""
                    >
                        {Object.keys(lockedFigureFillStyles).map((option) => (
                            <OptionItem
                                key={option}
                                value={option}
                                label={option}
                            />
                        ))}
                    </SingleSelect>
                </LabelMedium>
            </View>

            {/* Stroke style */}
            <LineStrokeSelect selectedValue={strokeStyle} onChange={(value: "solid" | "dashed") =>
                onChangeProps({strokeStyle: value})
            }/>

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
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    truncatedWidth: {
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },
});

export default LockedEllipseSettings;
