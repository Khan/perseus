import * as React from "react";

import CoordInputRow from "./coord-input-row";

import type {CollinearTuple} from "@khanacademy/perseus-core";

type Props = {
    startCoords: CollinearTuple;
    onChange: (startCoords: CollinearTuple) => void;
};

const StartCoordsLine = (props: Props) => {
    const {startCoords, onChange} = props;

    return (
        <>
            <CoordInputRow
                label="Point 1"
                coord={startCoords[0]}
                onChange={(value) => onChange([value, startCoords[1]])}
            />
            <CoordInputRow
                label="Point 2"
                coord={startCoords[1]}
                onChange={(value) => onChange([startCoords[0], value])}
            />
        </>
    );
};

export default StartCoordsLine;
