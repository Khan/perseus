import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Renders the given children in a View laid out horizontally.
const LabeledRow = (props: {
    id?: string;
    label: string;
    style?: StyleType;
    children: React.ReactNode;
}) => {
    const {children, label, style} = props;

    return (
        <label>
            <View style={[styles.row, style]}>
                <LabelSmall style={{marginRight: spacing.xSmall_8}}>
                    {label}
                </LabelSmall>
                {children}
            </View>
        </label>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginTop: spacing.xSmall_8,
        alignItems: "center",
    },
});

export default LabeledRow;
