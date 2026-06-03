import * as React from "react";

import CoordInput from "./coord-input";

import type {CollinearTuple} from "@khanacademy/perseus-core";

interface StartCoordsVectorProps {
    startCoords: CollinearTuple;
    onChange: (startCoords: CollinearTuple) => void;
}

const StartCoordsVector = (props: StartCoordsVectorProps) => {
    const {startCoords, onChange} = props;

    return (
        <>
            <CoordInput
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) => onChange([value, startCoords[1]])}
            />
            <CoordInput
                label="Point 2"
                coord={startCoords[1]}
                onChange={(value) => onChange([startCoords[0], value])}
            />
        </>
    );
};

export default StartCoordsVector;
