import * as React from "react";

import CoordInput from "./coord-input";

import type {Coord} from "@khanacademy/perseus";

type Props = {
    startCoords: Coord[];
    onChange: (startCoords: Coord[]) => void;
    pointLabels?: ReadonlyArray<string>;
    onChangePointLabels?: (pointLabels: ReadonlyArray<string>) => void;
};

const StartCoordsPoint = (props: Props) => {
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
                    pointLabel={
                        onChangePointLabels && {
                            value: pointLabels?.[index],
                            placeholder: `${index + 1}`,
                            onChange: (newLabel) => {
                                const next = [...(pointLabels ?? [])];
                                while (next.length < startCoords.length) {
                                    next.push("");
                                }
                                next[index] = newLabel;
                                onChangePointLabels(next);
                            },
                        }
                    }
                />
            ))}
        </>
    );
};

export default StartCoordsPoint;
