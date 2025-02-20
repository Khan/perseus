import {lockedFigureColors} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ColorSwatch from "./color-swatch";

import type {LockedFigureColor} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const possibleColors = Object.keys(lockedFigureColors) as LockedFigureColor[];

type Props = {
    selectedValue: LockedFigureColor;
    style?: StyleType;
    onChange: (newColor: LockedFigureColor) => void;
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
                    // TODO(LEMS-2656): remove TS suppression
                    onChange={onChange as any}
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
                        />
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
        // Set minWidth to "auto" to prevent the component from bleeding
        // into the margins. (minWidth is 0 by default.)
        minWidth: "auto",
    },
});

export default ColorSelect;
