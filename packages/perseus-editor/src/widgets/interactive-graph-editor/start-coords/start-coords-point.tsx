import * as React from "react";

import CoordInput from "./coord-input";

import type {Coord} from "@khanacademy/perseus";

interface StartCoordsPointProps {
    startCoords: Coord[];
    onChange: (startCoords: Coord[]) => void;
    pointLabels?: ReadonlyArray<string>;
    onChangePointLabels?: (pointLabels: ReadonlyArray<string>) => void;
}

const StartCoordsPoint = (props: StartCoordsPointProps) => {
    const {startCoords, onChange, pointLabels, onChangePointLabels} = props;

    return (
        <>
            {startCoords.map((coord, index) => (
                <CoordInput
                    key={index}
                    label={`Point ${index + 1}`}
                    coord={coord}
                    onChange={(newCoord) => {
                        const newStartCoords = [...startCoords];
                        newStartCoords[index] = newCoord;
                        onChange(newStartCoords);
                    }}
                    pointLabel={pointLabels?.[index]}
                    onPointLabelChange={
                        onChangePointLabels &&
                        ((newLabel) => {
                            const next = Array.from(
                                {length: startCoords.length},
                                (_, i) =>
                                    i === index
                                        ? newLabel
                                        : pointLabels?.[i] ?? "",
                            );
                            onChangePointLabels(next);
                        })
                    }
                />
            ))}
        </>
    );
};

export default StartCoordsPoint;
