import {lockedFigureColors} from "@khanacademy/perseus";
import {View, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSwatch from "./color-swatch";

import type {LockedFigureColor} from "@khanacademy/perseus";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const possibleColors = Object.keys(lockedFigureColors) as LockedFigureColor[];

type Props = {
    selectedValue: LockedFigureColor;
    style?: StyleType;
    onChange: (newValue: string) => void;
};

const ColorSelect = (props: Props) => {
    const {selectedValue, style, onChange} = props;

    const ids = useUniqueIdWithMock();
    const id = ids.get("color-select");

    return (
        <View style={[styles.row, style]}>
            <LabelMedium htmlFor={id} style={styles.label} tag="label">
                color
            </LabelMedium>
            <SingleSelect
                id={id}
                selectedValue={selectedValue}
                onChange={onChange}
                // Placeholder is required, but never gets used.
                placeholder=""
            >
                {possibleColors.map((colorName) => (
                    <OptionItem
                        key={colorName}
                        value={colorName}
                        label={colorName}
                        leftAccessory={
                            <ColorSwatch color={colorName} decorative={true} />
                        }
                    >
                        {colorName}
                    </OptionItem>
                ))}
            </SingleSelect>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginInlineEnd: spacing.xxxSmall_4,
    },
});

export default ColorSelect;
