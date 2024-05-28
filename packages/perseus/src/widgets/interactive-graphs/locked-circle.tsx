import {Circle} from "mafs";
import * as React from "react";

import {lockedFigureColors, type LockedCircleType} from "../../perseus-types";

const LockedCircle = (props: LockedCircleType) => {
    const {center, radius, color, fillStyle, strokeStyle} = props;

    const fill = {none: 0, solid: 1, translucent: 0.4};

    return (
        <Circle
            center={center}
            radius={radius}
            fillOpacity={fill[fillStyle]}
            strokeStyle={strokeStyle}
            color={lockedFigureColors[color]}
        />
    );
};

export default LockedCircle;
