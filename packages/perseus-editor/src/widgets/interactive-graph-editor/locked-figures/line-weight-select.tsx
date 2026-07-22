import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";

import styles from "./line-weight-select.module.css";

import type {SelectOptions} from "../../../components/typed-single-select";
import type {StrokeWeight} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface Props {
    selectedValue: StrokeWeight;
    onChange: (newValue: StrokeWeight) => void;
    containerStyle?: StyleType;
    editingDisabled?: boolean;
}

const LineWeightSelect = (props: Props) => {
    const {
        selectedValue,
        containerStyle,
        editingDisabled = false,
        onChange,
    } = props;

    return (
        <BodyText
            tag="label"
            className={styles.lineWeightSelect}
            style={containerStyle}
        >
            weight
            <TypedSingleSelect
                selectedValue={selectedValue}
                disabled={editingDisabled}
                onChange={onChange}
                options={
                    {
                        thin: "thin",
                        medium: "medium",
                        thick: "thick",
                    } satisfies SelectOptions<StrokeWeight>
                }
            />
        </BodyText>
    );
};

export default LineWeightSelect;
