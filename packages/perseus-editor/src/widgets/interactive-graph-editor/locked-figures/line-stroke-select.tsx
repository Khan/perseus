import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

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
            <SingleSelect
                selectedValue={selectedValue}
                disabled={editingDisabled}
                // eslint-disable-next-line no-restricted-syntax
                onChange={onChange as any}
                // Placeholder is required, but never gets used.
                placeholder=""
            >
                <OptionItem value="solid" label="solid" />
                <OptionItem value="dashed" label="dashed" />
            </SingleSelect>
        </BodyText>
    );
};

export default LineStrokeSelect;
