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
    const [angleType, setAngleType] = React.useState<"degrees" | "radians">(
        "radians",
    );

    function handleAngleChange(newValue) {
        // Update the local state (update the input field value).
        setAngleInput(newValue);

        try {
            // If the new value is a valid expression, update the props.
            // Save the angle in radians.
            const evaluatedAngle = KAS.parse(newValue).expr.eval();

            if (angleType === "degrees") {
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
        // Update the angle to the new type.
        const evaluatedAngle = KAS.parse(angleInput).expr.eval();

        if (angleType === "degrees") {
            // Changed to radians, send the new value (already radian)
            // to the graph.
            onChange(evaluatedAngle);
        } else {
            // Changed to degrees, send the new radian value to on the graph.
            onChange(degreeToRadian(evaluatedAngle));
        }

        setAngleType(angleType === "degrees" ? "radians" : "degrees");
    }

    return (
        <View style={[styles.row, styles.spaceUnder]}>
            {/* Angle */}
            <LabelMedium tag="label">
                <View style={styles.row}>
                    angle
                    <Strut size={spacing.xxSmall_6} />
                    <TextField
                        id=""
                        value={angleInput}
                        onChange={handleAngleChange}
                        style={styles.textField}
                    />
                </View>
            </LabelMedium>
            <Strut size={spacing.xxSmall_6} />
            <View style={styles.row}>
                <LabelSmall>radians</LabelSmall>
                <View style={styles.switch}>
                    <Switch
                        onChange={handleAngleTypeChange}
                        checked={angleType === "degrees"}
                    />
                </View>
                <LabelSmall>degrees</LabelSmall>
            </View>
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
