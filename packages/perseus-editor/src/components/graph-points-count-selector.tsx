import * as React from "react";

const UNLIMITED = "unlimited" as const;
type PointValue = number | typeof UNLIMITED;

const GraphPointsCountSelector = ({
    numPoints = 1,
    onChange,
}: {
    numPoints?: PointValue;
    onChange: (points: PointValue) => void;
}) => {
    return (
        <select
            key="point-select"
            value={numPoints}
            onChange={(e) => {
                // Convert numbers, leave UNLIMITED intact:
                const num = +e.target.value || UNLIMITED;
                onChange(num);
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
