import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";
import {UNLIMITED, parsePointCount} from "../../../util/points";
import styles from "../interactive-graph-editor.module.css";
import LabeledRow from "../locked-figures/labeled-row";

import type {Props as EditorProps} from "../interactive-graph-editor";
import type {
    PerseusGraphType,
    PerseusGraphTypePoint,
} from "@khanacademy/perseus-core";

interface Props {
    correct: PerseusGraphTypePoint;
    graph: PerseusGraphType | undefined;
    onChange: (props: Partial<EditorProps>) => void;
}

const pointsCountOptions: Record<string, string> = {
    "0": "0 points",
    "1": "1 point",
    "2": "2 points",
    "3": "3 points",
    "4": "4 points",
    "5": "5 points",
    "6": "6 points",
    [UNLIMITED]: "unlimited",
};

const GraphPointsCountSelector = ({correct, graph, onChange}: Props) => {
    return (
        <LabeledRow label="Number of Points:">
            <TypedSingleSelect
                selectedValue={`${correct.numPoints ?? 1}`}
                options={pointsCountOptions}
                onChange={(newValue) => {
                    const points = parsePointCount(newValue);

                    onChange({
                        correct: {
                            type: "point",
                            numPoints: points,
                        },
                        graph: {
                            type: "point",
                            numPoints: points,
                        },
                    });
                }}
                className={styles.singleSelectShort}
            />
        </LabeledRow>
    );
};

export default GraphPointsCountSelector;
