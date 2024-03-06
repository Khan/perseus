import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Renders the given children in a View laid out horizontally.
const LabeledRow = (props: {
    id?: string;
    label: string;
    labelSide?: "start" | "end";
    style?: StyleType;
    children: React.ReactNode;
}) => {
    const {children, label, labelSide = "left", style} = props;

    return (
        <label className={css(styles.label)}>
            <View style={[styles.row, style]}>
                {labelSide === "start" || (
                    <LabelSmall style={styles.spaceEnd}>{label}</LabelSmall>
                )}
                {children}
                {labelSide === "end" && (
                    <LabelSmall style={styles.spaceStart}>{label}</LabelSmall>
                )}
            </View>
        </label>
    );
};

const styles = StyleSheet.create({
    label: {
        width: "fit-content",
    },
    row: {
        flexDirection: "row",
        marginTop: spacing.xSmall_8,
        alignItems: "center",
        width: "fit-content",
    },
    spaceStart: {
        marginInlineStart: spacing.xSmall_8,
    },
    spaceEnd: {
        marginInlineEnd: spacing.xSmall_8,
    },
});

export default LabeledRow;
