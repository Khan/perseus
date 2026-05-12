import {isFeatureOn} from "@khanacademy/perseus-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";

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
        <TypedSingleSelect
            options={{
                "absolute-value": "Absolute value",
                none: "None",
                linear: "Linear function",
                quadratic: "Quadratic function",
                sinusoid: "Sinusoid function",
                exponential: "Exponential function",
                tangent: "Tangent function",
                logarithm: "Logarithm function",
                circle: "Circle",
                point: "Point(s)",
                "linear-system": "Linear System",
                polygon: "Polygon",
                segment: "Line Segment(s)",
                ray: "Ray",
                vector: showVector && "Vector",
                angle: "Angle",
            }}
            selectedValue={props.graphType}
            onChange={props.onChange}
            placeholder="Select an answer type"
            style={styles.singleSelectShort}
        />
    );
};

const styles = StyleSheet.create({
    singleSelectShort: {
        height: sizing.size_260,
    },
});

export default GraphTypeSelector;
