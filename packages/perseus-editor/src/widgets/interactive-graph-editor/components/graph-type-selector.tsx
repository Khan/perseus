import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

import styles from "../interactive-graph-editor.module.css";

interface GraphTypeSelectorProps {
    graphType: string;
    disabled?: boolean;
    onChange: (newGraphType: string) => void;
}

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    return (
        <SingleSelect
            selectedValue={props.graphType}
            onChange={props.onChange}
            placeholder="Select an answer type"
            className={styles.singleSelectShort}
            disabled={props.disabled}
        >
            <OptionItem value="none" label="None" />
            <OptionItem
                value="absolute-value"
                label="Absolute value function"
            />
            <OptionItem value="exponential" label="Exponential function" />
            <OptionItem value="linear" label="Linear function" />
            <OptionItem value="logarithm" label="Logarithmic function" />
            <OptionItem value="quadratic" label="Quadratic function" />
            <OptionItem value="sinusoid" label="Sinusoidal function" />
            <OptionItem value="tangent" label="Tangent function" />
            <OptionItem value="angle" label="Angle" />
            <OptionItem value="circle" label="Circle" />
            <OptionItem value="linear-system" label="Linear system" />
            <OptionItem value="segment" label="Line segment(s)" />
            <OptionItem value="point" label="Point(s)" />
            <OptionItem value="polygon" label="Polygon" />
            <OptionItem value="ray" label="Ray" />
            <OptionItem value="vector" label="Vector" />
        </SingleSelect>
    );
};

export default GraphTypeSelector;
