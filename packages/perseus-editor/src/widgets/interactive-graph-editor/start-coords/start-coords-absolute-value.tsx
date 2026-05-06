import * as React from "react";

import CoordInput from "./coord-input";

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
            <CoordInput
                label="Vertex"
                coord={vertex}
                onChange={(value) => onChange([value, arm])}
            />
            <CoordInput
                label="Arm"
                coord={arm}
                onChange={(value) => onChange([vertex, value])}
            />
        </>
    );
};

export default StartCoordsAbsoluteValue;
