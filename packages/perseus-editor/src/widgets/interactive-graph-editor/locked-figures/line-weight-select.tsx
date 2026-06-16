import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./line-weight-select.module.css";

import type {StrokeWeight} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface Props {
    selectedValue: StrokeWeight;
    onChange: (newValue: StrokeWeight) => void;
    containerStyle?: StyleType;
}

const LineWeightSelect = (props: Props) => {
    const {selectedValue, containerStyle, onChange} = props;

    return (
        <BodyText
            tag="label"
            className={styles.lineWeightSelect}
            style={containerStyle}
        >
            weight
            <SingleSelect
                selectedValue={selectedValue}
                // eslint-disable-next-line no-restricted-syntax
                onChange={(value) => onChange(value as StrokeWeight)}
                // Placeholder is required, but never gets used.
                placeholder=""
            >
                <OptionItem value="thin" label="thin" />
                <OptionItem value="medium" label="medium" />
                <OptionItem value="thick" label="thick" />
            </SingleSelect>
        </BodyText>
    );
};

export default LineWeightSelect;
