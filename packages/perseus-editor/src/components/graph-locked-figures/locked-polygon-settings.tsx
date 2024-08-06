import {
    lockedFigureFillStyles,
    type Coord,
    type LockedFigureFillType,
    type LockedPolygonType,
    type LockedFigureColor,
} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing, color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import minusCircle from "@phosphor-icons/core/regular/minus-circle.svg";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import CoordinatePairInput from "../coordinate-pair-input";
import PerseusEditorAccordion from "../perseus-editor-accordion";

import ColorSelect from "./color-select";
import LabeledSwitch from "./labeled-switch";
import LineStrokeSelect from "./line-stroke-select";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import PolygonSwatch from "./polygon-swatch";

import type {LockedFigureSettingsCommonProps} from "./locked-figure-settings";

export type Props = LockedFigureSettingsCommonProps &
    LockedPolygonType & {
        /**
         * Called when the props (coords, color, etc.) are updated.
         */
        onChangeProps: (newProps: Partial<LockedPolygonType>) => void;
    };

const LockedPolygonSettings = (props: Props) => {
    const {
        points,
        color,
        showVertices,
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
                // Summary: Polygon, number of sides, style swatch
                <View style={styles.row}>
                    <LabelLarge>{`Polygon, ${points.length} sides`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    <PolygonSwatch
                        color={color}
                        fillStyle={fillStyle}
                        strokeStyle={strokeStyle}
                    />
                </View>
            }
        >
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

            {/* Show vertices switch */}
            <LabeledSwitch
                label="show vertices"
                checked={showVertices}
                onChange={(newValue: boolean) =>
                    onChangeProps({showVertices: newValue})
                }
                style={styles.spaceUnder}
            />

            <PerseusEditorAccordion
                header={<LabelLarge>Points</LabelLarge>}
                expanded={true}
                containerStyle={styles.pointAccordionContainer}
                panelStyle={styles.pointAccordionPanel}
            >
                {points.map((point, index) => {
                    const pointLabel = String.fromCharCode(65 + index);

                    return (
                        <View
                            key={`locked-polygon-point-${point[0]}-${point[1]}-index-${index}`}
                            style={[styles.row, styles.spaceUnder]}
                        >
                            {/* Give the points alphabet labels */}
                            <LabelLarge>{`${pointLabel}:`}</LabelLarge>
                            <Strut size={spacing.medium_16} />
                            <CoordinatePairInput
                                coord={point}
                                labels={["x", "y"]}
                                onChange={(newValue: Coord) => {
                                    const newPoints = [...points];
                                    newPoints[index] = newValue;
                                    props.onChangeProps({points: newPoints});
                                }}
                            />
                            {
                                // Only show the minus (delete) buttons if there are
                                // more than 3 points. 3 points is the minimum number
                                // of points for a polygon (triangle).
                                points.length > 3 && (
                                    <IconButton
                                        aria-label={`Delete polygon point ${pointLabel}`}
                                        icon={minusCircle}
                                        color="destructive"
                                        onClick={() => {
                                            const newPoints = [...points];
                                            newPoints.splice(index, 1);
                                            props.onChangeProps({
                                                points: newPoints,
                                            });
                                        }}
                                        style={styles.icon}
                                    />
                                )
                            }
                        </View>
                    );
                })}
                <Button
                    kind="tertiary"
                    startIcon={plusCircle}
                    onClick={() => {
                        props.onChangeProps({
                            points: [...points, [0, 0]],
                        });
                    }}
                >
                    Add point
                </Button>
            </PerseusEditorAccordion>

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
    pointAccordionContainer: {
        backgroundColor: wbColor.white,
    },
    pointAccordionPanel: {
        alignItems: "start",
    },
    icon: {
        marginInlineStart: spacing.xxxSmall_4,
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    truncatedWidth: {
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },
});

export default LockedPolygonSettings;
