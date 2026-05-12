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

    // Local state so the user can type freely without the field resetting
    // mid-keystroke. Pattern from StartCoordsCircle.
    const [textState, setTextState] = React.useState(value.toString());

    // Sync local state when props change (e.g. "Use default start coordinates").
    React.useEffect(() => {
        setTextState(value.toString());
    }, [value]);

    function handleChange(newValue: string) {
        setTextState(newValue);

        // Assume the user is still typing. Don't propagate until a valid number.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        onChange(parseFloat(newValue));
    }

    return (
        <BodyText weight="bold" tag="label" className={styles.row}>
            {`Asymptote ${axis} =`}
            <View className={styles["text-field-wrapper"]} tag="span">
                <ScrolllessNumberTextField
                    value={textState}
                    onChange={handleChange}
                />
            </View>
        </BodyText>
    );
};

export default AsymptoteInput;
