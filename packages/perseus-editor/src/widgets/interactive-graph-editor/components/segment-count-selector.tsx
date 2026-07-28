import * as React from "react";

import {TypedSingleSelect} from "../../../components/typed-single-select";
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

// Keys are the segment counts; values are the visible labels. `ValueT` is
// `string` here — the count is parsed back to a number in `onChange` — so this
// gains no type safety, but keeps the options model consistent with the other
// selectors.
const segmentCountOptions: Record<string, string> = {
    "1": "1 segment",
    "2": "2 segments",
    "3": "3 segments",
    "4": "4 segments",
    "5": "5 segments",
    "6": "6 segments",
};

const SegmentCountSelector = ({correct, graph, onChange}: Props) => (
    <LabeledRow label="Number of segments:">
        <TypedSingleSelect
            key="segment-select"
            selectedValue={`${correct.numSegments ?? 1}`}
            options={segmentCountOptions}
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
        />
    </LabeledRow>
);

export default SegmentCountSelector;
