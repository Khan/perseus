import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";
import styles from "../interactive-graph-editor.module.css";

import type {PerseusGraphType} from "@khanacademy/perseus-core";

type GraphType = PerseusGraphType["type"];

interface GraphTypeSelectorProps {
    graphType: GraphType;
    disabled?: boolean;
    onChange: (newGraphType: GraphType) => void;
}

const GraphTypeSelector = (props: GraphTypeSelectorProps) => {
    return (
        <TypedSingleSelect<GraphType>
            selectedValue={props.graphType}
            onChange={props.onChange}
            placeholder="Select an answer type"
            className={styles.singleSelectShort}
            disabled={props.disabled}
            options={{
                none: "None",
                "absolute-value": "Absolute value function",
                exponential: "Exponential function",
                linear: "Linear function",
                logarithm: "Logarithmic function",
                quadratic: "Quadratic function",
                sinusoid: "Sinusoidal function",
                tangent: "Tangent function",
                angle: "Angle",
                circle: "Circle",
                "linear-system": "Linear system",
                segment: "Line segment(s)",
                point: "Point(s)",
                polygon: "Polygon",
                ray: "Ray",
                vector: "Vector",
            }}
        />
    );
};

export default GraphTypeSelector;
