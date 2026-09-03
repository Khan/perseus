import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";

import styles from "./start-coords-shared.module.css";

interface AsymptoteInputProps {
    axis: "x" | "y";
    value: number;
    onChange: (value: number) => void;
}

const AsymptoteInput = (props: AsymptoteInputProps) => {
    const {axis, value, onChange} = props;

    function handleChange(newValue: number) {
        onChange(newValue);
    }

    return (
        <BodyText weight="bold" tag="label" className={styles.tileRow}>
            {`Asymptote ${axis} =`}
            <View className={styles["text-field-wrapper"]}>
                <ScrolllessNumberTextField
                    value={value}
                    onChange={handleChange}
                />
            </View>
        </BodyText>
    );
};

export default AsymptoteInput;
