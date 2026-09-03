import {angles} from "@khanacademy/kmath";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ScrolllessNumberTextField from "./scrollless-number-text-field";

const {convertDegreesToRadians, convertRadiansToDegrees} = angles;

type Props = {
    angle: number;
    onChange: (angle: number) => void;
};

const AngleInput = (props: Props) => {
    const {angle, onChange} = props;

    function handleAngleChange(newValue) {
        // If the new value is not a number, don't update the props.
        // If it's empty, keep the props the same value instead of setting to 0.
        if (isNaN(+newValue) || newValue === "") {
            return;
        }

        // Update the graph.
        onChange(convertDegreesToRadians(newValue));
    }

    return (
        <BodyText tag="label" style={styles.row}>
            angle (degrees)
            <Strut size={spacing.xxSmall_6} />
            <ScrolllessNumberTextField
                value={String(convertRadiansToDegrees(angle))}
                onChange={handleAngleChange}
                style={styles.textField}
            />
            <Strut size={spacing.xxSmall_6} />
        </BodyText>
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
