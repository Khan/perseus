import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import LockedLine from "./locked-line";
import LockedPoint from "./locked-point";

import type {LockedFigure} from "../../perseus-types";
import type {Interval} from "mafs";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    range: [x: Interval, y: Interval];
};

const GraphLockedLayer = (props: Props) => {
    const {lockedFigures} = props;
    return (
        <>
            {lockedFigures.map((figure, index) => {
                switch (figure.type) {
                    case "point":
                        return (
                            <LockedPoint key={`point-${index}`} {...figure} />
                        );
                    case "line":
                        return (
                            <LockedLine
                                key={`line-${index}`}
                                range={props.range}
                                {...figure}
                            />
                        );
                    default:
                        /**
                         * Devlopment-time future-proofing: This should
                         * fail during type-checking if we add a new locked
                         * shape type and forget to handle it in any other
                         * switch case here.
                         */
                        throw new UnreachableCaseError(figure);
                }
            })}
        </>
    );
};

export default GraphLockedLayer;
