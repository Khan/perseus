import {Circle} from "mafs";
import * as React from "react";

import {lockedFigureColors, type LockedCircleType} from "../../perseus-types";

const LockedCircle = (props: LockedCircleType) => {
    return <Circle {...props} color={lockedFigureColors[props.color]} />;
};

export default LockedCircle;
