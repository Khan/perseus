import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
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
        placeholder=""
        onChange={(newValue) => {
            const num = +newValue;
            onChange(num);
        }}
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

export default SegmentCountSelector;
