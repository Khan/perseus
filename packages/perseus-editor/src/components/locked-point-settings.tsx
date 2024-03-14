/**
 * LockedPointSettings is a component that allows the user to edit the
 * settings of specifically a locked point on the graph.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getValidNumberFromString} from "./util";

import type {LockedPoint} from "@khanacademy/perseus";

const possibleColors = [
    "purple",
    "blue",
    "teal",
    "green",
    "gold",
    "red",
    "pink",
];

export type Props = LockedPoint & {
    onRemove: () => void;
    onChangeCoord: (coord: [number, number]) => void;
    onChangeColor: (color: string) => void;
};

const LockedPointSettings = (props: Props) => {
    const {coord, style, onChangeColor, onChangeCoord, onRemove} = props;
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
    const colorSelectId = ids.get("color-select");

    function handleBlur() {
        const validCoord = [
            getValidNumberFromString(coordState[0]),
            getValidNumberFromString(coordState[1]),
        ] as [number, number];

        // Make the text field only show valid numbers after blur.
        setCoordState([validCoord[0].toString(), validCoord[1].toString()]);
        // Update the graph with the new coordinates.
        onChangeCoord(validCoord);
    }

    function handleCoordChange(newValue, coordIndex) {
        const newCoord = [...coordState];
        newCoord[coordIndex] = newValue;
        setCoordState(newCoord);
    }

    return (
        <View style={styles.container}>
            {/* Title row */}
            <View style={styles.row}>
                <LabelLarge>Point</LabelLarge>
                <Spring />
                <IconButton
                    icon={trashIcon}
                    aria-label={`Delete locked point at ${coordState[0]}, ${coordState[1]}`}
                    onClick={onRemove}
                />
            </View>

            {/* Coordinates */}
            <View>
                <View style={styles.row}>
                    <LabelMedium
                        htmlFor={xCoordId}
                        style={styles.label}
                        tag="label"
                    >
                        x Coordinate
                    </LabelMedium>
                    <TextField
                        id={xCoordId}
                        value={coordState[0]}
                        onChange={(newValue) => handleCoordChange(newValue, 0)}
                        onBlur={handleBlur}
                        style={styles.textField}
                    />
                </View>

                <View style={styles.row}>
                    <LabelMedium
                        htmlFor={yCoordId}
                        style={styles.label}
                        tag="label"
                    >
                        y Coordinate
                    </LabelMedium>
                    <TextField
                        id={yCoordId}
                        value={coordState[1]}
                        onChange={(newValue) => handleCoordChange(newValue, 1)}
                        onBlur={handleBlur}
                        style={styles.textField}
                    />
                </View>
            </View>

            {/* Color */}
            <View style={styles.row}>
                <LabelMedium
                    htmlFor={colorSelectId}
                    style={styles.label}
                    tag="label"
                >
                    Color
                </LabelMedium>
                <SingleSelect
                    id={colorSelectId}
                    selectedValue={style?.fill || "blue"}
                    onChange={onChangeColor}
                    // Placeholder is required, but never gets used.
                    placeholder=""
                >
                    {possibleColors.map((colorName) => (
                        <OptionItem
                            key={colorName}
                            value={colorName}
                            label={colorName}
                            leftAccessory={
                                <View
                                    style={[
                                        styles.colorCircle,
                                        {backgroundColor: color[colorName]},
                                    ]}
                                />
                            }
                        >
                            {colorName}
                        </OptionItem>
                    ))}
                </SingleSelect>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.fadedBlue8,
        marginBottom: spacing.xSmall_8,
        padding: spacing.medium_16,
        borderRadius: spacing.xSmall_8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.xSmall_8,
    },
    label: {
        marginInlineEnd: spacing.xSmall_8,
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
    colorCircle: {
        // Add a white border so that the color circle is visible when
        // the dropdown option is highlighted with its blue background.
        border: `2px solid ${color.offWhite}`,
        borderRadius: "50%",
        width: spacing.large_24,
        height: spacing.large_24,
    },
});

export default LockedPointSettings;
