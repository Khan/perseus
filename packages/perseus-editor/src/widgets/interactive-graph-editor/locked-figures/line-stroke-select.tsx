import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";

import styles from "./line-stroke-select.module.css";

import type {LockedFigureStrokeStyle} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Stroke styles offered for boundary figures (lines, functions).
export const lineStrokeStyleOptions = {
    solid: "solid",
    dashed: "dashed",
} as const;

// Fillable figures (polygons, ellipses) may additionally have no stroke.
export const fillableStrokeStyleOptions = {
    solid: "solid",
    dashed: "dashed",
    none: "none",
} as const;

interface Props<T extends LockedFigureStrokeStyle> {
    selectedValue: T;
    onChange: (newValue: T) => void;
    // The stroke styles to offer, keyed by value. Use `lineStrokeStyleOptions`
    // for boundary figures or `fillableStrokeStyleOptions` for fillable ones.
    options: Record<T, string>;
    containerStyle?: StyleType;
    editingDisabled?: boolean;
}

const LineStrokeSelect = <T extends LockedFigureStrokeStyle>(
    props: Props<T>,
) => {
    const {
        selectedValue,
        options,
        containerStyle,
        editingDisabled = false,
        onChange,
    } = props;

    return (
        <BodyText
            tag="label"
            className={styles.lineStrokeSelect}
            style={containerStyle}
        >
            stroke
            <TypedSingleSelect
                selectedValue={selectedValue}
                disabled={editingDisabled}
                onChange={onChange}
                options={options}
            />
        </BodyText>
    );
};

export default LineStrokeSelect;
