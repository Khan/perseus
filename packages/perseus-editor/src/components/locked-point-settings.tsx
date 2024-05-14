/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import LabeledSwitch from "./labeled-switch";
import LockedFigureSettingsAccordion from "./locked-figure-settings-accordion";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";

import type {LockedPointType} from "@khanacademy/perseus";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

export type Props = LockedPointType & {
    label?: string;
    toggled?: boolean;
    style?: StyleType;
    onRemove?: () => void;
    onToggle?: (newValue) => void;
    onChangeProps: (newProps: Partial<LockedPointType>) => void;
};

const LockedPointSettings = (props: Props) => {
    const {
        coord,
        color: pointColor,
        filled = true,
        label,
        toggled = "true",
        style,
        onChangeProps,
        onToggle,
        onRemove,
    } = props;

    // Keep track of the coordinates via state as the user is editing them,
    // before they are updated in the props as a valid number.
    const [coordState, setCoordState] = React.useState([
        // Using strings to make it easier to work with the text fields.
        coord[0].toString(),
        coord[1].toString(),
    ]);

    // Generate unique IDs so that the programmatic labels can be associated
    // with their respective text fields.
    const ids = useUniqueIdWithMock();
    const xCoordId = ids.get("x-coord");
    const yCoordId = ids.get("y-coord");
    const colorSelectId = ids.get("point-color-select");

    function handleCoordChange(newValue, coordIndex) {
        // Update the local state (update the input field value).
        const newCoordState = [...coordState];
        newCoordState[coordIndex] = newValue;
        setCoordState(newCoordState);

        // If the new value is not a number, don't update the props.
        // If it's empty, keep the props the same value instead of setting to 0.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the props (update the graph).
        const newCoords = [...coord] satisfies [number, number];
        newCoords[coordIndex] = +newValue;
        onChangeProps({coord: newCoords});
    }

    function handleColorChange(newValue) {
        onChangeProps({color: newValue});
    }

    return (
        <LockedFigureSettingsAccordion
            containerStyle={style}
            panelStyle={!onRemove && styles.accordionPanelWithoutActions}
            header={
                // Summary: Point, coords, color (filled/open)
                <View style={styles.row}>
                    <LabelLarge>{`${label || "Point"} (${coord[0]}, ${coord[1]})`}</LabelLarge>
                    <Strut size={spacing.xSmall_8} />
                    {toggled && (
                        <ColorSwatch color={pointColor} filled={filled} />
                    )}
                </View>
            }
        >
            {/* Coordinates */}
            <View style={[styles.row, styles.spaceUnder]}>
                <LabelMedium
                    htmlFor={xCoordId}
                    style={styles.label}
                    tag="label"
                >
                    x coord
                </LabelMedium>
                <TextField
                    id={xCoordId}
                    type="number"
                    value={coordState[0]}
                    onChange={(newValue) => handleCoordChange(newValue, 0)}
                    style={styles.textField}
                />
                <Strut size={spacing.medium_16} />
                <LabelMedium
                    htmlFor={yCoordId}
                    style={styles.label}
                    tag="label"
                >
                    y coord
                </LabelMedium>
                <TextField
                    id={yCoordId}
                    type="number"
                    value={coordState[1]}
                    onChange={(newValue) => handleCoordChange(newValue, 1)}
                    style={styles.textField}
                />
            </View>

            {/* Toggle switch */}
            {onToggle && (
                <LabeledSwitch
                    label="show point on graph"
                    checked={!!toggled}
                    style={toggled && styles.spaceUnder}
                    onChange={onToggle}
                />
            )}

            {/* Toggleable section */}
            {toggled && (
                <>
                    <ColorSelect
                        id={colorSelectId}
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

            {/* Actions */}
            {onRemove && (
                <LockedFigureSettingsActions
                    onRemove={onRemove}
                    figureAriaLabel={`locked point at ${coord[0]}, ${coord[1]}`}
                />
            )}
        </LockedFigureSettingsAccordion>
    );
};

const styles = StyleSheet.create({
    accordionPanelWithoutActions: {
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
    label: {
        marginInlineEnd: spacing.xxSmall_6,
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
});

export default LockedPointSettings;
