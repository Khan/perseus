import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

import {UNLIMITED, parsePointCount} from "../util/points";

import type {PointValue} from "../util/points";

const NUMERIC_OPTIONS = [...Array(7).keys()].map((n) => (
    <OptionItem
        key={n}
        value={`${n}`}
        label={`${n} point${n > 1 ? "s" : ""}`}
    />
));

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
            placeholder=""
        >
            {[
                ...NUMERIC_OPTIONS,
                <OptionItem value={UNLIMITED} label="unlimited" />,
            ]}
        </SingleSelect>
    );
};

export default GraphPointsCountSelector;
