/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSelect from "./color-select";
import ColorSwatch from "./color-swatch";
import LabeledSwitch from "./labeled-switch";
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
            {/* TODO(LEMS-1966): Break out AccordionSection + its styles
                into its own component to remove redundancy across
                locked figure settings. */}
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
                <View
                    style={[
                        styles.accordionPanel,
                        !onRemove && styles.accordionPanelWithoutActions,
                    ]}
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
                            onChange={(newValue) =>
                                handleCoordChange(newValue, 0)
                            }
                            onBlur={handleBlur}
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
                            onChange={(newValue) =>
                                handleCoordChange(newValue, 1)
                            }
                            onBlur={handleBlur}
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
                </View>
            </AccordionSection>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: wbColor.fadedBlue8,
        marginTop: spacing.xSmall_8,
    },
    accordionHeader: {
        padding: spacing.small_12,
        // Don't move the dropdown caret.
        paddingInlineEnd: 0,
        // Fixed height so the addition of the color swatch doesn't
        // change the height of the header when toggling.
        height: spacing.xxLarge_48,
    },
    accordionPanel: {
        paddingTop: spacing.xxSmall_6,
        paddingBottom: spacing.xxxSmall_4,
        paddingLeft: spacing.small_12,
        paddingRight: spacing.small_12,
    },
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
