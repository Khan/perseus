import * as React from "react";

import CoordInputTile from "./coord-input-tile";

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
                <CoordInputTile
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
