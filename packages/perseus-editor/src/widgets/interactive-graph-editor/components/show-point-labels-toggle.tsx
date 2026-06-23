import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import LabeledSwitch from "../../../components/labeled-switch";

import styles from "./show-point-labels-toggle.module.css";

const {InfoTip} = components;

interface Props {
    showPointLabels: boolean;
    pointLabels: ReadonlyArray<string> | undefined;
    onChange: (showPointLabels: boolean) => void;
}

// Editor-level toggle for the graph's `showPointLabels` field. The toggle
// is disabled until every point has a non-empty label; the InfoTip
// explains why.
export default function ShowPointLabelsToggle({
    showPointLabels,
    pointLabels,
    onChange,
}: Props) {
    const labelsPopulated =
        pointLabels !== undefined &&
        pointLabels.length > 0 &&
        pointLabels.every((label) => label !== "");

    return (
        <View className={styles.switchRow}>
            <LabeledSwitch
                label="Show point labels"
                checked={labelsPopulated && showPointLabels}
                disabled={!labelsPopulated}
                onChange={onChange}
            />
            <InfoTip>
                When on, each movable point displays a visible label next to it.
                Add a name to every point below to enable this option.
            </InfoTip>
        </View>
    );
}
