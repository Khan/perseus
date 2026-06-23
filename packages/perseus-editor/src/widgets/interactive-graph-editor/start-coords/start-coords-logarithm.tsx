import {View} from "@khanacademy/wonder-blocks-core";
import {BodyMonospace, BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import AsymptoteInput from "./asymptote-input";
import CoordInput from "./coord-input";
import styles from "./start-coords-shared.module.css";
import {getLogarithmEquation} from "./util";

import type {Coord} from "@khanacademy/perseus";

type LogarithmStartCoords = {
    coords: [Coord, Coord];
    asymptote: number;
};

interface StartCoordsLogarithmProps {
    startCoords: LogarithmStartCoords;
    onChange: (startCoords: LogarithmStartCoords) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsLogarithm = (props: StartCoordsLogarithmProps) => {
    const {startCoords, onChange, pointLabels, onChangePointLabels} = props;
    const {coords, asymptote} = startCoords;
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
                    {getLogarithmEquation(coords, asymptote)}
                </BodyMonospace>
            </View>

            {/* Points UI */}
            <CoordInput
                label="Point 1"
                coord={coords[0]}
                onChange={(value) =>
                    onChange({coords: [value, coords[1]], asymptote})
                }
                pointLabel={pointLabels[0]}
                onPointLabelChange={(newLabel) => updatePointLabel(0, newLabel)}
            />
            <CoordInput
                label="Point 2"
                coord={coords[1]}
                onChange={(value) =>
                    onChange({coords: [coords[0], value], asymptote})
                }
                pointLabel={pointLabels[1]}
                onPointLabelChange={(newLabel) => updatePointLabel(1, newLabel)}
            />
            <AsymptoteInput
                axis="x"
                value={asymptote}
                onChange={(newX) =>
                    // Update the asymptote in startCoords to refresh the preview.
                    onChange({
                        coords: [coords[0], coords[1]],
                        asymptote: newX,
                    })
                }
            />
        </>
    );
};

export default StartCoordsLogarithm;
