import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";

import styles from "./line-stroke-select.module.css";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type StyleOptions = "solid" | "dashed";
interface Props {
    selectedValue: StyleOptions;
    onChange: (newValue: StyleOptions) => void;
    containerStyle?: StyleType;
    editingDisabled?: boolean;
}

const LineStrokeSelect = (props: Props) => {
    const {
        selectedValue,
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
                options={{solid: "solid", dashed: "dashed"}}
            />
        </BodyText>
    );
};

export default LineStrokeSelect;
