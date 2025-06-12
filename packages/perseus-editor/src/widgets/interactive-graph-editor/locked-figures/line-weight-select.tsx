import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    selectedValue: "thin" | "medium" | "thick";
    onChange: (newValue: "thin" | "medium" | "thick") => void;
    containerStyle?: StyleType;
};

const LineWeightSelect = (props: Props) => {
    const {selectedValue, containerStyle, onChange} = props;

    return (
        <LabelMedium
            tag="label"
            style={[
                {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // Allow truncation, stop bleeding over the edge.
                    minWidth: 0,
                },
                containerStyle,
            ]}
        >
            weight
            <Strut size={spacing.xxxSmall_4} />
            <SingleSelect
                selectedValue={selectedValue}
                onChange={onChange as any}
                // Placeholder is required, but never gets used.
                placeholder=""
            >
                <OptionItem value="thin" label="thin" />
                <OptionItem value="medium" label="medium" />
                <OptionItem value="thick" label="thick" />
            </SingleSelect>
        </LabelMedium>
    );
};

export default LineWeightSelect;
