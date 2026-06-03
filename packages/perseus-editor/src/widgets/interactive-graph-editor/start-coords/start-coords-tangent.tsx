import {View} from "@khanacademy/wonder-blocks-core";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import CoordInput from "./coord-input";
import styles from "./start-coords-shared.module.css";
import {getTangentEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type TangentCoords = [Coord, Coord];

interface StartCoordsTangentProps {
    startCoords: TangentCoords;
    onChange: (startCoords: TangentCoords) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsTangent = (props: StartCoordsTangentProps) => {
    const {startCoords, onChange, pointLabels, onChangePointLabels} = props;
    const updatePointLabel = (index: number, newLabel: string) => {
        const next: [string, string] = [
            index === 0 ? newLabel : pointLabels[0] ?? "",
            index === 1 ? newLabel : pointLabels[1] ?? "",
        ];
        onChangePointLabels(next);
    };

    return (
        <>
            {/* Current equation */}
            <View className={styles.equationSection}>
                <BodyText>Starting equation:</BodyText>
                <BodyMonospace className={styles.equationBody}>
                    {getTangentEquation(startCoords)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <CoordInput
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) => onChange([value, startCoords[1]])}
                pointLabel={pointLabels[0]}
                onPointLabelChange={(newLabel) => updatePointLabel(0, newLabel)}
            />
            <CoordInput
                label="Point 2"
                coord={startCoords[1]}
                onChange={(value) => onChange([startCoords[0], value])}
                pointLabel={pointLabels[1]}
                onPointLabelChange={(newLabel) => updatePointLabel(1, newLabel)}
            />
        </>
    );
};

export default StartCoordsTangent;
