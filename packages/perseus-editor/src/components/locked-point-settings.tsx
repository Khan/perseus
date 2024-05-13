/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import * as KAS from "@khanacademy/kas";
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

    const initialCoordStrings = [
        // Using strings to make it easier to work with the text fields.
        coord[0].toString(),
        coord[1].toString(),
    ];

    // Keep track of the coordinates via state as the user is editing them,
    // before they are updated in the props as a valid number.
    const [coordState, setCoordState] = React.useState(initialCoordStrings);
    const [summaryCoord, setSummaryCoord] = React.useState(initialCoordStrings);

    // Generate unique IDs so that the programmatic labels can be associated
    // with their respective text fields.
    const ids = useUniqueIdWithMock();
    const xCoordId = ids.get("x-coord");
    const yCoordId = ids.get("y-coord");
    const colorSelectId = ids.get("point-color-select");

    function handleCoordChange(newValue, coordIndex) {
        const newCoord = [...coordState];
        newCoord[coordIndex] = newValue;
        // String, may or may not be a fully parsed number.
        setCoordState(newCoord);

        try {
            const newCoordNum = KAS.parse(newValue).expr.eval();

            if (
                isNaN(newCoordNum) ||
                newCoordNum === Infinity ||
                newCoordNum === -Infinity
            ) {
                return;
            }

            // Valid number
            if (newValue !== "") {
                const newCoordProps = [...coord] satisfies [number, number];
                newCoordProps[coordIndex] = newCoordNum;
                // Valid demical number
                onChangeProps({coord: newCoordProps});
                // Valid fraction string
                setSummaryCoord(newCoord);
            }
        } catch (e) {
            // Invalid expression
            return;
        }
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
                    <LabelLarge>{`${label || "Point"} (${summaryCoord[0]}, ${summaryCoord[1]})`}</LabelLarge>
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
                    figureAriaLabel={`locked point at ${coordState[0]}, ${coordState[1]}`}
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
