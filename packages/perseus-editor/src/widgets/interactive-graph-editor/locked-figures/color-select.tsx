import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";

import styles from "./color-select.module.css";
import ColorSwatch from "./color-swatch";

import type {LockedFigureColor} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface Props {
    selectedValue: LockedFigureColor;
    style?: StyleType;
    editingDisabled?: boolean;
    onChange: (newColor: LockedFigureColor) => void;
}

const ColorSelect = (props: Props) => {
    const {selectedValue, style, editingDisabled = false, onChange} = props;

    function option(color: LockedFigureColor) {
        return {
            label: color,
            leftAccessory: <ColorSwatch color={color} decorative />,
        };
    }

    return (
        <View className={styles.row} style={style}>
            <BodyText tag="label" className={styles.row}>
                color
                <TypedSingleSelect
                    selectedValue={selectedValue}
                    disabled={editingDisabled}
                    onChange={onChange}
                    options={{
                        blue: option("blue"),
                        gold: option("gold"),
                        green: option("green"),
                        grayH: option("grayH"),
                        purple: option("purple"),
                        pink: option("pink"),
                        red: option("red"),
                    }}
                    // Placeholder is required, but never gets used.
                    placeholder=""
                />
            </BodyText>
        </View>
    );
};

export default ColorSelect;
