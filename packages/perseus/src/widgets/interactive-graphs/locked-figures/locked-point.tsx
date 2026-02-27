import {
    lockedFigureColors,
    type LockedPointType,
} from "@khanacademy/perseus-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Point} from "mafs";
import * as React from "react";

const LockedPoint = (props: LockedPointType) => {
    const {color, coord, filled, ariaLabel} = props;
    const [x, y] = coord;

    const hasAria = !!ariaLabel;

    return (
        <g
            className="locked-point"
            aria-label={hasAria ? ariaLabel : undefined}
            aria-hidden={!hasAria}
            role="img"
        >
            <Point
                x={x}
                y={y}
                svgCircleProps={{
                    style: {
                        fill: filled
                            ? lockedFigureColors[color]
                            : semanticColor.core.background.base.default,
                        stroke: lockedFigureColors[color],
                        strokeWidth: spacing.xxxxSmall_2,
                    },
                }}
            />
        </g>
    );
};

export default LockedPoint;
