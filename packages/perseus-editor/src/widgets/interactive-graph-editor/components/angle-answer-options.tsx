import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import invariant from "tiny-invariant";

import styles from "../interactive-graph-editor.module.css";
import LabeledRow from "../locked-figures/labeled-row";

import type {Props as EditorProps} from "../interactive-graph-editor";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
} from "@khanacademy/perseus-core";

const {InfoTip} = components;

interface Props {
    correct: PerseusGraphTypeAngle;
    graph: PerseusGraphType | undefined;
    onChange: (props: Partial<EditorProps>) => void;
}

export default function AngleAnswerOptions({correct, graph, onChange}: Props) {
    return (
        <>
            <View className={styles.row}>
                <Checkbox
                    label={<LabelSmall>Show angle measures</LabelSmall>}
                    checked={
                        // Don't show indeterminate checkbox state
                        !!correct?.showAngles
                    }
                    onChange={(newValue) => {
                        if (graph?.type === "angle") {
                            invariant(
                                correct.type === "angle",
                                `Expected graph type to be angle, but got ${correct.type}`,
                            );
                            onChange({
                                correct: {
                                    ...correct,
                                    showAngles: newValue,
                                },
                                graph: {
                                    ...graph,
                                    showAngles: newValue,
                                },
                            });
                        }
                    }}
                />
                <InfoTip>
                    <p>Displays the interior angle measures.</p>
                </InfoTip>
            </View>
            <View className={styles.row}>
                <Checkbox
                    label={<LabelSmall>Allow reflex angles</LabelSmall>}
                    checked={
                        // Don't show indeterminate checkbox state
                        !!correct?.allowReflexAngles
                    }
                    onChange={(newValue) => {
                        invariant(
                            correct.type === "angle",
                            `Expected graph type to be angle, but got ${correct.type}`,
                        );
                        invariant(
                            graph?.type === "angle",
                            `Expected graph type to be angle, but got ${graph?.type}`,
                        );

                        const update = {
                            allowReflexAngles: newValue,
                        };

                        onChange({
                            correct: {
                                ...correct,
                                ...update,
                            },
                            graph: {
                                ...graph,
                                ...update,
                            },
                        });
                    }}
                />
                <InfoTip>
                    <p>Allow students to be able to create reflex angles.</p>
                </InfoTip>
            </View>
            <LabeledRow label="Student answer must">
                <SingleSelect
                    selectedValue={correct.match || "exact"}
                    onChange={(newValue) => {
                        invariant(
                            correct.type === "angle",
                            `Expected graph type to be angle, but got ${correct.type}`,
                        );
                        onChange({
                            correct: {
                                ...correct,
                                // TODO(benchristel): this cast is necessary
                                // because "exact" is not actually a valid
                                // value for `match`; a value of undefined
                                // means exact matching. The code happens
                                // to work because "exact" falls through
                                // to the correct else branch when scoring
                                match: newValue as PerseusGraphTypeAngle["match"],
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
                        Congruency requires only that the angle measures are the
                        same. An exact match implies congruency, but also
                        requires that the angles have the same orientation and
                        that the vertices are in the same position.
                    </p>
                </InfoTip>
            </LabeledRow>
        </>
    );
}
