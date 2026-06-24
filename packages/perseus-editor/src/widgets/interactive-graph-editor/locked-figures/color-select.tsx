import {lockedFigureColorNames} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./color-select.module.css";
import ColorSwatch from "./color-swatch";

import type {LockedFigureColor} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Get all the possible colors to put in the dropdown, except for "blurple",
// which is reserved for spotlights.
const possibleColors: Exclude<LockedFigureColor, "blurple">[] =
    lockedFigureColorNames.filter((color) => color !== "blurple");

interface Props {
    selectedValue: LockedFigureColor;
    style?: StyleType;
    editingDisabled?: boolean;
    onChange: (newColor: LockedFigureColor) => void;
}

const ColorSelect = (props: Props) => {
    const {selectedValue, style, editingDisabled = false, onChange} = props;

    return (
        <View className={styles.row} style={style}>
            <BodyText tag="label" className={styles.row}>
                color
                <SingleSelect
                    selectedValue={selectedValue}
                    disabled={editingDisabled}
                    // TODO(LEMS-2656): remove TS suppression
                    // eslint-disable-next-line no-restricted-syntax
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
            </BodyText>
        </View>
    );
};

export default ColorSelect;
