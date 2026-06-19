import {components, usePerseusI18n} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import LabeledSwitch from "../../../components/labeled-switch";
import styles from "../start-coords/start-coords-shared.module.css";

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
    const {strings} = usePerseusI18n();
    const labelsPopulated =
        pointLabels !== undefined &&
        pointLabels.length > 0 &&
        pointLabels.every((label) => label.trim() !== "");

    return (
        <View className={styles.switchRow}>
            <LabeledSwitch
                label={strings.interactiveGraphShowPointLabels}
                checked={labelsPopulated && showPointLabels}
                disabled={!labelsPopulated}
                onChange={onChange}
            />
            <InfoTip>{strings.interactiveGraphShowPointLabelsInfoTip}</InfoTip>
        </View>
    );
}
