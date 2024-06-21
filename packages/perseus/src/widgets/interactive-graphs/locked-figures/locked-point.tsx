import {color as wbColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Point} from "mafs";
import * as React from "react";

import {lockedFigureColors, type LockedPointType} from "../../../perseus-types";

const LockedPoint = (props: LockedPointType) => {
    const {color, coord, filled} = props;
    const [x, y] = coord;
    return (
        <Point
            x={x}
            y={y}
            svgCircleProps={{
                style: {
                    fill: filled ? lockedFigureColors[color] : wbColor.white,
                    stroke: lockedFigureColors[color],
                    strokeWidth: spacing.xxxxSmall_2,
                },
            }}
        />
    );
};

export default LockedPoint;
