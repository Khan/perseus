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

// Each color's label is its name, shown alongside a swatch of that color.
// This is written as an explicit record (rather than mapped from
// `lockedFigureColorNames`) so TypeScript proves every color is covered.
const colorOptions: Record<
    LockedFigureColor,
    {label: string; leftAccessory: React.ReactNode}
> = {
    blue: {
        label: "blue",
        leftAccessory: <ColorSwatch color="blue" decorative />,
    },
    gold: {
        label: "gold",
        leftAccessory: <ColorSwatch color="gold" decorative />,
    },
    green: {
        label: "green",
        leftAccessory: <ColorSwatch color="green" decorative />,
    },
    grayH: {
        label: "grayH",
        leftAccessory: <ColorSwatch color="grayH" decorative />,
    },
    purple: {
        label: "purple",
        leftAccessory: <ColorSwatch color="purple" decorative />,
    },
    pink: {
        label: "pink",
        leftAccessory: <ColorSwatch color="pink" decorative />,
    },
    red: {label: "red", leftAccessory: <ColorSwatch color="red" decorative />},
};

const ColorSelect = (props: Props) => {
    const {selectedValue, style, editingDisabled = false, onChange} = props;

    return (
        <View className={styles.row} style={style}>
            <BodyText tag="label" className={styles.row}>
                color
                <TypedSingleSelect<LockedFigureColor>
                    selectedValue={selectedValue}
                    disabled={editingDisabled}
                    onChange={onChange}
                    options={colorOptions}
                    // Placeholder is required, but never gets used.
                    placeholder=""
                />
            </BodyText>
        </View>
    );
};

export default ColorSelect;
