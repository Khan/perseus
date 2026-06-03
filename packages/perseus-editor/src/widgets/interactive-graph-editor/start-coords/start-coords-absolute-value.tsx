import * as React from "react";

import CoordInput from "./coord-input";

import type {Coord} from "@khanacademy/perseus";

type AbsoluteValueCoords = [Coord, Coord];

interface StartCoordsAbsoluteValueProps {
    startCoords: AbsoluteValueCoords;
    onChange: (startCoords: AbsoluteValueCoords) => void;
    pointLabels: ReadonlyArray<string>;
    onChangePointLabels: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsAbsoluteValue = (props: StartCoordsAbsoluteValueProps) => {
    const {startCoords, onChange, pointLabels, onChangePointLabels} = props;
    const [vertex, arm] = startCoords;
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
                label="Vertex"
                coord={vertex}
                onChange={(value) => onChange([value, arm])}
                pointLabel={pointLabels[0]}
                onPointLabelChange={(newLabel) => updatePointLabel(0, newLabel)}
            />
            <CoordInput
                label="Arm"
                coord={arm}
                onChange={(value) => onChange([vertex, value])}
                pointLabel={pointLabels[1]}
                onPointLabelChange={(newLabel) => updatePointLabel(1, newLabel)}
            />
        </>
    );
};

export default StartCoordsAbsoluteValue;
