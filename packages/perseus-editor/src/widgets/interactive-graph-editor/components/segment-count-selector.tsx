import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";
import _ from "underscore";

import styles from "../interactive-graph-editor.module.css";
import LabeledRow from "../locked-figures/labeled-row";

import type {Props as EditorProps} from "../interactive-graph-editor";
import type {
    PerseusGraphType,
    PerseusGraphTypeSegment,
} from "@khanacademy/perseus-core";

interface Props {
    correct: PerseusGraphTypeSegment;
    graph: PerseusGraphType | undefined;
    onChange: (props: Partial<EditorProps>) => void;
}

const SegmentCountSelector = ({correct, graph, onChange}: Props) => (
    <LabeledRow label="Number of segments:">
        <SingleSelect
            key="segment-select"
            selectedValue={`${correct.numSegments ?? 1}`}
            // Never uses placeholder, always has value
            placeholder=""
            onChange={(newValue) => {
                const sides = +newValue;

                onChange({
                    correct: {
                        type: "segment",
                        numSegments: sides,
                        coords: null,
                    },
                    graph: {
                        type: "segment",
                        numSegments: sides,
                    },
                });
            }}
            className={styles.singleSelectShort}
        >
            {_.range(1, 7).map((n) => (
                <OptionItem
                    key={n}
                    value={`${n}`}
                    label={`${n} segment${n > 1 ? "s" : ""}`}
                />
            ))}
        </SingleSelect>
    </LabeledRow>
);

export default SegmentCountSelector;
