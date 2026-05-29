import * as React from "react";

import CoordInput from "./coord-input";

import type {CollinearTuple} from "@khanacademy/perseus-core";

interface StartCoordsLineProps {
    startCoords: CollinearTuple;
    onChange: (startCoords: CollinearTuple) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsLine = (props: StartCoordsLineProps) => {
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

export default StartCoordsLine;
