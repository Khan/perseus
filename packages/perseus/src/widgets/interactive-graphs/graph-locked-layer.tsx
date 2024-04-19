import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import LockedPoint from "./locked-point";

import type {LockedFigure} from "../../perseus-types";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
};

const GraphLockedLayer = (props: Props) => {
    const {lockedFigures} = props;
    return (
        <>
            {lockedFigures.map((figure, index) => {
                let Figure;
                switch (figure.type) {
                    case "point":
                        Figure = LockedPoint;
                        break;
                    default:
                        /**
                         * Devlopment-time future-proofing: This should
                         * fail during type-checking if we add a new locked
                         * shape type and forget to handle it in any other
                         * switch case here.
                         */
                        throw new UnreachableCaseError(figure.type);
                }

                return <Figure key={`${figure.type}-${index}`} {...figure} />;
            })}
        </>
    );
};

export default GraphLockedLayer;
