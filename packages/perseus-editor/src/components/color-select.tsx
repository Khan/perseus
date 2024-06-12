import {lockedFigureColors} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
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

    return (
        <View style={[styles.row, style]}>
            <LabelMedium tag="label" style={styles.row}>
                color
                <Strut size={spacing.xxSmall_6} />
                <SingleSelect
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
                                <ColorSwatch
                                    color={colorName}
                                    decorative={true}
                                />
                            }
                        >
                            {colorName}
                        </OptionItem>
                    ))}
                </SingleSelect>
            </LabelMedium>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});

export default ColorSelect;
