import {interactiveGraphTypeParser, isFailure, isFeatureOn, parse, PerseusGraphType} from "@khanacademy/perseus-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {APIOptionsWithDefaults} from "@khanacademy/perseus";

type GraphTypeSelectorProps = {
    graphType: PerseusGraphType["type"];
    onChange: (newGraphType: PerseusGraphType["type"]) => void;
    // TODO(LEMS-3976): clean up feature flag
    apiOptions: APIOptionsWithDefaults;
};

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    // TODO(LEMS-3976): clean up feature flag
    const showExponential = isFeatureOn(
        {apiOptions: props.apiOptions},
        "interactive-graph-exponent",
    );

    const showAbsoluteValue = isFeatureOn(
        {apiOptions: props.apiOptions},
        "interactive-graph-absolute-value",
    );

    const showTangent = isFeatureOn(
        {apiOptions: props.apiOptions},
        "interactive-graph-tangent",
    );

    const showLogarithm = isFeatureOn(
        {apiOptions: props.apiOptions},
        "interactive-graph-logarithm",
    );

    const showVector = isFeatureOn(
        {apiOptions: props.apiOptions},
        "interactive-graph-vector",
    );

    return (
        <SingleSelect
            selectedValue={props.graphType}
            onChange={(value) => {
                const parsedType = parse(value, interactiveGraphTypeParser);
                if (isFailure(parsedType)) {
                    throw new Error(parsedType.detail);
                }
                props.onChange(parsedType.value);
            }}
            placeholder="Select an answer type"
            style={styles.singleSelectShort}
        >
            {showAbsoluteValue && (
                <OptionItem value="absolute-value" label="Absolute value" />
            )}
            <OptionItem value="none" label="None" />
            <OptionItem value="linear" label="Linear function" />
            <OptionItem value="quadratic" label="Quadratic function" />
            <OptionItem value="sinusoid" label="Sinusoid function" />
            {showExponential && (
                <OptionItem value="exponential" label="Exponential function" />
            )}
            {showTangent && (
                <OptionItem value="tangent" label="Tangent function" />
            )}
            {showLogarithm && (
                <OptionItem value="logarithm" label="Logarithm function" />
            )}
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
        // Non-standard spacing, but it's the smallest we can go
        // without running into styling issues with the dropdown.
        height: 26,
    },
});

export default GraphTypeSelector;
