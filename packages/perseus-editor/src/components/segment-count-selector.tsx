import * as React from "react";
import _ from "underscore";

const SegmentCountSelector = ({
    numSegments = 1,
    onChange,
}: {
    numSegments?: number;
    onChange: (numSegments: number) => void;
}) => (
    <select
        key="segment-select"
        value={numSegments}
        onChange={(e) => {
            const num = +e.target.value;
            onChange(num);
        }}
    >
        {_.range(1, 7).map((n) => (
            <option key={n} value={n}>
                {`${n} segment${n > 1 ? "s" : ""}`}
            </option>
        ))}
    </select>
);

export default SegmentCountSelector;
