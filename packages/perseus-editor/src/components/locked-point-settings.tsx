/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import LockedFigureSettingsActions from "./locked-figure-settings-actions";
import {getValidNumberFromString} from "./util";

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
    // before they are updated in the props on blur.
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
    const showPointToggleId = ids.get("show-point-toggle");

    function handleBlur() {
        const validCoord = [
            getValidNumberFromString(coordState[0]),
            getValidNumberFromString(coordState[1]),
        ] as [number, number];

        // Make the text field only show valid numbers after blur.
        setCoordState([validCoord[0].toString(), validCoord[1].toString()]);
        // Update the graph with the new coordinates.
        onChangeProps({coord: validCoord});
    }

    function handleCoordChange(newValue, coordIndex) {
        const newCoord = [...coordState];
        newCoord[coordIndex] = newValue;
        setCoordState(newCoord);
    }

    function handleColorChange(newValue) {
        onChangeProps({color: newValue});
    }

    return (
        <View
            // More specificity so that we can override the default
            // .heading > h2 > .header styles from the articles.less
            // file (which is imported in perseus-renderer.less).
            className="locked-figure-accordion"
        >
            <AccordionSection
                style={[styles.container, style]}
                headerStyle={styles.accordionHeader}
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
                <View style={styles.accordionPanel}>
                    {/* Coordinates */}
                    <View style={styles.row}>
                        <View style={[styles.row, styles.spaceUnder]}>
                            <LabelMedium
                                htmlFor={xCoordId}
                                style={styles.label}
                                tag="label"
                            >
                                x Coord
                            </LabelMedium>
                            <TextField
                                id={xCoordId}
                                type="number"
                                value={coordState[0]}
                                onChange={(newValue) =>
                                    handleCoordChange(newValue, 0)
                                }
                                onBlur={handleBlur}
                                style={styles.textField}
                            />
                        </View>
                        <Strut size={spacing.medium_16} />
                        <View style={[styles.row, styles.spaceUnder]}>
                            <LabelMedium
                                htmlFor={yCoordId}
                                style={styles.label}
                                tag="label"
                            >
                                y Coord
                            </LabelMedium>
                            <TextField
                                id={yCoordId}
                                type="number"
                                value={coordState[1]}
                                onChange={(newValue) =>
                                    handleCoordChange(newValue, 1)
                                }
                                onBlur={handleBlur}
                                style={styles.textField}
                            />
                        </View>
                    </View>

                    {/* Toggle switch */}
                    {onToggle && (
                        <View style={[styles.row, styles.spaceUnder]}>
                            <Switch
                                id={showPointToggleId}
                                checked={!!toggled}
                                onChange={onToggle}
                            />
                            <Strut size={spacing.small_12} />
                            <LabelMedium
                                tag="label"
                                htmlFor={showPointToggleId}
                            >
                                Show point on graph
                            </LabelMedium>
                        </View>
                    )}

                    {/* Toggleable section */}
                    {toggled && (
                        <>
                            <ColorSelect
                                id={colorSelectId}
                                selectedValue={pointColor}
                                onChange={handleColorChange}
                            />
                            <Strut size={spacing.xSmall_8} />
                            <Checkbox
                                label="Open point"
                                checked={!filled}
                                onChange={(newValue) => {
                                    onChangeProps({filled: !newValue});
                                }}
                                style={styles.spaceUnder}
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
                </View>
            </AccordionSection>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: wbColor.fadedBlue8,
        marginBottom: spacing.small_12,
    },
    accordionHeader: {
        paddingTop: spacing.small_12,
        paddingBottom: spacing.small_12,
        paddingInlineStart: spacing.medium_16,
        // Fixed height so the addition of the color swatch doesn't
        // change the height of the header when toggling.
        height: spacing.xxLarge_48,
    },
    accordionPanel: {
        padding: spacing.medium_16,
        paddingBottom: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    spaceUnder: {
        marginBottom: spacing.xSmall_8,
    },
    label: {
        marginInlineEnd: spacing.xSmall_8,
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
});

export default LockedPointSettings;
