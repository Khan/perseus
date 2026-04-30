import {
    parseInteractiveGraphType,
    isFailure,
    isFeatureOn,
    parse,
} from "@khanacademy/perseus-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PerseusGraphType} from "@khanacademy/perseus-core";

type GraphTypeSelectorProps = {
    graphType: PerseusGraphType["type"];
    onChange: (newGraphType: PerseusGraphType["type"]) => void;
    // TODO(LEMS-3976): clean up feature flag
    apiOptions: APIOptionsWithDefaults;
};

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    // TODO(LEMS-3976): clean up feature flag
    const showVector = isFeatureOn(
        {apiOptions: props.apiOptions},
        "interactive-graph-vector",
    );

    return (
        <SingleSelect
            selectedValue={props.graphType}
            onChange={(value) => {
                const parsedType = parse(value, parseInteractiveGraphType);
                if (isFailure(parsedType)) {
                    throw new Error(parsedType.detail);
                }
                props.onChange(parsedType.value);
            }}
            placeholder="Select an answer type"
            style={styles.singleSelectShort}
        >
            <OptionItem value="absolute-value" label="Absolute value" />
            <OptionItem value="none" label="None" />
            <OptionItem value="linear" label="Linear function" />
            <OptionItem value="quadratic" label="Quadratic function" />
            <OptionItem value="sinusoid" label="Sinusoid function" />
            <OptionItem value="exponential" label="Exponential function" />
            <OptionItem value="tangent" label="Tangent function" />
            <OptionItem value="logarithm" label="Logarithm function" />
            <OptionItem value="circle" label="Circle" />
            <OptionItem value="point" label="Point(s)" />
            <OptionItem value="linear-system" label="Linear System" />
            <OptionItem value="polygon" label="Polygon" />
            <OptionItem value="segment" label="Line Segment(s)" />
            <OptionItem value="ray" label="Ray" />
            {showVector && <OptionItem value="vector" label="Vector" />}
            <OptionItem value="angle" label="Angle" />
        </SingleSelect>
    );
};

const styles = StyleSheet.create({
    singleSelectShort: {
        height: sizing.size_260,
    },
});

export default GraphTypeSelector;
