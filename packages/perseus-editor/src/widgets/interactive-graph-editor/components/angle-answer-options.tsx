import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";
import invariant from "tiny-invariant";

import {TypedSingleSelect} from "../../../components/typed-single-select";
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
                    label={
                        <BodyText size="small" tag="span">
                            Show angle measures
                        </BodyText>
                    }
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
                    label={
                        <BodyText size="small" tag="span">
                            Allow reflex angles
                        </BodyText>
                    }
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
                <TypedSingleSelect
                    selectedValue={correct.match || "exact"}
                    onChange={(newValue) => {
                        invariant(
                            correct.type === "angle",
                            `Expected graph type to be angle, but got ${correct.type}`,
                        );
                        // "exact" is not a real `match` value: an absent
                        // (undefined) `match` means exact matching. Translate
                        // the selected option to the value the scorer expects.
                        // The switch is exhaustive over the option keys, which
                        // UnreachableCaseError enforces at compile time.
                        let match: PerseusGraphTypeAngle["match"];
                        switch (newValue) {
                            case "exact":
                                match = undefined;
                                break;
                            case "congruent":
                                match = "congruent";
                                break;
                            default:
                                throw new UnreachableCaseError(newValue);
                        }
                        onChange({
                            correct: {
                                ...correct,
                                match,
                            },
                        });
                    }}
                    options={{
                        exact: "match exactly",
                        congruent: "be congruent",
                    }}
                    // Never uses placeholder, always has value
                    placeholder=""
                    className={styles.singleSelectShort}
                />
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
