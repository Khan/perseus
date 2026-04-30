import * as React from "react";

import CoordInput from "./coord-input";

import type {Coord} from "@khanacademy/perseus";

type Props = {
    startCoords: Coord[];
    onChange: (startCoords: Coord[]) => void;
};

const StartCoordsPoint = (props: Props) => {
    const {startCoords, onChange} = props;

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
                />
            ))}
        </>
    );
};

export default StartCoordsPoint;
