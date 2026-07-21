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
// is disabled until at least one point has a non-empty label; the InfoTip
// explains why.
export default function ShowPointLabelsToggle({
    showPointLabels,
    pointLabels,
    onChange,
}: Props) {
    const hasAnyLabel =
        pointLabels !== undefined && pointLabels.some((label) => label !== "");

    return (
        <View className={styles.switchRow}>
            <LabeledSwitch
                label="Show point labels"
                checked={hasAnyLabel && showPointLabels}
                disabled={!hasAnyLabel}
                onChange={onChange}
            />
            <InfoTip>
                When on, each labeled movable point displays a visible label
                next to it. Add a label to at least one point below to enable
                this option; unlabeled points render without a label.
            </InfoTip>
        </View>
    );
}
