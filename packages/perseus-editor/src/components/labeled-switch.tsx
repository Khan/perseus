import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

const typographyMap = {small: LabelSmall, medium: LabelMedium};

type Props = {
    label: string;
    checked: boolean;
    labelSide?: "start" | "end";
    size?: "small" | "medium";
    style?: StyleType;
    onChange: (newValue: boolean) => void;
};

const LabeledSwitch = (props: Props) => {
    const {
        checked,
        label,
        labelSide = "end",
        size = "medium",
        style,
        onChange,
    } = props;
    const Typography = typographyMap[size];
    const switchId = useId();

    const labelElement = (
        <Typography tag="label" htmlFor={switchId}>
            {label}
        </Typography>
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
            <Switch id={switchId} checked={checked} onChange={onChange} />
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
