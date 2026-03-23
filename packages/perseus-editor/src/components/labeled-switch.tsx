import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    label: string;
    checked: boolean;
    labelSide?: "start" | "end";
    size?: "small" | "medium";
    style?: StyleType;
    disabled?: boolean;
    onChange: (newValue: boolean) => void;
};

const LabeledSwitch = (props: Props) => {
    const {
        checked,
        label,
        labelSide = "end",
        size = "medium",
        style,
        disabled = false,
        onChange,
    } = props;
    const switchId = useId();

    const labelElement = (
        <BodyText
            size={size === "small" ? "small" : undefined}
            tag="label"
            htmlFor={switchId}
        >
            {label}
        </BodyText>
    );

    const strut = <Strut size={spacing.xSmall_8} />;

    return (
        <View style={[styles.row, style]}>
            {labelSide === "start" && (
                <>
                    {labelElement}
                    {strut}
                </>
            )}
            <Switch
                id={switchId}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            {labelSide === "end" && (
                <>
                    {strut}
                    {labelElement}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default LabeledSwitch;
