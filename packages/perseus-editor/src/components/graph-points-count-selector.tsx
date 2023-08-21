import * as React from "react";

import {UNLIMITED, parsePointCount} from "../util/points";

import type {PointValue} from "../util/points";

const GraphPointsCountSelector = ({
    numPoints = 1,
    onChange,
}: {
    numPoints?: PointValue;
    onChange: (points: PointValue) => void;
}) => {
    return (
        <select
            value={numPoints}
            onChange={(e) => {
                onChange(parsePointCount(e.target.value));
            }}
        >
            {[...Array(7).keys()].map((n) => (
                <option key={n} value={n}>
                    {`${n} point${n > 1 ? "s" : ""}`}
                </option>
            ))}
            <option value={UNLIMITED}>unlimited</option>
        </select>
    );
};

export default GraphPointsCountSelector;
