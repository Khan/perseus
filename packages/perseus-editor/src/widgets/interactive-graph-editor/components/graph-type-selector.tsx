import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type GraphTypeSelectorProps = {
    graphType: string;
    disabled?: boolean;
    onChange: (newGraphType: string) => void;
};

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    return (
        <SingleSelect
            selectedValue={props.graphType}
            onChange={props.onChange}
            disabled={props.disabled}
            placeholder="Select an answer type"
            style={styles.singleSelectShort}
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

const styles = StyleSheet.create({
    singleSelectShort: {
        height: sizing.size_260,
    },
});

export default GraphTypeSelector;
