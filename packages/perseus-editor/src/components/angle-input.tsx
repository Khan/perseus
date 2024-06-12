import * as KAS from "@khanacademy/kas";
import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

const {InfoTip} = components;

const degreeToRadian = (degrees: number) => {
    return (degrees / 180) * Math.PI;
};

type Props = {
    angle: number;
    onChange: (angle: number) => void;
};

const AngleInput = (props: Props) => {
    const {angle, onChange} = props;

    const [angleInput, setAngleInput] = React.useState(angle.toString());
    const [isInDegrees, setIsInDegrees] = React.useState(false);

    function handleAngleChange(newValue, useDegrees = isInDegrees) {
        // Update the local state (update the input field value).
        setAngleInput(newValue);

        try {
            // If the new value is a valid expression, update the props.
            // Save the angle in radians.
            const evaluatedAngle = KAS.parse(newValue).expr.eval();

            if (useDegrees) {
                onChange(degreeToRadian(evaluatedAngle));
            } else {
                onChange(evaluatedAngle);
            }
        } catch (e) {
            // The user likely has not finished typing the expression.
            // Do nothing.
            return;
        }
    }

    function handleAngleTypeChange() {
        // Change the angle based on the new angle type.
        handleAngleChange(angleInput, !isInDegrees);

        // Update the angle to the new type.
        setIsInDegrees((usingDegrees) => !usingDegrees);
    }

    return (
        <View style={[styles.row, styles.spaceUnder]}>
            {/* Label */}
            <LabelMedium tag="label" style={styles.row}>
                angle
                <Strut size={spacing.xxSmall_6} />
                <TextField
                    value={angleInput}
                    onChange={handleAngleChange}
                    style={styles.textField}
                />
            </LabelMedium>

            {/* Spacing */}
            <Strut size={spacing.xxSmall_6} />

            {/* Radian/Degree Toggle */}
            <LabelSmall>radians</LabelSmall>
            <View style={styles.switch}>
                <Switch
                    onChange={handleAngleTypeChange}
                    checked={isInDegrees}
                />
            </View>
            <LabelSmall>degrees</LabelSmall>

            {/* Info Tooltip */}
            <InfoTip>
                <p>
                    The angle of rotation for the ellipse (if the x radius and y
                    radius are different).
                </p>
                <p>Expressions will be evaluted (e.g. "pi/2" or "5pi/4").</p>
            </InfoTip>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    switch: {
        marginLeft: spacing.xxSmall_6,
        marginRight: spacing.xxSmall_6,
    },
    textField: {
        maxWidth: spacing.xxxLarge_64,
    },
});

export default AngleInput;
