import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Switch from "@khanacademy/wonder-blocks-switch";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useId} from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    label: string;
    checked: boolean;
    style?: StyleType;
    onChange: (newValue: boolean) => void;
};

const LabeledSwitch = (props: Props) => {
    const {checked, label, style, onChange} = props;

    const switchId = useId();
    return (
        <View style={[styles.row, style]}>
            <Switch id={switchId} checked={checked} onChange={onChange} />
            <Strut size={spacing.xSmall_8} />
            <LabelMedium tag="label" htmlFor={switchId}>
                {label}
            </LabelMedium>
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
