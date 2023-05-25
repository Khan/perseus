import * as React from "react";

type GraphTypeSelectorProps = {
    graphType: string;
    onChange: (newGraphType: string) => void;
};

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    return (
        <select
            value={props.graphType}
            onChange={(e) => {
                const type = e.target.value;
                props.onChange(type);
            }}
        >
            <option value="linear">Linear function</option>
            <option value="quadratic">Quadratic function</option>
            <option value="sinusoid">Sinusoid function</option>
            <option value="circle">Circle</option>
            <option value="point">Point(s)</option>
            <option value="linear-system">Linear System</option>
            <option value="polygon">Polygon</option>
            <option value="segment">Line Segment(s)</option>
            <option value="ray">Ray</option>
            <option value="angle">Angle</option>
        </select>
    );
};

export default GraphTypeSelector;
