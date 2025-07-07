import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type StyleOptions = "solid" | "dashed";
type Props = {
    selectedValue: StyleOptions;
    onChange: (newValue: StyleOptions) => void;
    containerStyle?: StyleType;
};

const LineStrokeSelect = (props: Props) => {
    const {selectedValue, containerStyle, onChange} = props;

    return (
        <LabelMedium
            tag="label"
            style={[styles.lineStrokeSelect, containerStyle]}
        >
            stroke
            <Strut size={spacing.xxxSmall_4} />
            <SingleSelect
                selectedValue={selectedValue}
                onChange={onChange as any}
                // Placeholder is required, but never gets used.
                placeholder=""
            >
                <OptionItem value="solid" label="solid" />
                <OptionItem value="dashed" label="dashed" />
            </SingleSelect>
        </LabelMedium>
    );
};

const styles = StyleSheet.create({
    lineStrokeSelect: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // Allow truncation, stop bleeding over the edge.
        minWidth: 0,
    },
});

export default LineStrokeSelect;
