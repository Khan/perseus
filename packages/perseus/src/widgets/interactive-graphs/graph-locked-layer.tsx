import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";

import LockedLine from "./locked-line";
import LockedPoint from "./locked-point";

import type {LockedFigure, Range} from "../../perseus-types";

type Props = {
    lockedFigures: ReadonlyArray<LockedFigure>;
    range: [Range, Range];
};

const GraphLockedLayer = (props: Props) => {
    const {lockedFigures} = props;
    let otherProps;
    return (
        <>
            {lockedFigures.map((figure, index) => {
                let Figure;
                switch (figure.type) {
                    case "point":
                        Figure = LockedPoint;
                        break;
                    case "line":
                        Figure = LockedLine;
                        otherProps = {range: props.range};
                        break;
                    default:
                        /**
                         * Devlopment-time future-proofing: This should
                         * fail during type-checking if we add a new locked
                         * shape type and forget to handle it in any other
                         * switch case here.
                         */
                        throw new UnreachableCaseError(figure);
                }

                return (
                    <Figure
                        key={`${figure.type}-${index}`}
                        {...figure}
                        {...otherProps}
                    />
                );
            })}
        </>
    );
};

export default GraphLockedLayer;
