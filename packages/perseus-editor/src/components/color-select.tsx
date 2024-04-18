import {lockedFigureColors} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorCircle from "./color-circle";

import type {LockedFigureColor} from "@khanacademy/perseus";

const possibleColors = Object.keys(lockedFigureColors) as LockedFigureColor[];

type Props = {
    // Required ID so that the label can be associated with the select.
    id: string;
    selectedValue: LockedFigureColor;
    onChange: (newValue: string) => void;
};

const ColorSelect = (props: Props) => {
    const {id, selectedValue, onChange} = props;

    return (
        <View style={styles.row}>
            <LabelMedium htmlFor={id} style={styles.label} tag="label">
                Color
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
                            <ColorCircle color={colorName} decorative={true} />
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
        marginInlineEnd: spacing.xSmall_8,
    },
});

export default ColorSelect;
