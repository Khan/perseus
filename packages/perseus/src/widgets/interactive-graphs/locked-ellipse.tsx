import {Circle} from "mafs";
import * as React from "react";

import {
    lockedEllipseFillStyles,
    lockedFigureColors,
    type LockedEllipseType,
} from "../../perseus-types";

const LockedEllipse = (props: LockedEllipseType) => {
    const {center, radius, color, fillStyle, strokeStyle} = props;

    return (
        <Circle
            center={center}
            radius={radius}
            fillOpacity={lockedEllipseFillStyles[fillStyle]}
            strokeStyle={strokeStyle}
            color={lockedFigureColors[color]}
        />
    );
};

export default LockedEllipse;
