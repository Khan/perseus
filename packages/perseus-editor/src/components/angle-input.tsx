import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ScrolllessNumberTextField from "./scrollless-number-text-field";
import {degreeToRadian, radianToDegree} from "./util";

type Props = {
    angle: number;
    onChange: (angle: number) => void;
};

const AngleInput = (props: Props) => {
    const {angle, onChange} = props;

    const [angleInput, setAngleInput] = React.useState(
        radianToDegree(angle).toString(),
    );

    function handleAngleChange(newValue) {
        // Update the local state (update the input field value).
        setAngleInput(newValue);

        // If the new value is not a number, don't update the props.
        // If it's empty, keep the props the same value instead of setting to 0.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the graph.
        onChange(degreeToRadian(newValue));
    }

    return (
        <LabelMedium tag="label" style={styles.row}>
            angle (degrees)
            <Strut size={spacing.xxSmall_6} />
            <ScrolllessNumberTextField
                value={angleInput}
                onChange={handleAngleChange}
                style={styles.textField}
            />
            <Strut size={spacing.xxSmall_6} />
        </LabelMedium>
    );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        width: spacing.xxxLarge_64,
    },
});

export default AngleInput;
