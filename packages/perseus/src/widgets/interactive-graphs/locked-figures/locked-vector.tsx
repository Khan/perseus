import * as React from "react";

import {lockedFigureColors} from "../../../perseus-types";
import {Vector} from "../graphs/components/vector";

import type {LockedVectorType} from "../../../perseus-types";
import type {APIOptions} from "../../../types";

type Props = LockedVectorType & {
    flags?: APIOptions["flags"];
};

const LockedVector = (props: Props) => {
    const {color, points, ariaLabel, flags} = props;
    const [tail, tip] = points;

    const hasAria = ariaLabel && flags?.["mafs"]?.["locked-figures-aria"];

    return (
        <g
            className="locked-vector"
            aria-label={hasAria ? ariaLabel : undefined}
            aria-hidden={!hasAria}
        >
            <Vector tail={tail} tip={tip} color={lockedFigureColors[color]} />
        </g>
    );
};

export default LockedVector;
