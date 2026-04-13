import {components} from "@khanacademy/perseus";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";
import invariant from "tiny-invariant";

import styles from "../interactive-graph-editor.module.css";
import LabeledRow from "../locked-figures/labeled-row";

import type {Props as EditorProps} from "../interactive-graph-editor";
import type {PerseusGraphTypeVector} from "@khanacademy/perseus-core";

const {InfoTip} = components;

interface Props {
    correct: PerseusGraphTypeVector;
    onChange: (props: Partial<EditorProps>) => void;
}

export default function VectorAnswerOptions({correct, onChange}: Props) {
    return (
        <LabeledRow label="Student answer must">
            <SingleSelect
                selectedValue={correct.match || "exact"}
                onChange={(newValue) => {
                    invariant(
                        correct.type === "vector",
                        `Expected graph type to be vector, but got ${correct.type}`,
                    );
                    onChange({
                        correct: {
                            ...correct,
                            match: newValue as PerseusGraphTypeVector["match"],
                        },
                    });
                }}
                // Never uses placeholder, always has value
                placeholder=""
                className={styles.singleSelectShort}
            >
                <OptionItem value="exact" label="match exactly" />
                <OptionItem value="congruent" label="be congruent" />
            </SingleSelect>
            <InfoTip>
                <p>
                    Congruency requires only that the vector has the same
                    direction and magnitude. An exact match implies
                    congruency, but also requires that the tail and tip
                    are in the same position on the grid.
                </p>
            </InfoTip>
        </LabeledRow>
    );
}
