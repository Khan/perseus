import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

const SegmentCountSelector = ({
    numSegments = 1,
    onChange,
}: {
    numSegments?: number;
    onChange: (numSegments: number) => void;
}) => (
    <SingleSelect
        key="segment-select"
        selectedValue={`${numSegments}`}
        // Never uses placeholder, always has value
        placeholder=""
        onChange={(newValue) => {
            const num = +newValue;
            onChange(num);
        }}
        style={styles.singleSelectShort}
    >
        {_.range(1, 7).map((n) => (
            <OptionItem
                key={n}
                value={`${n}`}
                label={`${n} segment${n > 1 ? "s" : ""}`}
            />
        ))}
    </SingleSelect>
);

const styles = StyleSheet.create({
    singleSelectShort: {
        // Non-standard spacing, but it's the smallest we can go
        // without running into styling issues with the dropdown.
        height: 26,
    },
});

export default SegmentCountSelector;
