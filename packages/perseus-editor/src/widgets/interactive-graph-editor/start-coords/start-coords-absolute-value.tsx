import * as React from "react";

import CoordInputTile from "./coord-input-tile";

import type {Coord} from "@khanacademy/perseus";

type AbsoluteValueCoords = [Coord, Coord];

type Props = {
    startCoords: AbsoluteValueCoords;
    onChange: (startCoords: AbsoluteValueCoords) => void;
};

const StartCoordsAbsoluteValue = (props: Props) => {
    const {startCoords, onChange} = props;
    const [vertex, arm] = startCoords;

    return (
        <>
            <CoordInputTile
                label="Vertex"
                coord={vertex}
                onChange={(value) => onChange([value, arm])}
            />
            <CoordInputTile
                label="Arm"
                coord={arm}
                onChange={(value) => onChange([vertex, value])}
            />
        </>
    );
};

export default StartCoordsAbsoluteValue;
