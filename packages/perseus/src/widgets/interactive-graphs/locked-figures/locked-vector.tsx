import {lockedFigureColors} from "@khanacademy/perseus-core";
import * as React from "react";

import {Vector} from "../graphs/components/vector";

import {strokeWeights} from "./utils";

import type {LockedVectorType} from "@khanacademy/perseus-core";

const LockedVector = (props: LockedVectorType) => {
    const {color, points, weight, ariaLabel} = props;
    const [tail, tip] = points;

    const hasAria = !!ariaLabel;

    return (
        <g
            className="locked-vector"
            aria-label={hasAria ? ariaLabel : undefined}
            aria-hidden={!hasAria}
            role="img"
        >
            <Vector
                tail={tail}
                tip={tip}
                color={lockedFigureColors[color]}
                strokeWidth={strokeWeights[weight]}
            />
        </g>
    );
};

export default LockedVector;
