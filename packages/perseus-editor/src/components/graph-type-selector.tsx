import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

type GraphTypeSelectorProps = {
    graphType: string;
    onChange: (newGraphType: string) => void;
};

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    return (
        <SingleSelect
            selectedValue={props.graphType}
            onChange={(newValue) => {
                props.onChange(newValue);
            }}
            placeholder="Select a graph type"
        >
            <OptionItem value="linear" label="Linear function" />
            <OptionItem value="quadratic" label="Quadratic function" />
            <OptionItem value="sinusoid" label="Sinusoid function" />
            <OptionItem value="circle" label="Circle" />
            <OptionItem value="point" label="Point(s)" />
            <OptionItem value="linear-system" label="Linear System" />
            <OptionItem value="polygon" label="Polygon" />
            <OptionItem value="segment" label="Line Segment(s)" />
            <OptionItem value="ray" label="Ray" />
            <OptionItem value="angle" label="Angle" />
        </SingleSelect>
    );
};

export default GraphTypeSelector;
