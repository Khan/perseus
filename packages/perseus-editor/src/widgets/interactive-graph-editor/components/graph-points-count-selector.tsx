import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {UNLIMITED, parsePointCount} from "../../../util/points";

import type {PointValue} from "../../../util/points";

const GraphPointsCountSelector = ({
    numPoints = 1,
    onChange,
}: {
    numPoints?: PointValue;
    onChange: (points: PointValue) => void;
}) => {
    return (
        <SingleSelect
            selectedValue={`${numPoints}`}
            onChange={(newValue) => {
                onChange(parsePointCount(newValue));
            }}
            // Never uses placeholder, always has value
            placeholder=""
            style={styles.singleSelectShort}
        >
            {[
                ...[...Array(7).keys()].map((n) => (
                    <OptionItem
                        key={n}
                        value={`${n}`}
                        label={`${n} point${n > 1 ? "s" : ""}`}
                    />
                )),
                <OptionItem
                    key="unlimited"
                    value={UNLIMITED}
                    label="unlimited"
                />,
            ]}
        </SingleSelect>
    );
};

const styles = StyleSheet.create({
    singleSelectShort: {
        // Non-standard spacing, but it's the smallest we can go
        // without running into styling issues with the dropdown.
        height: 26,
    },
});

export default GraphPointsCountSelector;
