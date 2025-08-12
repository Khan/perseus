import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

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

const GraphPointsCountSelector = ({correct, graph, onChange}: Props) => {
    return (
        <LabeledRow label="Number of Points:">
            <SingleSelect
                selectedValue={`${correct.numPoints ?? 1}`}
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
                // Never uses placeholder, always has value
                placeholder=""
                className={styles.singleSelectShort}
            >
                {[
                    ...[...Array(7).keys()].map((n) => (
                        <OptionItem
                            key={n}
                            value={`${n}`}
                            label={`${n} point${n > 1 ? "s" : ""}`}
                        />
                    )),
                    <OptionItem
                        key="unlimited"
                        value={UNLIMITED}
                        label="unlimited"
                    />,
                ]}
            </SingleSelect>
        </LabeledRow>
    );
};

export default GraphPointsCountSelector;
