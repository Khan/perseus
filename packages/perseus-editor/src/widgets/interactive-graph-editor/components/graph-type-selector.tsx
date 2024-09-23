import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type GraphTypeSelectorProps = {
    graphType: string;
    onChange: (newGraphType: string) => void;
    showNoneOption: boolean;
};

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    return (
        <SingleSelect
            selectedValue={props.graphType}
            onChange={props.onChange}
            placeholder="Select an answer type"
            style={styles.singleSelectShort}
        >
            {props.showNoneOption && <OptionItem value="none" label="None" />}
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

const styles = StyleSheet.create({
    singleSelectShort: {
        // Non-standard spacing, but it's the smallest we can go
        // without running into styling issues with the dropdown.
        height: 26,
    },
});

export default GraphTypeSelector;
